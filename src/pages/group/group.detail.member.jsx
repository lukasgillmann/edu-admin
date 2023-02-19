import { useState } from 'react';
import { Icon } from '@iconify/react';
import { Divider, Tabs, Tab, Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useConfirm } from 'material-ui-confirm';

import { useAsterController } from "../../context";
import { VButton, VText, VInput, VAvatar } from "../../form";
import { BTable } from '../../components';
import { getUserName } from '../../utils/string';
import { actionGroupDismissUsers } from '../../context/action';
import GroupDetailMemberAdd from './group.detail.member.add';

const GroupDetailMember = (props) => {

  const { t } = useTranslation('common');

  const { currGroup } = props;

  const confirm = useConfirm();
  const [, dispatch] = useAsterController();

  const [tab, setTab] = useState(0);
  const handleSetTabValue = (_, newValue) => setTab(newValue);

  const onDismiss = (idx) => {
    confirm({ 
      title: t("Are you sure?"),
      confirmationText: t("OK"),
      cancellationText: t("Cancel"),
      description: t("Are you going to delete this item?") 
    })
      .then(() => actionGroupDismissUsers(dispatch, { group_id: currGroup.id, user_ids: [currGroup.users[idx].id] }, t))
      .catch(() => { });
  };

  const columns = [
    {
      name: <VText>{t('Avatar')}</VText>,
      selector: row => getUserName(row),
      cell: rw => <div className="flex items-center" >
        <VAvatar src={rw.avatar} />
        <div className="ml-4">
          <VText>{getUserName(rw)}</VText>
          <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max" div>{t(rw.permission)}</VText>
        </div>
      </div>,
      sortable: true,
      minWidth: '250px'
    },
    {
      name: <VText>{t('User ID')}</VText>,
      selector: row => row.username,
      cell: rw => <VText>{rw.username}</VText>,
      sortable: true
    },
    {
      name: <VText>{t("Contact")}</VText>,
      selector: row => row.id,
      cell: rw => <div>
        <VText className="flex items-center"><Icon icon="eva:email-outline" className="text-gray-400 w-6" />&nbsp;{rw.email}</VText>
      </div>,
      minWidth: '260px',
      sortable: true
    },
    {
      name: <VText>{t("Action")}</VText>,
      cell: (rw, idx) =>
        <VButton variant="outlined" className="normal-case" onClick={() => onDismiss(idx)}>
          <Icon icon="gg:remove" className="text-xl" />&nbsp;{t("Dismiss")}
        </VButton>,
      minWidth: '150px'
    },
  ];

  return <>

    <div className="dark:bg-gray-700 w-full flex py-3 px-8 items-center">
      <VInput startIcon="search" size="small" inputClassName="pt-1 py-1 mt-px" />
      <VButton variant="outlined" color="secondary" size="normal" className="text-sm ml-2 normal-case">
        <Icon icon="ant-design:filter-filled" />&nbsp;{t("Filter")}
      </VButton>
      <VButton variant="outlined" color="secondary" className="text-sm mx-2 normal-case">
        <Icon icon="bx:sort" />&nbsp;{t("Sort")}
      </VButton>

      <div className="h-8 ml-auto v-tab-switch flex">
        <Tabs orientation="horizontal" value={tab} onChange={handleSetTabValue}>
          <Tab icon={<Icon className="mr-0" icon="akar-icons:grid" />} />
          <Tab icon={<Icon className="mr-0" icon="ci:list-checklist" />} />
        </Tabs>

        <GroupDetailMemberAdd currGroup={currGroup} />
      </div>

    </div>
    <Divider className="bg-gray-200 dark:bg-gray-500" />

    <div>
      {
        tab === 0 && <div className="p-4 md:p-8">
          <Grid container spacing={3}>
            {
              currGroup.users.map((user, idx) =>
                <Grid key={user.id} item xs={12} sm={6} lg={4} xl={3}>
                  <div className="border border-solid border-gray-300 rounded-md">
                    <div className="px-4 py-2 flex items-center">
                      <VText color="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 rounded px-1 py-0.5 w-max flex items-center h-min">
                        <Icon icon="ic:outline-published-with-changes" />&nbsp;{user.permission}
                      </VText>
                    </div>
                    <div className="relative">
                      {
                        user.cover ?
                          <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${user.cover})` }} />
                          :
                          <div className="w-full aspect-[5/2] bg-cover bg-center bg-gray-100 dark:bg-gray-700" style={{ backgroundImage: `url(${process.env.REACT_APP_S3_ASSET_ENDPOINT + '/v2-assets/default-cover-' + ((user.username?.charCodeAt(0) || 0) % 3 + 1) + '.png'})` }} />
                      }
                      <VAvatar src={user.avatar} className="w-24 h-24 absolute -bottom-9 left-3" />
                    </div>
                    <div className="p-4">
                      <VText className="text-limit-1 ml-24">{getUserName(user)}</VText>
                      <div className="flex flex-wrap mt-4">
                        <VText color="secondary" className="flex items-center text-sm mr-4">
                          <Icon icon="bx:user-circle" />&nbsp;
                          {user.email}
                        </VText>
                        <VText color="secondary" className="flex items-center text-sm">
                          <Icon icon="majesticons:award-line" />&nbsp;
                          {user.username}
                        </VText>
                      </div>
                    </div>
                    <Divider className="bg-gray-200 dark:bg-gray-500" />
                    <div className="p-4">
                      <VButton variant="contained" className="w-full normal-case" onClick={() => onDismiss(idx)}>
                        <Icon icon="gg:remove" className="text-xl" />&nbsp;{t('Dismiss')}
                      </VButton>
                    </div>
                  </div>
                </Grid>
              )
            }
          </Grid>
        </div>
      }
      {
        tab === 1 && <BTable
          columns={columns}
          data={currGroup.users}
          total={currGroup.users.length}
          loading={false}
        />
      }
    </div>

  </>;
};

export default GroupDetailMember;