import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input from "../../components/Input";
import { toast } from "react-toastify";

import { db } from "../../services/firebaseConnection";
import { setDoc, getDoc, doc } from "firebase/firestore";
import { MdAddLink } from "react-icons/md";
import "./networks.css";

const Networks = () => {
  const [github, setGithub] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");

  useEffect(() => {
    const loadLinks = () => {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setGithub(snapshot.data().github);
          setWebsite(snapshot.data().website);
          setLinkedin(snapshot.data().linkedin);
        }
      });
    };

    loadLinks();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();

    setDoc(doc(db, "social", "link"), {
      github,
      website,
      linkedin,
    })
      .then(() => {
        toast.success("Link salvo com sucesso");
      })
      .catch(() => toast.error("Erro ao salvar"));
  };

  return (
    <div className='admin-container'>
      <Header />
      <h1 className='title-social'>Suas Redes sociais</h1>

      <form className='form' onSubmit={handleSave}>
        <label className='label'> Link do Github</label>
        <Input
          placeholder='Digite a url do github'
          value={github}
          onChange={(e) => setGithub(e.target.value)}
        />

        <label className='label'> Link do Website</label>
        <Input
          placeholder='Digite a url do website'
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />

        <label className='label'> Link do Linkedin</label>
        <Input
          placeholder='Digite a url do linkedin'
          value={linkedin}
          onChange={(e) => setLinkedin(e.target.value)}
        />

        <button type='submit' className='btn-register' style={{ marginTop: 8 }}>
          Salvar Links <MdAddLink size={24} color='#fff' />
        </button>
      </form>
    </div>
  );
};

export default Networks;
