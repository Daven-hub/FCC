import { Document, Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import MilitaryServiceSection from "./MilitaryServiceSection";
import iconArrow from "/icon/caret-square-right.png"
import TemoinServiceSection from "./TemoinServiceSection";
import AffiliationServiceSection from "./AffiliationServiceSection";
import ChargesServiceSection from "./ChargesServviceSection";
import VoyageServiceSection from "./VoyageServiceSection";

export const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontSize: 10
  },
  row:{
    flexDirection:"row"
  },
  form2_grille:{
    borderWidth:1,
    width:"100%",
    borderColor:"black",
    padding:6,
    flexDirection:"row"
  },
  form2_text:{
    fontSize:7,
    lineHeight:1.4
  },
  form2_titre:{
    fontSize:8,
    lineHeight:1.4
  },
  form2_input:{
    padding:5,
    height:28,
    backgroundColor:"#ff000011"
  },
  form2_text2: {
       fontSize: 4,
    lineHeight:1.4
  },
  col:{
    paddingVertical:3,
    paddingHorizontal:5
  }

});

const MainForm = ({datas}) => {
  return (
      <>
        <View style={[styles.form2_grille,{justifyContent:"space-between"}]}>
          <View style={[styles.row,{gap:10,alignItems:"center"}]}>
            <Text style={styles.form2_text}>indiquer si vous êtes</Text>
            <Image src={iconArrow} style={{width:9, height:9}} />
          </View>
          <View style={[[styles.row,{gap:10,alignItems:"center"}]]}>
            <View style={[styles.row,{gap:3,alignItems:"center"}]}>
              <View style={{borderWidth:1,borderColor:"black", width:10, height:10}}></View>
              <Text style={styles.form2_text}>* Le demandeur principal</Text>
            </View>
            <View style={[styles.row,{gap:3,alignItems:"center"}]}>
              <View style={{borderWidth:1,borderColor:"black", width:10, height:10}}></View>
              <Text style={styles.form2_text}>* L'époux, le conjoint, ou l'enfant à charge âgé de 18ans ou plus du demandeur principal</Text>
            </View>
          </View>
        </View>

        <View style={{borderWidth:1,borderColor:"black"}}>
          <View style={[styles.row,{borderBottom:1}]}>
            <View style={{paddingHorizontal:5,paddingVertical:2,borderRight:1}}><Text style={styles.form2_titre}>1</Text></View>
            <View style={{paddingHorizontal:5,paddingVertical:2}}><Text style={[styles.form2_titre,{fontWeight:"bold"}]}>Nom Complet</Text></View>
          </View>
          <View style={[styles.row]}>
            <View style={{width:"50%",padding:3,borderRight:1,flexDirection:"column",gap:2}}>
              <Text style={styles.form2_text}>* Nom de Famille</Text>
              <Text style={styles.form2_input}>{datas?.nom}</Text>
            </View>
            <View style={{width:"50%",padding:3,flexDirection:"column",gap:2}}>
              <Text style={styles.form2_text}>* Prénom(s)</Text>
              <Text style={styles.form2_input}>{datas?.prenom}</Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <View style={{borderWidth:1,borderRight:0,borderColor:"black",width:"50%"}}>
            <View style={[styles.row,{}]}>
              <View style={{paddingHorizontal:5,paddingVertical:2,borderRight:1,borderBottom:1}}><Text style={styles.form2_titre}>2</Text></View>
              <View style={{paddingHorizontal:5,paddingVertical:2}}><Text style={[styles.form2_titre,{fontWeight:"bold"}]}></Text></View>
            </View>
            <View style={[styles.row]}>
              <View style={{padding:3,width:"100%",flexDirection:"column",gap:2}}>
                <Text style={styles.form2_text}>* Date de naissance</Text>
                <Text style={styles.form2_input}>{datas?.dateNais}</Text>
              </View>
            </View>
          </View>
          <View style={{borderWidth:1,borderColor:"black",width:"50%"}}>
            <View style={[styles.row,{}]}>
              <View style={{paddingHorizontal:5,paddingVertical:2,borderRight:1,borderBottom:1}}><Text style={styles.form2_titre}>3</Text></View>
              <View style={{paddingHorizontal:5,paddingVertical:2}}><Text style={[styles.form2_titre,{fontWeight:"bold"}]}></Text></View>
            </View>
            <View style={[styles.row]}>
              <View style={{padding:3,width:"100%",flexDirection:"column",gap:2}}>
                <Text style={styles.form2_text}>* IUC</Text>
                <Text style={styles.form2_input}>{datas?.iuc}</Text>
              </View>
            </View>
          </View>
        </View>
        <MilitaryServiceSection datas={datas?.body?.military}/>
        <TemoinServiceSection datas={datas?.body?.temoin}/>
        <AffiliationServiceSection datas={datas?.body?.affiliation}/>
        <ChargesServiceSection datas={datas?.body?.charges}/>
        <VoyageServiceSection  datas={datas?.body?.voyages}/>
      </>
)

};

export default MainForm;
