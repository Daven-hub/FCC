// components/MilitaryServiceSection.js
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { BodyT, HeaderT } from "./MilitaryServiceSection";
import { styles } from "./MainForm";

// const styles = StyleSheet.create({
//   row: {
//     flexDirection: "row"
//   },
//   form2_grille: {
//     borderWidth: 1,
//     width: "100%",
//     borderColor: "black",
//     padding: 6,
//     flexDirection: "row"
//   },
//   form2_text: {
//     fontSize: 7,
//     lineHeight:1.4
//   },
//   form2_text2: {
//     fontSize: 4,
//     lineHeight:1.4
//   },
//   form2_titre: {
//     fontSize: 8,
//     lineHeight:1.4
//   },
//   form2_input: {
//     padding: 5,
//     height: 28,
//     backgroundColor: "red"
//   },
//   col:{
//     paddingVertical:3,
//     paddingHorizontal:5
//   }
// });


const TemoinServiceSection = ({datas}) => (
  <View style={{ borderWidth: 1, borderColor: "black"}} wrap={false}>
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
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}></Text>
      </View>
    </View>
    <View style={[styles.row,{ paddingVertical: 6,paddingHorizontal: 12, width: "100%", flexDirection: "column", gap: 6 }]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>Avez vous fait partied'une armée, d'une milice, d'une unité de défence civile, d'un service de renseignement ou d'un corps de police(y compris le service non obligatoire et les unités de réserve et volontaires) ?</Text>
        <View style={[[styles.row,{gap:15,alignItems:"center"}]]}>
            <View style={[styles.row,{gap:3,alignItems:"center"}]}>
              <View style={{borderWidth:1,borderColor:"black", width:8, height:8}}></View>
              <Text style={styles.form2_text}>* OUI</Text>
            </View>
            <View style={[styles.row,{gap:3,alignItems:"center"}]}>
              <View style={{borderWidth:1,borderColor:"black", width:8, height:8}}></View>
              <Text style={styles.form2_text}>* NON</Text>
            </View>
          </View>
    </View>
    <View style={{borderTop:1}} wrap={false}>
        <HeaderT />
        {datas?.dev?.map((item,index)=>
        <View key={index} style={[styles.row,{flexDirection:"column"}]}>
            <BodyT item={item}/>
            <View style={[styles.col,{borderTop:1,flexDirection:"column",gap:2}]}>
                <Text style={[styles.form2_titre,{fontWeight:"bold"}]}>Details</Text>
                <View style={[styles.col,styles.form2_titre,{backgroundColor:"#ff000011",padding:5,lineHeight:1.4}]}><Text>{item?.detail}</Text></View>
            </View>
        </View>
        )}
    </View>
  </View>
);

export default TemoinServiceSection;
