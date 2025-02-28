import React from 'react'
import {
  Image as NativeImage,
  ImageProps as NativeImageProps,
} from 'react-native'
import styled from 'styled-components/native'

type ImageProps = NativeImageProps & {
  icon?: boolean
}

const IconView = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
`

const IconImage = styled.Image`
  width: 20px;
  height: 20px;
`

export const Image = (props: ImageProps) => {
  const { icon = false } = props

  return icon ? (
    <IconView>
      <IconImage {...props} />
    </IconView>
  ) : (
    <NativeImage {...props}></NativeImage>
  )
}
