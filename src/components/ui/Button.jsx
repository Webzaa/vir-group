import { Link } from 'react-router-dom';
/** Solid: one conversion action per view. Text: navigation. Ghost: over imagery and dark sections. */
export function Button({ href, variant = 'ghost', children, className, event }) {
  const c = `btn btn-${variant}${className ? ` ${className}` : ''}`;
  if (/^(tel:|mailto:|https?:)/.test(href)) {
    const ext = href.startsWith('http');
    return (
      <a className={c} href={href} data-event={event} {...(ext ? { rel: 'noopener' } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link className={c} to={href} data-event={event}>
      {children}
    </Link>
  );
}
