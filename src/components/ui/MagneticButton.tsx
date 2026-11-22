"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost" | "gold";
  external?: boolean;
  className?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  ariaLabel?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "ghost",
  external = false,
  className,
  type = "button",
  disabled = false,
  ariaLabel,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, { stiffness: 260, damping: 18, mass: 0.4 });
  const y = useSpring(rawY, { stiffness: 260, damping: 18, mass: 0.4 });

  const move = (event: React.PointerEvent<HTMLDivElement>) => {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((event.clientX - rect.left - rect.width / 2) * 0.22);
    rawY.set((event.clientY - rect.top - rect.height / 2) * 0.22);
  };

  const reset = () => {
    rawX.set(0);
    rawY.set(0);
  };

  const style = variant === "primary" ? "btn-primary" : variant === "gold" ? "btn-gold" : "btn-ghost";
  const classes = cn("btn", style, className);

  return (
    <motion.div ref={ref} onPointerMove={move} onPointerLeave={reset} style={{ x, y }} className="inline-flex">
      {href ? (
        external ? (
          <a href={href} target="_blank" rel="noopener noreferrer" className={classes} aria-label={ariaLabel}>
            {children}
          </a>
        ) : (
          <Link href={href} className={classes} aria-label={ariaLabel}>
            {children}
          </Link>
        )
      ) : (
        <button type={type} onClick={onClick} disabled={disabled} className={classes} aria-label={ariaLabel}>
          {children}
        </button>
      )}
    </motion.div>
  );
}
