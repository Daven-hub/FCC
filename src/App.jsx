import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CombinedApplicationForm from "./components/FormStapper/FormStappe";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CombinedApplicationForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
