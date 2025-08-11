// MyPdfDocument.jsx
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font
} from "@react-pdf/renderer";
// import { CheckCheck } from "lucide-react";
import moment from "moment";
import logo from "/fcc.png";
import MainForm from "./MainForm";
import PieceJointe from "./PieceJointe";
import Form3 from "./Form3";

Font.register({
  family: "CourierPrime",
  src: `/fonts/CourierPrime-Regular.ttf`
});

const styles = StyleSheet.create({
  page: {
    paddingTop: 15,
    // paddingBottom: 15,
    paddingBottom:30,
    position: "relative",
    // paddingHorizontal: 20,
    flex: 1,
    fontSize: 8,
    fontFamily: "Helvetica"
  },
  table: {
    display: "table",
    width: "100%",
    borderWidth: 1,
    borderColor: "#000",
    borderStyle: "solid"
    // marginBottom: 10
  },
  row: {
    flexDirection: "row"
  },
  cell: {
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#000",
    padding: 2.5,
    flexGrow: 1
  },
  header: {
    backgroundColor: "#ccc",
    fontWeight: "bold",
    padding: 6,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center"
  },
  checkbox: {
    width: 10,
    height: 10,
    borderWidth: 1,
    borderColor: "#000",
    marginLeft: 2,
    flexShrink: 0
  },
  tinyText: {
    fontSize: 6,
    lineHeight:1.4
  },
  label: {
    fontWeight: "bold",
    fontSize: 6.5,
    lineHeight:1.4
  },
  signatureRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: 16,
    paddingBottom: 4
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomStyle: "dashed",
    borderColor: "#000",
    width: "100%"
    // height: 12
  },
  formField: {
    // borderBottomWidth: 1,
    height: 15,
    // flex:1,
    justifyContent: "center",
    paddingVertical: 3,
    paddingHorizontal: 3,
    backgroundColor: "#ff000011"
    // marginBottom: 2
  },
  vertPad: {
    marginVertical: 2.5
  },
  formText: {
    fontSize: 7,
    fontWeight: 600,
    textTransform: "capitalize"
  },
  forcedBreak: {
    break: "page",
    height: 1
  },
  headers: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "1 solid #ccc",
    paddingBottom: 5,
    marginBottom: 18
  },
  logo: {
    width: 55,
    height: 55,
    marginRight: 20
  },
  title: {
    fontSize: 19,
    textTransform: "uppercase",
    fontWeight: "700",
    color: "#076e9a",
    fontFamily: "CourierPrime"
  },
  content: {
    fontSize: 12,
    lineHeight: 1.5
  },
  footer: {
    position: "absolute",
    bottom: 0,
    paddingVertical:6,
    paddigTop:10,
    zIndex:50,
    textAlign: "center",
    width: "100%",
    color: "grey",
    backgroundColor:"red"
  }
});

