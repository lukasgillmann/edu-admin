import { Box, Divider, Icon } from "@mui/material";
import VAvatar from "../../form/VAvatar";
import VButton from "../../form/VButton";
import VText from "../../form/VText";

const HeaderMenu = () => {

  const onClick = () => {

  };

  return <Box className="w-64 my-2">
    <VButton variant="text" className="flex items-center w-full justify-start px-4" onClick={onClick}>
      <VAvatar size='sm' bgColor="light" />
      <Box className="text-left ml-2">
        <VText className="text-lg font-bold leading-5 text-limit-1">Theresha Anandia</VText>
        <VText className="text-sm text-gray-400 leading-4 text-limit-1">Super Admin</VText>
      </Box>
    </VButton>
    <Divider className="my-4 bg-gray-200 dark:bg-gray-500" />
    <VButton variant="text" className="flex items-center w-full justify-start px-4 text-left" onClick={onClick}>
      <VText className="text-base leading-5 text-limit-1" color="primary">
        <Icon className="text-2xl">person_add_alt</Icon>&nbsp;&nbsp;Add Another Account
      </VText>
    </VButton>
    <VButton variant="text" className="flex items-center w-full justify-start px-4 text-left" onClick={onClick}>
      <VText className="text-base leading-5 text-limit-1" color="primary">
        <Icon className="text-2xl">logout</Icon>&nbsp;&nbsp;Logout
      </VText>
    </VButton>
    <Divider className="my-4 bg-gray-200 dark:bg-gray-500" />
    <Box className="px-4">
      <VButton variant="contained" color="primary" className="w-full" onClick={onClick}>
        Get Desktop App
      </VButton>
    </Box>
  </Box>;
};

export default HeaderMenu;