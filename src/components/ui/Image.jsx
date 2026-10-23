/**
 * Plain <img> that keeps the same markup contract the design was built against
 * (`fill` = absolutely positioned cover layer, `priority` = eager + high fetch priority).
 */
import { useState, useEffect } from 'react';
import { getMediaUrl } from '@/lib/media';

const FILL = { position: 'absolute', inset: 0, width: '100%', height: '100%', color: 'transparent' };

export function Image({ src, alt, fill, priority, sizes, width, height, style, className, onError, ...rest }) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  const resolvedSrc = getMediaUrl(currentSrc);

  const handleError = (e) => {
    if (typeof currentSrc === 'string' && currentSrc.endsWith('.avif')) {
      setCurrentSrc(currentSrc.replace(/\.avif$/, '.png'));
    }
    if (onError) onError(e);
  };

  return (
    <img
      src={resolvedSrc}
      alt={alt}
      sizes={sizes}
      width={fill ? undefined : width}
      height={fill ? undefined : height}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
      className={className}
      style={fill ? { ...FILL, ...style } : { color: 'transparent', ...style }}
      onError={handleError}
      {...rest}
    />
  );
}
