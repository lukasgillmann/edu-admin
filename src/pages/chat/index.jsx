import { Box, Divider, Grid } from "@mui/material";
import React, { useMemo } from "react";
import { useWindowSize } from "../../context";
import VButton from "../../form/VButton";
import VText from "../../form/VText";
import ChatContent from "./chat.content";
import ChatUsers from "./chat.users";
import { Icon } from '@iconify/react';

const Chat = () => {

  const windowSize = useWindowSize();
  
  const contentHeight = useMemo(() => {
    const headerHeight = document.getElementById('v-header')?.offsetHeight || 0;
    const titleHeight = document.getElementById('v-chat-title')?.offsetHeight || 0;
    const totalHeight = document.body.offsetHeight;
    return totalHeight - titleHeight - headerHeight - 32 - 90;
  }, [windowSize.height]);

  return <Box className="flex flex-col h-full">
    <Box className="px-6 py-8" id="v-chat-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText color="dark" className="text-2xl">22</VText>&nbsp;
          <VText color="primary" className="text-2xl">Message in total</VText>
        </Grid>
        <Grid item sm={12} md={8} className="flex justify-end">
          <VButton variant="text" color="primary" className="text-sm normal-case"><Icon icon="akar-icons:circle-check" />&nbsp;Mark All as Read</VButton>
          <VButton variant="text" color="primary" className="text-sm ml-2 normal-case"><Icon icon="bx:sort" />&nbsp;Sort</VButton>
          <VButton startIcon="add" variant="contained" color="primary" className="text-sm ml-2 normal-case">New Messages</VButton>
        </Grid>
      </Grid>
    </Box>

    <Divider className="bg-gray-200 dark:bg-gray-500" />

    <Box className="flex-1 flex h-full">
      <ChatUsers height={contentHeight} />
      <ChatContent height={contentHeight} />
    </Box>
  </Box>;
};

export default Chat;