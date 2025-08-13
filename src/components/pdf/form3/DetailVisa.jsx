import React from "react";
import { styles } from "../Form3";
import { Image, Text, View } from "@react-pdf/renderer";
import iconArrow from "/icon/caret-square-right.png";

function DetailVisa({ datas }) {

  const BodyD = () => {
    return (
      <View style={styles.row}>
        <View style={{ flex: 1,width:"2.8%", justifyContent:"center",alignItems:"center", borderWidth:1,borderTop:0, borderRight:0 }}>
          <Text style={styles.form2_titre}>1</Text>
        </View>
        <View style={{ flexDirection: "column", width:"97.2%", borderWidth: 1,borderTop:0 }}>
          <View style={{ padding: 3.5, flexDirection: "column", gap: 2, borderBottom:1 }}>
            <Text style={styles.form2_text}>* Nom</Text>
            <View style={[styles.form3_input, { }]}>
              <Text style={styles.form3_text}>2025-03-10</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={{ width: "40%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
              <Text style={styles.form2_text}>Lien de parenté</Text>
              <View style={[styles.form3_input, { }]}>
                <Text style={styles.form3_text}>2025-03-10</Text>
              </View>
            </View>
            <View style={{ width: "60%", padding: 3.5, flexDirection: "column", gap: 2 }}>
              <Text style={styles.form2_text}>* Adresse au Canada</Text>
              <View style={[styles.form3_input, {  }]}>
                <Text style={styles.form3_text}>2025-03-10</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>DÉTAILS SUR LA VISITE AU CANADA</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, { borderWidth: 1 }]}>
          <View style={{ borderRight: 1, width: "50%" }}>
            <View style={[styles.row, {}]}>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRight: 1, borderBottom: 1 }}>
                <Text style={styles.form2_titre}>1</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, {}]}>*a) Object de la visite</Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
            </View>
          </View>
          <View style={{ width: "50%", padding: 3, flexDirection: "column", gap: 2 }}>
            <Text style={styles.form2_text}>*b) Autre</Text>
            <Text style={styles.form3_input}>{datas?.prenom}</Text>
          </View>
        </View>

        <View style={[styles.row, { borderWidth: 1, borderTop: 0 }]}>
          <View style={[styles.row, { borderRight: 1, width: "50%" }]}>
            <View style={[{ width: "50%", borderRight: 1 }]}>
              <View style={[styles.row, {}]}>
                <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRight: 1, borderBottom: 1 }}>
                  <Text style={styles.form2_titre}>2</Text>
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                  <Text style={[styles.form2_titre, {}]}></Text>
                </View>
              </View>
              <View style={[styles.row, { gap: 4, padding: 2, alignItems: "center" }]}>
                <View style={{ width: "90%" }}>
                  <Text style={[styles.form2_text]}>Indiquez pour combien de temps vous planifiez rester</Text>
                </View>
                <Image src={iconArrow} style={{ width: 7, height: 7 }} />
              </View>
            </View>
            <View style={{ width: "25%", padding: 4, flexDirection: "column", gap: 2, borderRight: 1 }}>
              <Text style={styles.form2_text}>* De</Text>
              <View style={[styles.form3_input, { height: 23.9 }]}>
                <Text style={styles.form3_text}>2025-03-10</Text>
              </View>
            </View>
            <View style={{ width: "25%", padding: 4, flexDirection: "column", gap: 2 }}>
              <Text style={styles.form2_text}>* À</Text>
              <View style={[styles.form3_input, { height: 23.9 }]}>
                <Text style={styles.form3_text}>2025-03-10</Text>
              </View>
            </View>
          </View>
          <View style={{ width: "50%" }}>
            <View style={[styles.row, {}]}>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderBottom: 1, borderRight: 1 }}>
                <Text style={styles.form2_titre}>3</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, {}]}>* Fonds disponibles pour mon séjour($CAD)</Text>
              </View>
            </View>
            {/* <View style={[styles.row, { gap: 2 }]}> */}
            <View style={[styles.form3_input, { height: 23.9 }]}>
              <Text style={styles.form3_text}>{datas?.nom}</Text>
            </View>
            {/* </View> */}
          </View>
        </View>

        <View style={{flexDirection:"column"}}>
          <View style={[styles.row, { borderWidth: 1 }]}>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2, borderRight: 1 }}>
              <Text style={styles.form2_titre}>4</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, {}]}>
                * Nom adresse et lien de toute(s) personne(s) ou institution(s) que je visiterai:
              </Text>
            </View>
          </View>
          <BodyD />
          <BodyD />
        </View>
      </View>
    </View>
  );
}

export default DetailVisa;
