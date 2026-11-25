
import { createBrowserRouter } from 'react-router-dom';

import { RootLayout } from '@/layouts/RootLayout';
import { HomePage } from '@/pages/HomePage';
import { ProjectsPage } from '@/pages/ProjectsPage';
import { ProjectDetailPage } from '@/pages/ProjectDetailPage';
import { AboutPage } from '@/pages/AboutPage';
import { TeamPage } from '@/pages/TeamPage';
import { ContactPage } from '@/pages/ContactPage';
import { Careers } from '@/pages/Careers';
import { FAQs } from '@/pages/FAQs';
import { PrivacyPolicyPage } from '@/pages/PrivacyPolicyPage';
import { TermsPage } from '@/pages/TermsPage';
import { Blogs } from '@/pages/blogs';
import { BlogDetailPage } from '@/pages/BlogDetailPage';
import { Thankyou } from '@/pages/Thankyou';
import { NotFoundPage } from '@/pages/NotFoundPage';

import { redirects } from './redirects';

import {
  aboutLoader,
  careersLoader,
  contactLoader,
  faqLoader,
  legalLoader,
  homeLoader,
  projectLoader,
  projectsLoader,
  redirectLoader,
  rootLoader,
  teamLoader,
} from './loaders';

const getBasename = () => {
  if (typeof window !== 'undefined' && window.location.pathname.startsWith('/vir-groupv10')) {
    return '/vir-groupv10';
  }
  return '/';
};

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <RootLayout />,
      loader: rootLoader,
      errorElement: <NotFoundPage />,
      children: [
        {
          errorElement: <NotFoundPage />,
          children: [
            {
              index: true,
              element: <HomePage />,
              loader: homeLoader,
            },
            {
              path: 'projects',
              element: <ProjectsPage />,
              loader: projectsLoader,
            },
            ...redirects.map((r) => ({
              path: r.source.replace(/^\//, ''),
              loader: redirectLoader(r.destination),
            })),
            {
              path: 'projects/:slug',
              element: <ProjectDetailPage />,
              loader: projectLoader,
            },
            {
              path: 'about',
              element: <AboutPage />,
              loader: aboutLoader,
            },
            {
              path: 'team',
              element: <TeamPage />,
              loader: teamLoader,
            },
            {
              path: 'contact',
              element: <ContactPage />,
              loader: contactLoader,
            },
            {
              path: 'careers',
              element: <Careers />,
              loader: careersLoader,
            },
            {
              path: 'faq',
              element: <FAQs />,
              loader: faqLoader,
            },
            {
              path: 'faqs',
              element: <FAQs />,
              loader: faqLoader,
            },
            {
              path: 'thank-you',
              element: <Thankyou />,
              loader: rootLoader,
            },
            {
              path: 'thankyou',
              element: <Thankyou />,
              loader: rootLoader,
            },
            {
              path: 'privacy-policy',
              element: <PrivacyPolicyPage />,
              loader: legalLoader,
            },
            {
              path: 'privacy',
              loader: redirectLoader('/privacy-policy'),
            },
            {
              path: 'terms-and-conditions',
              element: <TermsPage />,
              loader: legalLoader,
            },
            {
              path: 'terms',
              loader: redirectLoader('/terms-and-conditions'),
            },
            {
              path: 'blog',
              element: <Blogs />,
              loader: legalLoader,
            },
            {
              path: 'blog/:slug',
              element: <BlogDetailPage />,
              loader: legalLoader,
            },
            {
              path: 'blogs',
              element: <Blogs />,
              loader: legalLoader,
            },
            {
              path: 'blogs/:slug',
              element: <BlogDetailPage />,
              loader: legalLoader,
            },
            {
              path: 'vir-group',
              element: <HomePage />,
              loader: homeLoader,
            },
            {
              path: 'virgroup',
              element: <HomePage />,
              loader: homeLoader,
            },
            {
              path: 'vir-groupv3',
              element: <HomePage />,
              loader: homeLoader,
            },
            {
              path: 'vir-groupv10',
              element: <HomePage />,
              loader: homeLoader,
            },
            {
              path: 'vir-group/*',
              loader: redirectLoader('/'),
            },
            {
              path: 'vir-groupv3/*',
              loader: redirectLoader('/'),
            },
            {
              path: '*',
              element: <NotFoundPage />,
            },
          ],
        },
      ],
    },
  ],
  {
    basename: getBasename(),
  }
);
