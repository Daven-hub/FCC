import { BrowserRouter, Route, Routes } from "react-router-dom";
import FamilyForm from "./components/Form/FamilyForm";
import { Layout } from "./components/Layout";
import HomePage from "./pages";
import FormulaireProfessionnel from "./components/Form/AnnexeOne";
import FamilyDocumentsPage from "./components/Form/DocumentsForm";
import Temporaire from "./components/Form/Temporaire";
import CombinedApplicationForm from "./components/FormStapper/FormStappe";

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<CombinedApplicationForm />} />
            <Route path="/family" element={<FamilyForm />} />
            <Route path="/annexOne" element={<FormulaireProfessionnel />} />
            <Route path="/documents" element={<FamilyDocumentsPage />} />
            <Route path="/temporaire" element={<Temporaire />} />
            <Route path="/form" element={<CombinedApplicationForm/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
