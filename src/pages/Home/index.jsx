import React from "react";
import Social from "../../components/Social";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

import "./home.css";

const Home = () => {
  return (
    <div className='home-container'>
      <h1>Douglas Monteiro</h1>
      <span>Veja meus links 👇</span>

      <main className='links'>
        <section className='link-area'>
          <a href='#'>
            <p className='link-text'>Canal no yt</p>
          </a>
        </section>
        <section className='link-area'>
          <a href='#'>
            <p className='link-text'>Canal no yt</p>
          </a>
        </section>
        <section className='link-area'>
          <a href='#'>
            <p className='link-text'>Canal no yt</p>
          </a>
        </section>

        <footer>
          <Social url='https://github.com/douglasmonteirodev'>
            <FaGithub size={35} color='#fff' />
          </Social>
          <Social url='https://douglasmonteirodev.github.io/website/'>
            <TbWorld size={38} color='#fff' />
          </Social>
          <Social url='https://www.linkedin.com/in/douglasmonteiro1/'>
            <FaLinkedin size={35} color='#fff' />
          </Social>
        </footer>
      </main>
    </div>
  );
};

export default Home;
