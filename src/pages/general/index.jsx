import { FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { VButton, VDropZone, VFormItem, VText } from "../../form";
import { useEffect, useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode, getCountries } from "react-phone-number-input/input";
import en from 'react-phone-number-input/locale/en.json';

import { BCustomPhoneInput } from "../../components";
import { useAsterController } from "../../context";
import { actionEditAccount } from "../../context/action";
import { COUNTRY_LIST } from "../../utils/string";

const General = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { user, loadedCurrUserUpdate } = controller;

  const [avatar, setAvatar] = useState('');
  const [signature, setSignature] = useState('');
  const phoneCountries = useMemo(() => {
    const data = {};
    getCountries().map(country => data[country] = `${en[country]} +${getCountryCallingCode(country)}`);
    return data;
  }, []);

  useEffect(() => {
    setAvatar(`${user.avatar}?${new Date().getTime()}`);
    setSignature(user.signature_url);
  }, [user.avatar, user.signature_url]);

  const onSubmit = (values) => {

    const obj = JSON.parse(JSON.stringify(values));
    obj.avatar = avatar ? avatar.replace(/\?(\d)+$/g, '') : '';
    obj.signature_url = signature ? signature.replace(/\?(\d)+$/g, '') : '';
    obj.skills = obj.skills ? obj.skills.map(v => v.value) : [];

    actionEditAccount(dispatch, obj, t);
  };

  const formik = useFormik({
    initialValues: {
      first_name: user.first_name || '',
      last_name: user.last_name || '',
      gender: user.gender || 'm',
      bio: user.bio || '',
      email: user.email || '',
      phone_number: user.phone_number || '',
      fax: user.fax || '',
      country: user.country || 'FR',
      state: user.state || '',
      city: user.city || '',
      postal_code: user.postal_code || '',
      location: user.location || '',
      website: user.website || '',
      company: user.company || '',
      func: user.func || '',
      legal_form: user.legal_form || '',
      capital: user.capital || '',
      currency: user.currency || '',
      activity_declaration_number: user.activity_declaration_number || '',
      region: user.region || '',
      siret_number: user.siret_number || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      first_name: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      last_name: Yup.string().required(t('This field is required')),
      email: Yup.string().email(t('Invalid email address')).required(t('This field is required')),
      phone_number: Yup.string().required(t('This field is required')),
      country: Yup.string().required(t('This field is required')),
      city: Yup.string().required(t('This field is required')),
      postal_code: Yup.string().required(t('This field is required')),
      siret_number: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <div className="p-4 md:p-8">
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} className="md:w-8/12">
        <Grid item xs={12}>
          <VText className="text-lg mt-6" div>{t("Main administrator profile picture")}</VText>
          <VText color="secondary" className="text-sm flex items-center">
            {t("We recommend on image of at least 500 * 500. You can upload a PNG or JPG under 10MB.")}
          </VText>

          <div className="flex items-center mt-5 flex-wrap justify-center md:justify-start">
            <VDropZone
              key={user.username}
              url={avatar}
              setUrl={url => setAvatar(`${url}?${new Date().getTime()}`)}
              filename={user.username + '.png'}
              disabled={!user.username}
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
        </Grid>

        {/************************************* Personal Info ****************************************/}
        <Grid item xs={12}>
          <VText className="text-2xl font-bold">{t("Personal Information")}</VText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("First Name")} name="first_name" required>
            <TextField name="first_name" size="small" value={formik.values.first_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Last Name")} name="last_name" required>
            <TextField name="last_name" size="small" value={formik.values.last_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Gender")} name="gender" required>
            <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="m" control={<Radio color="secondary" />} label={<VText>{t("Male")}</VText>} />
              <FormControlLabel value="f" control={<Radio color="secondary" />} label={<VText>{t("Female")}</VText>} />
            </RadioGroup>
          </VFormItem>
        </Grid>

        {/************************************* Contact Info ****************************************/}
        <Grid item xs={12} className="mt-4">
          <VText className="text-2xl font-bold">{t("Contact Information")}</VText>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Email")} name="email" required>
            <TextField name="email" size="small" value={formik.values.email} onChange={formik.handleChange} className="w-full" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Phone Number")} name="phone_number" required>
            <PhoneInput name="phone_number" value={formik.values.phone_number} onChange={val => formik.setFieldValue('phone_number', val)} defaultCountry="FR" initialValueFormat="national" labels={phoneCountries} inputComponent={BCustomPhoneInput} />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Fax")} name="fax">
            <TextField name="fax" size="small" value={formik.values.fax} onChange={formik.handleChange} className="w-full" color="secondary" />
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
          <VFormItem formik={formik} label={t("City")} name="city" required>
            <TextField name="city" size="small" value={formik.values.city} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Postal Code")} name="postal_code" required>
            <TextField name="postal_code" size="small" value={formik.values.postal_code} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Address")} name="location">
            <TextField name="location" size="small" value={formik.values.location} onChange={formik.handleChange} rows={3} multiline className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Website")} name="website">
            <TextField name="website" size="small" value={formik.values.website} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Company")} name="company">
            <TextField name="company" size="small" value={formik.values.company} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Function")} name="func">
            <TextField name="func" size="small" value={formik.values.func} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>

        {/************************************* Legal Info ****************************************/}
        <Grid item xs={12} className="mt-4">
          <VText className="text-2xl font-bold">{t('Legal Form')}</VText>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Legal Form")} name="legal_form" required>
            <TextField name="legal_form" size="small" value={formik.values.legal_form} onChange={formik.handleChange} rows={3} multiline className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Capital")} name="capital">
            <TextField name="capital" size="small" value={formik.values.capital} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Currency")} name="currency">
            <TextField name="currency" size="small" value={formik.values.currency} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Activity Declaration Number")} name="activity_declaration_number">
            <TextField name="activity_declaration_number" size="small" value={formik.values.activity_declaration_number} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Region")} name="region">
            <TextField name="region" size="small" value={formik.values.region} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Siret Number")} name="siret_number" required>
            <TextField name="siret_number" size="small" value={formik.values.siret_number} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>

        {/************************************* Signature ****************************************/}
        <Grid item xs={12} className="mt-4">
          <VText className="text-2xl font-bold">{t('Signature')}</VText>
        </Grid>
        <Grid item xs={12} sm={12} md={12} xl={6}>
          <VDropZone
            key={user.username}
            url={signature}
            setUrl={url => setSignature(`${url}?${new Date().getTime()}`)}
            filename={user.username + '.png'}
            disabled={!user.username}
            directory="signature"
            accept="image/*"
            className="w-full h-32 overflow-hidden"
            isDelete={false}
          >
            <div className="opacity-10 flex flex-col justify-center items-center">
              <Icon icon="bi:cloud-arrow-up-fill" className="text-5xl" />
            </div>
          </VDropZone>
        </Grid>
        <Grid item xs={12} sm={6} />

        <Grid item xs={12} className="flex justify-center md:justify-end">
          <VButton variant="contained" color="primary" type="submit" className="h-min text-sm" loading={!loadedCurrUserUpdate}>{t('Save')}</VButton>
        </Grid>

      </Grid>
    </form>
  </div >;
};

export default General;