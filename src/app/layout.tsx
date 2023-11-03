import type { Metadata } from 'next';

import Providers from '~/app/providers';
import Layout from '~/lib/layout';
import '~/lib/styles/globals.css';

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
      <body>
        <Providers>
          <Layout>{children}</Layout>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
