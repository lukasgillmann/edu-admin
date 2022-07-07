import { Box, Divider, Icon, Tab } from "@mui/material";
import { useState } from "react";
import { TabContext, TabList, TabPanel } from '@mui/lab';
import VText from "../../form/VText";

const HeaderAlert = () => {

  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return <Box className="my-2">
    <VText className="text-2xl mx-4 font-bold">Notifications</VText>
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box className="border-0 border-b border-solid" sx={{ borderColor: 'divider' }} mt={2}>
          <TabList onChange={handleChange} aria-label="lab API tabs example" className="h-7 min-h-0">
            <Tab label="For You" value="1" className="h-7 min-h-0 w-40" />
            <Tab label="System Update" value="2" className="h-7 min-h-0 w-40" />
          </TabList>
        </Box>
        <TabPanel value="1" className="w-80 p-4 v-light-scrollbar max-h-72 overflow-y-auto">
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 3 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 3 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 3 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 3 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 3 sections on <b>Introduction to Figma part</b>
            </VText>
          </Box>
        </TabPanel>
        <TabPanel value="2" className="w-80 p-4 v-light-scrollbar max-h-72 overflow-y-auto">
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 4 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 4 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 4 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 4 sections on <b>Introduction to Figma part</b>
            </VText>
            <Divider className="my-2" />
          </Box>
          <Box>
            <VText color="primary" className="text-xs">
              <Icon className="text-xs">calendar_month</Icon>&nbsp;May 28, 2021 - 07:00 AM
            </VText>
            <VText color="dark" className="text-base">
              <b>Jonathan Doe Imannuel</b> edit 4 sections on <b>Introduction to Figma part</b>
            </VText>
          </Box>
        </TabPanel>
      </TabContext>
    </Box>
  </Box>;
};

export default HeaderAlert;