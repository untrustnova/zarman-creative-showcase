export function FlagEN({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="36" fill="#012169" />
      <path d="M0 0L60 36M60 0L0 36" stroke="#FFFFFF" strokeWidth="6" />
      <path d="M0 0L60 36M60 0L0 36" stroke="#C8102E" strokeWidth="3" />
      <path d="M30 0V36M0 18H60" stroke="#FFFFFF" strokeWidth="10" />
      <path d="M30 0V36M0 18H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  );
}

export function FlagID({ className = "h-4 w-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 36"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="60" height="18" fill="#e70011" />
      <rect y="18" width="60" height="18" fill="#ffffff" />
      <rect
        width="60"
        height="36"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth="1"
      />
    </svg>
  );
}
