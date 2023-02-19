import { FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode, getCountries } from "react-phone-number-input/input";
import en from 'react-phone-number-input/locale/en.json';

import { BCustomPhoneInput } from "../../components";
import { VButton, VDropZone, VFormItem, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionCoachCreate } from "../../context/action";
import { COUNTRY_LIST } from "../../utils/string";

const CoachAdd = () => {
  const { t } = useTranslation('common');

  const navigate = useNavigate();

  const [controller, dispatch] = useAsterController();
  const { loadedCoachCreate } = controller;

  const [url, setUrl] = useState('');
  const [waiting, setWaiting] = useState(false);
  const phoneCountries = useMemo(() => {
    const data = {};
    getCountries().map(country => data[country] = `${en[country]} +${getCountryCallingCode(country)}`);
    return data;
  }, []);

  useEffect(() => loadedCoachCreate && waiting && navigate('/user/coaches'), [loadedCoachCreate, waiting, navigate]);

  const onSubmit = (values) => {

    const obj = JSON.parse(JSON.stringify(values));
    obj.avatar = url?.replace(/\?(\d)+$/g, '') || '';

    actionCoachCreate(dispatch, obj, t);
    setWaiting(true);
  };

  const formik = useFormik({
    initialValues: {
      first_name: '',
      last_name: '',
      gender: 'm',
      year_of_birth: '2022',
      bio: '',
      email: '',
      phone_number: '',
      country: '',
      state: '',
      city: '',
    },
    validationSchema: Yup.object({
      first_name: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      last_name: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      gender: Yup.string().oneOf(['m', 'f'], t('Options is invalid')).required(t('This field is required')),
      email: Yup.string().email(t('Invalid email address')).required(t('This field is required')),
      phone_number: Yup.string().matches(/\+[0-9]+/, t('Phone number is not valid')),
    }),
    onSubmit: onSubmit
  });

  return <div className="p-4 md:p-8">
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} className="md:w-8/12">

        {/******************************** Personal Information ********************************/}
        <Grid item xs={12}>
          <VText className="text-2xl font-bold">{t('Coach Information')}</VText>
        </Grid>

        <Grid item xs={12}>
          <VText className="text-lg" div>{t('Profile Picture')}</VText>
          <VText color="secondary" className="text-sm flex items-center">
            {t("We recommend on image of at least 500 * 500. You can upload a PNG or JPG under 10MB. Once image is uploaded, do not change user ID!")}
          </VText>

          <div className="flex justify-center md:justify-start items-center flex-wrap mt-3">
            <VDropZone
              url={url}
              setUrl={url => setUrl(`${url}?${new Date().getTime()}`)}
              directory='coach'
              accept="image/*"
              className="w-32 h-32 rounded-full overflow-hidden m-2"
              hideClose showButtons
            >
              <div className="opacity-10 flex flex-col justify-center items-center">
                <Icon icon="fa6-regular:image" className="text-5xl" />
              </div>
            </VDropZone>
          </div>
        </Grid>
        <Grid item xs={6}>
          <VFormItem formik={formik} label={t("First Name")} name="first_name" required>
            <TextField name="first_name" size="small" value={formik.values.first_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={6}>
          <VFormItem formik={formik} label={t("Last Name")} name="last_name" required>
            <TextField name="last_name" size="small" value={formik.values.last_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Year of Birth")} name="year_of_birth">
            <TextField name="year_of_birth" size="small" value={formik.values.year_of_birth} onChange={formik.handleChange} className="w-full" color="secondary" type="number" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Gender")} name="gender" required>
            <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="m" control={<Radio color="secondary" />} label={<VText>{t("Male")}</VText>} />
              <FormControlLabel value="f" control={<Radio color="secondary" />} label={<VText>{t("Female")}</VText>} />
            </RadioGroup>
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Biography")} name="bio" required>
            <TextField name="bio" size="small" value={formik.values.bio} onChange={formik.handleChange} className="w-full" color="secondary" multiline rows={3} />
          </VFormItem>
        </Grid>

        {/******************************** Contact Information ********************************/}
        <Grid item xs={12} className="mt-4">
          <VText className="text-2xl font-bold">{t('Contact Information')}</VText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Email")} name="email" required>
            <TextField name="email" size="small" value={formik.values.email} onChange={formik.handleChange} className="w-full" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Phone Number")} name="phone_number">
            <PhoneInput name="phone_number" value={formik.values.phone_number} onChange={val => formik.setFieldValue('phone_number', val)} defaultCountry="FR" initialValueFormat="national" labels={phoneCountries} inputComponent={BCustomPhoneInput} />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Country")} name="country" required>
            <Select name="country" size="small" value={formik.values.country} onChange={e => { formik.setFieldValue('country', e.target.value); formik.setFieldValue('state', ''); }} className="w-full" color="secondary" >
              {COUNTRY_LIST.map(v => <MenuItem key={v.name} value={v.code}>{v.name}</MenuItem>)}
            </Select>
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("State")} name="state">
            <Select name="state" size="small" value={formik.values.state} onChange={formik.handleChange} className="w-full" color="secondary" disabled={!COUNTRY_LIST.find(v => v.code === formik.values.country)}>
              {(COUNTRY_LIST.find(v => v.code === formik.values.country) || { state: [] }).state.map(v => <MenuItem key={v} value={v}>{v}</MenuItem>)}
            </Select>
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("City")} name="city">
            <TextField name="city" size="small" value={formik.values.city} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>

        <Grid item xs={12} className="flex justify-center md:justify-end">
          <VButton variant="contained" color="primary" type="submit" className="h-min text-sm" loading={!loadedCoachCreate}>{t('Create')}</VButton>
          <Link to={`/user/coaches`} className="no-underline ml-4">
            <VButton variant="outlined" color="secondary" type="submit" className="h-min text-sm">{t('Cancel')}</VButton>
          </Link>
        </Grid>

      </Grid>
    </form>
  </div>;
};

export default CoachAdd;