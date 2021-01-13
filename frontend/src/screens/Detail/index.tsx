import React from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ICar, RootStackParamList } from '../../types'
import Cover from '../../components/Cover'
import useCarStar from '../../hooks/useCarStar'
import {
  Card,
  Header,
  Details,
  Line,
  Model,
  MakeYear,
  StarIcon,
  Description,
} from './styles'

interface DetialProps {
  route: { params: ICar }
  navigation: StackNavigationProp<RootStackParamList>
}

const Detail = ({ route }: DetialProps) => {
  const car = route.params
  const { star, toggleStar: _toggleStar } = useCarStar(car)
  return (
    <ScrollView >
      <Card>
        <Cover source={car?.image?.url} />
        <Details>
          <Header>
            <Model>{car.model}</Model>
            <TouchableOpacity onPress={_toggleStar}>
              <StarIcon star={star} />
            </TouchableOpacity>
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
