import { Icon } from "@iconify/react";
import { Grid, Slider } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useMemo, useState } from "react";

import { useAsterController } from "../../context";
import { actionLicenseCreate } from "../../context/action";
import { VButton, VImage, VInput, VText } from "../../form";
import LicenseAddCheckout from "./license.add.checkout";

const LICENSE_MARKS = [
  {
    value: 25,
    label: '25',
    price: 80,
    prev_price: 87,
  },
  {
    value: 50,
    label: '50',
    price: 76,
    prev_price: 80,
  },
  {
    value: 100,
    label: '100',
    price: 69,
    prev_price: 76,
  },
  {
    value: 200,
    label: '200',
    price: 65,
    prev_price: 69,
  },
  {
    value: 500,
    label: '500',
    price: 57,
    prev_price: 65,
  }
];

const MAX_LIMIT = 500;
const MIN_LIMIT = 10;

const LicenseAdd = () => {

  const { t } = useTranslation('common');

  const [, dispatch] = useAsterController();

  const [quantity, setQuantity] = useState(10);
  const [checkout, setCheckout] = useState(null);

  const item = useMemo(() => LICENSE_MARKS.find(v => v.value >= quantity) || {}, [quantity]);

  const handleSliderChange = (_, newQuantity) => setQuantity(newQuantity >= 10 ? newQuantity : 10);
  const handleInputChange = (value) => setQuantity(value === '' ? '' : Number(value));
  const handleBlur = () => setQuantity(quantity < MIN_LIMIT ? MIN_LIMIT : quantity > MAX_LIMIT ? MAX_LIMIT : quantity);

  const onBuy = (type) => {
    actionLicenseCreate(dispatch, { type, quantity, price: item.price, annual: true });
    setCheckout(type);
  };

  return <div className="p-4 md:p-24">
    <div className="w-2/3 mx-auto flex items-center mb-20">
      <VButton className="w-9 h-9 rounded-full relative" color="primary" variant="contained" iconButton onClick={() => setCheckout(null)}>
        <Icon icon="bi:check-lg" className="text-2xl" />
        <VText className="absolute top-12">{t('Plans')}</VText>
      </VButton>
      <div className="flex-1 h-0.5 bg-primary" />
      <div className={`flex-1 h-0.5  ${checkout ? 'bg-primary' : 'bg-gray-200'}`} />
      <VButton className={`w-9 h-9 rounded-full relative ${checkout ? 'border-red-600' : 'border-gray-200'}`} variant="outlined" iconButton disabled>
        {checkout && <Icon icon="ci:dot-05-xl" className="text-6xl color-primary" />}
        <VText className="absolute top-12">{t('Checkout')}</VText>
      </VButton>
    </div>

    {
      !checkout ? <>
        <div>
          <VText className="text-xs bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 flex items-center w-max">
            {t('Pricing plans')}
          </VText>
          <VText className="text-5xl font-bold mt-5" div>{t('Licenses')}</VText>
          <VText className="mt-6 text-xl" div>
            {t("1 license corresponds to 1 training course. It is accessiblee via mobile or desktop for a period of 12 months.")}
          </VText>
        </div>

        <Grid container spacing={2} className="mt-4">
          <Grid item xs={12} sm={9}>
            <Slider
              className="v-slider mr-8 flex-1"
              value={typeof quantity === 'number' ? quantity : 0}
              onChange={handleSliderChange}
              valueLabelFormat={value => `${value} licenses`}
              valueLabelDisplay="auto"
              marks={LICENSE_MARKS}
              step={25}
              min={0}
              max={MAX_LIMIT}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <VInput
              size="small"
              className="w-full -mt-1"
              value={quantity}
              setValue={handleInputChange}
              onBlur={handleBlur}
              inputProps={{ step: 1, min: MIN_LIMIT, max: MAX_LIMIT, type: 'number' }}
              placeholder={t("Input number of licenses here")}
            />
          </Grid>
        </Grid>

        <div className="w-full flex justify-center">
          <div className="mt-11 border border-solid border-gray-200 rounded-2xl p-8 max-w-sm">
            <div className="w-full flex flex-col items-center">
              <div className="bg-red-100 rounded-full w-10 h-10 flex justify-center items-center">
                <VImage src={`${process.env.REACT_APP_S3_ASSET_ENDPOINT}/v2-assets/star-badge.svg`} className="w-4" />
              </div>
              <VText div className="mt-5 text-xl text-yellow-500 font-bold" color="custom">{t('PREMIUM')}</VText>
              <VText div className="text-5xl font-bold my-2">{item.price * quantity}€/{t('year')}</VText>
              <VText div color="secondary">{item.price} € per license <span className="line-through">({item.prev_price} €)</span></VText>
            </div>

            <div className="mt-8">
              <div className="flex items-center">
                <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                  <Icon icon="bi:check-lg" className="color-primary" />
                </div>
                <VText color="custom" className="text-gray-500">{t('Unlimited Courses')}</VText>
              </div>
              <div className="flex items-center mt-4">
                <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                  <Icon icon="bi:check-lg" className="color-primary" />
                </div>
                <VText color="custom" className="text-gray-500">{t("Unlimited Instructors")}</VText>
              </div>
              <div className="flex items-center mt-4">
                <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                  <Icon icon="bi:check-lg" className="color-primary" />
                </div>
                <VText color="custom" className="text-gray-500">{t("Support included (chat, email, docs)")}</VText>
              </div>
              <div className="flex items-center mt-4">
                <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                  <Icon icon="bi:check-lg" className="color-primary" />
                </div>
                <VText color="custom" className="text-gray-500">{t("Your logo + colors")}</VText>
              </div>
              <div className="flex items-center mt-4">
                <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                  <Icon icon="bi:check-lg" className="color-primary" />
                </div>
                <VText color="custom" className="text-gray-500">{("Advanced Analytics (time spent, etc)")}</VText>
              </div>
            </div>
            <VButton className="w-full mt-16" variant="contained" onClick={() => onBuy(1)}>{t("Buy now")}</VButton>
          </div>
        </div>
      </>
        :
        <LicenseAddCheckout type={checkout} total={item.price * quantity} price={item.price} quantity={quantity} />
    }
  </div >;
};

export default LicenseAdd;