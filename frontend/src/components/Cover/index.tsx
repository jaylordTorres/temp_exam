import React, { useMemo } from 'react'
import { Spacing } from '../../styles'
import { useScreenDimensions } from '../../hooks/useScreenDimensions'

import { Image } from './styles'

interface Props {
  source: string
}

// Cover has to fill the whole card area.
const Cover = ({ source }: Props) => {
  const size = useScreenDimensions()

  /// memoize props
  const imageProps = useMemo(() => ({
    source: { uri: source },
    style: {
      width: size.width - Spacing.padding * 2,
      height: size.width * 0.67,
    }
  }), [size, source]);

  return (
    <Image {...imageProps} />
  )
}

export default Cover
