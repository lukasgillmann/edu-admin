export const Q_ADMIN_DASHBOARD_GET = `
  query admin_dashboard_get {
    admin_dashboard_get 
  }
`;

export const Q_ADMIN_USER_INSPECT_GET = `
  query admin_user_inspect_get($user_id: Int) {
    admin_user_inspect_get(user_id: $user_id)
  }
`;

export const Q_ADMIN_USER_REPORT_GET = `
  query admin_user_report_get($user_id: Int) {
    admin_user_report_get(user_id: $user_id)
  }
`;

export const M_USER_DELETE = `
  mutation user_delete($user_id: Int) {
    user_delete(user_id: $user_id)
  }`;

export const M_REGISTER_USER = `
  mutation register_user($input: [NameValue]) {
    register_user(input: $input) {
      insertId
      errorCode
    }
  }`;

export const M_REGISTER_BULK_USERS = `
  mutation register_bulk_users($input: [[NameValue]]) {
    register_bulk_users(input: $input) {
      first_user_id
      total
      possible
    }
  }`;

export const M_REGISTERED_USER_PWD_EDIT = `
  mutation edit_registered_user_pwd($user_id: Int, $new_password: String) {
    edit_registered_user_pwd(user_id: $user_id, new_password: $new_password)
  }`;

export const M_REGISTERED_USER_EDIT = `
  mutation edit_registered_user($user_id: Int, $input: [NameValue]) {
    edit_registered_user(user_id: $user_id, input: $input)
  }`;

export const Q_USER_LIST = `
  query user_list($page: Int, $page_size: Int) {
    user_list(page: $page, page_size: $page_size)
  }`;

export const M_USER_EDIT = `
  mutation user_edit($input: [NameValue]) {
    user_edit(input: $input)
  }
`;

// Group
export const Q_GROUP_LIST = `
  query group_list($page: Int, $page_size: Int) {
    group_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        name
        cover_url
        description
        created
        updated
        users {
          id
          email
          username
          first_name
          last_name
          is_active
          avatar
          cover
          permission
        }
        courses {
          id
          is_active
          display_name
          short_description
          run_start
          run_end
          course_image_url
        }
      }
    }
  }`;

export const M_GROUP_EDIT = `
  mutation edit_group($group_id: Int, $name: String, $cover_url: String, $description: String) {
    edit_group(group_id: $group_id, name: $name, cover_url: $cover_url, description: $description)
  }
`;

export const M_GROUP_ASSIGN_USERS = `
  mutation assign_users_to_group($group_id: Int, $user_ids: [Int]) {
    assign_users_to_group(group_id: $group_id, user_ids: $user_ids)
  }
`;

export const M_GROUP_DISMISS_USERS = `
  mutation dismiss_users_from_group($group_id: Int, $user_ids: [Int]) {
    dismiss_users_from_group(group_id: $group_id, user_ids: $user_ids)
  }
`;

export const M_GROUP_ASSIGN_COURSES = `
  mutation assign_courses_to_group($group_id: Int, $course_ids: [String]) {
    assign_courses_to_group(group_id: $group_id, course_ids: $course_ids)
  }
`;

export const M_GROUP_DISMISS_COURSES = `
  mutation dismiss_courses_from_group($group_id: Int, $course_ids: [String]) {
    dismiss_courses_from_group(group_id: $group_id, course_ids: $course_ids)
  }
`;

export const M_GROUP_DELETE = `
  mutation delete_group($group_id: Int) {
    delete_group(group_id: $group_id)
  }
`;

// Courses
export const Q_COURSE_LIST = `
  query course_list($page: Int, $page_size: Int, $search_term: [NameValue]) {
    course_list(page: $page, page_size: $page_size, search_term: $search_term)
  }
`;

export const Q_COURSE_STRUCTURE_GET = `
  query course_structure_get($course_id: String) {
    course_structure_get(course_id: $course_id)
  }`;

