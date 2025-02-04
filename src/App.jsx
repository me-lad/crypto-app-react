import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import The_404 from "./pages/The_404";
import Page from "./models/Page";
import { useAxiosDefault } from "./hooks/useAxiosDefault";

function App() {
  useAxiosDefault();

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
