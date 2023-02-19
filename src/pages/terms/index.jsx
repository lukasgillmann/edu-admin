import React, { useEffect, useState } from "react";

import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VText, VSwitch, VFroala } from "../../form";
import { useAsterController } from "../../context";
import { actionTermEdit } from "../../context/action";

const Terms = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { term, loadedTermEdit } = controller;

  const [checked, setChecked] = useState(false);
  const [model, setModel] = useState('');

  useEffect(() => {
    if (Object.keys(term).length) {
      setChecked(term.enabled);
      setModel(term.content);
    }
  }, [term]);

  const onSave = () => {
    actionTermEdit(dispatch, { content: model, enabled: checked }, t);
  };

  return <>
    <div className="p-4 md:p-8 flex items-center flex-wrap">

      <div className="flex items-center w-full flex-wrap mt-6">
        <div>
          <VText className="text-2xl" div>{t("Terms")}</VText>
          <VText color="secondary" className="text-sm">
            {t('Terms in our platform')}
          </VText>
        </div>
        <div className="flex mr-auto sm:mr-0 ml-auto my-2">
          <VSwitch
            checked={checked}
            setChecked={setChecked}
            color="primary"
            type="Android"
            className="ml-auto"
          >
            {t('Enabled')}
          </VSwitch>
          <VButton className="flex items-center ml-4" variant="contained" loading={!loadedTermEdit} onClick={onSave}>
            <Icon icon="bxs:save" className="text-xl" />&nbsp;
            {t('Save')}
          </VButton>
        </div>
      </div>
    </div>

    <div className="px-4 md:px-8 pb-4 md:pb-8">
      <div className="border border-solid border-gray-300 dark:border-gray-600 rounded-xl dot-bg px-0 md:px-20 lg:px-52 v-term">
        <VFroala model={model} setModel={setModel} />
      </div>
    </div>
  </>;
};

export default Terms;