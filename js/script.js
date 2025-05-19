const canvas = document.querySelector('#canvas');
const container = document.querySelector('#wrapper');

let pageState = 'default';

let gridSize = 20;
let requiredPixels = gridSize * gridSize;

let currentGridSize;
let currentRequiredPixels;

// form a grid from the given size and insert required pixels as diz.
function formGrid(gridSize, requiredPixels) {
   let cssRoot = document.querySelector(':root');
   cssRoot.style.setProperty('--gridSize', gridSize);

   for (let i = 0; i < requiredPixels; i++) {
      let pixel = document.createElement('div');
      pixel.classList.add('pixel', 'white');
      canvas.appendChild(pixel);
   }

   hoverFunctionality();

   // Update variables
   currentGridSize = gridSize;
   currentRequiredPixels = requiredPixels;
};

// Enable default hover effects
function hoverFunctionality() {
   let elements = document.getElementsByClassName("pixel");

   if (pageState === 'magic') {
      for (let i = 0; i < elements.length; i++) {
         elements[i].classList.add('white');
         elements[i].addEventListener('mouseenter', function (e) {
            this.classList.add('hidden');
         }, false);
      };
   } else {
      for (let i = 0; i < elements.length; i++) {
         elements[i].addEventListener('mouseenter', function (e) {
            this.classList.add('black');
         }, false);
      };
   }
};

// Resize Grid
function formNewGrid(gridSize, requiredPixels) {

   if (pageState === 'magic') {

      changeToMagic(gridSize, requiredPixels);
   } else {
      canvas.classList.toggle('white');
      canvas.replaceChildren();
      formGrid(gridSize, requiredPixels);
   }
};

// Check user input and pass along to check current page state, otherwise alert if invalid
function resizeGrid() {
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
         // Update variables
         currentRequiredPixels = newGridSize * newGridSize;
         currentGridSize = newGridSize;

         resizeCheck(currentGridSize, currentRequiredPixels);
         break;
      } else {
         alert("Invalid input! Please enter a valid number between 20 and 100.");
      }
   }

}

// Grid resize checks current page state to see which grid to form
function resizeCheck(gridSize, requiredPixels) {
   if (pageState === 'magic') {
      changeToMagic(gridSize, requiredPixels);
   } else {
      formNewGrid(gridSize, requiredPixels);
   }
}

// Magic Mode
function changeToMagic(gridSize, requiredPixels) {
   let elements = document.getElementsByClassName("pixel");

   // Add fade out to existing canvas
   for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add('fade-out');
   };

   const magicBackground = document.createElement('div');
   magicBackground.classList.add('magic');
   wrapper.appendChild(magicBackground);


   setTimeout(() => {
      while (canvas.childNodes.length > 1) {
         canvas.removeChild(canvas.firstChild);
      }
      pageState = 'magic';
      formGrid(gridSize, requiredPixels);
      canvas.classList.toggle('white');
      hoverFunctionality();
   }
      , 800);
}

// Adding event listeners to buttons
const resizeButton = document.querySelector('#grid-size');
resizeButton.addEventListener("click", resizeGrid);

const magicButton = document.querySelector('#magic-mode');
magicButton.addEventListener("click", () => {
   if (pageState !== 'magic') {
      changeToMagic(currentGridSize, currentRequiredPixels);
   } else {
      const background = document.querySelector('.magic');

      background.classList.toggle('hidden');
      pageState = 'default';

      setTimeout(() => {
         formNewGrid(currentGridSize, currentRequiredPixels);
      }
         , 800);
   }
});

// Initial page load default state
formGrid(gridSize, requiredPixels);
hoverFunctionality();
