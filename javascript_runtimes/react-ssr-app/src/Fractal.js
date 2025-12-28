import React, { useState, useEffect } from 'react';

const Fractal = () => {
  const [fractal, setFractal] = useState([]);

  useEffect(() => {
    const generateFractal = () => {
      const width = 200;
      const height = 200;
      const maxIterations = 100;
      const newFractal = [];

      for (let y = 0; y < height; y++) {
        const row = [];
        for (let x = 0; x < width; x++) {
          let real = (x - width / 2) * 4 / width;
          let imag = (y - height / 2) * 4 / height;
          let cReal = real;
          let cImag = imag;
          let n = 0;

          while (n < maxIterations) {
            let r2 = real * real;
            let i2 = imag * imag;
            if (r2 + i2 > 4) {
              break;
            }
            imag = 2 * real * imag + cImag;
            real = r2 - i2 + cReal;
            n++;
          }
          row.push(n);
        }
        newFractal.push(row);
      }
      setFractal(newFractal);
    };

    generateFractal();
  }, []);

  return (
    <div>
      <h2>Mandelbrot Fractal</h2>
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(200, 2px)` }}>
        {fractal.flat().map((value, index) => (
          <div
            key={index}
            style={{
              width: '2px',
              height: '2px',
              backgroundColor: `hsl(${value * 10 % 360}, 100%, 50%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Fractal;
