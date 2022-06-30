import React from "react";
import { Grid } from '@mui/material';
import BAnaCard from '../../components/BAnaCard';

const Dashboard = () => {

  return <>
    <Grid container spacing={4}>
      <Grid item md={4}>
        <BAnaCard icon="person_add_alt" label="Total User" value="32 Learner" />
        <BAnaCard icon="timer" label="Avg. Learning Time" value="42 Minutes" className="mt-6" />
        <BAnaCard icon="person_add_alt" label="Avg. Access Time" value="56 Minutes" className="mt-6" />
      </Grid>
      <Grid item md={4}>
        BBB
      </Grid>
      <Grid item md={4}>
        CCC
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;