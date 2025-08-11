import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import MilitaryServiceSection from "./MilitaryServiceSection";
// import iconArrow from "/icon/caret-square-right.png"
import TemoinServiceSection from "./TemoinServiceSection";
import AffiliationServiceSection from "./AffiliationServiceSection";
import ChargesServiceSection from "./ChargesServviceSection";
import VoyageServiceSection from "./VoyageServiceSection";

const styles = StyleSheet.create({
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
    padding: 5,
    // height:15,
    backgroundColor: "#ff000011"
  },
  col: {
    paddingVertical: 3,
    paddingHorizontal: 5
  }
});

const Form3 = ({ datas }) => {
  return (
    <>
      <View style={[styles.row, { justifyContent: "space-between" }]}>
        <View
          style={{ borderWidth: 1, width: "33.333%", borderColor: "black" }}
        >
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}
            >
              <Text style={styles.form2_titre}>1</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                IUC
              </Text>
            </View>
          </View>
          <View style={[styles.row, { gap: 2 }]}>
            <Text style={[styles.form3_input, { width: "100%" }]}>
              {datas?.nom}
            </Text>
          </View>
        </View>
        <View
          style={{ borderWidth: 1, width: "33.333%", borderColor: "black" }}
        >
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}
            >
              <Text style={styles.form2_titre}>2</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                Je veux être servi(e) en
              </Text>
            </View>
          </View>
          <View style={[styles.row, { gap: 2 }]}>
            <Text style={[styles.form3_input, { width: "100%" }]}>
              {datas?.nom}
            </Text>
          </View>
        </View>
        <View
          style={{ borderWidth: 1, width: "33.333%", borderColor: "black" }}
        >
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}
            >
              <Text style={styles.form2_titre}>3</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                * Visa demandé
              </Text>
            </View>
          </View>
          <View style={[styles.row, { gap: 2 }]}>
            <Text style={[styles.form3_input, { width: "100%" }]}>
              {datas?.nom}
            </Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: "column" }}>
        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}
            >
              <Text style={styles.form2_titre}>1</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                Nom Complet
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View
              style={{
                width: "50%",
                padding: 3,
                borderRight: 1,
                flexDirection: "column",
                gap: 2
              }}
            >
              <Text style={styles.form2_text}>* Nom de Famille</Text>
              <Text style={styles.form3_input}>{datas?.nom}</Text>
            </View>
            <View
              style={{
                width: "50%",
                padding: 3,
                flexDirection: "column",
                gap: 2
              }}
            >
              <Text style={styles.form2_text}>* Prénom(s)</Text>
              <Text style={styles.form3_input}>{datas?.prenom}</Text>
            </View>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}
            >
              <Text style={styles.form2_titre}>2</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                Avez vous déjà utilisé un autre nom ?
              </Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View
              style={{
                width: "50%",
                padding: 3,
                borderRight: 1,
                flexDirection: "column",
                gap: 2
              }}
            >
              <Text style={styles.form2_text}>* Nom de Famille</Text>
              <Text style={styles.form3_input}>{datas?.nom}</Text>
            </View>
            <View
              style={{
                width: "50%",
                padding: 3,
                flexDirection: "column",
                gap: 2
              }}
            >
              <Text style={styles.form2_text}>* Prénom(s)</Text>
              <Text style={styles.form3_input}>{datas?.prenom}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ borderWidth: 1, width: "20%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}
              >
                <Text style={styles.form2_titre}>3</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                  Sexe
                </Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.nom}
              </Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, width: "20%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}
              >
                <Text style={styles.form2_titre}>4</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                  Date de naissance
                </Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.nom}
              </Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, width: "60%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}
              >
                <Text style={styles.form2_titre}>5</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                  * Lieu de naissance
                </Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.nom}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ borderWidth: 1, width: "40%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}
              >
                <Text style={styles.form2_titre}>6</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                  *Citoyenneté
                </Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.nom}
              </Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, width: "60%", borderColor: "black" }}></View>
        </View>
        <View style={styles.row}>
          <View
            style={{
              borderWidth: 1,
              borderRight: 0,
              borderColor: "black",
              width: "50%"
            }}
          >
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}
              >
                <Text style={styles.form2_titre}>2</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                  Avez vous déjà utilisé un autre nom ?
                </Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <View
                style={{
                  padding: 3,
                  width: "100%",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <Text style={styles.form2_text}>* Date de naissance</Text>
                <Text style={styles.form3_input}>{datas?.dateNais}</Text>
              </View>
            </View>
          </View>
          <View style={{ borderWidth: 1, borderColor: "black", width: "50%" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}
              >
                <Text style={styles.form2_titre}>3</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text
                  style={[styles.form2_titre, { fontWeight: "bold" }]}
                ></Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <View
                style={{
                  padding: 3,
                  width: "100%",
                  flexDirection: "column",
                  gap: 2
                }}
              >
                <Text style={styles.form2_text}>* IUC</Text>
                <Text style={styles.form2_input}>{datas?.iuc}</Text>
              </View>
            </View>
          </View>
        </View>
        <MilitaryServiceSection datas={datas?.military} />
        <TemoinServiceSection datas={datas?.temoin} />
        <AffiliationServiceSection datas={datas?.affiliation} />
        <ChargesServiceSection datas={datas?.charges} />
        <VoyageServiceSection datas={datas?.voyages} />
      </View>
    </>
  );
};

export default Form3;
