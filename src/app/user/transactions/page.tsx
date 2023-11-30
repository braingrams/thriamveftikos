import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { cookies } from 'next/headers';
import React from 'react';
import { db } from '~/lib/components/firebase/firebase';
import { UserTransactions } from '~/lib/components/page-component/UserTransactions';

const getData = async (email: string) => {
  //   const q = query(
  //     collection(db, 'user-transactions'),
  //     where('data.email', '==', email)
  //   );
  const docRef = doc(collection(db, 'user-transactions'), email);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().transaction;
  }
};
const page = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get('user-info');
  console.log({ user });
  let userInfo;
  if (user) {
    userInfo = JSON.parse(user.value);
  }
  const data = await getData(userInfo?.email);
  console.log({ data });
  return <UserTransactions data={data} />;
};

export default page;
