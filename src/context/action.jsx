import asterAxios from "../utils/api";
import { convert2String } from "../utils/string";
import toaster from "../utils/toast.msg";
import {
  M_USER_EDIT,

  Q_USER_LIST,
  M_REGISTERED_USER_EDIT,
  M_REGISTERED_USER_PWD_EDIT,
  M_REGISTER_USER,
  M_REGISTER_BULK_USERS,
  M_USER_DELETE,
  M_UPDATE_ENROLL_DATES,

  Q_GROUP_LIST,
  M_GROUP_EDIT,
  M_GROUP_ASSIGN_USERS,
  M_GROUP_DISMISS_USERS,
  M_GROUP_ASSIGN_COURSES,
  M_GROUP_DISMISS_COURSES,
  Q_COURSE_LIST,
  M_GROUP_DELETE,

  Q_CATEGORY_LIST,
  M_EDIT_CATEGORY,
  M_ASSIGN_COURSES_TO_CATEGORY,
  M_DISMISS_COURSES_FROM_CATEGORY,
  M_DELETE_CATEGORY,

  M_EMAIL_TEMPLATE_EDIT,
  Q_EMAIL_SEND,
  Q_EMAIL_LOG_LIST,
  M_EMAIL_LOG_DELETE,

  Q_SMS_LOG_LIST,
  M_SMS_LOG_DELETE,
  Q_SMS_SEND,
  M_SMS_TEMPLATE_EDIT,

  Q_ANA_COURSE_GRADE,
  Q_ANA_USE_LOGIN,
  Q_ANA_ZOOM,
  Q_ANA_MODULE,

  Q_TUTOR_LIST,
  M_TUTOR_EDIT,
  M_TUTOR_DELETE,

  Q_COACH_LIST,
  M_COACH_EDIT,
  M_COACH_DELETE,

  M_THEME_EDIT,

  Q_USER_COURSE_LIST,
  M_ASSIGN_COURSES_TO_USER,
  M_DISMISS_COURSES_FROM_USER,

  Q_LICENSE_LIST,
  Q_DASHBOARD_INFO_GET,
  Q_ZOOM_MEETING_LIST,
  M_ZOOM_MEETING_CREATE,
  M_ZOOM_MEETING_EDIT,
  M_ZOOM_MEETING_DELETE,

  Q_ZOOM_HISTORY_LIST,
  Q_TERM_GET,
  M_TERM_EDIT,

  M_COURSE_DELETE,
  Q_COURSE_STRUCTURE_GET,
  M_RESET_PLATFORM,
  M_CERTIFICATE_VARIABLE_EDIT,
  M_COURSE_ADDITION,
  Q_ADMIN_DASHBOARD_GET,
  Q_ADMIN_USER_INSPECT_GET,

  M_ADD_CHAT,
  M_CHAT_FLAG_EDIT,
  Q_LIST_CHAT,
  Q_GET_STRIPE_CLIENT_SECRET,
  M_STRIPE_PROCESS,
  Q_SEND_REMINDERS,
  M_COMMENT_DELETE,
  M_REVIEW_DELETE,

  Q_LIST_PHYSICAL_SESSION,
  Q_LIST_PHYSICAL_SESSION_USER,
  M_EDIT_PHYSICAL_SESSION,
  M_ASSIGN_USERS_TO_PHYSICAL_SESSION,
  M_DISMISS_USERS_FROM_PHYSICAL_SESSION,
  M_DELETE_PHYSICAL_SESSION,
  Q_COMMENT_LIST,
  M_COMMENT_REPLY,
  Q_REVIEW_LIST,
  M_LICENSE_ADD,
  Q_CHAT_USER_LIST,
  M_CHAT_USER_ENABLED,
  Q_LIST_USER_CHART,
  Q_LIST_USER_COMMENT,
  Q_TRACK_CHART_LIST,
  Q_DASHBOARD_CHART_LIST,
  Q_SEARCH_LIST,
  Q_GHOST_TOKEN_GET,
} from "./query";

export const actionMiniSidenav = (dispatch, value) => {
  dispatch({ type: "SET_MINI_SIDENAV", value });
};

export const actionMobile = (dispatch, value) => {
  dispatch({ type: "SET_MOBILE", value });
};

export const actionDarkMode = (dispatch, value) => {
  dispatch({ type: "SET_DARK_MODE", value });
};

export const actionAdminDashboardGet = (dispatch) => {
  asterAxios(dispatch, Q_ADMIN_DASHBOARD_GET, {}, 'LOADED_ADMIN_DASHBOARD_GET')
    .then(res => {

      res = JSON.parse(res || '{}');

      if (!res.user_get) throw Error("Error");
      dispatch({ type: "USER_CURR_SET", value: res.user_get });
      dispatch({ type: "COURSE_LIST_SET", value: res.course_list });
      dispatch({ type: "CATEGORY_LIST_SET", value: res.category_list });
      dispatch({ type: "THEME_LIST_SET", value: res.theme_list });
      dispatch({ type: "USER_LIST_SET", value: res.user_list });
      dispatch({ type: "GROUP_LIST_SET", value: res.group_list });
      dispatch({ type: "EMAIL_TEMPLATE_LIST_SET", value: res.email_template_list });
      dispatch({ type: "EMAIL_LOG_LIST_SET", value: res.email_log_list });
      dispatch({ type: "SMS_TEMPLATE_LIST_SET", value: res.sms_template_list });
      dispatch({ type: "SMS_LOG_LIST_SET", value: res.sms_log_list });
      dispatch({ type: "TUTOR_LIST_SET", value: res.tutor_list });
      dispatch({ type: "LICENSE_LIST_SET", value: res.license_list });
      dispatch({ type: "DASHBOARD_INFO_SET", value: res.dashboard_get });
      dispatch({ type: "ZOOM_MEETING_LIST_SET", value: res.zoom_meeting_list });
      dispatch({ type: "ZOOM_HISTORY_LIST_SET", value: res.zoom_history_list });
      dispatch({ type: "COACH_LIST_SET", value: res.coach_list });
      dispatch({ type: "CERT_VAR_GET", value: res.certificate_variable_get });
      dispatch({ type: "CHAT_ACTIVE_USER_LIST_SET", value: res.chat_user_list });
      dispatch({ type: "CHAT_ARCHIEVED_USER_LIST_SET", value: res.chat_user_list_archieved });
      dispatch({ type: "CHAT_ENABLE_SET", value: res.chat_enabled });
      dispatch({ type: "COMMENT_LIST_SET", value: res.comment_list });
      dispatch({ type: "REVIEW_LIST_SET", value: res.review_list });
      dispatch({ type: "PHYSICAL_SESSION_LIST_SET", value: res.physical_session_list });
      dispatch({ type: "TERM_SET", value: res.term_get });
      dispatch({ type: "TRACK_CHART_LIST_SET", value: res.track_chart_list });
      dispatch({ type: "NOTIFICATION_LIST_SET", value: res.notification_list });
      dispatch({ type: "RECENT_LIST_SET", value: res.recent_hist_list });
    })
    .catch(() => window.location = process.env.REACT_APP_AUTH_ENDPOINT);
};

