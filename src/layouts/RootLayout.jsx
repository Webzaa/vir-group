
import { Outlet, useLoaderData, useLocation } from 'react-router-dom';

import { SmoothScroll } from '@/components/providers/SmoothScroll';
import { AppEffects } from '@/components/providers/AppEffects';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { PageTransition } from '@/components/layout/PageTransition';
import { Preloader } from '@/components/layout/Preloader';
import { ScrollToTop } from '@/components/layout/ScrollToTop';
import { mainNav } from '@/lib/content';

export function RootLayout() {
  const loaderData = useLoaderData();
  const { pathname } = useLocation();
  const cleanPath = (pathname || '').replace(/\/+$/, '');
  const isHomePage = cleanPath === '' || cleanPath === '/' || cleanPath === '/vir-group' || cleanPath === '/virgroup' || cleanPath === '/vir-groupv3' || cleanPath === '/vir-groupv7';

  const company = loaderData?.company ?? {
    phone: '',
    phoneDisplay: '',
    whatsapp: '',
  };

  return (
    <>
      <ScrollToTop />
      {isHomePage && <Preloader />}
      <a className="sr-only" href="#main">Skip to content</a>
      <SmoothScroll>
        <AppEffects />
        <SiteHeader nav={mainNav} phone={company.phone} phoneDisplay={company.phoneDisplay} whatsapp={company.whatsapp} />
        <main id="main" tabIndex={-1}>
          <PageTransition key={pathname}>
            <Outlet />
          </PageTransition>
        </main>
        <SiteFooter company={company} />
      </SmoothScroll>
    </>
  );
}
