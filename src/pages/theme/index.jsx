import { Divider, Tab, Tabs } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { VButton, VText } from "../../form";
import ThemeColor from "./theme.color";
import ThemeIcon from "./theme.icon";
import { useAsterController } from "../../context";
import { actionThemeEdit } from "../../context/action";
import { getInvertColor } from "../../utils/string";

const Theme = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { themes, loadedThemeEdit } = controller;

  const [tab, setTab] = useState(0);

  const [fields, setFields] = useState({});

  useEffect(() => {
    if (themes.length) {
      const obj = {};
      themes.forEach(item => { if (!item.default) obj[item.name] = item.value; });

      obj.auth_modal_opacity = parseFloat(obj.auth_modal_opacity);
      obj.auth_bg_is_image = obj.auth_bg_is_image === '1';

      setFields(obj);
    }
  }, [themes.length, themes]);

  const onReset = () => {
    const obj = {};
    themes.forEach(item => { if (item.default) obj[item.name] = item.value; });
    for (let i = 0; i < 10; i++) {
      obj[`badge${i + 1}_url`] = '';
    }

    obj.auth_modal_opacity = parseFloat(obj.auth_modal_opacity);
    obj.auth_bg_is_image = obj.auth_bg_is_image === '1';

    setFields(obj);
  };

  const onSave = () => {
    const modified = [];
    Object.keys(fields).forEach(name => {
      const themeItem = themes.find(v => v.name === name);
      themeItem && modified.push({ name: name, value: fields[name].toString() });
    });

    actionThemeEdit(dispatch, modified, t);

    const gradInvert = getInvertColor(fields.grad_main1);
    const currTime = new Date().getTime();

    document.getElementById('favicon').setAttribute('href', `${process.env.REACT_APP_FAVICON_URL}?${currTime}`);
    document.getElementById('sidebar-favicon')?.setAttribute('src', `${process.env.REACT_APP_FAVICON_URL}?${currTime}`);
    document.getElementById('sidebar-logo')?.setAttribute('src', `${process.env.REACT_APP_LOGO_URL}?${currTime}`);
    document.getElementById('custom-style').innerText = `
      body.admin { background: linear-gradient(233.56deg, ${fields.grad_main1} -21.9%, #FFF5E0 46.72%, #F8F8F8 115.74%) !important; }
      .dark body.admin { background: linear-gradient(233.56deg, ${gradInvert} -21.9%, #202225 46.72%, #453232 115.74%) !important; }
      .v-tabs .MuiTabs-indicator { background-color: ${fields.color_main3} !important; }
      .v-sidenav .v-bg-side-active .MuiListItemIcon-root, .v-sidenav .v-bg-side-active .v-side-symbol > span {
        color: ${fields.color_main1} !important;
      }
    `;

  };

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  return <>
    <div className="p-4 md:p-8 flex items-center flex-wrap">

      <div className="flex items-center justify-between flex-wrap mt-6 w-full">
        <div>
          <VText className="text-2xl" div>{t("Theming")}</VText>
          <VText color="secondary" className="text-sm">
            {t("Application theme customization")}
          </VText>
        </div>
        <div className="mr-auto sm:mr-0 ml-auto my-2">

          <VButton variant="contained" className="ml-auto mr-4 my-1 no-underline" onClick={onReset}>
            <Icon icon="ic:round-lock-reset" className="text-xl" />&nbsp;
            {t("Reset Default settings")}
          </VButton>
          <VButton variant="contained" type="submit" className="my-1" onClick={onSave} loading={!loadedThemeEdit}>
            <Icon icon="bxs:save" className="text-xl" />&nbsp;
            {t("Save")}
          </VButton>

        </div>
      </div>

    </div>

    <div className="h-8 my-4">
      <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue} className="h-9 px-8 v-tabs" sx={{ minHeight: 36 }}>
        <Tab label={t("Colors")} className="min-h-0 text-dark dark:text-white normal-case" />
        <Tab label={t("Icons")} className="min-h-0 text-dark dark:text-white normal-case" />
      </Tabs>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
    </div>

    {tab === 0 && <ThemeColor fields={fields} setFields={setFields} />}
    {tab === 1 && <ThemeIcon fields={fields} setFields={setFields} />}
  </>;
};

export default Theme;