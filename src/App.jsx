import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CombinedApplicationForm from "./components/FormStapper/FormStappe";
import { Toast } from "./components/Toast/Toast";

function App() {

  return (
    <>
      <Toast/>
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
