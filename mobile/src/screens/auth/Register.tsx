import React, { useState } from "react";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  HStack,
  Center,
  Icon,
  Divider,
  Image
} from "native-base";
import { useTranslation } from "react-i18next";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StackParamList } from "../../navigation/types";

function EmailInput() {
  const { t } = useTranslation('auth')

  return (
    <FormControl>
      <FormControl.Label>
        { t('email_address') }
      </FormControl.Label>
      <Input
        placeholder="example@gmail.com"
        borderRadius="9"
        borderColor="primary.500"
        fontSize="14"
        InputLeftElement={
          <Icon
            size="sm"
            color="primary.500"
            ml={4}
            as={<MaterialCommunityIcons name="email-outline" />}
          />
        }
        // onChangeText={onChangeText}
      />
    </FormControl>
  )
}

function PasswordInput() {
  const { t } = useTranslation('auth')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <FormControl>
      <FormControl.Label>
        { t('password') }
      </FormControl.Label>
      <Input
        type={showPassword ? "text" : "password"}
        placeholder={t('password')}
        borderRadius="9"
        borderColor="primary.500"
        fontSize="14"
        InputLeftElement={
          <Icon
            size="sm"
            color="primary.500"
            ml={4}
            as={<MaterialCommunityIcons name="lock" />}
          />
        }
        InputRightElement={
          <Icon
            size="sm"
            color="primary.500"
            mr={2}
            as={<MaterialIcons name={`visibility${showPassword ? "" : "-off"}`} />}
            onPress={() => setShowPassword(!showPassword)}
          />
        }
        // onChangeText={onChangeText}
      />
    </FormControl>
  )
}

function EmailPasswordRegister() {
  return (
    <VStack space={4} >
      <EmailInput />
      <PasswordInput />
      <PasswordInput />
    </VStack>
  )
}

function SocialRegisterService({ service } : { service: { name: string, logoUri: string }}) {
  const { t } = useTranslation('auth')

  return (
    <Box variant="card" alignItems="center" p={4}>
      <HStack space={4} alignItems="center">
        <Image
          source={{ uri: service.logoUri }}
          size="6"
          resizeMode="contain"
          alt={service.name}
        />
        <Text textAlign="center" >
          { `${t('register_with')} ${service.name}` }
        </Text>
      </HStack>
    </Box>
  )
}

function SocialRegister() {
  const socialRegisterServices = [
    {
      name: "Google",
      logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"
    },
    {
      name: "Office",
      logoUri: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Microsoft_Office_logo_%282019%E2%80%93present%29.svg/1200px-Microsoft_Office_logo_%282019%E2%80%93present%29.svg.png"
    },
  ]

  return (
    <VStack space={4}>
      {
        socialRegisterServices.map(service =>
          <SocialRegisterService key={service.name} service={service} />
        )
      }
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
        <SocialRegister />
        <Divider />
        <EmailPasswordRegister />
        <Button mt="2" >
          { t('register') }
        </Button>
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