import { Icon } from "@iconify/react";
import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import React, { useState, Fragment } from "react";
import { useTranslation } from 'react-i18next';

import { VColorPicker, VDropZone, VSwitch, VText } from "../../form";

const PRESETS = [
  {
    label: 'Preset 1',
    value: 'preset1',
    color1: '#E94F33',
    color2: '#F0BC04',
    color3: '#5CBFBE',
    color4: '#F2EEE0'
  }, {
    label: 'Preset 2',
    value: 'preset2',
    color1: '#5E0A0A',
    color2: '#5CA0D3',
    color3: '#C8E6F5',
    color4: '#F2EEE0'
  }, {
    label: 'Preset 3',
    value: 'preset3',
    color1: '#F46060',
    color2: '#F09872',
    color3: '#F3D179',
    color4: '#DCE8BA'
  }, {
    label: 'Preset 4',
    value: 'preset4',
    color1: '#E4C666',
    color2: '#247E6C',
    color3: '#A9C6DE',
    color4: '#EAF5FF'
  }, {
    label: 'Preset 5',
    value: 'preset5',
    color1: '#FF9E74',
    color2: '#EE5A5A',
    color3: '#B31E6F',
    color4: '#22EACA'
  },
];

const ThemeColor = (props) => {

  const { t } = useTranslation('common');

  const { fields, setFields } = props;
  const [type, setType] = useState('');

  const onChange = e => {
    const presetItem = PRESETS.find(v => v.value === e.target.value) || {};
    setFields({
      ...fields,
      color_main1: presetItem.color1,
      color_main2: presetItem.color2,
      color_main3: presetItem.color3,
      grad_main1: presetItem.color4,
      auth_bg_color: '#FFFFFF',
      auth_modal_bg_color: "#FFFFFF",
      auth_modal_opacity: 1,
      auth_bg_is_image: false,
      auth_bg_url: ''
    });

    setType(e.target.value);
  };

  return <div className="p-12">
    <Grid container spacing={3}>

      {/********************************** Row 2 **********************************/}
      <Grid item xs={12} sm={4}>
        <VText className="text-xl">{t("Color Primary")}</VText>
        <VText color="secondary" className="text-sm" div>{t("Main button color")}</VText>
        <div className="mt-3">
          <VColorPicker color={fields.color_main1 || '#FFFFFF'} setColor={val => setFields({ ...fields, 'color_main1': val })} className="p-0 w-36 h-16 relative">
            <Icon icon="mdi:circle-edit-outline" className="absolute top-2 right-2 text-xl" />
          </VColorPicker>
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <VText className="text-xl">{t("Color Secondary")}</VText>
        <VText color="secondary" className="text-sm" div>{t("Titlebar & Second border")}</VText>
        <div className="mt-3">
          <VColorPicker color={fields.color_main2 || '#FFFFFF'} setColor={val => setFields({ ...fields, 'color_main2': val })} className="p-0 w-36 h-16 relative">
            <Icon icon="mdi:circle-edit-outline" className="absolute top-2 right-2 text-xl" />
          </VColorPicker>
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <VText className="text-xl">{t("Color Border")}</VText>
        <VText color="secondary" className="text-sm" div>{t("Active tab border color")}</VText>
        <div className="mt-3">
          <VColorPicker color={fields.color_main3 || '#FFFFFF'} setColor={val => setFields({ ...fields, 'color_main3': val })} className="p-0 w-36 h-16 relative">
            <Icon icon="mdi:circle-edit-outline" className="absolute top-2 right-2 text-xl" />
          </VColorPicker>
        </div>
      </Grid>

      {/********************************** Row 3 **********************************/}
      <Grid item xs={12} sm={4}>
        <VText className="text-xl">{t("Background gradient")}</VText>
        <VText color="secondary" className="text-sm" div>{t("Gradient color by default")}</VText>
        <div className="mt-3">
          <VColorPicker color={fields.grad_main1 || '#FFFFFF'} setColor={val => setFields({ ...fields, 'grad_main1': val })} className="p-0 w-36 h-16 relative">
            <Icon icon="mdi:circle-edit-outline" className="absolute top-2 right-2 text-xl" />
          </VColorPicker>
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <VText className="text-xl">{t("Auth main background")}</VText>
        <VText color="secondary" className="text-sm" div>{t("Background color of auth page")}</VText>
        <div className="mt-3">
          <VColorPicker color={fields.auth_bg_color || '#FFFFFF'} setColor={val => setFields({ ...fields, 'auth_bg_color': val })} className="p-0 w-36 h-16 relative">
            <Icon icon="mdi:circle-edit-outline" className="absolute top-2 right-2 text-xl" />
          </VColorPicker>
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <VText className="text-xl">{t("Auth modal background")}</VText>
        <VText color="secondary" className="text-sm" div>{t("Background color of auth modal")}</VText>
        <div className="mt-3">
          <VColorPicker color={fields.auth_modal_bg_color || '#FFFFFF'} setColor={val => setFields({ ...fields, 'auth_modal_bg_color': val })} className="p-0 w-36 h-16 relative">
            <Icon icon="mdi:circle-edit-outline" className="absolute top-2 right-2 text-xl" />
          </VColorPicker>
        </div>
      </Grid>

      <Grid item xs={12} sm={4}>
        <div>
          <VText className="text-xl" div>{t("Auth modal opacity")}</VText>
          <TextField size="small" value={fields.auth_modal_opacity || 1} onChange={e => setFields({ ...fields, 'auth_modal_opacity': e.target.value })} className="w-full mt-4" color="secondary" type="number" inputProps={{ step: 0.1, max: 1.0, min: 0.5 }} />
        </div>
        <div>
          <VText className="text-xl mt-8" div>{t("Use auth background image")}</VText>
          <VText color="secondary" className="text-sm" div>{t("Use image as auth page background instead of color")}</VText>
          <VSwitch
            checked={fields.auth_bg_is_image}
            setChecked={v => setFields({ ...fields, 'auth_bg_is_image': v })}
            color="primary"
            type="Android"
            className="mt-4"
          >
            {t('Status')}
          </VSwitch>
        </div>
      </Grid>

      <Grid item xs={12} sm={8}>
        <VText className="text-xl" div>{t("Auth background image")}</VText>
        <VDropZone
          url={fields.auth_bg_url}
          setUrl={url => setFields({ ...fields, 'auth_bg_url': url })}
          filename="auth_bg.png"
          directory="image"
          accept="image/*"
          className="w-full max-w-2xl aspect-[16/9] overflow-hidden bg-gray-100 dark:bg-gray-600 mt-4"
        >
          <div className="flex flex-col justify-center items-center p-4">
            <Icon icon="fa6-regular:image" className="text-5xl text-gray-300" />
            <div className="text-center mt-3 text-limit-2">
              <VText>{t("Add logo by drag & drop image or")}</VText>&nbsp;
              <VText className="color-primary" color="custom">{t("browse file")}</VText>
            </div>
          </div>
        </VDropZone>
      </Grid>

      <Grid item xs={12}>
        <VText className="text-xl mt-8" div>{t("Color Palette")}</VText>
        <VText color="secondary" div className="text-sm">
          {t("This is a set of colors used throughout your site and products. Choose a preset to get started. You can also override and choose your own colors below")}
        </VText>
      </Grid>
    </Grid>

    <RadioGroup row name="gender" value={type} onChange={onChange} className="mt-8">
      <Grid container spacing={2}>
        {
          PRESETS.map(v => <Fragment key={v.value}>
            <Grid item xs={12}>
              <FormControlLabel
                value={v.value}
                control={<Radio color="primary" />}
                label={<VText>{t(v.label)}</VText>}
              />
            </Grid>
            <Grid item xs={3}>
              <div className="w-full rounded-xl aspect-[3/1] max-w-md" style={{ backgroundColor: v.color1, minHeight: 41 }} />
            </Grid>
            <Grid item xs={3}>
              <div className="w-full rounded-xl aspect-[3/1] max-w-md" style={{ backgroundColor: v.color2, minHeight: 41 }} />
            </Grid>
            <Grid item xs={3}>
              <div className="w-full rounded-xl aspect-[3/1] max-w-md" style={{ backgroundColor: v.color3, minHeight: 41 }} />
            </Grid>
            <Grid item xs={3}>
              <div className="w-full rounded-xl aspect-[3/1] max-w-md" style={{ backgroundColor: v.color4, minHeight: 41 }} />
            </Grid>
          </Fragment>)
        }

      </Grid>


    </RadioGroup>

  </div>;
};

export default ThemeColor;