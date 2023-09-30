import { TrackballControls } from '//unpkg.com/three/examples/jsm/controls/TrackballControls.js';
Object.assign(THREE , { TrackballControls });










const Globe = new ThreeGlobe()
    .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
    .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png');




// custom globe material
const globeMaterial = Globe.globeMaterial();
globeMaterial.bumpScale = 10;
new THREE.TextureLoader().load('//unpkg.com/three-globe/example/img/earth-water.png', texture => {
    globeMaterial.specularMap = texture;
    globeMaterial.specular = new THREE.Color('grey');
    globeMaterial.shininess = 15;
});

//射燈
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(1, 1, 1); // change light position to see the specularMap's effect

// Setup renderer
const renderer = new THREE.WebGLRenderer(
    {antialias:true, //抗鋸齒
    alpha:true} //抗鋸齒
);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor (0xffffff, 1); //宇宙背景
// renderer.antialias = true;

document.getElementById('globeViz').appendChild(renderer.domElement);

// Setup scene
const scene = new THREE.Scene();
scene.add(Globe);
scene.add(new THREE.AmbientLight(0xffffff, 6)); // 氛圍燈
scene.add(directionalLight);

// Setup camera
const camera = new THREE.PerspectiveCamera();
camera.aspect = window.innerWidth/window.innerHeight;
camera.updateProjectionMatrix();
//相機角度
camera.position.z = 240;
camera.position.y=180;
camera.position.x=0;

//鼠標控制的的拖拽和伸縮。通過對 camera 的控製實現。
// Add camera controls
const tbControls = new THREE.TrackballControls(camera, renderer.domElement);
tbControls.minDistance = 300;
tbControls.maxDistance = 300;
tbControls.noZoom=true;
tbControls.rotateSpeed = 5;
// tbControls.zoomSpeed = 0.8;

// Kick-off renderer




//窗口伸縮

function onWindowResize(){
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
window.addEventListener( 'resize', onWindowResize, false );






//判斷鼠標是否在地球上
const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
function onPointerMove( event ) {

    // calculate pointer position in normalized device coordinates
    // (-1 to +1) for both components

    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}
window.addEventListener( 'pointermove', onPointerMove );
//旋轉地球自身。
function rotateGlobe(){


    raycaster.setFromCamera( pointer, camera );
    // calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects( scene.children );
    // console.log(intersects.length)
    if (intersects.length===0) { //如果沒有鼠標在地球上
        Globe.rotateY(0.005)
    }
}




function animate() { // IIFE
    // Frame cycle

    rotateGlobe();
    tbControls.update();
    renderer.render(scene, camera);


    // console.log("Position", camera.position)
    // console.log("Rotation", camera.rotation)

    requestAnimationFrame(animate);

}

animate()

