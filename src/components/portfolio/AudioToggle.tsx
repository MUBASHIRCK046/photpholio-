"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * <AudioToggle />
 * Synthesizes a soft ambient drone using the Web Audio API (no assets).
 * Layered low-frequency oscillators with slow LFO-modulated filter for a
 * calm, aquatic atmosphere. Toggle on/off.
 */
export default function AudioToggle({ className }: { className?: string }) {
  const [on, setOn] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<{ stop: () => void } | null>(null);

  const start = () => {
    const AC =
      window.AudioContext ||
      (window as any).webkitAudioContext;
    if (!AC) return;
    const ctx = new AC();
    ctxRef.current = ctx;

    const master = ctx.createGain();
    master.gain.value = 0;
    master.connect(ctx.destination);
    master.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 1.5);

    // chord: low root + fifth + octave
    const freqs = [55, 82.5, 110];
    const oscs = freqs.map((f, i) => {
      const o = ctx.createOscillator();
      o.type = i === 0 ? "sine" : "triangle";
      o.frequency.value = f;
      const g = ctx.createGain();
      g.gain.value = i === 0 ? 0.6 : 0.25;
      o.connect(g);
      g.connect(master);

      // slow detune LFO for movement
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.05 + i * 0.02;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 1.5;
      lfo.connect(lfoGain);
      lfoGain.connect(o.detune);
      lfo.start();
      o.start();
      return { o, g, lfo };
    });

    // low-pass filter sweep for aquatic feel
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 500;
    filter.Q.value = 1;
    master.connect(filter);
    // re-attach filter to destination
    filter.connect(ctx.destination);

    // wait — we want master->filter->destination. rebuild routing:
    oscs.forEach(({ g }) => {
      g.disconnect();
      g.connect(filter);
    });
    master.disconnect();
    filter.connect(ctx.destination);

    const filterLfo = ctx.createOscillator();
    filterLfo.frequency.value = 0.08;
    const filterLfoGain = ctx.createGain();
    filterLfoGain.gain.value = 220;
    filterLfo.connect(filterLfoGain);
    filterLfoGain.connect(filter.frequency);
    filterLfo.start();

    nodesRef.current = {
      stop: () => {
        const t = ctx.currentTime;
        master.gain.cancelScheduledValues(t);
        master.gain.setValueAtTime(master.gain.value, t);
        master.gain.linearRampToValueAtTime(0, t + 0.8);
        oscs.forEach(({ o, lfo }) => {
          try {
            o.stop(t + 1);
            lfo.stop(t + 1);
          } catch {}
        });
        filterLfo.stop(t + 1);
        setTimeout(() => {
          try {
            ctx.close();
          } catch {}
        }, 1300);
      },
    };
  };

  const toggle = () => {
    if (on) {
      nodesRef.current?.stop();
      nodesRef.current = null;
      ctxRef.current = null;
      setOn(false);
    } else {
      start();
      setOn(true);
    }
  };

  useEffect(() => {
    return () => {
      nodesRef.current?.stop();
    };
  }, []);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={on}
      aria-label={on ? "Mute ambient sound" : "Play ambient sound"}
      className={cn(
        "group relative flex h-9 w-9 items-center justify-center rounded-full glass-pill text-pearl/80 transition hover:text-pearl",
        className
      )}
    >
      {on ? (
        <Volume2 className="h-4 w-4" />
      ) : (
        <VolumeX className="h-4 w-4" />
      )}
      {on && (
        <span className="absolute inset-0 -z-10 rounded-full bg-amber-400/25 animate-pulse" />
      )}
    </button>
  );
}
