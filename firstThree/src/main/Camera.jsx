import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// import gsap from 'gsap'
import * as dat from 'dat.gui'
import { useEffect } from 'react'
import { AmbientLight, SpotLight, Vector2 } from 'three'
// import { Stats } from 'stats'

export default function Camera() {

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000)// 透视摄像机
  // const Ocamera = new THREE.OrthographicCamera(window.innerWidth / - 2, window.innerWidth / 2, window.innerHeight / 2, window.innerHeight / - 2, 1, 1000)// 正交摄像机
  const render = new THREE.WebGLRenderer() // 初始化渲染器
  render.setSize(window.innerWidth, window.innerHeight)
  render.shadowMap.enabled = true

  const axes = new THREE.AxesHelper(50);
  // axes.setColors(0x00ffff, 0xffff00, 0x00ff00)
  scene.add(axes)

  var geometry = new THREE.BoxGeometry(8, 8, 8);
  const material = new THREE.MeshLambertMaterial({ color: 0xff2288 })
  const cube = new THREE.Mesh(geometry, material)
  scene.add(cube)

  cube.castShadow = true
  cube.position.x = 4
  cube.position.y = 10
  cube.position.z = 20

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

  // cube.rotation.x += 0.8
  // cube.rotation.y += 0.8

  const spotLight = new SpotLight(0xffffff)
  spotLight.position.set(-60, 40, -65)
  spotLight.castShadow = true // 产生阴影
  spotLight.shadow.mapSize = new Vector2(1024, 1024)
  spotLight.shadow.camera.far = 130
  spotLight.shadow.camera.near = 40

  scene.add(spotLight)

  const ambientLight = new AmbientLight(0xaaaaaa)//地板的lamber材质需要此光源才能展示
  scene.add(ambientLight)

  // const stats = addStats()

  const ctrlObj = { rotationSpeed: 0.01, jumpSpeed: 0.01 }
  const ctrl = new dat.GUI()
  ctrl.add(ctrlObj, 'rotationSpeed', 0, 0.2, 0.01)
  ctrl.add(ctrlObj, 'jumpSpeed', 0, 0.2, 0.01)

  // render.render(scene, camera)
  renderScene()


  useEffect(() => {
    document.getElementById('stage').appendChild(render.domElement)

  })

  var gap = 0
  function renderScene() {
    // cube.rotation.x += 0.01
    // cube.rotation.y += 0.01
    // cube.rotation.z += 0.01

    cube.rotation.x += ctrlObj.rotationSpeed
    cube.rotation.y += ctrlObj.rotationSpeed
    cube.rotation.z += ctrlObj.rotationSpeed

    // gap += 0.01
    gap += ctrlObj.jumpSpeed
    cube.position.x = 25 + (20 * (Math.sin(gap)))
    cube.position.y = 6 + (20 * Math.abs(Math.cos(gap)))
    // stats.update()
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

  return (
    <div id="stage">
      <div id='myStats'></div>
    </div>
  )
}
