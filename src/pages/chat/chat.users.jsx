import { Collapse, Divider, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useTranslation } from 'react-i18next';
import PusherClient from "pusher-js";
import Skeleton from 'react-loading-skeleton';

import { useAsterController } from "../../context";
import { actionChatActiveUserList, actionChatAdd, actionChatArchievedUserList, actionChatMarkRead, actionChatUserEnabledEdit } from "../../context/action";
import { VButton } from "../../form";

import VAvatar from "../../form/VAvatar";
import VInput from "../../form/VInput";
import VText from "../../form/VText";
import { BPopOver } from "../../components";
import { Icon } from "@iconify/react";

const pusherClient = new PusherClient(process.env.REACT_APP_PUSHER_KEY, { cluster: process.env.REACT_APP_PUSHER_CLUSTER });
const channel = pusherClient.subscribe('message');

const ChatUsers = (props) => {

  const { height, currUserId, setCurrUserId } = props;

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { chatActiveUsers, chatArchievedUsers, loadedAdminDashboardGet, loadedChatActiveUserList, loadedChatArchievedUserList } = controller;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeOpen, setActiveOpen] = useState(true);
  const [archiveOpen, setArchiveOpen] = useState(true);

  useEffect(() => {
    if (loadedAdminDashboardGet && chatActiveUsers.data.length) {
      // Connect to pusher server for active users

      channel.unbind_all();
      for (let { user_id } of chatActiveUsers.data) {
        channel.bind(`${process.env.REACT_APP_SITE_NAME}_${user_id}`, async res => {
          if (res && typeof res === 'object') {
            const { text, urls, to_admin, created, updated } = res;

            // If the message is from student, we add that
            to_admin && actionChatAdd(dispatch, { user_id, text, urls, to_admin, created, updated, is_new: true });
          }
        });
      }
    }
  }, [chatActiveUsers.data.length, loadedAdminDashboardGet, chatActiveUsers.data, dispatch]);

  const onLoadActiveMore = () => actionChatActiveUserList(dispatch, { page: chatActiveUsers.page + 1, page_size: chatActiveUsers.page_size });
  const onLoadArchievedMore = () => actionChatArchievedUserList(dispatch, { page: chatActiveUsers.page + 1, page_size: chatActiveUsers.page_size });
  const onChangeStatus = (user, enabled) => actionChatUserEnabledEdit(dispatch, { user, enabled }, t);

  const getNewMsgCount = (messages) => {
    if (!messages) return null;
    return messages.filter(v => v.is_new).length;
  };

  const onUserChange = (user) => {
    setCurrUserId(user.user_id);
    getNewMsgCount(user.messages) && actionChatMarkRead(dispatch, user.user_id);
  };

  return <div className="w-full md:w-min md:h-full border-0 border-r border-t border-solid border-gray-300 dark:border-gray-500" style={{ width: 348, minWidth: 348 }}>
    <div className="p-6">
      <VInput
        startIcon="search"
        placeholder={t("Search messages")}
        size="small"
        className="v-input-noborder w-full"
        inputClassName="text-dark dark:text-white"
        noBorder
        value={searchTerm}
        setValue={setSearchTerm}
      />
    </div>
    <Divider className="bg-gray-200 dark:bg-gray-500" />
    <div>
      <List className="w-full max-w-full h-min overflow-auto v-light-scrollbar pt-0" sx={{ maxWidth: 360, height: height, maxHeight: height, }} component="nav" >
        <ListItemButton onClick={() => setActiveOpen(!activeOpen)}>
          <ListItemText className="text-gray-400 dark:text-gray-200" >
            <div className="flex">
              <VText>{t('Active Conversations')}</VText>
              <VText className="px-1 h-4 bg-primary rounded-full flex justify-center items-center text-xs text-white ml-1" div style={{ minWidth: '16px' }}>{chatActiveUsers.total || 0}</VText>
            </div>
          </ListItemText>
          {activeOpen ? <Icon icon="ep:arrow-up-bold" className='text-dark dark:text-white' /> : <Icon icon="ep:arrow-down-bold" className='text-dark dark:text-white' />}
        </ListItemButton>
        <Collapse in={activeOpen} timeout="auto" unmountOnExit>
          {
            loadedAdminDashboardGet ? chatActiveUsers.data.filter(v => (v.fullname || '').toLowerCase().includes(searchTerm.toLowerCase())).map(v =>
              <List component="div" disablePadding key={v.user_id} className={v.user_id === currUserId ? 'bg-gray-50 dark:bg-gray-700 border-0 border-l-4 border-solid border-yellow-400' : ''}>
                <ListItemButton onClick={() => onUserChange(v)}>
                  <ListItemIcon>
                    <VAvatar size='sm' bgColor="light" src={v.avatar} />
                    {
                      getNewMsgCount(v.messages) ? <VText className="px-1 h-4 bg-primary rounded-full flex justify-center items-center text-xs text-white -ml-2 z-10" div style={{ minWidth: '16px' }}>{getNewMsgCount(v.messages)}</VText> : <></>
                    }
                  </ListItemIcon>
                  <div className="flex justify-center flex-col">
                    <div className="flex items-center">
                      <VText className="text-lg font-bold text-limit-1">{v.fullname || v.username}</VText>&nbsp;&nbsp;
                      <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t(v.permission)}</VText>
                    </div>
                    <VText color="secondary" className="text-sm text-limit-1" div>
                      {v.messages.length ? <div dangerouslySetInnerHTML={{ __html: v.messages[0].text }} /> : "(Empty)"}
                    </VText>
                  </div>
                  <BPopOver className="ml-auto" trigger={<VButton iconOnly variant="contained" color="secondary"><Icon icon="eva:more-horizontal-outline" className="flex-shrink-0" /></VButton>}>
                    <div className="flex flex-col">
                      <VButton variant="text" color="primary" className="px-5 py-1 justify-start w-full" onClick={() => onChangeStatus(v, false)}>
                        <Icon icon="bx:hide" />&nbsp;{t('Archieve')}
                      </VButton>
                    </div>
                  </BPopOver>
                </ListItemButton>
              </List>
            ) :
              <Skeleton className="h-12 mt-1" count={3} />
          }
          <VButton variant="text" color="secondary" onClick={onLoadActiveMore} loading={!loadedChatActiveUserList} className="w-full">{t("Load more")}</VButton>
        </Collapse>

        <ListItemButton onClick={() => setArchiveOpen(!archiveOpen)}>
          <ListItemText primary={t("Archieved Conversation")} className="text-gray-400 dark:text-gray-200" />
          {archiveOpen ? <Icon icon="ep:arrow-up-bold" className='text-dark dark:text-white' /> : <Icon icon="ep:arrow-down-bold" className='text-dark dark:text-white' />}
        </ListItemButton>
        <Collapse in={archiveOpen} timeout="auto" unmountOnExit>
          {
            loadedAdminDashboardGet ? chatArchievedUsers.data.filter(v => v.fullname?.toLowerCase().includes(searchTerm.toLowerCase())).map(v =>
              <List component="div" disablePadding key={v.user_id} className={v.user_id === currUserId ? 'bg-gray-50 dark:bg-gray-700 border-0 border-l-4 border-solid border-yellow-400' : ''}>
                <ListItemButton onClick={() => onUserChange(v)}>
                  <ListItemIcon>
                    <VAvatar size='sm' bgColor="light" src={v.avatar} />
                  </ListItemIcon>
                  <div className="flex justify-center flex-col">
                    <div className="flex items-center">
                      <VText className="text-lg font-bold text-limit-1">{v.fullname || v.username}</VText>&nbsp;&nbsp;
                      <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">{t(v.permission)}</VText>
                    </div>
                    <VText color="secondary" className="text-sm text-limit-1">Hello, this is message to be shown in this field</VText>
                  </div>
                  <BPopOver trigger={<VButton iconOnly variant="outlined" color="secondary" className="flex-shrink-0"><Icon icon="eva:more-horizontal-outline" /></VButton>}>
                    <div className="flex flex-col">
                      <VButton variant="text" color="primary" className="px-5 py-1 justify-start w-full" onClick={() => onChangeStatus(v, true)}>
                        <Icon icon="bx:show" />&nbsp;{t('Active')}
                      </VButton>
                    </div>
                  </BPopOver>
                </ListItemButton>
              </List>
            ) : <Skeleton className="h-12 mt-1" count={3} />
          }
          <VButton variant="text" color="secondary" onClick={onLoadArchievedMore} loading={!loadedChatArchievedUserList} className="w-full">{t("Load more")}</VButton>
        </Collapse>
      </List>
    </div>
  </div>;
};

export default ChatUsers;