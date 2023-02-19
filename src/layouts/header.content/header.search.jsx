import { Tabs, Tab, Divider } from "@mui/material";
import { useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { BModal } from "../../components";
import { VButton, VInput, VText } from "../../form";
import HeaderSearchContent from "./header.search.content";
import HeaderSearchUser from "./header.search.user";
import { useAsterController } from "../../context";
import { actionSearchList } from "../../context/action";

const HeaderSearch = () => {

  const { t } = useTranslation('common');

  const [, dispatch] = useAsterController();

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [tab, setTab] = useState(0);

  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const onChange = (term) => {
    setSearchTerm(term);
    actionSearchList(dispatch, { search_term: term });
  };

  return <>
    <VButton
      iconButton
      variant="outlined"
      color="secondary"
      onClick={() => setOpen(true)}
      className="ml-2"
      name="search"
    >
      <Icon icon="bx:search" className="text-2xl" />
    </VButton>

    <BModal open={open} setOpen={setOpen} className="w-full max-w-lg h-5/6">
      <div className="py-4 flex pr-4">
        <VInput
          startIcon="search"
          placeholder={t("Search contents and users")}
          size="small"
          className="v-input-noborder flex-1"
          inputClassName="text-dark dark:text-white"
          noBorder
          value={searchTerm}
          setValue={onChange}
        />
      </div>
      <Divider className="bg-gray-200 dark:bg-gray-500" />
      <div className="px-4 flex items-center">
        <VText div className="mt-1">{t("Recent Result")}</VText>
        <div className="h-8 ml-auto">
          <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue} className="h-9 v-tabs" sx={{ minHeight: 36 }}>
            <Tab label={t("Contents")} className="min-h-0 text-dark dark:text-white text-xs normal-case" />
            <Tab label={t("User")} className="min-h-0 text-dark dark:text-white text-xs normal-case" />
          </Tabs>
        </div>
      </div>
      <Divider className="bg-gray-200 dark:bg-gray-500 mt-1" />

      {tab === 0 && <HeaderSearchContent />}
      {tab === 1 && <HeaderSearchUser />}

    </BModal>
  </>;
};

export default HeaderSearch;