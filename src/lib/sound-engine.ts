"use client";

/**
 * Luxury Web Audio API Sound Synthesizer Engine
 * Zero external audio assets, zero latency, ultra-lightweight.
 * Provides tactile mechanical clicks for every element and crisp haptic ratchet sounds when scrolling down.
 */

class SoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private lastScrollTickTime: number = 0;
  private lastScrollY: number = 0;
  private scrollAccumulator: number = 0;
  private noiseBuffer: AudioBuffer | null = null;

  public initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    if (!this.ctx) {
      const AC =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AC) {
        this.ctx = new AC();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  /**
   * Pre-generates a micro-burst noise buffer for mechanical switch clicks
   */
  private getNoiseBuffer(ctx: AudioContext): AudioBuffer {
    if (this.noiseBuffer && this.noiseBuffer.sampleRate === ctx.sampleRate) {
      return this.noiseBuffer;
    }
    const length = Math.floor(ctx.sampleRate * 0.015); // 15ms buffer
    const buffer = ctx.createBuffer(1, length, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < length; i++) {
      // Exponentially decaying physical impact noise
      data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (length * 0.25));
    }
    this.noiseBuffer = buffer;
    return buffer;
  }

  /**
   * Tactile Mechanical Switch Click for Elements
   * Inspired by high-end mechanical tactile switches & luxury camera shutters.
   */
  public playClick(type: "action" | "card" | "element" | "standard" = "standard") {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const pitchJitter = 1 + (Math.random() * 0.08 - 0.04); // ±4% physical jitter

      // Pitch configurations
      let startFreq = 1650;
      let endFreq = 260;
      let duration = 0.024;
      let masterGain = 0.14;

      if (type === "action") {
        // Crisp, elevated mechanical switch snap (buttons, links, toggles)
        startFreq = 1950;
        endFreq = 340;
        duration = 0.026;
        masterGain = 0.16;
      } else if (type === "card") {
        // Rich, solid tactile clack with body resonance (cards, images, nodes)
        startFreq = 1350;
        endFreq = 210;
        duration = 0.028;
        masterGain = 0.13;
      } else if (type === "element") {
        // Subtle crisp tactile micro-snap for every other element clicked
        startFreq = 1500;
        endFreq = 280;
        duration = 0.02;
        masterGain = 0.11;
      }

      startFreq *= pitchJitter;
      endFreq *= pitchJitter;

      // 1. Mechanical Actuation Tone Sweep (tactile bump drop)
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), t + duration);

      oscGain.gain.setValueAtTime(masterGain, t);
      oscGain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(oscGain);
      oscGain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + duration + 0.005);

      // 2. Physical Switch Contact Transient (noise impulse)
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(type === "action" ? 3400 : 2800, t);
      filter.Q.setValueAtTime(2.2, t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(masterGain * 0.42, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.009);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(t);
      noise.stop(t + 0.012);

      // 3. Bottom-out Body Thump (solid mechanical feel)
      const subOsc = ctx.createOscillator();
      const subGain = ctx.createGain();

      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(180 * pitchJitter, t);
      subOsc.frequency.exponentialRampToValueAtTime(60, t + 0.018);

      subGain.gain.setValueAtTime(masterGain * 0.35, t);
      subGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.018);

      subOsc.connect(subGain);
      subGain.connect(ctx.destination);

      subOsc.start(t);
      subOsc.stop(t + 0.02);
    } catch {
      // Audio context might be waiting for user gesture
    }
  }

  /**
   * Crisp Haptic Scroll Ratchet (specifically engineered for scrolling down)
   * Sounds like a precision rotary encoder / Swiss watch crown ratchet.
   */
  public handleScroll(currentScrollY: number) {
    if (!this.enabled) return;

    const delta = currentScrollY - this.lastScrollY;
    const absDelta = Math.abs(delta);
    this.lastScrollY = currentScrollY;

    // Accumulate scroll distance
    this.scrollAccumulator += absDelta;

    const threshold = 48; // Trigger a crisp ratchet tick every ~48px of scroll
    if (this.scrollAccumulator >= threshold) {
      const now = performance.now();
      // Enforce rhythmic spacing (minimum 36ms between ticks)
      if (now - this.lastScrollTickTime > 36) {
        const isScrollingDown = delta >= 0;
        this.playScrollTick(isScrollingDown);
        this.lastScrollTickTime = now;
      }
      this.scrollAccumulator = 0;
    }
  }

  /**
   * Direct Wheel Trigger (instant tactile response when rotating mouse wheel)
   */
  public handleWheel(deltaY: number) {
    if (!this.enabled) return;
    const now = performance.now();
    if (now - this.lastScrollTickTime > 38) {
      const isScrollingDown = deltaY > 0;
      this.playScrollTick(isScrollingDown);
      this.lastScrollTickTime = now;
    }
  }

  /**
   * Generates the crisp physical ratchet tick for scrolling
   */
  public playScrollTick(isDown: boolean = true) {
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      // Micro pitch jitter so each tooth of the ratchet wheel has organic physical variation
      const jitter = 1 + (Math.random() * 0.07 - 0.035);

      // Downward scrolling has a satisfying crisp mechanical bite
      const startFreq = (isDown ? 2100 : 1850) * jitter;
      const endFreq = (isDown ? 520 : 440) * jitter;
      const duration = 0.013;
      const gainLevel = isDown ? 0.058 : 0.046;

      // 1. High crisp click impulse
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(startFreq, t);
      osc.frequency.exponentialRampToValueAtTime(endFreq, t + duration);

      gain.gain.setValueAtTime(gainLevel, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + duration + 0.002);

      // 2. Micro noise friction transient (the physical gear tooth contact)
      const noise = ctx.createBufferSource();
      noise.buffer = this.getNoiseBuffer(ctx);

      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(isDown ? 3800 : 3200, t);
      filter.Q.setValueAtTime(3.5, t);

      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(gainLevel * 0.35, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.006);

      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);

      noise.start(t);
      noise.stop(t + 0.007);
    } catch {
      // Audio context waiting for gesture
    }
  }

  /**
   * Subtle hover micro-tick for interactive elements
   */
  public playHover() {
    if (!this.enabled) return;
    const ctx = this.initCtx();
    if (!ctx) return;

    try {
      const t = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1450, t);
      osc.frequency.exponentialRampToValueAtTime(550, t + 0.008);

      gain.gain.setValueAtTime(0.024, t);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.008);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.01);
    } catch {}
  }
}

export const soundEngine = new SoundEngine();
