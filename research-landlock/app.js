const fs = require('fs');
const path = require('path');

const allowedPath = process.argv[2] || '.';
const testFile = path.join(allowedPath, 'test_from_node.txt');

console.log(`Node.js process started. PID: ${process.pid}`);
console.log(`Testing access to: ${allowedPath}`);

// 1. Try to write a file in the allowed directory
try {
    fs.writeFileSync(testFile, `Hello from Landlocked Node.js at ${new Date().toISOString()}\n`);
    console.log(`✅ Successfully wrote to ${testFile}`);

    // Read it back
    const content = fs.readFileSync(testFile, 'utf8');
    console.log(`✅ Read back from ${testFile}: ${content.trim()}`);

    // Clean up
    fs.unlinkSync(testFile);
    console.log(`✅ Successfully deleted ${testFile}`);
} catch (err) {
    console.error(`❌ Failed to access ${testFile}: ${err.message}`);
}

// 2. Try to read a restricted file
const restrictedFile = '/etc/shadow';
console.log(`Testing access to restricted file: ${restrictedFile}`);
try {
    const data = fs.readFileSync(restrictedFile);
    console.log(`⚠️ Unexpectedly read ${restrictedFile}! Length: ${data.length}`);
} catch (err) {
    console.log(`✅ Correctly denied access to ${restrictedFile}: ${err.message}`);
}

// 3. Try to list root directory
console.log('Testing directory listing of /');
try {
    const files = fs.readdirSync('/');
    console.log(`⚠️ Unexpectedly listed /: ${files.length} items`);
} catch (err) {
    console.log(`✅ Correctly denied listing /: ${err.message}`);
}

// 4. Try to access a directory not handled by the launcher at all
const unhandledDir = '/home';
console.log(`Testing access to unhandled directory: ${unhandledDir}`);
try {
    const files = fs.readdirSync(unhandledDir);
    console.log(`⚠️ Unexpectedly listed ${unhandledDir}!`);
} catch (err) {
    console.log(`✅ Correctly denied access to ${unhandledDir} via Landlock: ${err.message}`);
}
