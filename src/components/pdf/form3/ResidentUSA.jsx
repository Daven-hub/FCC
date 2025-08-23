import React from "react";
import { styles } from "../Form3";
import { Page, Text, View, Image } from "@react-pdf/renderer";

function ResidentUSA({ datas }) {
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>CARTE DE RÉSIDENT PERMANENT DES ETATS-UNIS</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, { gap: 4,padding:3, alignItems: "center",borderTop:1,borderRight:1,borderLeft:1 }]}>
          <Text style={styles.form2_text}>
            a) Avez vous le statut de resident permanent en règle des États-Uniset avez-vous votre certificat d'inscription au registre des étrangers (carte verte)?
          </Text>
          <View style={[[styles.row, { gap: 15, alignItems: "center" }]]}>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: datas?.possede && "black"
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
                  backgroundColor: !datas?.possede && "black"
                }}></View>
              <Text style={styles.form2_text}>* NON</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row]}>
            <View
            style={{ borderWidth: 1, width: "70%", borderColor: "black" }}
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
                    Numéro de la pièce
                </Text>
                </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
                <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.numero}
                </Text>
            </View>
            </View>
            <View
            style={{ borderWidth: 1, width: "30%", borderColor: "black" }}
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
                    Date d'expiration
                </Text>
                </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
                <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.dateExpiration}
                </Text>
            </View>
            </View>
        </View>
      </View>
    </View>
  );
}

export default ResidentUSA;
