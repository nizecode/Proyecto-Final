import * as THREE from 'https://cdn.skypack.dev/three@0.131.3';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.131.3/examples/jsm/loaders/GLTFLoader.js';


// Declaraciones //
var keyboard = {};
var player = { height:4, speed:0.03, turnSpeed:Math.PI*0.003 };

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
const renderer = new THREE.WebGLRenderer();

// Paleta de colores
const palette = {
  bgColor: '#34495e', // CSS String
};

let size = 0;
let frog;
let turtle;
let wolf;
let column;
let accesories;
let plane = undefined;
let spotLight;
let objects = [];

document.body.onload = () => {
  main();
  
};

window.onresize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight, true);
};

function main() {
  // Configuracion inicial
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true;
  renderer.setClearColor(palette.bgColor, 1);
  document.body.appendChild(renderer.domElement);


  // Controls
  camera.position.set(0, player.height, -5);
  camera.lookAt(new THREE.Vector3(0,player.height,0));


  //videos
  let videoc = video(14, 10, 4, 4, 0xffffff);
  videoc.position.x = -15.55;
  videoc.position.z = 3.5;
  videoc.position.y = 6;
  videoc.rotation.y = Math.PI / -2;
  scene.add (videoc);

  let videog = video2(12, 10, 4, 4, 0xffffff);
  videog.position.x = 14.4;
  videog.position.z = 15;
  videog.position.y = 6;
  videog.rotation.y = Math.PI / -2;
  scene.add (videog);

  let videocb = video3(14, 10, 4, 4, 0xffffff);
  videocb.position.x = -8;
  videocb.position.z = 42.9;
  videocb.position.y = 6;
  videocb.rotation.y = Math.PI / 1;
  scene.add (videocb);

  //audio
  audioambiente();
  

  // Lights
  setupLights();
  setupLights2();
  

  // Modelos
  // Modelos Principales
  let loader = new GLTFLoader();

  loader.load(
    'assets/wolf/scene.gltf',
    function (gltf) {
      wolf = gltf.scene.children[0];
      wolf.position.x = -6;
      wolf.position.z = 40;
      wolf.position.y = 2;
      wolf.rotation.z = Math.PI / 2;
      wolf.scale.set(5, 5, 5)
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/frog/scene.gltf',
    function (gltf) {
      frog = gltf.scene.children[0];
      frog.position.x = 13;
      frog.position.z = 15.5;
      frog.position.y = 3.75;
      frog.scale.set(0.3, 0.3, 0.3)
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/turtle/scene.gltf',
    function (gltf) {
      turtle = gltf.scene.children[0];
      turtle.position.x = -17;
      turtle.position.z = 4;
      turtle.position.y = 4;
      turtle.scale.set(0.05, 0.05, 0.05)
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  //Carga modelos adorno
  loader.load(
    'assets/elephant_skulls/scene.gltf',
    function (gltf) {
      accesories = gltf.scene.children[0];
      accesories.position.x = -22.5;
      accesories.position.z = -9.7;
      accesories.position.y = 5;
      accesories.scale.set(1.5, 1.5, 1.5)
      accesories.rotation.z = Math.PI / -20;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/tiger_skull/scene.gltf',
    function (gltf) {
      accesories = gltf.scene.children[0];
      accesories.position.x = -10;
      accesories.position.z = 13.3;
      accesories.position.y = 4;
      accesories.scale.set(0.5, 0.5, 0.5)
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/orangutan_skull/scene.gltf',
    function (gltf) {
      accesories = gltf.scene.children[0];
      accesories.position.x = -13;
      accesories.position.z = 16.5; 
      accesories.position.y = 4;
      accesories.scale.set(0.08, 0.08, 0.08)
      accesories.rotation.z = Math.PI / -2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/orangutan_skull/scene.gltf',
    function (gltf) {
      accesories = gltf.scene.children[0];
      accesories.position.x = -7;
      accesories.position.z = 16.5; 
      accesories.position.y = 4;
      accesories.scale.set(0.08, 0.08, 0.08)
      accesories.rotation.z = Math.PI / -2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );


  //Carga columnas
  loader.load(
    'assets/greek_column/scene.gltf',
    function (gltf) {
      column = gltf.scene.children[0];
      column.position.x = 13.5;
      column.position.z = 1.5;
      column.position.y = 0.5;
      column.scale.set(0.02, 0.02, 0.032)
      column.rotation.z = Math.PI / 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/greek_column/scene.gltf',
    function (gltf) {
      column = gltf.scene.children[0];
      column.position.x = 13.5;
      column.position.z = 28.5;
      column.position.y = 0.5;
      column.scale.set(0.02, 0.02, 0.032)
      column.rotation.z = Math.PI / 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/greek_column/scene.gltf',
    function (gltf) {
      column = gltf.scene.children[0];
      column.position.x = -28.5;
      column.position.z = 28.5;
      column.position.y = 0.5;
      column.scale.set(0.02, 0.02, 0.032)
      column.rotation.z = Math.PI / 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/greek_column/scene.gltf',
    function (gltf) {
      column = gltf.scene.children[0];
      column.position.x = -16;
      column.position.z = 16;
      column.position.y = 0.5;
      column.scale.set(0.02, 0.02, 0.032)
      column.rotation.z = Math.PI / 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  loader.load(
    'assets/greek_column/scene.gltf',
    function (gltf) {
      column = gltf.scene.children[0];
      column.position.x = -4;
      column.position.z = 16;
      column.position.y = 0.5;
      column.scale.set(0.02, 0.02, 0.032)
      column.rotation.z = Math.PI / 2;
      scene.add(gltf.scene);
      animate();
    },
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + '% cargado');
    },
    function (error) {
      console.log('Un error ocurrio');
    },
  );

  //Estructuras
  //Walls
  let el = drawCube(0xF0E0B5, false);
  el.position.x = -30;
  el.position.z = 10;
  el.position.y = 6;
  scene.add(el);
  objects.push(el);

  let ol = drawCube1(0xF0E0B5, false);
  ol.position.x = 0;
  ol.position.z = 37;
  ol.position.y = 6;
  scene.add(ol);
  objects.push(ol);

  let ool = drawCube1(0xF0E0B5, false);
  ool.position.x = 7;
  ool.position.z = 30;
  ool.position.y = 6;
  ool.rotation.y = Math.PI / 2;
  scene.add(ool);
  objects.push(ool);

  let ill = drawCube1(0xF0E0B5, false);
  ill.position.x = -23;
  ill.position.z = 30;
  ill.position.y = 6;
  ill.rotation.y = Math.PI / 2;
  scene.add(ill);
  objects.push(ill);

  let oll = drawCube1(0xF0E0B5, false);
  oll.position.x = -8;
  oll.position.z = 43.5;
  oll.position.y = 6;
  oll.rotation.y = Math.PI / 2;
  scene.add(oll);
  objects.push(oll);

  let il = drawCube1(0xF0E0B5, false);
  il.position.x = -16;
  il.position.z = 37;
  il.position.y = 6;
  scene.add(il);
  objects.push(il);

  let al = drawCube2(0xF0E0B5, false);
  al.position.x = 15;
  al.position.z = 15;
  al.position.y = 6;
  scene.add(al);
  objects.push(al);

  let iil = drawCube3(0xF0E0B5, false);
  iil.position.x = -10;
  iil.position.z = 15;
  iil.position.y = 6;
  iil.rotation.y = Math.PI / 2;
  scene.add(iil);
  objects.push(iil);

  let eel = drawCube3(0xF0E0B5, false);
  eel.position.x = -5;
  eel.position.z = -7;
  eel.position.y = 6;
  scene.add(eel);
  objects.push(eel);

  let el1 = drawCube3(0xF0E0B5, false);
  el1.position.x = 5;
  el1.position.z = -5;
  el1.position.y = 6;
  scene.add(el1);
  objects.push(el1);

  let eell = drawCube3(0xF0E0B5, false);
  eell.position.x = 0;
  eell.position.z = -10;
  eell.position.y = 6;
  eell.rotation.y = Math.PI / 2;
  scene.add(eell);
  objects.push(eell);

  let bl = drawCube4(0xF0E0B5, false);
  bl.position.x = -22.5;
  bl.position.z = -10;
  bl.position.y = 6;
  bl.rotation.y = Math.PI / 2;
  scene.add(bl);
  objects.push(bl);

  let cl = drawCube4(0xF0E0B5, false);
  cl.position.x = 11.5;
  cl.position.z = 0;
  cl.position.y = 6;
  cl.rotation.y = Math.PI / 2;
  scene.add(cl);
  objects.push(cl);

  let dl = drawCube5(0xF0E0B5, false);
  dl.position.x = -15;
  dl.position.z = 5.5;
  dl.position.y = 6;
  scene.add(dl);
  objects.push(dl);

  let dl1 = drawCube5(0xF0E0B5, false);
  dl1.position.x = -15;
  dl1.position.z = -0.5;
  dl1.position.y = 6;
  scene.add(dl1);
  objects.push(dl1);

  let fl = drawCube5(0xF0E0B5, false);
  fl.position.x = -5;
  fl.position.z = 5.5;
  fl.position.y = 6;
  scene.add(fl);
  objects.push(fl);
  
  //principal ceiling
  let techo = drawCube6(0xF0E0B5, false);
  techo.position.x = -8;
  techo.position.z = 15;
  techo.position.y = 12;
  techo.rotation.z = Math.PI / 2;
  scene.add(techo);
  objects.push(techo);

  //Bases de modelos
  let base1 = drawCube7(0xF0E0B5, false);
  base1.position.x = 13;
  base1.position.z = 15;
  base1.position.y = 1;
  scene.add(base1);
  objects.push(base1);

  let base2 = drawCube7(0xF0E0B5, false);
  base2.position.x = -8;
  base2.position.z = 40;
  base2.position.y = 0;
  base2.rotation.y = Math.PI / 2;
  scene.add(base2);
  objects.push(base2);

  let base3 = drawCube7(0xF0E0B5, false);
  base3.position.x = -17;
  base3.position.z = 3.1;
  base3.position.y = 1;
  scene.add(base3);
  objects.push(base3);

  let base4 = drawCube8(0xB8B5B0, false);
  base4.position.x = -10;
  base4.position.z = 16;
  base4.position.y = 3;
  base4.rotation.z = Math.PI / 2;
  scene.add(base4);
  objects.push(base4);
  
  //Floor
  let plane = drawPlane(46, 55, 4, 4, 0x404040, true);
  plane.position.x = -7;
  plane.position.z = 17;
  plane.position.y = 0;
  plane.rotation.x = Math.PI / 2;
  scene.add(plane);

  animate();
}

function drawPlane(w, h, sh, sw, color, ds = false) {
  const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
  const material = new THREE.MeshBasicMaterial({
    color,
    side: THREE.DoubleSide,
  });
  plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;
  return plane;
}

function drawCube(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 12, 40);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube1(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 12, 15);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}


function drawCube2(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 12, 30);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube3(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 12, 10);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube4(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 12, 14);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube5(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 12, 20);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube6(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(1, 50, 55);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube7(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(2, 4, 5);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

function drawCube8(color, wireframe = false) {
  const geometry = new THREE.BoxGeometry(0.5, 10, 3);
  const material = new THREE.MeshPhongMaterial({
    color: color,
    wireframe: wireframe,
  });
  const cube = new THREE.Mesh(geometry, material);
  cube.castShadow = true;
  return cube;
}

//Funciones de video
function video(w, h, sh, sw, color) {
  const video = document.getElementById('videoturtle');
  const texture = new THREE.VideoTexture(video);
  const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
  const material = new THREE.MeshBasicMaterial({
    color,
    map: texture,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;

  return plane;
}

function video2(w, h, sh, sw, color) {
  const video = document.getElementById('videofrog');
  const texture = new THREE.VideoTexture(video);
  const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
  const material = new THREE.MeshBasicMaterial({
    color,
    map: texture,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;

  return plane;
}

function video3(w, h, sh, sw, color) {
  const video = document.getElementById('videowolf');
  const texture = new THREE.VideoTexture(video);
  const geometry = new THREE.PlaneGeometry(w, h, sw, sh);
  const material = new THREE.MeshBasicMaterial({
    color,
    map: texture,
  });
  const plane = new THREE.Mesh(geometry, material);
  plane.receiveShadow = true;

  return plane;
}

//Funcion de audio

function audioambiente(){

  var listener = new THREE.AudioListener();
  camera.add( listener );

  // global audio source
  var sound = new THREE.Audio( listener );

  var audioLoader = new THREE.AudioLoader();

  //carga del audio
  audioLoader.load( 'assets/Musica al Museo  R Schumann  F Mendelssohn B.mp3', function( buffer ) {
      sound.setBuffer( buffer );
      sound.setLoop(true);
      sound.setVolume(0.01);
      sound.play();
  });
  scene.add (sound);

}

//Funciones SetupLights/Luces
function setupLights() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(-10, 11.5, 10);
  spotLight.angle = Math.PI;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 50;

  spotLight.castShadow = true;
  scene.add(spotLight);

}

function setupLights2() {
  const ambient = new THREE.AmbientLight(0xffffff, 0.4);
  scene.add(ambient);

  spotLight = new THREE.SpotLight(0xffffff, 1);
  spotLight.position.set(-10, 11.5, 20);
  spotLight.angle = Math.PI;
  spotLight.penumbra = 0.1;
  spotLight.decay = 2;
  spotLight.distance = 50;

  spotLight.castShadow = true;
  scene.add(spotLight);

}


// Funcion Animate/Player
function animate() {
  requestAnimationFrame(animate);
  if(keyboard[87]){ // W key
    camera.position.x -= (Math.sin(camera.rotation.y) * player.speed)*0.8;
    camera.position.z -= (-Math.cos(camera.rotation.y) * player.speed)*0.8;
    }
  if(keyboard[83]){ // S key
    camera.position.x += (Math.sin(camera.rotation.y) * player.speed)*0.8;
    camera.position.z += (-Math.cos(camera.rotation.y) * player.speed)*0.8;
    }
  if(keyboard[65]){ // A key
    camera.position.x += (Math.sin(camera.rotation.y + Math.PI/2) * player.speed)*0.8;
    camera.position.z += (-Math.cos(camera.rotation.y + Math.PI/2) * player.speed)*0.8;
    }
  if(keyboard[68  ]){ // D key
    camera.position.x += (Math.sin(camera.rotation.y - Math.PI/2) * player.speed)*0.8;
    camera.position.z += (-Math.cos(camera.rotation.y - Math.PI/2) * player.speed)*0.8;
    }
  if(keyboard[37]){ // left arrow key
    camera.rotation.y -= player.turnSpeed*0.8;
    }
  if(keyboard[39]){ // right arrow key
    camera.rotation.y += player.turnSpeed*0.8;
    }
    renderer.render(scene, camera);
  

  }
  function keyDown(event){
    keyboard[event.keyCode] = true;
  }
  
  function keyUp(event){
    keyboard[event.keyCode] = false;
  }
  
  window.addEventListener('keydown', keyDown);
  window.addEventListener('keyup', keyUp);

