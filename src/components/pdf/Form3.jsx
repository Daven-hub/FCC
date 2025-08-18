import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import DonneePersonnelle from "./form3/DonneePersonnelle";
import Langue from "./form3/Langue";
import Passport from "./form3/Passport";
import IdentiteNationale from "./form3/IdentiteNationale";
import ResidentUSA from "./form3/ResidentUSA";
import Coordonnee from "./form3/Coordonnee";
import DetailVisa from "./form3/DetailVisa";
import Scolarite from "./form3/Scolarite";
import Emploi from "./form3/Emploi";

export const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10
  },
  row: {
    flexDirection: "row"
  },
  form2_grille: {
    borderWidth: 1,
    width: "100%",
    borderColor: "black",
    padding: 6,
    flexDirection: "row"
  },
  form2_text: {
    fontSize: 7,
    lineHeight: 1.4
  },
  form2_titre: {
    fontSize: 8,
    lineHeight: 1.4
  },
  form3_input: {
    padding: 4.5,
    // height:15,
    backgroundColor: "#ff000011"
  },
  col: {
    paddingVertical: 3,
    paddingHorizontal: 5
  },
  coll: {
    paddingVertical: 1,
    paddingHorizontal: 3
  }
});

const Form3 = ({ datas }) => {
  return (
    <>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View style={{ borderWidth: 1, width: "33.333%", borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}>
              <Text style={styles.form2_titre}>1</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>IUC</Text>
            </View>
          </View>
          <View style={[styles.row, { gap: 2 }]}>
            <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.informationsGenerales?.IUC}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 1, width: "33.333%", borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}>
              <Text style={styles.form2_titre}>2</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Je veux être servi(e) en</Text>
            </View>
          </View>
          <View style={[styles.row, { gap: 2 }]}>
            <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.informationsGenerales?.servi}</Text>
          </View>
        </View>
        <View style={{ borderWidth: 1, width: "33.333%", borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}>
              <Text style={styles.form2_titre}>3</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>* Visa demandé</Text>
            </View>
          </View>
          <View style={[styles.row, { gap: 2 }]}>
            <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.informationsGenerales?.visa}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "column", gap: 5 }}>
        <DonneePersonnelle datas={{pers:datas?.donneesPersonnelles,marie:datas?.mariage,resid:datas?.residence,etatm:datas?.etatMatrimonial}} />
        <Langue datas={datas?.langues} />
        <Passport datas={datas?.passeport} />
        <IdentiteNationale datas={datas?.pieceIdentiteNationale} />
        <ResidentUSA datas={datas?.carteResidentPermanentUSA} />
        <Coordonnee datas={datas?.coordonnees}/>
        <DetailVisa datas={datas} />
        <Scolarite datas={datas} />
        <Emploi datas={datas} />
      </View>
    </>
  );
};

export default Form3;
