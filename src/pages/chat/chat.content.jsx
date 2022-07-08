import { Box, Divider } from "@mui/material";
import VButton from "../../form/VButton";
import VText from "../../form/VText";
import { Icon } from '@iconify/react';
import VAvatar from "../../form/VAvatar";
import VFroala from "../../form/VFroala";

const chatData = [
  { key: 0, text: "I want to confirm something with you, can you help me?", url: '', type: '', toAdmin: true, time: '2022-07-07T21:10:10.088Z' },
  { key: 1, text: "Hello, Jonathan", url: '', type: '', toAdmin: false, time: '2022-07-07T21:10:11.088Z' },
  { key: 2, text: "Lorem ipsum dolor sit amet", url: '', type: '', toAdmin: false, time: '2022-07-07T21:11:47.088Z' },
  { key: 3, text: "Lorem ipsum dolor sit amet", url: 'https://', type: 'png', toAdmin: true, time: '2022-07-07T21:12:47.088Z' },
  { key: 4, text: "Hi, Milos what's up?", url: 'https://', type: 'mp3', toAdmin: false, time: '2022-07-07T21:13:47.088Z' },
  { key: 5, text: "Is there any good news?", url: 'https://', type: 'pdf', toAdmin: false, time: '2022-07-07T21:14:47.088Z' },
  { key: 6, text: "Lorem ipsum dolor sit amet", url: '', type: '', toAdmin: true, time: '2022-07-07T21:15:47.088Z' },
  { key: 7, text: "I want to confirm something with you, can you help me?", url: '', type: '', toAdmin: true, time: '2022-07-07T21:10:10.088Z' },
  { key: 8, text: "Hello, Jonathan", url: '', type: '', toAdmin: false, time: '2022-07-07T21:10:11.088Z' },
  { key: 9, text: "Lorem ipsum dolor sit amet", url: '', type: '', toAdmin: false, time: '2022-07-07T21:11:47.088Z' },
  { key: 10, text: "Lorem ipsum dolor sit amet", url: 'https://', type: 'png', toAdmin: true, time: '2022-07-07T21:12:47.088Z' },
  { key: 11, text: "Hi, Milos what's up?", url: 'https://', type: 'mp3', toAdmin: false, time: '2022-07-07T21:13:47.088Z' },
  { key: 12, text: "Is there any good news?", url: 'https://', type: 'pdf', toAdmin: false, time: '2022-07-07T21:14:47.088Z' },
  { key: 13, text: "Lorem ipsum dolor sit amet", url: '', type: '', toAdmin: true, time: '2022-07-07T21:15:47.088Z' },
];

const user = { name: 'Jonathan' };

const ChatContent = (props) => {

  const { height } = props;

  const onSubmit = (value) => {
    console.log('[submitting...]', value);
  };

  return <Box className="w-full">
    <Box className="p-6 flex items-center" sx={{ height: '88px' }}>
      <VText color="primary" className="text-2xl">@</VText>&nbsp;&nbsp;
      <VText className="text-2xl">Jonathan Doe Immanuel</VText>
      <Box className="ml-auto">
        <VButton
          startIcon="search"
          iconButton
          variant="outlined"
          color="primary"
          className="border-transparent hover:border-transparent"
        >
          <Icon icon="fa:search" className="text-lg" />
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color="primary"
          className="border-transparent hover:border-transparent"
        >
          <Icon icon="akar-icons:sidebar-left" className="text-lg" />
        </VButton>
        <VButton
          iconButton
          variant="outlined"
          color="primary"
          className="border-transparent hover:border-transparent"
        >
          <Icon icon="akar-icons:more-horizontal" className="text-lg" />
        </VButton>
      </Box>
    </Box>

    <Divider className="bg-gray-200 dark:bg-gray-500" />

    <Box height={height} className="flex flex-col">
      <Box className="flex-1 w-full overflow-y-auto v-light-scrollbar px-3" sx={{ maxHeight: height - 130 }}>
        {
          chatData.map(msg =>
            msg.toAdmin ?
              <Box key={msg.key} className="flex w-3/4 mt-3">
                <VAvatar bgColor="light" />
                <Box className="ml-3">
                  <VText color="primary" className="text-sm">{user.name}, {msg.time}</VText>
                  <Box className="px-3 py-2.5 bg-gray-200 dark:bg-gray-400 rounded-lg rounded-tl-none">
                    <VText color="black">{msg.text}</VText>
                  </Box>
                </Box>
              </Box>
              :
              <Box key={msg.key} className="flex flex-col w-3/4 mt-3 items-end ml-auto">
                <VText color="primary" className="text-sm">You, {msg.time}</VText>
                <Box className="px-3 py-2.5 bg-gray-400 dark:bg-gray-600 rounded-lg rounded-br-none">
                  <VText color="white">{msg.text}</VText>
                </Box>
              </Box>
          )
        }
      </Box>
      <Divider className="bg-gray-200 dark:bg-gray-700" />
      <Box className="v-chat-froala relative v-chat-dark">
        <VFroala isChat isEnterSubmit onSubmit={onSubmit} />
      </Box>
    </Box>
  </Box>;
};

export default ChatContent;