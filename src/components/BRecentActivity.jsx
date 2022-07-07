import { Box, Icon } from "@mui/material";
import React from "react";
import VText from "../form/VText";

const BRecentActivity = (props) => {

  const { data } = props;

  return <Box className="border border-solid border-gray-300 h-full rounded-md px-6 pt-6 pb-0">
    <VText className="text-xl">Recent Learner Activity</VText>
    <Box className="mt-5 overflow-y-auto v-light-scrollbar max-h-64">
      {
        data.map((v, idx) =>
          <Box className="flex" key={v.key}>
            <Box className="w-8 h-8 rounded bg-gray-200 flex items-center justify-center">
              {v.type === 'course_complete' && <Icon color="primary">{v.icon}</Icon>}
              {v.type === 'module_complete' && <Icon color="warning">{v.icon}</Icon>}
            </Box>
            <Box className="flex-1 break-all mx-2 mb-6 relative">
              {v.type === 'course_complete' && <VText><b>{v.name}</b> has completed <b>{v.target}</b></VText>}
              {v.type === 'module_complete' && <VText><b>{v.name}</b> has completed <b>{v.target}</b></VText>}

              <VText color="primary" className="text-sm mt-2">{v.date}</VText>

              {idx !== data.length - 1 && <Box className="w-0.5 h-3/5 bg-gray-400 absolute -left-6 top-11" />}
            </Box>
          </Box>
        )
      }
    </Box>
  </Box >;
};

export default BRecentActivity;