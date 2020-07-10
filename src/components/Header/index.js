import React from 'react';

import './styles.css';
import headerLogo from '../../assets/logo3.png'

function Header() {
  return (
  <div className = "container">
    <div className="imgcontainer">
      <img src = {headerLogo} alt="HeaderLogo" draggable={false}/>
    </div>
    <div className="apresentantion">
      <h1>Bem Vindo(a),</h1>
      <p>Agradecemos a escolha pela preferência, escolha os itens a baixo que gostaria de se deliciar. Ao clicar em finalizar compra você será redirecionado para o nosso WhatsApp com tudo certinho no corpo da mensagem, aí é só enviar. Mágico não? Mas garanto que não tão mágico quanto o sabor.</p>
    </div>  
  </div>
  );
}

export default Header;