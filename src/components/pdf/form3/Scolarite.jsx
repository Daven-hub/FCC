import React from "react";
import { styles } from "../Form3";
import { Image, Text, View } from "@react-pdf/renderer";
// import iconArrow from "/icon/caret-square-right.png";

const BodyD = ({ datas }) => {
  return (
    <View style={styles.row}>
      <View
        style={{
          flex: 1,
          width: "2.8%",
          justifyContent: "center",
          alignItems: "center",
          borderWidth: 1,
          borderTop: 0,
          borderRight: 0
        }}>
        <Text style={styles.form2_titre}>1</Text>
      </View>
      <View style={{ flexDirection: "column", width: "97.2%", borderWidth: 1, borderTop: 0 }}>
        <View style={[styles.row, { borderBottom: 1 }]}>
          <View style={{ width: "20%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>De</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>{datas?.nom}</Text>
            </View>
          </View>
          <View style={{ width: "30%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>Domaines d'études</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>{datas?.nom}</Text>
            </View>
          </View>
          <View style={{ width: "50%", padding: 3.5, flexDirection: "column", gap: 2 }}>
            <Text style={styles.form2_text}>Ecole/ Nom del'établissement</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>2025-03-10</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ width: "20%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>À</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>{datas?.nom}</Text>
            </View>
          </View>
          <View style={{ width: "25%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>* Ville/ Village</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>2025-03-10</Text>
            </View>
          </View>
          <View style={{ width: "40%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>* Pays ou Térritoire</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>2025-03-10</Text>
            </View>
          </View>
          <View style={{ width: "15%", padding: 3.5, flexDirection: "column", gap: 2 }}>
            <Text style={styles.form2_text}>Province/ État</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form3_text}>2025-03-10</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

function Scolarite({ datas }) {
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>SCOLARITÉ</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, { borderWidth: 1 }]}>
          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={[styles.form2_titre, {}]}>
              * Nom adresse et lien de toute(s) personne(s) ou institution(s) que je visiterai:
            </Text>
          </View>
        </View>
        <BodyD datas={datas} />
      </View>
    </View>
  );
}

export default Scolarite;
