export const L0Logo = ({ className = "h-5 w-5" }: { className?: string }) => (
  <svg
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
    <path
      d="M16.5 9v8"
      stroke="currentColor"
      strokeWidth="1.5"
      opacity="0.6"
    />
  </svg>
);
