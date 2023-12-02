import { doc, getDoc } from 'firebase/firestore';
import { cookies } from 'next/headers';
import { permanentRedirect } from 'next/navigation';
import React from 'react';
import { db } from '~/lib/components/firebase/firebase';
import { PaymentForm } from '~/lib/components/page-component/PaymentForm';

const getData = async (email: string) => {
  try {
    const docRef = doc(db, 'user-biodata', email as string);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data().data;
    } else {
      return {};
    }
  } catch (err: any) {
    console.log({ err });
  }
};

const page = async () => {
  const cookieStore = cookies();
  const user = cookieStore.get('user-info');
  if (!user) {
    permanentRedirect('/login');
  }
  const data = await getData(JSON.parse(user?.value).email);
  return <PaymentForm data={data} />;
};

export default page;
