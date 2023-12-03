import { cookies } from 'next/headers';
import React from 'react';
import { UserTransactions } from '~/lib/components/page-component/UserTransactions';

const getData = async (email: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/single-transaction?email=${email}`
  );
  if (res.status == 404 || !res.ok) {
    return { data: [] };
  } else {
    return res.json();
  }
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
