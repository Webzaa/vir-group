import { Link } from 'react-router-dom';
/** Solid: one conversion action per view. Text: navigation. Ghost: over imagery and dark sections. */
export function Button({ href, variant = 'ghost', children, className, event, download, target }) {
  const c = `btn btn-${variant}${className ? ` ${className}` : ''}`;
  const isDirectFile = typeof href === 'string' && (/\.(pdf|zip|docx?|xlsx?)$/i.test(href) || download);
  if (isDirectFile || /^(tel:|mailto:|https?:)/.test(href)) {
    const ext = typeof href === 'string' && href.startsWith('http');
    return (
      <a
        className={c}
        href={href}
        data-event={event}
        download={download || (isDirectFile ? true : undefined)}
        target={target || (isDirectFile || ext ? '_blank' : undefined)}
        rel={ext ? 'noopener noreferrer' : undefined}
      >
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