// Category
export const Q_CATEGORY_LIST = `
  query category_list($page: Int, $page_size: Int) {
    category_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        name
        admin_editable
        created
        courses {
          id
          display_name
          short_description
          course_image_url
          created
        }
      }
    }
  }
`;

export const M_EDIT_CATEGORY = `
  mutation edit_category($category_id: Int, $name: String, $course_ids: [String]) {
    edit_category(category_id: $category_id, name: $name, course_ids: $course_ids)
  }
`;

export const M_ASSIGN_COURSES_TO_CATEGORY = `
  mutation assign_courses_to_category($category_id: Int, $course_ids: [String]) {
    assign_courses_to_category(category_id: $category_id, course_ids: $course_ids)
  }
`;

export const M_DISMISS_COURSES_FROM_CATEGORY = `
  mutation dismiss_courses_from_category($category_id: Int, $course_ids: [String]) {
    dismiss_courses_from_category(category_id: $category_id, course_ids: $course_ids)
  }
`;

export const M_DELETE_CATEGORY = `
  mutation delete_category($category_id: Int) {
    delete_category(category_id: $category_id)
  }
`;

// Email
export const M_EMAIL_TEMPLATE_EDIT = `
  mutation email_template_edit($input: EmailTemplateEditInput) {
    email_template_edit(input: $input)
  }
`;

export const Q_EMAIL_SEND = `
  query send_email($email: String, $name: String, $html: String) {
    send_email(email: $email, name: $name, html: $html)
  }
`;

export const Q_EMAIL_LOG_LIST = `
  query email_log_list($page: Int, $page_size: Int) {
    email_log_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        _id
        time
        type
        to
        fullname
        avatar
        cover
        permission
      }
    }
  }
`;

export const M_EMAIL_LOG_DELETE = `
  mutation email_log_delete($email_log_id: String) {
    email_log_delete(email_log_id: $email_log_id)
  }
`;

// SMS
export const M_SMS_TEMPLATE_EDIT = `
  mutation sms_template_edit($input: SMSTemplateEditInput) {
    sms_template_edit(input: $input)
  }
`;

export const Q_SMS_SEND = `
  query send_sms($phone: String, $message: String) {
    send_sms(phone: $phone, message: $message)
  }
`;

export const Q_SMS_LOG_LIST = `
  query sms_log_list($page: Int, $page_size: Int) {
    sms_log_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        _id
        time
        type
        to
      }
    }
  }
`;

export const M_SMS_LOG_DELETE = `
  mutation sms_log_delete($sms_log_id: String) {
    sms_log_delete(sms_log_id: $sms_log_id)
  }
`;

export const Q_ANA_USE_LOGIN = `
  query ana_login_history($user_id: Int, $page: Int, $page_size: Int) {
    ana_login_history(user_id: $user_id, page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        date 
        device 
        ip_address 
        browser
      }
    }
  }
`;

export const Q_ANA_COURSE_GRADE = `
  query ana_grade_per_course($user_id: Int, $page: Int, $page_size: Int) {
    ana_grade_per_course(user_id: $user_id, page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        course_id
        course_title
        course_image_url
        progress
        created
        enroll_start
        cutoff
        grade
        total_spent
        quiz_spent
        sections {
          sectionTitle
          weight
          gradeFormat
          raw_earned
          raw_possible
        }
      }
    }
  }
`;

export const Q_ANA_ZOOM = `
  query ana_zoom($user_id: Int, $page: Int, $page_size: Int) {
    ana_zoom(user_id: $user_id, page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        date
        details {
          zoom_id
          spent
          instructor_name
          attempts
        }
      }
    }
  }
`;

export const Q_ANA_MODULE = `
  query ana_module($user_id: Int, $page: Int, $page_size: Int) {
    ana_module(user_id: $user_id, page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        date
        course_id
        course_title
        details {
          module_title
          total_spent
          quiz_spent
          correct_count
          total_count
        }
      }
    }
  }
`;


