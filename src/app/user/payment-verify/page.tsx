import React from 'react';
import { VerifyPayment } from '~/lib/components/page-component/VerifyPayment';

const getData = async (ref: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/verify-payment`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      reference: ref,
    }),
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
};

const page = async ({ searchParams }: any) => {
  const { reference } = searchParams;
  const data = await getData(reference);

  return <VerifyPayment data={data} />;
};

export default page;
