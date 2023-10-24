import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { isJsonString } from "./utils";
import { useDispatch } from "react-redux";
import jwt_decode from "jwt-decode";
import * as UserService from "./service/UserService";
import { updateUser } from "./redux/slices/userSlice";

function App() {
  const disPatch = useDispatch();

  useEffect(() => {
    const { storageData, decode } = handleDecode();
    if (decode?.id) {
      handleGetDetailsUser(decode.id, storageData);
    }
  }, []);

  const handleDecode = () => {
    let storageData = localStorage.getItem("access_token");
    let decode = {};
    if (storageData && isJsonString(storageData)) {
      storageData = JSON.parse(storageData);
      decode = jwt_decode(storageData);
    }
    return { decode, storageData };
  };

  UserService.axiosJWT.interceptors.request.use(
    async (config) => {
      const currenrTime = new Date();
      const { decode } = handleDecode();
      if (decode?.exp < currenrTime.getTime() / 1000) {
        const data = await UserService.refreshToken();
        config.headers["token"] = `Bearer ${data?.access_token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    disPatch(updateUser({ ...res?.data, access_token: token }));
  };

  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.showHeaderAndFooter
              ? DefaultComponent
              : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
