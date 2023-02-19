import { Icon } from "@iconify/react";
import { IconButton, Tooltip, Typography } from "@mui/material";
import VText from "./VText";

const VFormItem = (props) => {

  const { label, required, name, formik, children, tooltip } = props;

  return <div className={formik.touched[name] && formik.errors[name] ? "v-formik-error" : ""}>
    {
      label && <div className="mb-2">
        <VText>{label}</VText>
        {required && <VText className="text-red-500" color="custom">&nbsp;*</VText>}
        {
          tooltip && <Tooltip arrow title={tooltip || ''} placement="top-start" enterDelay={200} leaveDelay={200}>
            <IconButton className="ml-2 align-middle mt-0 p-0" color="secondary">
              <Icon icon="fe:question" className="text-lg" />
            </IconButton>
          </Tooltip>
        }
      </div>
    }

    {children}
    {formik.touched[name] && formik.errors[name] ? <Typography color="error" className="text-sm">{formik.errors[name]}</Typography> : null}
  </div>;
};

export default VFormItem;