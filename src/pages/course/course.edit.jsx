import React, { useEffect, useMemo, useState, Fragment } from "react";
import { Grid, MenuItem, Select, TextField } from "@mui/material";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { useParams } from "react-router-dom";

import { VButton, VFormItem, VText } from "../../form";
import PaginationFetcher from "../PaginationFetcher";
import { useAsterController } from "../../context";
import { actionCourseAdditionEdit, actionCourseGet, actionCourseList } from "../../context/action";
import Skeleton from "react-loading-skeleton";
import { BModal } from "../../components";
import Vimeo from "@u-wave/react-vimeo";

const CourseEdit = () => {

  const { t } = useTranslation('common');

  const { page, pageSize, courseId } = useParams();

  const [controller, dispatch] = useAsterController();
  const { courses, categories, courseStructure, loadedCourseStructure, loadedCourseAdditionEdit } = controller;

  const currCourse = useMemo(() => courses.page === Number(page) && courses.page_size === Number(pageSize) ? courses.data.find(v => v.id === courseId) || {} : {}, [page, pageSize, courses, courseId]);
  const [structure, setStructure] = useState({});
  const [vimeoId, setVimeoId] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => Object.keys(courseStructure).length && loadedCourseStructure && setStructure(courseStructure), [courseStructure, loadedCourseStructure]);
  useEffect(() => actionCourseGet(dispatch, courseId), [courseId, dispatch]);

  const onChange = (sectionId, sequenceId, verticalId, duration) => {
    if (duration >= 0) {
      const sectionIdx = structure.sections.findIndex(v => v.section_id === sectionId);
      const seqIdx = structure.sections[sectionIdx].sequences.findIndex(v => v.sequence_id === sequenceId);
      const vertIdx = structure.sections[sectionIdx].sequences[seqIdx].verticals.findIndex(v => v.vertical_id === verticalId);
      const clone = JSON.parse(JSON.stringify(structure));
      clone.sections[sectionIdx].sequences[seqIdx].verticals[vertIdx].duration = parseInt(duration, 10);
      clone.sections[sectionIdx].sequences[seqIdx].verticals[vertIdx].is_changed = true;
      setStructure(clone);
    }
  };

  const onSubmit = (values) => {
    const durationArr = [];
    if (structure.sections) {
      structure.sections.forEach(({ section_title, sequences }, secIdx) => {
        if (!sequences) return;
        sequences.forEach(({ sequence_title, verticals }, seqIdx) => {
          if (!verticals) return;
          verticals.forEach(({ vertical_title, duration, is_changed }, vertIdx) => {
            if (!duration || !is_changed) return;
            durationArr.push({ section_title, sequence_title, vertical_title, duration });
            courseStructure.sections[secIdx].sequences[seqIdx].verticals[vertIdx].duration = duration;
          });
        });
      });
    }

    const data = {
      ...values,
      category_id: categories.data.find(v => v.name === values.category)?.id || 0,
      course_id: courseId,
      list: durationArr
    };
    delete data.category;

    actionCourseAdditionEdit(dispatch, data, t);
  };

  const onVideo = (xblocks) => {
    setVimeoId(xblocks.find(v => v.type === 'videoxblock')?.vimeo_id);
    setOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      display_name: currCourse.display_name || '',
      category: currCourse.category || '',
      short_description: currCourse.short_description || '',
      objective: currCourse.objective || '',
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      display_name: Yup.string().required(t('This field is required')),
      category: Yup.string().max(999, t('Must be 999 characters or less')).required(t('This field is required')),
      short_description: Yup.string().max(999, t('Must be 999 characters or less')).required(t('This field is required')),
      objective: Yup.string().max(999, t('Must be 999 characters or less')).required(t('This field is required')),
    }),
    onSubmit: onSubmit
  });

  let counter = 0;

  return <>

    <PaginationFetcher page={Number(page)} pageSize={Number(pageSize)} list={courses} action={actionCourseList} />

    {
      vimeoId && <BModal open={open} setOpen={setOpen} width='90vw' height='fit-content' className="w-full max-w-xl h-full max-h-150">
        <Vimeo
          video={vimeoId}
          className="w-full shadow-lg"
          autopause
          controls
          responsive
          color="#f76060"
        />
      </BModal>
    }

    <form onSubmit={formik.handleSubmit}>
      <div className="p-4 md:p-8 flex items-center justify-center md:justify-between flex-wrap">
        <div>
          <VText className="text-2xl" div>{t('Set the General Information')}</VText>
          <VText color="secondary" div>{t('This information will attract learners to take this course, and help them find it easily.')}</VText>
        </div>
        <VButton className="flex items-center my-2" variant="contained" type="submit" loading={!loadedCourseAdditionEdit}>
          <Icon icon="bxs:save" className="text-xl" />&nbsp;
          {t('Save')}
        </VButton>
      </div>

      <Grid container spacing={3} className="px-4 md:px-8 pb-4 md:pb-8">

        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Course Name")} name="display_name" required>
            <TextField name="display_name" size="small" value={formik.values.display_name} onChange={formik.handleChange} className="w-full" color="secondary" />
          </VFormItem>
        </Grid>

        <Grid item xs={12} sm={6}>
          <VFormItem formik={formik} label={t("Course Category")} name="category" required>
            <Select name="category" size="small" value={formik.values.category} onChange={formik.handleChange} className="w-full" color="secondary" >
              {categories.data.map(v => <MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>)}
            </Select>
          </VFormItem>
        </Grid>

        <Grid item xs={12} sm={6}>
        </Grid>

        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Description")} name="short_description" required>
            <TextField name="short_description" size="small" value={formik.values.short_description} onChange={formik.handleChange} className="w-full" color="secondary" multiline rows={3} />
          </VFormItem>
        </Grid>

        <Grid item xs={12}>
          <VFormItem formik={formik} label={t("Objective")} name="objective" required>
            <TextField name="objective" size="small" value={formik.values.objective} onChange={formik.handleChange} className="w-full" color="secondary" multiline rows={3} />
          </VFormItem>
        </Grid>

        <Grid item xs={12}>
          <VText className="mb-2 mt-8 text-lg">{t('Unit Duration')}</VText>

          {
            loadedCourseStructure ? <>
              {
                structure && Object.keys(structure).length > 0 && <>
                  {
                    structure.sections?.map(({ section_id, section_title, sequences }) =>
                      <Fragment key={section_id}>
                        <VText className="font-bold my-2 mt-4" div>{section_title}</VText>
                        {
                          sequences?.map(({ sequence_id, sequence_title, verticals }) =>
                            <Fragment key={sequence_id}>
                              <VText color="secondary" className="ml-4" div>{sequence_title}</VText>
                              {
                                verticals?.map(({ vertical_id, vertical_title, duration, xblock_ids }) =>
                                  <div key={vertical_id} className="flex flex-wrap items-center mb-2 ml-8">
                                    <div className="flex items-center flex-1 mr-1">
                                      <VText div>{vertical_title}</VText>
                                      {
                                        xblock_ids.find(v => v.type === 'videoxblock') && (counter += 1) &&
                                        <VButton iconOnly onClick={() => onVideo(xblock_ids)} disabled={counter > 5}>
                                          <Icon icon="eva:video-outline" />
                                        </VButton>
                                      }
                                    </div>
                                    <TextField
                                      size="small" name="first"
                                      value={duration || 0}
                                      onChange={(e) => onChange(section_id, sequence_id, vertical_id, e.target.value)}
                                      className="w-20 flex-shrink-0" color="secondary" type="number"
                                    />
                                  </div>
                                )
                              }
                            </Fragment>
                          )
                        }
                      </Fragment>
                    )
                  }
                </>
              }
            </> : <Skeleton count={10} className="h-10 mt-2" />
          }
        </Grid>

      </Grid>
    </form>
  </>;
};

export default CourseEdit;;