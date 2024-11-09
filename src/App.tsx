import { useEffect } from "react";
import FirstPage from "./page/FirstPage";
import { RouterProvider } from "react-router-dom";
import router from "./routes";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "./app/feature/AuthSlice";
import { RootState } from "./app/feature/store";

function App() {
  const dispatch = useDispatch();
  const Token = useSelector((state: RootState) => state.auth.token);
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const token = hash.substring(1).split("=")[1].split("&")[0];
      // const token = new URLSearchParams(hash.substring(1)).get("access_token");
      if (token) {
        dispatch(setToken(token));
        window.location.hash = "";
      }
    }
  }, [dispatch]);

  return (
    <>
      {Token ? (
        <RouterProvider router={router}></RouterProvider>
      ) : (
        <FirstPage />
      )}
    </>
  );
}

export default App;
