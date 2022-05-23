import React from 'react';
import styled from 'styled-components/native';
import {StyleSheet, View} from 'react-native';

import logoConstrufind from '../../assets/images/ConstrufindLogo.png';

const HeaderLogo = () => {
  return (
    <View style={styles.HR}>
      <LogoFooter source={logoConstrufind} />
    </View>
  )
}

const styles = StyleSheet.create({
  HR:{
    borderBottomColor: '#C7C7C7',
    borderBottomWidth: 1,    
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: '11%'
  }
})

const LogoFooter = styled.Image`
  align-self: center;
  width: 160;
  height: 39;
`;

export default HeaderLogo;
