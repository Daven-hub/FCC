import React, { useState } from "react";
import logoEntreprise from '/fcc.png'
import logoCanada from '/fcc.png'

export default function FamilyForm() {
    const [formData, setFormData] = useState({
        applicant: { name: "", dob: "", country: "", occupation: "", maritalStatus: "", address: "", coming: false },
        spouse: { name: "", dob: "", country: "", occupation: "", maritalStatus: "", address: "", coming: false },
        father: { name: "", dob: "", country: "", occupation: "", address: "", coming: false },
        mother: { name: "", dob: "", country: "", occupation: "", address: "", coming: false },
        children: [],
        siblings: [],
        declarationAgreed: false,
    });

    const handleChange = (section, field, value) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], [field]: value },
        }));
    };

    const handleAddEntry = (section) => {
        setFormData(prev => ({
            ...prev,
            [section]: [...prev[section], { name: "", dob: "", country: "", occupation: "", maritalStatus: "", address: "", coming: false }],
        }));
    };

    const handleEntryChange = (section, index, field, value) => {
        const updated = [...formData[section]];
        updated[index][field] = value;
        setFormData(prev => ({ ...prev, [section]: updated }));
    };

    return (
        <div className="max-w-5xl mx-auto p-6 bg-light rounded-2xl shadow-soft text-dark my-12">
            {/* <div className="flex justify-between items-center mb-10">
                <img src={logoEntreprise} alt="Logo entreprise" className="h-14" />
                <h1 className="text-3xl font-title text-center text-primary font-bold">Formulaire IMM 5645 - Informations sur la famille</h1>
                <img src={logoCanada} alt="Logo Canada" className="h-14" />
            </div> */}
            <h1 className="text-3xl font-title mb-8 text-primary">Formulaire IMM 5645 - Informations sur la famille</h1>

            {['applicant', 'spouse', 'father', 'mother'].map(section => (
                <section key={section} className="mb-6">
                    <h2 className="text-xl font-semibold text-primary capitalize">{section === 'applicant' ? 'Demandeur' : section}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                        <input className="border p-2 rounded-lg" placeholder="Nom complet" value={formData[section].name} onChange={e => handleChange(section, 'name', e.target.value)} />
                        <input className="border p-2 rounded-lg" type="date" placeholder="Date de naissance" value={formData[section].dob} onChange={e => handleChange(section, 'dob', e.target.value)} />
                        <input className="border p-2 rounded-lg" placeholder="Pays de naissance" value={formData[section].country} onChange={e => handleChange(section, 'country', e.target.value)} />
                        <input className="border p-2 rounded-lg" placeholder="Profession" value={formData[section].occupation} onChange={e => handleChange(section, 'occupation', e.target.value)} />
                        {section !== 'father' && section !== 'mother' && (
                            <input className="border p-2 rounded-lg" placeholder="État civil" value={formData[section].maritalStatus} onChange={e => handleChange(section, 'maritalStatus', e.target.value)} />
                        )}
                        <input className="border p-2 rounded-lg" placeholder="Adresse actuelle" value={formData[section].address} onChange={e => handleChange(section, 'address', e.target.value)} />
                    </div>
                    <label className="block mt-2">
                        <input type="checkbox" className="mr-2" checked={formData[section].coming} onChange={e => handleChange(section, 'coming', e.target.checked)} />
                        Accompagnera au Canada
                    </label>
                </section>
            ))}

            {['children', 'siblings'].map(group => (
                <section key={group} className="mb-6">
                    <h2 className="text-xl font-semibold text-primary capitalize">{group === 'children' ? 'Enfants' : 'Frères et sœurs'}</h2>
                    {formData[group].map((entry, idx) => (
                        <div key={idx} className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <input className="border p-2 rounded-lg" placeholder="Nom complet" value={entry.name} onChange={e => handleEntryChange(group, idx, 'name', e.target.value)} />
                            <input className="border p-2 rounded-lg" type="date" placeholder="Date de naissance" value={entry.dob} onChange={e => handleEntryChange(group, idx, 'dob', e.target.value)} />
                            <input className="border p-2 rounded-lg" placeholder="Pays de naissance" value={entry.country} onChange={e => handleEntryChange(group, idx, 'country', e.target.value)} />
                            <input className="border p-2 rounded-lg" placeholder="Profession" value={entry.occupation} onChange={e => handleEntryChange(group, idx, 'occupation', e.target.value)} />
                            <input className="border p-2 rounded-lg" placeholder="État civil" value={entry.maritalStatus} onChange={e => handleEntryChange(group, idx, 'maritalStatus', e.target.value)} />
                            <input className="border p-2 rounded-lg" placeholder="Adresse actuelle" value={entry.address} onChange={e => handleEntryChange(group, idx, 'address', e.target.value)} />
                            <label className="block mt-1">
                                <input type="checkbox" className="mr-2" checked={entry.coming} onChange={e => handleEntryChange(group, idx, 'coming', e.target.checked)} />
                                Accompagnera au Canada
                            </label>
                        </div>
                    ))}
                    <button onClick={() => handleAddEntry(group)} className="mt-4 bg-secondary text-white px-4 py-2 rounded-xl hover:bg-accent transition">
                        Ajouter {group === 'children' ? 'un enfant' : 'un frère/sœur'}
                    </button>
                </section>
            ))}

            <section className="mt-8">
                <h2 className="text-xl font-semibold text-primary">Déclaration</h2>
                <label className="block mt-4">
                    <input type="checkbox" className="mr-2" checked={formData.declarationAgreed} onChange={e => setFormData(prev => ({ ...prev, declarationAgreed: e.target.checked }))} />
                    Je déclare que les renseignements fournis sont complets, précis et conformes aux faits.
                </label>
            </section>

            <button onClick={() => console.log(formData)} className="mt-6 bg-primary text-white px-6 py-2 rounded-xl hover:bg-accent transition">
                Soumettre le formulaire
            </button>
        </div>
    );
}
