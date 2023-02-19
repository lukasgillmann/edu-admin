import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import VButton from "../../form/VButton";
import VText from "../../form/VText";
import ChatContent from "./chat.content";
import ChatUsers from "./chat.users";
import ChatNew from "./chat.new";
import { useAsterController } from "../../context";
import { actionChatActiveUserList, actionChatArchievedUserList, actionChatMarkAllRead } from "../../context/action";

const Chat = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { loadedAdminDashboardGet } = controller;

  const [contentHeight, setContentHeight] = useState(500);
  const [currUserId, setCurrUserId] = useState({});

  useEffect(() => {
    const headerHeight = document.getElementById('v-header')?.offsetHeight || 0;
    const titleHeight = document.getElementById('v-chat-title')?.offsetHeight || 0;
    const totalHeight = document.body.offsetHeight;
    setContentHeight(totalHeight - titleHeight - headerHeight - 32 - 90);
  }, []);

  useEffect(() => {
    if (loadedAdminDashboardGet) {
      actionChatActiveUserList(dispatch, { page: 0, page_size: 10 });
      actionChatArchievedUserList(dispatch, { page: 0, page_size: 10 });
    }
  }, [loadedAdminDashboardGet, dispatch]);

  const onMarkAllRead = () => actionChatMarkAllRead(dispatch);

  return <div className="flex flex-col h-full">
    <div className="px-6 py-8" id="v-chat-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText color="secondary" className="text-2xl">{t('Messages in total')}</VText>
        </Grid>
        <Grid item sm={12} md={8} className="flex justify-center md:justify-end flex-wrap items-center">
          <VButton variant="text" color="secondary" className="text-sm normal-case" onClick={onMarkAllRead}><Icon icon="akar-icons:circle-check" />&nbsp;{t("Mark All as Read")}</VButton>
          <ChatNew />
        </Grid>
      </Grid>
    </div>

    <div className="flex-1 flex flex-col md:flex-row h-auto md:h-full">
      <ChatUsers height={contentHeight} currUserId={currUserId} setCurrUserId={setCurrUserId} />
      <ChatContent height={contentHeight} currUserId={currUserId} />
    </div>
  </div>;
};

export default Chat;