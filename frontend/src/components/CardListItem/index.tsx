import React, { useCallback } from 'react'
import { TouchableOpacity } from 'react-native'
import { ICar } from '../../types'
import { useCarStar } from '../../hooks'
import Cover from '../Cover'
import {
  Card,
  Header,
  Details,
  Line,
  Model,
  MakeYear,
  StarIcon,
} from './styles'

export interface CarProps {
  car: ICar
  starred?: boolean
  onPress: Function
}

const CardListItem: React.FC<CarProps> = ({ car, onPress }) => {
  const { star, toggleStar: _toggleStar } = useCarStar(car)

  const _onPress = useCallback(() => onPress(car), [onPress, car])
  return (
    <TouchableOpacity onPress={_onPress}>
      <Card>
        <Cover source={car?.image?.md} />
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
        </Details>
      </Card>
    </TouchableOpacity>
  )
}

export default CardListItem
