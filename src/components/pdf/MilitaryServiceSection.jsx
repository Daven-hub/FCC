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
      <View style={[styles.col,{width:"26%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Endroit/ lieu où vous étiez en poste</Text>
      </View>
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Province</Text>
      </View>
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Pays ou Territoire</Text>
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
      <View style={[styles.col,{width:"26%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>{item?.endroit}</Text>
      </View>
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text]}>{item?.province}</Text>
      </View>
      <View style={[styles.col,{width:"25%",alignItems:"center",justifyContent:"center"}]}>
        <Text style={[styles.form2_text]}>{item?.pays}</Text>
      </View>
  </View>
)

const MilitaryServiceSection = ({datas}) => (
  <View style={{ borderWidth: 1, borderColor: "black"}}>
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
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Service militaire</Text>
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
    <View style={{borderTop:1}}>
        <HeaderT />
        {datas?.dev?.map((item,index)=>
          <BodyT item={item} key={index}/>
        )}
    </View>
  </View>
);

export default MilitaryServiceSection;
