import React, { useEffect, useState } from "react";
import { PDFViewer, pdf } from "@react-pdf/renderer";
import MonPdfDocument from "../components/pdf/MonPdf";
// import prog from "../datas/immigration.json";

const PdfPreviewer = () => {
  const [prog, setProg] = useState(null);

  useEffect(() => {
    fetch("/immigration.json")
      .then((res) => res.json())
      .then(setProg)
      .catch(console.error);
  }, []);

  if (!prog) return <div>Chargement...</div>;

  const sendPdfByEmail = async () => {
    await Promise.resolve();
    const blob = await pdf(<MonPdfDocument datas={prog} />).toBlob();
    // const file = new File([blob], `${prog.nom.toLowerCase().replace(" ", "_")}.pdf`, { type: "application/pdf" });

    const formData = new FormData();
    formData.append(
      "pdf",
      blob,
      `${prog.nom.toLowerCase().replace(" ", "_")}.pdf`
    );
    formData.append("to", prog.email);
    formData.append("name", prog.nom);

    // console.log([...formData.entries()]);

    await fetch("http://localhost:83", {
      method: "POST",
      body: formData
    })
      .then((res) => res.json())
      .then((resp) => {
        return resp;
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div style={{ height: "100vh" }}>
        <PDFViewer width="100%" height="100%">
          <MonPdfDocument datas={prog} />
        </PDFViewer>
      </div>

      <button onClick={sendPdfByEmail}>Envoyer par email</button>
    </div>
  );
};

export default PdfPreviewer;
