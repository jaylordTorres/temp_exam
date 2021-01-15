import React from 'react'
import { View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker';

import { StackNavigationProp } from '@react-navigation/stack'
import { RootStackParamList, IMaker } from '../../types'
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
import { Colors } from '../../styles'

interface CarFormProps {
  route: { params: { type: string, id?: string } }
  navigation: StackNavigationProp<RootStackParamList>
}

const CarForm = ({ route }: CarFormProps) => {
  const {
    config,
    meta,
    state,
    makers,
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
          <View>
            <MakerPicker
              onChange={onChangeMake}
              makers={makers}
              value={state.make}
            />
          </View>
          {/* <Input value={state.make} onChangeText={onChangeMake} /> */}
        </Field>
      </View>
      <View>
        {meta.loading && <Loading>...Loading</Loading>}
        <ErrorLabel>{meta.error}</ErrorLabel>
      </View>
    </Container>
  )
}

interface IMakerPickerProps {
  value: string
  onChange: (value: string) => void
  makers: IMaker[]
}

function MakerPicker({
  value,
  onChange,
  makers,
}: IMakerPickerProps) {
  return <DropDownPicker
    placeholder='Select maker'
    placeholderStyle={{ color: Colors.textColor }}
    items={makers.map(i => ({ label: i.name, value: i.id }))}
    defaultValue={value}
    selectedLabelStyle={{ color: Colors.textColor }}
    containerStyle={{ height: 40, width: 250, }}

    // style={{ backgroundColor: '#fafafa' }}
    itemStyle={{ justifyContent: 'flex-start' }}
    // dropDownStyle={{ backgroundColor: '#fafafa' }}
    onChangeItem={item => onChange(item.value)}
  />

}


export default CarForm
