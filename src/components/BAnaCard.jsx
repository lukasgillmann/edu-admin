import React from "react";
import Skeleton from 'react-loading-skeleton';

import { useAsterController } from "../context";
import VText from "../form/VText";

const BAnaCard = (props) => {

  const { label, value, className, children } = props;

  const [controller] = useAsterController();
  const { loadedAdminDashboardGet } = controller;

  return <div className={`border border-solid border-gray-300 rounded-md px-6 py-5 flex items-center ${className}`}>
    <div className="bg-red-200 rounded-full w-14 h-14 flex justify-center items-center" style={{ minWidth: 56 }}>
      {children}
    </div>
    <div className="ml-6">
      <VText color="secondary" className="text-sm text-limit-1" div>{label}</VText>
      {
        loadedAdminDashboardGet ? 
        <VText className="text-xl text-limit-1">{value}</VText>
        :
        <Skeleton className="w-16 h-6" />
      }
      
    </div>
  </div>;
};

export default BAnaCard;