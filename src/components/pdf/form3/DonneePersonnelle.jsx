import React from "react";
import { Page, Text, View, StyleSheet, Image } from "@react-pdf/renderer";
import { styles } from "../Form3";

const HeaderF = () => {
  return (
    <View style={[styles.row, { backgroundColor: "#80808065", borderTop: 1 }]} wrap={false}>
      <View
        style={[
          styles.col,
          {
            width: "30%",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            borderRight: 1
          }
        ]}>
        <Text style={[styles.form2_titre, { fontWeight: "" }]}>Pays ou Territoire</Text>
      </View>
      <View
        style={[
          styles.col,
          {
            width: "25%",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
            borderRight: 1
          }
        ]}>
        <Text style={[styles.form2_titre, { fontWeight: "" }]}>Statut</Text>
      </View>
      <View
        style={[
          styles.col,
          {
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            textAlign: "center"
          }
        ]}>
        <Text style={[styles.form2_titre, { fontWeight: "", lineHeight: 1.4 }]}>Autre</Text>
      </View>
      <View
        style={[
          styles.col,
          {
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            textAlign: "center"
          }
        ]}>
        <Text style={[styles.form2_titre, { fontWeight: "", lineHeight: 1.4 }]}>De</Text>
      </View>
      <View
        style={[
          styles.col,
          {
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }
        ]}>
        <Text style={[styles.form2_titre, { fontWeight: "", lineHeight: 1.4 }]}>A</Text>
      </View>
    </View>
  );
};

const BodyF = ({datas}) => {
  return (
    <View style={[styles.row, { borderTop: 1 }]} wrap={false}>
      <View
        style={[
          styles.form3_input,
          {
            width: "30%",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
            borderRight: 1
          }
        ]}>
        <Text style={[styles.form3_input, { fontWeight: "" }]}>{datas?.pays}</Text>
      </View>
      <View
        style={[
          styles.form3_input,
          styles.col,
          {
            width: "25%",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
            borderRight: 1
          }
        ]}>
        <Text style={[styles.form2_text, { fontWeight: "" }]}>{datas?.statut}</Text>
      </View>
      <View
        style={[
          styles.form3_input,
          {
            width: "25%",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            textAlign: "center"
          }
        ]}>
        <Text style={[styles.form2_text, { fontWeight: "", lineHeight: 1.4 }]}>{datas?.statutAutre}</Text>
      </View>
      <View
        style={[
          styles.form3_input,
          {
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
            borderRight: 1,
            textAlign: "center"
          }
        ]}>
        <Text style={[styles.form2_text, { fontWeight: "", lineHeight: 1.4 }]}>{datas?.du}</Text>
      </View>
      <View
        style={[
          styles.form3_input,
          {
            width: "10%",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center"
          }
        ]}>
        <Text style={[styles.form2_text, { fontWeight: "", lineHeight: 1.4 }]}>{datas?.au}</Text>
      </View>
    </View>
  );
};

