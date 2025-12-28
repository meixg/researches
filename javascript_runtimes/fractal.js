var generateFractal = function() {
  var width = 200;
  var height = 200;
  var maxIterations = 100;

  for (var y = 0; y < height; y++) {
    for (var x = 0; x < width; x++) {
      var real = (x - width / 2) * 4 / width;
      var imag = (y - height / 2) * 4 / height;
      var cReal = real;
      var cImag = imag;
      var n = 0;

      while (n < maxIterations) {
        var r2 = real * real;
        var i2 = imag * imag;
        if (r2 + i2 > 4) {
          break;
        }
        imag = 2 * real * imag + cImag;
        real = r2 - i2 + cReal;
        n++;
      }
    }
  }
};

generateFractal();
console.log('Fractal generated.');
