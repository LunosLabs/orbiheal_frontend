import React from "react";

export const EllipsisSpinner = ({
  size = 32, // Default: large and visible
  color = "currentColor", // Inherits from parent by default
  style = {},
  className = "",
  "aria-label": ariaLabel = "Loading...",
}) => {
  // Support both number and string for size
  const sizeValue = typeof size === "number" ? `${size}px` : size;
  // Each dot is 1/3 of total size
  const dotSize = `calc(var(--spinner-size, ${sizeValue}) / 3)`;
  // Gap between dots is 1/2 dot size
  const gap = `calc(${dotSize} / 1.5)`;

  return (
    <span
      className={className}
      aria-label={ariaLabel}
      role="status"
      style={{
        "--spinner-size": sizeValue,
        "--spinner-color": color,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: "var(--spinner-size)",
        minWidth: "calc(var(--spinner-size) * 1.5)",
        gap,
        ...style,
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          style={{
            display: "inline-block",
            width: dotSize,
            height: dotSize,
            borderRadius: "50%",
            background: "var(--spinner-color)",
            opacity: 0.7,
            animation: "ellipsis-bounce 1s infinite",
            animationDelay: `${i * 0.18}s`,
          }}
        />
      ))}
      <style>
        {`
          @keyframes ellipsis-bounce {
            0%, 80%, 100% { transform: scale(0.7); opacity: 0.7; }
            40% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>
    </span>
  );
};
