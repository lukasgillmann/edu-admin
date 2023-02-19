import { createContext, useContext, useEffect, useReducer, useState } from "react";

const AsterContext = createContext();
AsterContext.displayName = "AsterContext";

const PAGE_DEFAULT = {
  total: 0,
  page: 0,
  page_size: 10,
  data: []
};

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_MINI_SIDENAV":
      return { ...state, miniSidenav: action.value };
    case "SET_MOBILE":
      return { ...state, mobile: action.value };
    case "SET_DARK_MODE":
      return { ...state, darkMode: action.value };

    // Dashboard 
    case "DASHBOARD_INFO_SET":
      return {
        ...state,
        dashboardInfo: {
          best_courses: action.value.best_courses || [],
          course_enrollment: action.value.course_enrollment || [],
          course_complete: action.value.course_complete || [],
          numbers: action.value.numbers || {},
          license_number: action.value.license
        }
      };
    case "LOADED_DASHBOARD_INFO_GET":
      return { ...state, loadedDashboardInfo: action.value };
    case "LOADED_ADMIN_DASHBOARD_GET":
      return { ...state, loadedAdminDashboardGet: action.value };
    case "LOADED_ADMIN_USER_INSPECT_GET":
      return { ...state, loadedAdminUserInspectGet: action.value };

    // Course
    case "COURSE_LIST_SET":
      return { ...state, courses: action.value };
    case "LOADED_COURSE_LIST":
      return { ...state, loadedCourseList: action.value };
    case "COURSE_DETAIL_SET":
      return { ...state, courseStructure: action.value };
    case "LOADED_COURSE_GET":
      return { ...state, loadedCourseStructure: action.value };

    // User
    case "USER_LIST_SET":
      return { ...state, users: action.value };
    case "USER_CURR_SET":
      return { ...state, user: action.value };
    case "USER_CURR_UPDATE": {
      const { user } = state;
      Object.keys(action.value).forEach(key => {
        user[key] = action.value[key];
      });

      return { ...state, user };
    }
    case "LOADED_ACCOUNT_UPDATE":
      return { ...state, loadedCurrUserUpdate: action.value };

    // User List
    case "USER_LIST_UPDATE":
      return { ...state, users: { ...state.users, data: state.users.data.map(user => user.id === action.value.id ? { ...user, ...action.value.data } : user) } };
    case "USER_PWD_UPDATE":
      return { ...state, pwdErrorId: action.value };
    case "USER_NEW_INSERT":
      return { ...state, users: { ...state.users, total: state.users.total + 1, data: [...state.users.data, action.value].slice(0, state.users.page_size) } };
    case "USER_NEW_ID_INSERT":
      return { ...state, userId: action.value };
    case "USER_NEW_ID_DELETE":
      return { ...state, userId: null };
    case "USER_NEW_BULK_INSERT":
      return { ...state, users: { ...state.users, total: state.users.total + action.value.length, data: [...state.users.data, ...action.value].slice(0, state.users.page_size) } };
    case "LOADED_USER_BULK_REGISTER":
      return { ...state, loadedBulkUserRegister: action.value };
    case "USER_DELETE":
      return { ...state, users: { ...state.users, total: state.users.total - 1, data: state.users.data.filter(u => u.id !== action.value) } };
    case "LOADED_USER_DELETE":
      return { ...state, loadedUserDelete: action.value };
    case "LOADED_USER_REGISTER":
      return { ...state, loadedUserRegister: action.value };
    case "LOADED_USER_EDIT":
      return { ...state, loadedEditUserInfo: action.value };
    case "LOADED_USER_PWD_EDIT":
      return { ...state, loadedEditUserPwd: action.value };
    case "LOADED_USER_LIST":
      return { ...state, loadedUserList: action.value };

    // Group
    case "GROUP_LIST_SET":
      return { ...state, groups: action.value };
    case "LOADED_GROUP_LIST":
      return { ...state, loadedGroupList: action.value };
    case "GROUP_NEW_INSERT":
      return { ...state, groups: { ...state.groups, total: state.groups.total + 1, data: [...state.groups.data, action.value].slice(0, state.groups.page_size) } };
    case "LOADED_GROUP_CREATE":
      return { ...state, loadedGroupCreate: action.value };
    case "GROUP_LIST_UPDATE":
      return { ...state, groups: { ...state.groups, data: state.groups.data.map(v => v.id === action.value.group_id ? { ...v, ...action.value } : v) } };
    case "LOADED_GROUP_EDIT":
      return { ...state, loadedGroupEdit: action.value };
    case "GROUP_USER_ASSIGN": {
      return {
        ...state,
        groups: {
          ...state.groups,
          data: state.groups.data.map(g =>
            g.id !== action.value.group_id ? g : {
              ...g,
              users: [...g.users, ...action.value.users]
            }
          )
        }
      };
    }
    case "LOADED_GROUP_USER_ASSIGN":
      return { ...state, loadedGroupUserAssign: action.value };
    case "GROUP_USER_DISMISS": {
      return {
        ...state,
        groups: {
          ...state.groups,
          data: state.groups.data.map(g =>
            g.id !== action.value.group_id ? g : {
              ...g,
              users: g.users.filter(v1 => !action.value.user_ids.includes(v1.id))
            }
          )
        }
      };
    }
    case "LOADED_GROUP_USER_DISMISS":
      return { ...state, loadedGroupUserDismiss: action.value };
    case "GROUP_COURSE_ASSIGN": {
      const dashboardInfo = state.dashboardInfo;
      if (dashboardInfo.license_number && dashboardInfo.license_number.license_available !== null) {
        dashboardInfo.license_number.license_available -= action.value.count;
      }

      return {
        ...state,
        groups: {
          ...state.groups,
          data: state.groups.data.map(group => group.id === action.value.group_id ? {
            ...group,
            courses: [...group.courses, ...action.value.courses]
          } : group)
        },
        dashboardInfo: dashboardInfo
      };
    }
    case "LOADED_GROPU_COURSE_ASSIGN":
      return { ...state, loadedGroupCourseAssign: action.value };
    case "GROUP_COURSE_DISMISS": {
      return {
        ...state,
        groups: {
          ...state.groups,
          data: state.groups.data.map(g =>
            g.id !== action.value.group_id ? g : {
              ...g,
              courses: g.courses.filter(v1 => !action.value.course_ids.includes(v1.id))
            }
          )
        }
      };
    }
    case "LOADED_GROUP_COURSE_DISMISS":
      return { ...state, loadedGroupCourseDismiss: action.value };
    case "GROUP_DELETE":
      return { ...state, groups: { ...state.groups, total: state.groups.total - 1, data: state.groups.data.filter(u => u.id !== action.value) } };
    case "LOADED_GROUP_DELETE":
      return { ...state, loadedGroupDelete: action.value };

    // Category
    case "CATEGORY_LIST_SET":
      return { ...state, categories: action.value };
    case "LOADED_CATEGORY_LIST":
      return { ...state, loadedCategoryList: action.value };
    case "CATEGORY_NEW_INSERT":
      return {
        ...state,
        categories: {
          ...state.categories,
          total: state.categories.total + 1,
          data: [...state.categories.data, action.value].slice(0, state.categories.page_size)
        },
        courses: {
          ...state.courses,
          data: state.courses.data.map(v =>
            action.value.courses.map(c => c.id)?.includes(v.id) ? { ...v, category: action.value.name } : v
          )
        }
      };
    case "LOADED_CATEGORY_CREATE":
      return { ...state, loadedCategoryCreate: action.value };
    case "CATEGORY_LIST_UPDATE":
      return { ...state, categories: { ...state.categories, data: state.categories.data.map(v => v.id === action.value.category_id ? { ...v, ...action.value } : v) } };
    case "LOADED_CATEGORY_EDIT":
      return { ...state, loadedCategoryEdit: action.value };
    case "CATEGORY_COURSE_ASSIGN":
      return {
        ...state,
        categories: {
          ...state.categories,
          data: state.categories.data.map(category => category.id === action.value.category_id ? {
            ...category,
            courses: [...category.courses, ...action.value.courses]
          } : category)
        },
        courses: {
          ...state.courses,
          data: state.courses.data.map(v =>
            action.value.courses.map(c => c.id)?.includes(v.id) ? { ...v, category: action.value.name } : v
          )
        }
      };
    case "LOADED_CATEGORY_COURSE_ASSIGN":
      return { ...state, loadedCategoryCourseAssign: action.value };
    case "CATEGORY_COURSE_DISMISS":
      return {
        ...state,
        categories: {
          ...state.categories,
          data: state.categories.data.map(g =>
            g.id !== action.value.category_id ? g : {
              ...g,
              courses: g.courses.filter(v1 => !action.value.course_ids.includes(v1.id))
            }
          )
        },
        courses: {
          ...state.courses,
          data: state.courses.data.map(v =>
            action.value.course_ids.includes(v.id) ? { ...v, category: '' } : v
          )
        }
      };
    case "LOADED_CATEGORY_COURSE_DISMISS":
      return { ...state, loadedCategoryCourseDismiss: action.value };
    case "CATEGORY_DELETE":
      return { ...state, categories: { ...state.categories, total: state.categories.total - 1, data: state.categories.data.filter(u => u.id !== action.value) } };
    case "LOADED_CATEGORY_DELETE":
      return { ...state, loadedCategoryDelete: action.value };

    // Email template
    case "EMAIL_TEMPLATE_LIST_SET":
      return { ...state, emailTemplates: action.value };
    case "EMAIL_TEMPLATE_LIST_UPDATE":
      return { ...state, emailTemplates: state.emailTemplates.map(temp => temp.id === action.value.id ? { ...temp, ...action.value } : temp) };
    case "LOADED_EMAIL_TEMPLATE_EDIT":
      return { ...state, loadedEmailTemplateEdit: action.value };

    // Email Log
    case "EMAIL_LOG_LIST_SET":
      return { ...state, emailLogs: action.value };
    case "EMAIL_LOG_NEW_INSERT":
      return { ...state, emailLogs: { total: state.emailLogs.total + 1, data: [action.value, ...state.emailLogs.data].slice(0, state.smsLogs.page_size) } };
    case "LOADED_EMAIL_LOG_CREATE":
      return { ...state, loadedEmailLogInsert: action.value };
    case "LOADED_EMAIL_LOG_LIST":
      return { ...state, loadedEmailLogList: action.value };
    case "EMAIL_LOG_DELETE":
      return {
        ...state, emailLogs: {
          total: state.emailLogs.total - 1,
          data: state.emailLogs.data.filter(ed => ed._id !== action.value)
        }
      };
    case "LOADED_EMAIL_LOG_DELETE":
      return { ...state, loadedEmailLogDelete: action.value };

    // SMS template
    case "SMS_TEMPLATE_LIST_SET":
      return { ...state, smsTemplates: action.value };
    case "SMS_TEMPLATE_LIST_UPDATE":
      return { ...state, smsTemplates: state.smsTemplates.map(temp => temp.id === action.value.id ? action.value : temp) };
    case "LOADED_SMS_TEMPLATE_EDIT":
      return { ...state, loadedSMSTemplateEdit: action.value };

    // SMS Log
    case "SMS_LOG_LIST_SET":
      return { ...state, smsLogs: action.value };
    case "SMS_LOG_NEW_INSERT":
      return { ...state, smsLogs: { total: state.smsLogs.total + 1, data: [action.value, ...state.smsLogs.data].slice(0, state.smsLogs.page_size) } };
    case "LOADED_SMS_LOG_CREATE":
      return { ...state, loadedSMSLogInsert: action.value };
    case "LOADED_SMS_LOG_LIST":
      return { ...state, loadedSMSLogList: action.value };
    case "SMS_LOG_DELETE":
      return {
        ...state, smsLogs: {
          total: state.smsLogs.total - 1,
          data: state.smsLogs.data.filter(ed => ed._id !== action.value)
        }
      };
    case "LOADED_SMS_LOG_DELETE":
      return { ...state, loadedSMSLogDelete: action.value };

    // Analysis
    case "ANA_USER_LOGIN_LIST":
      return { ...state, anaUserLogins: action.value };
    case "LOADED_ANA_USER_LOGIN":
      return { ...state, loadedAnaUserLoginList: action.value };
    case "ANA_COURSE_GRADE_LIST":
      return { ...state, anaCourseGrades: action.value };
    case "LOADED_ANA_COURSE_GRADE":
      return { ...state, loadedAnaCourseGradeList: action.value };
    case "ANA_ZOOM_LIST":
      return { ...state, anaZooms: action.value };
    case "LOADED_ANA_ZOOM_LIST":
      return { ...state, loadedAnaZoomList: action.value };
    case "ANA_MODULE_LIST":
      return { ...state, anaModules: action.value };
    case "LOADED_ANA_MODULE_LIST":
      return { ...state, loadedAnaModuleList: action.value };
    case "USER_CHART_LIST_SET":
      return { ...state, userChart: action.value };
    case "LOADED_USER_CHART_LIST":
      return { ...state, loadedUserChartList: action.value };
    case "USER_COMMENT_LIST_SET":
      return { ...state, userComments: action.value };
    case "LOADED_USER_COMMENT_LIST":
      return { ...state, loadedUserCommentList: action.value };

    // Tutor
    case "TUTOR_LIST_SET":
      return { ...state, tutors: action.value };
    case "LOADED_TUTOR_LIST":
      return { ...state, loadedTutorList: action.value };
    case "TUTOR_NEW_INSERT":
      return { ...state, tutors: { ...state.tutors, total: state.tutors.total + 1, data: [...state.tutors.data, action.value].slice(0, state.tutors.page_size) } };
    case "LOADED_TUTOR_CREATE":
      return { ...state, loadedTutorCreate: action.value };
    case "TUTOR_LIST_UPDATE":
      return { ...state, tutors: { ...state.tutors, data: state.tutors.data.map(v => v.id === action.value.id ? { ...v, ...action.value } : v) } };
    case "LOADED_TUTOR_EDIT":
      return { ...state, loadedTutorEdit: action.value };
    case "TUTOR_DELETE":
      return { ...state, tutors: { ...state.tutors, total: state.tutors.total - 1, data: state.tutors.data.filter(u => u.id !== action.value) } };
    case "LOADED_TUTOR_DELETE":
      return { ...state, loadedTutorDelete: action.value };

    // Coach
    case "COACH_LIST_SET":
      return { ...state, coaches: action.value };
    case "LOADED_COACH_LIST":
      return { ...state, loadedCoachList: action.value };
    case "COACH_NEW_INSERT":
      return { ...state, coaches: { ...state.coaches, total: state.coaches.total + 1, data: [...state.coaches.data, action.value].slice(0, state.coaches.page_size) } };
    case "LOADED_COACH_CREATE":
      return { ...state, loadedCoachCreate: action.value };
    case "COACH_LIST_UPDATE":
      return { ...state, coaches: { ...state.coaches, data: state.coaches.data.map(v => v.id === action.value.id ? { ...v, ...action.value } : v) } };
    case "LOADED_COACH_EDIT":
      return { ...state, loadedCoachEdit: action.value };
    case "COACH_DELETE":
      return { ...state, coaches: { ...state.coaches, total: state.coaches.total - 1, data: state.coaches.data.filter(u => u.id !== action.value) } };
    case "LOADED_COACH_DELETE":
      return { ...state, loadedCoachDelete: action.value };

    case "THEME_LIST_SET":
      return { ...state, themes: action.value };
    case "THEME_LIST_UPDATE": {
      return {
        ...state,
        themes: state.themes.map(item => action.value.find(v => v.name === item.name) ? { ...item, ...action.value.find(v => v.name === item.name) } : item)
      };
    }
    case "LOADED_THEME_EDIT":
      return { ...state, loadedThemeEdit: action.value };
    case "USER_COURSE_LIST_SET":
      return { ...state, userCourses: action.value };
    case "USER_COURSE_LIST_INIT":
      return { ...state, userCourses: [] };
    case "LOADED_USER_COURSE_LIST":
      return { ...state, loadedUserCourseList: action.value };
    case "USER_COURSE_ASSIGN": {
      const dashboardInfo = state.dashboardInfo;
      if (dashboardInfo.license_number && dashboardInfo.license_number.license_available !== null) {
        dashboardInfo.license_number.license_available -= action.value.length;
      }

      return {
        ...state,
        userCourses: [...state.userCourses, ...action.value],
        dashboardInfo: dashboardInfo,
      };
    }
    case "LOADED_USER_COURSE_ASSIGN":
      return { ...state, loadedUserCourseAssign: action.value };
    case "USER_COURSE_DISMISS":
      return { ...state, userCourses: state.userCourses.filter(c => !action.value.course_ids.includes(c.id)) };
    case "LOADED_USER_COURSE_DISMISS":
      return { ...state, loadedUserCourseDismiss: action.value };
    case "LOADED_STUDENT_ENROLL_EDIT":
      return { ...state, loadedEnrollDateEdit: action.value };

    // License
    case "LICENSE_LIST_SET":
      return { ...state, licenses: action.value };
    case "LOADED_LICENSE_LIST":
      return { ...state, loadedLicenseList: action.value };
    case "STRIPE_CLIENT_SECRET_SET":
      return { ...state, stripeClientSecret: action.value };
    case "LOADED_STRIPE_CLIENT_SECRET":
      return { ...state, loadedStripeClientSecret: action.value };
    case "LICENSE_AVAILABLE_ADD": {
      const dashboardInfo = state.dashboardInfo;
      if (dashboardInfo.license_number) {
        dashboardInfo.license_number.license_available = action.value;
      }
      return { ...state, dashboardInfo };
    }

    // Zoom Meeting
    case "ZOOM_MEETING_LIST_SET":
      return { ...state, zoomMeetings: action.value.total ? action.value : PAGE_DEFAULT };
    case "LOADED_ZOOM_MEETING_LIST":
      return { ...state, loadedZoomMeetingList: action.value };
    case "ZOOM_MEETING_NEW_INSERT":
      return {
        ...state, zoomMeetings: {
          ...state.zoomMeetings,
          total: state.zoomMeetings.total + 1,
          data: [...state.zoomMeetings.data, {
            ...action.value,
            tutor_id: action.value.tutor?.id,
            avatar: action.value.tutor?.avatar,
            first_name: action.value.tutor?.first_name,
            last_name: action.value.tutor?.last_name,
            bio: action.value.tutor?.bio
          }].slice(0, state.zoomMeetings.page_size)
        }
      };
    case "LOADED_ZOOM_MEETING_CREATE":
      return { ...state, loadedZoomMeetingCreate: action.value };
    case "ZOOM_MEETING_LIST_UPDATE": {
      return {
        ...state,
        zoomMeetings: {
          ...state.zoomMeetings,
          data: state.zoomMeetings.data.map(meeting => meeting.id === action.value.id ? {
            ...meeting,
            courses: [...action.value.courses],
            tutor_id: action.value.tutor?.id,
            avatar: action.value.tutor?.avatar,
            first_name: action.value.tutor?.first_name,
            last_name: action.value.tutor?.last_name,
            bio: action.value.tutor?.bio
          } : meeting)
        },
      };
      // const currZoomMeeting = state.zoomMeetings.find(v => v.id === action.value.id);
      // Object.keys(action.value).forEach(key => { currZoomMeeting[key] = action.value[key]; });
      // return { ...state, zoomMeetings: state.zoomMeetings.map(v => v.id === action.value.id ? currZoomMeeting : v) };
    }
    case "LOADED_ZOOM_MEETING_EDIT":
      return { ...state, loadedZoomMeetingEdit: action.value };
    case "ZOOM_MEETING_DELETE":
      return { ...state, zoomMeetings: { ...state.zoomMeetings, total: state.zoomMeetings.total - 1, data: state.zoomMeetings.data.filter(u => u.id !== action.value) } };
    case "LOADED_ZOOM_MEETING_DELETE":
      return { ...state, loadedZoomMeetingDelete: action.value };
    case "ZOOM_HISTORY_LIST_SET":
      return { ...state, zoomHistory: action.value };
    case "LOADED_ZOOM_HISTORY_LIST":
      return { ...state, loadedZoomHistoryList: action.value };
    case "TERM_SET":
      return { ...state, term: action.value };
    case "LOADED_TERM_GET":
      return { ...state, loadedTermGet: action.value };
    case "TERM_UPDATE":
      return { ...state, term: { ...state.term, ...action.value } };
    case "LOADED_TERM_EDIT":
      return { ...state, loadedTermEdit: action.value };
    case "COURSE_DELETE":
      return { ...state, courses: { ...state.courses, total: state.courses.total - 1, data: state.courses.data.filter(v => v.id !== action.value) } };
    case "LOADED_COURSE_DEELETE":
      return { ...state, loadedCourseDelete: action.value };
    case "CERT_VAR_GET":
      return { ...state, certVar: action.value };
    case "CERT_VAR_UPDATE":
      return { ...state, certVar: { ...state.certVar, ...action.value } };
    case "LOADED_CERT_VAR_EDIT":
      return { ...state, loadedCertVarEdit: action.value };
    case "LOADED_RESET_PLATFORM":
      return { ...state, loadedResetPlatform: action.value };
    case "COURSE_ADDITION_EDIT":
      return {
        ...state,
        courses: {
          ...state.courses,
          data: state.courses.data.map(course => course.id === action.value.course_id ?
            {
              ...course,
              display_name: action.value.display_name,
              short_description: action.value.short_description,
              objective: action.value.objective,
              category: state.categories.data.find(cat => cat.id === action.value.category_id)?.name || ''
            } : course
          )
        }
      };
    case "LOADED_COURSE_ADDITION_EDIT":
      return { ...state, loadedCourseAdditionEdit: action.value };
    case "CHAT_ADD":
      return {
        ...state,
        chatActiveUsers: {
          ...state.chatActiveUsers,
          data: state.chatActiveUsers.data.map(user =>
            user.user_id === action.value.user_id ?
              ({ ...user, ...action.value.data, messages: [action.value, ...user.messages] })
              : user
          )
        },
        chatArchievedUsers: {
          ...state.chatArchievedUsers,
          data: state.chatArchievedUsers.data.map(user =>
            user.user_id === action.value.user_id ?
              ({ ...user, ...action.value.data, messages: [action.value, ...user.messages] })
              : user
          )
        }
      };
    case "CHAT_LIST_SET":
      return {
        ...state,
        chatActiveUsers: {
          ...state.chatActiveUsers,
          data: state.chatActiveUsers.data.map(user =>
            user.user_id === action.value.user_id ?
              ({ ...user, ...action.value.data, messages: [...user.messages, ...(action.value.data?.messages || [])] })
              : user
          )
        },
        chatArchievedUsers: {
          ...state.chatArchievedUsers,
          data: state.chatArchievedUsers.data.map(user =>
            user.user_id === action.value.user_id ?
              ({ ...user, ...action.value.data, messages: [...user.messages, ...(action.value.data?.messages || [])] })
              : user
          )
        }
      };
    case "CHAT_ENABLE_SET":
      return { ...state, isChatEnabled: action.value };
    case "LOADED_CHAT_LIST":
      return { ...state, loadedChatList: action.value };
    case "CHAT_ACTIVE_USER_LIST_SET":
      return {
        ...state,
        chatActiveUsers: {
          ...action.value,
          data: action.value.page === 0 ? action.value.data : [...state.chatActiveUsers.data, ...action.value.data]
        }
      };
    case "LOADED_CHAT_USER_ACTIVE_LIST":
      return { ...state, loadedChatActiveUserList: action.value };
    case "CHAT_ACTIVE_USER_ADD_SET":
      return {
        ...state,
        chatActiveUsers: {
          ...state.chatActiveUsers,
          data: [action.value, ...state.chatActiveUsers.data]
        }
      };
    case "CHAT_ARCHIEVED_USER_LIST_SET":
      return {
        ...state,
        chatArchievedUsers: {
          ...action.value,
          data: action.value.page === 0 ? action.value.data : [...state.chatArchievedUsers.data, ...action.value.data]
        }
      };
    case "LOADED_CHAT_USER_ARCHIEVE_LIST":
      return { ...state, loadedChatArchievedUserList: action.value };
    case "CHAT_USER_ENABLED_UPDATE":
      return {
        ...state,
        chatActiveUsers: {
          ...state.chatActiveUsers,
          total: action.value.enabled ? state.chatActiveUsers.total + 1 : state.chatActiveUsers.total - 1,
          data: action.value.enabled ? [...state.chatActiveUsers.data, action.value.user] : state.chatActiveUsers.data.filter(v => v.user_id !== action.value.user.user_id)
        },
        chatArchievedUsers: {
          ...state.chatArchievedUsers,
          total: !action.value.enabled ? state.chatArchievedUsers.total + 1 : state.chatArchievedUsers.total - 1,
          data: !action.value.enabled ? [...state.chatArchievedUsers.data, action.value.user] : state.chatArchievedUsers.data.filter(v => v.user_id !== action.value.user.user_id)
        }
      };
    case "CHAT_MARK_READ":
      return {
        ...state,
        chatActiveUsers: {
          ...state.chatActiveUsers,
          data: state.chatActiveUsers.data.map(user => user.user_id === action.value ?
            ({ ...user, messages: user.messages.map(msg => ({ ...msg, is_new: false })) }) : user
          )
        }
      };
    case "CHAT_MARK_ALL_READ":
      return {
        ...state,
        chatActiveUsers: {
          ...state.chatActiveUsers,
          data: state.chatActiveUsers.data.map(user => ({ ...user, messages: user.messages.map(msg => ({ ...msg, is_new: false })) }))
        }
      };

    // Comment
    case "COMMENT_LIST_SET":
      return { ...state, comments: action.value };
    case "LOADED_COMMENT_LIST":
      return { ...state, loadedCommentList: action.value };
    case "COMMENT_REPLY_ADD":
      return {
        ...state, comments: {
          ...state.comments,
          data: state.comments.data.map(comment => comment._id === action.value.comment_id ? { ...comment, reply: [action.value, ...comment.reply] } : comment)
        }
      };
    case "LOADED_COMMENT_REPLY":
      return { ...state, loadedCommentReply: action.value };
    case "COMMENT_DELETE":
      return { ...state, comments: { ...state.comments, data: state.comments.data.filter(v => v._id !== action.value) } };
    case "LOADED_COMMENT_DELETE":
      return { ...state, loadedCommentDelete: action.value };
    case "REVIEW_LIST_SET":
      return { ...state, reviews: action.value };
    case "LOADED_REVIEW_LIST":
      return { ...state, loadedReviewList: action.value };
    case "REVIEW_DELETE":
      return { ...state, reviews: { ...state.reviews, data: state.reviews.data.filter(v => v.id !== action.value) } };
    case "LOADED_REVIEW_DELETE":
      return { ...state, loadedReviewDelete: action.value };
    case "PHYSICAL_SESSION_LIST_SET":
      return { ...state, physicalSessions: action.value };
    case "LOADED_PHYSICAL_SESSION_LIST":
      return { ...state, loadedPhysicalSessions: action.value };
    case "PHYSICAL_SESSION_USER_LIST_SET":
      return {
        ...state,
        physicalSessionUsers: action.value.arr,
        physicalSessions: state.physicalSessions.map(v =>
          v.id === action.value.sessionId ? {
            ...v,
            total_signed: action.value.arr.filter(av => av.status).length,
            total_assigned: action.value.arr.length
          } : v
        )
      };
    case "LOADED_PHYSICAL_SESSION_USER_LIST":
      return { ...state, loadedPhysicalSessionUsers: action.value };
    case "PHYSICAL_SESSION_CREATE":
      return { ...state, physicalSessions: { ...state.physicalSessions, total: state.physicalSessions.total + 1, data: [...state.physicalSessions.data, action.value].slice(0, state.physicalSessions.page_size) } };
    case "PHYSICAL_SESSION_EDIT":
      return { ...state, physicalSessions: { ...state.physicalSessions, data: state.physicalSessions.data.map(v => v.id === action.value.id ? { ...v, ...action.value } : v) } };
    case "LOADED_PHYSICAL_SESSION_CREATE":
      return { ...state, loadedPhysicalSessionCreate: action.value };
    case "LOADED_PHYSICAL_SESSION_EDIT":
      return { ...state, loadedPhysicalSessionEdit: action.value };
    case "PHYSICAL_SESSION_USERS_ASSIGN":
      return {
        ...state,
        physicalSessions: {
          ...state.physicalSessions,
          data: state.physicalSessions.data.map(g => g.id !== action.value.session_id ? g : { ...g, users: [...g.users, ...action.value.users] })
        }
      };
    case "PHYSICAL_SESSION_USERS_DISMISS":
      return {
        ...state,
        physicalSessions: {
          ...state.physicalSessions,
          data: state.physicalSessions.data.map(g => g.id !== action.value.session_id ? g : { ...g, users: g.users.filter(v1 => !action.value.user_ids.includes(v1.id)) })
        }
      };
    case "LOADED_PHYSICAL_SESSION_USER_ASSIGN":
      return { ...state, loadedPhysicalSessionUsersAssign: action.value };
    case "LOADED_PHYSICAL_SESSION_USER_DISMISS":
      return { ...state, loadedPhysicalSessionUsersDismiss: action.value };
    case "PHYSICAL_SESSION_DELETE":
      return { ...state, physicalSessions: { ...state.physicalSessions, total: state.physicalSessions.total - 1, data: state.physicalSessions.data.filter(u => u.id !== action.value) } };
    case "LOADED_PHYSICAL_SESSION_DELETE":
      return { ...state, loadedPhysicalSessionDelete: action.value };
    case "DASHBOARD_CHART_LIST_SET":
      return { ...state, dashboardChartList: action.value };
    case "LOADED_DASHBOARD_CHART_LIST":
      return { ...state, loadedDashboardChartList: action.value };
    case "TRACK_CHART_LIST_SET":
      return { ...state, trackChartList: action.value };
    case "LOADED_TRACK_CHART_LIST":
      return { ...state, loadedTrackChartList: action.value };
    case "NOTIFICATION_LIST_SET":
      return { ...state, notifications: action.value };

    case "SEARCH_LIST_SET":
      return { ...state, searchCourses: action.value?.courses || [], searchUsers: action.value?.users || [] };
    case "LOADED_SEARCH_LIST":
      return { ...state, loadedSearchList: action.value };
    case "RECENT_LIST_SET":
      return { ...state, recentList: action.value };
    case "GHOST_TOKEN_SET":
      return { ...state, ghostToken: action.value };
    case "LOADED_GHOST_TOKEN_GET":
      return { ...state, loadedGhostToken: action.value };
    case "GHOST_TOKEN_RESET":
      return { ...state, ghostToken: '', loadedGhostToken: false };

    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};

