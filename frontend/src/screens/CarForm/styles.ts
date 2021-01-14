import styled from 'styled-components/native'
import { AntDesign } from '@expo/vector-icons'

import { Colors, Spacing } from '../../styles'

export const Container = styled.View`
  backgroundColor: ${Colors.cardColor};
  padding: ${Spacing.padding}px
  display: flex;
  flex: 1;
  flexDirection: column;
  justifyContent: space-between;

`

export const Field = styled.View`
  flexDirection: row;
  alignItems:center;
  justifyContent: space-between;
  paddingVertical: 8px
`

export const Input = styled.TextInput`
  height: 40px;
  borderColor: #C0C0C0;
  borderWidth: 1px;
  width: 60%;
  padding: 8px
`

export const Label = styled.Text`
  color: ${Colors.textColor};
  fontSize: 14px;
  fontFamily: Arial;
`
export const ErrorLabel = styled.Text`
  color: ${Colors.alerColor};
  fontSize: 14px;
  fontFamily: Arial;
  paddingVertical: ${Spacing.extraMargin}px
`


export const Caption = styled.Text`
  color: ${Colors.disabledColor};
  fontSize: 14px;
  fontFamily: Arial;
`

export const Submit = styled.TouchableOpacity`
  backgroundColor: ${Colors.starColor};
  fontFamily: Arial; 
  padding: ${Spacing.extraMargin}px
`


export const Remove = styled.TouchableOpacity`
  backgroundColor: ${Colors.alerColor};
  fontFamily: Arial; 
  padding: ${Spacing.extraMargin}px;
  marginTop: ${Spacing.extraMargin}px;
`

export const ActionText = styled.Text` 
  fontSize: 16px;
  fontFamily: Arial;
  textAlign: center;
`

/// added propsType
interface StarProps {
  star: any
}
export const StarIcon = styled(AntDesign).attrs((props: StarProps) => ({
  name: props.star ? 'star' : 'staro',
  color: props.star ? Colors.starColor : Colors.textColor,
  size: 24
}))``
