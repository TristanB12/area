import React from "react";
import {
  Text,
  Heading,
  VStack,
  Center,
  Divider
} from "native-base";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../../navigation/types";
import AuthServices from "../../components/auth/Services";
import AuthEmailPassword from "../../components/auth/EmailPassword";
import authServicesMock from "../../mock/authServices";

function AuthScreen({ action } : { action: 'login' | 'register' }) {
  const { t } = useTranslation('auth')
  const navigation = useNavigation<StackNavProp>()
  const goToOtherAction = () => navigation.navigate(action === 'login' ? 'Register' : 'Login')

  return (
    <Center w="100%" flex={1} >
      <VStack safeArea space={6} w="80%" px={2} py={8}>
        <Heading size="lg" color="primary.400">
          { t(action).charAt(0) }
          <Heading size="lg">
            { t(action).slice(1) }
          </Heading>
        </Heading>
        <AuthServices services={authServicesMock} action={action}/>
        <Divider />
        <AuthEmailPassword action={action} />
        <Text textAlign="center">
          { t(action === 'login' ? 'no_account_yet' : 'already_an_account') + ' ' }
          <Text color="tertiary.400" bold underline onPress={goToOtherAction}>
            { t(action === 'login' ? 'register' : 'login') }
          </Text>
        </Text>
      </VStack>
    </Center>
  )
}

export default AuthScreen