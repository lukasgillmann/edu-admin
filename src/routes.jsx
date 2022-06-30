const routes = [
  { route: '/dashboard', icon: 'dashboard_outlined', text: 'Dashboard' },
  { route: '/inbox', icon: 'chat', text: 'Inbox', divider: true },
  {
    route: '/user',
    icon: 'person_outline',
    text: 'User',
    children: [
      {
        route: '/user',
        text: 'All User'
      }, {
        route: '/group',
        text: 'Group'
      }, {
        route: '/tutor',
        text: 'Tutor'
      }, {
        route: '/coach',
        text: 'Coach'
      }
    ]
  },
  {
    route: '/catalog',
    icon: 'event_note',
    text: 'Catalog',
    children: [
      {
        route: '/course',
        text: 'Course'
      }, {
        route: '/category',
        text: 'Category'
      }, {
        route: '/virtual',
        text: 'Virtual Class'
      }, {
        route: '/comment',
        text: 'Comment'
      }, {
        route: '/review',
        text: 'Review'
      }
    ]
  },
  {
    route: '/notifications',
    icon: 'mail_outline',
    text: 'Notifications',
    children: [
      {
        route: '/email',
        text: 'Email'
      }, {
        route: '/sms',
        text: 'SMS'
      }
    ]
  },
  {
    route: '/tracking',
    icon: 'bar_chart',
    text: 'Tracking'
  },
  {
    route: '/certificate',
    icon: 'school',
    text: 'Certificate'
  },
  {
    route: '/licenses',
    icon: 'key',
    text: 'Licenses'
  },
  {
    route: '/public_site',
    icon: 'web_asset',
    text: 'Public Site'
  },

];

export default routes;