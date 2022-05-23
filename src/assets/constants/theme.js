import { Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

const COLORS = {
  // base colors
  primary: '#F0D22F',
  secondary: '#323438',
  background: 'rgb(251, 251, 251)',

  // colors
  black: '#1E1F20',
  white: '#FFFFFF',
  blue: '#00CCFF',
  green: '#26E096',
  gray: '#94989C',
  textColor: '#323438',
  inputContainer: '#222222',
  disabledButton: '#d9a700',
  occorenceItem: '#464646',

  lightGray: '#beC1C4',
  lightGray2: '#DADFE2',
  lightGray3: '#EFEFF1',
  lightGray4: '#F8F8F9',
  transparent: 'transparent',
  darkGray: '#898C95'
}

const SIZES = {
  // global sizes
  base: 8,
  font: 14,
  radius: 30,
  padding: 10,
  padding2: 20,
  padding3: 50,

  // font sizes
  largeTitle: 50,
  h1: 30,
  h2: 22,
  h3: 20,
  h4: 18,
  body1: 30,
  body2: 20,
  body3: 16,
  body4: 14,
  body5: 12,

  // app dimensions
  width,
  height
}

const FONTS = {
  bold: 'Poppins-Bold',
  light: 'Poppins-Light',
  medium: 'Poppins-Medium',
  black: 'Poppins-Black',
  blackItalic: 'Poppins-BlackItalic',
  boldItalic: 'Poppins-BoldItalic',
  extraBold: 'Poppins-ExtraBold',
  extraBoldItalic: 'Poppins-ExtraBoldItalic',
  extraLight: 'Poppins-ExtraLight',
  extraLightItalic: 'Poppins-ExtraLightItalic',
  italic: 'Poppins-Italic',
  lightItalic: 'Poppins-LightItalic',
  mediumItalic: 'Poppins-MediumItalic',
  regular: 'Poppins-Regular',
  semiBold: 'Poppins-SemiBold',
  semiBoldItalic: 'Poppins-SemiBoldItalic',
  thin: 'Poppins-Thin',
  thinItalic: 'Poppins-ThinItalic'
}

export { COLORS, SIZES, FONTS }
