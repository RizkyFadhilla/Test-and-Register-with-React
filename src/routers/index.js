import { createBrowserRouter } from "react-router-dom";
import RegisterForm from "../pages/registerForm";
import UserList from "../pages/userList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <UserList />,
  },
  {
    path: "/register",
    element: <RegisterForm />,
  },
]);

export default router;
