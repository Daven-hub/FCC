import React from "react";
import { styles } from "../Form3";
import { Text, View } from "@react-pdf/renderer";

function Langue({ datas }) {
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>LANGUES</Text>
      <View style={{ flexDirection: "column" }} wrap={false}>
        <View style={[styles.row, { borderWidth: 1 }]}>
          <View style={{ borderRight: 1, width: "25%" }}>
            <View style={[styles.row, {}]}>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRight: 1, borderBottom: 1 }}>
                <Text style={styles.form2_titre}>1</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>*a) Langue maternelle</Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.langueMaternelle}</Text>
            </View>
          </View>
          <View style={{ width: "45%", padding: 3, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>*b) Pouvez vous communiquer en anglais français ou dans les deux langues?</Text>
            <Text style={styles.form3_input}>{datas?.communiqueFrancaisAnglaisDeuxLangues}</Text>
          </View>
          <View
            style={{
              width: "30%",
              padding: 3,
              flexDirection: "column",
              gap: 2
            }}>
            <Text style={styles.form2_text}>c) Dans quelle langue êtes vous le plus à l'aise?</Text>
            <Text style={styles.form3_input}>{datas?.languePlusAise}</Text>
          </View>
        </View>
        <View style={[styles.row, { gap: 20, padding: 3, alignItems: "center", borderBottom: 1, borderRight: 1, borderLeft: 1 }]}>
          <Text style={styles.form2_text}>
            d) Avez vous fait évaluer votre compétence en français ou en anglais par un organisme d'évaluation aprouvé?
          </Text>
          <View style={[[styles.row, { gap: 10, alignItems: "center" }]]}>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: datas?.evaluationOrganismeApprouve && "black"
                }}></View>
              <Text style={styles.form2_text}>* OUI</Text>
            </View>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: !datas?.evaluationOrganismeApprouve && "black"
                }}></View>
              <Text style={styles.form2_text}>* NON</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Langue;
