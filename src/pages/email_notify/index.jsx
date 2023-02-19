import { Divider, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import EmailAdmin from "./email.admin";
import EmailLogs from "./email.logs";
import EmailUser from "./email.user";

const EmailNotify = () => {

  const { t } = useTranslation('common');

  const [tab, setTab] = useState(0);
  const handleSetTabValue = (_, newValue) => setTab(newValue);

  return <>
    <div className="h-8 my-4">
      <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue} className="h-9 px-8 v-tabs" sx={{ minHeight: 36 }}>
        <Tab label={t("Student")} className="min-h-0 text-dark dark:text-white normal-case" />
        <Tab label={t("Admin")} className="min-h-0 text-dark dark:text-white normal-case" />
        <Tab label={t("Notifications History")} className="min-h-0 text-dark dark:text-white normal-case" />
      </Tabs>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
    </div>

    {tab === 0 && <EmailUser />}
    {tab === 1 && <EmailAdmin />}
    {tab === 2 && <EmailLogs />}
  </>;
};

export default EmailNotify;