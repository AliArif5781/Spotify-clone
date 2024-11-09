import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout";
import Error from "../page/Error";
import LeftSection from "../page/LeftSection";

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    errorElement: <Error />,
    children: [
      {
        path: "",
        element: <LeftSection />,
      },
    ],
  },
]);

export default router;
