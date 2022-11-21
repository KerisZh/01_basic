import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
// import * as dat from 'dat.gui'
import { useEffect } from 'react'


export default function CustomBox() {

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)
  const renderer = new THREE.WebGLRenderer() // 初始化渲染器

  const geometry = new THREE.BoxGeometry()
  const vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,

    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
  ])

  geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
  const mesh = new THREE.Mesh(geometry, material)
  camera.position.set(0, 3, 3)
  scene.add(camera)
  scene.add(mesh)

  const axesHelper = new THREE.AxesHelper(5)
  scene.add(axesHelper)

  const controls = new OrbitControls(camera, renderer.domElement)
  controls.target.set(0, 0.5, 0)
  controls.enableDamping = true
  controls.update()

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.render(scene, camera)

  useEffect(() => {
    document.getElementById('stage').appendChild(renderer.domElement)

  })

  return (
    <div id="stage" />
  )
}
