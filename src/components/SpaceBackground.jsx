import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const STAR_VERTEX_SHADER = `
  attribute float aSize;
  attribute float aPhase;
  uniform float uTime;
  uniform float uAnimate;
  varying float vAlpha;
  void main() {
    float twinkle = 0.5 + 0.5 * sin(uTime * 0.8 + aPhase);
    vAlpha = mix(0.75, 0.45 + 0.75 * twinkle, uAnimate);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (280.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`

const STAR_FRAGMENT_SHADER = `
  precision mediump float;
  varying float vAlpha;
  uniform vec3 uColor;
  void main() {
    vec2 uv = gl_PointCoord - vec2(0.5);
    float d = length(uv);
    float circle = smoothstep(0.5, 0.0, d);
    float core = smoothstep(0.18, 0.0, d);
    gl_FragColor = vec4(uColor, (vAlpha * circle * 0.75) + core * 0.25);
  }
`

const NEBULA_VERTEX_SHADER = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const NEBULA_FRAGMENT_SHADER = `
  precision mediump float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uAnimate;

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(41.3, 289.1))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
  }

  float fbm(vec2 p) {
    float total = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 4; i++) {
      total += noise(p) * amp;
      p *= 2.0;
      amp *= 0.5;
    }
    return total;
  }

  void main() {
    vec2 uv = vUv - 0.5;
    float t = uTime * 0.015 * uAnimate;
    float cloud = fbm(uv * 2.4 + vec2(t, -t * 0.6));
    float radial = 1.0 - smoothstep(0.15, 0.62, length(uv));
    float intensity = cloud * radial;
    intensity = smoothstep(0.25, 0.85, intensity);
    vec3 color = vec3(0.72, 0.73, 0.75);
    gl_FragColor = vec4(color, intensity * 0.06);
  }
`

// Fresnel-style rim glow so spheres read as round, lit 3D bodies rather than flat discs
const RIM_VERTEX_SHADER = `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mvPosition.xyz);
    gl_Position = projectionMatrix * mvPosition;
  }
`
const RIM_FRAGMENT_SHADER = `
  precision mediump float;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  uniform vec3 uColor;
  uniform float uIntensity;
  void main() {
    float rim = 1.0 - max(dot(normalize(vNormal), normalize(vViewDir)), 0.0);
    rim = pow(rim, 2.2);
    gl_FragColor = vec4(uColor, rim * uIntensity);
  }
`

function buildStarField(count, spread, color, sizeRange) {
  const positions = new Float32Array(count * 3)
  const sizes = new Float32Array(count)
  const phases = new Float32Array(count)

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread.x
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread.y
    positions[i * 3 + 2] = -Math.random() * spread.z - 50
    sizes[i] = Math.random() * sizeRange[1] + sizeRange[0]
    phases[i] = Math.random() * Math.PI * 2
  }

  const geometry = new THREE.BufferGeometry()
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1))
  geometry.setAttribute('aPhase', new THREE.BufferAttribute(phases, 1))

  const material = new THREE.ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uAnimate: { value: 1 },
      uColor: { value: new THREE.Color(color) },
    },
    vertexShader: STAR_VERTEX_SHADER,
    fragmentShader: STAR_FRAGMENT_SHADER,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  })

  return new THREE.Points(geometry, material)
}

