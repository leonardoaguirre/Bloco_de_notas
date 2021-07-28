
import React, { useState } from 'react'

import './login.css'

import { /*Link, Router,*/ useHistory } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from 'react';

function Login() {
   const [email, setEmail] = useState("")
   const [senha, setSenha] = useState("")
   const history = useHistory();
   const [erro, setErro] = useState({ constraints: { message: "" } })

   useEffect(()=>{
      localStorage.clear();
      
   })

   const loginClick = (e: any) => {
      e.preventDefault();

      axios.post('http://localhost:3008/User/Login', {
         email: email,
         senha: senha
      })
         .then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.user));
            history.push("/Notas");
            console.log(response);

         })
         .catch(err => {
            setErro(err.response.data);

         });
   }

   const cadastrarClick = (e: any) => {
      e.preventDefault();
      history.push('/Cadastrar');
   }

   return (
      <div className="login">
         <div className="login-right">
            <h1>Bloco de notas Online</h1>

            <div className="login-loginInputEmail">
               <input
                  type="email"
                  placeholder="Digite um email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className="login-loginInputSenha">
               <input
                  placeholder="Digite sua senha"
                  type={"Password"}
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
               />
            </div>
            {erro.constraints.message !== "" ?
               <p className="erro">{erro.constraints.message}</p> : ""}

            <button type="submit" onClick={loginClick}>
               Entrar
            </button>

            <h4>Não tenho conta!</h4>
            <button type="submit" onClick={cadastrarClick}>
               Cadastrar-se
            </button>
         </div>
      </div>
   )
}

export default Login

