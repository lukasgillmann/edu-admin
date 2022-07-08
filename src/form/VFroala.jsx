import React, { useMemo, useState } from "react";
import FroalaEditor from 'react-froala-wysiwyg';

import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/themes/dark.min.css';
import 'froala-editor/css/themes/royal.min.css';
import "froala-editor/js/froala_editor.pkgd.min";
import "froala-editor/css/froala_style.min.css";
import "froala-editor/js/plugins.pkgd.min";
import "froala-editor/js/plugins/colors.min";
import { useAsterController } from "../context";

const VFroala = (props) => {

  const { onSubmit, fileUpload, className, maxCount, isEnterSubmit, isChat } = props;

  const [model, setModel] = useState('');

  const [controller] = useAsterController();
  const { darkMode } = controller;

  const onKeyDownHandler = (evt) => {
    window.isEnterPressed = evt.keyCode === 13 && !evt.altKey && !evt.shiftKey && !evt.ctrlKey ? true : false;
  };

  const onModelChange = (v) => {
    if (window.isEnterPressed && isEnterSubmit) {
      window.isEnterPressed = false;
      onSubmit(model);
      setModel('');
    } else {
      setModel(v);
    }
  };

  const froalaConfig = useMemo(() => ({
    key: process.env.REACT_APP_FROALA_KEY,
    shortcutsEnabled: [""],
    shortcutsHint: false,
    attribution: false,
    iframe: false,
    quickInsertEnabled: false,
    imageUpload: fileUpload,
    fileUpload: fileUpload,
    charCounterCount: !isChat,
    immediateReactModelUpdate: true,
    theme: darkMode ? 'dark' : 'royal',
    ...(maxCount && !isChat ? { charCounterMax: maxCount } : {}),
    events: {
      keydown: onKeyDownHandler
    },
    toolbarButtons: {
      'moreText': {
        'buttons': ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'clearFormatting']
      },
      'moreParagraph': {
        'buttons': ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'outdent', 'indent', 'quote'],
        ...(isChat ? { 'buttonsVisible': 2 } : {})
      },
      ...(isChat ? {} : { 'moreRich': { 'buttons': ['insertImage', 'insertHR'] } }),
      'moreMisc': {
        'buttons': isChat ? ['undo', 'redo', 'fullscreen'] : ['undo', 'redo', 'fullscreen', 'html'],
        'align': 'right',
        'buttonsVisible': 4
      }
    },
    // tooltips: false,
    placeholderText: "Type...",
    tag: "textarea",

  }), [fileUpload, maxCount, isChat, darkMode]);

  return <FroalaEditor key={darkMode} model={model} onModelChange={onModelChange} config={froalaConfig} className={className} />;
};

VFroala.defaultProps = {
  model: "",
  setModel: () => { },
  fileUpload: false,
  className: '',
  maxCount: null
};

export default VFroala;