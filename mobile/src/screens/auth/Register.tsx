import React from "react";
import {
  Text,
  Heading,
  VStack,
  Center,
  Divider,
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import { useTranslation } from "react-i18next";
import AuthEmailPassword from "../../components/auth/EmailPassword";
import AuthServices from "../../components/auth/Services";
import authServicesMock from "../../mock/authServices";

type RegisterScreenProps = NativeStackScreenProps<StackParamList, 'Register'>

function Register({ navigation } : RegisterScreenProps) {
  const { t } = useTranslation('auth')
  const goToLogin = () => navigation.navigate('Login')

  return (
    <Center w="100%" flex={1}>
      <VStack safeArea space={6}  w="80%" px="2" py="8">
        <Heading size="lg" color="primary.400">
          { t('register').charAt(0) }
          <Heading size="lg">
            { t('register').slice(1) }
          </Heading>
        </Heading>
        <AuthServices services={authServicesMock} action='register' />
        <Divider />
        <AuthEmailPassword action="register" />
        <Text textAlign="center">
          { t('already_an_account') + ' ' }
          <Text color="tertiary.400" bold underline onPress={goToLogin}>
            { t('login') }
          </Text>
        </Text>
      </VStack>
    </Center>
  )
}

export default Register