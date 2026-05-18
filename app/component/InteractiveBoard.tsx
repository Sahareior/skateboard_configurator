// 'use client'
// import React, { Suspense, useRef, useState } from 'react'
// import { Canvas, ThreeEvent } from '@react-three/fiber'
// import * as THREE from 'three'
// import { Environment, OrbitControls } from '@react-three/drei'
// import { Skateboard } from './Skateboard'
// import gsap from 'gsap'


// type Props = {}

// const InteractiveBoard = (props: Props) => {
//   return (
//     <div 
//     className='absolute inset-0 flex justify-center items-center'
//     >
//         <Canvas className='min-h-[50rem] w-full'
//         camera={{
//             position: [1.5, 1, 1.4],
//             fov: 75,
//             near: 0.1,
//             far: 1000
//         }}
//         >
//         <Suspense fallback={null}>
//             <Scene />
//         </Suspense>
//         </Canvas>
//     </div>
//   )
// }

// export default InteractiveBoard


// function Scene() {
//     const containerRef = useRef<THREE.Group>(null);
//     const originRef = useRef<THREE.Group>(null);
//     const [animating, setAnimating] = useState(false);
//     const [showHotspot, setShowHotspot] = useState({ front: true, middle: true, back: true });

//     function onClick(event: ThreeEvent<MouseEvent>) {
//         event.stopPropagation();
    
//         const board = containerRef.current;
//         const origin = originRef.current;
    
//         if (!board || !origin || animating) return;
    
//         const { name } = event.object;
    
//         if (name === "back") {
//           ollie(board);
//         } else if (name === "middle") {
//           kickflip(board);
//         } else if (name === "front") {
//           frontside360(board, origin);
//         }
//       }
    
//       function ollie(board: THREE.Group) {
//         jumpBoard(board);
    
//         gsap
//           .timeline()
//           .to(board.rotation, { x: -0.6, duration: 0.26, ease: "none" })
//           .to(board.rotation, { x: 0.4, duration: 0.82, ease: "power2.in" })
//           .to(board.rotation, { x: 0, duration: 0.12, ease: "none" });
//       }
    
//       function kickflip(board: THREE.Group) {
//         jumpBoard(board);
    
//         gsap
//           .timeline()
//           .to(board.rotation, { x: -0.6, duration: 0.26, ease: "none" })
//           .to(board.rotation, { x: 0.4, duration: 0.82, ease: "power2.in" })
//           .to(
//             board.rotation,
//             {
//               z: `+=${Math.PI * 2}`,
//               duration: 0.78,
//               ease: "none",
//             },
//             0.3
//           )
//           .to(board.rotation, { x: 0, duration: 0.12, ease: "none" });
//       }
    
//       function frontside360(board: THREE.Group, origin: THREE.Group) {
//         jumpBoard(board);
    
//         gsap
//           .timeline()
//           .to(board.rotation, { x: -0.9, duration: 0.26, ease: "none" })
//           .to(board.rotation, { x: 0.4, duration: 0.82, ease: "power2.in" })
//           .to(
//             origin.rotation,
//             {
//               y: `+=${Math.PI * 2}`,
//               duration: 0.77,
//               ease: "none",
//             },
//             0.3
//           )
//           .to(board.rotation, { x: 0, duration: 0.14, ease: "none" });
//       }
    
//       function jumpBoard(board: THREE.Group) {
//         setAnimating(true);
    
//         gsap
//           .timeline({ onComplete: () => setAnimating(false) })
//           .to(board.position, {
//             y: 0.8,
//             duration: 0.51,
//             ease: "power2.out",
//             delay: 0.26,
//           })
//           .to(board.position, {
//             y: 0,
//             duration: 0.43,
//             ease: "power2.in",
//           });
//       }

//     return(
//         <group >
//             <OrbitControls />
//             <Environment preset='forest' />
            
//             <group ref={originRef}>
//                 <group ref={containerRef}>
//                     <Skateboard />
//                 </group>
//             </group>

//             <group onClick={onClick}>
//                 <mesh name="front" position={[0, 0.27, 0.9]}>
//                     <boxGeometry args={[0.6, 0.2, 0.58]} />
//                     <meshBasicMaterial visible={false} color="red" />
//                 </mesh>
//                 <mesh name="middle" position={[0, 0.27, 0]}>
//                     <boxGeometry args={[0.6, 0.2, 0.58]} />
//                     <meshBasicMaterial visible={false} color="red" />
//                 </mesh>
//                 <mesh name="back" position={[0, 0.27, -0.9]}>
//                     <boxGeometry args={[0.6, 0.2, 0.58]} />
//                     <meshBasicMaterial visible={false} color="red" />
//                 </mesh>
//             </group>
//         </group>
//     )
// }