export const actionAdminUserInspectGet = (dispatch, userId) => {
  asterAxios(dispatch, Q_ADMIN_USER_INSPECT_GET, { user_id: userId }, 'LOADED_ADMIN_USER_INSPECT_GET')
    .then(res => {

      res = JSON.parse(res || '{}');

      dispatch({ type: "ANA_USER_LOGIN_LIST", value: res.ana_login_history });
      dispatch({ type: "ANA_COURSE_GRADE_LIST", value: res.ana_grade_per_course });
      dispatch({ type: "ANA_MODULE_LIST", value: res.ana_module });
      dispatch({ type: "ANA_ZOOM_LIST", value: res.ana_zoom });
      dispatch({ type: "USER_CHART_LIST_SET", value: res.user_chart });
      dispatch({ type: "USER_COMMENT_LIST_SET", value: res.user_comment_list });
    });
};

/**
 * @param {*} value { username, ... }
 */
export const actionEditAccount = (dispatch, value, t) => {
  dispatch({ type: "USER_CURR_UPDATE", value });

  const data = Object.keys(value).map(key => ({ name: key, value: convert2String(value[key]) }));

  asterAxios(dispatch, M_USER_EDIT, { input: data }, 'LOADED_ACCOUNT_UPDATE')
    .then(() => toaster({ type: "success", title: t('Profile edit success!') }))
    .catch(() => toaster({ type: "error", title: t('Profile edit error!') }));
};

/**
 * @param {*} value { page, page_size }
 */
export const actionUserList = (dispatch, value) => {
  asterAxios(dispatch, Q_USER_LIST, value, 'LOADED_USER_LIST')
    .then(res => dispatch({ type: "USER_LIST_SET", value: JSON.parse(res) }));
};

export const actionUserIdDelete = (dispatch) => dispatch({ type: "USER_NEW_ID_DELETE" });

/**
 * @param {*} value { user_id }
 */
export const actionGhostTokenGet = (dispatch, value, t) => {
  toaster({ type: "success", title: t('Fetching user token...') });
  asterAxios(dispatch, Q_GHOST_TOKEN_GET, value, 'LOADED_GHOST_TOKEN_GET')
    .then(res => dispatch({ type: "GHOST_TOKEN_SET", value: res }));
};

export const actionResetGhostToken = (dispatch) => {
  dispatch({ type: "GHOST_TOKEN_RESET" });
};

export const actionRegisterUser = (dispatch, value, t) => {
  dispatch({ type: "USER_NEW_ID_DELETE" });

  const data = Object.keys(value).map(key => ({ name: key, value: convert2String(value[key]) }));

  asterAxios(dispatch, M_REGISTER_USER, { input: data }, 'LOADED_USER_REGISTER')
    .then(res => {
      const { insertId, errorCode } = res;
      if (!insertId || errorCode) {
        const errMsg = { errorCode };
        throw errMsg;
      }
      value.is_active = false;
      value.id = insertId;
      dispatch({ type: "USER_NEW_INSERT", value });
      dispatch({ type: "USER_NEW_ID_INSERT", value: insertId });
      dispatch({ type: "USER_COURSE_LIST_INIT", value: [] });
      toaster({ type: "success", title: t('User register success!') });
    })
    .catch(err => {
      console.log('err', err);
      if (err.errorCode === 1) {
        toaster({ type: "error", title: t('Email exists. Please use another one!') });
      } else if (err.errorCode === 2) {
        toaster({ type: "error", title: t('Username exists. Please use another one!') });
      } else {
        toaster({ type: "error", title: t('User register error!') });
      }
    });
};

export const actionRegisterBulkUsers = (dispatch, value, t) => {

  const data = [];
  value.forEach(item => {
    const itemData = Object.keys(item).map(key => ({ name: key, value: convert2String(item[key]) }));
    data.push(itemData);
  });

  asterAxios(dispatch, M_REGISTER_BULK_USERS, { input: data }, 'LOADED_USER_BULK_REGISTER')
    .then(res => {
      value = value.map((v, k) => ({ ...v, id: res.first_user_id + k, is_active: true }));
      dispatch({ type: "USER_NEW_BULK_INSERT", value });
      toaster({ type: "success", title: `${t('User register success!')} ${res.possible} / ${res.total}` });
    })
    .catch(() => toaster({ type: "error", title: t('User register error!') }));
};

/**
 * @param {*} value { user_id, new_password }
 */
export const actionRegisteredUserPwdEdit = (dispatch, value, t) => {
  dispatch({ type: "USER_PWD_UPDATE", value: null });

  const reqBody = { ...value };
  delete reqBody.confirm_password;

  asterAxios(dispatch, M_REGISTERED_USER_PWD_EDIT, reqBody, 'LOADED_USER_PWD_EDIT')
    .then(() => toaster({ type: "success", title: t('Profile password update success!') }))
    .catch(() => {
      dispatch({ type: "USER_PWD_UPDATE", value: value.id });
      toaster({ type: "error", title: t('Profile password update error!') });
    });
};

/**
 * @param {*} value { id, data: {} }
 */
