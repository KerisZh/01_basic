import React, { Component, useEffect } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
import * as dat from 'dat.gui'
import { AmbientLight, BoxGeometry, Color, Mesh, MeshLambertMaterial, SpotLight, Vector2 } from 'three'
// import { Stats } from 'stats'

export default function Camera() {

  const scene = new THREE.Scene()
  // const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)// 透视摄像机
  // 左 右 上 下 边界 近端距离 远端距离
  const camera = new THREE.OrthographicCamera(
    window.innerWidth / - 12,
    window.innerWidth / 12,
    window.innerHeight / 12,
    window.innerHeight / - 12,
    1,
    1000)// 正交摄像机
  const render = new THREE.WebGLRenderer() // 初始化渲染器
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true

  const axes = new THREE.AxesHelper(50);
  // axes.setColors(0x00ffff, 0xffff00, 0x00ff00)
  scene.add(axes)

  const planeGeometry = new THREE.PlaneGeometry(100, 100)
  const planeMaterial = new THREE.MeshLambertMaterial({ color: 0xcccccc })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial)

  plane.rotation.x = -0.5 * Math.PI
  plane.position.set(15, 0, 0)
  plane.receiveShadow = true //地板接受阴影

  scene.add(plane)

  camera.position.x = -30
  camera.position.y = 45
  camera.position.z = 35
  camera.lookAt(scene.position)

  const spotLight = new SpotLight(0xffffff)
  spotLight.position.set(-60, 40, -65)
  spotLight.castShadow = true // 产生阴影
  spotLight.shadow.mapSize = new Vector2(1024, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 40

  scene.add(spotLight)

  const ambientLight = new AmbientLight(0xaaaaaa)//地板的lamber材质需要此光源才能展示
  scene.add(ambientLight)


  // render.render(scene, camera)


  for (let i = 0; i < planeGeometry.parameters.height / 5; i++) {
    for (let j = 0; j < planeGeometry.parameters.width / 5; j++) {
      const cubeGeo = new BoxGeometry(4, 4, 4)
      const cubeMaterial = new MeshLambertMaterial()
      cubeMaterial.color = new Color(0, Math.random() * 0.25 + 0.5, 0)
      const cube = new Mesh(cubeGeo, cubeMaterial)
      cube.position.x = -(planeGeometry.parameters.width / 2) + 15 + (i * 5)
      cube.position.y = 2
      cube.position.z = -(planeGeometry.parameters.height / 2) + 5 + (j * 5)
      scene.add(cube)
    }

  }

  const geometry = new BoxGeometry(8, 8, 8)
  const material = new MeshLambertMaterial({ color: 0xff2288 })
  const cube = new Mesh(geometry, material)
  cube.position.x = 0
  cube.position.y = 8
  cube.position.z = 0

  scene.add(cube)


  useEffect(() => {
    document.getElementById('stage').appendChild(render.domElement)

  })

  var pos = 0
  function renderScene() {
    pos += 0.01
    if (cube && camera) {
      cube.position.x = 10 + (100 * (Math.sin(pos)))
      camera.lookAt(cube.position)
    }
    requestAnimationFrame(renderScene)
    render.render(scene, camera)
  }

  // function addStats() {
  //   const stats = new Stats()
  //   stats.document.style.position = 'absolute'
  //   stats.document.style.left = '0px'
  //   stats.document.style.top = '0px'
  //   stats.setMode(0)

  //   document.getElementById('myStats').appendChild(stats)

  //   return stats
  // }

  renderScene()

  return (
    <div id="stage">
      <div id='myStats'></div>
    </div>
  )
}
