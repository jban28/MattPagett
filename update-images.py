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
        last = f'<a href="../{lowercase}/{row-1}C.html"><span class="material-icons">west</span></a>'
      elif (col == "B"):
        last = f'<a href="../{lowercase}/{row}A.html"><span class="material-icons">west</span></a>'
      elif (col == "C"):
        last = f'<a href="../{lowercase}/{row}B.html"><span class="material-icons">west</span></a>'
      else:
        last = ""
      
      if (col == "A"):
        next = f'<a href="../{lowercase}/{row}B.html"><span class="material-icons">east</span></a>'
      elif (col == "B"):
        next = f'<a href="../{lowercase}/{row}C.html"><span class="material-icons">east</span></a>'
      elif (col == "C") and row != max_row:
        next = f'<a href="../{lowercase}/{row+1}A.html"><span class="material-icons">east</span></a>'
      else:
        next = ""

      url = f"{lowercase}/{row}{col}.html"
      filepath_thumb = f"360 {lowercase}/360_{lowercase}_{row}{col}.jpg"
      filepath_main = f"2480 {lowercase}/2480_{lowercase}_{row}{col}.jpg"
      caption = f"{caption_list[i]}"[:-1]

      grid.write(f'''      
        <div class="col img-tile">
          <a href="{url}"><img class="img-fluid" alt="{caption_list[i]}" src="{filepath_thumb}"></a>
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
  
    <!--Icon stylesheet-->
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">

    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>

    <link href="../base.css" rel="stylesheet"/>
    <link href="../image_page.css" rel="stylesheet"/>

    <link rel="icon" type="image/x-icon" href="favicon.png">
  </head>
  
  <body>
    <div style="height: 100vh; display: flex; flex-flow: column; padding-bottom: 14px;">
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
        </div>
      </nav>
      
      <div class="container-fluid" style="padding-top: 12px;">
        <p>"""+caption+"""</p>
        <div id="controls">
          """+last+next+"""
          <span id="full-screen" class="material-icons">fullscreen</span>
          <span id="help-button" class="material-icons">help_outline</span>
          <input type="range" min="0" max="1" value="0" step="0.01", id="slider" label="zoom"/>
        </div>
      </div>
        <div id="external-frame">
          <div id="frame">
            <img src="../"""+filepath_main+"""\" alt=\""""+caption+"""\" id="image"/>
          </div>
        </div>
      </div>
    </div>
    
    <div id="help-window">
      <div id="help-content">
        <span id="help-close" class="material-icons">close</span>
        <p>On mobile/touchscreen, the image can be zoomed using the slider or by pinching the image with two fingers. Tapping on the image will zoom by a fixed amount.</p>
        <p>On desktop, the image can be zoomed using the mouse wheel or trackpad scroll function. Clicking the image will zoom by a fixed amount. The image can be moved around by clicking and dragging or by using the arrow keys.</p>
        <p>You can enter fullscreen mode by clicking on the <span class="material-icons">fullscreen</span> icon</p>
        <p>You can navigate to the previous image in the set using <span class="material-icons">west</span> and to the next image in the set using <span class="material-icons">east</span>
      </div>
    </div>

    <script src="../image_page.js"></script>

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