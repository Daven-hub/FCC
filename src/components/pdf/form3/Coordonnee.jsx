import React from "react";
import { styles } from "../Form3";
import { Page, Text, View, Image } from "@react-pdf/renderer";

const HeaderC = ({ titre, num,question, resp }) => {
  return(
    <View style={[styles.row, { borderWidth: 1, borderBottom: 0 }]}>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRight: 1
        }}>
        <Text style={styles.form2_titre}>{num}</Text>
      </View>
      <View style={[styles.row, { gap: 20, paddingHorizontal: 5, paddingVertical: 2 }]}>
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>{titre}</Text>
        {question!==null && <View style={[styles.row, { gap: 10 }]}>
          <Text style={styles.form2_text}>{question}</Text>
          <View style={[[styles.row, { gap: 15, alignItems: "center" }]]}>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: resp && "black"
                }}></View>
              <Text style={styles.form2_text}>* OUI</Text>
            </View>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: !resp && "black"
                }}></View>
              <Text style={styles.form2_text}>* NON</Text>
            </View>
          </View>
        </View>}
      </View>
    </View>
  )
};
const HeaderT = ({ titre, num, resp }) => {
  return(
    <View style={[styles.row, { borderWidth: 1, borderBottom: 0 }]}>
      <View
        style={{
          paddingHorizontal: 5,
          paddingVertical: 2,
          borderRight: 1
        }}>
        <Text style={styles.form2_titre}>{num}</Text>
      </View>
      <View style={[styles.row, { gap: 20, paddingHorizontal: 5, paddingVertical: 2 }]}>
        <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>{titre}</Text>
        {resp!==null && <View style={[styles.row, { gap: 10 }]}>
          <View style={[[styles.row, { gap: 15, alignItems: "center" }]]}>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: resp?.canada && "black"
                }}></View>
              <Text style={styles.form2_text}>* Canada/USA</Text>
            </View>
            <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "black",
                  width: 6,
                  height: 6,
                  backgroundColor: resp?.autre && "black"
                }}></View>
              <Text style={styles.form2_text}>* Autre</Text>
            </View>
          </View>
        </View>}
      </View>
    </View>
  )
};



function Coordonnee({ datas }) {
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
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.casePostale}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>No d'app/unité</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.noAppUnite}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Numéro de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.numeroRue}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "55%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Nom de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.nomRue}</Text>
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
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.villeVillage}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "30%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Pays ou territoire</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.pays}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Province/État</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.provinceEtat}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "17%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Code Postal</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.codePostal}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "18%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>District</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adressePostaleActuelle?.district}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={{ flexDirection: "column" }}>
          <HeaderC titre={"Adresse du domicile"} question={"Identique à l'adresse postale?"} resp={true} num={2} />
          <View style={{ flexDirection: "column", borderWidth: 1 }}>
            <View style={[styles.row]}>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>No d'app/unité</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.noAppUnite}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Numéro de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.numeroRue}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "55%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>* Nom de rue</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.nomRue}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Ville/Village</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.villeVillage}</Text>
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
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.pays}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "15%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_texte, {}]}>Province/État</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.provinceEtat}</Text>
                </View>
              </View>
              <View style={[styles.coll, { borderRight: 1, width: "17%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>Code Postal</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.codePostal}</Text>
                </View>
              </View>
              <View style={[styles.coll, { width: "28%", borderColor: "black" }]}>
                <View style={[styles.row, {}]}>
                  <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                    <Text style={[styles.form2_text, {}]}>District</Text>
                  </View>
                </View>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseDomicile?.district}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.row}>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderT titre={"Numéro de téléphone"} resp={{autre:datas?.telephones?.autre,canada:datas?.telephones?.isCanada}} num={3} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, { borderRight: 1, width: "25%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Type</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.telephones?.type}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Indicatif</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.telephones?.indicatifPays}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "40%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>No</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.telephones?.numero}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { width: "15%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Poste</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{""}</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderT titre={"Autre numéro de téléphone"} resp={{autre:datas?.autreTelephones?.autre,canada:datas?.autreTelephones?.isCanada}} num={4} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, { borderRight: 1, width: "25%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Type</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.autreTelephones?.type}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Indicatif</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.autreTelephones?.indicatifPays}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "40%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>No</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.autreTelephones?.numero}</Text>
                  </View>
                </View>
                <View style={[styles.coll, { width: "15%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Poste</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{" "}</Text>
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
                    <Text style={[styles.form3_input, { width: "100%" }]}> </Text>
                  </View>
                </View>
                <View style={[styles.coll, { borderRight: 1, width: "60%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>No</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}> </Text>
                  </View>
                </View>
                <View style={[styles.coll, { width: "20%", borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}>Poste</Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}> </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={{ flexDirection: "column", width: "50%" }}>
            <HeaderC titre={"Adresse électronique"} num={6} />
            <View style={{ flexDirection: "column", borderWidth: 1 }}>
              <View style={[styles.row]}>
                <View style={[styles.coll, { borderColor: "black" }]}>
                  <View style={[styles.row, {}]}>
                    <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                      <Text style={[styles.form2_text, {}]}> </Text>
                    </View>
                  </View>
                  <View style={[styles.row, { gap: 2 }]}>
                    <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.adresseElectronique}</Text>
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
