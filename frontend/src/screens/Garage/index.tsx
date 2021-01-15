import React, { useCallback, useMemo } from 'react'
import { FlatList, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { StackNavigationProp } from '@react-navigation/stack'
import { ICar, RootStackParamList } from '../../types'
import { CardListItem } from '../../components'
import { useGarageHook } from './hook'
import { Space, Title, Actions, AddText, Center, Caption } from './styles'

interface GarageProps {
  navigation: StackNavigationProp<RootStackParamList>
}

const Garage = ({ navigation }: GarageProps) => {
  const { onCreate, onPress, cars, meta } = useGarageHook({ navigation });
  const renderItem = useCallback(({ item: car }) => {
    return <CardListItem onPress={onPress} car={car} />
  }, [])


  const content = useMemo(() => {
    if (meta.loading) {
      return <Center>
        <Caption>...loading</Caption>
      </Center>
    }

    if (cars.length > 1) {
      return <FlatList
        data={cars}
        renderItem={renderItem}
        keyExtractor={(car: ICar) => car.id}
        ItemSeparatorComponent={Space}
      />
    }

    return <Center>
      <Caption>Empty</Caption>
    </Center>
  }, [renderItem, cars, meta])


  return (
    <View>
      <Actions>
        <Title>Garage</Title>
        <TouchableOpacity onPress={onCreate}><AddText>Create</AddText></TouchableOpacity>
      </Actions>
      {content}
    </View>
  )

}


export default Garage
