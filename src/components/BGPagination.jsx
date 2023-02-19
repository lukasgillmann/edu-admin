import React, { useState } from "react";
import BPagination from "./BPagination";

const BGPagination = (props) => {

  const { total, handlePageChange, initPage = 0, initSize = 10 } = props;

  const [page, setPage] = useState(initPage);
  const [pageSize, setPageSize] = useState(initSize);

  const onChangePage = (page) => {
    setPage(page);
    handlePageChange(page, window.pageSize || initSize);
  };
  const onPerRowsChange = (pageSize) => {
    window.pageSize = pageSize;
    setPageSize(pageSize);
  };

  return <>
    {
      total && total > 10 ?
        <BPagination
          currentPage={page}
          rowsPerPage={pageSize}
          rowCount={total}
          paginationRowsPerPageOptions={[10, 20, 50]}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onPerRowsChange}
        />
        : <></>
    }

  </>;
};

export default BGPagination;