import { Grid } from "@mui/material";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { Link } from "react-router-dom";

import { VButton, VImage, VText } from "../../form";
import { useAsterController } from "../../context";
import BTable from "../../components/BTable";
import { BGPagination, BPopOver } from "../../components";
import { downloadCSV, downloadHTML } from "../../utils/csv";
import { getCourseImageUrl, getFormatDate, getUserName } from "../../utils/string";
import { actionLicenseList } from "../../context/action";
import PageNoData from "../PageNoData";

const License = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { licenses, loadedAdminDashboardGet, loadedLicenseList, dashboardInfo } = controller;
  const loading = !loadedAdminDashboardGet || !loadedLicenseList;

  const licenseNumber = dashboardInfo?.license_number || {
    license_available: 0,
    license_total: 0,
    license_disabled: 0,
    credit_available: 0,
    credit_total: 0,
    credit_disabled: 0
  };

  const exportColumns = [
    { header: t("Course"), accessor: "display_name", type: "text" },
    { header: t("First Name"), accessor: "first_name", type: "text" },
    { header: t("Last Name"), accessor: "last_name", type: "text" },
    { header: t("Email"), accessor: "email", type: "text" },
  ];

  const columns = [
    {
      name: <VText>{t('Image')}</VText>,
      cell: rw => <VImage src={getCourseImageUrl(rw.course_image_url)} className="w-32 h-16 rounded" />,
      minWidth: '140px'
    },
    {
      name: <VText>{t('Course')}</VText>,
      selector: row => row.display_name,
      cell: rw => <VText div className="text-limit-2">{rw.display_name}</VText>,
      minWidth: '250px',
      sortable: true
    },
    {
      name: <VText>{t('Full Name')}</VText>,
      selector: row => row.first_name,
      cell: rw => <VText>{getUserName(rw)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Email')}</VText>,
      selector: row => row.email,
      cell: rw => <VText>{rw.email}</VText>,
      hide: 'lg',
      sortable: true
    },
    {
      name: <VText>{t('Created')}</VText>,
      selector: row => row.start,
      cell: rw => <VText>{getFormatDate(rw.start)}</VText>,
      sortable: true
    },
    {
      name: <VText>{t('Status')}</VText>,
      selector: row => row.is_active,
      cell: rw => <VText>{rw.is_active ? "Active" : "Inactive"}</VText>,
      sortable: true
    }
  ];

  const handlePageChange = (page, pageSize) => actionLicenseList(dispatch, { page, page_size: pageSize });

  return <>
    <div className="p-4 md:p-8">
      <div className="flex items-center flex-wrap mt-6">
        <div>
          <VText className="text-2xl" div>{t('Licenses List')}</VText>
          <VText color="secondary" className="text-sm">
            {t("Your license history")}
          </VText>
        </div>
        <Link to={`/licenses/add`} className="no-underline ml-auto">
          <VButton color="primary" variant="contained" startIcon="add" size="small">
            {t('Add Licenses')}
          </VButton>
        </Link>
        <BPopOver className="ml-4" trigger={
          <VButton variant="outlined" className="normal-case" size="small">
            <Icon icon="ep:setting" />&nbsp;{t('Menu')}&nbsp;
            <Icon icon="akar-icons:chevron-down" />
          </VButton>
        }>
          <div className="flex flex-col">
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadCSV(exportColumns, licenses.data, "licenses")}>
              <Icon icon="ph:file-csv" />&nbsp;{t('Export CSV')}
            </VButton>
            <VButton variant="text" color="secondary" className="px-4 py-1 justify-start w-full" onClick={() => downloadHTML(exportColumns, licenses.data, "licenses")}>
              <Icon icon="ph:file-html" />&nbsp;{t('Export HTML')}
            </VButton>
          </div>
        </BPopOver>
      </div>

      <div className="mt-9">
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div className="relative">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/available.png`} className="w-full" style={{ maxWidth: '400px' }} />
              <div className="absolute top-3 lg:top-5 left-7">
                <VText div className="text-white text-2xl leading-5 lg:text-4xl xl:text-6xl">{licenseNumber.license_available}</VText>
                <VText className="text-sm xl:text-xl text-white">{licenseNumber.license_available > 1 ? t('Availables') : t("Available")}</VText>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className="flex justify-center">
            <div className="relative">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/activated.png`} className="w-full" style={{ maxWidth: '400px' }} />
              <div className="absolute top-3 lg:top-5 left-7">
                <VText div className="text-white text-2xl leading-5 lg:text-4xl xl:text-6xl">{licenseNumber.license_total - licenseNumber.license_available}</VText>
                <VText className="text-sm xl:text-xl text-white">{licenseNumber.license_total - licenseNumber.license_available > 1 ? t("Actives") : t('Activated')}</VText>
              </div>
            </div>
          </Grid>
          <Grid item xs={12} sm={4} className="flex justify-end">
            <div className="relative">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/desactivated.png`} className="w-full" style={{ maxWidth: '400px' }} />
              <div className="absolute top-3 lg:top-5 left-7">
                <VText div className="text-white text-2xl leading-5 lg:text-4xl xl:text-6xl">{licenseNumber.license_disabled}</VText>
                <VText className="text-sm xl:text-xl text-white">{licenseNumber.license_disabled > 1 ? t('Expired') : t("Expired")}</VText>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>

    <BTable
      columns={columns}
      data={licenses.data}
      total={licenses.data.length}
      loading={loading}
      page={licenses.page}
      pageSize={licenses.page_size}
    />

    <BGPagination
      handlePageChange={handlePageChange}
      total={licenses.total}
      initPage={licenses.page}
      initSize={licenses.page_size}
    />

    <PageNoData show={!loading && !licenses.total} />

  </>;
};

export default License;