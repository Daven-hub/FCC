import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Toast } from "./components/Toast/Toast";
import HomePage from "./pages";
import FormulaireProfessionnel from "./components/Form/AnnexeOne";
import PdfPreviewer from "./pages/PreviewPdf";
import MainPdf from "./pages/MainPdf";
import CombinedApplicationForme from "./pages/CombinedApplicationForm";
function App() {

  return (
    <>
      <Toast/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CombinedApplicationForme />} />
          </Route>
          <Route path="/pdf" Component={PdfPreviewer} />
          <Route path="/mainpdf" Component={MainPdf} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
