
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VText } from "../form";

const PageNoData = ({ show }) => {

  const { t } = useTranslation('common');

  return <>
    {
      show && <div className="flex justify-center items-center w-full h-full">
        <div className="w-2/3 flex justify-center items-center h-40 rounded-lg bg-gray-50 dark:bg-gray-700" style={{ maxWidth: '500px' }}>
          <VText color="secondary" className="flex items-center text-2xl">
            <Icon className="text-5xl" icon="icon-park-twotone:speed-one" />&nbsp;
            {t('No data to be shown')}
          </VText>
        </div>
      </div>
    }

  </>;
};

export default PageNoData;