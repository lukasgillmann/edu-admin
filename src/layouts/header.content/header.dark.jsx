import { Icon } from "@iconify/react";
import { useAsterController } from "../../context";
import { actionDarkMode } from "../../context/action";
import { VButton } from "../../form";

const HeaderDark = () => {

  const [controller, dispatch] = useAsterController();
  const { darkMode } = controller;

  const onDarkModeClick = (mode) => {
    if (mode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    actionDarkMode(dispatch, mode);
    localStorage.setItem('dark', mode);
  };

  return <VButton
    iconButton
    variant="outlined"
    color="secondary"
    className="ml-2"
    onClick={(e) => onDarkModeClick(!darkMode)}
  >
    {
      darkMode ? <Icon icon="carbon:light" className="text-2xl" />
        :
        <Icon icon="ic:outline-dark-mode" className="text-2xl" />
    }
  </VButton>
    ;
};

export default HeaderDark;