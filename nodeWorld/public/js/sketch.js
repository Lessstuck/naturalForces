// window.addEventListener( 'resize', onWindowResize, false );
// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }
var tip = 0.;

 var socket = io.connect('//localhost:3000');
//var socket = io.connect(window.location.origin);
socket.on('mysocket', function(data) {
    console.log(data[0]);
    tip = data[0];
    // if(data[0] ==="/tip" && data[1] !== null){
    //   console.log(data);
    //x = map(data[1], 0, 1, -400, 400);
  });
socket.on('error', function() {
  console.error(arguments)
});

//
// var scene = new THREE.Scene();
// var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
// camera.position.z = 4;
// var renderer = new THREE.WebGLRenderer({
//   antialias: true
// });
// renderer.setClearColor("#000000");
// renderer.setSize(window.innerWidth, window.innerHeight);
// // Append Renderer to DOM
// console.log('renderer: ', renderer.domElement);
// document.body.appendChild(renderer.domElement);
//
// scene.add( new THREE.AmbientLight( 0xffffff, 2 ) );
// var textureLoader = new THREE.TextureLoader();
// var earthTexture = textureLoader.load( './models/Earth_TEXTURE_CM.jpg' );
// var earthBall = new THREE.OBJLoader();
// var Earth;
// var obloaded = false;
// earthBall.setPath( './models/' );
// earthBall.load( 'Earth.obj', function ( object ) {
//     scene.add( object );
//     object.scale.set(.45, .45,.45);
//     Earth = object;
//     obloaded = true;
// })
// var earthMat = new THREE.MTLLoader();
// earthMat.setPath( './models/' );
// earthMat.load( "Earth.mtl", function( materials ) {
//     materials.preload();
//     earthBall.setMaterials( materials );
//   });
//
// var render = function() {
//   requestAnimationFrame(render);
//   if (obloaded) {
//     Earth.rotation.y += (spinSpeed*(Math.PI / 180));
//     Earth.rotation.y %=360;
//   renderer.render(scene, camera);
// };
//
// render();
