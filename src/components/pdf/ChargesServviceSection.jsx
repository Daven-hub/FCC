// components/MilitaryServiceSection.js
import { View, Text, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10
  },
  row: {
    flexDirection: "row"
  },
  form2_grille: {
    // flex:1,
    borderWidth: 1,
    width: "100%",
    borderColor: "black",
    padding: 6,
    flexDirection: "row"
  },
  form2_text: {
    fontSize: 7,
  },
  form2_text2: {
    fontSize: 4,
  },
  form2_titre: {
    fontSize: 8
  },
  form2_input: {
    padding: 5,
    height: 28,
    backgroundColor: "red"
  },
  col:{
    paddingVertical:3,
    paddingHorizontal:5
  }
});

export const HeaderT=()=>(
  <View style={[styles.row,{backgroundColor:"#80808065"}]}>
      <View style={[styles.col,{width:"8%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Du</Text>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center"}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>AAAA</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>MM</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"8%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold"}]}>Au</Text>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center"}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>AAAA</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text2}>MM</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"20%",alignItems:"center",justifyContent:"center",textAlign:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Pays ou Territoire</Text>
      </View>
      <View style={[styles.col,{width:"24%",alignItems:"center",justifyContent:"center",borderRight:1,textAlign:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Pays et sphère de compétence (p.ex. mationale, régionale ou municipale)</Text>
      </View>
      <View style={[styles.col,{width:"20%",alignItems:"center",justifyContent:"center",borderRight:1,textAlign:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Ministère/Direction</Text>
      </View>
      <View style={[styles.col,{width:"20%",alignItems:"center",justifyContent:"center",textAlign:"center"}]}>
        <Text style={[styles.form2_text,{fontWeight:"bold",lineHeight:1.4}]}>Activités et/ou poste occupés</Text>
      </View>
  </View>
)

export const BodyT=({item})=>(
  <View style={[styles.row,{borderTop:1}]}>
      <View style={[styles.col,{width:"8%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center",flex:1}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center",borderRight:1}}><Text style={styles.form2_text}>{item?.du?.split("-")[0]}</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text}>{item?.du?.split("-")[1]}</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"8%",flexDirection:"column",gap:2,alignItems:"center",borderRight:1}]}>
        <View style={[styles.row,{justifyContent:"space-between",alignItems:"center",flex:1}]}>
          <View style={{width:"65%",justifyContent:"center",alignItems:"center",borderRight:1}}><Text style={styles.form2_text}>{item?.au?.split("-")[0]}</Text></View>
          <View style={{width:"35%",justifyContent:"center",alignItems:"center"}}><Text style={styles.form2_text}>{item?.au?.split("-")[1]}</Text></View>
        </View>
      </View>
      <View style={[styles.col,{width:"20%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>{item?.pays}</Text>
      </View>
      <View style={[styles.col,{width:"24%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>{item?.sphere}</Text>
      </View>
      <View style={[styles.col,{width:"20%",alignItems:"center",justifyContent:"center",borderRight:1}]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>{item?.ministere}</Text>
      </View>
      <View style={[styles.col,{width:"20%",alignItems:"center",justifyContent:"center"}]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>{item?.activite}</Text>
      </View>
  </View>
)

const ChargesServiceSection = ({datas}) => (
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
        <Text style={styles.form2_titre}>7</Text>
      </View>
      <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Charges Publiques Officielles</Text>
      </View>
    </View>
    <View style={[styles.row,{ paddingVertical: 6,paddingHorizontal: 12, width: "100%", flexDirection: "column", gap: 6 }]}>
        <Text style={[styles.form2_text,{lineHeight:1.4}]}>Depuis l'âge de 18ans ou au cours des cinqs dernières années, selon la plus recente, avez vous voyagé vers un pays ou territoire autre que le pays de votre nationalité ou votre pays ou votre territoire de residence actuelle ?</Text>
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
        <BodyT key={index} item={item}/>
        )}
    </View>
  </View>
);

export default ChargesServiceSection;
