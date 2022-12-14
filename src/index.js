import keyinput from "./keyInput.js";
import connect from "./Connect.js";

 

const ratio = window.innerWidth / window.innerHeight;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, ratio, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio(devicePixelRatio);
document.body.appendChild( renderer.domElement );

// set light
const light = new THREE.AmbientLight(0x404040);
const dlight = new THREE.DirectionalLight(0xffffff, 0.5);

light.add(dlight);
scene.add(light);

// set object
const geometry = new THREE.BoxGeometry( 50, 0.1, 50);
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );
const ground = new THREE.Mesh( geometry, material );

scene.add( ground );
// camera.position.z = 5;
camera.position.set( 5, 15, 15 );

const BoxGeometry = new THREE.BoxGeometry( 2, 2, 2 );
const BoxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
const box = new THREE.Mesh( BoxGeometry, BoxMaterial );
camera.position.set( -2, 0, 8 );
scene.add( box );

//set animation
function animate() {

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;
    requestAnimationFrame( animate );

    if (keyinput.inPressed(38)){
        camera.position.x += 0.5;
        camera.position.y += 0.5;
    }
    if (keyinput.inPressed(40)){
        camera.position.x -= 0.5;
        camera.position.y -= 0.5;
    }

    camera.lookAt(ground.position);
    renderer.render( scene, camera );
}
animate();
connect.then((result) => {
    console.log(result);
    result.buildings.forEach((b, index) => {
        if(index <= result.supply) {
            const BoxGeometry = new THREE.BoxGeometry( b.w, b.h, b.d );
            const BoxMaterial = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );
            const box = new THREE.Mesh( BoxGeometry, BoxMaterial );
            box.position.set( b.x, b.y, b.z );
            scene.add(box);
        }
    })
});
