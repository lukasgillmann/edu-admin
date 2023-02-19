import React, { useEffect } from "react";
import { useAsterController } from "../context";

const PaginationFetcher = (props) => {

  const { page, pageSize, list, action } = props;

  const [controller, dispatch] = useAsterController();
  const { loadedAdminDashboardGet } = controller;

  useEffect(() => {
    if (loadedAdminDashboardGet) {
      if (list.page !== page || list.page_size !== pageSize) {
        action(dispatch, { page, page_size: pageSize });
      }
    }
  }, [loadedAdminDashboardGet, list.page, list.page_size, action, dispatch, page, pageSize]);

  return <></>;
};

PaginationFetcher.defaultProps = {
  page: 0,
  pageSize: 10,
  list: { page: 0, pageSize: 10 },
  action: () => { }
};

export default PaginationFetcher;