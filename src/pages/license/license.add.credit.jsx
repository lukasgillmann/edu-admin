import { Icon } from "@iconify/react";
import { Grid, Slider } from "@mui/material";
import { useMemo, useState } from "react";
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { actionLicenseCreate } from "../../context/action";
import { VButton, VInput, VSwitch, VText } from "../../form";
import LicenseAddCheckout from "./license.add.checkout";

const BUSINESS_MARKS = [
  {
    value: 50,
    label: '50',
    price: 0.9,
    prev_price: 0.98,
  },
  {
    value: 150,
    label: '150',
    price: 0.593,
    prev_price: 0.66,
  },
  {
    value: 250,
    label: '250',
    price: 0.54,
    prev_price: 0.596,
  },
  {
    value: 500,
    label: '500',
    price: 0.358,
    prev_price: 0.398,
  },
  {
    value: 1000,
    label: '1000',
    price: 0.269,
    prev_price: 0.299,
  },
  {
    value: 1500,
    label: '1500',
    price: 0.266,
    prev_price: 0.2993,
  },
  {
    value: 2000,
    label: '2000',
    price: 0.2495,
    prev_price: 0.2795,
  }
];

const PRO_MARKS = [
  {
    value: 50,
    label: '50',
    price: 1.78,
    prev_price: 1.98,
  },
  {
    value: 150,
    label: '150',
    price: 0.9267,
    prev_price: 1.193,
  },
  {
    value: 250,
    label: '250',
    price: 0.716,
    prev_price: 0.796,
  },
  {
    value: 500,
    label: '500',
    price: 0.458,
    prev_price: 0.57,
  },
  {
    value: 1000,
    label: '1000',
    price: 0.319,
    prev_price: 0.279,
  },
  {
    value: 1500,
    label: '1500',
    price: 0.2993,
    prev_price: 0.3593,
  },
  {
    value: 2000,
    label: '2000',
    price: 0.2745,
    prev_price: 0.3295,
  }
];

const MAX_LIMIT = 2000;
const MIN_LIMIT = 10;

