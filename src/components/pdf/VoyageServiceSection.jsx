// components/MilitaryServiceSection.js
import { View, Text, StyleSheet } from "@react-pdf/renderer";
import { styles } from "./MainForm";
import { CheckForm } from "./MilitaryServiceSection";

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

export const HeaderT=()=>(
  <View style={[styles.row,{backgroundColor:"#80808065"}]}>
      <View style={[styles.col,{width:"12%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Du</Text>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center"}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>AAAA</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>MM</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"12%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Au</Text>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center"}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>AAAA</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>MM</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",textAlign:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Pays ou Territoire</Text>
      </View>
      <View style={[styles.col,{width:"26%",alignItems:"center",justifyContent:"center",borderRight:1,textAlign:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Endroit</Text>
      </View>
      {/* <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",borderRight:1,textAlign:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Activités et/ou poste occupés au sein de l'organisation</Text>
      </View> */}
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",textAlign:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>But du voyage</Text>
      </View>
  </View>
)

export const BodyT=({item})=>(
  <View style={[styles.row,{borderTop:1}]}>
      <View style={[styles.col,{width:"12%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center",flex:1}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center",borderRight:1}}><Text style={styles.form2_text}>{item?.du.split("-")[0]}</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text}>{item?.du.split("-")[1]}</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"12%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center",flex:1}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center",borderRight:1}}><Text style={styles.form2_text}>{item?.au.split("-")[0]}</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text}>{item?.au.split("-")[1]}</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text]}>{item?.pays}</Text>
      </View>
      <View style={[styles.col,{width:"26%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>{item?.Endroit}</Text>
      </View>
      {/* <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text]}>Littoral</Text>
      </View> */}
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center"}]}>
        <Text style={[styles.form2_text]}>{item?.but}</Text>
      </View>
  </View>
)

const VoyageServiceSection = ({datas}) => (
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
        <Text style={styles.form2_titre}>8</Text>
      </View>
      <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Voyage précédente</Text>
      </View>
    </View>
    <View style={[styles.row,{ paddingVertical: 6,paddingHorizontal: 12, width: "100%", flexDirection: "column", gap: 6 }]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>Depuis l’âge de 18 ans ou au cours des cinq dernières années, selon la plus récente, avez-vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou territoire de résidence actuel ?</Text>
        <CheckForm value={datas?.isOk} />
    </View>
    <View style={{borderTop:1}} wrap={false}>
        <HeaderT />
        {datas?.dev?.map((item,index)=>
          <BodyT item={item} key={index}/>
        )}
    </View>
  </View>
);

export default VoyageServiceSection;
