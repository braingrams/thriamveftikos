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
  if (!data || pageRef?.current == null) {
    return;
  }

  let url = '';
  setLoading({ id: load });
  await toPng(pageRef.current, { pixelRatio: 5 })
    .then(async function (dataUrl) {
      url = dataUrl;
      setDataUrl(dataUrl);
      !isMultiple && onOpen();
    })
    .catch((error: any) => {
      console.error('Error Generating Image:', error);
    });
  return url;
};
