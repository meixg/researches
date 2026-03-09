const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');

// Mock CONFIG
const CONFIG = {
  enabled: true,
  maxMessagesForReflection: 10,
  maxLearnings: 5,
  maxCoreItems: 20,
  memoryRoot: path.join(__dirname, 'test-memory'),
  apiKey: 'mock-key',
  model: 'mock-model',
};

// Re-implement or import the logic (simplified for test)
// For simplicity, I'll copy the core logic here with the mock.

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

function renderCoreMD(paths, index) {
  const sorted = [...index.items].sort((a, b) => b.score - a.score);
  const topItems = sorted.slice(0, CONFIG.maxCoreItems);
  const learnings = topItems.filter(it => it.kind === 'learning');
  const antiPatterns = topItems.filter(it => it.kind === 'antiPattern');
  const content = [
    '# Core Learnings',
    '',
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
  const content = '# Long-term Memory';
  fs.writeFileSync(paths.longTermFile, content);
}

function updateCoreMemory(reflection) {
  const paths = getMemoryPaths(CONFIG.memoryRoot);
  const index = loadCoreIndex(paths);
  const nowIso = new Date().toISOString();
  const updates = [
    ...reflection.fixes.map(text => ({ text, kind: 'learning' })),
    ...reflection.mistakes.map(text => ({ text: `Avoid: ${text}`, kind: 'antiPattern' })),
  ];
  const byKey = new Map(index.items.map(item => [item.key, item]));
  for (const entry of updates) {
    const key = learningKey(entry.text);
    if (!byKey.has(key)) {
      byKey.set(key, { key, text: entry.text, kind: entry.kind, hits: 1, score: 1, lastSeen: nowIso });
    } else {
      const existing = byKey.get(key);
      existing.hits++;
      existing.score++;
      existing.lastSeen = nowIso;
    }
  }
  index.items = Array.from(byKey.values());
  saveJson(paths.indexFile, index);
  renderCoreMD(paths, index);
  renderLongTermMD(paths, index);
  return paths;
}

function appendDailyLog(paths, reflection) {
  const now = new Date();
  const file = path.join(paths.dailyDir, `${toDateKeyUTC(now)}.md`);
  ensureDir(paths.dailyDir);
  const lines = `## ${toTimeUTC(now)}\n\n${JSON.stringify(reflection)}\n\n`;
  fs.appendFileSync(file, lines);
}

function parseTranscript(transcriptPath, maxMessages) {
  const lines = fs.readFileSync(transcriptPath, 'utf8').split('\n').filter(Boolean);
  return lines.join('\n');
}

async function test() {
  const transcriptPath = path.join(__dirname, 'mock-transcript.jsonl');
  const mockReflection = {
    mistakes: ["Using wrong variable name", "Forgetting to run tests"],
    fixes: ["Use userId instead of user_id", "Run npm test before git commit"]
  };

  console.log('Testing reflection logic...');
  const paths = updateCoreMemory(mockReflection);
  appendDailyLog(paths, mockReflection);

  console.log('Memory files created:');
  console.log('- ' + paths.indexFile);
  console.log('- ' + paths.coreFile);
  console.log('- ' + path.join(paths.dailyDir, `${toDateKeyUTC(new Date())}.md`));

  console.log('\nVerifying index.json content:');
  const index = loadJson(paths.indexFile);
  console.log(JSON.stringify(index, null, 2));

  console.log('\nVerifying CORE.md content:');
  console.log(fs.readFileSync(paths.coreFile, 'utf8'));
}

test();
