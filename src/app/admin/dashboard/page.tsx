import React from 'react';
import { DashboardPage } from '~/lib/components/page-component/DashboardPage';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '~/lib/components/firebase/firebase';
import { cookies } from 'next/headers';

const getAllUsers = async (search: string) => {
  const q = search?.trim()
    ? query(
        collection(db, 'user-biodata'),
        where('data.firstName', '>=', search),
        where('data.firstName', '<=', search + '\uf8ff')
        // orderBy('data.firstName')
      )
    : query(collection(db, 'user-biodata'), orderBy('data.firstName'));
  //,where('data.processed', '==', true);

  const querySnapshot = await getDocs(q);
  const userData: unknown[] = [];
  querySnapshot.forEach((doc) => {
    userData.push(doc.data());
  });
  return userData;
};

const page = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const searchKeyWord = searchParams?.search;
  const cookieStore = cookies();
  const token = cookieStore.get('token');
  let data: unknown = {};
  if (token) {
    data = await getAllUsers(searchKeyWord as string);
  } else {
    data = { error: 'Please login again' };
  }
  return <DashboardPage data={data} />;
};

export default page;
