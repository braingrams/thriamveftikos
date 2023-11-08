import { IMainForm } from '../Utilis/Schemas';
import { toPng } from 'html-to-image';

export const generateImageProfile = async (
  data: IMainForm,
  pageRef: any,
  setLoading: any,
  onOpen: any,
  setDataUrl: any,
  load: any,
  isMultiple: boolean
) => {
  setDataUrl('');
  if (!data || pageRef.current == null) {
    return;
  }
  setLoading({ id: load });

  let url;
  await toPng(pageRef.current, { pixelRatio: 5, cacheBust: true })
    .then(async function (dataUrl) {
      setDataUrl(dataUrl);
      url = dataUrl;
      !isMultiple && onOpen();
    })
    .catch((error: any) => {
      console.error('Error Generating Image:', error);
    });
  return url;
};