const AsterControllerProvider = ({ children }) => {
  const initialState = {
    miniSidenav: false,
    mobile: false,
    darkMode: false,

    // Dashboard
    dashboardInfo: {},
    loadedDashboardInfo: false,
    loadedAdminDashboardGet: false,
    loadedAdminUserInspectGet: false,

    // Course
    courses: PAGE_DEFAULT,
    loadedCourseList: true,
    loadedCourseDelete: true,
    courseStructure: {},
    loadedCourseStructure: true,
    loadedCourseAdditionEdit: true,

    // Current User
    user: {},
    userId: null,
    loadedCurrUserUpdate: true,

    // Users
    users: PAGE_DEFAULT,
    pwdErrorId: null,
    loadedUserDelete: true,
    loadedUserRegister: true,
    loadedBulkUserRegister: true,
    loadedEditUserInfo: true,
    loadedEditUserPwd: true,
    loadedUserList: true,
    loadedEnrollDateEdit: true,

    // Group
    groups: PAGE_DEFAULT,
    loadedGroupList: true,
    loadedGroupCreate: true,
    loadedGroupEdit: true,
    loadedGroupUserAssign: true,
    loadedGroupUserDismiss: true,
    loadedGroupCourseAssign: true,
    loadedGroupCourseDismiss: true,
    loadedGroupDelete: true,

    // Category
    categories: PAGE_DEFAULT,
    loadedCategoryList: true,
    loadedCategoryCreate: true,
    loadedCategoryEdit: true,
    loadedCategoryCourseAssign: true,
    loadedCategoryCourseDismiss: true,
    loadedCategoryDelete: true,

    // Email template
    emailTemplates: [],
    loadedEmailTemplateEdit: true,

    // Email Log
    emailLogs: PAGE_DEFAULT,
    loadedEmailLogList: true,
    loadedEmailLogInsert: true,
    loadedEmailLogDelete: true,

    // Sms template
    smsTemplates: [],
    loadedSMSTemplateEdit: true,

    // Sms log
    smsLogs: PAGE_DEFAULT,
    loadedSMSLogList: true,
    loadedSMSLogInsert: true,
    loadedSMSLogDelete: true,

    // User inspect
    anaUserLogins: PAGE_DEFAULT,
    loadedAnaUserLoginList: true,
    anaCourseGrades: PAGE_DEFAULT,
    loadedAnaCourseGradeList: true,
    anaModules: PAGE_DEFAULT,
    loadedAnaModuleList: true,
    anaZooms: PAGE_DEFAULT,
    loadedAnaZoomList: true,
    userChart: { data: [] },
    loadedUserChartList: true,
    userComments: PAGE_DEFAULT,
    loadedUserCommentList: true,

    // Tutor
    tutors: PAGE_DEFAULT,
    loadedTutorList: true,
    loadedTutorCreate: true,
    loadedTutorEdit: true,
    loadedTutorDelete: true,

    // Coach
    coaches: PAGE_DEFAULT,
    loadedCoachList: true,
    loadedCoachCreate: true,
    loadedCoachEdit: true,
    loadedCoachDelete: true,

    // Theme
    themes: [],
    loadedThemeEdit: true,

    // User course
    userCourses: [],
    loadedUserCourseList: true,
    loadedUserCourseAssign: true,
    loadedUserCourseDismiss: true,

    // License
    licenses: PAGE_DEFAULT,
    loadedLicenseList: true,

    // Zoom session
    zoomMeetings: PAGE_DEFAULT,
    loadedZoomMeetingList: true,
    loadedZoomMeetingCreate: true,
    loadedZoomMeetingEdit: true,
    loadedZoomMeetingDelete: true,

    // Zoom history
    zoomHistory: PAGE_DEFAULT,
    loadedZoomHistoryList: true,

    // Term
    term: {},
    loadedTermGet: true,
    loadedTermEdit: true,

    loadedResetPlatform: true,

    // Certificate
    certificate: PAGE_DEFAULT,
    loadedCertEdit: true,

    // Certificate variable
    certVar: {},
    loadedCertVarEdit: true,

    // Chat
    isChatEnabled: false,
    loadedChatList: true,
    chatActiveUsers: PAGE_DEFAULT,
    loadedChatActiveUserList: true,
    chatArchievedUsers: PAGE_DEFAULT,
    loadedChatArchievedUserList: true,


    // Stripe
    stripeClientSecret: '',
    loadedStripeClientSecret: false,

    // Comments & Reviews
    comments: PAGE_DEFAULT,
    loadedCommentList: true,
    loadedCommentReply: true,
    loadedCommentDelete: true,
    reviews: PAGE_DEFAULT,
    loadedReviewList: true,
    loadedReviewDelete: true,

    // Physical Session
    physicalSessions: PAGE_DEFAULT,
    physicalSessionUsers: PAGE_DEFAULT,
    loadedPhysicalSessions: true,
    loadedPhysicalSessionUsers: true,
    loadedPhysicalSessionCreate: true,
    loadedPhysicalSessionEdit: true,
    loadedPhysicalSessionDelete: true,
    loadedPhysicalSessionUsersAssign: true,
    loadedPhysicalSessionUsersDismiss: true,

    // Charts
    dashboardChartList: { data: [] },
    loadedDashboardChartList: true,
    trackChartList: { data: [] },
    loadedTrackChartList: true,

    // Search
    searchCourses: [],
    searchUsers: [],
    loadedSearchList: true,

    recentList: [],

    ghostToken: '',
    loadedGhostToken: false
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <AsterContext.Provider value={[controller, dispatch]}>{children}</AsterContext.Provider>;
};

const useAsterController = () => {
  const context = useContext(AsterContext);

  if (!context) {
    throw new Error('[useAsterController should be used inside the AsterControllerProvider.]');
  }


  return context;
};

const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return windowSize;
};

export { AsterControllerProvider, useAsterController, useWindowSize };