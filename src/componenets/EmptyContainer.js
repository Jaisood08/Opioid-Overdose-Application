import React from 'react'
import {
    Spinner,
    HStack,
    Heading,
    Center,
    NativeBaseProvider,
  } from "native-base"

  export const Example = () => {
    return (
      <HStack space={2} alignItems="center">
        <Spinner color="warning.500" />
      </HStack>
    )
  }

const EmptyContainer = () => {
    return(
        <NativeBaseProvider>
        <Center flex={1} px="3">
          <Example />
        </Center>
      </NativeBaseProvider>
    )
}

export default EmptyContainer
