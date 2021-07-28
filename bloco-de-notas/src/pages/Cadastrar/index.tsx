
import React, { useState } from 'react'
import './cadastrar.css'

import axios from 'axios';
import { useHistory } from 'react-router-dom';

function Cadastrar() {
   const [email, setEmail] = useState("")
   const [senha, setSenha] = useState("")
   const [erro, setErro] = useState([{ constraints: { message: "" } }]);
   const history = useHistory();

   const cadastrarClick = async (event: any) => {
      event.preventDefault();

      await axios.post('http://localhost:3008/User/Insert', {
         email: email,
         senha: senha
      }).then(res => {
         if (res.status === 200) {
            history.push('/')
         }
      }).catch(err => {
         console.log(err.response.data);

         setErro(err.response.data);

      })


   }

   return (
      <div className="cadastrar">
         <div className="cadastrar-right">
            <h1>Cadastro de Usuario</h1>

            <div className="cadastrar-cadastrarInputEmail">
               <input
                  type="email"
                  placeholder="Digite um email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
               />
            </div>

            <div className="cadastrar-cadastrarInputSenha">
               <input
                  placeholder="Digite uma senha"
                  type="Password"
                  value={senha}
                  onChange={e => setSenha(e.target.value)}
               />
            </div>
            {erro.length > 0 ? erro.map((err, key) =>
               <p key={key} className="erro">{Object.values(err.constraints)}</p>) : ""}

            <button type="submit" onClick={cadastrarClick}>
               Cadastrar
            </button>
         </div>
      </div>
   )
}

export default Cadastrar

