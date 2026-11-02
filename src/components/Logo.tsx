/**
 * AB monogram: the A's right leg doubles as the B's stem. Drawn in currentColor so it works
 * on the header's blend mode; the favicon version in public/brand/icon.svg adds the oak dot.
 */
export default function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} role="img" aria-label="Anchit Boruah">
      <g fill="none" stroke="currentColor" strokeWidth="2.6">
        <path d="M3.5 28 L14.5 4 V28" />
        <path d="M8.2 19.6 H14.5" />
        <path d="M14.5 4 H20.5 A5.4 5.4 0 0 1 20.5 14.8 H14.5" />
        <path d="M14.5 14.8 H21.5 A6.6 6.6 0 0 1 21.5 28 H14.5" />
      </g>
      <circle cx="6.6" cy="7.6" r="1.9" fill="currentColor" />
    </svg>
  );
}
