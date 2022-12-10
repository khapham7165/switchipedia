import React from 'react'
import {
  Image as NativeImage,
  ImageProps as NativeImageProps,
} from 'react-native'

type ImageProps = NativeImageProps

export const Image = (props: ImageProps) => {
  return <NativeImage {...props}></NativeImage>
}
