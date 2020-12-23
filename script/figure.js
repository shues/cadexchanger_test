let scene;
let camera;
let renderer;
let material;
let cube;

initDraw();

createFigure();

draw();


function initDraw() {
  initScene();
  initCamera();
  initRenderer();
  initMaterial();
  lighter();
}

function initScene() {
  scene = new THREE.Scene()
}

function initMaterial() {
  //  material = new THREE.MeshLambertMaterial({
  material = new THREE.MeshBasicMaterial({
    color: "gray",
    wireframe: true
  });
}

function initCamera(position) {
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 50;
}

function initRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(500, 500);
  document.querySelector(".picture").appendChild(renderer.domElement);
}

function lighter() {
  let spotLight = new THREE.SpotLight(0xffffff);
  spotLight.position.set(-20, 100, 200);
  scene.add(spotLight);

  let ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);

}

function draw() {
  renderer.render(scene, camera);
}



function createFigure(source) {
  let geom = new THREE.Geometry();
  addTriangles(geom, source);
  geom.computeFaceNormals();
  geom.computeVertexNormals();

  scene.remove(scene.children[2]);
  cube = new THREE.Mesh(geom, material);
  scene.add(cube);

  draw();

  const animate = function () {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.0001;
    cube.rotation.y += 0.0001;

    renderer.render(scene, camera);
  };


  animate();
}


function addTriangles(geom, triangleSet) {
  const normal = new THREE.Vector3(0, 0, 1);
  const color = new THREE.Color(0xffaa00);
  const materialIndex = 0;
  let counter = 0;
  for (let tri in triangleSet) {
    let triangle = triangleSet[tri];
    geom.vertices.push(new THREE.Vector3(triangle[0][0], triangle[0][1], triangle[0][2]));
    geom.vertices.push(new THREE.Vector3(triangle[1][0], triangle[1][1], triangle[1][2]));
    geom.vertices.push(new THREE.Vector3(triangle[2][0], triangle[2][1], triangle[2][2]));
    geom.faces.push(new THREE.Face3(counter, counter + 1, counter + 2, normal, color, materialIndex));
    counter += 3
  }
}
