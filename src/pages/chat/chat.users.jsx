import { Box, Collapse, Divider, Icon, List, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import React, { useState } from "react";
import VAvatar from "../../form/VAvatar";
import VInput from "../../form/VInput";
import VText from "../../form/VText";

const testUsers = [
  { key: 0, name: 'Edward Wallen', hidden: false },
  { key: 1, name: 'Chris Broad', hidden: false },
  { key: 2, name: 'Jonathan Doe', hidden: false },
  { key: 3, name: 'Wade Edward', hidden: false },
  { key: 4, name: 'Floyd Miche', hidden: false },
  { key: 5, name: 'Jenny Wilson', hidden: false },
  { key: 6, name: 'Canan Doyille', hidden: false },
  { key: 7, name: 'Jeremy Render', hidden: false },
  { key: 8, name: 'Jonathan Doe', hidden: false },
  { key: 9, name: 'Wade Edward', hidden: true },
  { key: 10, name: 'Floyd Miche', hidden: true },
  { key: 11, name: 'Jenny Wilson', hidden: true },
  { key: 12, name: 'Canan Doyille', hidden: true },
  { key: 13, name: 'Jeremy Render', hidden: true },
];

const ChatUsers = (props) => {

  const { height } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [activeOpen, setActiveOpen] = useState(true);
  const [archiveOpen, setArchiveOpen] = useState(true);

  return <Box className="h-full border-0 border-r border-solid border-gray-300 dark:border-gray-500" sx={{ width: 348, minWidth: 348 }}>
    <Box className="p-6">
      <VInput
        startIcon="search"
        placeholder="Search messages"
        size="small"
        className="v-input-noborder"
        inputClassName="text-dark dark:text-white"
        noBorder
        value={searchTerm}
        setValue={setSearchTerm}
      />
    </Box>
    <Divider className="bg-gray-200 dark:bg-gray-500" />
    <Box>
      <List className="w-full overflow-auto v-light-scrollbar pt-0" sx={{ maxWidth: 360, height: height }} component="nav" >
        <ListItemButton onClick={() => setActiveOpen(!activeOpen)}>
          <ListItemText primary="Active Conversation" className="text-gray-400 dark:text-gray-200" />
          {activeOpen ? <Icon className='text-dark dark:text-white'>expand_less</Icon> : <Icon className='text-dark dark:text-white'>expand_more</Icon>}
        </ListItemButton>
        <Collapse in={activeOpen} timeout="auto" unmountOnExit>
          {
            testUsers.filter(v => !v.hidden).map(v =>
              <List component="div" disablePadding key={v.key}>
                <ListItemButton>
                  <ListItemIcon>
                    <VAvatar size='sm' bgColor="light" />
                  </ListItemIcon>
                  <Box className="flex justify-center flex-col">
                    <Box className="flex items-center">
                      <VText className="text-lg font-bold text-limit-1">{v.name}</VText>&nbsp;&nbsp;
                      <VText color="primary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">Learner</VText>
                    </Box>
                    <VText color="primary" className="text-sm text-limit-1">Hello, this is message to be shown in this field</VText>
                  </Box>
                </ListItemButton>
              </List>
            )
          }
        </Collapse>

        <ListItemButton onClick={() => setArchiveOpen(!archiveOpen)}>
          <ListItemText primary="Archieved Conversation" className="text-gray-400 dark:text-gray-200" />
          {archiveOpen ? <Icon className='text-dark dark:text-white'>expand_less</Icon> : <Icon className='text-dark dark:text-white'>expand_more</Icon>}
        </ListItemButton>
        <Collapse in={archiveOpen} timeout="auto" unmountOnExit>
          {
            testUsers.filter(v => v.hidden).map(v =>
              <List component="div" disablePadding key={v.key}>
                <ListItemButton>
                  <ListItemIcon>
                    <VAvatar size='sm' bgColor="light" />
                  </ListItemIcon>
                  <Box className="flex justify-center flex-col">
                    <Box className="flex items-center">
                      <VText className="text-lg font-bold text-limit-1">{v.name}</VText>&nbsp;&nbsp;
                      <VText color="primary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5">Learner</VText>
                    </Box>
                    <VText color="primary" className="text-sm text-limit-1">Hello, this is message to be shown in this field</VText>
                  </Box>
                </ListItemButton>
              </List>
            )
          }
        </Collapse>
      </List>
    </Box>
  </Box>;
};

export default ChatUsers;