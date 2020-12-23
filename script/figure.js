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
  //  addVertices(geom.vertices, source);
  //  addFaces(geom.faces, source);
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




function addVertices(vertice, source) {
  for (let face in source) {
    let faceObj = source[face];
    for (let tri in faceObj) {
      let triObj = faceObj[tri];
      for (let vert in triObj) {
        let vertObj = triObj[vert];
        let a = new THREE.Vector3(vertObj.height, vertObj.width, vertObj.deep);
        if (vert === undefined) {
          let a = new THREE.Vector3(0, 0, 0);
        }

        vertice.push(a);
      }
    }
  }

}

function addFaces(faces, source) {
  const normal = new THREE.Vector3(0, 0, 1);
  const color = new THREE.Color(0xffaa00);
  const materialIndex = 0;

  let counter = 0;
  for (let face in source) {
    faces.push(new THREE.Face3((counter), (counter + 1), (counter + 2), normal, color, materialIndex));
    counter += 3;
  }
  //  const face_0 = new THREE.Face3(0, 1, 2, normal, color, materialIndex);
  //  const face_1 = new THREE.Face3(3, 4, 5, normal, color, materialIndex);
  //  const face_2 = new THREE.Face3(6, 7, 8, normal, color, materialIndex);
  //  const face_3 = new THREE.Face3(9, 10, 11, normal, color, materialIndex);
  //  const face_4 = new THREE.Face3(12, 13, 14, normal, color, materialIndex);
  //  const face_5 = new THREE.Face3(15, 16, 17, normal, color, materialIndex);
  //
  //  faces.push(face_0);
  //  faces.push(face_1);
  //  faces.push(face_2);
  //  faces.push(face_3);
  //  faces.push(face_4);
  //  faces.push(face_5);
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
