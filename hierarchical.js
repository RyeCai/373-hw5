/* CMPSCI 373 Homework 5: Hierarchical Scene */

const width = 800, height = 600;
const fov = 60;
const cameraz = 5;
const aspect = width/height;
const smoothShading = true;
let   animation_speed = 1.0;

let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(fov, aspect, 1, 1000);
camera.position.set(0, 1, cameraz);

let renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(width, height);
renderer.setClearColor(0x202020);
window.onload = function(e) {
	document.getElementById('window').appendChild(renderer.domElement);
}
let orbit = new THREE.OrbitControls(camera, renderer.domElement);	// create mouse control

let light0 = new THREE.DirectionalLight(0xFFFFFF, 1.0);
light0.position.set(camera.position.x, camera.position.y, camera.position.z);	// this light is at the camera
scene.add(light0);

let light1 = new THREE.DirectionalLight(0x800D0D, 1.0); // red light
light1.position.set(-1, 1, 0);
scene.add(light1);

let light2 = new THREE.DirectionalLight(0x0D0D80, 1.0); // blue light
light2.position.set(1, 1, 0);
scene.add(light2);

let amblight = new THREE.AmbientLight(0x202020);	// ambient light
scene.add(amblight);

let material = new THREE.MeshPhongMaterial({color:0x808080, specular:0x101010, shininess: 50, side:THREE.FrontSide});
let metal = new THREE.MeshPhongMaterial({color:0x696969, specular:0x101010, shininess: 60, side:THREE.FrontSide});
let wood = new THREE.MeshLambertMaterial({color: 0x987456, reflectivity: 0.1});
let skin = new THREE.MeshLambertMaterial({color: 0xbc987e, reflectivity: 0.2});
let models = []; // array that stores all models
let numModelsLoaded = 0;
let numModelsExpected = 0;

// load models
// ===YOUR CODE STARTS HERE===
loadModel(head_model, skin, 'head');
loadModel(hand_model, skin, 'hand');
loadModel(stick_model, wood, 'stick');
loadModel(ico_model, metal, 'ball');
loadModel(ico_model, metal, 'pivot1');
loadModel(ring_model, metal, 'chain1');
loadModel(ico_model, metal, 'pivot2');
loadModel(ring_model, metal, 'chain2');
loadModel(ico_model, metal, 'pivot3');
loadModel(ring_model, metal, 'chain3');
loadModel(ico_model, metal, 'pivot4');
loadModel(ring_model, metal, 'chain4');

// ---YOUR CODE ENDS HERE---
// loadModel(bunny_model, material, 'sun');
// loadModel(bunny_model, material, 'earth');

// 'label' is a unique name for the model for accessing it later
function loadModel(objstring, material, label) {
	numModelsExpected++;
	loadOBJFromString(objstring, function(mesh) { // callback function for non-blocking load
		mesh.computeFaceNormals();
		if(smoothShading) mesh.computeVertexNormals();
		models[label] = new THREE.Mesh(mesh, material);
		numModelsLoaded++;
	}, function() {}, function() {});
}
let theta = 0;
let initialized = false;
let handMovement = new THREE.Group();
function animate() {
	requestAnimationFrame( animate );
	if(numModelsLoaded == numModelsExpected) {	// all models have been loaded
		if(!initialized) {
			initialized = true;
			// construct the scene by adding models
// ===YOUR CODE STARTS HERE===
			handMovement.add(models['hand']);
			handMovement.add(models['stick']);
			scene.add(models['head']);
			models['head'].scale.set(0.5, 0.5, 0.5);
			models['head'].add(handMovement);
			handMovement.position.z = 1;
			handMovement.position.y = -2.2;
			handMovement.position.x = -1;
			models['hand'].scale.set(0.8, 0.8, 0.8);
			models['hand'].rotation.z = 0.4;
			models['hand'].rotation.x = 0.3;
			models['hand'].position.x = -0.15;

			models['stick'].scale.set(1.2, 1.2, 1.2);
			models['stick'].rotation.x = Math.PI/2;
			models['stick'].position.z = 0.5;
			models['stick'].position.y = -0.2;
			
			models['stick'].add(models['pivot1']);
			models['pivot1'].scale.set(0.02, 0.02, 0.02);
			models['pivot1'].rotation.x = Math.PI/2 + 0.12;
			models['pivot1'].position.z = 0.25;
			models['pivot1'].position.y = 0.85;
			models['pivot1'].add(models['chain1']);
			models['chain1'].scale.set(10, 10, 10);
			models['chain1'].position.z = 8;

			models['pivot1'].add(models['pivot2']);
			models['pivot2'].position.z = 11;
			models['pivot2'].rotation.z = Math.PI/2;
			models['pivot2'].add(models['chain2']);
			models['chain2'].scale.set(10, 10, 10);
			models['chain2'].position.z = 8;

			models['pivot2'].add(models['pivot3']);
			models['pivot3'].position.z = 11;
			models['pivot3'].rotation.z = Math.PI/2;
			models['pivot3'].add(models['chain3']);
			models['chain3'].scale.set(10, 10, 10);
			models['chain3'].position.z = 8;

			models['pivot3'].add(models['pivot4']);
			models['pivot4'].position.z = 11;
			models['pivot4'].rotation.z = Math.PI/2;
			models['pivot4'].add(models['chain4']);
			models['chain4'].scale.set(10, 10, 10);
			models['chain4'].position.z = 8;
			
			models['chain4'].add(models['ball']);
			models['ball'].scale.set(1.5, 1.5, 1.5);
			models['ball'].position.z = 1.5;
// ---YOUR CODE ENDS HERE---
			// scene.add(models['sun']);
			// models['earth'].position.x=3;
			// scene.add(models['earth']);
		}
		// animate the scene
// ===YOUR CODE STARTS HERE===
		theta += 0.03 * animation_speed;
		handMovement.rotation.x = 0.5 * Math.sin(theta) * animation_speed;
		models['pivot1'].rotation.x = 0.6*Math.sin(theta) * animation_speed;
		models['pivot2'].rotation.x = 0.7*Math.sin(theta) * animation_speed;
		models['pivot2'].rotation.z = 0.5*Math.sin(theta) * animation_speed;
		models['pivot3'].rotation.x = 0.8*Math.sin(theta) * animation_speed;
		models['pivot3'].rotation.x = 0.8*Math.sin(theta) * animation_speed;
		models['pivot4'].rotation.x = 0.9*Math.sin(theta) * animation_speed;
		models['pivot4'].rotation.y = 0.5*Math.sin(theta) * animation_speed;
// ---YOUR CODE ENDS HERE---
		// models['sun'].rotation.y+=0.01*animation_speed;
		// models['earth'].rotation.y+=0.05*animation_speed;
	}
	light0.position.set(camera.position.x, camera.position.y, camera.position.z); // light0 always follows camera position
	renderer.render(scene, camera);
}

animate();

function onKeyDown(event) {
	switch(event.key) {
		case 'w':
		case 'W':
			material.wireframe = !material.wireframe;
			break;
		case '=':
		case '+':
			animation_speed += 0.05;
			document.getElementById('msg').innerHTML = 'animation_speed = '+animation_speed.toFixed(2);
			break;
		case '-':
		case '_':
			if(animation_speed>0) animation_speed-=0.05;
			document.getElementById('msg').innerHTML = 'animation_speed = '+animation_speed.toFixed(2);
			break;
		case 'r':
		case 'R':
			orbit.reset();
			break;
	}
}

window.addEventListener('keydown', onKeyDown, false); // as key control if you need
