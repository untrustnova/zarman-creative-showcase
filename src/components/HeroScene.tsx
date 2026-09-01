import { useEffect, useRef } from "react";
import type { Material } from "three";

export function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let disposed = false;
    let frame = 0;
    let cleanup = () => {};

    void import("three").then((THREE) => {
      if (disposed || !mountRef.current) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(42, mount.clientWidth / mount.clientHeight, 0.1, 100);
      camera.position.set(0, 0, 6.4);

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: window.devicePixelRatio < 2 });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.25 : 1.75));
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      mount.appendChild(renderer.domElement);

      const group = new THREE.Group();
      scene.add(group);

      const knot = new THREE.Mesh(
        new THREE.TorusKnotGeometry(1.35, 0.34, window.innerWidth < 768 ? 96 : 160, 20, 2, 3),
        new THREE.MeshPhysicalMaterial({
          color: 0xe4071e,
          metalness: 0.75,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.12,
        }),
      );
      knot.rotation.set(0.35, -0.4, 0.15);
      group.add(knot);

      const wire = new THREE.Mesh(
        new THREE.IcosahedronGeometry(2.4, 2),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.075 }),
      );
      group.add(wire);

      const count = window.innerWidth < 768 ? 120 : 260;
      const positions = new Float32Array(count * 3);
      for (let index = 0; index < count; index += 1) {
        const radius = 2.7 + Math.random() * 2.5;
        const angle = Math.random() * Math.PI * 2;
        positions[index * 3] = Math.cos(angle) * radius;
        positions[index * 3 + 1] = (Math.random() - 0.5) * 5.5;
        positions[index * 3 + 2] = Math.sin(angle) * radius - 1;
      }
      const particleGeometry = new THREE.BufferGeometry();
      particleGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({ color: 0xff5361, size: 0.018, transparent: true, opacity: 0.7 }),
      );
      scene.add(particles);

      scene.add(new THREE.AmbientLight(0xffffff, 0.85));
      const redLight = new THREE.PointLight(0xff1028, 30, 12);
      redLight.position.set(3, 2, 4);
      scene.add(redLight);
      const whiteLight = new THREE.PointLight(0xffffff, 18, 10);
      whiteLight.position.set(-3, -2, 3);
      scene.add(whiteLight);

      const pointer = { x: 0, y: 0 };
      const onPointerMove = (event: PointerEvent) => {
        pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.7;
        pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.5;
      };
      const resize = () => {
        if (!mountRef.current) return;
        const { clientWidth, clientHeight } = mountRef.current;
        camera.aspect = clientWidth / clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(clientWidth, clientHeight);
      };

      let visible = true;
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry?.isIntersecting ?? false;
      });
      observer.observe(mount);
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("resize", resize);

      const clock = new THREE.Clock();
      const render = () => {
        if (disposed) return;
        frame = window.requestAnimationFrame(render);
        if (!visible) return;
        const elapsed = clock.getElapsedTime();
        group.rotation.y += (pointer.x - group.rotation.y) * 0.025;
        group.rotation.x += (-pointer.y - group.rotation.x) * 0.025;
        knot.rotation.z = elapsed * 0.08;
        wire.rotation.y = -elapsed * 0.025;
        particles.rotation.y = elapsed * 0.015;
        renderer.render(scene, camera);
      };
      render();

      cleanup = () => {
        observer.disconnect();
        window.removeEventListener("pointermove", onPointerMove);
        window.removeEventListener("resize", resize);
        window.cancelAnimationFrame(frame);
        knot.geometry.dispose();
        (knot.material as Material).dispose();
        wire.geometry.dispose();
        (wire.material as Material).dispose();
        particleGeometry.dispose();
        (particles.material as Material).dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />;
}
