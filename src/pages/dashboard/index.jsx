import React from "react";
import { Grid, Box } from '@mui/material';
import BAnaCard from '../../components/BAnaCard';
import BTotalContent from '../../components/BTotalContent';
import BRecentActivity from '../../components/BRecentActivity';
import GDashboard from '../../graphs/GDashboard';

const Dashboard = () => {

  return <>
    <Grid container spacing={4}>
      <Grid item md={4}>
        <BAnaCard icon="person_add_alt" label="Total User" value="32 Learner" />
        <BAnaCard icon="timer" label="Avg. Learning Time" value="42 Minutes" className="mt-6" />
        <BAnaCard icon="person_add_alt" label="Avg. Access Time" value="56 Minutes" className="mt-6" />
      </Grid>
      <Grid item md={4}>
        <BTotalContent />
      </Grid>
      <Grid item md={4}>
        <BRecentActivity />
      </Grid>
      <Grid item md={12}>
        <GDashboard />
      </Grid>
    </Grid>
  </>;
};

export default Dashboard;