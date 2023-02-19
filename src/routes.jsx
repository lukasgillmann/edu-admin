import { Icon } from '@iconify/react';

const routes = [
  { route: 'dashboard', icon: <Icon icon="lucide:layout-dashboard" />, text: 'Dashboard' },
  { route: 'inbox', icon: <Icon icon="majesticons:chat-line" />, text: 'Inbox', divider: true },
  {
    route: 'user',
    icon: <Icon icon="ooui:user-avatar-outline" />,
    text: 'User',
    children: [
      {
        route: 'learners',
        text: 'Learners',
        children: [
          {
            route: 'detail',
            text: 'User Detail'
          }, {
            route: 'edit',
            text: 'User Edit'
          }
        ]
      }, {
        route: 'groups',
        text: 'Groups',
        children: [
          {
            route: 'detail',
            text: 'General Learning Group'
          }
        ]
      }, {
        route: 'tutors',
        text: 'Tutors'
      }, {
        route: 'coaches',
        text: 'Coaches'
      }
    ]
  },
  {
    route: 'catalog',
    icon: <Icon icon="heroicons-outline:clipboard-list" />,
    text: 'Catalog',
    children: [
      {
        route: 'course',
        text: 'Course'
      }, {
        route: 'category',
        text: 'Category'
      }, {
        route: 'virtual',
        text: 'Virtual Class'
      }, {
        route: 'physical-session',
        text: 'Physical Session'
      }
    ]
  },
  {
    route: 'email',
    icon: <Icon icon="ic:round-mail-outline" />,
    text: 'Email',
  },
  {
    route: 'tracking',
    icon: <Icon icon="bx:bar-chart-alt-2" />,
    text: 'Tracking'
  },
  {
    route: 'certificate',
    icon: <Icon icon="ion:school-sharp" />,
    text: 'Certificate'
  },
  {
    route: 'licenses',
    icon: <Icon icon="ic:sharp-key" />,
    text: 'Licenses'
  },
  {
    route: 'public_site',
    icon: <Icon icon="uil:window" />,
    text: 'Public Site'
  },

];

export default routes;