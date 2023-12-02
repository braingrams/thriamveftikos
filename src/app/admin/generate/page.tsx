import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import GenerateMech from '~/lib/components/page-component/GenerateMech';
import { UserDashboard } from '~/lib/components/page-component/UserDashboard';

const page = () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    permanentRedirect('/admin/login');
  }
  return <GenerateMech />;
};

export default page;
