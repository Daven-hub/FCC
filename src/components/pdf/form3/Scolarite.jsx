import React from "react";
import { styles } from "../Form3";
import { Image, Text, View } from "@react-pdf/renderer";
// import iconArrow from "/icon/caret-square-right.png";

const BodyD = ({ datas,num }) => {
  return (
    <View style={styles.row} wrap={false}>
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
        <Text style={styles.form2_titre}>{num}</Text>
      </View>
      <View style={{ flexDirection: "column", width: "97.2%", borderWidth: 1, borderTop: 0 }}>
        <View style={[styles.row, { borderBottom: 1 }]}>
          <View style={{ width: "20%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>De</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.deAnnee+" - "+datas?.deMois} </Text>
            </View>
          </View>
          <View style={{ width: "30%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>Domaines d'études</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.domaine}</Text>
            </View>
          </View>
          <View style={{ width: "50%", padding: 3.5, flexDirection: "column", gap: 2 }}>
            <Text style={styles.form2_text}>Ecole/ Nom de l'établissement</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.ecole}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{ width: "20%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>À</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.aAnnee+" - "+datas?.aMois}</Text>
            </View>
          </View>
          <View style={{ width: "25%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>* Ville/ Village</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.ville}</Text>
            </View>
          </View>
          <View style={{ width: "40%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>* Pays ou Térritoire</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.pays}</Text>
            </View>
          </View>
          <View style={{ width: "15%", padding: 3.5, flexDirection: "column", gap: 2 }}>
            <Text style={styles.form2_text}>Province/ État</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.province}</Text>
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
          <View style={[styles.row,{gap:20, paddingHorizontal: 5, paddingVertical: 2, }]}>
            <Text style={[styles.form2_titre, {}]}>
              * Avez vous reçu une éducation postsécondaire? 
            </Text>
            <View style={[[styles.row, { gap: 10, alignItems: "center" }]]}>
                <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      width: 6,
                      height: 6,
                      backgroundColor: datas?.educationPostsecondaire && "black"
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
                      backgroundColor: !datas?.educationPostsecondaire && "black"
                    }}></View>
                  <Text style={styles.form2_text}>* NON</Text>
                </View>
              </View>
          </View>
        </View>
        <View>
          {datas?.etudes?.map((x,ind)=>
            <BodyD key={ind} num={ind+1} datas={x} />
          )}
        </View>
      </View>
    </View>
  );
}

export default Scolarite;
