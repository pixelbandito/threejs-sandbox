import React, {StrictMode, useEffect, useLayoutEffect, useRef, useState} from "react";
import {createRoot} from "react-dom/client";
import * as THREE from 'three';

const TAU = Math.PI * 2;

const sizes = {
  width: 800,
  height: 600,
};

function App() {
  const [isTurning, setIsTurning] = useState(true);
  const isTurningRef = useRef(isTurning);
  const canvasRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const boxRef = useRef();


  useEffect(() => {
    isTurningRef.current = isTurning;
  }, [isTurning]);

  useLayoutEffect(() => {
    const canvas = document.getElementById('canvas');
  
    const renderer = new THREE.WebGLRenderer({
        canvas,
    });

    renderer.setSize(sizes.width, sizes.height);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, sizes.width / sizes.height);
    
    camera.translateX(1);
    camera.translateY(1);
    camera.translateZ(5);
    scene.add(camera);
    
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 'orange' });
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh);
    renderer.render(scene, camera);

    canvasRef.current = canvas;
    rendererRef.current = renderer;
    cameraRef.current = camera;

    boxRef.current = {
      geometry,
      material,
      mesh,
    };

    let animationFrameRequestId;
    let tickTs = new Date().valueOf();

    const rotateBox = () => {
      let now = new Date().valueOf();
      let elapsedTime = now - tickTs;
      tickTs = now;

      if (boxRef.current && isTurningRef.current) {
        // 1 revolution per 4 seconds = 1 corner of the square face per second.
        boxRef.current.mesh.rotateZ(TAU / 1000 * elapsedTime / 4);

        if (rendererRef.current) {
          rendererRef.current.render(scene, camera);
        }
      }

      animationFrameRequestId = requestAnimationFrame(rotateBox);
    };

    animationFrameRequestId = requestAnimationFrame(rotateBox);

    return () => {
      cancelAnimationFrame(animationFrameRequestId);
    }
  }, []);

  return (
    <div>
      <canvas id="canvas" onClick={() => setIsTurning(prev => !prev)} />
      <button onClick={() => setIsTurning(prev => !prev)}>Toggle</button>
    </div>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
