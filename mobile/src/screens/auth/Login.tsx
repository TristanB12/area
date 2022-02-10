import React from "react";
import {
  Text,
  Heading,
  VStack,
  Center,
  Divider
} from "native-base";
import { useTranslation } from "react-i18next";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";
import AuthServices from "../../components/auth/Services";
import AuthEmailPassword from "../../components/auth/EmailPassword";
import authServicesMock from "../../mock/authServices";

type LoginScreenProps = NativeStackScreenProps<StackParamList, 'Login'>

function Login({ navigation } : LoginScreenProps) {
  const { t } = useTranslation('auth')
  const goToRegister = () => navigation.navigate('Register')

  return (
    <Center w="100%" flex={1} >
      <VStack safeArea space={8} p="2" w="80%"  py="8">
        <Heading size="lg" color="primary.400">
          { t('login').charAt(0) }
          <Heading size="lg">
            { t('login').slice(1) }
          </Heading>
        </Heading>
        <AuthServices services={authServicesMock} action="login"/>
        <Divider />
        <AuthEmailPassword action="login" />
        <Text textAlign="center">
          { t('no_account_yet') + ' ' }
          <Text color="tertiary.400" bold underline onPress={goToRegister}>
            { t('register') }
          </Text>
        </Text>
      </VStack>
    </Center>
  )
}

export default Login