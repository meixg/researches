// ssr_simulation.js

function renderComponent(text) {
    return '<div>' + text + '</div>';
}

function run_ssr_simulation() {
    var output = '';
    var i;
    for (i = 0; i < 1000; i++) {
        output += renderComponent('Item ' + i);
    }
    return output;
}

// Helper function to get the current time in milliseconds
function getTime() {
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        return performance.now(); // High-resolution timer for Node.js
    } else if (typeof std !== 'undefined' && typeof std.hrtime === 'function') {
        return std.hrtime() / 1e6; // QuickJS high-resolution timer
    } else {
        return Date.now(); // Fallback for mquickjs and others
    }
}

var startTime = getTime();
var result = run_ssr_simulation();
var endTime = getTime();

console.log('SSR simulation took ' + (endTime - startTime) + ' milliseconds.');
console.log('SSR simulation complete. Result length: ' + result.length);
