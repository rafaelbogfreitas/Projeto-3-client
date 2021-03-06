import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { signup } from '../../services/authService';


const Signup = ({ flip, setFlip }) => {
  let router = useRouter();

  let [name, setName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState(''); 

  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSignup = (e) => {
    e.preventDefault();
    
    setName('');
    setEmail('');
    setPassword('');

    signup(name, email, password) // <== adicionei then e catch aqui por ser uma função async
      .then(() => {
        router.push('/createStore')
      })
      .catch((error) => {
        console.log(error)
      });
  };

  return (
      <form onSubmit={(e) => handleSignup(e)}>
        <h1>Registrar</h1>
        <input
          onChange={(e) => handleNameChange(e)}
          name="name"
          type="text"
          className="text"
          id="signup-name"
          placeholder="nome"
          value={name}
        />
        <input
          onChange={(e) => handleEmailChange(e)}
          name="email"
          type="text"
          className="text"
          id="signup-email"
          placeholder="email"
          value={email}
        />
        <input
          onChange={(e) => handlePasswordChange(e)}
          name="password"
          type="password"
          className="text"
          id="signup-password"
          placeholder="senha"
          value={password}
        />
        <button className="btn-signup">Registrar</button>
        <button type="button" id="btn--goToLogin" onClick={() => setFlip(!flip)}>Ir para o login</button>
        <a  type="button" href="https://meu-carrinho.herokuapp.com/api/v1/auth/google">
          Entrar com o Google
        </a>
      </form>
  );
};

export default Signup;
