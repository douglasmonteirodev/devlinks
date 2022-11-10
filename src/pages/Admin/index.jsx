import React, { useState } from "react";
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

  const [bgColorInput, setBgColorInput] = useState("#f1f1f1");
  const [textColorInput, setTextColorInput] = useState("#121212");

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

  return (
    <div className='admin-cotainer'>
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

      <article
        className='list animate-pop'
        style={{ backgroundColor: "#ff0", color: "#000" }}
      >
        <p>Grupo exclusivo telegram</p>
        <div>
          <button className='btn-delete'>
            <FiTrash2 size={18} color='#fff' />
          </button>
        </div>
      </article>
    </div>
  );
};

export default Admin;
