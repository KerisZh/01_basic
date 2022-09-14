import React, { Component } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class SimpleScene extends Component {

    componentDidMount() {
        this.init()
        this.animate()
    }

    init = () => {

        const scene = new THREE.Scene() // 初始化场景
        this.scene = scene
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000) // 初始化摄像机
        this.camera = camera
        const renderer = new THREE.WebGLRenderer() // 初始化渲染器

        const geometry = new THREE.BoxGeometry(1, 1, 1) // 创建一个几何形状
        const material = new THREE.MeshPhongMaterial({ color: 'pink' }) // 设置材质、颜色
        const mesh = new THREE.Mesh(geometry, material)
        this.mesh = mesh
        scene.add(mesh) // 放置在场景中
        
        camera.position.set(3, 3, 3) // 摄像机摆放位置
        camera.lookAt(mesh.position) // 摄影方向

        const pointLight = new THREE.PointLight(0xffffff, 1) // 灯光
        pointLight.position.set(3,2,1) // 照射方向
        scene.add(pointLight) // 添加到场景中

        const ambientLight = new THREE.AmbientLight(0xcccccc, 0.5) // 环境光
        scene.add(ambientLight)

        // camera.position.z = 3 


        const controls = new OrbitControls(this.camera, renderer.domElement)
        controls.target.set(0, 0.5, 0)
        controls.update()

        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
        this.renderer = renderer
        document.getElementById('stage').appendChild(renderer.domElement)
    }



    // handleControl = () => {
    //     this.renderer.render(this.scene, this.camera)
    // }

    animate = () => {
        requestAnimationFrame(this.animate)
        this.mesh.rotation.y += 0.02
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        return (
            <div id="stage" />
        )
    }
}