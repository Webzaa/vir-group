import React, { useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePageMeta } from '@/lib/seo/usePageMeta';
import { getMediaUrl } from '@/lib/media';
import { blogs } from '@/data/blogs';

export function BlogDetailPage() {
  const { slug } = useParams();

  const post = useMemo(() => {
    return blogs.find((b) => b.slug === slug);
  }, [slug]);

  const relatedBlogs = useMemo(() => {
    return blogs.filter((b) => b.slug !== slug).slice(0, 3);
  }, [slug]);

  usePageMeta({
    title: post ? `${post.title} | VIR Group Blog` : 'Article Not Found | VIR Group',
    description: post ? post.excerpt : 'Insights and real estate news from VIR Group Mumbai.',
    path: post ? `/blog/${post.slug}` : '/blog',
    image: post ? post.image : undefined,
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    window.__lenis?.scrollTo(0, { immediate: true });
  }, [slug]);

  if (!post) {
    return (
      <div className="blog-detail-not-found" data-theme="basalt">
        <div className="blog-detail-not-found-inner">
          <h2>Article Not Found</h2>
          <p>The article you are looking for does not exist or may have been moved.</p>
          <Link to="/blog" className="blog-detail-back-btn">
            ← Back to All Articles
          </Link>
        </div>
      </div>
    );
  }

  // Format the text content into paragraphs, subheadings, and bullet items
  const renderFormattedContent = (content) => {
    if (!content) return null;
    const lines = content.split('\n').map((l) => l.trim()).filter(Boolean);

    return lines.map((line, idx) => {
      // Bullet items
      if (line.startsWith('-')) {
        return (
          <div key={idx} className="blog-detail-bullet">
            <span className="blog-detail-bullet-dot" aria-hidden="true">•</span>
            <span>{line.replace(/^-\s*/, '')}</span>
          </div>
        );
      }

      // Subheadings (end with ':' or numbered steps or FAQs)
      const isSubheading =
        line.endsWith(':') ||
        line.startsWith('1.') ||
        line.startsWith('2.') ||
        line.startsWith('3.') ||
        line.startsWith('4.') ||
        line.includes('FAQs');

      if (isSubheading) {
        return (
          <h3 key={idx} className="blog-detail-subheading">
            {line}
          </h3>
        );
      }

      // Regular paragraph
      return (
        <p key={idx} className="blog-detail-para">
          {line}
        </p>
      );
    });
  };

  return (
    <article className="blog-detail-page" data-theme="basalt">
      {/* ── Top Header & Breadcrumb ── */}
      <header className="blog-detail-header">
        <div className="blog-detail-header-inner">
          <div className="blog-detail-meta">
            {post.category && (
              <span className="blog-detail-category-badge">{post.category}</span>
            )}
            <span className="blog-detail-date">{post.date}</span>
            {post.views && (
              <>
                <span className="blog-detail-meta-dot" aria-hidden="true">·</span>
                <span className="blog-detail-views">{post.views}</span>
              </>
            )}
          </div>

          <h1 className="blog-detail-title">{post.title}</h1>

          {post.excerpt && (
            <p className="blog-detail-lead">{post.excerpt}</p>
          )}

          <nav className="blog-detail-breadcrumb" aria-label="Breadcrumb" style={{ marginTop: '24px', marginBottom: 0 }}>
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="breadcrumb-sep">/</span>
            <Link to="/blog" className="breadcrumb-link">Blog</Link>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-current">{post.title}</span>
          </nav>
        </div>
      </header>

      {/* ── Featured Image ── */}
      <div className="blog-detail-media-container">
        <div className="blog-detail-media-inner">
          <img
            src={getMediaUrl(post.image)}
            alt={post.title}
            className="blog-detail-hero-image"
          />
        </div>
      </div>

      {/* ── Main Article Body ── */}
      <section className="blog-detail-content-wrap">
        <div className="blog-detail-content-inner">
          <div className="blog-detail-body">
            {renderFormattedContent(post.content || post.excerpt)}
          </div>

          {/* Author & Brand Identity Box */}
          <div className="blog-detail-author-box">
            <div className="blog-detail-author-info">
              <span className="blog-detail-author-tag">PUBLISHED BY</span>
              <h4 className="blog-detail-author-title">VIR Group</h4>
              <p className="blog-detail-author-desc">
                Building dreams into reality with over 13+ years of architectural excellence, transparent dealings, and timely possession across Mumbai's prime locations.
              </p>
            </div>
          </div>

          {/* Call to Action Box */}
          <div className="blog-detail-cta-card">
            <div className="blog-detail-cta-content">
              <h3>Looking for your dream home in Mumbai?</h3>
              <p>
                Explore our ongoing and upcoming residential projects designed for modern luxury and supreme comfort.
              </p>
            </div>
            <div className="blog-detail-cta-buttons">
              <Link to="/projects" className="blog-detail-cta-btn-primary">
                Explore Projects
              </Link>
              <Link to="/contact" className="blog-detail-cta-btn-secondary">
                Schedule Site Visit
              </Link>
              <a
                href="https://wa.me/919326287741"
                target="_blank"
                rel="noopener noreferrer"
                className="blog-detail-cta-btn-whatsapp"
              >
                WhatsApp Enquiry
              </a>
            </div>
          </div>

          {/* Back to Blog Button */}
          <div className="blog-detail-back-wrap">
            <Link to="/blog" className="blog-detail-back-link">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Back to all articles
            </Link>
          </div>
        </div>
      </section>

      {/* ── Related Articles ── */}
      {relatedBlogs.length > 0 && (
        <section className="blog-detail-related-section" aria-label="Related articles">
          <div className="blog-detail-related-inner">
            <h2 className="blog-detail-related-title">More from Our Blog</h2>
            <div className="blog-grid">
              {relatedBlogs.map((item) => (
                <Link
                  key={item.id}
                  to={`/blog/${item.slug}`}
                  className="blog-card"
                >
                  <div className="blog-card-media">
                    <img
                      src={getMediaUrl(item.image)}
                      alt={item.title}
                      className="blog-card-img"
                      loading="lazy"
                    />
                  </div>
                  <div className="blog-card-body" style={{ padding: '22px 24px 24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <div className="blog-card-meta">
                      <span>{item.date}</span>
                      {item.views && (
                        <>
                          <span className="blog-card-meta-dot">·</span>
                          <span>{item.views}</span>
                        </>
                      )}
                    </div>
                    <h3 className="blog-card-title">{item.title}</h3>
                    <p className="blog-card-excerpt">{item.excerpt}</p>
                    <div className="blog-card-footer">
                      <span className="blog-read-more">
                        Read Article
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <line x1="5" y1="12" x2="19" y2="12" />
                          <polyline points="12 5 19 12 12 19" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}

export default BlogDetailPage;