const PersonRow = ({ relation }) => (
  <>
    <View style={styles.row}>
      <View style={[styles.cell, { width: "30%" }]}>
        <View style={styles.formField}>
          <Text style={styles.formText}>{relation.nom.toLowerCase()}</Text>
        </View>
        <Text style={styles.vertPad}>État civil:</Text>
        <View style={styles.formField}>
          <Text style={styles.formText}>
            {relation.etat_civil.toLowerCase()}
          </Text>
        </View>
      </View>
      <View
        style={[
          styles.cell,
          {
            width: "15%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }
        ]}
      >
        <Text style={[styles.label, { padding: 5 }]}>{relation.role}</Text>
      </View>
      <View style={[styles.cell, { width: "15%" }]}>
        <View style={styles.formField}>
          <Text style={styles.formText}>{relation.date}</Text>
        </View>
        <Text style={styles.vertPad}>Pays de naissance:</Text>
        <View style={styles.formField}>
          <Text style={styles.formText}>{relation.pays_naissance}</Text>
        </View>
      </View>
      <View style={[styles.cell, { width: "26%" }]}>
        <View style={styles.formField}>
          <Text style={styles.formText}>{relation.adresse}</Text>
        </View>
        <Text style={styles.vertPad}>Profession actuelle:</Text>
        <View style={styles.formField}>
          <Text style={styles.formText}>{relation.profession}</Text>
        </View>
      </View>
      <View
        style={[
          styles.cell,
          {
            // flex: 1,
            width: "14%",
            gap: 3,
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
          }
        ]}
      >
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={{ fontSize: 7 }}>Oui</Text>
          <View
            style={[
              styles.checkbox,
              {
                backgroundColor: relation.case_gauche ? "green" : "transparent"
              }
            ]}
          ></View>
        </View>
        <View style={[{ flex: 1 }, styles.row]}>
          <Text style={{ fontSize: 7 }}>Non</Text>
          <View
            style={[
              styles.checkbox,
              { backgroundColor: relation.case_droite ? "red" : "transparent" }
            ]}
          />
        </View>
      </View>
    </View>
  </>
);

const TemplateTable = ({ items }) => (
  <View>
    <Text style={{ marginBottom: 6, fontWeight: "bold" }}>
      {items?.section}
    </Text>
    <View
      style={[
        styles.table,
        {
          // flex:1,
          // borderWidth: 1,
          borderBottom: 0,
          borderRight: 0
          // width: "100%",
          // borderColor: "#000"
        }
      ]}
    >
      {/* Table Header */}
      <View style={styles.row}>
        {items?.header?.map((x, inde) => (
          <View
            key={inde}
            style={[
              styles.cell,
              styles.header,
              {
                // flex: 1,
                width: x.width
              }
            ]}
          >
            <Text>{x.title}</Text>
          </View>
        ))}
      </View>

      {/* Form Rows */}
      {items?.corps?.map((x, indd) => (
        <PersonRow key={indd} relation={x} />
      ))}
    </View>
    <View
      style={{
        borderWidth: 1,
        width: "100%",
        borderColor: "#000",
        borderTop: 0,
        paddingVertical: 2,
        paddingHorizontal: 10
      }}
    >
      <Text style={{ marginTop: 8 }}>
        <Text style={styles.label}>NOTE 1: </Text>
        Si vous n'avez pas d'époux ou de conjoint de fait, lisez la déclaration
        suivante et signez-la.
      </Text>
      <Text style={{ marginTop: 3 }}>
        Je déclare que je n'ai pas d'époux ou de conjoint de fait.
      </Text>

      {/* Signature */}
      <View style={[styles.signatureRow, { gap: 20 }]}>
        <View
          style={{
            flexDirection: "row",
            width: "75%",
            gap: 4,
            backgroundColor: "green"
          }}
        >
          <Text>Signature :</Text>
          <View style={styles.signatureLine}>
            <Text>Lionel</Text>
          </View>
        </View>
        <View style={{ flexDirection: "row", width: "25%", gap: 4 }}>
          <Text>Date :</Text>
          <View style={styles.signatureLine}>
            <Text style={{ textAlign: "center" }}>
              {moment(Date.now()).format("YYYY-MM-DD à HH:mm:ss")}
            </Text>
          </View>
        </View>
      </View>
    </View>
  </View>
);

const PageFamille=({datas})=>(
  datas.body.map((item, ind) => (
    <TemplateTable key={ind} items={item} />
  ))
)

const PageTemplate = ({ datas,image, type, nom, email, Custom }) => (
  <Page size="A4" orientation="portrait" style={styles.page}>
    <View style={styles.headers}>
      <Image src={logo} style={styles.logo} />
      <View>
        <Text style={styles.title}>FRANCHISE CONSEILS CAMEROUN SARL</Text>
        <Text style={{ fontSize: 9, marginTop: 0, color: "gray" }}>
          Education Internationnale . Mobilité Internationale . Dévéloppement
          d'affaire
        </Text>
      </View>
    </View>
    <Text style={{fontWeight:800, fontSize:16, marginBottom:15,textTransform:"uppercase", textAlign:"center"}}>DEMANDE DE VISA {type}</Text>
    <View style={{ paddingHorizontal: 20, flex: 1 }}>
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          gap: 10,
          marginBottom: 20
        }}
      >
        <Image
          src={image}
          style={{
            width: "20%",
            height: 80,
            objectFit: "contain",
            padding: 5,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: "black"
          }}
        />
        <View
          style={{
            width: "47%",
            flexDirection: "column",
            gap: 8,
            paddingVertical: 5
          }}
        >
          <View
            style={{ flexDirection: "row", alignItems: "center", fontSize: 10 }}
          >
            <Text>Nom Complet : </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>{nom}</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", fontSize: 10 }}
          >
            <Text>Email : </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>{email}</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", fontSize: 10 }}
          >
            <Text>Contact : </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>{email}</Text>
          </View>
          <View
            style={{ flexDirection: "row", alignItems: "center", fontSize: 10 }}
          >
            <Text>Type de visa : </Text>
            <Text style={{ color: "black", fontWeight: "bold" }}>{type}</Text>
          </View>
        </View>
        <Image
          src={"/flag.png"}
          style={{
            width: "33%",
            height: 70,
            objectFit: "cover",
            padding: 5,
            borderRadius: 5
          }}
        />
      </View>
      <Text
        style={{
          fontSize: 12,
          fontWeight: "bold",
          textAlign: "start",
          paddingVertical: 10,
          textTransform: "uppercase",
          borderTopWidth:1,
          borderColor:"gray",
          color:"#076e9a"
        }}
      >
        {datas?.titre}
      </Text>
      <View style={{ flex: 1, flexDirection: "column", gap: 18 }}>
       {Custom}
      </View>
    </View>
    <Image
      fixed={true}
      src={logo}
      style={{
        position: "absolute",
        opacity: 0.07,
        width: "100%",
        zIndex: 0,
        top: 0,
        left: 0,
        height: "100%",
        objectFit: "contain"
      }}
    />
    <View fixed style={styles.footer}>
      <Text style={{fontSize: 8}}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} / ${totalPages}`
        }
      />
    </View>
  </Page>
);

const MonPdfDocument = ({ datas }) => (
  <Document>
      <PageTemplate
        nom={datas?.nom}
        type={datas?.type}
        email={datas?.email}
        image={datas?.image}
        datas={datas?.pages?.famille}
        Custom={<PageFamille datas={datas?.pages?.famille} />}
      />
      <PageTemplate
        nom={datas?.nom}
        type={datas?.type}
        email={datas?.email}
        image={datas?.image}
        datas={datas?.pages?.resident}
        Custom={<MainForm datas={datas?.pages?.resident.body}/>}
      />
      <PageTemplate
        nom={datas?.nom}
        type={datas?.type}
        email={datas?.email}
        image={datas?.image}
        datas={datas?.pages?.visiteur}
        Custom={<Form3 datas={datas?.pages?.visiteur.body}/>}
      />
      <PageTemplate
        nom={datas?.nom}
        type={datas?.type}
        email={datas?.email}
        image={datas?.image}
        datas={datas?.pages?.documents}
        Custom={<PieceJointe datas={datas?.pages?.documents.body}/>}
      />
  </Document>
);

export default MonPdfDocument;