export const Q_TUTOR_LIST = `
  query tutor_list($page: Int, $page_size: Int) {
    tutor_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        first_name
        last_name
        email
        phone_number
        country
        state
        city
        gender
        bio
        year_of_birth
        avatar
      }
    }
  }
`;

export const Q_TUTOR_GET = `
  query tutor_get($tutor_id: Int) {
    tutor_get(tutor_id: $tutor_id) {
      id
      first_name
      last_name
      email
      phone_number
      country
      state
      city
      gender
      bio
      year_of_birth
      avatar
    }
  }
`;
export const M_TUTOR_EDIT = `
  mutation edit_tutor($input: TutorEditInput) {
    edit_tutor(input: $input)
  }
`;

export const M_TUTOR_DELETE = `
  mutation delete_tutor($tutor_id: Int) {
    delete_tutor(tutor_id: $tutor_id)
  }
`;

// Coach 
export const Q_COACH_LIST = `
  query coach_list($page: Int, $page_size: Int) {
    coach_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        first_name
        last_name
        email
        phone_number
        country
        state
        city
        gender
        bio
        year_of_birth
        avatar
        courses {
          id
          display_name
        }
      }
    }
  }
`;

export const M_COACH_EDIT = `
  mutation edit_coach($input: CoachEditInput) {
    edit_coach(input: $input)
  }
`;

export const M_COACH_DELETE = `
  mutation delete_coach($coach_id: Int) {
    delete_coach(coach_id: $coach_id)
  }
`;

export const M_THEME_EDIT = `
  mutation theme_edit($input: [NameValue]) {
    theme_edit(input: $input)
  }
`;


export const Q_USER_COURSE_LIST = `
  query user_course_list($user_id: Int) {
    user_course_list(user_id: $user_id) {
      id
      display_name
      short_description
      course_image_url
      created
      run_start
      run_end
    }
  }
`;

export const M_ASSIGN_COURSES_TO_USER = `
  mutation assign_courses_to_user($user_id: Int, $course_ids: [String]) {
    assign_courses_to_user(user_id: $user_id, course_ids: $course_ids)
  }
`;

export const M_DISMISS_COURSES_FROM_USER = `
  mutation dismiss_courses_from_user($user_id: Int, $course_ids: [String]) {
    dismiss_courses_from_user(user_id: $user_id, course_ids: $course_ids)
  }
`;

export const M_UPDATE_ENROLL_DATES = `
  mutation update_enroll_dates($user_id: Int, $course_id: String, $run_end: String) {
    update_enroll_dates(user_id: $user_id, course_id: $course_id, run_end: $run_end)
  }
`;

export const Q_LICENSE_LIST = `
  query license_list($page: Int, $page_size: Int) {
    license_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        username
        first_name
        last_name
        email
        display_name 
        short_description
        start
        end
        is_active
        course_image_url
      }
    }
  }
`;

export const M_LICENSE_ADD = `
  mutation license_add($type: Int, $price: Int, $quantity: Int, $annual: Boolean) {
    license_add(type: $type, price: $price, quantity: $quantity, annual: $annual)
  }
`;

export const Q_DASHBOARD_INFO_GET = `
  query {
    dashboard_get {
      best_courses {
        counter
        course_id
      }
      course_enrollment {
        month
        counter
      }
      course_complete {
        month
        counter
      }
      numbers {
        total_course
        total_user
        total_course_active
        total_user_active
      }
    }
  }
`;

export const Q_ZOOM_MEETING_LIST = `
  query zoom_meeting_list($page: Int, $page_size: Int) {
    zoom_meeting_list(page: $page, page_size: $page_size)
  }
`;

export const M_ZOOM_MEETING_CREATE = `
  mutation zoom_meeting_create($input: ZoomMeetingCreateInput) {
    zoom_meeting_create(input: $input)
  }
`;

export const M_ZOOM_MEETING_EDIT = `
  mutation zoom_meeting_edit($input: ZoomMeetingEditInput) {
    zoom_meeting_edit(input: $input)
  }
`;

