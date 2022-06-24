import React from 'react'
import { Text, ActivityIndicator, Modal, View } from 'react-native'
import LottieView from 'lottie-react-native'
import styled from 'styled-components/native'
import { widthPercentageToDP as wp,  heightPercentageToDP as hp } from 'react-native-responsive-screen'

import { Animations, COLORS, FONTS } from '../../assets/constants'

const Loader = ({ loading, text }) => {
  if (loading) {
    return (
      <Container>
        <Modal animationType="slide" transparent visible={loading} onRequestClose={() => {}}>
          <ContentContainer>
            <View style={activityViewStyle}>
              <ActivityContainer>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <ActivityText>{text || 'Verificando...'}</ActivityText>
              </ActivityContainer>
            </View>
          </ContentContainer>
        </Modal>
      </Container>
    )
  }
  return null
}

const activityViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: '#323438',
  borderRadius: hp('2%'),
  shadowColor: '#000000',
  shadowOffset: {
    width: 0,
    height: 3
  },
  shadowRadius: 5,
  shadowOpacity: 1.0,
  elevation: 5
}

const Container = styled(View)`
  position: absolute;
  background-color: #000000aa;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  z-index: 50;
`

const ContentContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
`

const ActivityContainer = styled(View)`
  position: absolute;
  top: ${hp('17%')}px;
`

const ActivityText = styled(Text)`
  margin-top: 8px;
  text-align: center;
  color: ${COLORS.white};
  font-family: ${FONTS.bold};
`

export default Loader;
