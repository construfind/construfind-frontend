import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styled from 'styled-components/native';

import { COLORS } from '../../assets/constants';

const IconStyled = (props) => {
  return <IconProps name={props.icon} size={35} color={props.focused ? COLORS.primary :'#6A6A6A'} />;
}

const IconProps = styled(Icon)`
  margin: auto;
`;

export default IconStyled;
