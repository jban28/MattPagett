

const image = document.querySelector("#image");
const caption = document.querySelector("#caption");
const body = document.querySelector("body");
const slider = document.querySelector('#img-window');

var scrollAmount;
let mouseDown = false;
let startX, scrollLeft;
let startY, scrollTop;
let mouseX, mouseY;
let zoomed = false;

function fullScreen () {
  const elem = document.querySelector("#img-window");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
}

const curs = document.querySelector('#cursorPos');

let cursorPos = function(e) {
  let x, y;
  x = (e.pageX - image.offsetLeft + slider.scrollLeft) * 2480 / image.width;
  y = (e.pageY - image.offsetTop + slider.scrollTop) * 2480 / image.height;
  scrToX = x - (0.5 * slider.offsetWidth);
  scrToY = y - (0.5 * slider.offsetHeight);
  if (scrToX < 0){scrToX = 0};
  if (scrToY < 0){scrToY = 0};
};

let keyMove = function(e) {
  scrollAmount = 10;
  slider.scrollBy({behavior: 'smooth'});
  switch (e.key){
    case "ArrowLeft":
      slider.scrollBy({left: -scrollAmount,});
      break;
    case "ArrowRight":
      slider.scrollBy({left: +scrollAmount,});
      break;
    case "ArrowUp":
      slider.scrollBy({top: -scrollAmount,});
      break;
    case "ArrowDown":
      slider.scrollBy({top: +scrollAmount,});
      break;
  }
};

let keyStop = function(e) {
  scrollAmount = 0;
}

let zoomIn = function (e) {
  let x, y;
  x = (e.pageX - image.offsetLeft + slider.scrollLeft) * 2480 / image.width;
  y = (e.pageY - image.offsetTop + slider.scrollTop) * 2480 / image.height;
  scrToX = x - (0.5 * slider.offsetWidth);
  scrToY = y - (0.5 * slider.offsetHeight);
  if (scrToX < 0){scrToX = 0};
  if (scrToY < 0){scrToY = 0};
  image.style.height = "2480px";
  image.style.cursor = "grab";
  image.style.maxWidth = "none";
  slider.scrollLeft = scrToX;
  slider.scrollTop = scrToY;
  zoomed = true;
}

let zoomOut = function (e) {
  image.style.height = "inherit";
  image.style.cursor = "zoom-in";
  image.style.maxWidth = "100%";
  zoomed = false;
}

let startDragging = function (e) {
  mouseDown = true;
  mouseX = e.pageX;
  mouseY = e.pageY;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  startY = e.pageY - slider.offsetTop;
  scrollTop = slider.scrollTop;
  image.style.cursor = "grabbing";
  curs.innerHTML = String(mouseX) + "px " + String(mouseX) + "px";
};

let stopDragging = function (e) {
  mouseDown = false;
  image.style.cursor = "grab";
  if (e.pageX == mouseX && e.pageY == mouseY) {
    if (zoomed == false) {zoomIn(e);}
    else if (zoomed == true) {zoomOut(e)};
    
  };
};

slider.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - slider.offsetLeft;
  const scrollX = x - startX;
  slider.scrollLeft = scrollLeft - scrollX;

  const y = e.pageY - slider.offsetTop;
  const scrollY = y - startY;
  slider.scrollTop = scrollTop - scrollY;
});

slider.addEventListener('wheel', (e) => {
  e.preventDefault();
})

// Add the event listeners
document.addEventListener('mousemove', cursorPos);
//image.addEventListener('click', zoomIn);
slider.addEventListener('mousedown', startDragging);
slider.addEventListener('mouseup', stopDragging);
slider.addEventListener('mouseleave', stopDragging);
slider.addEventListener('touchstart', startDragging);
slider.addEventListener('touchend', stopDragging);
document.addEventListener('keydown', keyMove);
document.addEventListener('keyup', keyStop);