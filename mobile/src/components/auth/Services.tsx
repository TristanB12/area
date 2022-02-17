import React from "react"
import { TouchableOpacity } from "react-native"
import { AuthConfiguration, authorize } from 'react-native-app-auth';
import { Box, HStack, VStack, Image, Text } from "native-base"
import { useTranslation } from "react-i18next"
import { AuthService } from "../../types"

function AuthServiceCard({ service, action } : { service: AuthService, action: 'login' | 'register' }) {
  const { t } = useTranslation('auth')

  const onSubmit = async (service: AuthService) => {
    const config: AuthConfiguration = {
      issuer: 'https://accounts.google.com',
      clientId: '641786881554-8eved1hh8uchoet6c6j8rerq08qfrb0g.apps.googleusercontent.com',
      redirectUrl: 'area:/google',
      scopes: ['email', 'profile'],
      skipCodeExchange: true
    };

    try {
      const result = await authorize(config)
      console.log(result)
    } catch (error) {
      console.log(error);
    }
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