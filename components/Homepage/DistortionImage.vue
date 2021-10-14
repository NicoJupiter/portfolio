<template>
  <div class="distortionImage" ref="container">

  </div>
</template>

<script>
import * as THREE from 'three'
import { CustomPass } from '@/assets/js/CustomPass'
import gsap from 'gsap'

import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';

import img3 from '@/assets/img/test3.jpg'
import img2 from '@/assets/img/test.PNG'

export default {
  name: "DistortionImage",
  data() {
    return {
      scene: null,
      renderer: null,
      container: null,
      camera: null,
      isPlaying: true,
      material: null,
      composer: null,
      effect: null,
      time: 0,
      width: 0,
      height: 0,
      textures: [],
      imgUrls: [img3, img2],
      progressValues: [2, 6, 5],
      scaleValues: [2, 4, 3],
      indexValues: 0,
      settings : {
        progress: 2,
        scale: 1
      }
    }
  },
  mounted() {
    this.init()
    this.initPost()
    this.addObject()
    this.resize()
    this.render()
    this.setupResize()
  },
  methods: {
    init() {
      this.$data.scene = new THREE.Scene()
      this.$data.container = this.$refs.container
      this.$data.width = this.$data.container.offsetWidth
      this.$data.height = this.$data.container.offsetHeight
      this.$data.renderer = new THREE.WebGLRenderer()
      this.$data.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      this.$data.renderer.setSize(this.$data.width, this.$data.height)
      this.$data.renderer.setClearColor(0x000000, 1)
      this.$data.container.appendChild(this.$data.renderer.domElement)
      this.$data.camera = new THREE.PerspectiveCamera(
        70,
        window.innerWidth / window.innerHeight,
        0.001,
        1000
      )
      this.$data.camera.position.set(0, 0, 2)
      this.$data.textures = this.$data.imgUrls.map(url => new THREE.TextureLoader().load(url))

      this.$nuxt.$on('homepage::updateDistortion', (i) => {
        gsap.to(this.$data.settings, {
          progress: this.$data.progressValues[i],
          scale: this.$data.scaleValues[i],
          duration: 2,
        })
        /*this.$data.settings.progress = 5.0
        this.$data.settings.scale = 3.0*/
      })
    },
    initPost() {

      this.$data.composer = new EffectComposer( this.$data.renderer );
      this.$data.composer.addPass( new RenderPass( this.$data.scene, this.$data.camera ) );

      this.$data.effect = new ShaderPass( CustomPass );
      this.$data.composer.addPass( this.$data.effect );
    },
    addObject() {
      this.$data.material = new THREE.ShaderMaterial({
        extension: {
          derivatives: "#extension GL_OES_standard_derivatives : enable"
        },
        side: THREE.DoubleSide,
        uniforms: {
          time: {value: 0},
          uTexture: {value: this.$data.textures[0]},
          resolution: {value: new THREE.Vector4()}
        },
        vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
        `,
        fragmentShader: `
        uniform float time;
        uniform float progress;
        uniform sampler2D uTexture;
        uniform vec4 resolution;
        varying vec2 vUv;
        varying vec3 vPosition;
        float PI = 3.14159265;
        void main() {
          vec4 color = texture2D(uTexture, vUv);
          gl_FragColor = vec4(vUv, 0.0, 1.0);
          gl_FragColor = color;
        }
`
      })

      let geometry = new THREE.PlaneGeometry(1.9 / 2, 1 / 2, 1, 1)

      let meshes = []

      this.$data.textures.forEach((item, i) => {
        let m = this.$data.material.clone()
        m.uniforms.uTexture.value = item
        let mesh = new THREE.Mesh(geometry, m)
        this.$data.scene.add(mesh)
        meshes.push(mesh)
        mesh.position.x = i -1
        mesh.position.y = -1
        mesh.rotation.z = Math.PI / 2
      })
    },
    resize() {
      this.$data.width = this.$data.container.offsetWidth
      this.$data.height = this.$data.container.offsetHeight
      this.$data.renderer.setSize(this.$data.width, this.$data.height)
      this.$data.camera.aspect = this.$data.width / this.$data.height
      this.$data.camera.updateProjectionMatrix()
    },
    stop() {
      this.$data.isPlaying = false
    },
    play() {
      this.$data.isPlaying = true
    },
    render() {
      if(!this.$data.isPlaying) return false
      this.$data.time += 0.01

      this.$data.effect.uniforms[ 'time' ].value = this.$data.time;
      this.$data.effect.uniforms[ 'progress' ].value = this.$data.settings.progress;
      this.$data.effect.uniforms[ 'scale' ].value = this.$data.settings.scale;

      //this.material.uniforms.time.value = this.$data.time
      requestAnimationFrame(this.render.bind(this))
      //this.$data.renderer.render(this.$data.scene, this.$data.camera)
      this.$data.composer.render()
    },
    setupResize() {
      window.addEventListener('resize', this.resize.bind(this))
    }
  }
}
</script>

<style scoped lang="scss">
  .distortionImage {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    pointer-events: none;
  }
</style>
