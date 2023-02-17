import * as THREE from './node_modules/three/build/three.module.js';
import { FontLoader } from './node_modules/three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from './node_modules/three/examples/jsm/geometries/TextGeometry.js'
import { OrbitControls } from './node_modules/three/examples/jsm/controls/OrbitControls.js';

function init() {
  const canvas = document.querySelector('canvas.webgl');
  const scene = new THREE.Scene();
  scene.background = new THREE.Color('#cccccc');
  const textureLoader = new THREE.TextureLoader();

  const fontLoader = new FontLoader();
  fontLoader.load(
    './font/font.json',
    (font) => {
      const textGeometry = new TextGeometry('こんにちは、世界。', {
        font,
        size: 0.1,
        height: 0.05,
        curveSegments: 1,
        bevelEnabled: true,
        bevelThickness: 0.001,
        bevelSize: 0.001,
        bevelOffset: 0,
        bevelSegments: 8
      });
      textGeometry.center();
      const material = new THREE.MeshBasicMaterial({
        // color: 0xffffff,
        // [Yellow Banana Fruits · Free Stock Photo](https://www.pexels.com/photo/yellow-banana-fruits-3310691/)
        map: textureLoader.load('./img/pexels-aleksandar-pasaric-3310691.jpg'),
      });
      const text = new THREE.Mesh(textGeometry, material);

      scene.add(text);
    }
  );

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
  };

  window.addEventListener('resize', () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  });

  const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 1;
  scene.add(camera);

  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  const axesHelper = new THREE.AxesHelper(window.innerHeight);
  scene.add(axesHelper);

  const renderer = new THREE.WebGLRenderer({
    canvas: canvas
  });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
  }
  animate();
}

window.addEventListener('load', init);