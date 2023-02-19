
import { Icon } from '@iconify/react';
import { useConfirm } from "material-ui-confirm";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { VButton, VDropZone, VImage, VText } from "../../form";
import { downloadCSV, readCSV } from "../../utils/csv";
import { actionRegisterBulkUsers } from "../../context/action";
import { useAsterController } from "../../context";

const sample = [
  {
    username: 'user-id1',
    email: 'user1@gmail.com',
    first_name: 'John',
    last_name: 'Smith',
    gender: 'm',
    phone_number: '+123456789'
  },
  {
    username: 'user-id2',
    email: 'user2@gmail.com',
    first_name: 'Alina',
    last_name: 'Jaya',
    gender: 'f',
    phone_number: '+234567890'
  },
]

const UserBulkRegister = () => {

  const { t } = useTranslation('common');
  const confirm = useConfirm();
  const navigate = useNavigate();

  const [controller, dispatch] = useAsterController();
  const { loadedBulkUserRegister } = controller;

  const [file, setFile] = useState(null);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => loadedBulkUserRegister && waiting && navigate('/user/learners'), [loadedBulkUserRegister, waiting, navigate]);

  const columns = [
    { header: 'Username', accessor: "username", type: "text" },
    { header: "Email", accessor: "email", type: "text" },
    { header: 'First Name', accessor: "first_name", type: "text" },
    { header: 'Last Name', accessor: "last_name", type: "text" },
    { header: 'Gender', accessor: "gender", type: "text" },
    { header: 'Phone Number', accessor: "phone_number", type: "text" },
  ];

  const onBulkRegister = () => {
    readCSV(file, columns)
      .then(res => {
        // Remove duplicated email or username
        res = res.filter((arr, index, self) => index === self.findIndex(t => (t.email === arr.email) || t.username === arr.username));

        confirm({
          title: t("Are you sure?"),
          confirmationText: t("OK"),
          cancellationText: t("Cancel"),
          description: `${t('Are you going to register')} ${res.length} ${t('users')}? ${t('User input data with same email or username are removed!')}`
        })
          .then(() => {
            actionRegisterBulkUsers(dispatch, res, t);
            setWaiting(true);
          })
          .catch(() => { });
      })
      .catch(err => console.log('[file err]', err));
  };

  return <div className="p-10 flex flex-col items-center h-full overflow-y-auto v-light-scrollbar">
    <VText className="text-4xl pt-4" div>{t('Upload New File')}</VText>
    <VText color="secondary" className="mt-4">{t('Add learners in bulk by uploading a file that includes the columns shown in the example file (Example file')} <VButton onClick={() => downloadCSV(columns, sample, t("Users"))}>{t("Users") + '.csv'}</VButton>)</VText>

    <VDropZone className="h-3/5 mt-4 w-full bg-gray-200 dark:bg-gray-700 p-10" style={{ minHeight: 350 }}
      isUpload={false} setFile={setFile} accept="text/csv"
    >
      <div className="flex flex-col justify-center items-center w-full">
        <div className="w-24 h-24 bg-gray-400 rounded-full flex justify-center items-center">
          <Icon className="text-5xl text-white dark:text-black" icon="gg:software-upload" />
        </div>
        <VText className="text-2xl mt-3" color="secondary">{t('Drag and drop your file here or you can')}</VText>
        <VButton variant="outlined" color="secondary" className="mt-2 color-bg-body">{t('Browse File')}</VButton>
        {file && <VText color="primary" className="text-xs mt-3">{file.name}</VText>}
        <VText color="secondary" className="text-xs mt-5">{t('You can upload CSV, XLS, XLSX, JSON')}</VText>
        <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/docs.png`} className="ml-auto w-20 h-auto" />
      </div>
    </VDropZone>
    <VButton variant="contained" className="normal-case md:ml-auto mt-6" loading={!loadedBulkUserRegister} onClick={onBulkRegister} disabled={!file}>
      <Icon className="text-lg text-white dark:text-black" icon="gg:software-upload" />&nbsp;{t('Upload Users')}
    </VButton>
  </div>;
};

export default UserBulkRegister;