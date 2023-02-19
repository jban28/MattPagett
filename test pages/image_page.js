

const image = document.querySelector("#image");
const caption = document.querySelector("#caption");
const body = document.querySelector("body");
const slider = document.querySelector('#img-window');
var scrollAmount;
let mouseDown = false;
let startX, scrollLeft;

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
  image.style.height = "2480px";
  image.style.cursor = "grab";
  image.style.maxWidth = "none";
  body.addEventListener('click', zoomOut, true);
  image.addEventListener('dblclick', zoomOut);
  image.removeEventListener('click', zoomIn);
  body.style.cursor = "zoom-out";
}

let zoomOut = function (e) {
  image.style.height = "inherit";
  image.style.cursor = "zoom-in";
  image.style.maxWidth = "100%";
  image.addEventListener('click', zoomIn);
  image.removeEventListener('dblclick', zoomOut);
  body.removeEventListener('click', zoomOut, true);
  body.style.cursor = "auto";
}

let startDragging = function (e) {
  mouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
  startY = e.pageY - slider.offsetTop;
  scrollTop = slider.scrollTop;
  image.style.cursor = "grabbing";
};
let stopDragging = function (event) {
  mouseDown = false;
  image.style.cursor = "grab"
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

// Add the event listeners
image.addEventListener('click', zoomIn);
slider.addEventListener('mousedown', startDragging);
slider.addEventListener('mouseup', stopDragging);
slider.addEventListener('mouseleave', stopDragging);
document.addEventListener('keydown', keyMove);
document.addEventListener('keyup', keyStop);