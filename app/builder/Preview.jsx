'use client'
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef } from "react";
import { useCustomeControlsContext } from "./Context";
import { BuildSkateBoard } from "./BuildSkateBoard";
import { CameraControls, Environment, useTexture, Loader } from "@react-three/drei";

const DEFAULT_TRUCK_COLOR = "#6F6E6A";
const DEFAULT_BOLT_COLOR = "#6F6E6A";
const ENVIRONMENT_COLOR = "#3B3A3A";

const Preview = ({ wheelUrls, deckUrls }) => {
  const {
    selectedWheel,
    selectedDeck,
    selectedTruck,
    selectedBolt
  } = useCustomeControlsContext();
  const cameraControl = useRef()

  const wheelTextureURL = selectedWheel?.texture
  const deckTextureURL = selectedDeck?.texture
  const truckTextureURL = selectedTruck?.texture
  const truckColor = selectedTruck?.color
  const boltColor = selectedBolt?.color ?? DEFAULT_BOLT_COLOR;

  console.log(truckColor, 'his ss ad')



  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(0, 0.3, 0),
      new THREE.Vector3(1.5, 0.8, 0)
    );
  }, [selectedDeck?.uid]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.12, 0.29, 0.57),
      new THREE.Vector3(0.3, 0.7, 1.2)
    );
  }, [selectedTruck?.uid]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.08, 0.54, 0.64),
      new THREE.Vector3(0.09, 1, 0.9)
    );
  }, [selectedWheel?.uid]);

  useEffect(() => {
    setCameraControls(
      new THREE.Vector3(-0.25, 0.3, 0.62),
      new THREE.Vector3(-0.8 , 0.4, 1.0)
    );
  }, [selectedBolt?.uid]);


  function setCameraControls(target, pos) {
    if (!cameraControl.current) return;

    cameraControl.current.setTarget(target.x, target.y, target.z, true);
    cameraControl.current.setPosition(pos.x, pos.y, pos.z, true);
  }


  return (
    <>
      <Canvas camera={{ position: [2.5, 1, 0], fov: 50 }} shadows>

        <Environment
          files={"/hdr/warehouse-512.hdr"}
          environmentIntensity={0.6}
        />
        <fog attach="fog" args={[ENVIRONMENT_COLOR, 3, 10]} />
        <mesh rotation={[-Math.PI / 2, 0, 0]} >
          <planeGeometry args={[6, 6]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        <color attach="background" args={[ENVIRONMENT_COLOR]} />
        <directionalLight
          castShadow
          lookAt={[0, 0, 0]}
          position={[1, 1, 1]}
          intensity={1.6}
        />
        <Suspense fallback={null}>
          <BuildSkateBoard
            wheelTextureURL={wheelTextureURL}
            deckTextureURL={deckTextureURL}
            truckTextureURL={truckTextureURL}
            truckColor={truckColor}
            boltColor={boltColor}
            pose="side"
          />
          <CameraControls ref={cameraControl} minDistance={0.4} maxDistance={2} maxPolarAngle={Math.PI / 2.2} smoothTime={1.5} />
          <StageFloor />
        </Suspense>
      </Canvas>
      <Loader />
    </>
  )
}

export default Preview


function StageFloor() {
  const normalMap = useTexture("/concrete-normal.avif");
  normalMap.wrapS = THREE.RepeatWrapping;
  normalMap.wrapT = THREE.RepeatWrapping;
  normalMap.repeat.set(30, 30);
  normalMap.anisotropy = 8;

  const material = new THREE.MeshStandardMaterial({
    roughness: 0.75,
    color: ENVIRONMENT_COLOR,
    normalMap: normalMap,
  });

  return (
    <mesh
      castShadow
      receiveShadow
      position={[0, -0.005, 0]}
      rotation={[-Math.PI / 2, 0, 0]}
      material={material}
    >
      <circleGeometry args={[20, 32]} />
    </mesh>
  );
}