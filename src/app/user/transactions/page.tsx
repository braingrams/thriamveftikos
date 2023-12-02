import { cookies } from 'next/headers';
import React from 'react';
import { UserTransactions } from '~/lib/components/page-component/UserTransactions';

const getData = async (email: string) => {
  const res = await fetch(
    `http://localhost:5001/single-transaction?email=${email}`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
const page = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get('user-info');
  let userInfo;
  if (user) {
    userInfo = JSON.parse(user.value);
  }
  const data = await getData(userInfo?.email);
  return <UserTransactions data={data} />;
};

export default page;
