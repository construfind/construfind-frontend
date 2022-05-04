import React from 'react';
import styled from 'styled-components/native';

import logoConstrufind from '../../assets/images/ConstrufindLogo.png';

const FooterAuth = () => {
  return <LogoFooter source={logoConstrufind} />;
}

const LogoFooter = styled.Image`
  align-self: center;
  position: absolute;
  bottom: 0;
  width: 40%;
  height: 4%;
  margin-bottom: 3%;
`;

export default FooterAuth;
