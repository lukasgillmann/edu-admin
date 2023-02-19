import { Icon } from "@iconify/react";
import { Divider } from "@mui/material";
import { useEffect, useState } from "react";
import Joyride, { STATUS, ACTIONS, LIFECYCLE } from 'react-joyride';
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

import { useAsterController } from "../../context";
import { VImage, VText, VButton } from "../../form";

const HeaderTour = () => {

  const { t } = useTranslation('common');

  const [controller] = useAsterController();
  const { darkMode } = controller;

  const [run, setRun] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('tour')) {
      localStorage.setItem("tour", true);
      setRun(true);
    }
  }, []);

  const handleJoyrideCallback = (data) => {
    if (data.action === ACTIONS.NEXT && data.lifecycle === LIFECYCLE.COMPLETE) {
      switch (data.index) {
        case 2:
          document.getElementById("v-tour-useradd").click(); break;
        case 3:
          navigate('/user/learners/register');
          setTimeout(() => document.getElementById('v-user-scrolltop').scrollIntoView(), 100);
          break;
        case 4:
          document.getElementsByClassName("MuiBackdrop-invisible")[0].click();
          document.getElementById("v-tour-sidebar").click();
          break;
        case 6:
          document.getElementsByClassName("MuiBackdrop-invisible")[0].click();
          break;
        case 7:
          navigate('/inbox');
          break;
        case 8:
          navigate('/user/learners'); break;
        case 9:
          navigate('/catalog/course'); break;
        case 10:
          navigate('/email'); break;
        case 11:
          navigate('/tracking'); break;
        case 12:
          navigate('/certificate'); break;
        case 13:
          navigate('/licenses'); break;
        case 14:
          navigate('/settings'); break;
        case 15:
          navigate('/dashboard'); break;
        default:
          break;
      }
    }

    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(data.status)) {
      setRun(false);
    }
  };

  const steps = [
    {
      content: <div>
        <div className="flex flex-col px-7 pt-7">
          <div className="flex flex-col items-center px-24">
            <VText className="text-2xl mt-6" div>{t("Welcome to your platform")} Univo! 🚀</VText>
            <VText color="primary" className="max-w-lg pb-10 mt-8">
              {t("Here's a quick demo to help you get up to speed with Trenning dashboard. You will find out how to track how your system doing.")}
            </VText>
          </div>
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'center',
      target: 'body',
      styles: {
        options: {
          arrowColor: darkMode ? '#272B30' : '#FFF',
          backgroundColor: darkMode ? '#272B30' : '#FFF',
          primaryColor: darkMode ? '#272B30' : '#FFF',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 1 / 6</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("See everything in a glance from total content to average learner access time you can reiview it from the dashboard")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      floaterProps: {
        disableAnimation: false,
      },
      spotlightPadding: 10,
      target: '.v-tour-glance',
      placement: 'bottom-start',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 2 / 6</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Know what your learner doing view what your learner recently been up to on your platform")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'left-start',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
      target: '.v-tour-recent',
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 3 / 6</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Track on how your system doing live update on your learning management system performance")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'top-end',
      target: '.v-tour-graph',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 4 / 6</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Add new learners to your platform.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'left-start',
      target: '.v-tour-useradd',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 5 / 6</div>
        <div className="text-white dark:text-black w-60 pt-4 text-lg">
          {t("Assign a course")}
        </div>
        <div className="text-white dark:text-black w-60 pb-5 pt-2">
          {t("To assign a course to a learner, simply click on this button and follow the following steps.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'top-end',
      target: '.v-tour-courseassign',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 6 / 6</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Switch to the learner app or the author tool studio easily.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'bottom-start',
      target: '.v-tour-sidebar',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div>
        <div className="flex flex-col pt-7">
          <div className="flex flex-col items-center px-10">
            <VImage src="/assets/tour-complete.png" className="w-28 h-auto rounded" />
            <VText className="text-2xl mt-6">{t("Good Job")} 💪</VText>
            <VText color="secondary" className="max-w-sm pb-10 mt-8">
              {t("You've completed basic tour, would you like to explore more features?")}
            </VText>
          </div>
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'center',
      target: 'body',
      styles: {
        options: {
          arrowColor: darkMode ? '#272B30' : '#FFF',
          backgroundColor: darkMode ? '#272B30' : '#FFF',
          primaryColor: darkMode ? '#272B30' : '#FFF',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 7 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Communicate with your learners using messaging.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-inbox',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 8 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Manage your learners, assign them one or more courses, create groups, add tutors and trainers.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-user',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 9 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Browse the training catalog and the categories that compose them, create virtual classes and organize face-to-face sessions.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-catalog',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 10 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Configure all of your notification emails for learners and the admin.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-email',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 11 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Access the overall statistics for each learner, download reports, measure progress by module and by course, access the history of connections.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-tracking',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 12 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Edit a standard certificate of achievement for your learners.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-certificate',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 13 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Access the summary of your expenses related to the licenses acquired.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'right',
      target: '.v-tour-licenses',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div className="text-left">
        <div className="text-gray-400 text-sm">{t('Steps')} 14 / 14</div>
        <div className="text-white dark:text-black w-60 pb-5 pt-4">
          {t("Access your account settings, customize the theme of your platform to your image, edit the conditions of your platform.")}
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'top-end',
      target: '.v-tour-settings',
      styles: {
        options: {
          arrowColor: darkMode ? '#FFF' : '#000',
          backgroundColor: darkMode ? '#FFF' : '#000',
          primaryColor: darkMode ? '#FFF' : '#000',
        },
      },
    },
    {
      content: <div>
        <div className="flex flex-col pt-7">
          <div className="flex flex-col items-center px-10">
            <VImage src="/assets/tour-complete.png" className="w-28 h-auto rounded" />
            <VText className="text-2xl mt-6">{t("Good Job")} 💪</VText>
            <VText color="secondary" className="max-w-sm pb-10 mt-8">
              {t("You've fully completed the demo tour. It is time to enroll your first learners!")}
            </VText>
          </div>
        </div>
        <Divider className="bg-gray-200 dark:bg-gray-500" />
      </div>,
      placement: 'center',
      target: 'body',
      styles: {
        options: {
          arrowColor: darkMode ? '#272B30' : '#FFF',
          backgroundColor: darkMode ? '#272B30' : '#FFF',
          primaryColor: darkMode ? '#272B30' : '#FFF',
        },
      },
    },
  ];


  return <>
    {
      location.pathname.includes('dashboard') && <VButton
        iconButton
        variant="outlined"
        color="secondary"
        className="ml-2"
        onClick={() => setRun(true)}
      >
        <Icon icon="mi:flag" className="w-6 h-6" />
      </VButton>
    }

    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideBackButton
      hideCloseButton
      run={run}
      scrollToFirstStep
      // showProgress
      showSkipButton
      steps={steps}
      styles={{
        options: {
          zIndex: 10000,
          arrowColor: '#FFFFFF',
          backgroundColor: '#FFFFFF',
          overlayColor: 'rgba(10, 10, 10, 0.8)',
          primaryColor: '#FFFFFF',
          textColor: '#004a14',
          minWidth: 300,
          width: 'fit-content',
          maxWidth: '90%',
        },
      }}
      locale={{
        next: <VButton variant="contained" className="normal-case">{t("Next")}</VButton>,
        skip: <VButton variant="outlined" className="normal-case">{t("Skip")}</VButton>,
        last: <VButton variant="contained" className="normal-case">{t("Finish Tour")}</VButton>
      }}
    />
  </>;
};

export default HeaderTour;