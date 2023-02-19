import { Box, Grid, TextField } from "@mui/material";
import { useMemo, useRef } from "react";
import { Icon } from '@iconify/react';
import { useFormik } from "formik";
import * as Yup from 'yup';
import ReactToPdf from "react-to-pdf";
import { useTranslation } from 'react-i18next';
import PhoneInput from "react-phone-number-input";
import { getCountryCallingCode, getCountries } from "react-phone-number-input/input";
import en from 'react-phone-number-input/locale/en.json';

import { BCustomPhoneInput } from "../../components";
import { VButton, VFormItem, VImage, VText } from "../../form";
import { useAsterController } from "../../context";
import { actionCertificateVariableEdit } from "../../context/action";

const Certificate = () => {

  const { t } = useTranslation('common');

  const [controller, dispatch] = useAsterController();
  const { user, themes, certVar, loadedCertVarEdit } = controller;

  const ref = useRef(null);
  const phoneCountries = useMemo(() => {
    const data = {};
    getCountries().map(country => data[country] = `${en[country]} +${getCountryCallingCode(country)}`);
    return data;
  }, []);
  const logoUrl = useMemo(() => `${process.env.REACT_APP_LOGO_URL}?${new Date().getTime()}`, []);
  const certificateUrl = useMemo(() => `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/assets/certificate_template.png`, []);
  const shadowUrl = useMemo(() => `${process.env.REACT_APP_S3_ASSET_ENDPOINT}/assets/certificate_shadow.png`, []);
  const signatureUrl = useMemo(() => `${user.signature_url}?${new Date().getTime()}`, [user.signature_url]);

  const objectives = [
    'objective 1',
    'objective 2',
    'objective 3',
    'objective 4',
  ];

  const colorMain1 = useMemo(() => themes.find(v => v.name === 'color_main1')?.value || '#F76060', [themes]);

  const onSubmit = (values) => actionCertificateVariableEdit(dispatch, values, t);

  const formik = useFormik({
    initialValues: {
      location: certVar.location || '',
      phone_number: certVar.phone_number || '',
      contact_email: certVar.contact_email || '',
      siret_number: certVar.siret_number || '',
      sign_top: certVar.sign_top || '',
      sign_bottom: certVar.sign_bottom || ''
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      location: Yup.string().required(t('This field is required')),
      phone_number: Yup.string().required(t('This field is required')),
      contact_email: Yup.string().required(t('This field is required')),
      siret_number: Yup.string().required(t('This field is required')),
      sign_top: Yup.string().required(t('This field is required')),
      sign_bottom: Yup.string().required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  return <Box className="p-4 md:p-8">
    <form onSubmit={formik.handleSubmit}>

      <Box className="flex items-center flex-wrap mt-6">
        <Box>
          <VText className="text-2xl" div>{t('Certificate Template')}</VText>
          <VText color="secondary" className="text-sm">
            {t("The certificate issued to your learners which will include all the details of the course taken")}
          </VText>
        </Box>
        <Box className="mr-auto sm:mr-0 ml-auto my-2">
          <ReactToPdf targetRef={ref} filename="certificate-ex.pdf" options={{ orientation: 'portrait', unit: 'px' }}>
            {({ toPdf }) =>
              <VButton onClick={() => toPdf()} color="primary" variant="contained">
                <Icon icon="eva:download-fill" />&nbsp;{t("Download a specimen")}
              </VButton>
            }
          </ReactToPdf>

          <VButton variant="contained" className="ml-4" type="submit" loading={!loadedCertVarEdit}>
            <Icon icon="ant-design:save-outlined" className="text-xl" />&nbsp;{t("Save")}
          </VButton>
        </Box>
      </Box>

      <Box className="mt-5">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Address")} name="location" required>
              <TextField name="location" size="small" value={formik.values.location} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Phone Number")} name="phone_number" required>
              <PhoneInput name="phone_number" value={formik.values.phone_number} onChange={val => formik.setFieldValue('phone_number', val)} defaultCountry="FR" initialValueFormat="national" labels={phoneCountries} inputComponent={BCustomPhoneInput} />
            </VFormItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Contact Email")} name="contact_email" required>
              <TextField name="contact_email" size="small" value={formik.values.contact_email} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Siret Number")} name="siret_number" required>
              <TextField name="siret_number" size="small" value={formik.values.siret_number} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Made in")} name="sign_top" required>
              <TextField name="sign_top" size="small" value={formik.values.sign_top} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

          <Grid item xs={12} sm={6}>
            <VFormItem formik={formik} label={t("Legal Responsible")} name="sign_bottom" required>
              <TextField name="sign_bottom" size="small" value={formik.values.sign_bottom} onChange={formik.handleChange} className="w-full" color="secondary" />
            </VFormItem>
          </Grid>

        </Grid>
      </Box>
    </form>

    <Box className="mt-8">
      <Box className="w-full mx-auto" sx={{ overflowY: 'clip' }}>
        <Box ref={ref} className="mx-auto border border-solid border-gray-500 relative" width="800px">
          <Box className="w-full" paddingBottom="141.5%" />

          <img src={certificateUrl} alt="" className="absolute left-0 top-0 w-full" crossOrigin="anonymous" />

          <Box className="fv-mont absolute left-0 right-0 top-0 bottom-0 text-black m-8 border border-2 border-solid p-6 flex flex-col" sx={{ fontSize: '0.8rem', textShadow: '2px 2px 5px #aaa', borderColor: colorMain1 }} >
            <Box className="relative flex-1" sx={{ overflowY: 'clip' }}>
              <Box className="w-full flex justify-center mt-6" height="10%">
                <Box component="img" src={logoUrl} crossOrigin="anonymous" height="100px" />
              </Box>


              <Box className="flex flex-col items-center mt-10" height="10%" fontSize="2.8rem">
                <Box>Certificat de réalisation</Box>
                <Box className="w-1/4 h-1.5 border-b-0" sx={{ borderLeft: '300px solid transparent', borderRight: '300px solid transparent', borderTop: `5px solid ${colorMain1} ` }} />
              </Box>


              <Box>
                <Box className="mt-2">Participant : <b>{`{{STUDENT_NAME}}`}</b></Box>
                <Box className="mt-2">
                  Intitulé de la formation :  <b>Formation 100% en ligne - {`{{COURSE_TITLE}}`}</b>
                </Box>
                <Box className="mt-2">Dates de la session : du <b>{`{{RUN_START}}`}</b> au <b>{`{{RUN_END}}`}</b></Box>
                <Box className="mt-2">Lieu de formation : <b>Distanciel</b></Box>
              </Box>

              <Box className="mt-8">
                <Box className="mt-4"><b>Objectifs de la formation : </b></Box>
                {
                  objectives.map(v => <Box className="mt-2 flex items-center" key={v}>
                    <Icon icon="bx:right-arrow" />&nbsp;{v}
                  </Box>)
                }
              </Box>

              <Box textAlign="center" mt={5}>
                <Box>Nature de l&apos;action concourant au développement des compétences:</Box>
                <Box className="mt-2"><b>Action de formation</b></Box>
              </Box>

              <Box className="my-6 relative h-32">
                <img src={shadowUrl} className="w-full h-32" alt="" crossOrigin="anonymous" />

                <Box className="px-2.5 py-5 flex flex-col justify-center rounded-lg text-white leading-relaxed absolute top-0" style={{ width: 'calc(100% - 10px)', height: '120px', backgroundColor: colorMain1 }}>
                  <Box>
                    {process.env.REACT_APP_SITE_DISPLAY_NAME} atteste que <b>{`{{STUDENT_NAME}}`}</b> a suivi la formation <b>{`{{COURSE_TITLE}}`}</b>
                  </Box>
                  <Box>du {`{{RUN_START}}`} au {`{{RUN_END}}`}.</Box>
                  <Box><b>Nombre d&apos;heures réalisées :</b> {`{{DURATION}}`} h</Box>
                </Box>
              </Box>

              <Box className="flex w-full justify-center items-center mt-2 text-center leading-5">
                {formik.values.comment}
              </Box>
            </Box>

            <Box className="flex justify-between">
              <Box className="border border-solid p-5 text-xs mt-auto" style={{ borderColor: colorMain1 }}>
                <Box className="flex"><Icon icon="ci:location" />&nbsp;{formik.values.location}</Box>
                <Box className="flex mt-2"><Icon icon="bxs:phone" />&nbsp;{formik.values.phone_number}</Box>
                <Box className="flex mt-2"><Icon icon="ic:baseline-email" />&nbsp;{formik.values.contact_email}</Box>
                <Box className="flex mt-2"><b>SIRET :</b>&nbsp;{formik.values.siret_number}</Box>
              </Box>
              <Box className="flex flex-col ml-auto items-center mt-auto">
                <Box>{formik.values.sign_top} {`{{CREATE_DATE}}`}</Box>
                <Box className="my-6">
                  <VImage src={signatureUrl} alt="signature" crossOrigin="anonymous" className="h-16" />
                </Box>
                <Box>{formik.values.sign_bottom}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  </Box>;
};

export default Certificate;