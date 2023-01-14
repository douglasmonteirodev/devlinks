import React, { useState } from "react";
import Logo from "../../components/Logo";
import { auth } from "../../services/firebaseConnection";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Input from "../../components/Input";

import "./signup.css";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "" || password === "") {
      alert("Preencha todos os campos");
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        toast.success("Cadastro feito com sucesso");
        navigate("/admin", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="login-container">
      <Logo />
      <form className="form" onSubmit={handleLogin}>
        <Input
          type="email"
          placeholder="Digite seu email..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          type="password"
          placeholder="***********"
          autoComplete="on"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Criar uma conta</button>

        <div className="login-text">
          Já possui uma conta?
          <Link to="/login"> Acesse agora!</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
