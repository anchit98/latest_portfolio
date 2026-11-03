import { useId } from "react";

/**
 * AB block monogram: a solid rounded tile with the letters cut out. The tile is currentColor and the
 * letters are a mask, so whatever sits behind shows through (and it survives the header's blend mode).
 */
export default function Logo({ className }: { className?: string }) {
  const mask = useId();
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Anchit Boruah">
      <defs>
        <mask id={mask}>
          <rect width="32" height="32" fill="#fff" />
          <g fill="none" stroke="#000" strokeWidth="3" strokeLinejoin="round">
            <path d="M5.8 24.5 L10.9 7.5 L16 24.5" />
            <path d="M7.9 18.6 H13.9" />
            <path d="M18.6 7.5 V24.5 M18.6 7.5 H21.9 A3.75 3.75 0 0 1 21.9 15 H18.6 M18.6 15 H22.5 A4.75 4.75 0 0 1 22.5 24.5 H18.6" />
          </g>
        </mask>
      </defs>
      <rect width="32" height="32" rx="8" fill="currentColor" mask={`url(#${mask})`} />
    </svg>
  );
}
