import { Autocomplete, Checkbox, FormControlLabel, Grid, MenuItem, Radio, RadioGroup, Select, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from 'react-i18next';
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode, getCountries } from "react-phone-number-input/input";
import en from 'react-phone-number-input/locale/en.json';

import { BCustomPhoneInput } from "../../components";
import { VButton, VDropZone, VFormItem, VText } from "../../form";
import { COUNTRY_LIST, generatePassword, SKILL_SETS } from "../../utils/string";
import { useAsterController } from "../../context";
import { actionRegisterUser, actionUserCourseListInit } from "../../context/action";
import UserDetailContent from "./user.detail.content";
import { useEffect } from "react";
import VPassword from "../../form/VPassword";
import { useMemo } from "react";

const UserRegister = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { loadedUserRegister, userId, user } = controller;

  const [url, setUrl] = useState('');
  const phoneCountries = useMemo(() => {
    const data = {};
    getCountries().map(country => data[country] = `${en[country]} +${getCountryCallingCode(country)}`);
    return data;
  }, []);

  useEffect(() => actionUserCourseListInit(dispatch), [dispatch]);

  const onSubmit = (values) => {

    const obj = JSON.parse(JSON.stringify(values));
    obj.avatar = url?.replace(/\?(\d)+$/g, '') || '';
    obj.skills = obj.skills.map(v => v.value);
    delete obj.confirm;

    actionRegisterUser(dispatch, obj, t);
  };

  const formik = useFormik({
    initialValues: {
      permission: 'USER',
      username: '',
      first_name: '',
      last_name: '',
      gender: 'm',
      email: '',
      phone_number: '',
      country: '',
      state: '',
      city: '',
      postal_code: '',
      location: '',
      role: '',
      skills: [],
      university: '',
      degree: '',
      password: '',
      confirm: ''
    },
    validationSchema: Yup.object({
      permission: Yup.string().oneOf(['USER', 'ADMIN', 'STAFF'], t('Options is invalid')).required(t('This field is required')),
      username: Yup.string().required(t('This field is required')),
      first_name: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      last_name: Yup.string().max(20, t('Must be 15 characters or less')).required(t('This field is required')),
      gender: Yup.string().oneOf(['m', 'f'], t('Options is invalid')).required(t('This field is required')),
      email: Yup.string().email(t('Invalid email address')).required(t('This field is required')),
      phone_number: Yup.string().matches(/\+[0-9]+/, t('Phone number is not valid')),
      password: Yup.string(),
      confirm: Yup.string().when('password', {
        is: password => (password ? true : false),
        then: Yup.string().oneOf([Yup.ref('password')], t("Password does not match!"))
      }),
    }),
    onSubmit: onSubmit
  });

  const onGeneratePassword = () => {
    const newPassword = generatePassword(8);
    formik.setFieldValue('password', newPassword);
    formik.setFieldValue('confirm', newPassword);

    setTimeout(() => {
      formik.setFieldTouched('password', true, true);
      formik.setFieldTouched('confirm', true, true);
    });
  };

  return <div className="p-4 md:p-8 md:pb-20">
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2} className="md:w-8/12">
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("User Role")} name="permission" required tooltip={t("The learner can only access the learner app.")}>
            <RadioGroup row name="permission" value={formik.values.permission} onChange={formik.handleChange}>
              <FormControlLabel value="USER" control={<Radio color="secondary" />} label={<VText>{t('Learner')}</VText>} />
              {['SUPERADMIN', 'STAFF'].includes(user.permission) && <FormControlLabel value="ADMIN" control={<Radio color="secondary" />} label={<VText>{t('Admin')}</VText>} />}
              {user.permission === 'SUPERADMIN' && <FormControlLabel value="STAFF" control={<Radio color="secondary" />} label={<VText>{t('Staff')}</VText>} />}
            </RadioGroup>
          </VFormItem>
        </Grid>


        {/******************************** Personal Information ********************************/}
        <Grid item xs={12}>
          <VText className="text-2xl font-bold">{t('Personal Information')}</VText>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("User ID")} name="username" required tooltip={t("The unique id of this user. Special characters and space are not allowed! User avatar will use this id. After the avatar is uploaded, please do not change this id!")}>
            <TextField name="username" size="small" value={formik.values.username} onChange={(val) => { formik.handleChange(val); setUrl(''); }} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VText className="text-lg" div>{t('Profile Picture')}</VText>
          <VText color="secondary" className="text-sm flex items-center">
            {t("We recommend on image of at least 500 * 500. You can upload a PNG or JPG under 10MB. Once image is uploaded, do not change user ID!")}
          </VText>

          <div className="flex justify-center md:justify-start items-center flex-wrap mt-3">
            <VDropZone
              key={formik.values.username}
              url={url}
              setUrl={url => setUrl(`${url}?${new Date().getTime()}`)}
              filename={formik.values.username + '.png'}
              disabled={!formik.values.username}
              directory='avatar'
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
        <Grid item xs={6}>
          <VFormItem formik={formik} label={t("First Name")} name="first_name" required tooltip={t("First name of the user")}>
            <TextField name="first_name" size="small" value={formik.values.first_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={6}>
          <VFormItem formik={formik} label={t("Last Name")} name="last_name" required tooltip={t("Last name of the user")}>
            <TextField name="last_name" size="small" value={formik.values.last_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>
        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Gender")} name="gender" required tooltip={t("Gender of the user")}>
            <RadioGroup row name="gender" value={formik.values.gender} onChange={formik.handleChange}>
              <FormControlLabel value="m" control={<Radio color="secondary" />} label={<VText>{t("Male")}</VText>} />
              <FormControlLabel value="f" control={<Radio color="secondary" />} label={<VText>{t("Female")}</VText>} />
            </RadioGroup>
          </VFormItem>
        </Grid>
        {
          user.permission === 'SUPERADMIN' && <>
            <Grid item xs={5}>
              <VFormItem formik={formik} label={t("Password")} name="password" required tooltip={t("You can randomly generate a password with the button on the right.")}>
                <VPassword
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  className="w-full"
                  inputClassName="py-2"
                />
              </VFormItem>
            </Grid>
            <Grid item xs={5}>
              <VFormItem formik={formik} label={t("Confirm")} name="confirm" required>
                <VPassword
                  name="confirm"
                  value={formik.values.confirm}
                  onChange={formik.handleChange}
                  className="w-full"
                  inputClassName="py-2"
                />
              </VFormItem>
            </Grid>
            <Grid item xs={2} className="">
              <VButton iconOnly onClick={onGeneratePassword} className="mt-7" color="secondary">
                <Icon icon="heroicons-solid:refresh" />
              </VButton>
            </Grid>
          </>
        }

        {/******************************** Contact Information ********************************/}
        <Grid item xs={12} className="mt-4">
          <VText className="text-2xl font-bold">{t('Contact Information')}</VText>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Email")} name="email" required tooltip={t("Email should be unique.")}>
            <TextField name="email" size="small" value={formik.values.email} onChange={formik.handleChange} className="w-full" />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Phone Number")} name="phone_number">
            <PhoneInput name="phone_number" value={formik.values.phone_number} onChange={val => formik.setFieldValue('phone_number', val)} defaultCountry="FR" initialValueFormat="national" labels={phoneCountries} inputComponent={BCustomPhoneInput} />
          </VFormItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Country")} name="country">
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

        {/******************************** Professional Information ********************************/}
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

        {/******************************** Educational Information ********************************/}
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
          <VButton variant="contained" color="primary" type="submit" className="h-min text-sm" loading={!loadedUserRegister} disabled={userId}>{t('Create')}</VButton>
          <Link to={`/user/learners`} className="no-underline ml-4">
            <VButton variant="outlined" color="secondary" type="submit" className="h-min text-sm">{t('Cancel')}</VButton>
          </Link>
        </Grid>

      </Grid>
    </form>
    <div className="mt-8">
      <div className="v-tour-courseassign" id="v-user-scrolltop">
        <VText className="text-2xl font-bold mb-8" div>{t('Assign Course')}</VText>
        <UserDetailContent userId={userId} key={userId} />
      </div>
    </div>

  </div>;
};

export default UserRegister;