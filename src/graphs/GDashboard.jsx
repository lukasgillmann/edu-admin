import React from "react";
import { Box, Grid, Icon } from "@mui/material";
import VText from "../form/VText";
import VSelect from "../form/VSelect";
import { useState } from "react";

const options = [
  { value: 10, label: 'Apple' },
  { value: 20, label: 'Banana' },
  { value: 30, label: 'Grape' },
];

const GDashboard = (props) => {

  const { data, ...rest } = props;

  const [option, setOption] = useState('');

  return <Box {...rest}>
    <Grid container spacing={3}>
      <Grid item md={8} className="flex items-center">
        <VText className="text-2xl">Learner Insight</VText>
        <VText className="flex items-center ml-8 text-lg"><Icon>auto_graph</Icon>&nbsp;Active Learner</VText>
        <VText className="flex items-center ml-8 text-lg"><Icon>bar_chart</Icon>&nbsp;Completion Rate</VText>
      </Grid>
      <Grid item md={2}>
        <VSelect
          className="w-full"
          option={option}
          setOption={setOption}
          items={options}
          label="Courses"
          size="small"
        />
      </Grid>
      <Grid item md={2}>
        <VSelect
          className="w-full"
          option={option}
          setOption={setOption}
          items={options}
          label="Occurancy"
          size="small"
        />
      </Grid>
      <Grid item md={12}>
        AA
      </Grid>
    </Grid>
  </Box>;
};

export default GDashboard;