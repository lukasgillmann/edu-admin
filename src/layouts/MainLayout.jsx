import { Card, Box } from "@mui/material";
import React from "react";
import Header from "./Header";

const MainLayout = (props) => {

  const { children } = props;

  return <>
    <Card className="shadow rounded-xl h-full flex flex-col">
      <Header />
      <Box className="flex-1 overflow-auto v-light-scrollbar">
        <Box className="relative h-full">
          {children}
        </Box>
      </Box>
    </Card>
  </>;
};

export default MainLayout;