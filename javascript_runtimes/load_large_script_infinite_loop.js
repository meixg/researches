// load_large_script_infinite_loop.js
console.log('Large script loaded.');

// Keep the process alive for a short time to allow memory measurement
// In QuickJS, setTimeout is not available, so we use an infinite loop.
while (true) {}
