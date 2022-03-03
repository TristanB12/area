import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { Button, Center, Heading, HStack, Icon, Text, VStack } from "native-base"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import { APIError } from "../api"

type ErrorFetchingProps = {
  title: string,
  error: APIError | null | undefined,
  refetch: Function
}

function ErrorFetching({ title, error, refetch } : ErrorFetchingProps) {
  const { t } = useTranslation('common')
  const [isLoading, setIsLoading] = useState(false)

  const retryFetch = () => {
    setIsLoading(true)
    refetch()
    setIsLoading(false)
  }

  return (
    <Center flex={1}>
      <VStack space={8} alignItems="center">
        <HStack w="80%" space={4} alignItems="center">
          <Heading textAlign="center" size="md" color="danger.400">
            { title }
          </Heading>
          <Icon
            size="lg"
            color="primary.400"
            as={<MaterialIcons name="error-outline" />}
          />
        </HStack>
        {
          error &&
          <>
            <Text fontSize="xl" color="red.600">
              { error.status }
            </Text>
            <Text fontSize="lg" textAlign="center">
              { error.message }
            </Text>
          </>
        }
        <Button isLoading={isLoading} size="lg" shadow={6} onPress={retryFetch}>
          { t('retry', { ns: 'common' }) }
        </Button>
      </VStack>
    </Center>
  )
}

export default ErrorFetching