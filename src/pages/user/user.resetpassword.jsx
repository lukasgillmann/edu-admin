import { Grid, TextField } from "@mui/material";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import * as Yup from 'yup';

import { useAsterController } from "../../context";
import { actionRegisteredUserPwdEdit } from "../../context/action";
import { VButton, VFormItem, VText } from "../../form";
import { getUserName } from "../../utils/string";

const UserResetPassword = (props) => {

  const { userIdx, setOpen } = props;
  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { user, users, loadedEditUserPwd } = controller;

  const onSubmit = (values) => {
    actionRegisteredUserPwdEdit(dispatch, { user_id: users.data[userIdx].id, new_password: values.password }, t);
    setOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirm: '',
    },
    validationSchema: Yup.object({
      password: Yup.string().required(t('This field is required')),
      confirm: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <div className="p-4 md:p-8">
    <VText className="text-2xl font-bold" div>{t('Change Password')}</VText>
    <VText color="secondary" className="text-sm" div>
      {t('You are about to resend email with login credential to')}&nbsp;<b>{getUserName(users.data[userIdx])}</b>
    </VText>
    <div className="mt-5">
      {
        ['SUPERADMIN', 'STAFF'].indexOf(user.permission) >= 0 ?
          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <VFormItem formik={formik} label={t('New Password')} name="password" required>
                  <TextField name="password" size="small" value={formik.values.password} onChange={formik.handleChange} className="w-full" color="secondary" type="password" />
                </VFormItem>
              </Grid>
              <Grid item xs={12}>
                <VFormItem formik={formik} label={t('Confirm Password')} name="confirm" required>
                  <TextField name="confirm" size="small" value={formik.values.confirm} onChange={formik.handleChange} className="w-full" color="secondary" type="password" />
                </VFormItem>
              </Grid>
              <Grid item xs={12} className="flex justify-center md:justify-start">
                <VButton variant="contained" color="primary" type="submit" className="h-min text-sm normal-case w-full" loading={!loadedEditUserPwd}>
                  {t('Change')}
                </VButton>
              </Grid>
            </Grid>
          </form>
          :
          <VButton variant="contained" color="primary" type="submit" className="h-min text-sm normal-case w-full" loading={!loadedEditUserPwd} onClick={() => onSubmit({})}>
            {t('Change')}
          </VButton>
      }

    </div>
  </div>;
};

export default UserResetPassword;