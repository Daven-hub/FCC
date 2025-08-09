// components/SectionTitle.js
import { Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  title: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: "bold"
  }
});

const SectionTitle = ({ children }) => (
  <View>
    <Text style={styles.title}>{children}</Text>
  </View>
);

export default SectionTitle;
