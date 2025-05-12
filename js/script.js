const mainContainer = document.querySelector('#grid-wrapper');
console.log(mainContainer.attributes)

let pixelCount = 16;
let requiredPixels = pixelCount * pixelCount;
console.log(requiredPixels);

function calcGrid(container, pixels) {
   let containerHeight = container.offsetHeight;
   let size = containerHeight / pixels;
   return size;
};

let pixelResult = calcGrid(mainContainer, pixelCount);
console.log(pixelResult);

function formGrid(pixelNumber, pixelSize) {
   for (let i = 0; i < pixelNumber; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.setAttribute("style", "width:" + pixelSize + "px;height:" + pixelSize + "px;");
      pixel.innerHTML = i + 1;
      mainContainer.appendChild(pixel);
   }
};

formGrid(requiredPixels, pixelResult);