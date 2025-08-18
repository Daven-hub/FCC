import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image
} from "@react-pdf/renderer";
import MilitaryServiceSection from "./MilitaryServiceSection";
// import iconArrow from "/icon/caret-square-right.png"
import TemoinServiceSection from "./TemoinServiceSection";
import AffiliationServiceSection from "./AffiliationServiceSection";
import ChargesServiceSection from "./ChargesServviceSection";
import VoyageServiceSection from "./VoyageServiceSection";
import PieceServiceSection from "./PieceServiceSection";

// const styles = StyleSheet.create({
//   page: {
//     padding: 20,
//     fontSize: 10
//   },
//   row:{
//     flexDirection:"row"
//   },
//   form2_grille:{
//     // flex:1,
//     borderWidth:1,
//     width:"100%",
//     borderColor:"black",
//     padding:6,
//     flexDirection:"row"
//   },
//   form2_text:{
//     fontSize:7
//   },
//   form2_titre:{
//     fontSize:8
//   },
//   form2_input:{
//     padding:5,
//     height:28,
//     backgroundColor:"#ff000011"
//   }

// });

const PieceJointe = ({ datas }) => {
  
  return datas?.map((x, ind) => <PieceServiceSection  index={ind+1} key={ind} datas={x} />);
};

export default PieceJointe;
