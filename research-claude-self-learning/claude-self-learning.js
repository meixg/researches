#!/usr/bin/env node

/**
 * Claude Code Self-Learning Hook
 *
 * This script implements a reflection loop for Claude Code, similar to pi-self-learning.
 * It hooks into SessionStart for context injection and Stop for task-end reflection.
 */

const fs = require('node:fs');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const os = require('node:os');

// --- Configuration ---

const CONFIG = {
  enabled: true,
  maxMessagesForReflection: 10,
  maxLearnings: 5,
  maxCoreItems: 20,
  memoryRoot: path.join(os.homedir(), '.claude', 'self-learning-memory'),
  // Anthropic API config - should be set via environment variables
  apiKey: process.env.ANTHROPIC_API_KEY,
  model: 'claude-3-5-sonnet-20241022',
};

// --- Utilities ---

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function loadJson(file) {
  if (!fs.existsSync(file)) return null;
  try {
    return JSON.parse(fs.readFileSync(file, 'utf8'));
  } catch (e) {
    return null;
  }
}

function saveJson(file, data) {
  ensureDir(path.dirname(file));
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
}

function toDateKeyUTC(date) {
  return date.toISOString().split('T')[0];
}

function toTimeUTC(date) {
  return date.toISOString().split('T')[1].split('.')[0] + ' UTC';
}

// --- Memory Management ---

function getMemoryPaths(root) {
  return {
    dailyDir: path.join(root, 'daily'),
    coreDir: path.join(root, 'core'),
    coreFile: path.join(root, 'core', 'CORE.md'),
    indexFile: path.join(root, 'core', 'index.json'),
    longTermFile: path.join(root, 'long-term-memory.md'),
  };
}

function loadCoreIndex(paths) {
  const index = loadJson(paths.indexFile);
  if (index && index.items) return index;
  return { version: 1, updatedAt: new Date().toISOString(), items: [] };
}

function normalizeText(text) {
  return text.replace(/\s+/g, ' ').trim();
}

function learningKey(text) {
  return normalizeText(text).toLowerCase();
}

function updateCoreMemory(reflection) {
  const paths = getMemoryPaths(CONFIG.memoryRoot);
  const index = loadCoreIndex(paths);
  const nowIso = new Date().toISOString();

  const updates = [
    ...reflection.fixes.map(text => ({ text, kind: 'learning' })),
    ...reflection.mistakes.map(text => ({ text: `Avoid: ${text}`, kind: 'antiPattern' })),
  ].map(it => ({ ...it, text: normalizeText(it.text) })).filter(it => it.text.length > 0);

  const byKey = new Map(index.items.map(item => [item.key, item]));

  for (const entry of updates) {
    const key = learningKey(entry.text);
    const existing = byKey.get(key);

    if (!existing) {
      byKey.set(key, {
        key,
        text: entry.text,
        kind: entry.kind,
        hits: 1,
        score: 1,
        firstSeen: nowIso,
        lastSeen: nowIso,
      });
    } else {
      existing.text = entry.text;
      existing.kind = entry.kind;
      existing.hits += 1;
      existing.lastSeen = nowIso;
      const repetitionBonus = Math.min(1, existing.hits * 0.08);
      existing.score += 1 + repetitionBonus;
    }
  }

  index.updatedAt = nowIso;
  index.items = Array.from(byKey.values());

  saveJson(paths.indexFile, index);
  renderCoreMD(paths, index);
  renderLongTermMD(paths, index);

  return paths;
}

function renderCoreMD(paths, index) {
  // Simple ranking: score - age penalty
  const sorted = [...index.items].sort((a, b) => {
    const scoreA = a.score - (Date.now() - Date.parse(a.lastSeen)) / (1000 * 60 * 60 * 24) * 0.05;
    const scoreB = b.score - (Date.now() - Date.parse(b.lastSeen)) / (1000 * 60 * 60 * 24) * 0.05;
    return scoreB - scoreA;
  });

  const topItems = sorted.slice(0, CONFIG.maxCoreItems);
  const learnings = topItems.filter(it => it.kind === 'learning');
  const antiPatterns = topItems.filter(it => it.kind === 'antiPattern');

  const content = [
    '# Core Learnings',
    '',
    'Most important durable learnings collected over time.',
    `Last updated: ${new Date().toISOString()}`,
    '',
    '## High-value learnings',
    ...(learnings.length > 0 ? learnings.map(it => `- ${it.text}`) : ['- (none yet)']),
    '',
    '## Watch-outs',
    ...(antiPatterns.length > 0 ? antiPatterns.map(it => `- ${it.text.replace(/^avoid:\s*/i, '')}`) : ['- (none yet)']),
  ].join('\n');

  fs.writeFileSync(paths.coreFile, content);
}

function renderLongTermMD(paths, index) {
  const sorted = [...index.items].sort((a, b) => Date.parse(b.lastSeen) - Date.parse(a.lastSeen));
  const learnings = sorted.filter(it => it.kind === 'learning');
  const antiPatterns = sorted.filter(it => it.kind === 'antiPattern');

  const content = [
    '# Long-term Memory',
    '',
    'Complete history of durable learnings and recurring mistakes.',
    '',
    '## All learnings',
    ...(learnings.length > 0 ? learnings.map(it => `- ${it.text}`) : ['- (none yet)']),
    '',
    '## All watch-outs',
    ...(antiPatterns.length > 0 ? antiPatterns.map(it => `- ${it.text.replace(/^avoid:\s*/i, '')}`) : ['- (none yet)']),
  ].join('\n');

  fs.writeFileSync(paths.longTermFile, content);
}

