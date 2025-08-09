import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import CombinedApplicationForm from "./components/FormStapper/FormStappe";
import { Toast } from "./components/Toast/Toast";
import HomePage from "./pages";
import FormulaireProfessionnel from "./components/Form/AnnexeOne";
import PdfPreviewer from "./pages/PreviewPdf";
import MainPdf from "./pages/MainPdf";
function App() {

  return (
    <>
      <Toast/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CombinedApplicationForm />} />
          </Route>
          <Route path="/pdf" Component={PdfPreviewer} />
          <Route path="/mainpdf" Component={MainPdf} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
