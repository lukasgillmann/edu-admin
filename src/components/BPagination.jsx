import { Icon, Box, Button, TextField } from "@mui/material";
import { useMemo, useState } from "react";
import VText from '../form/VText';
import VSelect from '../form/VSelect';

const PAGE_SIZE_OPTIONS = [
  { value: 5, label: '5' },
  { value: 10, label: '10' },
  { value: 20, label: '20' },
];

const BPagination = (props) => {

  const { total, onPageChange, onPageSizeChange, page, pageSize } = props;

  const [inputPage, setInputPage] = useState(page);

  const pageCount = useMemo(() => Math.ceil(total / pageSize), [total, pageSize]);
  const startIndex = useMemo(() => (page - 1) * pageSize + 1, [page, pageSize]);
  const endIndex = useMemo(() => page * pageSize < total ? page * pageSize : total, [page, pageSize, total]);

  const _onPageChange = (page, size) => {
    setInputPage(page);
    onPageChange(page, size);
  };

  const _onPageSizeChange = (size) => {
    _onPageChange(1, size);
    onPageSizeChange(page, size);
  };

  const onKeyDown = (event) => {
    if (event.key === 'Enter') {
      _onPageChange(inputPage && inputPage > 0 ? Number(inputPage) : 1, pageSize);
    }
  };

  const onInputChange = (e) => {
    if (e.target.value > pageCount || (e.target.value !== '' && e.target.value <= 0)) return;
    setInputPage(e.target.value);
  };

  return <td className="flex items-center w-full px-2">
    <VText>{startIndex} ~ {endIndex} / {total}</VText>

    <VText className="ml-auto">Per Page:</VText>
    <VSelect
      className="text-sm p-1.5 text-center v-per-page-select"
      option={pageSize}
      setOption={_onPageSizeChange}
      items={PAGE_SIZE_OPTIONS}
      size="small"
    />
    <Button
      variant="text"
      color="primary"
      className="p-0 min-w-0 w-8 h-8 rounded-full"
      {...(page === 1 ? { disabled: true } : {})}
      onClick={() => _onPageChange(1, pageSize)}
    >
      <Icon>first_page_outlined</Icon>
    </Button>
    <Button
      variant="text"
      color="primary"
      className="p-0 min-w-0 w-8 h-8 rounded-full"
      {...(page === 1 ? { disabled: true } : {})}
      onClick={() => _onPageChange(page - 1, pageSize)}
    >
      <Icon>chevron_left_outlined</Icon>
    </Button>

    {
      pageCount <= 5 ?
        [...Array(pageCount).keys()].map(v =>
          <Button
            key={v}
            variant={page === v + 1 ? "contained" : "text"}
            color="primary"
            className="p-0 min-w-0 w-8 h-8 rounded-full"
            disableElevation
            onClick={() => _onPageChange(v + 1, pageSize)}
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
      color="primary"
      className="p-0 min-w-0 w-8 h-8 rounded-full"
      {...(page === pageCount ? { disabled: true } : {})}
      onClick={() => _onPageChange(page + 1, pageSize)}
    >
      <Icon>chevron_right_outlined</Icon>
    </Button>
    <Button
      variant="text"
      color="primary"
      className="p-0 min-w-0 w-8 h-8 rounded-full"
      {...(page === pageCount ? { disabled: true } : {})}
      onClick={() => _onPageChange(pageCount, pageSize)}
    >
      <Icon>last_page_outlined</Icon>
    </Button>

  </td>;
};

BPagination.defaultProps = {
  onPageChange: () => { },
  onPageSizeChange: () => { }
};

export default BPagination;