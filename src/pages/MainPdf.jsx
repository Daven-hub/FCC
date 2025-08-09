import React from 'react';
import { PDFViewer } from '@react-pdf/renderer';
import MainForm from '../components/pdf/MainForm';
// import formData from "../datas/form.json"

const MainPdf = () => (
  <PDFViewer width="100%" height="1000">
    <MainForm />
  </PDFViewer>
);

export default MainPdf;