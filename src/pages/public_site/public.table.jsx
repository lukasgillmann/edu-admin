import { useTranslation } from 'react-i18next';
import { VText, VButton } from "../../form";
import { BTable } from '../../components';
import data from '../data';

const PublicTable = () => {

  const { t } = useTranslation('common');

  const columns = [
    {
      name: <VText>{t("Category Name")}</VText>,
      selector: row => row.avatar,
      cell: rw => <VText>Language</VText>,
    },
    {
      name: <VText>{t("ID")}</VText>,
      selector: row => row.id,
      cell: rw => <VText>1</VText>
    },
    {
      name: <VText>{t("Total Courses")}</VText>,
      selector: row => row.last_name,
      cell: rw => <VText>16</VText>
    },
    {
      name: <VText>{t("Admin Editable")}</VText>,
      selector: row => row.last_name,
      cell: rw => <VText>Yes</VText>
    },
    {
      name: <VText>{t('Action')}</VText>,
      selector: row => row.last_name,
      cell: rw =>
        <VButton variant="outlined" className="normal-case justify-start">
          {t("Start Course")}
        </VButton>,
      grow: 0,
      minWidth: '150px'
    },
  ];

  const handlePageChange = (page, pageSize) => {
  };

  return <>
    <BTable
      columns={columns}
      data={data}
      total={32}
      loading={false}
      handlePageChange={handlePageChange}
      isSelect
    />
  </>;
};

export default PublicTable;