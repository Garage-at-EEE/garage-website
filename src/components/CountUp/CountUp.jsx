import { useState, useEffect, useRef, useMemo } from "react";
import styles from "./CountUp.module.css";

const CountUp = ({
  end,
  duration = 1500,
  prefix = "",
  suffix = "",
  className = "",
  decimals = 0,
}) => {
  const [value, setValue] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    const el = ref.current;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !started) {
            setStarted(true);
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const startVal = 0;
    const change = end - startVal;
    let rafId = 0;

    const animate = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = startVal + change * eased;
      setValue(current);
      if (t < 1) rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafId);
  }, [started, duration, end]);

  const formatted = useMemo(() => {
    const n = Number.isFinite(value) ? value : 0;
    const rounded =
      decimals > 0 ? Number(n.toFixed(decimals)) : Math.round(n);
    const fmt = new Intl.NumberFormat(undefined, {
      maximumFractionDigits: decimals,
    });
    return `${prefix}${fmt.format(rounded)}${suffix}`;
  }, [value, prefix, suffix, decimals]);

  return (
    <span
      ref={ref}
      className={`${styles.countUp} ${className}`}
      aria-label={`${prefix}${end}${suffix}`}
    >
      {formatted}
    </span>
  );
};

export default CountUp;
