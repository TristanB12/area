import React from "react";
import {
  Text,
  Heading,
  VStack,
  Button,
  Center,
  Divider
} from "native-base";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import { useTranslation } from "react-i18next";
import EmailInput from "../../components/inputs/Email";
import PasswordInput from "../../components/inputs/Password";
import AuthServices from "../../components/AuthServices";
import authServicesMock from "../../mock/authServices";

function EmailPasswordRegister() {
  const { t } = useTranslation('auth')

  return (
    <VStack space={4} >
      <EmailInput />
      <PasswordInput />
      <PasswordInput />
      <Button mt="2" shadow={6} >
        { t('register') }
      </Button>
    </VStack>
  )
}

type RegisterScreenProps = NativeStackScreenProps<StackParamList, 'Register'>

function Register({ navigation } : RegisterScreenProps) {
  const { t } = useTranslation('auth')
  const goToLogin = () => navigation.navigate('Login')

  return (
    <Center w="100%" flex={1} >
      <VStack safeArea space={8} p="2" w="80%"  py="8">
        <Heading size="lg" color="primary.400">
          { t('register').charAt(0) }
          <Heading size="lg">
            { t('register').slice(1) }
          </Heading>
        </Heading>
        <AuthServices services={authServicesMock} action='register' />
        <Divider />
        <EmailPasswordRegister />
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