import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { UserDashboard } from '~/lib/components/page-component/UserDashboard';

const page = () => {
  const cookieStore = cookies();
  const user = cookieStore.get('user-info');
  if (!user) {
    permanentRedirect('/login');
  }
  return <UserDashboard />;
};

export default page;
