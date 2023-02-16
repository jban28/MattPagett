lowercase = "bodies"
caps = "Bodies"
navbar_bodies = "nav-link active"
navbar_flowers = "nav-link"
breakout = False
max_row = 16
last = ""
next = ""

while True:
  caption_file = open(f"{lowercase}_captions.txt")
  caption_list = caption_file.readlines()
  grid = open(f"{lowercase}.html", "w")
  grid.write(f"""
<!DOCTYPE html>
<html>

  <head>
    <title>Matt Pagett | Bodies</title>

    <!-- Bootstrap stylesheet and script -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <link href="base.css" rel="stylesheet"/>

    <link rel="icon" type="image/x-icon" href="favicon.png">

  </head>
  
  <body>
    <nav class="navbar navbar-expand-sm">
      <div class="container-fluid">
        <a class="navbar-brand" href="index.html">MATT PAGETT</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
        data-bs-target="#collapsibleNavbar">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="collapsibleNavbar">
          <ul class="navbar-nav w-100 justify-content-between">
            <li class="nav-item hide-sm">
              <a class="nav-link active" style="padding-left: 0px;" href="index.html">MATT PAGETT</a>
            </li>
            <li class="nav-item">
              <a class="{navbar_bodies}" href="bodies.html">Bodies</a>
            </li>
            <li class="nav-item">
              <a class="{navbar_flowers}" href="flowers.html">Flowers</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="books.html">Books</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" style="padding-right: 0px" href="about.html">About/Contact</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
""")
  
  i = 0
  for row in range(1,max_row+1):
    grid.write('''
    <div class="row img-tile-row">''')
    for col in ["A", "B", "C"]:
      if (col == "A") and (row != 1):
        last = f'<a href="../{lowercase}/{row-1}C.html">&lt;&lt;&lt;</a>'
      elif (col == "B"):
        last = f'<a href="../{lowercase}/{row}A.html">&lt;&lt;&lt;</a>'
      elif (col == "C"):
        last = f'<a href="../{lowercase}/{row}B.html">&lt;&lt;&lt;</a>'
      else:
        last = ""
      
      if (col == "A"):
        next = f'<a href="../{lowercase}/{row}B.html">&gt;&gt;&gt;</a>'
      elif (col == "B"):
        next = f'<a href="../{lowercase}/{row}C.html">&gt;&gt;&gt;</a>'
      elif (col == "C") and row != max_row:
        next = f'<a href="../{lowercase}/{row+1}A.html">&gt;&gt;&gt;</a>'
      else:
        next = ""

      url = f"{lowercase}/{row}{col}.html"
      filepath_thumb = f"360 {lowercase}/360_{lowercase}_{row}{col}.jpg"
      filepath_main = f"2480 {lowercase}/2480_{lowercase}_{row}{col}.jpg"
      caption = f"""{last} {str(row)}{str(col)} {next} <br />{caption_list[i]}"""

      grid.write(f'''      
        <div class="col img-tile">
          <a href="{url}"><img class="img-fluid" alt="{caption}" src="{filepath_thumb}"></a>
        </div>''')

      file = open(f"{url}", "w")
      file.write("""
<!DOCTYPE html>
<html>

  <head>
    <title>Matt Pagett | """+caps+"""</title>

    <!-- Bootstrap stylesheet and script -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet"/>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js"></script>
  
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <link href="../base.css" rel="stylesheet"/>

    <link rel="icon" type="image/x-icon" href="favicon.png">

    <style>
      #image{
        cursor: zoom-in;
      }
    </style>
  </head>
  
  <body>
    <div class="container-fluid" style="height: 100vh; display: flex; flex-flow: column; padding-bottom: 14px;">
      <nav class="navbar navbar-expand-sm">
          <a class="navbar-brand" href="index.html">MATT PAGETT</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#collapsibleNavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav w-100 justify-content-between">
              <li class="nav-item hide-sm">
                <a class="nav-link active" style="padding-left: 0px;" href="../index.html">MATT PAGETT</a>
              </li>
              <li class="nav-item">
                <a class=\""""+navbar_bodies+"""\" href="../bodies.html">Bodies</a>
              </li>
              <li class="nav-item">
                <a class=\""""+navbar_flowers+"""\" href="../flowers.html">Flowers</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../books.html">Books</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" style="padding-right: 0px" href="../about.html">About/Contact</a>
              </li>
            </ul>
          </div>
      </nav>
      
      <div id="caption"><p>"""+caption+"""</p></div>

      <div class="d-flex"></div>
          <div id="img-window" style="margin:0px; height:100%; text-align:center; overflow: hidden;">
            <img src="../"""+filepath_main+"""\" alt=\""""+caption_list[i]+"""\" id="image" style="height:inherit; max-width: 100%; object-fit: contain;"/>
          </div>
        </div>
      </div>
    </div>

    <script>

    </script>

    <script>
      const image = document.querySelector("#image");
      const caption = document.querySelector("#caption");
      const body = document.querySelector("body");
      const slider = document.querySelector('#img-window');

      let mouseDown = false;
      let startX, scrollLeft;

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
    
    </script>

  </body>

</html>""")

      i += 1
    grid.write('''
    </div>''')


  grid.write('''
  </body>
</html>''')

  if breakout == True:
    break

  breakout = True
  lowercase = "flowers"
  caps = "Flowers"
  navbar_bodies = "nav-link"
  navbar_flowers = "nav-link active"
  max_row = 19