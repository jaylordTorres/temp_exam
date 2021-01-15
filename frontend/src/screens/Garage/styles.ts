import styled from 'styled-components/native' 
import { Colors, Spacing } from '../../styles'

export const Title = styled.Text`
  color: ${Colors.textColor};
  fontSize: 36px;
  fontFamily: Arial;
  fontWeight: bold;
`

export const Space = styled.View`
  height: ${Spacing.padding + Spacing.extraMargin}px;
`
export const Center = styled.View`
  flexGrow: 1;
  justifyContent: center;
  alignItems: center;
`
export const Caption = styled.Text`
  color: ${Colors.disabledColor};
  fontSize: 16px; 
`

export const Actions = styled.View`
  flexDirection: row;
  alignItems: center;
  justifyContent: space-between;
  paddingHorizontal: ${Spacing.padding}px;
  paddingTop: ${3 * Spacing.padding}px;
  paddingBottom: ${Spacing.padding}px;
`

export const AddText = styled.Text`
  color: ${Colors.textColor};
  fontSize: 16px; 
`