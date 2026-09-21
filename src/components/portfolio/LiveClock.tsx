"use client";

import { useEffect, useState } from "react";

/**
 * <LiveClock />
 * Displays the visitor's local time, updating every second.
 * Timezone is the browser's local timezone.
 */
export default function LiveClock({ className }: { className?: string }) {
  const [now, setNow] = useState<string>("--:--:--");
  const [tz, setTz] = useState<string>("");

  useEffect(() => {
    const update = () => {
      const d = new Date();
      const time = d.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
      setNow(time);
      try {
        const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const city = zone.split("/").pop()?.replace(/_/g, " ") ?? zone;
        setTz(city);
      } catch {
        setTz("Local");
      }
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className={className}>
      <span className="tabular-nums">{now}</span>
      <span className="mx-1 opacity-40">·</span>
      <span className="opacity-60">{tz}</span>
    </span>
  );
}