// Small procedural grayscale texture (soft mottled surface) reused across planets
// as a bump/roughness map so spheres pick up believable, non-flat shading detail.
function buildSurfaceTexture() {
  const size = 256
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = '#808080'
  ctx.fillRect(0, 0, size, size)
  for (let i = 0; i < 500; i++) {
    const x = Math.random() * size
    const y = Math.random() * size
    const r = Math.random() * 10 + 2
    const shade = Math.floor(Math.random() * 90 + 90)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(${shade},${shade},${shade},0.35)`
    ctx.fill()
  }
  const texture = new THREE.CanvasTexture(canvas)
  texture.wrapS = THREE.RepeatWrapping
  texture.wrapT = THREE.RepeatWrapping
  return texture
}

export default function SpaceBackground() {
  const mountRef = useRef(null)

  useEffect(() => {
    const container = mountRef.current
    if (!container) return

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 700

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      2000
    )
    camera.position.z = 60

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'low-power',
    })
    renderer.setClearColor(0x000000, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setSize(window.innerWidth, window.innerHeight)
    container.appendChild(renderer.domElement)

    // Lights: a key light gives the spheres real shading (round, 3D volume)
    // instead of a flat wireframe outline.
    const ambient = new THREE.AmbientLight(0xffffff, 0.35)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xffffff, 1.4)
    key.position.set(-60, 40, 80)
    scene.add(key)
    const fill = new THREE.DirectionalLight(0x9fb4d8, 0.4)
    fill.position.set(50, -30, -40)
    scene.add(fill)

    // Nebula plane (far background, subtle grayscale)
    const nebulaGeometry = new THREE.PlaneGeometry(2, 2)
    const nebulaMaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uAnimate: { value: prefersReducedMotion ? 0 : 1 },
      },
      vertexShader: NEBULA_VERTEX_SHADER,
      fragmentShader: NEBULA_FRAGMENT_SHADER,
      transparent: true,
      depthWrite: false,
    })
    const nebula = new THREE.Mesh(nebulaGeometry, nebulaMaterial)
    nebula.position.z = -400
    nebula.scale.set(900, 900, 1)
    scene.add(nebula)

    // Star field — brighter and denser so it actually reads on screen
    const starCountFar = isMobile ? 550 : 1100
    const starCountNear = isMobile ? 260 : 550
    const starsFar = buildStarField(starCountFar, { x: 700, y: 500, z: 500 }, 0xffffff, [0.6, 1.6])
    const starsNear = buildStarField(starCountNear, { x: 500, y: 380, z: 250 }, 0xffffff, [1.1, 2.2])
    scene.add(starsFar)
    scene.add(starsNear)

    // Solid, lit, rounded planets (instead of wireframes) that slowly drift
    // and rotate visibly through the scene.
    const surfaceTexture = buildSurfaceTexture()
    const segments = isMobile ? 28 : 48

    const planetConfigs = isMobile
      ? [
          { radius: 6, x: -24, y: 12, z: -80, color: 0xe4e4e4, rough: 0.85, spin: 0.16, drift: [1.6, 0.5] },
          { radius: 3.4, x: 26, y: -14, z: -55, color: 0xb9c4d6, rough: 0.6, spin: 0.24, drift: [-1.2, 0.8] },
          { radius: 8.5, x: 18, y: 20, z: -150, color: 0x9aa0a8, rough: 0.9, spin: 0.1, drift: [-0.8, -0.5], ring: true },
          { radius: 2.6, x: -30, y: -18, z: -40, color: 0xffffff, rough: 0.4, spin: 0.3, drift: [1.0, 1.1] },
        ]
      : [
          { radius: 7.5, x: -30, y: 16, z: -90, color: 0xe4e4e4, rough: 0.85, spin: 0.16, drift: [1.6, 0.5] },
          { radius: 4.2, x: 32, y: -12, z: -60, color: 0xb9c4d6, rough: 0.6, spin: 0.24, drift: [-1.2, 0.8] },
          { radius: 11, x: 22, y: 24, z: -170, color: 0x9aa0a8, rough: 0.9, spin: 0.1, drift: [-0.8, -0.5], ring: true },
          { radius: 3, x: -38, y: -20, z: -45, color: 0xffffff, rough: 0.4, spin: 0.32, drift: [1.0, 1.1] },
          { radius: 5.5, x: 6, y: -30, z: -120, color: 0xc7a98f, rough: 0.75, spin: 0.14, drift: [0.6, -0.9] },
          { radius: 2.2, x: -12, y: 32, z: -35, color: 0xffffff, rough: 0.3, spin: 0.35, drift: [-1.5, -0.6] },
          { radius: 9, x: 40, y: 6, z: -200, color: 0x8f97a3, rough: 0.95, spin: 0.08, drift: [-0.5, 0.4] },
          { radius: 3.6, x: -46, y: -4, z: -70, color: 0xd8c9b0, rough: 0.65, spin: 0.22, drift: [1.3, -0.7] },
        ]

    const BOUND_X = isMobile ? 42 : 60
    const BOUND_Y = isMobile ? 32 : 42

    const planets = planetConfigs.map((cfg) => {
      const group = new THREE.Group()
      group.position.set(cfg.x, cfg.y, cfg.z)

      const geometry = new THREE.SphereGeometry(cfg.radius, segments, segments)
      const material = new THREE.MeshStandardMaterial({
        color: cfg.color,
        roughness: cfg.rough,
        metalness: 0.15,
        bumpMap: surfaceTexture,
        bumpScale: 0.35,
      })
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = Math.random() * Math.PI
      mesh.rotation.z = (Math.random() - 0.5) * 0.6
      group.add(mesh)

      // Rim light glow for a believable atmosphere / silhouette
      const rimGeometry = new THREE.SphereGeometry(cfg.radius * 1.04, segments, segments)
      const rimMaterial = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(cfg.color) },
          uIntensity: { value: 0.55 },
        },
        vertexShader: RIM_VERTEX_SHADER,
        fragmentShader: RIM_FRAGMENT_SHADER,
        transparent: true,
        blending: THREE.AdditiveBlending,
        side: THREE.FrontSide,
        depthWrite: false,
      })
      group.add(new THREE.Mesh(rimGeometry, rimMaterial))

      if (cfg.ring) {
        const ringGeometry = new THREE.RingGeometry(cfg.radius * 1.5, cfg.radius * 2.1, 64)
        const ringMaterial = new THREE.MeshStandardMaterial({
          color: 0xcfcfcf,
          roughness: 0.8,
          metalness: 0.1,
          side: THREE.DoubleSide,
          transparent: true,
          opacity: 0.55,
        })
        const ring = new THREE.Mesh(ringGeometry, ringMaterial)
        ring.rotation.x = Math.PI / 2.4
        group.add(ring)
      }

      scene.add(group)
      return {
        group,
        mesh,
        spin: cfg.spin,
        drift: { x: cfg.drift[0], y: cfg.drift[1] },
      }
    })

    let rafId = null
    let lastTime = performance.now()
    let running = true

    const clock = { time: 0 }

    function renderStatic() {
      renderer.render(scene, camera)
    }

    function animate(now) {
      if (!running) return
      const delta = Math.min((now - lastTime) / 1000, 0.1)
      lastTime = now
      clock.time += delta

      starsFar.material.uniforms.uTime.value = clock.time
      starsNear.material.uniforms.uTime.value = clock.time
      nebulaMaterial.uniforms.uTime.value = clock.time

      planets.forEach(({ group, mesh, spin, drift }) => {
        mesh.rotation.y += delta * spin
        mesh.rotation.x += delta * spin * 0.25

        group.position.x += drift.x * delta
        group.position.y += drift.y * delta

        // Wrap around so planets keep wandering through the scene endlessly
        if (group.position.x > BOUND_X) group.position.x = -BOUND_X
        if (group.position.x < -BOUND_X) group.position.x = BOUND_X
        if (group.position.y > BOUND_Y) group.position.y = -BOUND_Y
        if (group.position.y < -BOUND_Y) group.position.y = BOUND_Y
      })

      renderer.render(scene, camera)
      rafId = requestAnimationFrame(animate)
    }

    if (prefersReducedMotion) {
      starsFar.material.uniforms.uAnimate.value = 0
      starsNear.material.uniforms.uAnimate.value = 0
      renderStatic()
    } else {
      rafId = requestAnimationFrame(animate)
    }

    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      if (prefersReducedMotion) renderStatic()
    }
    window.addEventListener('resize', handleResize)

    function handleVisibility() {
      if (prefersReducedMotion) return
      if (document.hidden) {
        running = false
        if (rafId) cancelAnimationFrame(rafId)
      } else if (!running) {
        running = true
        lastTime = performance.now()
        rafId = requestAnimationFrame(animate)
      }
    }
    document.addEventListener('visibilitychange', handleVisibility)

    return () => {
      running = false
      if (rafId) cancelAnimationFrame(rafId)
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibility)

      surfaceTexture.dispose()
      scene.traverse((obj) => {
        if (obj.geometry) obj.geometry.dispose()
        if (obj.material) obj.material.dispose()
      })
      renderer.dispose()
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement)
      }
    }
  }, [])

  return <div ref={mountRef} className="space-bg" aria-hidden="true" />
}
