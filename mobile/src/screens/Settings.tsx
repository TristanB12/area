import React from "react"
import ScreenView from "../components/ScreenView"
import { Avatar, Heading, Box, Radio, HStack, VStack, Button, Icon } from "native-base"
import { useTranslation } from "react-i18next"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavProp } from "../navigation/types"
import authAtom from "../recoil/atoms/auth"
import { useRecoilValue, useSetRecoilState } from "recoil"
import EncryptedStorage from 'react-native-encrypted-storage'

function Profile() {
  const auth = useRecoilValue(authAtom)

  return (
    <VStack space={4} alignItems="center">
      <Avatar bgColor="primary.400" size="2xl" _text={{ color: "white" }}>
        { auth.email.substring(0, 2).toUpperCase() }
      </Avatar>
      <Heading>
        { auth.email }
      </Heading>
    </VStack>
  )
}

// language === "en" || "fr" || "es" ...
function RadioFlag({ language } : { language: string }) {
  const { t } = useTranslation('settings')

  return (
    <VStack justifyContent="center" alignItems="center">
      <Heading size="2xl">
        { language === "en" ? `🇺🇸` : `🇫🇷` }
      </Heading>
      <Radio value={language} size="md" color="primary.500">
        { language === "en" ? t('english') : t('french') }
      </Radio>
    </VStack>
  )
}

function ChooseLanguage() {
  const { t, i18n } = useTranslation('settings')

  const setLanguage = async (language: string) => {
    return await i18n.changeLanguage(language);
  };

  return (
    <Box variant="card" w="100%" p={4} alignItems="center">
      <Heading>
        { t('choose_language') }
      </Heading>
      <Radio.Group
        name="language"
        accessibilityLabel="Language"
        value={i18n.language}
        onChange={setLanguage}
      >
        <HStack w="100%" space={12} alignItems="center" p={4}>
          <RadioFlag language="en" />
          <RadioFlag language="fr" />
        </HStack>
      </Radio.Group>
    </Box>
  )
}

function RadioColorMode({ colorMode } : { colorMode: 'light' | 'dark' }) {
  const { t } = useTranslation('settings')

  return (
    <VStack bgColor="green" justifyContent="center" alignItems="center">
      <Icon
        as={<Ionicons name={colorMode === 'light' ? 'sunny-sharp' : 'moon-sharp'} />}
        color={colorMode === 'light' ? 'primary.500' : 'black'}
      />
      <Radio value={colorMode} size="md" color="primary.500">
        { t(colorMode) }
      </Radio>
    </VStack>
  )
}

function ChooseColorMode() {
  const { t, i18n } = useTranslation('settings')

  const setLanguage = async (language: string) => {
    return await i18n.changeLanguage(language);
  };

  return (
    <Box variant="card" w="100%" p={4} alignItems="center">
      <Heading>
        { t('choose_color_mode') }
      </Heading>
      <Radio.Group
        name="colorMode"
        accessibilityLabel="Color mode"
        value='light'
      >
        <HStack w="100%" space={12} alignItems="center" p={4}>
          <RadioColorMode colorMode="light" />
          <RadioColorMode colorMode="dark" />
        </HStack>
      </Radio.Group>
    </Box>
  )
}

function MyServices() {
  const { t } = useTranslation('services')
  const navigation = useNavigation<StackNavProp>()
  const goToMyServices = () => navigation.push('MyServices')

  return (
    <TouchableOpacity style={{ width: "100%" }} onPress={goToMyServices}>
      <Box variant="card" p={4} alignItems="center">
        <HStack w="100%" justifyContent="space-between" alignItems="center">
          <Heading>
            { t('my_services') }
          </Heading>
          <Icon as={<MaterialIcons name="navigate-next" />} color="black" />
        </HStack>
      </Box>
    </TouchableOpacity>
  )
}

function Logout() {
  const { t } = useTranslation('settings')
  const setAuth = useSetRecoilState(authAtom)
  const logout = async () => {
    try {
      await EncryptedStorage.removeItem("user_session")
    } catch (error) {
      console.error(error)
    }
    setAuth(auth => ({
      ...auth,
      isSignout: true,
      email: "",
      access_token: "",
      refresh_token: ""
    }))
  }

  return (
    <Button rounded='lg' size="lg" w="90%" bgColor="danger.600" onPress={logout}>
      { t('logout') }
    </Button>
  )
}

function Settings() {
  return (
    <ScreenView>
      <VStack w="100%" alignItems="center" space={6}>
        <Profile />
        <MyServices />
        <ChooseLanguage />
        <ChooseColorMode />
        <Logout />
      </VStack>
    </ScreenView>
  )
}

export default Settings