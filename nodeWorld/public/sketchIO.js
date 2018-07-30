var x, y,z,tx,ty,t1,t2,t3,f4,b1,b3,b3,b4,b,bg, head;

var socket = io.connect(window.location.origin);

socket.on('mysocket', function(data) {
    console.log(data[0] + " " + data[1]);
    if(data[0] ==="/1/fader1" && data[1] !== null){
    x = map(data[1], 0, 1, -400, 400);
    }
    if(data[0] ==="/1/fader2" && data[1] !== null){
        y = map(data[1], 0, 1, -400, 400);
    }
    if(data[0] ==="/1/fader3" && data[1] !== null){
        z = map(data[1], 0, 1, -400, 400);
    }
    if(data[0] ==="/1/fader4" && data[1] !== null){
        f4 = map(data[1], 0, 1, 0, 400);
    }
    if(data[0] ==="/1/xy" && data[1] !== null){
        tx = map(data[1], 0, 1, -400, 400);
        ty = map(data[2], 0, 1, -400, 400);
    }
    if(data[0] ==="/1/toggle1" && data[1] !== null){
        t1 = data[1];
    }
    if(data[0] ==="/1/toggle2" && data[1] !== null){
        t2 = data[1];
    }
    if(data[0] ==="/1/toggle3" && data[1] !== null){
        t3 = data[1];
    }
    if(data[0] ==="/1/push1" && data[1] !== null){
        b1 = data[1];
    }
    if(data[0] ==="/1/push2" && data[1] !== null){
        b2 = data[1];
    }
    if(data[0] ==="/1/push3" && data[1] !== null){
        b3 = data[1];
    }
    if(data[0] ==="/1/push4" && data[1] !== null){
        b4 = data[1];
    }

});
function preload() {
    head = loadModel('./public/model/head.obj');
  }

function setup(){
    createCanvas(1024, 768, WEBGL);
  }

  function draw(){
    background(0);
    if(t1 === 0){
    background(255);
    } else if(t1 === 1){
    background(0);
    }
    translate(x, y, z);
    specularMaterial(500);
    if(t2 === 1){
        rotateZ(frameCount * 0.02);
        rotateX(frameCount * 0.02);
        rotateZ(frameCount * 0.02);
    } else if(t2 === 0){
        rotateZ(0);
        rotateX(0);
        rotateZ(0);
    }

    if(t3 === 1){
    rotateY(frameCount * 0.01);
    for(var j = 0; j < f4; j++){
      push();
      for(var i = 0; i < 80; i++){
        translate(sin(frameCount * 0.001 + j) * 100, sin(frameCount * 0.001 + j) * 100, i * 0.1);
        rotateZ(frameCount * 0.002);
        push();
        sphere(8, 6, 4);
        pop();
      }
      pop();
    }
}

    model(head);

    ambientLight(50);
    directionalLight(200, 0, 0, 0.25, 0.25, 0.25);
    pointLight(0, 0, 200, -tx, -ty, 0);
    pointLight(200, 200, 0, tx, ty, 0);

    push();
    translate(-250, 0, 0);
    rotateZ(frameCount * 0.02);
    rotateX(frameCount * 0.02);
    specularMaterial(250);
    translate(x, y, z);
    box(100, parseInt(x), parseInt(x));
    pop();

    translate(-250, 0, 0);

    // ambientMaterial(parseInt(x));
    sphere(120, 64);
  }
