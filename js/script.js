const mainContainer = document.querySelector('#grid-wrapper');

let pixelCount = 30;
let requiredPixels = pixelCount * pixelCount;

function calcGrid(container, pixels) {
   let containerHeight = container.clientHeight;
   let size = containerHeight / pixels;
   return (Math.round(size * 100) / 100).toFixed(2);
};

let pixelResult = calcGrid(mainContainer, pixelCount);

function formGrid(pixelNumber, pixelSize) {
   for (let i = 0; i < pixelNumber; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.setAttribute("style", "width:" + pixelSize + "px;height:" + pixelSize + "px;");
      mainContainer.appendChild(pixel);
   }
};

formGrid(requiredPixels, pixelResult);

// Hover Effects
function hoverFunctionality() {
   let elements = document.getElementsByClassName("pixel");

   for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mouseenter', function (e) {
         this.classList.add('black');
      }, false);
   };
};
hoverFunctionality();