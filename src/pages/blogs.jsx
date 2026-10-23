import React, { useState, useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';
import { blogs as initialBlogs } from '@/data/blogs';

export function Blogs() {
  const [searchQuery, setSearchQuery] = useState('');

  usePageMeta({
    title: 'Our Blog | VIR Group Real Estate Insights & News',
    description: 'Insights, stories, and updates from our journey in real estate excellence across Mumbai.',
    path: '/blog',
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredBlogs = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return initialBlogs;
    return initialBlogs.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.excerpt.toLowerCase().includes(q) ||
        (b.category && b.category.toLowerCase().includes(q))
    );
  }, [searchQuery]);

  return (
    <div className="blog-page" id="blogs-page">
      {/* ── Top Hero Banner ── */}
      <section className="blog-hero" data-hero="true" data-theme="basalt" aria-labelledby="blog-main-title">
        <div className="blog-hero-inner">
          <h1 id="blog-main-title" className="blog-hero-title">
            Our Blog
          </h1>
          <p className="blog-hero-subtitle">
            Insights, stories, and updates from our journey in real estate excellence
          </p>

          {/* Pill Search Input */}
          <div className="blog-search-wrap">
            <span className="blog-search-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              className="blog-search-input"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search articles"
            />
          </div>
        </div>

        <div className="wrap" style={{ position: 'relative', zIndex: 2, marginTop: 'clamp(24px, 3vh, 40px)', padding: 0 }}>
          <p className="crumbs" style={{ margin: 0 }}>
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Blog</span>
          </p>
        </div>
      </section>

      {/* ── Blog Grid Section ── */}
      <section className="blog-grid-section" data-theme="white" aria-label="Articles list">
        <div className="blog-grid">
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.slug}`}
                className="blog-card"
              >
                {/* Image */}
                <div className="blog-card-media">
                  <img
                    src={getMediaUrl(post.image)}
                    alt={post.title}
                    className="blog-card-img"
                    loading="lazy"
                  />
                </div>

                {/* Content */}
                <div className="blog-card-body" style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                  <div className="blog-card-meta" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px !important', color: '#718096', fontWeight: 500, fontFamily: "'Manrope', sans-serif", marginBottom: '10px' }}>
                    <span>{post.date}</span>
                    {post.views && (
                      <>
                        <span className="blog-card-meta-dot" aria-hidden="true" style={{ color: '#a0aec0', fontSize: '11px' }}>·</span>
                        <span>{post.views}</span>
                      </>
                    )}
                  </div>

                  <h2
                    className="blog-card-title"
                    style={{
                      fontFamily: "'Manrope', 'Helvetica Neue', Arial, sans-serif",
                      fontSize: '17.5px !important',
                      fontWeight: 700,
                      lineHeight: 1.35,
                      color: '#172b4d !important',
                      margin: '0 0 10px 0',
                      letterSpacing: '-0.01em',
                      textTransform: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.title}
                  </h2>

                  <p
                    className="blog-card-excerpt"
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '13.5px',
                      lineHeight: 1.6,
                      color: '#64748b',
                      margin: '0 0 18px 0',
                      flex: 1,
                      textTransform: 'none',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.excerpt}
                  </p>

                  <div className="blog-card-footer" style={{ marginTop: 'auto', paddingTop: '12px', display: 'flex', alignItems: 'center' }}>
                    <span
                      className="blog-read-more"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '13.5px',
                        fontWeight: 600,
                        fontFamily: "'Manrope', sans-serif",
                        color: '#4a5568',
                      }}
                    >
                      Read More
                      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="blog-empty">
              <h3 className="blog-empty-title">No articles found</h3>
              <p>Try searching for different keywords like "Malad", "Paradise", "Opportunity", or "2 BHK".</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Blogs;
