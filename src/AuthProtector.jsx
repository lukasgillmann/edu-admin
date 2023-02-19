import { useEffect } from "react";
import { useAsterController } from "./context";
import { actionAdminDashboardGet } from "./context/action";

export default function AuthProtector(props) {

  const { children } = props;

  const [, dispatch] = useAsterController();

  useEffect(() => {
    actionAdminDashboardGet(dispatch);
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
}