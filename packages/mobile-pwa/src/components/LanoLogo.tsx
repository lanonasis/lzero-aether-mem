/**
 * LanOnasis Brand Logo - "L0"
 * Enhanced version with accent detail
 * Consistent branding across web and mobile
 */
export function LanoLogo({
  size = 24,
  className = ""
}: {
  size?: number;
  className?: string
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* L shape */}
      <path
        d="M6 3v15h8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 0 shape - circle with accent */}
      <circle
        cx="16.5"
        cy="13"
        r="4.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      {/* Accent line through the 0 */}
      <path
        d="M16.5 9v8"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.6"
      />
    </svg>
  );
}