function appendDailyLog(paths, reflection) {
  const now = new Date();
  const file = path.join(paths.dailyDir, `${toDateKeyUTC(now)}.md`);
  ensureDir(paths.dailyDir);

  const lines = [
    `## ${toTimeUTC(now)}`,
    '',
    '### What went wrong',
    ...(reflection.mistakes.length > 0 ? reflection.mistakes.map(it => `- ${it}`) : ['- (none)']),
    '',
    '### How it was fixed',
    ...(reflection.fixes.length > 0 ? reflection.fixes.map(it => `- ${it}`) : ['- (none)']),
    '',
    ''
  ].join('\n');

  fs.appendFileSync(file, lines);
}

// --- Transcript Parsing ---

function parseTranscript(transcriptPath, maxMessages) {
  if (!fs.existsSync(transcriptPath)) return '';
  const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);
  const turns = [];

  // Parse last N messages
  for (let i = lines.length - 1; i >= 0 && turns.length < maxMessages; i--) {
    try {
      const entry = JSON.parse(lines[i]);
      if (entry.message) {
        const role = entry.message.role;
        const content = entry.message.content.map(c => c.text || '').join('\n');
        turns.unshift(`${role.toUpperCase()}: ${content}`);
      }
    } catch (e) {}
  }

  return turns.join('\n\n---\n\n');
}

// --- Anthropic API ---

async function callReflectionLLM(conversationText) {
  if (!CONFIG.apiKey) {
    throw new Error('ANTHROPIC_API_KEY not set');
  }

  const prompt = [
    "You are a coding session mistake-prevention reflection engine.",
    "Focus on what went wrong and how it was fixed.",
    "Do NOT summarize accomplishments or completed tasks.",
    "Return STRICT JSON only with this schema:",
    '{"mistakes":["..."],"fixes":["..."]}',
    "Rules:",
    `- Keep each array short (max ${CONFIG.maxLearnings}).`,
    "- Prefer specific, actionable, prevention-oriented points.",
    "- Avoid generic statements and progress summaries.",
    "",
    "<conversation>",
    conversationText,
    "</conversation>"
  ].join('\n');

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': CONFIG.apiKey,
      'anthropic-version': '2023-06-01'
    },
    body: JSON.stringify({
      model: CONFIG.model,
      max_tokens: 1024,
      messages: [{ role: 'user', content: prompt }]
    })
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Anthropic API error: ${error}`);
  }

  const data = await response.json();
  const text = data.content[0].text;

  // Basic JSON extraction
  const match = text.match(/\{[\s\S]*\}/);
  if (!match) throw new Error('No JSON found in model response');

  return JSON.parse(match[0]);
}

// --- Hook Handlers ---

async function handleStop(input) {
  if (input.stop_hook_active) return; // Avoid re-triggering

  console.error('[Self-Learning] Reflecting on session...');

  try {
    const conversation = parseTranscript(input.transcript_path, CONFIG.maxMessagesForReflection);
    if (!conversation) return;

    const reflection = await callReflectionLLM(conversation);
    const paths = updateCoreMemory(reflection);
    appendDailyLog(paths, reflection);

    // Git commit if in a git repo
    if (fs.existsSync(path.join(CONFIG.memoryRoot, '.git'))) {
      spawnSync('git', ['add', '.'], { cwd: CONFIG.memoryRoot });
      spawnSync('git', ['commit', '-m', `chore(memory): reflection ${toDateKeyUTC(new Date())}`], { cwd: CONFIG.memoryRoot });
    }

    console.error('[Self-Learning] Reflection saved.');
  } catch (e) {
    console.error(`[Self-Learning] Error: ${e.message}`);
  }
}

function handleSessionStart() {
  const paths = getMemoryPaths(CONFIG.memoryRoot);
  const context = [];

  if (fs.existsSync(paths.coreFile)) {
    context.push('## core/CORE.md');
    context.push(fs.readFileSync(paths.coreFile, 'utf8'));
  }

  const dailyFile = path.join(paths.dailyDir, `${toDateKeyUTC(new Date())}.md`);
  if (fs.existsSync(dailyFile)) {
    context.push(`## daily/${path.basename(dailyFile)}`);
    context.push(fs.readFileSync(dailyFile, 'utf8'));
  }

  if (context.length > 0) {
    const output = [
      '# Self-learning memory context',
      'Use this as historical evidence of past mistakes and fixes.',
      '',
      ...context
    ].join('\n\n');

    // For SessionStart, stdout is added as context
    console.log(output);
  }
}

// --- Main ---

async function main() {
  const eventName = process.argv[2];

  // Read hook input from stdin
  let input = {};
  try {
    const stdinBuffer = fs.readFileSync(0);
    if (stdinBuffer.length > 0) {
      input = JSON.parse(stdinBuffer.toString());
    }
  } catch (e) {}

  if (eventName === 'stop' || input.hook_event_name === 'Stop') {
    await handleStop(input);
  } else if (eventName === 'session-start' || input.hook_event_name === 'SessionStart') {
    handleSessionStart();
  } else {
    console.error(`Unknown event or usage. Use: node ${path.basename(__filename)} [stop|session-start]`);
    process.exit(1);
  }
}

main();
