import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import The_404 from "./pages/The_404";
import Page from "./models/Page";
import { useEffect } from "react";
import { apiKey_gecko, apiQuery_gecko } from "./constants/APIs";
import axios from "axios";

function App() {
  //! Setting the coin gecko api header for axios
  useEffect(() => {
    axios.defaults.headers.common["accept"] = "application/json";
    axios.defaults.headers.common[apiQuery_gecko] = apiKey_gecko;
  }, []);

  return (
    <>
      <Routes>
        <Route element={<Page />}>
          <Route index path="/" element={<Home />} />
          <Route path="/news" element={<News />} />
        </Route>
        <Route path="*" element={<The_404 />} />
      </Routes>
    </>
  );
}

export default App;
