import { Icon } from "@iconify/react";
import React from "react";
import { toast } from "react-toastify";
import { VText } from "../form";

const toaster = ({ type, title, body }) => toast(
  <div className={`flex gap-2 ${!body ? 'items-center' : ''}`}>
    <div className="w-10 h-10 flex justify-center items-center bg-gray-200 dark:bg-gray-700 rounded-full flex-shrink-0">
      {
        type === 'success' &&
        <div className="w-8 h-8 flex justify-center items-center bg-green-100 dark:bg-green-900 rounded-full">
          <Icon icon="lucide:check-circle" className="text-green-600 text-lg" />
        </div>
      }
      {
        type === 'error' &&
        <div className="w-8 h-8 flex justify-center items-center bg-yellow-100 dark:bg-yellow-900 rounded-full">
          <Icon icon="ion:warning-outline" className="text-yellow-600 text-lg mb-0.5" />
        </div>
      }
    </div>
    <div>
      <VText className="text-sm font-bold" div>{title}</VText>
      {body && <VText className="text-sm mt-1" color="secondary" div>{body}</VText>}
    </div>
  </div>
);


toaster.dismiss = toast.dismiss;

export default toaster;
