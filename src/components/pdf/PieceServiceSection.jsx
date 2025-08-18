// components/MilitaryServiceSection.js
import { View, Text, StyleSheet } from "@react-pdf/renderer";
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
//   },
//   col:{
//     paddingVertical:3,
//     paddingHorizontal:5
//   }
// });

export const HeaderT=()=>(
  <View style={[styles.row,{backgroundColor:"#80808065"}]}>
      <View style={[styles.col,{width:"70%",paddingVertical:10,alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_titre,{fontWeight:"bold"}]}>Titre du document</Text>
      </View>
      <View style={[styles.col,{width:"30%",paddingVertical:10,alignItems:"center",justifyContent:"center"}]}>
        <Text style={[styles.form2_titre,{fontWeight:"bold"}]}>Télèversez?</Text>
      </View>
  </View>
)

export const BodyT=({item})=>(
  <View style={[styles.row,{borderTop:1}]}>
      <View style={[styles.col,{width:"70%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_titre,{lineHeight:1.4,fontWeight:"bold"}]}>{item?.titre}</Text>
      </View>
      <View style={[styles.row,{width:"30%", padding:3,alignItems:"center",justifyContent:"center"}]}>
            <View style={[[styles.row,{gap:15,alignItems:"center"}]]}>
                <View style={[styles.row,{gap:3,alignItems:"center"}]}>
                    <View style={{borderWidth:1,borderColor:"black", width:8, height:8,backgroundColor:item.provided?"black":"white"}}></View>
                    <Text style={styles.form2_text}>OUI</Text>
                </View>
                <View style={[styles.row,{gap:3,alignItems:"center"}]}>
                    <View style={{borderWidth:1,borderColor:"black", width:8, height:8,backgroundColor:!item.provided?"black":"white"}}></View>
                    <Text style={styles.form2_text}>NON</Text>
                </View>
            </View>
      </View>
  </View>
)

const PieceServiceSection = ({datas,index}) => (
  <View style={{ borderWidth: 1, borderColor: "black"}} wrap={false}>
    <View style={[styles.row, {}]}>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRight: 1,
        }}
      >
        <Text style={styles.form2_titre}>{index}</Text>
      </View>
      <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>{datas?.titre}</Text>
      </View>
    </View>
    <View style={{borderTop:1}} wrap={false}>
        <HeaderT />
        {datas?.corps?.map((item,index)=>
          <BodyT item={item} key={index}/>
        )}
    </View>
  </View>
);

export default PieceServiceSection;
