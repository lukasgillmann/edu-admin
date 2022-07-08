import React from "react";
import { Grid, Box } from '@mui/material';
import BAnaCard from '../../components/BAnaCard';
import BTotalContent from '../../components/BTotalContent';
import BRecentActivity from '../../components/BRecentActivity';
import GDashboard from '../../graphs/GDashboard';

const recentHistory = [
  { key: 0, icon: 'book', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'course_complete', date: '1656624071913' },
  { key: 1, icon: 'public', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'module_complete', date: '1656624071913' },
  { key: 2, icon: 'book', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'course_complete', date: '1656624071913' },
  { key: 3, icon: 'book', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'course_complete', date: '1656624071913' },
  { key: 4, icon: 'book', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'course_complete', date: '1656624071913' },
  { key: 5, icon: 'book', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'course_complete', date: '1656624071913' },
  { key: 6, icon: 'book', name: 'Jonathan Doe Imannuel', target: 'introduction to Figma part 1', type: 'course_complete', date: '1656624071913' },
];

const Dashboard = () => {

  return <Box p={4}>
    <Grid container spacing={4}>
      <Grid item md={4} sm={6} xs={12}>
        <BAnaCard icon="person_add_alt" label="Total User" value="32 Learner" />
        <BAnaCard icon="timer" label="Avg. Learning Time" value="42 Minutes" className="mt-6" />
        <BAnaCard icon="person_add_alt" label="Avg. Access Time" value="56 Minutes" className="mt-6" />
      </Grid>
      <Grid item md={4} sm={6} xs={12}>
        <BTotalContent />
      </Grid>
      <Grid item md={4} sm={12} xs={12}>
        <BRecentActivity data={recentHistory} />
      </Grid>
      <Grid item md={12} sm={12} xs={12}>
        <GDashboard />
      </Grid>
    </Grid>
  </Box>;
};

export default Dashboard;