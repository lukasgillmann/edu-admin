import { Card, Box } from "@mui/material";
import React from "react";
import Header from "./Header";

const MainLayout = (props) => {

  const { children } = props;

  return <>
    <Card className="shadow rounded-xl h-full">
        <Header />
        {children}
    </Card>
  </>;
};

export default MainLayout;