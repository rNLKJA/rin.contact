/**
 * MagneticWrapper — subtle 3-D card tilt toward the cursor on desktop.
 * Wraps any element. Touch / mobile: no effect (pointer: coarse).
 */
import { useRef, useState, useCallback, useEffect } from "react";

export default function MagneticWrapper({
  children,
  strength = 10,
  className = "",
  style: styleProp = {},
}) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({});
  const [coarse, setCoarse] = useState(true); // assume touch until checked

  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const onMouseMove = useCallback(
    (e) => {
      if (coarse) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const dx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;   // -1 → 1
      const dy = ((e.clientY - rect.top)  / rect.height - 0.5) * 2;  // -1 → 1
      setTilt({
        transform: `perspective(700px) rotateY(${dx * strength * 0.5}deg) rotateX(${-dy * strength * 0.5}deg) translateZ(6px)`,
        transition: "transform 0.08s ease-out",
        willChange: "transform",
      });
    },
    [coarse, strength]
  );

  const onMouseLeave = useCallback(() => {
    setTilt({
      transform: "perspective(700px) rotateY(0deg) rotateX(0deg) translateZ(0px)",
      transition: "transform 0.45s ease-out",
    });
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ ...styleProp, ...tilt }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {children}
    </div>
  );
}
