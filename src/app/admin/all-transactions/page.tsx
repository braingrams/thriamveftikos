import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { db } from '~/lib/components/firebase/firebase';
import { AllTransactions } from '~/lib/components/page-component/AllTransactions';

const getData = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/list-transactions`
  );
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};
const page = async () => {
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  if (!token) {
    permanentRedirect('/admin/login');
  }
  const data = await getData();
  return <AllTransactions data={data} />;
};

export default page;
