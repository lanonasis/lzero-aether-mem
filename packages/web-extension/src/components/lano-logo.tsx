import React from "react";

interface LanoLogoProps {
  size?: number;
  className?: string;
}

export const LanoLogo: React.FC<LanoLogoProps> = ({ size = 24, className = "" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* L shape */}
      <path
        d="M5 4v13h8"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* 0 shape */}
      <ellipse
        cx="16"
        cy="11"
        rx="4"
        ry="5.5"
        stroke="currentColor"
        strokeWidth="2.5"
        fill="none"
      />
    </svg>
  );
};
