import { Card } from "@mui/material";
import React from "react";
import Header from "./Header";

const MainLayout = (props) => {

  const { children } = props;

  return <>
    <Card className="shadow rounded-none md:rounded-xl h-full flex flex-col">
      <Header />
      <div className="flex-1 overflow-y-auto overflow-x-hidden v-light-scrollbar">
        <div className="relative h-full">
          {children}
        </div>
      </div>
    </Card>
  </>;
};

export default MainLayout;