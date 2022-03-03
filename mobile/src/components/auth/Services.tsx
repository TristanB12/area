import React from "react"
import { TouchableOpacity } from "react-native"
import { Box, HStack, VStack, Image, Text } from "native-base"
import { useTranslation } from "react-i18next"
import { AuthService } from "../../types"
import api from "../../api";

function AuthServiceCard({ service, action } : { service: AuthService, action: 'login' | 'register' }) {
  const { t } = useTranslation('auth')

  const onSubmit = async (service: AuthService) => {
    const { data, error } = ((action === "login")
      ? await api.auth.login.service(service)
      : await api.auth.signup.service(service)
    )
    console.log(data)
    console.log(error)
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

function AuthServices({ services, action } : { services: AuthService[], action: 'login' | 'register' }) {
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

export default AuthServices