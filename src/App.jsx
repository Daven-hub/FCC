import { BrowserRouter, Route, Routes } from "react-router-dom";
import FamilyForm from "./components/Form/FamilyForm";
import { Layout } from "./components/Layout";
import HomePage from "./pages";
import FormulaireProfessionnel from "./components/Form/AnnexeOne";
import PdfPreviewer from "./pages/PreviewPdf";
import MainPdf from "./pages/MainPdf";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HomePage />} />
            <Route path="/family" element={<FamilyForm />} />
            <Route path="/annexOne" element={<FormulaireProfessionnel/>}/>
          </Route>
          <Route path="/pdf" Component={PdfPreviewer} />
          <Route path="/mainpdf" Component={MainPdf} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
