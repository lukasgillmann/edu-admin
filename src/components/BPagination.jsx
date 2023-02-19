import { Icon, Button, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import VText from '../form/VText';
import VSelect from '../form/VSelect';
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

const BPagination = (props) => {

  const { t } = useTranslation('common');

  const {
    currentPage,
    rowsPerPage,
    rowCount,
    paginationRowsPerPageOptions,
    onChangePage,
    onChangeRowsPerPage,
  } = props;

  const [inputPage, setInputPage] = useState(1);

  useEffect(() => {
    setInputPage(currentPage + 1);
  }, [currentPage]);

  const pageCount = useMemo(() => Math.ceil(rowCount / rowsPerPage), [rowCount, rowsPerPage]);
  const from = rowsPerPage * currentPage + 1;
  const to = rowsPerPage * (currentPage + 1) > rowCount ? rowCount : rowsPerPage * (currentPage + 1);

  const _onPageChange = (page) => {
    onChangePage(page);
  };

  const _onRowsPerPageChange = (pageSize) => {
    onChangeRowsPerPage(pageSize);
    onChangePage(0);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      const actualpage = (inputPage && inputPage > 0 ? Number(inputPage) : 1) - 1;
      _onPageChange(actualpage);
    }
  };

  const onInputChange = (e) => {
    if (e.target.value > pageCount || (e.target.value !== '' && e.target.value <= 0)) return;
    setInputPage(e.target.value);
  };

  return <div className="flex items-center justify-center flex-wrap w-full px-2 v-pagination">
    <VText>{from} ~ {to} / {rowCount}</VText>

    <VText className="ml-auto">{t("Per Page")}:</VText>
    <VSelect
      className="text-sm p-1.5 text-center v-per-currentPage-select"
      option={rowsPerPage}
      setOption={(val) => _onRowsPerPageChange(val)}
      items={paginationRowsPerPageOptions.map(v => ({ label: v, value: v }))}
      size="small"
    />

    <div className="flex items-center">
      <Button
        variant="text"
        color="secondary"
        className="p-0 min-w-0 w-8 h-8 rounded-full"
        disabled={currentPage === 0}
        onClick={() => _onPageChange(0)}
      >
        <Icon>first_page_outlined</Icon>
      </Button>
      <Button
        variant="text"
        color="secondary"
        className="p-0 min-w-0 w-8 h-8 rounded-full"
        disabled={currentPage === 0}
        onClick={() => _onPageChange(currentPage - 1)}
      >
        <Icon>chevron_left_outlined</Icon>
      </Button>

      {
        pageCount <= 5 ?
          [...Array(pageCount).keys()].map(v =>
            <Button
              key={v}
              variant={currentPage === v ? "contained" : "text"}
              color="secondary"
              className="p-0 min-w-0 w-8 h-8 rounded-full"
              disableElevation
              onClick={(e) => _onPageChange(v)}
            >
              {v + 1}
            </Button>
          )
          :
          <TextField
            type="number"
            size="small"
            value={inputPage}
            onChange={onInputChange}
            onKeyDown={onKeyDown}
            InputLabelProps={{ shrink: true }}
            inputProps={{
              className: 'text-sm p-1.5 w-8 text-center v-spin-hide',
              inputMode: 'numeric',
            }}
          />
      }

      <Button
        variant="text"
        color="secondary"
        className="p-0 min-w-0 w-8 h-8 rounded-full"
        disabled={to >= rowCount}
        onClick={() => _onPageChange(currentPage + 1)}
      >
        <Icon>chevron_right_outlined</Icon>
      </Button>
      <Button
        variant="text"
        color="secondary"
        className="p-0 min-w-0 w-8 h-8 rounded-full"
        disabled={to >= rowCount}
        onClick={() => _onPageChange(pageCount - 1)}
      >
        <Icon>last_page_outlined</Icon>
      </Button>
    </div>

  </div>;
};

BPagination.defaultProps = {
  currentPage: 0,
  rowsPerPage: 10,
  rowCount: 0,
  onChangePage: () => { },
  rowsPerPageOptions: [],
  onChangeRowsPerPage: () => { },
  emitPaginationChange: () => { },
};

export default BPagination;