import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../components/Logo";

import "./error.css";
const Error = () => {
  return (
    <div className='error'>
      <Logo />
      <h1>Página não econtrada</h1>
      <p>Está página que está procurando não existe</p>
      <Link to='/' className='link'>
        Voltar para home
      </Link>
    </div>
  );
};

export default Error;
