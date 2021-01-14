import React, { useState, useEffect, useCallback } from 'react'
import { FlatList, View, Text } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { getList } from '../../services/api'
import { ICar, RootStackParamList } from '../../types'
import CardListItem from '../../components/CardListItem'
import { Space, Title } from './styles'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { FormTypes } from '../../constants'


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
  const onCreate = useCallback(() => {
    return navigation.navigate('Form', { type: FormTypes.create })
  }, [])
  const Edit = useCallback(() => {
    return navigation.navigate('Form', { type: FormTypes.edit })
  }, [])

  const renderItem = useCallback(({ item: car }) => {
    return <CardListItem onPress={onPress} car={car} />
  }, [])

  return (
    <View>
      <Title>Garage</Title>
      <TouchableOpacity onPress={onCreate}>
        <Text>create</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={Edit}>
        <Text>EDit</Text>
      </TouchableOpacity>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(car: ICar) => car.id}
        ItemSeparatorComponent={Space}
      />
    </View>
  )
}


export default Garage
