import { useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive background: a wireframe icosahedron "core", orbiting torus rings,
// a particle field and floating shards. Reacts to mouse + scroll and to theme.
export default function Scene3D({ theme }) {
  const mount = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const el = mount.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 9;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const palette = [0x22d3ee, 0x6366f1, 0xa855f7, 0xec4899];
    const group = new THREE.Group();
    scene.add(group);

    const core = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2, 1),
      new THREE.MeshBasicMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.55 })
    );
    group.add(core);
    const inner = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 0),
      new THREE.MeshBasicMaterial({ color: 0x22d3ee, wireframe: true, transparent: true, opacity: 0.8 })
    );
    group.add(inner);

    const rings = palette.map((c, i) => {
      const r = new THREE.Mesh(
        new THREE.TorusGeometry(3 + i * 0.6, 0.015, 8, 160),
        new THREE.MeshBasicMaterial({ color: c, transparent: true, opacity: 0.7 })
      );
      r.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      group.add(r);
      return r;
    });

    const shards = Array.from({ length: 26 }, (_, i) => {
      const m = new THREE.Mesh(
        new THREE.OctahedronGeometry(0.12 + Math.random() * 0.14),
        new THREE.MeshBasicMaterial({ color: palette[i % 4], wireframe: i % 2 === 0 })
      );
      const a = Math.random() * Math.PI * 2;
      const d = 3.5 + Math.random() * 3;
      m.userData = { a, d, s: 0.1 + Math.random() * 0.3, y: (Math.random() - 0.5) * 5 };
      group.add(m);
      return m;
    });

    const N = 1400;
    const pos = new Float32Array(N * 3);
    const col = new Float32Array(N * 3);
    const tmp = new THREE.Color();
    for (let i = 0; i < N; i++) {
      pos.set([(Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30], i * 3);
      tmp.setHex(palette[i % 4]);
      col.set([tmp.r, tmp.g, tmp.b], i * 3);
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    pg.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const pm = new THREE.PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.8 });
    const points = new THREE.Points(pg, pm);
    scene.add(points);

    const mouse = { x: 0, y: 0 };
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("resize", onResize);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    let raf;
    const tick = () => {
      const t = reduce ? 0 : clock.getElapsedTime();
      const scroll = window.scrollY / Math.max(1, document.body.scrollHeight - window.innerHeight);
      core.rotation.set(t * 0.2, t * 0.3, 0);
      inner.rotation.set(-t * 0.4, t * 0.25, 0);
      rings.forEach((r, i) => { r.rotation.z += 0.002 * (i + 1); r.rotation.x += 0.0015; });
      shards.forEach((s) => {
        const u = s.userData;
        const a = u.a + t * u.s;
        s.position.set(Math.cos(a) * u.d, u.y + Math.sin(t + u.a) * 0.4, Math.sin(a) * u.d);
        s.rotation.x = t; s.rotation.y = t * 0.7;
      });
      points.rotation.y = t * 0.02 + scroll * 1.5;
      group.rotation.y += (mouse.x * 0.5 - group.rotation.y) * 0.04;
      group.rotation.x += (mouse.y * 0.3 - group.rotation.x) * 0.04;
      group.position.y = scroll * 6;
      group.position.x = 2.4 * (1 - Math.min(1, scroll * 3));
      const light = themeRef.current === "light";
      pm.opacity = light ? 0.55 : 0.85;
      core.material.opacity = light ? 0.8 : 0.55;
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      scene.traverse((o) => { o.geometry?.dispose(); o.material?.dispose?.(); });
      el.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mount} className="scene" aria-hidden="true" />;
}
