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
   } else if (pageState === 'shaded') {
      for (let i = 0; i < elements.length; i++) {
         elements[i].classList.remove('white');
         elements[i].classList.toggle('black');
         elements[i].classList.toggle('shaded');
         elements[i].addEventListener('mouseenter', (e) => incrementPixelOpacity(e.target), false);
      };

      function incrementPixelOpacity(pixel) {
         const currOpacity = window.getComputedStyle(pixel).getPropertyValue("--pixel_opacity");
         const opacity = Math.min(Number(currOpacity) + 0.2, 1);

         pixel.style.setProperty("--pixel_opacity", opacity);
      }
   } else if (pageState === 'random') {

      for (let i = 0; i < elements.length; i++) {
         elements[i].classList.remove('white');
         elements[i].classList.toggle('hidden');
         elements[i].style.backgroundColor = "#" + randomColor();
         elements[i].addEventListener('mouseenter', function (e) {
            this.classList.remove('hidden');
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
   let elements = document.getElementsByClassName("pixel");

   if (pageState === 'magic') {

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
         , 500);
   } else if (pageState === 'shaded') {
      fadePixels('fade-to-white');
      setTimeout(() => {
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 500);
   } else if (pageState === 'random') {
      fadePixels('fade-out');
      setTimeout(() => {
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 500);
   } else {
      fadePixels('fade-out');
      setTimeout(() => {
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 500);
   }
};

// Check user input and pass along to check current page state, otherwise alert if invalid
function resizeGrid() {
   let newGridSize;

   while (true) {
      let input = prompt("Please enter a number between 20 and 70:");

      if (input === null) {
         // User pressed Cancel
         break;
      }

      newGridSize = Number(input);

      if (
         !isNaN(newGridSize) &&
         newGridSize >= 20 &&
         newGridSize <= 70 &&
         input.trim() !== ""
      ) {
         // Update variables
         currentRequiredPixels = newGridSize * newGridSize;
         currentGridSize = newGridSize;

         formNewGrid(currentGridSize, currentRequiredPixels);
         break;
      } else {
         alert("Invalid input! Please enter a valid number between 20 and 70.");
      }
   }

}

// Change state to Magic Mode
function changeToMagic(gridSize, requiredPixels) {
   if (pageState === 'shaded') {
      fadePixels('fade-to-white');
   } else {
      fadePixels('fade-out');
   }

   const whiteOverlay = document.createElement('div');
   whiteOverlay.classList.add('overlay');
   wrapper.appendChild(whiteOverlay);
   const magicBackground = document.createElement('div');
   magicBackground.classList.add('magic');
   wrapper.appendChild(magicBackground);

   setTimeout(() => {
      const overlay = document.querySelector('.overlay');
      overlay.classList.add('fade-out');
   }
      , 100);

   // Set as timeout to allow smooth fading effect
   setTimeout(() => {
      canvas.replaceChildren();
      pageState = 'magic';
      formGrid(gridSize, requiredPixels);
      canvas.classList.toggle('white');
      hoverFunctionality();
   }
      , 500);
}

// Function to stop magic mode
function stopMagicMode() {
   const background = document.querySelector('.magic');
   const overlay = document.querySelector('.overlay');

   overlay.classList.toggle('fade-out');
   overlay.classList.toggle('fade-in');

   pageState = 'default';

   setTimeout(() => {
      canvas.classList.toggle('white');
      background.remove();
      overlay.remove();
      formNewGrid(currentGridSize, currentRequiredPixels);
   }
      , 500);
}

// Check current state before Changing state to shaded mode
function shadedCheck() {
   if (pageState === 'magic') {
      stopMagicMode();
      setTimeout(() => {
         pageState = 'shaded'
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 500);
   } else if (pageState === 'shaded') {
      fadePixels('fade-to-white');
      pageState = 'default'
      formNewGrid(currentGridSize, currentRequiredPixels);
   } else {
      fadePixels('fade-out');
      setTimeout(() => {
         pageState = 'shaded'
         canvas.replaceChildren();
         formGrid(currentGridSize, currentRequiredPixels);
      }
         , 500);
   }
}

// Function to Check current state before change to random mode
function randomCheck() {
   if (pageState === 'magic') {
      stopMagicMode();
      pageState = 'random';
      formNewGrid(currentGridSize, currentRequiredPixels);
   } else if (pageState === 'shaded') {
      fadePixels('fade-to-white');
      pageState = 'random'
      formNewGrid(currentGridSize, currentRequiredPixels);
   } else if (pageState === 'random') {
      pageState = 'default'
      formNewGrid(currentGridSize, currentRequiredPixels);
   } else {
      fadePixels('fade-out');
      pageState = 'random'
      formNewGrid(currentGridSize, currentRequiredPixels);
   }
}

// Function to fade existing pixels in or out by adding CSS class
function fadePixels(inOut) {
   let elements = document.getElementsByClassName("pixel");

   for (let i = 0; i < elements.length; i++) {
      elements[i].classList.add(inOut);
   };
}

// Function to return random color
function randomColor() {
   let color;
   do {
      color = Math.floor(Math.random() * 16777215);
   } while (color === 16777215); // 16777215 is white (#ffffff)
   return color.toString(16).padStart(6, '0');
}

//Function to reset canvas to default state
function resetCanvas() {
   gridSize = 20;
   requiredPixels = gridSize * gridSize;

   if (pageState === 'magic') {
      stopMagicMode();
      setTimeout(() => {
         pageState = 'default'
         canvas.replaceChildren();
         formGrid(gridSize, requiredPixels);
      }
         , 500);
   } else if (pageState === 'shaded') {
      fadePixels('fade-to-white');
      pageState = 'default';
      formNewGrid(gridSize, requiredPixels);
   } else {
      pageState = 'default';
      formNewGrid(gridSize, requiredPixels);
   }
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

const shadedButton = document.querySelector('#shade-mode');
shadedButton.addEventListener("click", shadedCheck);

const randomButton = document.querySelector('#random-mode');
randomButton.addEventListener("click", randomCheck);

const resetButton = document.querySelector('#reset-canvas');
resetButton.addEventListener("click", resetCanvas);

// Initial page load default state
formGrid(gridSize, requiredPixels);
hoverFunctionality();
