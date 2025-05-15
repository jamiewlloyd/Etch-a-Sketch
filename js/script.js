const mainContainer = document.querySelector('#grid-wrapper');

let pageState = 'default';

let pixelCount = 20;
let requiredPixels = pixelCount * pixelCount;

let currentPixelNumber
let currentPixelSize

let pixelResult = calcGrid(mainContainer, pixelCount);

// Calculate size of each div based on grid size divided by pixel number (eg 20 x 20 grid)
function calcGrid(container, pixels) {
   let containerHeight = container.clientHeight;
   let size = containerHeight / pixels;
   return (Math.round(size * 100) / 100).toFixed(2);
};

// form a grid from number of divs (required pixels) and the size of each (pixel result).
function formGrid(pixelNumber, pixelSize) {
   for (let i = 0; i < pixelNumber; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      pixel.setAttribute("style", "width:" + pixelSize + "px;height:" + pixelSize + "px;");
      mainContainer.appendChild(pixel);

      currentPixelNumber = pixelNumber;
      currentPixelSize = pixelSize;
   }
};

// Enable Hover Effects
function hoverFunctionality() {
   let elements = document.getElementsByClassName("pixel");

   for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mouseenter', function (e) {
         this.classList.add('black');
      }, false);
   };
};


// Resize Grid
function formNewGrid(pixelNumber, pixelSize) {

   if (pageState === 'magic') {
      changeToMagic(pixelNumber, pixelSize);
   } else {
      mainContainer.replaceChildren();
      formGrid(pixelNumber, pixelSize);
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
         currentPixelNumber = newPixelCount * newPixelCount;
         currentPixelSize = calcGrid(mainContainer, newPixelCount);

         formNewGrid(currentPixelNumber, currentPixelSize);
         hoverFunctionality();
         break;
      } else {
         alert("Invalid input! Please enter a valid number between 20 and 100.");
      }
   }

}

//Grid Resize Check
function resizeCheck() {
   // if pageState = 'something {do something}
}

// Magic Mode
function changeToMagic(pixelNumber, pixelSize) {
   mainContainer.replaceChildren();

   let magicBackground = document.createElement('div');
   magicBackground.classList.add('magic');
   mainContainer.appendChild(magicBackground);

   for (let i = 0; i < pixelNumber; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel', 'white');
      pixel.setAttribute("style", "width:" + pixelSize + "px;height:" + pixelSize + "px;");
      mainContainer.appendChild(pixel);
   }

   pageState = 'magic';
}

formGrid(requiredPixels, pixelResult);
hoverFunctionality();

const resizeButton = document.querySelector('#grid-size');
resizeButton.addEventListener("click", resizeGrid);

const magicButton = document.querySelector('#magic-mode');
magicButton.addEventListener("click", () => {
   if (pageState !== 'magic') {
      changeToMagic(currentPixelNumber, currentPixelSize);
   } else {
      mainContainer.replaceChildren();
      formGrid(currentPixelNumber, currentPixelSize);
      pageState = 'default';
      hoverFunctionality();
   }
});