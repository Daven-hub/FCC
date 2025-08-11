import React from "react";
import { styles } from "../Form3";
import { Page, Text, View, Image } from "@react-pdf/renderer";

function Coordonnee({ datas }) {
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>COORDONNÉES</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row]}>
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
                <Text style={styles.form2_titre}>1</Text>
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                    Numéro du passport
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
                <Text style={styles.form2_titre}>2</Text>
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                    Pays ou térritoire de délivrance
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
            style={{ borderWidth: 1, width: "20%", borderColor: "black" }}
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
                    Date de délivrance
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
            style={{ borderWidth: 1, width: "20%", borderColor: "black" }}
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
                <Text style={styles.form2_titre}>4</Text>
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                    Date d'expiration
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
      </View>
    </View>
  );
}

export default Coordonnee;