function DonneePersonnelle({ datas }) {
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>DONNÉES PERSONNELLES</Text>
      <View>
        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}>
              <Text style={styles.form2_titre}>1</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Nom Complet</Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View
              style={{
                width: "50%",
                padding: 3,
                borderRight: 1,
                flexDirection: "column",
                gap: 2
              }}>
              <Text style={styles.form2_text}>* Nom de Famille</Text>
              <Text style={styles.form3_input}>{datas?.nomComplet?.nom}</Text>
            </View>
            <View
              style={{
                width: "50%",
                padding: 3,
                flexDirection: "column",
                gap: 2
              }}>
              <Text style={styles.form2_text}>* Prénom(s)</Text>
              <Text style={styles.form3_input}>{datas?.nomComplet?.prenoms}</Text>
            </View>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}>
              <Text style={styles.form2_titre}>2</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Avez vous déjà utilisé un autre nom ?</Text>
            </View>
          </View>
          <View style={[styles.row]}>
            <View
              style={{
                width: "50%",
                padding: 3,
                borderRight: 1,
                flexDirection: "column",
                gap: 2
              }}>
              <Text style={styles.form2_text}>* Nom de Famille</Text>
              <Text style={styles.form3_input}>{datas?.autreNomUtilise?.nom}</Text>
            </View>
            <View
              style={{
                width: "50%",
                padding: 3,
                flexDirection: "column",
                gap: 2
              }}>
              <Text style={styles.form2_text}>* Prénom(s)</Text>
              <Text style={styles.form3_input}>{datas?.autreNomUtilise?.prenoms}</Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ borderWidth: 1, width: "20%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}>
                <Text style={styles.form2_titre}>3</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Sexe</Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.sexe}</Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, width: "20%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}>
                <Text style={styles.form2_titre}>4</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>Date de naissance</Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.dateNaissance}</Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, width: "60%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}>
                <Text style={styles.form2_titre}>5</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>* Lieu de naissance</Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>
                {datas?.lieuNaissance?.villeVillage}, {datas?.lieuNaissance?.pays}
              </Text>
            </View>
          </View>
        </View>
        <View style={[styles.row, { justifyContent: "space-between" }]}>
          <View style={{ borderWidth: 1, width: "40%", borderColor: "black" }}>
            <View style={[styles.row, {}]}>
              <View
                style={{
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  borderRight: 1,
                  borderBottom: 1
                }}>
                <Text style={styles.form2_titre}>6</Text>
              </View>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>*Citoyenneté</Text>
              </View>
            </View>
            <View style={[styles.row, { gap: 2 }]}>
              <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.citoyennete}</Text>
            </View>
          </View>
          <View style={{ borderWidth: 1, width: "60%", borderColor: "black" }}></View>
        </View>
        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1
              }}>
              <Text style={styles.form2_titre}>7</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>*Pays ou Territoire de résidence actuel:</Text>
            </View>
          </View>
          <View style={{ flexDirection: "column" }} wrap={false}>
            <HeaderF />
            <BodyF datas={datas?.residence?.actuelle}/>
          </View>
        </View>

        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1
              }}>
              <Text style={styles.form2_titre}>8</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                * Pays ou Territoire de résidence(s) antérieure(s):
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "column" }} wrap={false}>
            <HeaderF />
            {datas?.residence?.anterieure?.sejours?.map((x,index)=>
            <BodyF datas={x} key={index}/>
          )}
            {/* <BodyF /> */}
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: "black" }}>
          <View style={[styles.row, {}]}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1
              }}>
              <Text style={styles.form2_titre}>9</Text>
            </View>
            <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>* Pays ou Territoire ou vous éffectuez la demande:</Text>
            </View>
          </View>
          <View style={{ flexDirection: "column" }}>
            <HeaderF />
            <BodyF datas={datas?.residence?.paysDemande}/>
          </View>
        </View>
        <View>
          <View style={[styles.row, { justifyContent: "space-between" }]} wrap={false}>
            <View style={{ borderWidth: 1, width: "40%", borderColor: "black" }} wrap={false}>
              <View style={[styles.row, {}]}>
                <View
                  style={{
                    paddingHorizontal: 5,
                    paddingVertical: 2,
                    borderRight: 1,
                    borderBottom: 1
                  }}>
                  <Text style={styles.form2_titre}>10</Text>
                </View>
                <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                  <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>* a) État matrimonial actuel</Text>
                </View>
              </View>
              <View style={[styles.row, { gap: 2 }]}>
                <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.etat}</Text>
              </View>
            </View>
            <View style={[styles.row, { borderWidth: 1, width: "60%", borderColor: "black" }]} wrap={false}>
              <View
                style={[
                  styles.row,
                  {
                    width: "65%",
                    paddingVertical: 2,
                    paddingHorizontal: 4,
                    borderRight: 1,
                    alignItems: "center"
                  }
                ]}>
                <Text style={[styles.form2_titre]}>
                  <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                    b) (si vous êtes mariés ou vivez en union de fait)
                  </Text>{" "}
                  Fournissez la date
                </Text>
              </View>
              <View
                style={{
                  width: "35%",
                  flexDirection: "column",
                  gap: 3,
                  paddingVertical: 2,
                  paddingHorizontal: 4
                }}>
                <Text>*Date</Text>
                <View style={[styles.row, { gap: 2 }]}>
                  <Text style={[styles.form3_input, { width: "100%" }]}>{datas?.dateMariageOuUnion}</Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderWidth: 1,
              borderTop: 0,
              borderColor: "black",
              paddingHorizontal: 4
            }}>
            <View style={[styles.row]}>
              <View style={{ paddingHorizontal: 5, paddingVertical: 2 }}>
                <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>
                  c) Fournissez le nom de votre conjoint(e)/époux(se) de fait actuel(le)
                </Text>
              </View>
            </View>
            <View style={[styles.row]}>
              <View
                style={{
                  width: "50%",
                  padding: 3,
                  borderRight: 1,
                  flexDirection: "column",
                  gap: 2
                }}>
                <Text style={styles.form2_text}>* Nom de Famille</Text>
                <Text style={styles.form3_input}>{datas?.conjoint?.nom}</Text>
              </View>
              <View
                style={{
                  width: "50%",
                  padding: 3,
                  flexDirection: "column",
                  gap: 2
                }}>
                <Text style={styles.form2_text}>* Prénom(s)</Text>
                <Text style={styles.form3_input}>{datas?.conjoint?.prenoms}</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: "black" }} wrap={false}>
          <View style={[styles.row, {}]} wrap={false}>
            <View
              style={{
                paddingHorizontal: 5,
                paddingVertical: 2,
                borderRight: 1,
                borderBottom: 1
              }}>
              <Text style={styles.form2_titre}>11</Text>
            </View>
            <View
              style={[
                styles.row,
                {
                  paddingHorizontal: 5,
                  paddingVertical: 2,
                  gap: 8,
                  alignItems: "center"
                }
              ]}>
              <Text style={[styles.form2_titre, { fontWeight: "bold" }]}>a) Avez vous déjà été marié ou en union de fait?</Text>
              <View style={[[styles.row, { gap: 15, alignItems: "center" }]]}>
                <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      width: 8,
                      height: 8,
                      backgroundColor:datas?.mariage?.etat?.toLowercase()==="oui".toLowerCase() && "black"
                    }}></View>
                  <Text style={styles.form2_text}>* OUI</Text>
                </View>
                <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
                  <View
                    style={{
                      borderWidth: 1,
                      borderColor: "black",
                      width: 8,
                      height: 8,
                      backgroundColor:datas?.mariage?.etat?.toLowercase()==="non" && "black"
                    }}></View>
                  <Text style={styles.form2_text}>* NON</Text>
                </View>
              </View>
            </View>
          </View>
          <View wrap={false}>
            <View
              style={{
                flexDirection: "column",
                gap: 3,
                paddingLeft: 4,
                paddingTop: 2
              }}>
              <Text style={[styles.form2_text, { paddingLeft: 2 }]}>
                b) fournissez les détails suivants sur votre époux(se)/ conjoinct(e) :
              </Text>
              <View style={[styles.row]}>
                <View
                  style={{
                    width: "50%",
                    padding: 3,
                    borderRight: 1,
                    flexDirection: "column",
                    gap: 2
                  }}>
                  <Text style={styles.form2_text}>* Nom de Famille</Text>
                  <Text style={styles.form3_input}>{datas?.mariage?.conjoint?.nom}</Text>
                </View>
                <View
                  style={{
                    width: "50%",
                    padding: 3,
                    flexDirection: "column",
                    gap: 2
                  }}>
                  <Text style={styles.form2_text}>* Prénom(s)</Text>
                  <Text style={styles.form3_input}>{datas?.mariage?.conjoint?.prenoms}</Text>
                </View>
              </View>
            </View>
            <View style={[styles.row, { borderTop: 1 }]}>
              <View
                style={{
                  width: "25%",
                  padding: 3,
                  borderRight: 1,
                  flexDirection: "column",
                  gap: 2
                }}>
                <Text style={styles.form2_text}>c) Date de Naissance</Text>
                <Text style={styles.form3_input}>{datas?.mariage?.conjoint?.nom}</Text>
              </View>
              <View
                style={{
                  width: "45%",
                  padding: 3,
                  flexDirection: "column",
                  gap: 2,
                  borderRight: 1
                }}>
                <Text style={styles.form2_text}>d) Genre de lien parenté(s)</Text>
                <Text style={styles.form3_input}>{datas?.mariage?.conjoint?.genreLienParente}</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  padding: 3,
                  flexDirection: "column",
                  gap: 2,
                  borderRight: 1
                }}>
                <Text style={styles.form2_text}>De</Text>
                <Text style={styles.form3_input}>{datas?.mariage?.conjoint?.du}</Text>
              </View>
              <View
                style={{
                  width: "15%",
                  padding: 3,
                  flexDirection: "column",
                  gap: 2
                }}>
                <Text style={styles.form2_text}>À</Text>
                <Text style={styles.form3_input}>{datas?.mariage?.conjoint?.au}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DonneePersonnelle;
