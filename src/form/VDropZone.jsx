import { IconButton, Icon, CircularProgress } from "@mui/material";
import React, { useCallback, useRef, useState } from "react";
import { useMemo } from "react";
import Buffer from 'buffer';
import { useDropzone } from "react-dropzone";

import { uploadToS3 } from "../utils/aws_s3";
import VButton from "./VButton";
import { VImage } from ".";
import { useTranslation } from "react-i18next";

if (typeof window.Buffer === 'undefined') {
  window.Buffer = Buffer.Buffer;
}

const VDropZone = (props) => {

  const { t } = useTranslation('common');

  const {
    className,
    imgClassName = "h-full",
    url,
    setUrl,
    setFile,
    directory,
    filename,
    children,
    accept,
    showPreview,
    showButtons,
    hideClose,
    isUpload,
    disabled,
    isDelete = true,
    ...rest
  } = props;

  const [loading, setLoading] = useState(false);
  const [tmpUrl, setTmpUrl] = useState('');

  const hiddenFileInput = useRef(null);

  const onRemoveClick = (e) => {
    e.stopPropagation();
    setUrl('');

    // Delete S3 bucket
  };

  const processFile = useCallback((file) => {
    setFile(file);

    if (isUpload) {
      setLoading(true);

      const newFileName = filename || file.name;
      const oldFileName = url ? url.split('/').pop() : "";

      setTmpUrl(URL.createObjectURL(file));

      // S3 upload
      uploadToS3(file, directory, newFileName, oldFileName, t, isDelete)
        .then(url => setUrl(url))
        .catch(err => { setUrl(null); console.log('[s3 upload error]', err); })
        .finally(() => {
          setTmpUrl('');
          setTimeout(() => setLoading(false), 500);
        });
    }
  }, [setUrl, directory, filename, isUpload, setFile, url, isDelete, t]);

  // Dropzone functions
  const onDrop = useCallback((acceptedFiles) => {

    if (!acceptedFiles.length) return;
    const inputFile = acceptedFiles[0];
    processFile(inputFile);
  }, [processFile]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxFiles: 1
  });

  const style = useMemo(() => ({
    ...(isFocused ? { borderColor: '#2196F3' } : {}),
    ...(isDragAccept ? { borderColor: '#00e676' } : {}),
    ...(isDragReject ? { borderColor: '#FF1744' } : {})
  }), [isFocused, isDragAccept, isDragReject]);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleFileChange = e => {
    processFile(e.target.files[0]);
  };


  return <>
    <div {...(disabled ? {} : getRootProps({ style }))} className={`${className} border-2 border-gray-400 border-dashed flex justify-center items-center cursor-pointer overflow-hidden relative v-dropzone`} {...rest} style={{ borderRadius: '12px' }}>
      {url && showPreview &&
        <>
          <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
            <VImage src={tmpUrl || url} alt="" className={imgClassName} />
          </div>
          {
            !hideClose && <IconButton className="absolute top-0 right-0" onClick={onRemoveClick}>
              <Icon>cancel</Icon>
            </IconButton>
          }

        </>
      }
      {
        loading &&
        <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center bg-blue-100 bg-opacity-90">
          <CircularProgress color="info" size={80} />
        </div>
      }
      <input {...getInputProps()} accept={accept} />
      {url ? <></> : children}
    </div>
    {
      showButtons && <>
        <div>
          <VButton variant="contained" color="primary" className="h-min text-sm m-2 normal-case" onClick={handleClick} disabled={disabled}>{t("Change Picture")}</VButton>
          <input ref={hiddenFileInput} type="file" onChange={handleFileChange} className="hidden" />
        </div>
        <VButton variant="outlined" color="secondary" className="h-min text-sm m-2 normal-case" onClick={onRemoveClick} disabled={disabled}>{t("Remove")}</VButton>
      </>
    }
  </>;
};

VDropZone.defaultProps = {
  className: '',
  url: '',
  setUrl: () => { },
  setFile: () => { },
  directory: '',
  filename: '',
  accept: 'image/*', // 'image/png'
  showPreview: true,
  hideClose: false,
  showButtons: false,
  isUpload: true,
  disabled: false,
};

export default VDropZone;