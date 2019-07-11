// Make connection
var socket = io.connect('https://webrtckaja.herokuapp.com/');

//'https://webrtckaja.herokuapp.com/'|| 

// Query DOM
var message = document.getElementById('message'),
      btn = document.getElementById('send'),
      output = document.getElementById('output');
      feedback = document.getElementById('feedback');

var handle = prompt("Please enter your name", "Harry Potter");
// Emit events
btn.addEventListener('click', function(){
  socket.emit('chat', {
      message: message.value,
      handle: handle
  });
  message.value = "";
});

message.addEventListener('keypress',function(){
  socket.emit('typing',handle);
});

// Listen for events
socket.on('chat', function(data){
	feedback.innerHTML = "";
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' : is typing' + '</em></p>';
});

// var handle = prompt("Please enter your name", "Harry Potter");


function setup() {
  var canvas = createCanvas(400, 400);
 
  // Move the canvas so it’s inside our <div id="sketch-holder">.
  canvas.parent('sketch-holder');
  background(51);

  // socket = io.connect('http://localhost:3000/');

  socket.on('mouse', function(data){
    noStroke(0);
    fill(255);
    ellipse(data.x,data.y,12,12);
  });
}

function mouseDragged(){
  console.log(mouseX + ',' + mouseY);
  var data = {
    x: mouseX,
    y: mouseY
  }

  socket.emit('mouse',data);

  noStroke(0);
  fill(255);
  ellipse(mouseX,mouseY,12,12);
}

function draw() {
  
}