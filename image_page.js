const image = document.querySelector("#image");
const frame = document.querySelector('#frame');
const slider = document.querySelector("#slider");
const fullScreenBtn = document.querySelector("#full-screen");
const track = document.querySelector("#track");

var script = document.createElement('script');
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.3/jquery.min.js";
document.getElementsByTagName('head')[0].appendChild(script);


let zoomValue;
let isMouseDown = false;
let isTouch = false;
let touchSeparation;
let mousedownX;
let mousedownY;
let mouseX;
let mouseY;
let scrollAmountX;
let scrollAmountY;
frame.scrollBy({behavior: 'smooth'});

let fitWindow = function(){
  if ((image.naturalHeight/frame.offsetHeight) > (image.naturalWidth/frame.offsetWidth)) {
    image.height = frame.offsetHeight;
    image.width = image.naturalWidth * (image.height / image.naturalHeight);
  }
  else {
    image.width = frame.offsetWidth;
    image.height = image.naturalHeight * (image.width / image.naturalWidth);
  }
  zoomValue = image.height/image.naturalHeight;
  slider.min = zoomValue;
  slider.value = zoomValue;
}

let fullScreen = function() {
  if (!document.fullscreenElement) {
    if (frame.requestFullscreen) {
      frame.requestFullscreen();
    } else if (frame.webkitRequestFullscreen) { /* Safari */
      frame.webkitRequestFullscreen();
    } else if (frame.msRequestFullscreen) { /* IE11 */
      frame.msRequestFullscreen();
    }
  }
  else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
      document.msExitFullscreen();
    }
  }
}

let setZoom = function(zoomTo) {
  imageCenterX = (frame.offsetWidth / 2 + frame.scrollLeft) / zoomValue;
  imageCenterY = (frame.offsetHeight / 2 + frame.scrollTop) / zoomValue;
  if (zoomTo > 1) {zoomValue = 1;}
  else if (zoomTo < slider.min) {zoomValue = slider.min;}
  else {zoomValue = zoomTo;}
  image.height = image.naturalHeight * zoomValue;
  image.width = image.naturalWidth * zoomValue;
  slider.value = zoomValue;
  frame.scrollLeft = imageCenterX * zoomValue - frame.offsetWidth / 2
  frame.scrollTop = imageCenterY * zoomValue - frame.offsetHeight / 2
}

let keyMove = function(e) {
  let scrollAmount = 10 * zoomValue;
  switch (e.key){
    case "ArrowLeft":
      scrollAmountX = -scrollAmount;
      break;
    case "ArrowRight":
      scrollAmountX = +scrollAmount;
      break;
    case "ArrowUp":
      scrollAmountY = -scrollAmount;
      break;
    case "ArrowDown":
      scrollAmountY = +scrollAmount;
      break;
  }
}

setInterval (function() {
  frame.scrollBy({
    top: scrollAmountY,
    left: scrollAmountX
  });
},10);

image.addEventListener('load', fitWindow);

window.addEventListener("resize", fitWindow);

document.addEventListener('keydown', keyMove);
document.addEventListener('keyup', () => {
  scrollAmountX = 0;
  scrollAmountY = 0;
});

fullScreenBtn.addEventListener('click', fullScreen);

/*frame.addEventListener('fullscreenchange', (e) => {return;});*/

image.addEventListener('mousedown', (e) => {
  isMouseDown = true;
  mousedownX = e.pageX;
  mousedownY = e.pageY;
  mouseX = mousedownX;
  mouseY = mousedownY;
});

image.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!isMouseDown) {return;}
  frame.scrollLeft += mouseX - e.pageX;
  frame.scrollTop += mouseY - e.pageY;
  mouseX = e.pageX;
  mouseY = e.pageY;
  image.style.cursor = "grabbing";
});

image.addEventListener('mouseup', (e) => {
  isMouseDown = false;
  /* check if image dragged and zoom if not dragged */
  if ((e.pageX == mousedownX && e.pageY == mousedownY)) {
    setZoom(zoomValue * 1.2)
  }
  image.style.cursor = "zoom-in";
});

image.addEventListener('mouseleave', () => {
  isMouseDown = false;
  image.style.cursor = "zoom-in";
});

image.addEventListener('touchstart', (e) => {
  isTouch = true;
  let touchStartX = 0;
  let touchStartY = 0;
  if (e.touches.length == 1) {
    touchStartX = e.touches[0].pageX;
    touchStartY = e.touches[0].pageY;
  }
  else {
    touchStartX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
    touchStartY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
    touchSeparation = ((e.touches[0].pageX - e.touches[1].pageX) ^ 2 + (e.touches[0].pageY - e.touches[1].pageY) ^ 2) ^ 0.5; 
  }
  touchX = touchStartX;
  touchY = touchStartY;
});

image.addEventListener('touchmove', (e) => {
  e.preventDefault();
  if(!isTouch) {return;}
  let changeX = 0;
  let changeY = 0;
  let changeSeparation;
  let zoomTo;
  if (e.touches.length == 1) {
    changeX = e.touches[0].pageX;
    changeY = e.touches[0].pageY;
  }
  else {
    changeX = (e.touches[0].pageX + e.touches[1].pageX) / 2;
    changeY = (e.touches[0].pageY + e.touches[1].pageY) / 2;
    changeSeparation = ((e.touches[0].pageX - e.touches[1].pageX) ^ 2 + (e.touches[0].pageY - e.touches[1].pageY) ^ 2) ^ 0.5; 
    zoomTo = changeSeparation/touchSeparation;
    track.innerHTML = zoomTo;
    if (zoomTo > 1) {zoomValue = 1;}
    else if (zoomTo < slider.min) {zoomValue = slider.min;}
    else {zoomValue = zoomTo;}
    image.height = image.naturalHeight * zoomValue;
    image.width = image.naturalWidth * zoomValue;
    slider.value = zoomValue;
    touchSeparation = changeSeparation;
  }
  frame.scrollLeft += touchX - changeX;
  frame.scrollTop += touchY - changeY;
  touchX = changeX;
  touchY = changeY;
});

image.addEventListener('touchend', () => {
  isTouch = false;
});

image.addEventListener('wheel', (e) => {
  e.preventDefault();
  setZoom(zoomValue - 0.001*e.deltaY)
})

slider.addEventListener('input', (e) => {
  setZoom(e.target.value)
  slider.blur();
});