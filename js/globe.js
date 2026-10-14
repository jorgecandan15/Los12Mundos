/* =========================================================
   LOS 12 MUNDOS · globo 3D del logotipo (hero)
   El logo se divide en dos capas: un globo 3D que gira (WebGL)
   y encima las letras, estrellas, anillo y cohete.
   Si WebGL no está disponible, se queda el logo original.
   ========================================================= */
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.min.js";

const wrap = document.querySelector(".hero__brand");
const canvas = document.querySelector(".hero__globe");
const letters = document.querySelector(".hero__letters");

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(window.WebGLRenderingContext && (c.getContext("webgl2") || c.getContext("webgl")));
  } catch {
    return false;
  }
}

if (wrap && canvas && letters && webglOK()) init();

function init() {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const PAD = 1.22; // el canvas es un poco más grande que la esfera para el halo

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-PAD, PAD, PAD, -PAD, 0.1, 10);
  camera.position.z = 4;

  // luces suaves para un sombreado tipo "plastilina"
  scene.add(new THREE.HemisphereLight(0xffffff, 0xe6dcfa, 2.1));
  const sun = new THREE.DirectionalLight(0xffffff, 0.95);
  sun.position.set(-2.2, 2.4, 3);
  scene.add(sun);

  const loader = new THREE.TextureLoader();
  const earthTex = loader.load("assets/img/earth.webp", ready);
  earthTex.colorSpace = THREE.SRGBColorSpace;
  earthTex.anisotropy = 4;
  const cloudTex = loader.load("assets/img/clouds.webp");
  cloudTex.colorSpace = THREE.SRGBColorSpace;

  const tilt = new THREE.Group();
  tilt.rotation.z = THREE.MathUtils.degToRad(-14);
  tilt.rotation.x = THREE.MathUtils.degToRad(12);
  scene.add(tilt);

  const spin = new THREE.Group();
  spin.rotation.y = -1.9; // empezamos mirando a Europa / España
  tilt.add(spin);

  const earth = new THREE.Mesh(
    new THREE.SphereGeometry(1, 96, 64),
    new THREE.MeshLambertMaterial({ map: earthTex })
  );
  spin.add(earth);

  const clouds = new THREE.Mesh(
    new THREE.SphereGeometry(1.025, 64, 48),
    new THREE.MeshLambertMaterial({ map: cloudTex, transparent: true, opacity: 0.95, depthWrite: false })
  );
  tilt.add(clouds);

  // halo atmosférico (fresnel)
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(1.07, 64, 48),
    new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.BackSide,
      uniforms: { color: { value: new THREE.Color(0xb8e4f7) } },
      vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
      fragmentShader: `uniform vec3 color; varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 2.2); gl_FragColor = vec4(color, clamp(i * 0.75, 0.0, 1.0)); }`,
    })
  );
  scene.add(halo);

  // brillo especular suave (reflejo arriba a la izquierda)
  const shine = new THREE.Mesh(
    new THREE.CircleGeometry(0.42, 48),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16, depthWrite: false })
  );
  shine.position.set(-0.42, 0.46, 1.2);
  shine.scale.set(1, 0.7, 1);
  shine.rotation.z = 0.6;
  scene.add(shine);

  /* ---------- tamaño ---------- */
  function resize() {
    const w = canvas.clientWidth;
    if (!w) return;
    renderer.setSize(w, w, false);
  }
  new ResizeObserver(resize).observe(canvas);
  resize();

  /* ---------- arrastrar para girar ---------- */
  let dragging = false;
  let lastX = 0, lastY = 0;
  let velY = reduceMotion ? 0 : 0.0032; // velocidad de giro
  const baseVel = velY;
  let tiltX = 0;

  wrap.addEventListener("pointerdown", (e) => {
    dragging = true;
    lastX = e.clientX;
    lastY = e.clientY;
    wrap.setPointerCapture(e.pointerId);
    wrap.classList.add("is-dragging");
  });
  wrap.addEventListener("pointermove", (e) => {
    if (!dragging) return;
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    lastX = e.clientX;
    lastY = e.clientY;
    const k = 3.2 / canvas.clientWidth;
    spin.rotation.y += dx * k;
    velY = dx * k * 0.6;
    tiltX = THREE.MathUtils.clamp(tiltX + dy * k, -0.5, 0.5);
  });
  const end = () => {
    dragging = false;
    wrap.classList.remove("is-dragging");
  };
  wrap.addEventListener("pointerup", end);
  wrap.addEventListener("pointercancel", end);

  /* ---------- bucle ---------- */
  let visible = true;
  let running = false;
  new IntersectionObserver(([en]) => {
    visible = en.isIntersecting;
    if (visible) loop();
  }).observe(wrap);
  document.addEventListener("visibilitychange", () => { if (!document.hidden) loop(); });

  function frame() {
    if (!dragging) {
      velY += (baseVel - velY) * 0.03; // inercia que vuelve a la velocidad base
      spin.rotation.y += velY;
      tiltX *= 0.96;
    }
    spin.rotation.x = tiltX;
    clouds.rotation.y += reduceMotion ? 0 : velY * 1.35 + 0.0006;
    renderer.render(scene, camera);
  }

  function loop() {
    if (running) return;
    running = true;
    const tick = () => {
      if (!visible || document.hidden) { running = false; return; }
      frame();
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  function ready() {
    const show = () => {
      frame();
      wrap.closest(".hero__visual").classList.add("has-globe");
      loop();
    };
    if (letters.complete) show();
    else letters.addEventListener("load", show, { once: true });
  }
}
