import React, { memo } from 'react'
import { Spacing } from '../../styles'
import { useScreenDimensions } from '../../hooks/useScreenDimensions'
import { Image } from "react-native-expo-image-cache";

interface Props {
  source: string
}

const Cover = ({ source }: Props) => {
  const size = useScreenDimensions()
  return (
    <Image
      uri={source}
      style={{
        width: size.width - Spacing.padding * 2,
        height: size.width * 0.67,
        resizeMode: 'cover'
      }}
    />
  )
}

export default memo(Cover)
