import React, { useState, useEffect } from "react";
import Social from "../../components/Social";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { BiUser } from "react-icons/bi";
import { TbWorld } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { db } from "../../services/firebaseConnection";
import {
  getDocs,
  collection,
  orderBy,
  query,
  doc,
  getDoc,
} from "firebase/firestore";

import "./home.css";

const Home = () => {
  const [links, setLinks] = useState([]);
  const [socialLinks, setSocialLinks] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const loadLinks = () => {
      const linksRef = collection(db, "links");

      const queryRef = query(linksRef, orderBy("created", "asc"));

      getDocs(queryRef).then((snapshot) => {
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
    };

    loadLinks();
  }, []);

  useEffect(() => {
    const loadSocialsLinks = () => {
      const docRef = doc(db, "social", "link");

      getDoc(docRef).then((snapshot) => {
        if (snapshot.data() !== undefined) {
          setSocialLinks({
            github: snapshot.data().github,
            website: snapshot.data().website,
            linkedin: snapshot.data().linkedin,
          });
        }
      });
    };

    loadSocialsLinks();
  }, []);

  return (
    <div className="home-container">
      <h1>Douglas Monteiro</h1>
      <span>Veja meus links 👇</span>

      <div className="user-admim" onClick={() => navigate("/admin")}>
        <BiUser size={35} color="#fff" />
      </div>
      <main className="links">
        {links.map((item, index) => (
          <section
            className="link-area"
            key={index}
            style={{ background: item.bg }}
          >
            <a href={item.url} target="_blank" rel="noopener noreferrer">
              <p className="link-text" style={{ color: item.color }}>
                {item.name}
              </p>
            </a>
          </section>
        ))}
        {links.length !== 0 && Object.keys(socialLinks).length > 0 && (
          <footer>
            <Social url={socialLinks?.github}>
              <FaGithub size={35} color="#fff" />
            </Social>
            <Social url={socialLinks?.website}>
              <TbWorld size={38} color="#fff" />
            </Social>
            <Social url={socialLinks?.linkedin}>
              <FaLinkedin size={35} color="#fff" />
            </Social>
          </footer>
        )}
      </main>
    </div>
  );
};

export default Home;