export const actionRegisteredUserEdit = (dispatch, value, t) => {
  dispatch({ type: "USER_LIST_UPDATE", value });

  const data = Object.keys(value.data).map(key => ({ name: key, value: convert2String(value.data[key]) }));

  asterAxios(dispatch, M_REGISTERED_USER_EDIT, { user_id: value.id, input: data }, 'LOADED_USER_EDIT')
    .then(res => res.success === "EMAIL EXIST" ? toaster({ type: "error", title: t('User email error!') }) : toaster({ type: "success", title: t('User edit success!') }))
    .catch(() => toaster({ type: "error", title: t('User edit error!') }));
};

/**
 * @param {*} value user_id
 */
export const actionUserDelete = (dispatch, value, t) => {
  dispatch({ type: "USER_DELETE", value });

  asterAxios(dispatch, M_USER_DELETE, { user_id: value }, 'LOADED_USER_DELETE')
    .then(() => toaster({ type: "success", title: t('User delete success!') }))
    .catch(() => toaster({ type: "error", title: t('User delete error!') }));
};

// Group
export const actionGroupList = (dispatch) => {
  asterAxios(dispatch, Q_GROUP_LIST, { input: { page: 0, pageSize: 100 } }, 'LOADED_GROUP_LIST')
    .then(res => dispatch({ type: "GROUP_LIST_SET", value: res }));
};

/**
 * @param {*} value { name, description, cover_url }
 */
