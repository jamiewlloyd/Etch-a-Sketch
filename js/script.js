const canvas = document.querySelector('#canvas');
const container = document.querySelector('#wrapper');

let pageState = 'default';

let gridSize = 20;
let requiredPixels = gridSize * gridSize;

let currentGridSize;
let currentRequiredPixels;

// form a grid from the given size and insert required pixels as divs.
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

// Enable hover effects for all states
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
      let elements = document.getElementsByClassName("pixel");

      for (let i = 0; i < elements.length; i++) {
         if (elements[i].classList.contains("hidden")) {
            elements[i].classList.toggle('hidden');
            elements[i].classList.toggle('fade-in');
         }
      };

      setTimeout(() => {
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 800);
   } else {
      fadePixels('fade-out');
      setTimeout(() => {
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 800);
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

         formNewGrid(currentGridSize, currentRequiredPixels);
         break;
      } else {
         alert("Invalid input! Please enter a valid number between 20 and 100.");
      }
   }

}

// Change state to Magic Mode
function changeToMagic(gridSize, requiredPixels) {
   fadePixels('fade-out');

   const magicBackground = document.createElement('div');
   magicBackground.classList.add('magic');
   wrapper.appendChild(magicBackground);
   const whiteOverlay = document.createElement('div');
   whiteOverlay.classList.add('overlay', 'fade-out');
   wrapper.appendChild(whiteOverlay);

   // Set as timeout to allow smooth fading effect
   setTimeout(() => {
      canvas.replaceChildren();
      pageState = 'magic';
      formGrid(gridSize, requiredPixels);
      canvas.classList.toggle('white');
      hoverFunctionality();
   }
      , 800);
}

// Function to stop magic mode
function stopMagicMode() {
   const background = document.querySelector('.magic');
   const overlay = document.querySelector('.overlay');

   overlay.classList.toggle('fade-out');
   overlay.classList.toggle('fade-in');

   pageState = 'default';

   setTimeout(() => {
      background.remove();
      overlay.remove();
      canvas.classList.toggle('white');
      formNewGrid(currentGridSize, currentRequiredPixels);
   }
      , 800);
}

// Change state to shaded mode
function changeToShaded(gridSize, requiredPixels) {

}

// Function to fade existing pixels in or out by adding CSS class
function fadePixels(inOut) {
   let elements = document.getElementsByClassName("pixel");

   for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(inOut);
   };
}

// Adding event listeners to buttons
const resizeButton = document.querySelector('#grid-size');
resizeButton.addEventListener("click", resizeGrid);

const magicButton = document.querySelector('#magic-mode');
magicButton.addEventListener("click", () => {
   if (pageState !== 'magic') {
      changeToMagic(currentGridSize, currentRequiredPixels);
   } else {
      stopMagicMode();
   }
});

// Initial page load default state
formGrid(gridSize, requiredPixels);
hoverFunctionality();
