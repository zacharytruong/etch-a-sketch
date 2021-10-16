// Default load
const sketchpad = document.getElementById('sketchpad-container');
function createSketchPad(num){
  for (let i = 1; i <= num * num; i++){
    const pixel = document.createElement('div');
    pixel.className = 'pixel';
    pixel.style.width = (sketchpad.offsetWidth / num) + 'px';
    pixel.style.height = (sketchpad.offsetHeight / num) + 'px';
    sketchpad.appendChild(pixel);
  }
}
createSketchPad(16);

// Set color value based on user's selection
let favcolor = document.getElementById('favcolor');
let newColor;
favcolor.addEventListener('input', () => newColor = favcolor.value);

// Rainbow colors
const rainbowArray = ['#ff3366', 
                '#ff6633', 
                '#FFCC33', 
                '#33FF66', 
                '#33FFCC', 
                '#33CCFF', 
                '#3366FF', 
                '#6633FF', 
                '#CC33FF', 
                '#efefef'];
const rainbow = document.getElementById('rainbow');
rainbow.addEventListener('click', toggleRainbow);
function toggleRainbow(){
  rainbow.classList.toggle('active');
}


// Change pixel background on mouse over event
let pixels = Array.from(document.querySelectorAll('.pixel'));
pixels.forEach(changeBackground);
function changeBackground(pixel){
  pixel.addEventListener('mouseover', updatePixel);
  function updatePixel(){
    if (rainbow.className === 'button active'){
      let random = Math.floor(Math.random() * 10);
      newColor = rainbowArray[random];
      pixel.style.background = newColor;
    } else {
      newColor = favcolor.value;
      pixel.style.background = newColor;
    }
  }
}

// Clear the whole sketchpad
const clear = document.getElementById('clear');
clear.addEventListener('click', () => {
  pixels.forEach(clearBackground);
  function clearBackground(pixel){
    pixel.style.background = 'transparent';
  }
})

// User creates a new sketchpad size
let range = document.getElementById('range');
let rangeText = document.querySelector('.range');
rangeText.textContent = 16 + 'x' + 16;
range.addEventListener('change', createNewSketchPad);
function createNewSketchPad(){
  if (range.value == 1){
    refreshSketchPad(16);
  } else if (range.value == 2){
    refreshSketchPad(32);
  } else if (range.value == 3){
    refreshSketchPad(48);
  }
}

function refreshSketchPad(num){
  removeAllPixels(sketchpad);
  createSketchPad(num);
  rangeText.textContent = num + 'x' + num;
  pixels = Array.from(document.querySelectorAll('.pixel'));
  pixels.forEach(changeBackground);
}

function removeAllPixels(parent){
  while (parent.firstChild){
    parent.removeChild(parent.firstChild);
  }
}