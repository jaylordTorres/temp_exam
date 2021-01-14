import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ICar, RootStackParamList } from '../../types'
import Cover from '../../components/Cover'
import useCarStar from '../../hooks/useCarStar'
import { FormTypes } from '../../constants'

import {
  Card,
  Header,
  Details,
  Line,
  Model,
  MakeYear,
  StarIcon,
  Description,
  EditIcon,
  Actions,
} from './styles'

interface DetialProps {
  route: { params: ICar }
  navigation: StackNavigationProp<RootStackParamList>
}

const Detail = ({ route, navigation }: DetialProps) => {
  const car = route.params
  const { star, toggleStar: _toggleStar } = useCarStar(car)

  const _onEdit = useCallback(() => {
    return navigation.navigate('Form', {
      type: FormTypes.edit,
      id: car?.id,
      car: car
    })
  }, [car])

  return (
    <ScrollView >
      <Card>
        <Cover source={car?.image?.url} />
        <Details>
          <Header>
            <Model>{car.model}</Model>
            <Actions>
              <TouchableOpacity onPress={_onEdit}>
                <EditIcon />
              </TouchableOpacity>
              <TouchableOpacity onPress={_toggleStar}>
                <StarIcon star={star} />
              </TouchableOpacity>
            </Actions>
          </Header>
          <Line />
          <MakeYear>
            {car.make} | {car.year}
          </MakeYear>
          <Description>
            {JSON.stringify(car, null, 2)}
          </Description>
        </Details>
      </Card>
    </ScrollView>
  )
}


export default Detail
