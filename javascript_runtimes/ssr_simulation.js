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

var result = run_ssr_simulation();
console.log('SSR simulation complete. Result length: ' + result.length);
