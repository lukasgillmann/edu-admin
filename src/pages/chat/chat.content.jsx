import { Divider } from "@mui/material";
import { useMemo, useState } from "react";
import { Icon } from '@iconify/react';

import VButton from "../../form/VButton";
import VText from "../../form/VText";
import VAvatar from "../../form/VAvatar";
import VFroala from "../../form/VFroala";
import ChatUserInfo from "./chat.userinfo";
import { actionChatAdd, actionChatList } from "../../context/action";
import { useAsterController } from "../../context";
import { getDateObj, getShortTime } from "../../utils/string";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const ChatContent = (props) => {

  const { height, currUserId } = props;

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { chatActiveUsers, loadedChatList } = controller;

  const [show, setShow] = useState(false);
  const [model, setModel] = useState('');
  const [messages, setMessages] = useState([]);

  const currUser = useMemo(() => currUserId && chatActiveUsers.data.length ? chatActiveUsers.data.find(v => v.user_id === currUserId) || {} : {}, [currUserId, chatActiveUsers.data]);

  const scrollUp = () => setTimeout(() => document.getElementById('v-chat-content').scroll({ top: 0, behavior: 'smooth' }), 200);

  useEffect(() => {
    if (currUser && currUser.messages && currUser.messages.length) {
      let messages = [...currUser.messages];
      for (let i = 1; i < messages.length; i++) {
        messages[i - 1].show_date = messages[i].to_admin === messages[i - 1].to_admin ? false : true;
        const currMins = getDateObj(messages[i - 1].created).getTime() / (1000 * 60);
        const prevMins = getDateObj(messages[i].created).getTime() / (1000 * 60);
        messages[i - 1].show_date = !messages[i - 1].show_date && (currMins - prevMins) > 10 ? true : messages[i - 1].show_date;
      }
      messages[messages.length - 1].show_date = true;

      setMessages(messages);
      if (messages.find(v => v.is_new)) scrollUp();
    } else {
      setMessages([]);
    }
  }, [currUser, currUser.messages?.length]);

  const onSubmit = (value) => {
    const currTime = new Date().toISOString();
    actionChatAdd(dispatch, { user_id: currUser.user_id, text: value, to_admin: false, created: currTime, updated: currTime });
    scrollUp();
  };
  const onLoadMore = () => currUser.message_more && actionChatList(dispatch, { user_id: currUser.user_id, page: currUser.page + 1, page_size: 20 });

  return <div className="relative w-full border-0 border-t border-solid border-gray-300 dark:border-gray-500 overflow-x-hidden">

    <ChatUserInfo height={height} show={show} currUser={currUser} />

    <div className="p-6 flex items-center h-[88px]">
      <VText color="secondary" className="text-2xl">@</VText>&nbsp;&nbsp;
      <VText className="text-2xl text-limit-2">{currUser.fullname}</VText>
      <div className="ml-auto flex-shrink-0">
        <VButton
          startIcon="search"
          iconButton
          variant="outlined"
          color="secondary"
          className="border-transparent hover:border-transparent"
        >
          <Icon icon="fa:search" className="text-lg" />
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color={show ? 'primary' : 'secondary'}
          className="border-transparent hover:border-transparent"
          onClick={() => setShow(!show)}
        >
          <Icon icon="octicon:sidebar-expand-16" className="text-lg" />
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color="secondary"
          className="border-transparent hover:border-transparent"
        >
          <Icon icon="akar-icons:more-horizontal" className="text-lg" />
        </VButton>
      </div>
    </div>

    <Divider className="bg-gray-200 dark:bg-gray-500" />

    <div className="flex flex-col" style={{ height: height }}>
      <div className="flex-1 w-full overflow-y-auto v-light-scrollbar px-3 pb-3 flex flex-col-reverse" style={{ maxHeight: height - 130 }} id="v-chat-content">
        {
          messages.map(msg =>
            msg.to_admin ?
              <div key={msg.created} className={`flex w-3/4 ${msg.show_date ? 'mt-3' : 'mt-1'}`}>
                <VAvatar src={currUser.avatar} bgColor="light" className={`w-10 h-10 ${msg.show_date ? 'visible' : 'invisible'}`} />
                <div className="ml-3">
                  <VText color="secondary" className={`text-sm ${msg.show_date ? '' : 'hidden'}`}>{currUser.fullname}, {getShortTime(msg.created)}</VText>
                  <div className="px-3 py-2.5 bg-gray-200 dark:bg-gray-400 rounded-lg rounded-tl-none">
                    <VText color="black"><div dangerouslySetInnerHTML={{ __html: msg.text }} /></VText>
                  </div>
                </div>
              </div>
              :
              <div key={msg.created} className={`flex flex-col w-3/4 items-end ml-auto ${msg.show_date ? 'mt-3' : 'mt-1'}`}>
                <VText color="secondary" className={`text-sm ${msg.show_date ? '' : 'hidden'}`}>You, {getShortTime(msg.created)}</VText>
                <div className="px-3 py-2.5 bg-gray-400 dark:bg-gray-600 rounded-lg rounded-br-none">
                  <VText color="white"><div dangerouslySetInnerHTML={{ __html: msg.text }} /></VText>
                </div>
              </div>
          )
        }
        <div className="flex justify-center mb-auto">
          <VButton variant="text" color="secondary" size="small" onClick={onLoadMore} loading={!loadedChatList} disabled={!currUser.message_more}>{t("Load more")} ...</VButton>
        </div>
      </div>
      <Divider className="bg-gray-200 dark:bg-gray-700" />
      <div className="v-chat-froala relative v-chat-dark">
        <VFroala isChat isEnterSubmit onSubmit={onSubmit} model={model} setModel={setModel} />
      </div>
    </div>

  </div>;
};

export default ChatContent;