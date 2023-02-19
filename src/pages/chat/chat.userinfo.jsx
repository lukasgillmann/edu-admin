import { Divider } from "@mui/material";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VAvatar, VText } from "../../form";

const ChatUserInfo = (props) => {

  const { t } = useTranslation('common');

  const { height, show, currUser } = props;

  return <div className="absolute bottom-0 color-bg-body w-[382px] rounded-tl-2xl border-0 border-l border-t border-solid border-gray-300 dark:border-gray-500 z-10 overflow-y-auto v-light-scrollbar transition-all" style={{ height: height, right: show ? 0 : '-382px' }}>
    <div className="p-7">
      <VText className="text-3xl">{t("User Info")}</VText>
      <div className="flex items-center mt-6">
        <VAvatar src={currUser.avatar || ""} className="w-16 h-16 rounded-full mr-6" />
        <div>
          <VText className="text-lg" div>{currUser.fullname}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-min" div>{t(currUser.permission || "USER")}</VText>
        </div>
      </div>
      <div className="mt-5">
        <VText className="text-lg">{t('Personal Data')}</VText>
        <div className="mt-5">
          <div className="flex items-center">
            <VText color="secondary" className="mr-4" div><Icon icon="fe:mail" className="text-xl" /></VText>
            <div>
              <VText className="text-sm" div>{t('Email')}</VText>
              <VText className="text-sm" color="secondary">{currUser.email || '-'}</VText>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <VText color="secondary" className="mr-4" div><Icon icon="ant-design:phone-outlined" className="text-xl" /></VText>
            <div>
              <VText className="text-sm" div>{t('Phone Number')}</VText>
              <VText className="text-sm" color="secondary">{currUser.phone_number || '-'}</VText>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <VText color="secondary" className="mr-4" div><Icon icon="la:id-card" className="text-xl" /></VText>
            <div>
              <VText className="text-sm" div>{t('Role')}</VText>
              <VText className="text-sm" color="secondary">{currUser.role || '-'}</VText>
            </div>
          </div>
          <div className="flex items-center mt-3">
            <VText color="secondary" className="mr-4" div><Icon icon="akar-icons:location" className="text-xl" /></VText>
            <div>
              <VText className="text-sm" div>{t('Address')}</VText>
              <VText className="text-sm" color="secondary">{currUser.location || '-'}</VText>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Divider className="bg-gray-200 dark:bg-gray-500" />
    <div className="px-7 py-5">
      <VText className="text-lg">{t('Shared')}</VText>
      <div className="mt-5">
        <div className="flex items-center">
          <VText color="secondary" className="mr-4" div><Icon icon="icon-park-outline:picture-one" className="text-xl" /></VText>
          <VText className="text-sm" div>21 {t('Photos')}</VText>
        </div>
        <div className="flex items-center mt-3">
          <VText color="secondary" className="mr-4" div><Icon icon="fluent:video-24-regular" className="text-xl" /></VText>
          <VText className="text-sm" div>8 {t("Videos")}</VText>
        </div>
        <div className="flex items-center mt-3">
          <VText color="secondary" className="mr-4" div><Icon icon="heroicons-outline:microphone" className="text-xl" /></VText>
          <VText className="text-sm" div>2 {t('Voice Messages')}</VText>
        </div>
        <div className="flex items-center mt-3">
          <VText color="secondary" className="mr-4" div><Icon icon="akar-icons:file" className="text-xl" /></VText>
          <VText className="text-sm" div>8 {t('Files')}</VText>
        </div>
        <div className="flex items-center mt-3">
          <VText color="secondary" className="mr-4" div><Icon icon="akar-icons:link-chain" className="text-xl" /></VText>
          <VText className="text-sm" div>2 {t('Shared Link')}</VText>
        </div>
      </div>
    </div>
  </div >;
};

export default ChatUserInfo;