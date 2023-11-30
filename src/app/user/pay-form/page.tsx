import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { PaymentForm } from '~/lib/components/page-component/PaymentForm';

const page = () => {
  const cookieStore = cookies();
  const user = cookieStore.get('user-info');
  if (!user) {
    permanentRedirect('/login');
  }
  return <PaymentForm />;
};

export default page;
