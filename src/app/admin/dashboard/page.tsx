import React from 'react';
import { DashboardPage } from '~/lib/components/page-component/DashboardPage';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '~/lib/components/firebase/firebase';
import { cookies } from 'next/headers';

const getAllUsers = async () => {
  const q = query(collection(db, 'user-biodata'));
  //,where('data.processed', '==', true);

  console.log('Yesh');
  const querySnapshot = await getDocs(q);
  const userData: unknown[] = [];
  querySnapshot.forEach((doc) => {
    userData.push(doc.data());
  });
  return userData;
};

const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  console.log({ token });
  let data: unknown = {};
  if (token) {
    data = await getAllUsers();
  } else {
    data = { error: 'Please login again' };
  }
  return <DashboardPage data={data} />;
};

export default page;
