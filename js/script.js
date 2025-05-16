const mainContainer = document.querySelector('#grid-wrapper');

let pageState = 'default';

let gridSize = 20;
let requiredPixels = gridSize * gridSize;

let currentGridSize;
let currentRequiredPixels;

// form a grid from number of divs (required pixels) and the size of each (pixel result).
function formGrid(gridSize, requiredPixels) {
   let cssRoot = document.querySelector(':root');
   cssRoot.style.setProperty('--gridSize', gridSize)

   for (let i = 0; i < requiredPixels; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel');
      mainContainer.appendChild(pixel);
   }
   currentGridSize = gridSize;
   currentRequiredPixels = requiredPixels;
};

// Enable default hover effects
function hoverFunctionality() {
   let elements = document.getElementsByClassName("pixel");

   for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mouseenter', function (e) {
         this.classList.add('black');
      }, false);
   };
};

// Enable magic mode hover effects
function magicHoverFunctionality() {
   let elements = document.getElementsByClassName("pixel");

   for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('white');
      elements[i].addEventListener('mouseenter', function (e) {
         this.classList.add('hidden');
      }, false);
   };
};


// Resize Grid
function formNewGrid(gridSize, requiredPixels) {

   if (pageState === 'magic') {
      changeToMagic(gridSize, requiredPixels);
   } else {
      mainContainer.replaceChildren();
      formGrid(gridSize, requiredPixels);
   }
};

function resizeGrid() {
   console.log('function called')
   let newGridSize;

   while (true) {
      let input = prompt("Please enter a number between 20 and 100:");

      if (input === null) {
         // User pressed Cancel

         break;
      }

      newGridSize = Number(input);

      if (
         !isNaN(newGridSize) &&
         newGridSize >= 20 &&
         newGridSize <= 100 &&
         input.trim() !== ""
      ) {
         currentRequiredPixels = newGridSize * newGridSize;
         currentGridSize = newGridSize;

         resizeCheck(currentGridSize, currentRequiredPixels);
         break;
      } else {
         alert("Invalid input! Please enter a valid number between 20 and 100.");
      }
   }

}

//Grid Resize Check
function resizeCheck(gridSize, requiredPixels) {
   // if pageState = 'something {do something}
}

// Magic Mode
function changeToMagic(gridSize, requiredPixels) {
   mainContainer.replaceChildren();

   let magicBackground = document.createElement('div');
   magicBackground.classList.add('magic');
   mainContainer.appendChild(magicBackground);

   formGrid(gridSize, requiredPixels);
   magicHoverFunctionality();

   pageState = 'magic';
}

formGrid(gridSize, requiredPixels);
hoverFunctionality();

const resizeButton = document.querySelector('#grid-size');
resizeButton.addEventListener("click", resizeGrid);

const magicButton = document.querySelector('#magic-mode');
magicButton.addEventListener("click", () => {
   if (pageState !== 'magic') {
      changeToMagic(currentGridSize, currentRequiredPixels);
   } else {
      mainContainer.replaceChildren();
      formGrid(currentGridSize, currentRequiredPixels);
      pageState = 'default';
      hoverFunctionality();
   }
});
