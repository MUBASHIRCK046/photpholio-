/** Accent color map for glass cards / badges. */
export const accentMap = {
  cyan: {
    text: "text-cyan-300",
    border: "rgba(6,182,212,0.45)",
    glow: "rgba(6,182,212,0.35)",
    chip: "rgba(6,182,212,0.14)",
    grad: "linear-gradient(135deg, rgba(6,182,212,0.5), rgba(6,182,212,0.05))",
    solid: "#06b6d4",
  },
  violet: {
    text: "text-violet-300",
    border: "rgba(124,58,237,0.45)",
    glow: "rgba(124,58,237,0.35)",
    chip: "rgba(124,58,237,0.16)",
    grad: "linear-gradient(135deg, rgba(124,58,237,0.5), rgba(124,58,237,0.05))",
    solid: "#7c3aed",
  },
  indigo: {
    text: "text-indigo-300",
    border: "rgba(99,102,241,0.45)",
    glow: "rgba(99,102,241,0.35)",
    chip: "rgba(99,102,241,0.16)",
    grad: "linear-gradient(135deg, rgba(99,102,241,0.5), rgba(99,102,241,0.05))",
    solid: "#6366f1",
  },
} as const;

export type Accent = keyof typeof accentMap;
