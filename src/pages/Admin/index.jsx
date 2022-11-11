import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Logo from "../../components/Logo";
import Input from "../../components/Input";
import { MdAddLink } from "react-icons/md";
import { FiTrash2 } from "react-icons/fi";
import { db } from "../../services/firebaseConnection";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  doc,
  orderBy,
  deleteDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

import "./admin.css";

const Admin = () => {
  const [nameInput, setNameInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [links, setLinks] = useState([]);

  const [bgColorInput, setBgColorInput] = useState("#f1f1f1");
  const [textColorInput, setTextColorInput] = useState("#121212");

  useEffect(() => {
    const linksRef = collection(db, "links");
    const queryRef = query(linksRef, orderBy("created", "asc"));

    onSnapshot(queryRef, (snapshot) => {
      let lista = [];

      snapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          name: doc.data().name,
          url: doc.data().url,
          bg: doc.data().bg,
          color: doc.data().color,
        });
      });
      setLinks(lista);
    });
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    if (nameInput === "" || urlInput === "") {
      toast.warning("Preencha todos os campos");
      return;
    }
    addDoc(collection(db, "links"), {
      name: nameInput,
      url: urlInput,
      bg: bgColorInput,
      color: textColorInput,
      created: new Date(),
    })
      .then(() => {
        setNameInput("");
        setUrlInput("");
        toast.success("Link registrado com sucesso");
      })
      .catch((error) => {
        console.log(error);
        toast.error("ErroX");
      });
  };

  const handleDelete = async (id) => {
    const docRef = doc(db, "links", id);
    await deleteDoc(docRef);
  };

  return (
    <div className='admin-container'>
      <Header />
      <Logo />

      <form className='form' onSubmit={handleRegister}>
        <label className='label'>Nome do Link</label>
        <Input
          placeholder='Nome do link'
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
        />

        <label className='label'>Url do Link</label>
        <Input
          placeholder='Url do link'
          type='url'
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
        />

        <section className='container-colors'>
          <div>
            <label className='label right'>Fundo do link</label>
            <input
              type='color'
              value={bgColorInput}
              onChange={(e) => setBgColorInput(e.target.value)}
            />
          </div>

          <div>
            <label className='label right'>Cor do link</label>
            <input
              type='color'
              value={textColorInput}
              onChange={(e) => setTextColorInput(e.target.value)}
            />
          </div>
        </section>

        {nameInput !== "" && (
          <div className='preview'>
            <label> Veja como está ficando 👇</label>
            <article
              className='list'
              style={{ marginTop: 8, backgroundColor: bgColorInput, marginBottom: 12 }}
            >
              <p style={{ color: textColorInput }}>{nameInput}</p>
            </article>
          </div>
        )}

        <button className='btn-register' type='submit'>
          Cadastrar <MdAddLink size={25} color='#fff' />
        </button>
      </form>

      <h2 className='title'>Meus Links</h2>

      {links.map((item, index) => (
        <article
          key={index}
          className='list animate-pop'
          style={{ backgroundColor: item.bg, color: item.color }}
        >
          <p>{item.name}</p>
          <div>
            <button className='btn-delete' onClick={() => handleDelete(item.id)}>
              <FiTrash2 size={18} color='#fff' />
            </button>
          </div>
        </article>
      ))}
    </div>
  );
};

export default Admin;
