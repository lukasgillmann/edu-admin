
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VText } from "../../form";
import { useAsterController } from "../../context";
import { getCourseImageUrl } from "../../utils/string";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

const HeaderSearchContent = () => {

  const { t } = useTranslation('common');

  const [controller] = useAsterController();
  const { searchCourses, loadedSearchList } = controller;

  return <div className="p-4" style={{ minHeight: 320 }}>
    <VText color="secondary" className="text-lg">{t("Course")}</VText>
    {
      !loadedSearchList ? <Skeleton className="h-10 mt-2" count={10} />
        : <>
          {
            searchCourses.length ?
              searchCourses.map(course =>
                <Link to={`/catalog/course/edit/${course.page}/10/${course.id}`} className="no-underline" key={`${course.id}${course.created}`}>
                  <div className="flex items-center mt-2 hover:bg-gray-200 p-1">
                    <div className="w-28 h-14 rounded flex-shrink-0 bg-gray-100 dark:bg-gray-700 bg-cover bg-center" style={{ backgroundImage: `url("${getCourseImageUrl(course.course_image_url)}")` }} />
                    <div className="ml-4">
                      <VText>{course.display_name}</VText>
                      <div className="flex">
                        <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                          <Icon icon="ic:outline-published-with-changes" />&nbsp;{t('Published')}
                        </VText>
                        <VText color="secondary" className="text-xs rounded px-1 py-0.5 w-max flex items-center h-min ml-2">
                          <Icon icon="majesticons:award-line" />&nbsp;{course.category || '-'}
                        </VText>
                        <VText color="secondary" className="text-xs rounded px-1 py-0.5 w-max flex items-center h-min ml-2">
                          <Icon icon="bx:user-circle" />&nbsp;Public
                        </VText>
                      </div>
                    </div>
                  </div>
                </Link>)
              :
              <div className="h-80 flex flex-col justify-center items-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center">
                  <div className="w-14 h-14 bg-gray-300 rounded-full flex items-center justify-center">
                    <Icon icon="mdi:selection-search" className="text-3xl text-white" />
                  </div>
                </div>
                <VText className="text-sm mt-4">{t('Your search did not match with anything')}</VText>
              </div>
          }
        </>
    }
  </div>;
};

export default HeaderSearchContent;