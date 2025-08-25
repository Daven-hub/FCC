import React from "react";
import { styles } from "../Form3";
import { Page, Text, View, Image } from "@react-pdf/renderer";

const Questions = ({ datas }) => {
  return (
    <View style={[styles.row, { gap: 10, alignItems: "center" }]} wrap={false}>
      <Text style={styles.form2_titre}>
        {datas?.libelle}
      </Text>
      <View style={[[styles.row, { gap: 8, alignItems: "center" }]]}>
        <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              width: 6,
              height: 6,
              backgroundColor: datas?.value && "black"
            }}></View>
          <Text style={styles.form2_text}>* Oui</Text>
        </View>
        <View style={[styles.row, { gap: 3, alignItems: "center" }]}>
          <View
            style={{
              borderWidth: 1,
              borderColor: "black",
              width: 6,
              height: 6,
              backgroundColor: !datas?.value && "black"
            }}></View>
          <Text style={styles.form2_text}>* Non</Text>
        </View>
      </View>
    </View>
  );
};

const BodyA = ({ datas, num }) => {
  return (
    <View style={[styles.row, { borderTop: 1, borderRight: 1, borderLeft: 1 }]} wrap={false}>
      <View style={{ width: "3%" }}>
        <View
          style={{
            paddingHorizontal: 5,
            paddingVertical: 2,
            borderRight: 1,
            borderBottom: 1
          }}>
          <Text style={styles.form2_titre}>{num}</Text>
        </View>
      </View>
      <View style={{ flexDirection: "column", width: "97%", gap: 6, paddingVertical: 5, paddingHorizontal: 4 }}>
        <View style={{ flexDirection: "column", gap: 4 }}>
          {datas?.quest?.map((x, ind) => (
            <Questions key={ind} datas={x} />
          ))}
        </View>
        {datas?.isDetail &&
        <View style={{ flexDirection: "column", gap: 3 }}>
          <Text style={styles.form2_text}>{datas?.labelD}</Text>
          <View style={[styles.form3_input, { padding: 3 }]}>
            <Text style={styles.form2_titre}>{datas?.detail}</Text>
          </View>
        </View>
        }
      </View>
    </View>
  );
};

function Antecedent({ datas }) {
  const resp = [
    {
      quest: [
        {
          libelle:
            "a) Avez-vous eu la tuberculose ou tout autre trouble physique ou mental sérieux au cours des dernières années ?",
          value: datas?.sante?.tuberculoseDernieresAnnees
        },
        {
          libelle: "b) Avez-vous un trouble physique ou mental qui nécessite des soins sociaux ou médicaux au Canada ?",
          value: datas?.sante?.troublePhysiqueMental
        }
      ],
      isDetail: true,
      detail: datas?.sante?.details,
      labelD: "C) Si vous avez repondu Oui à la question 1a) ou 1b), veuillez fournir les détails et le nomdu membre de a famille (s'il y'a eu lieu)"
    },
    {
      quest: [
        {
          libelle: "a) Êtes-vous resté(e) au Canada après l'expiration de votre statut ?",
          value: datas?.statutCanada?.resteApresExpiration
        },
        {
          libelle: "b) Avez-vous déjà été refusé(e) un visa ou permis canadien ?",
          value: datas?.statutCanada?.refusVisaPermis
        },
        {
          libelle: "c) Avez-vous déjà fait une demande d'entrée au Canada ?",
          value: datas?.statutCanada?.demandeEntreeCanada
        }
      ],
      isDetail: true,
      detail: datas?.statutCanada?.details,
      labelD: "d) Si vous avez repondu Oui à la question 2a), 2b) ou 2c), veuillez fournir les détails"
    },
    {
      quest: [
        {
          libelle: "a) Avez-vous déjà commis, été accusé(e) ou condamné(e) pour une infraction pénale ?",
          value: datas?.infractionsPenales?.commisOuAccuse
        }
      ],
      isDetail: true,
      detail: datas?.infractionsPenales?.details,
      labelD: "b) Si vous avez repondu Oui à la question 3a), veuillez fournir les détails"
    },
    {
      quest: [
        {
          libelle: "a) Avez-vous déjà fait partie d'un service militaire ou de police ?",
          value: datas?.serviceMilitairePolice?.aFaitPartie
        }
      ],
      isDetail: true,
      detail: datas?.serviceMilitairePolice?.details,
      labelD: "b) Si vous avez repondu Oui à la question 4a), veuillez fournir vos dates de service et ajouter des pays ou térritoires ou vous avez servi"
    },
    {
      quest: [
        {
          libelle: "Avez-vous déjà été membre ou affilié à un groupe ou organisation qui a commis ou prôné des actes violents ?",
          value: datas?.appartenanceGroupeViolent?.aEteMembreOuAffilie
        }
      ],
      isDetail: false,
      detail: "",
      labelD: ""
    },
    {
      quest: [
        {
          libelle: "Avez-vous déjà été témoin ou participé à des mauvais traitements ou à des crimes de guerre ?",
          value: datas?.temoignageMauvaisTraitements?.aEteTemoinOuParticipe
        }
      ],
      isDetail: false,
      detail: "",
      labelD: ""
    }
  ];
  return (
    <View style={{ flexDirection: "column", gap: 2.5 }}>
      <Text style={{ fontSize: 9, fontWeight: "bold" }}>ANTÉCÉDENTS</Text>
      <View style={{ flexDirection: "column", borderBottom: 1 }}>
        {resp?.map((item, index) => (
          <BodyA key={index} datas={item} num={index + 1} />
        ))}
      </View>
    </View>
  );
}

export default Antecedent;
