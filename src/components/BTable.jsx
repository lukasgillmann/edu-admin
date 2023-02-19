import { Checkbox } from '@mui/material';
import { memo } from 'react';
import DataTable from 'react-data-table-component';
import { useTranslation } from 'react-i18next';
import Skeleton from 'react-loading-skeleton';
import { VText } from '../form';

const CustomTable = (props) => {

  const { columns, data, loading, isSelect, onSelectChange, ...rest } = props;

  const { t } = useTranslation('common');

  const handleChange = ({ selectedRows }) => {
    onSelectChange(selectedRows);
  };

  return <div className="v-table w-full">
    <DataTable
      columns={columns}
      data={data}
      responsive
      theme="default"
      selectableRowsComponent={Checkbox}
      noDataComponent={<VText div className="my-4">{t("There are no records to display")}</VText>}
      persistTableHead={true}
      selectableRows={isSelect}
      progressPending={loading}
      progressComponent={<div className="h-160 w-full">
        <Skeleton count={10} className="w-full h-16 mt-2" />
      </div>}
      fixedHeader
      fixedHeaderScrollHeight="100%"
      // pagination
      // paginationRowsPerPageOptions={[5, 10, 20]}
      // paginationPerPage={5}
      // paginationComponent={BPagination}
      paginationServer
      // paginationTotalRows={total}
      // onChangeRowsPerPage={onPerRowsChange}
      // onChangePage={onChangePage}
      highlightOnHover={true}
      onSelectedRowsChange={handleChange}
      {...rest}
    />
  </div>;
};

CustomTable.defaultProps = {
  columns: [],
  data: [],
  loading: false,
  isSelect: false,
  handlePageChange: () => { },
  handlePageSizeChange: () => { },
  onSelectChange: () => { }
};


const equalCheck = (prevProps, nextProps) => {

  if (prevProps.loading !== nextProps.loading) return false;
  if (
    (prevProps.page != null && nextProps.page != null) &&
    (prevProps.page !== nextProps.page || prevProps.pageSize !== nextProps.pageSize)
  ) return false;
  return true;
};

const BTable = memo(CustomTable, equalCheck);
export default BTable;
