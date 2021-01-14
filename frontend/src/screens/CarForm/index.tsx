import React from 'react'
import { View } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList } from '../../types'
import {
  Caption,
  Label,
  Field,
  Input,
  Container,
  Submit,
  Remove,
  ErrorLabel,
  Loading,
  DeleteIcon,
  Actions,
  SubmitIcon
} from './styles'
import { useCarFormHook } from './hook'

interface CarFormProps {
  route: { params: { type: string, id?: string } }
  navigation: StackNavigationProp<RootStackParamList>
}

const CarForm = ({ route }: CarFormProps) => {
  const {
    config,
    meta,
    state,
    onSubmit,
    onDelete,
    onChangeMake,
    onChangeModel,
    onChangeYear
  } = useCarFormHook({ route })
  return (
    <Container>
      <Actions>
        {config.isEdit ? <Remove onPress={onDelete}>
          <DeleteIcon />
        </Remove> : <View />}
        <Submit onPress={onSubmit}>
          <SubmitIcon />
        </Submit>
      </Actions>
      <Caption>photo will automatically generated at the backend for tesing purpose only</Caption>
      <View>
        <Field>
          <Label>Model:</Label>
          <Input value={state.model} onChangeText={onChangeModel} />
        </Field>
        <Field>
          <Label>Year:</Label>
          <Input value={String(state.year)} onChangeText={onChangeYear} keyboardType="numeric" />
        </Field>
        <Field>
          <Label>Make:</Label>
          <Input value={state.make} onChangeText={onChangeMake} />
        </Field>
      </View>
      <View>
        {meta.loading && <Loading>...Loading</Loading>}
        <ErrorLabel>{meta.error}</ErrorLabel> 
      </View>
    </Container>
  )
}


export default CarForm
