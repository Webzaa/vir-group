const cls = { hero: 't-hero', display: 't-display', h1: 't-h1', h2: 't-h2' };
/**
 * Display type split into authored lines, each in its own mask for the line reveal.
 * `italic` sets the whole last line in italic (system rule: a whole line, never a single word).
 * The full sentence stays in aria-label so screen readers never hear fragments.
 */
export function Headline({ as: Tag = 'h2', variant = 'h1', lines, id, className, italic = true, reveal = true, style }) {
  return (
    <Tag
      id={id}
      className={`${cls[variant]}${className ? ` ${className}` : ''}`}
      aria-label={lines.join(' ')}
      data-lines={reveal ? '' : undefined}
      style={style}
    >
      {lines.map((l, i) => (
        <span className="line" key={`${i}-${l}`} aria-hidden="true">
          <span className={italic && lines.length > 1 && i === lines.length - 1 ? 'it' : undefined}>{l}</span>
        </span>
      ))}
    </Tag>
  );
}