export const actionGroupCreate = (dispatch, value, t) => {
  asterAxios(dispatch, M_GROUP_EDIT, value, 'LOADED_GROUP_CREATE')
    .then(res => {
      dispatch({ type: "GROUP_NEW_INSERT", value: { ...value, id: res, users: [], courses: [] } });
      toaster({ type: "success", title: t("Group create success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Group create error!") }));
};

export const actionGroupEdit = (dispatch, value, t) => {
  asterAxios(dispatch, M_GROUP_EDIT, value, 'LOADED_GROUP_EDIT')
    .then(() => {
      dispatch({ type: "GROUP_LIST_UPDATE", value });
      toaster({ type: "success", title: t("Group edit success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Group edit error!") }));
};

/**
 * @param {*} value { group_id, users }
 */
export const actionGroupAssignUsers = (dispatch, value, t) => {
  dispatch({ type: "GROUP_USER_ASSIGN", value });

  const data = { group_id: value.group_id, user_ids: value.users.map(v => v.id) };

  asterAxios(dispatch, M_GROUP_ASSIGN_USERS, data, 'LOADED_GROUP_USER_ASSIGN')
    .then(() => toaster({ type: "success", title: t("User assign success!") }))
    .catch(() => toaster({ type: "error", title: t("User assign error!") }));
};

/**
 * @param {*} value { group_id, user_ids }
 */
export const actionGroupDismissUsers = (dispatch, value, t) => {
  dispatch({ type: "GROUP_USER_DISMISS", value });

  asterAxios(dispatch, M_GROUP_DISMISS_USERS, value, 'LOADED_GROUP_USER_DISMISS')
    .then(() => toaster({ type: "success", title: t("User dismiss success!") }))
    .catch(() => toaster({ type: "error", title: t("User dismiss error!") }));
};

/**
 * @param {*} value { group_id, courses }
 */
export const actionGroupAssignCourses = (dispatch, value, t) => {
  const currDate = new Date();
  const nextYear = new Date(currDate.setFullYear(currDate.getFullYear() + 1)).toISOString();

  dispatch({ type: "GROUP_COURSE_ASSIGN", value: { ...value, courses: value.courses.map(v => ({ ...v, run_end: nextYear })) } });

  const data = { group_id: value.group_id, course_ids: value.courses.map(c => c.id) };
  asterAxios(dispatch, M_GROUP_ASSIGN_COURSES, data, 'LOADED_GROPU_COURSE_ASSIGN')
    .then(() => toaster({ type: "success", title: t("Course assign success!") }))
    .catch(() => toaster({ type: "error", title: t("Course assign error!") }));
};

/**
 * @param {*} value { group_id, course_ids }
 */
export const actionGroupDismissCourses = (dispatch, value, t) => {
  dispatch({ type: "GROUP_COURSE_DISMISS", value });

  asterAxios(dispatch, M_GROUP_DISMISS_COURSES, value, 'LOADED_GROUP_COURSE_DISMISS')
    .then(() => toaster({ type: "success", title: t("Course dismiss success!") }))
    .catch(() => toaster({ type: "error", title: t("Course dismiss error!") }));
};

export const actionGroupDelete = (dispatch, groupId, t) => {
  dispatch({ type: "GROUP_DELETE", value: groupId });

  asterAxios(dispatch, M_GROUP_DELETE, { group_id: groupId }, 'LOADED_GROUP_DELETE')
    .then(() => toaster({ type: "success", title: t('Group delete success!') }))
    .catch(() => toaster({ type: "error", title: t('Group delete error!') }));
};

// Course
/**
 * @param {*} value { page, page_size, search_term: [{name, value}]}
 */
export const actionCourseList = (dispatch, value) => {
  asterAxios(dispatch, Q_COURSE_LIST, value, 'LOADED_COURSE_LIST')
    .then((res) => dispatch({ type: "COURSE_LIST_SET", value: JSON.parse(res) }));
};

export const actionCourseGet = (dispatch, courseId) => {
  asterAxios(dispatch, Q_COURSE_STRUCTURE_GET, { course_id: courseId }, 'LOADED_COURSE_GET')
    .then((res) => dispatch({ type: "COURSE_DETAIL_SET", value: JSON.parse(res) }));
};

export const actionCourseDelete = (dispatch, courseId, t) => {
  dispatch({ type: "COURSE_DELETE", value: courseId });

  asterAxios(dispatch, M_COURSE_DELETE, { course_id: courseId }, 'LOADED_COURSE_DEELETE')
    .then(() => toaster({ type: "success", title: t("Course delete success!") }))
    .catch(() => toaster({ type: "error", title: t("Course delete error!") }));
};


// Category
export const actionCategoryList = (dispatch, value) => {
  asterAxios(dispatch, Q_CATEGORY_LIST, value, 'LOADED_CATEGORY_LIST')
    .then((res) => dispatch({ type: "CATEGORY_LIST_SET", value: res }));
};

/**
 * @param {*} value { name, courses }
 */
export const actionCategoryCreate = (dispatch, value, t) => {
  const data = { name: value.name, course_ids: value.courses.map(v => v.id) };
  asterAxios(dispatch, M_EDIT_CATEGORY, data, 'LOADED_CATEGORY_CREATE')
    .then((res) => {
      dispatch({ type: "CATEGORY_NEW_INSERT", value: { id: res, admin_editable: false, name: data.name, courses: value.courses } });
      toaster({ type: "success", title: t("Category create success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Category create error!") }));
};

/**
 * @param {*} value { category_id, name }
 */
export const actionCategoryEdit = (dispatch, value, t) => {
  dispatch({ type: "CATEGORY_LIST_UPDATE", value });

  asterAxios(dispatch, M_EDIT_CATEGORY, value, 'LOADED_CATEGORY_EDIT')
    .then(() => toaster({ type: "success", title: t("Category edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Category edit error!") }));
};

/**
 * @param {*} value { category_id, name, courses }
 */
export const actionCategoryAssignCourses = (dispatch, value, t) => {
  dispatch({ type: "CATEGORY_COURSE_ASSIGN", value });

  asterAxios(dispatch, M_ASSIGN_COURSES_TO_CATEGORY, { category_id: value.category_id, course_ids: value.courses.map(v => v.id) }, 'LOADED_CATEGORY_COURSE_ASSIGN')
    .then(() => toaster({ type: "success", title: t("Course assign success!") }))
    .catch(() => toaster({ type: "error", title: t("Course assign error!") }));
};

/**
 * @param {*} value { category_id, course_ids }
 */
export const actionCategoryDismissCourses = (dispatch, value, t) => {
  dispatch({ type: "CATEGORY_COURSE_DISMISS", value });

  asterAxios(dispatch, M_DISMISS_COURSES_FROM_CATEGORY, value, 'LOADED_CATEGORY_COURSE_DISMISS')
    .then(() => toaster({ type: "success", title: t("Course dismiss success!") }))
    .catch(() => toaster({ type: "error", title: t("Course dismiss error!") }));
};

export const actionCategoryDelete = (dispatch, categoryId, t) => {
  dispatch({ type: "CATEGORY_DELETE", value: categoryId });

  asterAxios(dispatch, M_DELETE_CATEGORY, { category_id: categoryId }, 'LOADED_CATEGORY_DELETE')
    .then(() => toaster({ type: "success", title: t('Category delete success!') }))
    .catch(() => toaster({ type: "error", title: t('Category delete error!') }));
};


// Email Template
export const actionEmailTemplateEdit = (dispatch, value, t) => {
  dispatch({ type: "EMAIL_TEMPLATE_LIST_UPDATE", value });
  value.enabled = Boolean(value.enabled);

  asterAxios(dispatch, M_EMAIL_TEMPLATE_EDIT, { input: value }, 'LOADED_EMAIL_TEMPLATE_EDIT')
    .then(() => toaster({ type: "success", title: t("Email edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Email edit error!") }));
};

// Email Log
/**
 * @param {*} value { email, name, html }
 */
export const actionSendTestEmail = (dispatch, value, t) => {
  const currDate = new Date().toISOString();
  const newLog = { type: "test", to: value.email, date: currDate, time: currDate };
  dispatch({ type: "EMAIL_LOG_NEW_INSERT", value: newLog });

  asterAxios(dispatch, Q_EMAIL_SEND, value, 'LOADED_EMAIL_LOG_CREATE')
    .then(() => toaster({ type: "success", title: t("Email sent success!") }))
    .catch(() => toaster({ type: "error", title: t("Email sent error!") }));
};

export const actionEmailLogList = (dispatch, value) => {
  asterAxios(dispatch, Q_EMAIL_LOG_LIST, value, 'LOADED_EMAIL_LOG_LIST')
    .then((res) => dispatch({ type: "EMAIL_LOG_LIST_SET", value: res }));
};

export const actionEmailLogDelete = (dispatch, logId, t) => {
  dispatch({ type: "EMAIL_LOG_DELETE", value: logId });

  asterAxios(dispatch, M_EMAIL_LOG_DELETE, { input: logId }, 'LOADED_EMAIL_LOG_DELETE')
    .then(() => toaster({ type: "success", title: t('Log delete success!') }))
    .catch(() => toaster({ type: "error", title: t('Log delete error!') }));
};

// SMS Template
export const actionSMSTemplateEdit = (dispatch, value, t) => {
  dispatch({ type: "SMS_TEMPLATE_LIST_UPDATE", value });

  asterAxios(dispatch, M_SMS_TEMPLATE_EDIT, { input: value }, 'LOADED_SMS_TEMPLATE_EDIT')
    .then(() => toaster({ type: "success", title: t("Template edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Template edit error!") }));
};

// SMS Log
/**
 * @param {*} value { phone, message }
 */
export const actionSendTestSMS = (dispatch, value, t) => {
  const currDate = new Date().getTime();
  const newLog = { type: "test", to: value.phone, time: currDate };
  dispatch({ type: "SMS_LOG_NEW_INSERT", value: newLog });

  asterAxios(dispatch, Q_SMS_SEND, value, 'LOADED_SMS_LOG_CREATE')
    .then(() => toaster({ type: "success", title: t("SMS send success!") }))
    .catch(() => toaster({ type: "error", title: t("SMS send error!") }));
};

/**
 * @param {*} value { page, page_size }
 */
export const actionSMSLogList = (dispatch, value) => {
  asterAxios(dispatch, Q_SMS_LOG_LIST, value, 'LOADED_SMS_LOG_LIST')
    .then((res) => dispatch({ type: "SMS_LOG_LIST_SET", value: res }));
};

export const actionSMSLogDelete = (dispatch, logId, t) => {
  dispatch({ type: "SMS_LOG_DELETE", value: logId });

  asterAxios(dispatch, M_SMS_LOG_DELETE, { input: logId }, 'LOADED_SMS_LOG_DELETE')
    .then(() => toaster({ type: "success", title: t('Log delete success!') }))
    .catch(() => toaster({ type: "error", title: t('Log delete error!') }));
};

// Analysis
/** @param {*} value { user_id, page, page_size } */
export const actionAnaUserLogList = (dispatch, value) => {
  asterAxios(dispatch, Q_ANA_USE_LOGIN, value, 'LOADED_ANA_USER_LOGIN')
    .then((res) => dispatch({ type: "ANA_USER_LOGIN_LIST", value: res }));
};

/** @param {*} value { user_id, page, page_size } */
export const actionAnaCourseGradeList = (dispatch, value) => {
  asterAxios(dispatch, Q_ANA_COURSE_GRADE, value, 'LOADED_ANA_COURSE_GRADE')
    .then((res) => dispatch({ type: "ANA_COURSE_GRADE_LIST", value: res }));
};

/** @param {*} value { user_id, page, page_size } */
export const actionAnaZoomList = (dispatch, value) => {
  asterAxios(dispatch, Q_ANA_ZOOM, value, 'LOADED_ANA_ZOOM_LIST')
    .then((res) => dispatch({ type: "ANA_ZOOM_LIST", value: res }));
};

/** @param {*} value { user_id, page, page_size } */
export const actionAnaModuleList = (dispatch, value) => {
  asterAxios(dispatch, Q_ANA_MODULE, value, 'LOADED_ANA_MODULE_LIST')
    .then((res) => dispatch({ type: "ANA_MODULE_LIST", value: res }));
};

/**
 * @param {*} value { page, page_size}
 */
export const actionTutorList = (dispatch, value) => {
  asterAxios(dispatch, Q_TUTOR_LIST, value, 'LOADED_TUTOR_LIST')
    .then((res) => dispatch({ type: "TUTOR_LIST_SET", value: res }));
};

export const actionTutorCreate = (dispatch, value, t) => {
  value.year_of_birth = value.year_of_birth ? Number(value.year_of_birth) : null;

  asterAxios(dispatch, M_TUTOR_EDIT, { input: value }, 'LOADED_TUTOR_CREATE')
    .then((res) => {
      dispatch({ type: "TUTOR_NEW_INSERT", value: { id: res, ...value } });
      toaster({ type: "success", title: t("Tutor create success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Tutor create error!") }));
};

export const actionTutorEdit = (dispatch, value, t) => {
  dispatch({ type: "TUTOR_LIST_UPDATE", value });

  asterAxios(dispatch, M_TUTOR_EDIT, { input: value }, 'LOADED_TUTOR_EDIT')
    .then(() => toaster({ type: "success", title: t("Tutor edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Tutor edit error!") }));
};

export const actionTutorDelete = (dispatch, tutorId, t) => {
  dispatch({ type: "TUTOR_DELETE", value: tutorId });

  asterAxios(dispatch, M_TUTOR_DELETE, { tutor_id: tutorId }, 'LOADED_TUTOR_DELETE')
    .then(() => toaster({ type: "success", title: t("Tutor delete success!") }))
    .catch(() => toaster({ type: "error", title: t("Tutor delete error!") }));
};

// Coach
export const actionCoachList = (dispatch, value) => {
  asterAxios(dispatch, Q_COACH_LIST, value, 'LOADED_COACH_LIST')
    .then((res) => dispatch({ type: "COACH_LIST_SET", value: res }));
};

export const actionCoachCreate = (dispatch, value, t) => {
  value.year_of_birth = value.year_of_birth ? Number(value.year_of_birth) : null;

  asterAxios(dispatch, M_COACH_EDIT, { input: value }, 'LOADED_COACH_CREATE')
    .then((res) => {
      dispatch({ type: "COACH_NEW_INSERT", value: { id: res, ...value } });
      toaster({ type: "success", title: t("Coach create success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Coach create error!") }));
};

export const actionCoachEdit = (dispatch, value, t) => {
  dispatch({ type: "COACH_LIST_UPDATE", value });

  value.course_ids = value.courses.map(v => v.id);
  delete value.courses;
  asterAxios(dispatch, M_COACH_EDIT, { input: value }, 'LOADED_COACH_EDIT')
    .then(() => toaster({ type: "success", title: t("Coach edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Coach edit error!") }));
};

export const actionCoachDelete = (dispatch, coachId, t) => {
  dispatch({ type: "COACH_DELETE", value: coachId });

  asterAxios(dispatch, M_COACH_DELETE, { coach_id: coachId }, 'LOADED_COACH_DELETE')
    .then(() => toaster({ type: "success", title: t("Coach delete success!") }))
    .catch(() => toaster({ type: "error", title: t("Coach delete error!") }));
};

// Theming
export const actionThemeEdit = (dispatch, value, t) => {
  dispatch({ type: "THEME_LIST_UPDATE", value });
  value.default = Boolean(value.default);

  asterAxios(dispatch, M_THEME_EDIT, { input: value }, 'LOADED_THEME_EDIT')
    .then(() => toaster({ type: "success", title: t("Theme edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Theme edit error!") }));
};

// Course user assign
export const actionUserCourseList = (dispatch, userId) => {
  asterAxios(dispatch, Q_USER_COURSE_LIST, { user_id: userId }, 'LOADED_USER_COURSE_LIST')
    .then((res) => dispatch({ type: "USER_COURSE_LIST_SET", value: res }));
};

export const actionUserCourseListInit = (dispatch) => dispatch({ type: "USER_COURSE_LIST_INIT", value: [] });

/**
 * @param {*} value { user_id, courses }
 */
export const actionUserAssignCourses = (dispatch, value, t) => {
  const currDate = new Date();
  const currTime = currDate.getTime();
  const nextYear = new Date(currDate.setFullYear(currDate.getFullYear() + 1)).getTime();

  dispatch({ type: "USER_COURSE_ASSIGN", value: value.courses.map(v => ({ ...v, run_start: currTime, run_end: nextYear })) });

  const data = { user_id: value.user_id, course_ids: value.courses.map(c => c.id) };
  asterAxios(dispatch, M_ASSIGN_COURSES_TO_USER, data, 'LOADED_USER_COURSE_ASSIGN')
    .then(() => toaster({ type: "success", title: t("Course assign success!") }))
    .catch(() => toaster({ type: "error", title: t('Course assign error!') }));
};

/**
 * @param {*} value { user_id, course_ids }
 */
export const actionUserDismissCourses = (dispatch, value, t) => {
  dispatch({ type: "USER_COURSE_DISMISS", value });

  asterAxios(dispatch, M_DISMISS_COURSES_FROM_USER, value, 'LOADED_USER_COURSE_DISMISS')
    .then(() => toaster({ type: "success", title: t("Course dismiss success!") }))
    .catch(() => toaster({ type: "error", title: t("Course dismiss error!") }));
};

/**
 * @param {*} value { user_id, course_id, run_end }
 */
export const actionStudentEnrollDateEdit = (dispatch, value, t) => {
  asterAxios(dispatch, M_UPDATE_ENROLL_DATES, value, 'LOADED_STUDENT_ENROLL_EDIT')
    .then(() => toaster({ type: "success", title: t("Course run date edit success!") }))
    .catch(() => toaster({ type: "error", title: t('Course run date edit error!') }));
};

// license
export const actionLicenseList = (dispatch, value) => {
  asterAxios(dispatch, Q_LICENSE_LIST, value, 'LOADED_LICENSE_LIST')
    .then((res) => dispatch({ type: "LICENSE_LIST_SET", value: res }));
};

/**
 * @param {*} value { type, price, quantity, annual }
 */
export const actionLicenseCreate = (dispatch, value) => {
  value.annual = Boolean(value.annual);
  asterAxios(dispatch, M_LICENSE_ADD, value)
    .then(() => dispatch({ type: "LICENSE_AVAILABLE_ADD", value: value.quantity }));
};

export const actionStripeClientSecretGet = (dispatch, amount, currency) => {
  asterAxios(dispatch, Q_GET_STRIPE_CLIENT_SECRET, { input: { amount, currency } }, 'LOADED_STRIPE_CLIENT_SECRET')
    .then((res) => dispatch({ type: "STRIPE_CLIENT_SECRET_SET", value: res }));
};

export const actionStripeProcess = (dispatch, id, amount, quantity, unitPrice, type, annual, MSG_T = '', MSG_F = '') => {
  asterAxios(dispatch, M_STRIPE_PROCESS, { input: { id, amount, quantity, type, unit_price: unitPrice, annual } })
    .then(() => {
      dispatch({ type: "LICENSE_AVAILABLE_ADD", value: quantity });
      toaster({ type: "success", title: MSG_T });
    })
    .catch(() => toaster({ type: "error", title: MSG_F }));
};

export const actionDashboardInfoGet = (dispatch) => {
  asterAxios(dispatch, Q_DASHBOARD_INFO_GET, {}, 'LOADED_DASHBOARD_INFO_GET')
    .then((res) => dispatch({ type: "DASHBOARD_INFO_SET", value: res }));
};

// Zoom
export const actionZoomMeetingList = (dispatch, value) => {
  asterAxios(dispatch, Q_ZOOM_MEETING_LIST, value, 'LOADED_ZOOM_MEETING_LIST')
    .then((res) => dispatch({ type: "ZOOM_MEETING_LIST_SET", value: JSON.parse(res) }));
};

/**
 * @param {*} value { topic, description, meeting_type, duration, courses, tutor, start_time, timezone, recur_type, recur_day, end_times }
 */
export const actionZoomMeetingCreate = (dispatch, value, t) => {
  const reqBody = {
    ...value,
    course_ids: value.courses.map(v => v.id),
    tutor_id: value.tutor.id,
  };
  delete reqBody.courses;
  delete reqBody.tutor;

  asterAxios(dispatch, M_ZOOM_MEETING_CREATE, { input: reqBody }, 'LOADED_ZOOM_MEETING_CREATE')
    .then((res) => {
      dispatch({ type: "ZOOM_MEETING_NEW_INSERT", value: { id: res, ...value } });
      toaster({ type: "success", title: t("Zoom session create success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Zoom session create error!") }));
};

/**
 * @param {*} value { id, topic, description, meeting_type, duration, courses, tutor, start_time, timezone, recur_type, recur_day, end_times }
 */
export const actionZoomMeetingEdit = (dispatch, value, t) => {
  const reqBody = {
    ...value,
    course_ids: value.courses.map(v => v.id),
    tutor_id: value.tutor.id,
  };
  delete reqBody.courses;
  delete reqBody.tutor;

  asterAxios(dispatch, M_ZOOM_MEETING_EDIT, { input: reqBody }, 'LOADED_ZOOM_MEETING_EDIT')
    .then(() => {
      dispatch({ type: "ZOOM_MEETING_LIST_UPDATE", value: value });
      toaster({ type: "success", title: t("Zoom meeting edit success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Zoom meeting edit error!") }));
};

export const actionZoomMeetingDelete = (dispatch, zoomMeetingId, t) => {
  dispatch({ type: "ZOOM_MEETING_DELETE", value: zoomMeetingId });

  asterAxios(dispatch, M_ZOOM_MEETING_DELETE, { zoom_meeting_id: zoomMeetingId }, 'LOADED_ZOOM_MEETING_DELETE')
    .then(() => toaster({ type: "success", title: t('Session delete success!') }))
    .catch(() => toaster({ type: "error", title: t('Session delete error!') }));
};

// Zoom History
export const actionZoomHistoryList = (dispatch, value) => {
  asterAxios(dispatch, Q_ZOOM_HISTORY_LIST, value, 'LOADED_ZOOM_HISTORY_LIST')
    .then((res) => dispatch({ type: "ZOOM_HISTORY_LIST_SET", value: JSON.parse(res) }));
};

// Term
export const actionTermGet = (dispatch) => {
  asterAxios(dispatch, Q_TERM_GET, {}, 'LOADED_TERM_GET')
    .then((res) => dispatch({ type: "TERM_SET", value: res }));
};

/**
  * { content, enabled }
  */
export const actionTermEdit = (dispatch, value, t) => {

  dispatch({ type: "TERM_UPDATE", value });

  value.enabled = Boolean(value.enabled);
  asterAxios(dispatch, M_TERM_EDIT, value, 'LOADED_TERM_EDIT')
    .then(() => toaster({ type: "success", title: t("Term edit success!") }))
    .catch(() => toaster({ type: "error", title: t("Term edit error!") }));
};



export const actionResetPlatform = (dispatch, t) => {
  asterAxios(dispatch, M_RESET_PLATFORM, {}, 'LOADED_RESET_PLATFORM')
    .then(() => toaster({ type: "success", title: t("Reset platform success!") }))
    .catch(() => toaster({ type: "error", title: t("Reset platform error!") }));
};

export const actionCertificateVariableEdit = (dispatch, value, t) => {
  asterAxios(dispatch, M_CERTIFICATE_VARIABLE_EDIT, { input: value }, 'LOADED_CERT_VAR_EDIT')
    .then(() => {
      dispatch({ type: "CERT_VAR_UPDATE", value });
      toaster({ type: "success", title: t("Variable edit success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Variable edit error!") }));
};

/**
 * @param {*} value { course_id, objective, short_description, category, list: [{section_title, sequence_title, vertical_title, duration}]}
 */
export const actionCourseAdditionEdit = (dispatch, value, t) => {
  asterAxios(dispatch, M_COURSE_ADDITION, { input: value }, 'LOADED_COURSE_ADDITION_EDIT')
    .then(() => {
      dispatch({ type: "COURSE_ADDITION_EDIT", value });
      toaster({ type: "success", title: t("Course edit success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Course edit error!") }));
};

// Chat
/** @param {*} value { user_id, text, urls, to_admin, created, updated } */
export const actionChatAdd = (dispatch, value) => {
  dispatch({ type: "CHAT_ADD", value });
  const data = {
    event_id: `${process.env.REACT_APP_SITE_NAME}_${value.user_id}`,
    text: value.text || '',
    urls: value.urls || []
  };
  if (!value.is_new) asterAxios(dispatch, M_ADD_CHAT, data);
};

export const actionChatEnable = (dispatch, flag, t) => {
  dispatch({ type: "CHAT_ENABLE_SET", value: flag });

  asterAxios(dispatch, M_CHAT_FLAG_EDIT, { input: flag })
    .then(() => toaster({ type: "success", title: t("Chat enable success!") }))
    .catch(() => toaster({ type: "error", title: t("Chat enable error!") }));
};

/** @param {*} value { user_id, page, page_size } */
export const actionChatList = (dispatch, value) => {
  asterAxios(dispatch, Q_LIST_CHAT, value, 'LOADED_CHAT_LIST')
    .then((res) => dispatch({ type: "CHAT_LIST_SET", value: { user_id: value.user_id, data: res } }));
};

/** @param {*} value { page, page_size } */
export const actionChatActiveUserList = (dispatch, value) => {
  asterAxios(dispatch, Q_CHAT_USER_LIST, { enabled: true, ...value }, 'LOADED_CHAT_USER_ACTIVE_LIST')
    .then((res) => dispatch({ type: "CHAT_ACTIVE_USER_LIST_SET", value: res }));
};

/** @param {*} value { user_id, full_name, username, email, avatar, phone_number, role, location, count, enabled, created, udpated, message_more: false, page: 0, messages: [] } */
export const actionChatActiveUserAdd = (dispatch, value) => {
  dispatch({ type: "CHAT_ACTIVE_USER_ADD_SET", value });
};

/** @param {*} value user_id */
export const actionChatMarkRead = (dispatch, value) => {
  dispatch({ type: "CHAT_MARK_READ", value });
};

export const actionChatMarkAllRead = (dispatch) => {
  dispatch({ type: "CHAT_MARK_ALL_READ" });
};

/** @param {*} value { page, page_size } */
export const actionChatArchievedUserList = (dispatch, value) => {
  asterAxios(dispatch, Q_CHAT_USER_LIST, { enabled: false, ...value }, 'LOADED_CHAT_USER_ARCHIEVE_LIST')
    .then((res) => dispatch({ type: "CHAT_ARCHIEVED_USER_LIST_SET", value: res }));
};

/** @param {*} value { enabled, user } */
export const actionChatUserEnabledEdit = (dispatch, value, t) => {
  dispatch({ type: "CHAT_USER_ENABLED_UPDATE", value });

  asterAxios(dispatch, M_CHAT_USER_ENABLED, { user_id: value.user?.user_id, enabled: value.enabled })
    .then(() => toaster({ type: "success", title: t("Status change success!") }))
    .catch(() => toaster({ type: "error", title: t("Status change error!") }));
};

export const actionSendReminders = (dispatch, userIds = [], t) => {
  asterAxios(dispatch, Q_SEND_REMINDERS, { user_ids: userIds })
    .then(() => toaster({ type: "success", title: t("Send reminders success!") }))
    .catch(() => toaster({ type: "error", title: t("Send reminders error!") }));
};

export const actionCommentList = (dispatch, value) => {
  asterAxios(dispatch, Q_COMMENT_LIST, value, 'LOADED_COMMENT_LIST')
    .then((res) => dispatch({ type: "COMMENT_LIST_SET", value: res }));
};

/**
 * @param {*} data {comment_id, author_name, author_fullname, visible, body, files }
 */
export const actionCommentReply = (dispatch, data, t) => {

  dispatch({ type: "COMMENT_REPLY_ADD", value: data });

  const obj = { ...data };
  delete obj.author_id;
  delete obj.avatar;
  delete obj.created_at;

  asterAxios(dispatch, M_COMMENT_REPLY, { input: obj }, 'LOADED_COMMENT_REPLY')
    .then(() => toaster({ type: "success", title: t("Comment reply success!") }))
    .catch(() => toaster({ type: "error", title: t("Comment reply error!") }));
};

export const actionCommentDelete = (dispatch, id, t) => {

  dispatch({ type: "COMMENT_DELETE", value: id });

  asterAxios(dispatch, M_COMMENT_DELETE, { comment_id: id }, 'LOADED_COMMENT_DELETE')
    .then(() => toaster({ type: "success", title: t("Comment delete success!") }))
    .catch(() => toaster({ type: "error", title: t("Comment delete error!") }));
};

export const actionReviewList = (dispatch, value) => {

  asterAxios(dispatch, Q_REVIEW_LIST, value, 'LOADED_REVIEW_LIST')
    .then((res) => dispatch({ type: "REVIEW_LIST_SET", value: res }));
};

export const actionReviewDelete = (dispatch, id, t) => {
  dispatch({ type: "REVIEW_DELETE", value: id });
  asterAxios(dispatch, M_REVIEW_DELETE, { review_id: id }, 'LOADED_REVIEW_DELETE')
    .then(() => toaster({ type: "success", title: t("Review delete success!") }))
    .catch(() => toaster({ type: "error", title: t("Review delete error!") }));
};

export const actionPhysicalSessionList = (dispatch, pageSize, page) => {
  asterAxios(dispatch, Q_LIST_PHYSICAL_SESSION, { input: { page: page, pageSize } }, 'LOADED_PHYSICAL_SESSION_LIST')
    .then((res) => dispatch({ type: "PHYSICAL_SESSION_LIST_SET", value: res }));
};

/**
 * @param {*} value { session_id, page, page_size }
 */
export const actionPhysicalSessionUserList = (dispatch, value) => {
  asterAxios(dispatch, Q_LIST_PHYSICAL_SESSION_USER, value, 'LOADED_PHYSICAL_SESSION_USER_LIST')
    .then((res) => dispatch({
      type: "PHYSICAL_SESSION_USER_LIST_SET",
      value: { arr: res, sessionId: value.session_id } || { arr: [], sessionId: value.session_id }
    }));
};

/** @param {*} value coach_name, subject, program, location, start, end */
export const actionPhysicalSessionCreate = (dispatch, value, t) => {
  asterAxios(dispatch, M_EDIT_PHYSICAL_SESSION, { input: value }, 'LOADED_PHYSICAL_SESSION_CREATE')
    .then((res) => {
      dispatch({ type: "PHYSICAL_SESSION_CREATE", value: { id: res, ...value } });
      toaster({ type: "success", title: t("Session create success!") });
    })
    .catch(() => toaster({ type: "error", title: t("Session create error!") }));
};

/** @param {*} value id, coach_name, subject, program, location, start, end */
export const actionPhysicalSessionEdit = (dispatch, value, MSG_T = '', MSG_F = '') => {
  dispatch({ type: "PHYSICAL_SESSION_EDIT", value });
  asterAxios(dispatch, M_EDIT_PHYSICAL_SESSION, { input: value }, 'LOADED_PHYSICAL_SESSION_EDIT')
    .then(() => toaster({ type: "success", title: MSG_T }))
    .catch(() => toaster({ type: "error", title: MSG_F }));
};

/**
 * @param {*} value { session_id, users }
 */
export const actionAssignUsersToPhysicalSession = (dispatch, value, t) => {
  dispatch({ type: "PHYSICAL_SESSION_USERS_ASSIGN", value });

  const data = { session_id: value.session_id, user_ids: value.users.map(v => v.id) };
  asterAxios(dispatch, M_ASSIGN_USERS_TO_PHYSICAL_SESSION, data, 'LOADED_PHYSICAL_SESSION_USER_ASSIGN')
    .then(() => toaster({ type: "success", title: t("User assign success!") }))
    .catch(() => toaster({ type: "error", title: t("User assign error!") }));
};

/** @param {*} value { session_id, user_ids } */
export const actionDismissUsersFromPhysicalSession = (dispatch, value, t) => {
  dispatch({ type: "PHYSICAL_SESSION_USERS_DISMISS", value });

  asterAxios(dispatch, M_DISMISS_USERS_FROM_PHYSICAL_SESSION, value, 'LOADED_PHYSICAL_SESSION_USER_DISMISS')
    .then(() => toaster({ type: "success", title: t("User dismiss success!") }))
    .catch(() => toaster({ type: "error", title: t("User dismiss error!") }));
};

/** @param {*} value session_id */
export const actionPhysicalSessionDelete = (dispatch, value, t) => {
  dispatch({ type: "PHYSICAL_SESSION_DELETE", value });

  asterAxios(dispatch, M_DELETE_PHYSICAL_SESSION, { session_id: value }, 'LOADED_PHYSICAL_SESSION_DELETE')
    .then(() => toaster({ type: "success", title: t("Session delete success!") }))
    .catch(() => toaster({ type: "error", title: t("Session delete error!") }));
};

/**
 * @param {*} value { user_id, start, end } 
 */
export const actionUserChartList = (dispatch, value) => {
  asterAxios(dispatch, Q_LIST_USER_CHART, value, 'LOADED_USER_CHART_LIST')
    .then((res) => dispatch({ type: "USER_CHART_LIST_SET", value: res }));
};

/**
 * @param {*} value { user_id, start, end } 
 */
export const actionUserCommentList = (dispatch, value) => {
  asterAxios(dispatch, Q_LIST_USER_COMMENT, value, 'LOADED_USER_COMMENT_LIST')
    .then((res) => dispatch({ type: "USER_COMMENT_LIST_SET", value: res }));
};

/**
 * @param {*} value { course_id, start, end } 
 */
export const actionDashboardChartList = (dispatch, value) => {
  asterAxios(dispatch, Q_DASHBOARD_CHART_LIST, value, 'LOADED_DASHBOARD_CHART_LIST')
    .then((res) => dispatch({ type: "DASHBOARD_CHART_LIST_SET", value: res }));
};

/**
 * @param {*} value { start, end } 
 */
export const actionTrackChartList = (dispatch, value) => {
  asterAxios(dispatch, Q_TRACK_CHART_LIST, value, 'LOADED_TRACK_CHART_LIST')
    .then((res) => dispatch({ type: "TRACK_CHART_LIST_SET", value: res }));
};

/**
 * @param {*} value { search_term } 
 */
export const actionSearchList = (dispatch, value) => {
  asterAxios(dispatch, Q_SEARCH_LIST, value, 'LOADED_SEARCH_LIST')
    .then((res) => dispatch({ type: "SEARCH_LIST_SET", value: res }));
};