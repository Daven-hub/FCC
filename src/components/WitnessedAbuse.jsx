import { View, Text, StyleSheet } from "@react-pdf/renderer";
import SectionTitle from "./SectionTitle";

const styles = StyleSheet.create({
  row: { flexDirection: "row", flexWrap: "wrap", marginBottom: 4 },
  cell: { width: "20%", fontSize: 10 },
  container: { marginBottom: 10 }
});

const WitnessedAbuse = ({ data }) => (
  <View style={styles.container}>
    <SectionTitle>5. Témoignage de mauvais traitements</SectionTitle>
    {data.map((item, idx) => (
      <View key={idx} style={styles.row}>
        <Text style={styles.cell}>Du: {item.from}</Text>
        <Text style={styles.cell}>Au: {item.to}</Text>
        <Text style={styles.cell}>Lieu: {item.location}</Text>
        <Text style={styles.cell}>Province: {item.province}</Text>
        <Text style={styles.cell}>Pays: {item.country}</Text>
        <Text style={{ width: "100%" }}>Détails: {item.details}</Text>
      </View>
    ))}
  </View>
);

export default WitnessedAbuse;
