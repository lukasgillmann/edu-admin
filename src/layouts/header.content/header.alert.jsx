import { Divider, Icon, Tab } from "@mui/material";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { useTranslation } from 'react-i18next';

import VText from "../../form/VText";
import { useAsterController } from "../../context";
import { getShortDate, getShortTime } from "../../utils/string";

const HeaderAlert = () => {

  const { t } = useTranslation('common');

  const [controller] = useAsterController();
  const { notifications } = controller;

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => setValue(newValue);

  return <div className="my-2">
    <VText className="text-2xl mx-4 font-bold">{t('Notifications')}</VText>
    <div style={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <div className="border-0 border-b border-solid border-gray-400 dark:border-white" mt={2}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className="h-7 min-h-0">
            <Tab label={t("For You")} value="1" className="h-7 min-h-0 text-dark dark:text-white" />
            <Tab label={t("System Update")} value="2" className="h-7 min-h-0 text-dark dark:text-white" />
          </TabList>
        </div>
        <TabPanel value="1" className="w-80 p-4 v-light-scrollbar max-h-72 overflow-y-auto">
          {
            notifications.filter(item => item.permission === 'USER').map(item => <div key={`${item.time}${item.username}`}>
              <VText color="secondary" className="text-xs" div>
                <Icon className="text-xs">calendar_month</Icon>&nbsp;{getShortDate(item.time)} - {getShortTime(item.time)}
              </VText>
              <VText className="text-base">
                {item.type === 'course_complete' && <><b>{item.fullname || item.username}</b> {t("has completed")} <b>{item.course}</b></>}
                {item.type === 'module_complete' && <><b>{item.fullname || item.username}</b> {t("has completed a module of")} <b>{item.course}</b></>}
                {item.type === 'course_assigned' && <><b>{item.course}</b> {t("has been assingned to")} <b>{item.fullname || item.username}</b></>}
                {item.type === 'user_registered' && <><b>{item.fullname || item.username}</b> {t("has been registered in our platform")}</>}
                {item.type === 'password_changed' && <>{t("Password of")} <b>{item.fullname || item.username}</b> {t("has been changed")}</>}
                {item.type === 'physical_session_assign' && <>{t("A physical session has been assingned to")} <b>{item.fullname || item.username}</b></>}
              </VText>
              <Divider className="my-2 bg-gray-200 dark:bg-white" />
            </div>)
          }
        </TabPanel>
        <TabPanel value="2" className="w-80 p-4 v-light-scrollbar max-h-72 overflow-y-auto">
          {
            notifications.filter(item => item.permission === 'ADMIN').map(item => <div key={`${item.time}${item.username}`}>
              <VText color="secondary" className="text-xs" div>
                <Icon className="text-xs">calendar_month</Icon>&nbsp;{getShortDate(item.time)} - {getShortTime(item.time)}
              </VText>
              <VText className="text-base">
                {item.type === 'course_complete' && <><b>{item.fullname || item.username}</b> {t("has completed")} <b>{item.course}</b></>}
                {item.type === 'module_complete' && <><b>{item.fullname || item.username}</b> {t("has completed a module of")} <b>{item.course}</b></>}
                {item.type === 'course_assigned' && <><b>{item.course}</b> {t("has been assingned to")} <b>{item.fullname || item.username}</b></>}
                {item.type === 'user_registered' && <><b>{item.fullname || item.username}</b> {t("has been registered in our platform")}</>}
                {item.type === 'password_changed' && <>{t("Password of")} <b>{item.fullname || item.username}</b> {t("has been changed")}</>}
                {item.type === 'physical_session_assign' && <>{t("A physical session has been assingned to")} <b>{item.fullname || item.username}</b></>}
              </VText>
              <Divider className="my-2 bg-gray-200 dark:bg-white" />
            </div>)
          }
        </TabPanel>
      </TabContext>
    </div>
  </div>;
};

export default HeaderAlert;