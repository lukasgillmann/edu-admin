
import React, { useEffect, useMemo, useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';

import { useAsterController } from "../../context";
import { VText } from "../../form";
import { getFormatDate, getShortTime } from "../../utils/string";

const DashboardHistory = () => {

  const { t, i18n } = useTranslation('common');

  const specs = useMemo(() => ({
    course_complete: {
      color: 'success',
      icon: <Icon className="color-primary text-xl" icon="ic:outline-playlist-add-check-circle" />,
      text: t('Course Complete'),
      description: (username, course) => <VText><b>{username}</b> {t('has completed')} <b>{course}</b></VText>
    },
    module_complete: {
      color: 'primary',
      icon: <Icon className="color-warning text-xl" icon="ic:twotone-menu-book" />,
      text: t('Module Complete'),
      description: (username, course) => <VText><b>{username}</b> {t('has completed a module of')} <b>{course}</b></VText>
    },
    course_comment: {
      color: 'info',
      icon: <Icon className="color-warning text-xl" icon="ic:twotone-menu-book" />,
      text: t('Course Comment'),
      description: (username, course) => <VText><b>{username}</b> {t('has left comment on')} <b>{course}</b></VText>
    },
    course_rating: {
      color: 'secondary',
      icon: <Icon className="color-warning text-xl" icon="ic:twotone-menu-book" />,
      text: t('Course Rating'),
      description: (username, course) => <VText><b>{username}</b> {t('has left review on')} <b>{course}</b></VText>
    },
    course_assigned: {
      color: 'warning',
      icon: <Icon className="color-warning text-xl" icon="ic:twotone-menu-book" />,
      text: t('Course Assigned'),
      description: (username, course) => <VText><b>{course}</b> {t('has been assingned to')} <b>{username}</b></VText>
    }
  }), [t]);

  const [controller] = useAsterController();
  const { recentList, loadedAdminDashboardGet } = controller;

  const [recentHist, setRecentHist] = useState([]);

  useEffect(() => {
    if (recentList.length) {

      const filtered = recentList.filter(v => Object.keys(specs).includes(v.type) && v.course)

      const arr = [];

      filtered.forEach((item, key) => {
        arr.push({
          key,
          color: specs[item.type].color,
          icon: specs[item.type].icon,
          title: `${item.fullname}: ${specs[item.type].text}`,
          dateTime: `${getFormatDate(item.time, i18n.language)} - ${getShortTime(item.time)}`,
          description: specs[item.type].description(item.fullname, item.course)
        });
      });

      setRecentHist(arr);
    }
  }, [loadedAdminDashboardGet, recentList.length, recentList, specs, i18n.language]);

  return <div className="border border-solid border-gray-300 h-full rounded-md px-6 pt-6 pb-0">
    <VText className="text-xl">
      {t('Recent Learner History')}
    </VText>
    <div className="mt-5 overflow-y-auto v-light-scrollbar max-h-64">
      {
        loadedAdminDashboardGet ? recentHist.map((v, idx) =>
          <div className="flex" key={v.key}>
            <div className="w-8 h-8 rounded bg-gray-100 flex items-center justify-center">
              {v.icon}
            </div>
            <div className="flex-1 break-all mx-2 mb-6 relative">
              {v.description}
              <VText color="secondary" className="text-sm mt-2" div>{v.dateTime}</VText>
              {idx !== recentHist.length - 1 && <div className="w-0.5 bg-gray-400 absolute -left-6 top-11 -bottom-4" />}
            </div>
          </div>
        ) : <Skeleton count={5} className="mt-4" />
      }
    </div>
  </div >;
};

export default DashboardHistory;