const LicenseAddCredit = () => {

  const { t } = useTranslation('common');

  const [, dispatch] = useAsterController();

  const [annual, setAnnual] = useState(false);
  const [quantity, setQuantity] = useState(10);
  const [checkout, setCheckout] = useState(false);

  const businessItem = useMemo(() => BUSINESS_MARKS.find(v => v.value >= quantity) || {}, [quantity]);
  const proItem = useMemo(() => PRO_MARKS.find(v => v.value >= quantity) || {}, [quantity]);
  const multipler = annual ? 12 * (80 / 100) : 1;

  const handleSliderChange = (_, newQuantity) => setQuantity(newQuantity >= 10 ? newQuantity : 10);
  const handleInputChange = (value) => setQuantity(value === '' ? '' : Number(value));
  const handleBlur = () => setQuantity(quantity < MIN_LIMIT ? MIN_LIMIT : quantity > MAX_LIMIT ? MAX_LIMIT : quantity);

  const onBuy = (type) => {
    actionLicenseCreate(dispatch, { type, quantity, price: (type === 2 ? businessItem.price : proItem.price) * multipler, annual });
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
        <VText className="absolute top-12">{t("Checkout")}</VText>
      </VButton>
    </div>

    {
      !checkout ? <>
        <div>
          <VText className="text-xs bg-gray-100 dark:bg-gray-700 rounded-full px-3 py-1 flex items-center w-max">
            {t("Pricing plans")}
          </VText>
          <VText className="text-5xl font-bold mt-5" div>Credits</VText>
          <VText className="mt-6 text-xl" div>
            {t("A credit is spent and considered to be active when he or she makes a connection during the month.")}
          </VText>
        </div>

        <div className="flex w-full items-center mb-4">
          <VSwitch
            checked={annual}
            setChecked={setAnnual}
            color="primary"
            type="Android"
            className="ml-auto"
          >{t("Annual pricing")}</VSwitch>
          <VText color="custom" className="color-primary">({t("save")} 20%)</VText>
        </div>

        <Grid container spacing={2}>
          <Grid item xs={12} sm={9}>
            <Slider
              className="v-slider mr-8 flex-1"
              value={typeof quantity === 'number' ? quantity : 0}
              onChange={handleSliderChange}
              valueLabelFormat={value => `${value} licenses`}
              valueLabelDisplay="auto"
              marks={BUSINESS_MARKS}
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
              placeholder="Input number of licenses here"
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} className="mt-10">
          <Grid item xs={12} sm={6}>
            <div className="border border-solid border-gray-200 rounded-2xl p-8">
              <div className="w-full flex flex-col items-center">
                <div className="bg-red-100 rounded-full w-10 h-10 flex justify-center items-center">
                  <Icon icon="mdi:briefcase-variant-outline" className="text-xl text-gray-400" />
                </div>
                <VText div className="mt-5 text-xl font-bold text-gray-500" color="custom">{t("BUSINESS")}</VText>
                <VText div className="text-5xl font-bold my-2">{(businessItem.price * quantity * multipler).toFixed(2)}€/{annual ? "yr" : "mo"}</VText>
                <VText div color="secondary">{(businessItem.price * multipler).toFixed(2)} € {t("per license")} ({(businessItem.prev_price * multipler).toFixed(2)} €)</VText>
              </div>

              <div className="mt-8">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                    <Icon icon="bi:check-lg" className="color-primary" />
                  </div>
                  <VText color="custom" className="text-gray-500">{t("Unlimited Courses")}</VText>
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
                  <VText color="custom" className="text-gray-500">{t("Your logo")}</VText>
                </div>
                <div className="flex items-center mt-4">
                  <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                    <Icon icon="bi:check-lg" className="color-primary" />
                  </div>
                  <VText color="custom" className="text-gray-500">{t('Domain')} *.univo.fr</VText>
                </div>
              </div>
              <VButton className="w-full mt-16" variant="contained" onClick={() => onBuy(2)}>{t('Buy now')}</VButton>

            </div>
          </Grid>
          <Grid item xs={12} sm={6}>
            <div className="border border-solid border-gray-200 rounded-2xl p-8">
              <div className="w-full flex flex-col items-center">
                <div className="bg-red-100 rounded-full w-10 h-10 flex justify-center items-center">
                  <Icon icon="majesticons:lightning-bolt-line" className="text-xl color-primary" />
                </div>
                <VText div className="mt-5 text-xl text-yellow-500 font-bold" color="custom">{t("PREMIUM")}</VText>
                <VText div className="text-5xl font-bold my-2">{(proItem.price * quantity * multipler).toFixed(2)}€/{annual ? "yr" : "mo"}</VText>
                <VText div color="secondary">{(proItem.price * multipler).toFixed(2)} € {t("per license")} ({(proItem.prev_price * multipler).toFixed(2)} €)</VText>
              </div>

              <div className="mt-8">
                <div className="flex items-center">
                  <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                    <Icon icon="bi:check-lg" className="color-primary" />
                  </div>
                  <VText color="custom" className="text-gray-500">{t("Unlimited Courses")}</VText>
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
                  <VText color="custom" className="text-gray-500">{t("Your domain")}</VText>
                </div>
                <div className="flex items-center mt-4">
                  <div className="bg-red-100 rounded-full w-6 h-6 flex justify-center items-center mr-3">
                    <Icon icon="bi:check-lg" className="color-primary" />
                  </div>
                  <VText color="custom" className="text-gray-500">{t("Advanced Analytics (time spent, etc)")}</VText>
                </div>
              </div>
              <VButton className="w-full mt-16" variant="contained" onClick={() => onBuy(3)}>{t('Buy now')}</VButton>

            </div>
          </Grid>
        </Grid>

      </>
        :
        <LicenseAddCheckout />
    }
  </div>;
};

export default LicenseAddCredit;