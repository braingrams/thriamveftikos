import { IMainForm } from '../Utilis/Schemas';
import { toPng } from 'html-to-image';

export const generateImageProfile = async (
  data: IMainForm,
  pageRef: any,
  setLoading: any,
  onOpen: any,
  setDataUrl: any
) => {
  setDataUrl('');
  setLoading(true);

  await toPng(pageRef.current)
    .then(async function (dataUrl) {
      setDataUrl(dataUrl);
      onOpen();
      setLoading(false);
    })
    .catch((error: any) => {
      console.error('Error Generating Image:', error);
    });
  return;
};
