import React, { useMemo } from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ICar, RootStackParamList } from '../../types'
import {
  Caption,
  Label,
  Field,
  Input,
  Container,
  Submit,
  Remove,
  ActionText,
  ErrorLabel
} from './styles'
import { useCarFormHook } from './hook'

interface CarFormProps {
  route: { params: { type: string } }
  navigation: StackNavigationProp<RootStackParamList>
}

const CarForm = ({ route }: CarFormProps) => {
  const { config } = useCarFormHook({ route })
  return (
    <Container>
      <Caption>photo will automatically generated at the backend for tesing purpose only</Caption>
      <View>
        <Field>
          <Label>Name:</Label>
          <Input value="dd" />
        </Field>
        <Field>
          <Label>Year:</Label>
          <Input />
        </Field>
        <Field>
          <Label>Maker:</Label>
          <Input />
        </Field>
      </View>
      <View>
        <ErrorLabel>Error</ErrorLabel>
        {config.isEdit ? <Remove><ActionText>Delete</ActionText></Remove> : null}
        <Submit><ActionText>Submit</ActionText></Submit>
      </View>
    </Container>
  )
}


export default CarForm
