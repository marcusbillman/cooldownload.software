import React, { FC, useEffect, useRef } from 'react';
import type { ChallengeProps } from './';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {
  uniqueNamesGenerator,
  adjectives,
  animals,
} from 'unique-names-generator';
import Button from '../Button';

const generateKey = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, adjectives, animals],
    separator: ' ',
  });

const ThreeDTextChallenge: FC<ChallengeProps> = ({ onComplete }) => {
  const mountRef = useRef(null);

  const [key, setKey] = React.useState(generateKey());
  const [inputText, setInputText] = React.useState('');
  const [errorMessage, setErrorMessage] = React.useState('');

  useEffect(() => {
    if (!mountRef.current) return;
    const mountElement = mountRef.current as HTMLElement;

    const width = mountElement.clientWidth;
    const height = mountElement.clientHeight;

    // Scene, camera and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(200, 20, 0);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff, 1);

    // Mount renderer to DOM
    if (mountElement.firstElementChild) {
      mountElement.removeChild(mountElement.firstElementChild);
    }
    mountElement.appendChild(renderer.domElement);

    // Text
    let textMesh: THREE.Mesh;
    const loader = new FontLoader();
    loader.load('/assets/roboto-bold.json', (font) => {
      const textGeometry = new TextGeometry(key, {
        font: font,
        size: 20,
        height: 1,
      });
      const textMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.geometry.center();
      scene.add(textMesh);
    });

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;

    // Animation
    // let time = 0;
    const clock = new THREE.Clock();
    const animate = () => {
      requestAnimationFrame(animate);
      // time += 1;
      if (textMesh) {
        const time = clock.getElapsedTime();
        const delta = clock.getDelta();
        textMesh.position.x = Math.cos(time / 0.3) * 100;
        textMesh.position.y = Math.sin(time / 0.2) * 30;
        textMesh.position.z = Math.sin(time / 0.9) * 150;

        textMesh.rotation.x = Math.cos(time / 0.9);
        textMesh.rotation.y += 8.5 * delta;
        textMesh.rotation.z = Math.cos(time / 0.6);
      }
      renderer.render(scene, camera);
    };
    animate();
  }, [key]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputText(e.target.value);
    setErrorMessage('');
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.toLowerCase().trim() !== key) {
      setKey(generateKey());
      setInputText('');
      setErrorMessage('Please try again.');
      return;
    }
    onComplete();
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <p className="font-bold">Type the text</p>
        <div
          ref={mountRef}
          className="h-96 border border-gray-200 rounded-lg overflow-hidden"
        ></div>
        <form className="flex gap-4" onSubmit={onSubmit}>
          <input
            type="text"
            value={inputText}
            placeholder="Type the text displayed above"
            onChange={onChange}
            className="block w-full border border-gray-200 px-4 py-3 rounded-lg"
          />
          <Button htmlButtonType="submit">Done</Button>
        </form>
        {errorMessage && (
          <p className="bg-red-200 border border-red-500 p-4 rounded-lg">
            {errorMessage}
          </p>
        )}
        <p className="text-gray-500">
          Tip: If reading is difficult, try dragging your mouse or finger to
          look around
        </p>
      </div>
    </>
  );
};

export default ThreeDTextChallenge;
