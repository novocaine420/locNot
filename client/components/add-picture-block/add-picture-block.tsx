import React from 'react';
import { DropzoneArea } from 'material-ui-dropzone';

import styles from './styles.module.scss';

type AddPictureBlockProps = {
  onDropPicture: (img: string) => void;
};

const AddPictureBlock = ({ onDropPicture }: AddPictureBlockProps) => {
  const toBase64 = (file: File) =>
    new Promise<string | ArrayBuffer | null>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const onDrop = async (data: File[]) => {
    const img = data[0];
    try {
      const base64 = await toBase64(img);
      if (typeof base64 === 'string') onDropPicture(base64);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={styles.addPictureBlock}>
      <DropzoneArea
        onDrop={onDrop}
        showPreviews
        showPreviewsInDropzone={false}
        previewGridProps={{ container: { spacing: 1, direction: 'row' } }}
        previewChipProps={{ classes: { root: styles.previewChip } }}
        previewText="Selected files"
      />
    </div>
  );
};

export default AddPictureBlock;
