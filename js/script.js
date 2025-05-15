const mainContainer = document.querySelector('#grid-wrapper');

let pixelCount = 20;
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

// Resize Grid
function formNewGrid(pixelNumber, pixelSize) {

   mainContainer.replaceChildren();

   for (let i = 0; i < pixelNumber; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.setAttribute("style", "width:" + pixelSize + "px;height:" + pixelSize + "px;");
      mainContainer.appendChild(pixel);
   }
};

function resizeGrid() {
   console.log('function called')
   let newPixelCount;

   while (true) {
      let input = prompt("Please enter a number between 20 and 100:");

      if (input === null) {
         // User pressed Cancel

         break;
      }

      newPixelCount = Number(input);

      if (
         !isNaN(newPixelCount) &&
         newPixelCount >= 20 &&
         newPixelCount <= 100 &&
         input.trim() !== ""
      ) {
         let newRequiredPixels = newPixelCount * newPixelCount;
         let newPixelResult = calcGrid(mainContainer, newPixelCount);

         formNewGrid(newRequiredPixels, newPixelResult);
         hoverFunctionality();
         break;
      } else {
         alert("Invalid input! Please enter a valid number between 20 and 100.");
      }
   }

}

const resizeButton = document.querySelector('#grid-size');
resizeButton.addEventListener("click", resizeGrid);
