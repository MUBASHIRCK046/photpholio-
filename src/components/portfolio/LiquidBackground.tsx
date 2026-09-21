"use client";

import { useEffect, useRef } from "react";

/**
 * <LiquidBackground />
 *
 * Full-viewport fixed background rendering three dynamically colliding
 * organic metaballs / fluid shaders in a continuous requestAnimationFrame
 * loop using Simplex 3D noise.
 *
 * Palette: Deep Indigo #080b1e, Liquid Cyan #06b6d4, Phantom Violet #7c3aed,
 * Pearlescent White #f8fafc, on a #02040a void.
 *
 * Ripples outward upon scroll delta and pointer drag.
 *
 * Implementation: hand-written GLSL fragment shader (raw WebGL2) for full
 * control + 60fps on composite. Rendered at 0.6x device pixel ratio for perf.
 */

const VERT = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}`;

const FRAG = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_res;
uniform float u_time;
uniform vec2 u_mouse;      // 0..1
uniform float u_scroll;   // scroll velocity (-? .. +?)
uniform float u_drag;     // pointer drag intensity 0..1

// ---- Ashima / Stefan Gustavson simplex 3D noise ----
vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }

float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i  = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx;
  vec3 x2 = x0 - i2 + 2.0 * C.xxx;
  vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute( permute( permute(
            i.z + vec4(0.0, i1.z, i2.z, 1.0))
          + i.y + vec4(0.0, i1.y, i2.y, 1.0))
          + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy;
  vec4 y = y_ *ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0;
  vec4 s1 = floor(b1)*2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}

float fbm(vec3 p){
  float v = 0.0;
  float a = 0.5;
  for(int i=0;i<5;i++){
    v += a * snoise(p);
    p *= 2.02;
    a *= 0.5;
  }
  return v;
}

// three metaballs positions, each wanders via simplex noise
vec3 ballCenter(int i, float t){
  float k = float(i);
  float s = 0.18 + k*0.05;
  float speed = 0.10 + k*0.04;
  vec3 p = vec3(
    snoise(vec3(t*speed,        k*1.7, 0.0)),
    snoise(vec3(t*speed+10.0,    k*2.3, 5.0)),
    snoise(vec3(t*speed+20.0,    k*3.1, 9.0))
  );
  // mouse attraction
  vec2 m = (u_mouse - 0.5);
  p.xy += m * (0.35 + u_drag*0.6) * (1.0 - k*0.2);
  p.xy *= 1.2;
  p.z = 0.0;
  return p;
}

void main(){
  vec2 uv = v_uv;
  // correct aspect
  vec2 p = uv;
  p.x *= u_res.x / u_res.y;

  float t = u_time * 0.12;

  // metaballs
  float field = 0.0;
  float r1 = 0.40; float r2 = 0.34; float r3 = 0.46;
  vec3 c1 = ballCenter(0, u_time);
  vec3 c2 = ballCenter(1, u_time);
  vec3 c3 = ballCenter(2, u_time);

  float d1 = length(p - c1.xy);
  float d2 = length(p - c2.xy);
  float d3 = length(p - c3.xy);

  field += r1 / (d1 + 0.0001);
  field += r2 / (d2 + 0.0001);
  field += r3 / (d3 + 0.0001);

  // caustic-like surface via fbm noise
  float n = fbm(vec3(p*2.2, t*1.4 + u_scroll*0.6));
  field += n * 0.18;

  // ripple rings from scroll velocity + drag
  float ripple = sin(length(p - u_mouse*u_res.x/u_res.y) * 22.0 - u_time*3.0 - u_scroll*8.0) * (0.04 + u_drag*0.12);
  field += ripple;

  // palette
  vec3 indigo = vec3(0.031, 0.043, 0.118);
  vec3 cyan   = vec3(0.024, 0.714, 0.831);
  vec3 violet = vec3(0.486, 0.227, 0.929);
  vec3 pearl  = vec3(0.973, 0.980, 0.988);
  vec3 voidC  = vec3(0.008, 0.016, 0.039);

  // map field to color
  float f = clamp(field*0.5, 0.0, 1.0);
  vec3 col = voidC;
  col = mix(col, indigo, smoothstep(0.10, 0.45, f));
  col = mix(col, violet,  smoothstep(0.42, 0.62, f));
  col = mix(col, cyan,    smoothstep(0.60, 0.80, f));
  // dimmer pearl highlights so foreground text stays readable
  col = mix(col, pearl*0.55, smoothstep(0.88, 1.0, f));

  // subtle caustic shimmer overlay
  float caust = pow(0.5 + 0.5*sin((p.x+p.y)*6.0 + t*2.0 + n*4.0), 6.0);
  col += caust * 0.04 * (0.4 + u_drag*0.6);

  // vignette
  float vig = smoothstep(1.25, 0.35, length(uv-0.5));
  col *= 0.42 + 0.42*vig;

  // gain (keep background dim)
  col = pow(col, vec3(0.98));
  col *= 0.82;

  fragColor = vec4(col, 1.0);
}`;

function createShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const sh = gl.createShader(type)!;
  gl.shaderSource(sh, src);
  gl.compileShader(sh);
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
     
    console.error("Shader compile error:", gl.getShaderInfoLog(sh));
    gl.deleteShader(sh);
    return null;
  }
  return sh;
}

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });
    if (!gl) {
      // Graceful fallback: CSS gradient background already on body.
      canvas.style.display = "none";
      return;
    }

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const vs = createShader(gl, gl.VERTEX_SHADER, VERT);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
       
      console.error("Program link error:", gl.getProgramInfoLog(prog));
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "u_res");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uMouse = gl.getUniformLocation(prog, "u_mouse");
    const uScroll = gl.getUniformLocation(prog, "u_scroll");
    const uDrag = gl.getUniformLocation(prog, "u_drag");

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const scale = 0.6; // perf scale

    const resize = () => {
      const w = Math.floor(window.innerWidth * scale * (dpr > 1 ? 1 : 1));
      const h = Math.floor(window.innerHeight * scale);
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      gl.viewport(0, 0, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0.5;
    let my = 0.5;
    let tmx = 0.5;
    let tmy = 0.5;
    let drag = 0;
    let scrollVel = 0;
    let scrollVelTarget = 0;

    const onMove = (e: PointerEvent) => {
      tmx = e.clientX / window.innerWidth;
      tmy = 1 - e.clientY / window.innerHeight;
      drag = Math.min(1, drag + 0.08);
    };
    const onDown = () => {
      drag = Math.min(1, drag + 0.3);
    };
    const onWheel = (e: WheelEvent) => {
      scrollVelTarget += e.deltaY * 0.0015;
      scrollVelTarget = Math.max(-0.6, Math.min(0.6, scrollVelTarget));
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    window.addEventListener("wheel", onWheel, { passive: true });

    const start = performance.now();
    let raf = 0;
    let visible = true;
    const onVis = () => {
      visible = !document.hidden;
    };
    document.addEventListener("visibilitychange", onVis);

    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      const t = (now - start) / 1000;

      // smooth mouse + decay drag/scroll
      mx += (tmx - mx) * 0.05;
      my += (tmy - my) * 0.05;
      drag *= 0.94;
      scrollVel += (scrollVelTarget - scrollVel) * 0.1;
      scrollVelTarget *= 0.9;

      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, t);
      gl.uniform2f(uMouse, mx, my);
      gl.uniform1f(uScroll, scrollVel);
      gl.uniform1f(uDrag, drag);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    if (prefersReduced) {
      // draw a single static frame
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, 0);
      gl.uniform2f(uMouse, 0.5, 0.5);
      gl.uniform1f(uScroll, 0);
      gl.uniform1f(uDrag, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("wheel", onWheel);
      document.removeEventListener("visibilitychange", onVis);
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{ background: "var(--void)" }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      {/* film grain + soft top glow overlay for depth */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 80% at 50% -10%, rgba(124,58,237,0.06), transparent 60%), radial-gradient(80% 60% at 100% 100%, rgba(6,182,212,0.05), transparent 60%)",
        }}
      />
    </div>
  );
}
