import axios from "axios";
import React, { Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { useQuery } from "react-query";

function App() {
  // useEffect(() => {
  //   fetch();
  // }, []);
  const fetch = async () => {
    const res = await axios.get(`http://localhost:3001/api/product/getAll`);
    return res.data;
  };

  const query = useQuery("todos", fetch);
  console.log("query", query);

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
