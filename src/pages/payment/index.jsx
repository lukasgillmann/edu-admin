import { FormControlLabel, Radio, RadioGroup } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from 'react-i18next';

import { VButton, VImage, VText } from "../../form";

const Payment = () => {

  const { t } = useTranslation('common');

  const [type, setType] = useState('visa');

  const onChange = e => {
    setType(e.target.value);
  };

  return <div className="p-4 md:p-8">
    <div className="flex items-center">
      <div>
        <VText className="text-2xl" div>{t('Select Payment methods')}</VText>
        <VText color="secondary">{t("Choose your prefered payment methodes to use in our plateforms")}</VText>
      </div>
    </div>

    <div className="px-2">
      <RadioGroup row name="gender" value={type} onChange={onChange} className="mt-8 flex justify-center">
        <FormControlLabel
          value="visa"
          className="mt-2 border border-solid border-gray-100 dark:border-gray-500 rounded-lg p-2"
          control={<Radio color="primary" className="p-0 mr-2" />}
          label={
            <div className="flex items-center">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/icon-visa.svg`} className="w-12 dark:bg-gray-600 rounded mr-2" />
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/icon-bank.svg`} className="w-12" />
              <VText color="custom" className="text-gray-500">{t("Bank Card")}</VText>
            </div>
          }
        />
        <FormControlLabel
          value="paypal"
          className="mt-2 border border-solid border-gray-100 dark:border-gray-500 rounded-lg p-2"
          control={<Radio color="primary" className="p-0 mr-2" />}
          label={
            <div className="flex items-center">
              <VImage src="/assets/icon-paypal.svg" className="w-12 dark:bg-gray-600 rounded mr-2" />
              <VText color="custom" className="text-gray-500">{t("Paypal")}</VText>
            </div>
          }
        />
        <FormControlLabel
          value="google"
          className="mt-2 border border-solid border-gray-100 dark:border-gray-500 rounded-lg p-2"
          control={<Radio color="primary" className="p-0 mr-2" />}
          label={
            <div className="flex items-center">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/icon-google-pay.svg`} className="w-12 dark:bg-gray-600 rounded mr-2" />
              <VText color="custom" className="text-gray-500">{t("Google Pay")}</VText>
            </div>
          }
        />
        <FormControlLabel
          value="stripe"
          className="mt-2 border border-solid border-gray-100 dark:border-gray-500 rounded-lg p-2"
          control={<Radio color="primary" className="p-0 mr-2" />}
          label={
            <div className="flex items-center">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/icon-stripe.svg`} className="w-12 dark:bg-gray-600 rounded mr-2" />
              <VText color="custom" className="text-gray-500">{t("Stripe")}</VText>
            </div>
          }
        />
        <FormControlLabel
          value="apple"
          className="mt-2 border border-solid border-gray-100 dark:border-gray-500 rounded-lg p-2"
          control={<Radio color="primary" className="p-0 mr-2" />}
          label={
            <div className="flex items-center">
              <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/icon-apple-pay.svg`} className="w-12 dark:bg-gray-600 rounded mr-2" />
              <VText color="custom" className="text-gray-500">{t("Apple Pay")}</VText>
            </div>
          }
        />
      </RadioGroup>
    </div>

    <div className="my-7">
      <VText>{t("Content")}</VText>
    </div>

    <VButton variant="contained" className="w-full">{t("Submit")}</VButton>

  </div>;
};

export default Payment;;