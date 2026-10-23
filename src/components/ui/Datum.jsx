export function Datum({ className = 'datum' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <circle className="c" cx="8" cy="8" r="7" />
      <path className="q" d="M8 8L15 8A7 7 0 0 0 8 1Z" />
      <path className="q" d="M8 8L1 8A7 7 0 0 0 8 15Z" />
    </svg>
  );
}
