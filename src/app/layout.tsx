import type { Metadata } from 'next';
import { Suspense } from 'react';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';
import '~/lib/styles/globals.css';
import Loading from './loading';

type RootLayoutProps = {
  children: React.ReactNode;
};

const APP_NAME = 'The Thriamveftikos biodata portal';

export const metadata: Metadata = {
  title: { default: APP_NAME, template: '%s ' },
  description: 'We are thriumphant',
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  applicationName: APP_NAME,
  appleWebApp: {
    capable: true,
    title: APP_NAME,
    statusBarStyle: 'default',
  },
  formatDetection: {
    telephone: false,
  },
  themeColor: '#FFFFFF',
  openGraph: {
    url: 'https://bamfolio.netlify.app',
    title: 'Thriamveftikos',
    description: 'We are thriumphant',
    images: {
      url: '',
      alt: 'bamfolio.netlify.app og-image',
    },
  },
  twitter: {
    creator: '@braintweets',
    card: 'summary_large_image',
  },
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <html lang="en">
      <link rel="icon" href="/assets/logo.png" sizes="32x20" />
      <body>
        <Suspense fallback={<Loading />}>
          <Providers>
            <Layout>{children}</Layout>
          </Providers>
        </Suspense>
      </body>
    </html>
  );
};

export default RootLayout;
