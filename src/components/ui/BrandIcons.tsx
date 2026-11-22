type IconProps = { className?: string };

/** Brand marks kept as inline SVG because lucide-react v1 removed brand icons. */
export function Github({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2.2c-3.23.7-3.91-1.38-3.91-1.38-.53-1.34-1.3-1.7-1.3-1.7-1.05-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.72 1.27 3.38.97.1-.75.4-1.27.73-1.56-2.57-.29-5.27-1.29-5.27-5.72 0-1.26.45-2.3 1.19-3.11-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.81 1.18 1.85 1.18 3.11 0 4.44-2.7 5.42-5.28 5.71.42.36.79 1.07.79 2.16v3.2c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function Linkedin({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M20.45 2H3.55A1.55 1.55 0 0 0 2 3.55v16.9A1.55 1.55 0 0 0 3.55 22h16.9A1.55 1.55 0 0 0 22 20.45V3.55A1.55 1.55 0 0 0 20.45 2ZM8.06 18.75H5.03V9.2h3.03v9.55ZM6.54 7.9a1.76 1.76 0 1 1 0-3.52 1.76 1.76 0 0 1 0 3.52Zm12.21 10.85h-3.02v-4.64c0-1.11-.02-2.54-1.55-2.54-1.55 0-1.79 1.21-1.79 2.46v4.72H9.36V9.2h2.9v1.3h.04a3.18 3.18 0 0 1 2.86-1.57c3.06 0 3.63 2.01 3.63 4.63v5.19Z" />
    </svg>
  );
}
