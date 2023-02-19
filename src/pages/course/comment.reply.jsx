import { Grid } from "@mui/material";
import React, { useMemo, useState } from "react";
import { Icon } from '@iconify/react';
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { VAvatar, VButton, VFroala, VText } from "../../form";
import { getFormatDate } from "../../utils/string";
import { actionCommentReply } from "../../context/action";

const CommentReply = (props) => {

  const { t, i18n } = useTranslation('common');

  const { commentIdx, setModalOpen } = props;

  const [controller, dispatch] = useAsterController();
  const { user, comments, loadedCommentReply } = controller;

  const currComment = useMemo(() => commentIdx < comments.data.length ? comments.data[commentIdx] : {}, [comments, commentIdx]);

  const [model, setModel] = useState('');

  const onSubmit = () => {
    const data = {
      author_id: user.id,
      author_name: user.username,
      author_fullname: `${user.first_name} ${user.last_name}`.trim(),
      avatar: user.avatar,
      comment_id: currComment._id,
      visible: true,
      body: model,
      files: [],
      created_at: new Date().getTime().toString()
    };

    actionCommentReply(dispatch, data, t);
    setModel('');
    setModalOpen(false);
  };

  return <>
    <div className="p-4 md:p-8 min-w-xs w-full">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <div className="flex items-center">
            <VAvatar src={currComment.avatar} className="w-16 h-16" />
            <VText className="ml-4 text-lg">{currComment.author_fullname}</VText>
          </div>
        </Grid>
        <Grid item xs={8}>
          <VText div>
            <div dangerouslySetInnerHTML={{ __html: currComment.body }} />
          </VText>
          <div className="flex mt-4">
            <VText className="flex items-center">
              <Icon icon="ant-design:like-outlined" className="flex-shrink-0" />&nbsp;{currComment.vote_up_count}
            </VText>
            <VText className="flex items-center ml-4">
              <Icon icon="ant-design:dislike-outlined" className="flex-shrink-0" />&nbsp;{currComment.vote_down_count}
            </VText>
            <VText color="secondary" className="ml-auto text-sm italic">{getFormatDate(currComment.created_at, i18n.language)}</VText>
          </div>

          <div className="mt-4">
            {
              currComment.reply?.map(reply => <div key={reply.created_at} className=" border-0 border-l border-solid border-yellow-400 pl-4 py-2 my-2">
                <div className="flex items-center">
                  <VAvatar src={reply.avatar} className="w-8 h-8" />
                  <VText className="ml-4">{reply.author_fullname}</VText>
                </div>
                <VText className="mt-4" div>
                  <div dangerouslySetInnerHTML={{ __html: reply.body }} />
                </VText>
                <div className="w-full flex justify-end">
                  <VText color="secondary" className="ml-auto text-sm italic">{getFormatDate(reply.created_at, i18n.language)}</VText>
                </div>
              </div>)
            }
          </div>
        </Grid>
        <Grid item xs={4}>
          <VText color="primary" className="font-bold mb-2" div>{t('Course')}</VText>
          <VText color="secondary" className="ml-2" div>{currComment.course_title}</VText>

          <VText color="primary" className="font-bold mb-2 mt-4" div>{t('Section')}</VText>
          <VText color="secondary" className="ml-2" div>{currComment.section_title}</VText>

          <VText color="primary" className="font-bold mb-2 mt-4" div>{t('Sequence')}</VText>
          <VText color="secondary" className="ml-2" div>{currComment.sequence_title}</VText>

          <VText color="primary" className="font-bold mb-2 mt-4" div>{t('Vertical')}</VText>
          <VText color="secondary" className="ml-2" div>{currComment.vertical_title}</VText>
        </Grid>
        <Grid item xs={12}>
          <VFroala model={model} setModel={setModel} />
        </Grid>
        <Grid item xs={12} className="flex justify-center">
          <VButton variant="contained" onClick={onSubmit} disabled={!model} loading={!loadedCommentReply}>{t('Submit')}</VButton>
          <VButton variant="outlined" className="ml-4" onClick={() => setModalOpen(false)}>{t('Close')}</VButton>
        </Grid>
      </Grid>
    </div>
  </>;
};

export default CommentReply;