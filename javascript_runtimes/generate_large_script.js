// generate_large_script.js
var fs = require('fs');
var path = require('path');
var stream = fs.createWriteStream(path.resolve(__dirname, 'large_script.js'));

stream.once('open', function(fd) {
    stream.write('var largeString = "');
    for (var i = 0; i < 102; i++) {
        stream.write('a'.repeat(10240));
    }
    stream.write('";');
    stream.end();
});
