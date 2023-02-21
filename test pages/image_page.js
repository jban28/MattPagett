const image = document.querySelector("#image");
const body = document.querySelector("body");
const frame = document.querySelector('#img-window');
const slider = document.querySelector("#zoom-slider");
const output = document.querySelector("#test");

var scrollAmount;
let mouseDown = false;
let startX, scrollLeft;
let startY, scrollTop;
let mouseX, mouseY;
let zoomed = false;
let fitHeight = image.height;
let fitWidth = image.width;

function fullScreen () {
  const elem = document.querySelector("#img-window");
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
};

let zoom = function() {
  image.style.maxWidth = "none";
  image.style.height = "auto";
  image.height = fitHeight + (slider.value/100) * (image.naturalHeight - fitHeight);
  image.width = fitWidth + (slider.value/100) * (image.naturalWidth - fitWidth);
}

let keyMove = function(e) {
  scrollAmount = 10;
  frame.scrollBy({behavior: 'smooth'});
  switch (e.key){
    case "ArrowLeft":
      frame.scrollBy({left: -scrollAmount,});
      break;
    case "ArrowRight":
      frame.scrollBy({left: +scrollAmount,});
      break;
    case "ArrowUp":
      frame.scrollBy({top: -scrollAmount,});
      break;
    case "ArrowDown":
      frame.scrollBy({top: +scrollAmount,});
      break;
  }
};

let keyStop = function(e) {
  scrollAmount = 0;
};

let zoomIn = function (e) {
  let scrToX, scrToY;
  scrToX = (e.pageX - image.offsetLeft + frame.scrollLeft) * image.naturalWidth / image.width - (0.5 * frame.offsetWidth);
  scrToY = (e.pageY - image.offsetTop + frame.scrollTop) * image.naturalHeight / image.height - (0.5 * frame.offsetHeight);
  if (scrToX < 0){scrToX = 0};
  if (scrToY < 0){scrToY = 0};
  image.style.height = "2480px";
  image.style.cursor = "grab";
  image.style.maxWidth = "none";
  frame.scrollLeft = scrToX;
  frame.scrollTop = scrToY;
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
  startX = e.pageX - frame.offsetLeft;
  scrollLeft = frame.scrollLeft;
  startY = e.pageY - frame.offsetTop;
  scrollTop = frame.scrollTop;
  image.style.cursor = "grabbing";
};

let stopDragging = function (e) {
  mouseDown = false;
  image.style.cursor = "grab";
  if (e.pageX == mouseX && e.pageY == mouseY) {
    if (zoomed == false) {zoomIn(e);}
    else if (zoomed == true) {zoomOut(e)};
    
  };
};

frame.addEventListener('mousemove', (e) => {
  e.preventDefault();
  if(!mouseDown) { return; }
  const x = e.pageX - frame.offsetLeft;
  const scrollX = x - startX;
  frame.scrollLeft = scrollLeft - scrollX;

  const y = e.pageY - frame.offsetTop;
  const scrollY = y - startY;
  frame.scrollTop = scrollTop - scrollY;
});

frame.addEventListener('wheel', (e) => {
  e.preventDefault();
})

// Add the event listeners
frame.addEventListener('mousedown', startDragging);
frame.addEventListener('mouseup', stopDragging);
frame.addEventListener('mouseleave', stopDragging);
frame.addEventListener('touchstart', startDragging);
frame.addEventListener('touchend', stopDragging);
document.addEventListener('keydown', keyMove);
document.addEventListener('keyup', keyStop);
slider.addEventListener('input', zoom);

