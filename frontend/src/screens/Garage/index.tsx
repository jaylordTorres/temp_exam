import React, { useState, useEffect } from 'react'
import { ScrollView } from 'react-native'
import { getList } from '../../services/api'
import CardListItem from '../../components/CardListItem'
import { Space, Title } from './styles'
import { ICar } from '../../types'

const Garage = () => {
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

  return (
    <ScrollView

    >
      <Title>Garage</Title>
      {data.map((car: ICar, int: number) => (
        <React.Fragment key={`${car.id}#${car.model}`}>
          <CardListItem car={car} />
          <Space />
        </React.Fragment>
      ))}
    </ScrollView>
  )
}


export default Garage
