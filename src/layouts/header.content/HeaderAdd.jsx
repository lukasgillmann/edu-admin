import { Box, Divider, Icon } from "@mui/material";
import VButton from "../../form/VButton";
import VText from "../../form/VText";

const HeaderAdd = () => {

  const onClick = () => {

  };

  return <Box className="w-64 my-2">
    <VText color="primary" className="text-xs mx-7">Content</VText>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;Add Another Account
        </VText>
      </VButton>
    </Box>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;Logout
        </VText>
      </VButton>
    </Box>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;New Manuals
        </VText>
      </VButton>
    </Box>

    <Divider className="my-4 bg-gray-200 dark:bg-gray-500" />

    <VText color="primary" className="text-xs mx-7">Users</VText>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;Add New User
        </VText>
      </VButton>
    </Box>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;Create New Group
        </VText>
      </VButton>
    </Box>

    <Divider className="my-4 bg-gray-200 dark:bg-gray-500" />

    <VText color="primary" className="text-xs mx-7">File & Folders</VText>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;Upload File
        </VText>
      </VButton>
    </Box>
    <Box className="px-4">
      <VButton variant="text" className="flex items-center w-full justify-start" onClick={onClick}>
        <VText className="text-sm leading-5 text-limit-1">
          <Icon className="text-xl">add</Icon>&nbsp;&nbsp;Create New Folder
        </VText>
      </VButton>
    </Box>
    
  </Box>;
};

export default HeaderAdd;