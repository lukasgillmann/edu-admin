import { uploadFile, deleteFile } from 'react-s3';
import toaster from './toast.msg';

export const uploadToS3 = (inputFile, directory, newFileName, oldFileName, t, isDelete = true) =>
  new Promise((resolve, reject) => {
    console.log(`[s3 upload inputs] Directory: ${directory}, Filename: ${newFileName}, Delete: ${oldFileName}, ${isDelete}`);

    if (inputFile && inputFile.size > 8112 * 8112) {
      toaster({ type: "error", title: t("File size is too big"), body: t("File size should be less than 500KB")})
      reject("Filesize is too big");
    }

    const s3Config = {
      bucketName: process.env.REACT_APP_S3_BUCKET_NAME,
      dirName: `${process.env.REACT_APP_SITE_NAME}/${directory}`,
      region: process.env.REACT_APP_S3_REGION,
      accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
      secretAccessKey: process.env.REACT_APP_S3_SECRET_KEY
    };

    if (oldFileName && isDelete) {
      deleteFile(oldFileName, s3Config)
        .then(res => console.log('[delete res]', res))
        .catch(err => console.log('[delete err]', err));
    }

    // Rename file
    const formData = new FormData();
    formData.append('file', inputFile, newFileName);
    const sendFile = formData.get('file');

    // Upload File
    uploadFile(sendFile, s3Config)
      .then(data => resolve(data.location))
      .catch(err => reject(err));
  });
