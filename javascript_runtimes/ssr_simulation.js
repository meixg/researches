// ssr_simulation.js

// This function will be defined in dummy_component.js
// and will be available globally in mquickjs via the -I flag,
// or loaded and eval'd in Node.js.
var renderComponent;

// In Node.js, load the component file.
if (typeof require !== 'undefined') {
  var fs = require('fs');
  var componentCode = fs.readFileSync('./javascript_runtimes/dummy_component.js', 'utf8');
  (1,eval)(componentCode);
}

function run_ssr_simulation() {
    var output = '';
    var i;
    for (i = 0; i < 1000; i++) {
        output += renderComponent('Item ' + i);
    }
    return output;
}

run_ssr_simulation();
console.log('SSR simulation complete.');
