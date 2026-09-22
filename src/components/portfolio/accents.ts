/** Accent color map for glass cards / badges. */
export const accentMap = {
  cyan: {
    text: "text-amber-200",
    border: "rgba(245,208,137,0.45)",
    glow: "rgba(245,208,137,0.35)",
    chip: "rgba(245,208,137,0.14)",
    grad: "linear-gradient(135deg, rgba(245,208,137,0.5), rgba(245,208,137,0.05))",
    solid: "#f5d089",
  },
  violet: {
    text: "text-rose-300",
    border: "rgba(244,63,94,0.45)",
    glow: "rgba(244,63,94,0.35)",
    chip: "rgba(244,63,94,0.16)",
    grad: "linear-gradient(135deg, rgba(244,63,94,0.5), rgba(244,63,94,0.05))",
    solid: "#f43f5e",
  },
  indigo: {
    text: "text-blue-300",
    border: "rgba(59,130,246,0.45)",
    glow: "rgba(59,130,246,0.35)",
    chip: "rgba(59,130,246,0.16)",
    grad: "linear-gradient(135deg, rgba(59,130,246,0.5), rgba(59,130,246,0.05))",
    solid: "#3b82f6",
  },
  emerald: {
    text: "text-emerald-300",
    border: "rgba(16,185,129,0.45)",
    glow: "rgba(16,185,129,0.35)",
    chip: "rgba(16,185,129,0.16)",
    grad: "linear-gradient(135deg, rgba(16,185,129,0.5), rgba(16,185,129,0.05))",
    solid: "#10b981",
  },
  amber: {
    text: "text-amber-300",
    border: "rgba(245,158,11,0.45)",
    glow: "rgba(245,158,11,0.35)",
    chip: "rgba(245,158,11,0.16)",
    grad: "linear-gradient(135deg, rgba(245,158,11,0.5), rgba(245,158,11,0.05))",
    solid: "#f59e0b",
  },
} as const;

export type Accent = keyof typeof accentMap;
