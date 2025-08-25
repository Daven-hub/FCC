import React from "react";
import { styles } from "../Form3";
import { Image, Text, View } from "@react-pdf/renderer";
// import iconArrow from "/icon/caret-square-right.png";

const BodyD = ({ datas,num}) => {
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
              <Text style={styles.form2_text}>{datas?.deAnnee+" - "+datas?.deMois}</Text>
            </View>
          </View>
          <View style={{ width: "30%", padding: 3.5, flexDirection: "column", gap: 2, borderRight: 1 }}>
            <Text style={styles.form2_text}>*Activité/ Profession</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.activite}</Text>
            </View>
          </View>
          <View style={{ width: "50%", padding: 3.5, flexDirection: "column", gap: 2 }}>
            <Text style={styles.form2_text}>*Entreprises/Employeur/Nom de l'Établissement</Text>
            <View style={[styles.form3_input, {}]}>
              <Text style={styles.form2_text}>{datas?.employeur}</Text>
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

function Emploi({ datas }) {
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>EMPLOIS</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={[styles.row, { borderWidth: 1 }]}>
          <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
            <Text style={[styles.form2_titre, {}]}>
              Fournir les details sur les emplois que vous avez occupés au courses des 10 dernières années, y compris si vous avez occupé des postes gouvernementaux (par exemple: fonctionnaire, juge, maire). Ne pas laisser de lacunes.
            </Text>
          </View>
        </View>
        {datas?.emplois?.map((x,ind)=>
          <BodyD datas={x} key={ind} num={ind+1}/>
        )}
      </View>
    </View>
  );
}

export default Emploi;
