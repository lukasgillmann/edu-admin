import { Box } from '@mui/material';
import Materialtable from 'material-table';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useAsterController } from '../context';
import VText from "../form/VText";
import BPagination from './BPagination';

const data1 = [
  { id: 1, email: "george.bluth@reqres.in", first_name: "George", last_name: "Bluth", avatar: "https://reqres.in/img/faces/1-image.jpg" },
  { id: 2, email: "janet.weaver@reqres.in", first_name: "Janet", last_name: "Weaver", avatar: "https://reqres.in/img/faces/2-image.jpg" },
  { id: 3, email: "emma.wong@reqres.in", first_name: "Emma", last_name: "Wong", avatar: "https://reqres.in/img/faces/3-image.jpg" },
  { id: 4, email: "eve.holt@reqres.in", first_name: "Eve", last_name: "Holt", avatar: "https://reqres.in/img/faces/4-image.jpg" },
  { id: 5, email: "charles.morris@reqres.in", first_name: "Charles", last_name: "Morris", avatar: "https://reqres.in/img/faces/5-image.jpg" }
];

const columns = [
  {
    title: 'Avatar',
    field: 'avatar',
    render: rowData => <img style={{ height: 36, borderRadius: '50%' }} src={rowData.avatar} alt="" />
  },
  {
    title: 'Id',
    field: 'id',
    render: rowData => <VText>{rowData.id}</VText>
  },
  {
    title: 'First Name',
    field: 'first_name',
    render: rowData => <VText>{rowData.first_name}</VText>
  },
  {
    title: 'Last Name',
    field: 'last_name',
    render: rowData => <VText>{rowData.last_name}</VText>
  },
];

const BTable = () => {

  const [controller] = useAsterController();
  const { darkMode } = controller;

  const tableRef = useRef(null);

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const onPageChange = (page, size) => {
    setPage(page);
  };

  const onPageSizeChange = (page, size) => {
    setPageSize(size);
  };

  return <Box>
    <Materialtable
      tableRef={tableRef}
      style={{ backgroundColor: 'transparent', boxShadow: 'none' }}
      title="AA"
      options={{
        paginationType: 'stepped',
        paginationPosition: 'bottom',
        search: false,
        showTitle: false,
        toolbar: false,
        headerStyle: {
          backgroundColor: 'transparent',
          color: darkMode ? 'white' : 'black'
        },
        paging: true,
        // pageSize: pageSize,
        // pageSizeOptions: [5, 10, 20]
      }}
      localization={{
        pagination: {
          labelRowsPerPage: <VText>Per Page</VText>,
          labelDisplayedRows: `{from}-{to} de {count}`
        }
      }}
      columns={columns}
      data={data1}
      // onChangePage={onChangePage}
      // onChangeRowsPerPage={onChangeRowsPerPage}
      // totalCount={220}
      // page={page}
      isLoading={false}
      components={{
        Headers: 'div',
        // Pagination: props => <TablePagination
        //   {...props}
        //   color="secondary"
        //   page={0}
        //   count={100}
        //   rowsPerPageOptions={[5, 10, 20, "All"]}
        //   rowsPerPage={pageSize}
        //   //updates pagination, but no re-size
        //   onChangeRowsPerPage={onChangeRowsPerPage}
        //   onChangePage={onChangePage}
        // />
        Pagination: props =>
          <BPagination
            total={27}
            page={page}
            pageSize={pageSize}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
          />
      }}
    />
    <Box className="flex px-4 mt-2">
      {/* <BPagination total={17} onPageChange={onPageChange} onPageSizeChange={onPageSizeChange} /> */}
    </Box>
  </Box>;
};

export default BTable;