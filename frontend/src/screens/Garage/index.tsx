import React, { useState, useEffect, useCallback } from 'react'
import { ScrollView } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getList } from '../../services/api'
import { ICar, RootStackParamList } from '../../types'
import CardListItem from '../../components/CardListItem'
import { Space, Title } from './styles'


interface GarageProps {
  navigation: StackNavigationProp<RootStackParamList>
}

const Garage = ({ navigation }: GarageProps) => {
  const [data, setData] = useState([])

  useEffect(() => {
    const updateData = async () => {
      try {
        const res = await getList()
        setData(res.data)

      } catch (e) {
        console.log(e.message);
      }
    }
    updateData()
  }, [])

  const onPress = useCallback((car) => {
    return navigation.navigate('Details', car)
  }, [])

  return (
    <ScrollView>
      <Title>Garage</Title>
      {data.map((car: ICar, int: number) => (
        <React.Fragment key={`${car.id}#${car.model}`}>
          <CardListItem onPress={onPress} car={car} />
          <Space />
        </React.Fragment>
      ))}
    </ScrollView>
  )
}


export default Garage
