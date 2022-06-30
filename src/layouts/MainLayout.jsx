import { Card, Box } from "@mui/material";
import React from "react";
import Header from "./Header";

const MainLayout = (props) => {

  const { children } = props;

  return <>
    <Card className="shadow rounded-xl h-full overflow-auto">
      <Header />
      <Box className="p-8">
        <Box className="relative">
          {children}
        </Box>
      </Box>
    </Card>
  </>;
};

export default MainLayout;