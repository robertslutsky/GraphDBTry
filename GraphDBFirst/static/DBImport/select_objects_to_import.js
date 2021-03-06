var articleItemClassName = 'article';
var menu = document.querySelector(".context-menu");
var classifyText = document.getElementById("to-classify-text");
var menuState = 0;
var activeClassName = "context-menu--active";
var menuPosition;
var menuPositionX;
var menuPositionY;
var menuWidth;
var menuHeight;
var windowWidth;
var windowHeight;
var clickCoords;
var clickCoordsX;
var clickCoordsY;
windowWidth = window.innerWidth;
windowHeight = window.innerHeight;


function contextListener() {
  document.addEventListener( "contextmenu", function(e) {
    if ( clickInsideElement( e, articleItemClassName ) ) {
      e.preventDefault();
      toggleMenuOn();
      positionMenu(e);
    } else {
      toggleMenuOff();
    }
  });
}
/**
 * Turns the custom context menu on.
 */
function toggleMenuOn() {
  var selectedT = window.getSelection().toString().trim();
  if(selectedT){
    if ( menuState !== 1 ) {
      menuState = 1;
      menu.classList.add(activeClassName);
      classifyText.innerText = window.getSelection().toString();
    }
  }
}

function toggleMenuOff() {
  if ( menuState !== 0 ) {
    menuState = 0;
    menu.classList.remove(activeClassName);
  }
}

/**
 * Listens for click events.
 */
function clickListener() {

}

/**
 * Listens for keyup events.
 */
function keyupListener() {

}


function clickInsideElement( e, className ) {
  var el = e.srcElement || e.target;

  if ( el.classList.contains(className) ) {
    return el;
  } else {
    while ( el = el.parentNode ) {
      if ( el.classList && el.classList.contains(className) ) {
        return el;
      }
    }
  }

  return false;
}
function clickListener() {
  document.addEventListener( "click", function(e) {
    var button = e.which || e.button;
    if ( button === 1 ) {
      toggleMenuOff();
    }
  });
}
function getPosition(e) {
  var posx = 0;
  var posy = 0;
  if (!e) var e = window.event;

  if (e.pageX || e.pageY) {
    posx = e.pageX;
    posy = e.pageY;
  } else if (e.clientX || e.clientY) {
    posx = e.clientX + document.body.scrollLeft +
                       document.documentElement.scrollLeft;
    posy = e.clientY + document.body.scrollTop +
                       document.documentElement.scrollTop;
  }

  return {
    x: posx,
    y: posy
  }
}
function positionMenu(e) {
  clickCoords = getPosition(e);
  clickCoordsX = clickCoords.x;
  clickCoordsY = clickCoords.y;

  menuWidth = menu.offsetWidth + 4;
  menuHeight = menu.offsetHeight + 4;

  windowWidth = window.innerWidth;
  windowHeight = window.innerHeight;

  if ( (windowWidth - clickCoordsX) < menuWidth ) {
    menu.style.left = windowWidth - menuWidth + "px";
  } else {
    menu.style.left = clickCoordsX + "px";
  }

  if ( (windowHeight - clickCoordsY) < menuHeight ) {
    menu.style.top = windowHeight - menuHeight + "px";
  } else {
    menu.style.top = clickCoordsY + "px";
  }
}
var token = document.getElementsByName("csrfmiddlewaretoken")[0].value;
var objectTable = document.getElementById("object-table");
// handle label button press
function labelButton(e){
  e.preventDefault();
  var label = $(this).text();
  var row = objectTable.insertRow();
  var anchorOffset = window.getSelection().anchorOffset;
  var focusOffset = window.getSelection().focusOffset;
  var start = Math.min(anchorOffset, focusOffset);
  var end = Math.max(anchorOffset, focusOffset);
  row.setAttribute("data-start",start);
  row.setAttribute("data-end",end);

  var nameCell = row.insertCell(0);
  var labelCell = row.insertCell(1);
  var nameInput = document.createElement("INPUT");
  nameInput.setAttribute("type", "text");
  nameInput.setAttribute("value", classifyText.innerText);
  var labelInput = document.createElement("INPUT");
  labelInput.setAttribute("type", "text");
  labelInput.setAttribute("value", e.target.innerText);
  nameCell.appendChild(nameInput);
  labelCell.appendChild(labelInput);
}

 function createObjectsInGraph(e){
  var objectLabelPairs = [];
  var objectLabelQuads = [];
  for(var i = 1; i < objectTable.rows.length; i++){
    var row = objectTable.rows[i];
    var name = row.cells[0].firstChild.value;
    var label = row.cells[1].firstChild.value;
    objectLabelPairs.push([name,label]);
    if(name == row.cells[0].firstChild.getAttribute("value") && label == row.cells[1].firstChild.getAttribute("value")){
      objectLabelQuads.push([name, label, row.getAttribute("data-start"),row.getAttribute("data-end")])
    }
  }
  $.ajax({
    method: "POST",
    headers: { "X-CSRFToken": token },
    url: '/DBImport/ajax-create-objects',
    data: {
      'object_label_pairs': JSON.stringify(objectLabelPairs),
    },
    dataType: 'json',
    async: false,
    });
    $.ajax({
      method: "POST",
      headers: { "X-CSRFToken": token },
      url: '/DBImport/ajax-create-objects-ner',
      data: {
        'object_label_quads': JSON.stringify(objectLabelQuads),
        'text': text
      },
      dataType: 'json',
      async: false,
      });
}
/**
 * Initialise our application's code for the menu
 */
function init() {
  contextListener();
  clickListener();
  keyupListener();
  document.getElementById('article').addEventListener("contextmenu", function(e){
    e.preventDefault();
    toggleMenuOn();
  });
  var articleText = document.createTextNode(text);
  document.getElementById('article').appendChild(articleText);
  document.querySelectorAll(".label-button ").forEach(item => item.addEventListener("click",labelButton));
  document.getElementById("create-objects-button").addEventListener("click", createObjectsInGraph);
}
init();