export const M_ZOOM_MEETING_DELETE = `
  mutation zoom_meeting_delete($zoom_meeting_id: String) {
    zoom_meeting_delete(zoom_meeting_id: $zoom_meeting_id)
  }
`;

export const Q_ZOOM_HISTORY_LIST = `
  query zoom_history_list($page: Int, $page_size: Int) {
    zoom_history_list(page: $page, page_size: $page_size)
  }
`;

export const Q_TERM_GET = `
  query { 
    term_get {
      content
      enabled
    }
  }
`;

export const M_TERM_EDIT = `
  mutation term_edit($content: String, $enabled: Boolean) {
    term_edit(content: $content, enabled: $enabled)
  }
`;

export const M_COURSE_DELETE = `
  mutation course_delete($course_id: String) {
    course_delete(course_id: $course_id)
  }
`;

export const M_RESET_PLATFORM = `
  mutation reset_platform {
    reset_platform
  }
`;

export const M_CERTIFICATE_VARIABLE_EDIT = `
  mutation certificate_variable_edit($input: CertificateVariableInput) {
    certificate_variable_edit(input: $input) 
  }
`;

export const M_COURSE_ADDITION = `
  mutation edit_course_addition($input: CourseDuration) {
    edit_course_addition(input: $input) 
  }
`;

export const M_ADD_CHAT = `
  mutation chat_add($event_id: String, $urls: [String], $text: String) {
    chat_add(event_id: $event_id, urls: $urls, text: $text)
  }
`;

export const M_CHAT_FLAG_EDIT = `
  mutation chat_flag_edit($enabled: Boolean) {
    chat_flag_edit(enabled: $enabled)
  }
`;

export const Q_CHAT_USER_LIST = `
  query chat_user_list($enabled: Boolean, $page: Int, $page_size: Int) {
    chat_user_list(enabled: $enabled, page: $page, page_size: $page_size) {
      total
      page
      page_size 
      data {
        id
        user_id
        fullname
        username
        email
        avatar
        permission
        phone_number
        role
        location
        count 
        enabled
        created
        updated
        message_more
        page
        messages {
          text
          urls
          to_admin
          created
          updated
        }
      }
    }
  }
`;

export const M_CHAT_USER_ENABLED = `
  mutation chat_user_enabled($user_id: Int, $enabled: Boolean) {
    chat_user_enabled(user_id: $user_id, enabled: $enabled)
  }
`;

export const Q_LIST_CHAT = `
  query chat_list($user_id: Int, $page: Int, $page_size: Int) {
    chat_list(user_id: $user_id, page: $page, page_size: $page_size) {
      message_more
      page
      messages {
        text
        urls
        to_admin
        created
        updated
      }
    }
  }
`;

export const Q_GET_STRIPE_CLIENT_SECRET = `
  query stripe_client_secret_get($amount: Int, $currency: String) {
    stripe_client_secret_get(amount: $amount, currency: $currency)
  }
`;

export const M_STRIPE_PROCESS = `
  mutation process_stripe($input: StripeProcessData) {
    process_stripe(input: $input)
  }
`;

export const Q_SEND_REMINDERS = `
  query send_reminder_to_users($user_ids: [Int]) {
    send_reminder_to_users(user_ids: $user_ids)
  }
`;

export const M_COMMENT_REPLY = `
  mutation comment_third_edit($input: CommentThirdInput) {
    comment_third_edit(input: $input)
  }
`;

export const Q_COMMENT_LIST = `
  query comment_list($page: Int, $page_size: Int) {
    comment_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        _id
        author_id
        author_name
        author_fullname
        avatar
        cover
        visible
        role
        course_id
        discussion_id 
        course_title
        section_title
        sequence_title
        vertical_title
        body
        files
        vote_up_count
        vote_down_count
        created_at
        reply {
          author_id
          author_name
          author_fullname
          avatar
          cover
          visible
          role
          body
          files
          created_at
        }
      }
    }
  }
`;

