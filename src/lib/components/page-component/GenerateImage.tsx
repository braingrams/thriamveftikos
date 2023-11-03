import { doc, updateDoc } from 'firebase/firestore';
import { IMainForm } from '../Utilis/Schemas';
import { toPng } from 'html-to-image';
import { db } from '../firebase/firebase';
const download = require('downloadjs');

export const generateImageProfile = async (
  data: IMainForm,
  pageRef: any,
  setLoading: any,
  router: any,
  width: any
) => {
  // console.log(pageRef, data);

  const opt = {
    quality: 0.95,
  };

  const isMobile = width <= 750;

  const userRef = doc(db, 'user-biodata', data.email as string);
  setLoading(true);

  await toPng(pageRef.current)
    .then(async function (dataUrl) {
      await updateDoc(userRef, {
        data: { ...data, processed: true },
      }).then(async () => {
        await download(dataUrl, `${data?.nickName}.png`);
        !isMobile && router.refresh();
        setLoading(false);
      });
    })
    .catch((error: any) => {
      console.error('Error Generating Image:', error);
    });
  return true;
};
