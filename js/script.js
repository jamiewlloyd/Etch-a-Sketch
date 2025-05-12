const container = document.querySelector('#grid-wrapper');
const divNumber = 256;


function calcGrid(pixelNumber) {
   for (let i = 0; i < pixelNumber; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.innerHTML = i + 1
      container.appendChild(pixel);
   }
};

calcGrid(divNumber);