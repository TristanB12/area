import React from "react"
import { TouchableOpacity } from "react-native"
import { Box, HStack, VStack, Image, Text, Skeleton } from "native-base"
import { useTranslation } from "react-i18next"
import { Service } from "../../types"
import api from "../../api";
import { signIn } from "../../utils"
import { useSetRecoilState } from "recoil"
import authAtom from "../../recoil/atoms/auth"

function AuthServiceCardSkeleton() {
  return (
    <Box variant="card" alignItems="center" p={4}>
      <HStack space={4} alignItems="center">
        <Skeleton size="10" rounded="full" />
        <Skeleton.Text lines={1} w="50%" />
      </HStack>
    </Box>
  )
}

function AuthServiceCard({ service, action } : { service: Service, action: 'login' | 'register' }) {
  const { t } = useTranslation('auth')
  const setAuth = useSetRecoilState(authAtom)

  const onSubmit = async (service: Service) => {
    const { data, error } = ((action === "login")
      ? await api.auth.login.service(service)
      : await api.auth.signup.service(service)
    )
    console.log(data)
    console.log(error)
    // TODO: implement error messages for services auth
    if (error || !data) {
      return
    }
    await signIn(data, setAuth)
  }

  return (
    <TouchableOpacity onPress={async () => await onSubmit(service)}>
      <Box variant="card" alignItems="center" p={4}>
        <HStack space={4} alignItems="center">
          <Image
            source={{ uri: service.logoUri }}
            size="6"
            resizeMode="contain"
            alt={service.name}
          />
          <Text textAlign="center" >
            { `${action === 'login' ? t('login_with') : t('register_with')} ${service.name}` }
          </Text>
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}

function AuthServicesSkeleton() {
  return (
    <VStack space={4}>
      <AuthServiceCardSkeleton />
      <AuthServiceCardSkeleton />
    </VStack>
  )
}

function AuthServices({ services, action } : { services: Service[], action: 'login' | 'register' }) {
  return (
    <VStack space={4}>
      {
        services.map(service =>
          <AuthServiceCard
            key={service.name}
            service={service}
            action={action}
          />
        )
      }
    </VStack>
  )
}

export { AuthServicesSkeleton }
export default AuthServices