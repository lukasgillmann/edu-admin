import { Box, Grid } from "@mui/material";
import React from "react";
import { Icon } from '@iconify/react';
import VButton from "../../form/VButton";
import VText from "../../form/VText";

const users = [
  {
    name: 'Jonathan Doe Imannuel',
    is_active: true,
    permission: 'Learner',
    email: 'jondoemannu@gmail.com',
    phone_number: '+1 234 456 234',
    group: 'Design Team',
    created: 'March 17, 2022'
  },
];

const User = () => {

  return <Box>
    <Box className="px-6 py-8" id="v-chat-title">
      <Grid container spacing={2}>
        <Grid item sm={12} md={4} className="flex">
          <VText color="dark" className="text-2xl">24</VText>&nbsp;
          <VText color="primary" className="text-2xl">User in total</VText>
        </Grid>
        <Grid item sm={12} md={8} className="flex justify-end">
          <VButton variant="text" color="primary" className="text-sm normal-case">
            <Icon icon="akar-icons:circle-check" />&nbsp;All status
          </VButton>
          <VButton variant="text" color="primary" className="text-sm ml-2 normal-case">
            <Icon icon="ant-design:filter-filled" />&nbsp;Filter
          </VButton>
          <VButton variant="text" color="primary" className="text-sm ml-2 normal-case">
            <Icon icon="bx:sort" />&nbsp;Sort
          </VButton>
          <VButton startIcon="add" variant="contained" color="primary" className="text-sm ml-4 normal-case">
            New Messages
          </VButton>
        </Grid>
      </Grid>
    </Box>
  </Box>;
};

export default User;