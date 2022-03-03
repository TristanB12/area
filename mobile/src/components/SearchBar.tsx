import React from "react"
import { Box, Icon, Input, Skeleton } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

type SearchBarProps = {
  placeholder: string,
  search: string,
  setSearch: React.Dispatch<React.SetStateAction<string>>,
}

function SearchBar({ placeholder, search, setSearch } : SearchBarProps) {
  return (
    <Input
      placeholder={placeholder}
      width="100%"
      borderRadius="6"
      borderColor="tertiary.400"
      _focus={{
        borderColor: "tertiary.400"
      }}
      py="3"
      px="3"
      my="5"
      fontSize="14"
      InputLeftElement={
        <Box p={2} h="100%" alignItems="center" bgColor="tertiary.400">
          <Icon
            size="md"
            color="white"
            as={<MaterialIcons name="search" />}
            />
        </Box>
      }
      value={search}
      onChangeText={(text) => setSearch(text)}
    />
  )
}

function SearchBarSkeleton() {
  return (
    <Box
      variant="card"
      my={5}
      justifyContent="center"
      w="100%"
    >
      <Skeleton w="15%"/>
    </Box>
  )
}

export { SearchBarSkeleton }
export default SearchBar