export const M_COMMENT_DELETE = `
  mutation comment_delete($comment_id: String!) {
    comment_delete(comment_id: $comment_id)
  }
`;

export const Q_REVIEW_LIST = `
  query review_list($page: Int, $page_size: Int) {
    review_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        author_id
        author_fullname
        author_name
        permission
        avatar
        cover
        course
        type
        content
        created
      }
    }
  }
`;

export const M_REVIEW_DELETE = `
  mutation review_delete_by_id($review_id: Int) {
    review_delete_by_id(review_id: $review_id)
  }
`;

export const Q_LIST_PHYSICAL_SESSION = `
  query physical_session_list($page: Int, $page_size: Int) {
    physical_session_list(page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        coach_name
        subject
        program
        location
        signature
        start
        duration
        signature
        total_assigned
        ttoal_signed
        users {
          id
          email
          username
          first_name
          last_name
          is_active
          avatar
          cover
          permission
        }
      }
    }
  }
`;

export const Q_LIST_PHYSICAL_SESSION_USER = `
  query physical_session_user_list($session_id: String, $page: Int, $page_size: Int) {
    physical_session_user_list(session_id: $session_id, page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        id
        user_id
        email
        username
        first_name
        last_name
        status
        created
        updated
      }
    }
  }
`;

export const M_EDIT_PHYSICAL_SESSION = `
  mutation edit_physical_session($input: PhysicalSessionInput) {
    edit_physical_session(input: $input)
  }
`;

export const M_ASSIGN_USERS_TO_PHYSICAL_SESSION = `
  mutation assign_users_to_physical_session($session_id: Int, $user_ids: [Int]) {
    assign_users_to_physical_session(session_id: $session_id, user_ids: $user_ids)
  }
`;

export const M_DISMISS_USERS_FROM_PHYSICAL_SESSION = `
  mutation dismiss_users_from_physical_session($session_id: Int, $user_ids: [Int]) {
    dismiss_users_from_physical_session(session_id: $session_id, user_ids: $user_ids)
  }
`;

export const M_DELETE_PHYSICAL_SESSION = `
  mutation delete_physical_session($session_id: Int) {
    delete_physical_session(session_id: $session_id)
  }
`;

/************* Chart  *******************/
export const Q_LIST_USER_CHART = `
  query user_chart_list($user_id: Int, $start: String, $end: String) {
    user_chart_list(user_id: $user_id, start: $start, end: $end) {
      total_module_spent
      total_quiz_spent
      total_replay_spent
      total_virtual_spent
      data
      start
      end
    }
  }
`;

export const Q_LIST_USER_COMMENT = `
  query user_comment_list($user_id: Int, $page: Int, $page_size: Int) {
    user_comment_list(user_id: $user_id, page: $page, page_size: $page_size) {
      total
      page
      page_size
      data {
        _id
        discussion_id
        course_title
        section_title
        sequence_title
        vertical_title
        body
        files
        created_at
      }
    }
  }
`;

export const Q_TRACK_CHART_LIST = `
  query admin_track_chart_list($start: String, $end: String) {
    admin_track_chart_list(start: $start, end: $end) {
      start
      end
      data
    }
  }
`;

export const Q_DASHBOARD_CHART_LIST = `
  query admin_dashboard_chart_list($course_id: String, $start: String, $end: String) {
    admin_dashboard_chart_list(course_id: $course_id, start: $start, end: $end) {
      start
      end
      data
      actives
    }
  }
`;

export const Q_GHOST_TOKEN_GET = `
  query user_ghost_token_get($user_id: Int) {
    user_ghost_token_get(user_id: $user_id)
  }
`;

export const Q_SEARCH_LIST = `
  query search_list($search_term: String) {
    search_list(search_term: $search_term) {
      courses {
        id
        course_image_url
        display_name 
        category
        created
        page_index
        page
      }
      users {
        id
        avatar
        username
        email
        first_name
        last_name
        group_name
        permission
        created
        page_index
        page
      }
    }
  }
`