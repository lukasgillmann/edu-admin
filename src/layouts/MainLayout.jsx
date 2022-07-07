import { Card, Box } from "@mui/material";
import React from "react";
import Header from "./Header";

const MainLayout = (props) => {

  const { children } = props;

  return <>
    <Card className="shadow rounded-xl h-full flex flex-col">
      <Header />
      <Box className="p-8 overflow-auto flex-1 v-light-scrollbar">
        <Box className="relative">
          {children}
        </Box>
      </Box>
    </Card>
  </>;
};

export default MainLayout;