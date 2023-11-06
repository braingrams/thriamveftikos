import { IMainForm } from '../Utilis/Schemas';
import { toPng } from 'html-to-image';

export const generateImageProfile = async (
  data: IMainForm,
  pageRef: any,
  setLoading: any,
  onOpen: any,
  setDataUrl: any,
  load: any
) => {
  setDataUrl('');
  setLoading({ id: load });

  await toPng(pageRef.current)
    .then(async function (dataUrl) {
      setDataUrl(dataUrl);
      onOpen();
      setLoading({ id: '' });
    })
    .catch((error: any) => {
      console.error('Error Generating Image:', error);
    });
  return;
};
