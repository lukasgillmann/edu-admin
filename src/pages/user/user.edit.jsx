import { Autocomplete, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { useMemo, useState, useEffect } from "react";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode, getCountries } from "react-phone-number-input/input";
import en from 'react-phone-number-input/locale/en.json';

import { BCustomPhoneInput } from "../../components";
import { VButton, VDropZone, VFormItem, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionRegisteredUserEdit, actionUserList } from "../../context/action";
import { numberInputs } from "../../utils/tool";
import PaginationFetcher from "../PaginationFetcher";
import { COUNTRY_LIST, SKILL_SETS } from "../../utils/string";

const UserEdit = () => {

  const { page, pageSize, userId } = numberInputs(useParams());
  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { users, loadedEditUserInfo } = controller;
  const [avatar, setAvatar] = useState('');
  const [cover, setCover] = useState('');

  const currUser = useMemo(() => users.page === page && users.page_size === pageSize ? users.data.find(v => v.id === userId) || {} : {}, [page, pageSize, users, userId]);

  const phoneCountries = useMemo(() => {
    const data = {};
    getCountries().map(country => data[country] = `${en[country]} +${getCountryCallingCode(country)}`);
    return data;
  }, []);

  useEffect(() => {
    setAvatar(currUser.avatar);
    setCover(currUser.cover);
  }, [currUser.avatar, currUser.cover]);

  const onSubmit = (values) => {
    const obj = JSON.parse(JSON.stringify(values));
    obj.avatar = avatar?.replace(/\?(\d)+$/g, '') || '';
    obj.cover = cover?.replace(/\?(\d)+$/g, '') || '';
    obj.skills = obj.skills || [];

    actionRegisteredUserEdit(dispatch, { id: userId, data: obj }, t);
  };

  const formik = useFormik({
    initialValues: {
      first_name: currUser.first_name || '',
      last_name: currUser.last_name || '',
      ssn_number: currUser.ssn_number || '',
      gender: currUser.gender || 'm',
      email: currUser.email || '',
      phone_number: currUser.phone_number || '',
      country: currUser.country || '',
      state: currUser.state || '',
      city: currUser.city || '',
      postal_code: currUser.postal_code || '',
      location: currUser.location || '',
      role: currUser.role || '',
      skills: SKILL_SETS.filter(v => currUser.skills?.includes(v)) || [],
      university: currUser.university || '',
      degree: currUser.degree || '',
    },
    enableReinitialize: true,
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

    <PaginationFetcher page={page} pageSize={pageSize} list={users} action={actionUserList} />

    <VDropZone
      key={currUser.username}
      url={cover}
      setUrl={url => setCover(`${url}?${new Date().getTime()}`)}
      filename={currUser.username + '.png'}
      disabled={!currUser.username}
      directory="cover"
      accept="image/*"
      className="w-full h-64"
    >
      <div className="opacity-40 flex flex-col justify-center items-center">
        <Icon icon="bi:cloud-arrow-up-fill" className="text-5xl" />
        <VText>{t('Upload New Image')}</VText>
      </div>
    </VDropZone>

    <VText className="text-2xl mt-6" div>{t('Profile Picture')}</VText>
    <VText color="secondary" className="text-sm flex items-center">
      {t('We recommend on image of at least 500 * 500. You can upload a PNG or JPG under 10MB.')}
    </VText>

    <div className="flex items-center mt-5 flex-wrap justify-center md:justify-start">
      <VDropZone
        key={currUser.username}
        url={avatar}
        setUrl={url => setAvatar(`${url}?${new Date().getTime()}`)}
        filename={currUser.username + '.png'}
        disabled={!currUser.username}
        directory="avatar"
        accept="image/*"
        className="w-32 h-32 rounded-full overflow-hidden m-2"
        hideClose showButtons isDelete={false}
      >
        <div className="opacity-10 flex flex-col justify-center items-center">
          <Icon icon="fa6-regular:image" className="text-5xl" />
        </div>
      </VDropZone>
    </div>

    <div className="mt-5">

      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2} className="md:w-8/12">
          <Grid item xs={12}>
            <VText className="text-2xl font-bold">{t('Personal Information')}</VText>
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
            <VFormItem formik={formik} label={t("SSN Number")} name="ssn_number">
              <TextField name="ssn_number" size="small" value={formik.values.ssn_number} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Gender")} name="gender" required>
              <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
                <FormControlLabel value="m" control={<Radio color="secondary" />} label={<VText>{t('Male')}</VText>} />
                <FormControlLabel value="f" control={<Radio color="secondary" />} label={<VText>{t('Female')}</VText>} />
              </RadioGroup>
            </VFormItem>
          </Grid>

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
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Postal Code")} name="postal_code">
              <TextField name="postal_code" size="small" value={formik.values.postal_code} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={12}>
            <VFormItem formik={formik} label={t("Address")} name="location">
              <TextField name="location" size="small" value={formik.values.location} onChange={formik.handleChange} rows={3} multiline className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

          <Grid item xs={12} className="mt-4">
            <VText className="text-2xl font-bold">{t('Professional Information')}</VText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Role")} name="role">
              <TextField name="role" size="small" value={formik.values.role} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={12}>
            <VFormItem formik={formik} label={t("Skills")} name="skills">
              <Autocomplete
                className="w-full"
                multiple
                disableCloseOnSelect
                options={SKILL_SETS}
                getOptionLabel={(option) => t(option)}
                value={formik.values.skills}
                onChange={(_, vals) => formik.setFieldValue('skills', vals)}
                defaultValue={[]}
                isOptionEqualToValue={(opt, val) => opt === val}
                renderOption={(cProps, option, { selected }) => <MenuItem {...cProps}><Checkbox style={{ marginRight: 8 }} checked={selected} />{t(option)}</MenuItem>}
                renderInput={(params) => <TextField {...params} color="secondary" />}
              />
            </VFormItem>
          </Grid>

          <Grid item xs={12} className="mt-4">
            <VText className="text-2xl font-bold">{t('Educational Information')}</VText>
          </Grid>
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Education Institution")} name="university">
              <TextField name="university" size="small" value={formik.values.university} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Degree")} name="degree">
              <TextField name="degree" size="small" value={formik.values.degree} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>
          <Grid item xs={12} className="flex justify-center md:justify-end">
            <VButton variant="contained" color="primary" type="submit" className="h-min text-sm normal-case" loading={!loadedEditUserInfo}>{t('Save')}</VButton>
          </Grid>

        </Grid>
      </form>
    </div>
  </div>;
};

export default UserEdit;