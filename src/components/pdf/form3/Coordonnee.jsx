import React from "react";
import { styles } from "../Form3";
import { Page, Text, View, Image } from "@react-pdf/renderer";

function Coordonnee({ datas }) {
  const HeaderC = ({ titre, num }) => (
    <View style={[styles.row, { borderWidth: 1, borderBottom: 0 }]}>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRight: 1
        }}>
        <Text style={styles.form2_titre}>{num}</Text>
      </View>
      <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>{titre}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>COORDONNÉES</Text>

      <View>
        <View style={{ flexDirection: "column" }}>
          <HeaderC titre={"Adresse postal actuelle"} num={1} />
          <View style={{ flexDirection: "column", borderWidth: 1 }}>
            <View style={[styles.row]}>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Case postale</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>No d'app/unité</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Numéro de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "55%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Nom de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.row, { borderTop: 1 }]}>
              <View style={[styles.coll, { borderRight: 1, width: "20%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Ville/village</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "30%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Pays ou territoire</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Province/État</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "17%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Code Postal</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "18%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>District</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column" }}>
          <HeaderC titre={"Adresse du domicile"} num={2} />
          <View style={{ flexDirection: "column", borderWidth: 1 }}>
            <View style={[styles.row]}>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>No d'app/unité</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Numéro de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "55%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Nom de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Ville/Village</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.row, { borderTop: 1 }]}>
              <View style={[styles.coll, { borderRight: 1, width: "40%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Pays ou territoire</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Province/État</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "17%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Code Postal</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "28%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>District</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderC titre={"Numéro de téléphone"} num={3} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, { borderRight: 1, width: "25%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Type</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Indicatif</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>+237</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "40%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>No</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { width: "15%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Poste</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>01</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderC titre={"Autre numéro de téléphone"} num={4} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, { borderRight: 1, width: "25%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Type</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Indicatif</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>+237</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "40%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>No</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { width: "15%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Poste</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>02</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderC titre={"Numéro de télécopieur"} num={5} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, { borderRight: 1, width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Indicatif</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>+237</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "60%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>No</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Poste</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>01</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderC titre={"Adresse électronique"} num={6} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, {borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}> </Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.nom}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default Coordonnee;
