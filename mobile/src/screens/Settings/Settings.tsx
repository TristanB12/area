import React from "react"
import ScreenView from "../../components/ScreenView"
import { Avatar, Heading, Box, Radio, HStack, VStack, Button, Icon, useColorMode, Image, Skeleton } from "native-base"
import { useTranslation } from "react-i18next"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavProp } from "../../navigation/types"
import { useSetRecoilState } from "recoil"
import authAtom from "../../recoil/atoms/auth"
import EncryptedStorage from 'react-native-encrypted-storage'
import frenchFlag from '../../assets/french_flag_icon.png'
import englishFlag from '../../assets/english_flag_icon.png'
import useProfile from "../../hooks/useProfile"

function Profile() {
  const { data } = useProfile()
  const profile = data?.data

  return (
    <VStack space={4} alignItems="center">
      <Avatar bgColor="primary.400" size="2xl" _text={{ color: "white" }}>
        { profile?.email.substring(0, 2).toUpperCase() || "AR" }
      </Avatar>
      <Heading>
        { profile?.email || "email" }
      </Heading>
    </VStack>
  )
}

function ProfileSkeleton() {
  return (
    <VStack w="100%" space={4} alignItems="center" >
      <Skeleton size="40" rounded="full" />
      <Skeleton.Text lines={1} w="50%" />
    </VStack>
  )
}

// language === "en" || "fr" || "es" ...
function RadioFlag({ language } : { language: string }) {
  const { t } = useTranslation('settings')

  return (
    <VStack justifyContent="center" alignItems="center">
      <Image
        source={language === "en" ? englishFlag : frenchFlag}
        size="sm"
        borderRadius="sm"
        resizeMode="contain"
        alt={language === "en" ? t('english') : t('french')}
      />
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
  const { t } = useTranslation('settings')
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box variant="card" w="100%" p={4} alignItems="center">
      <Heading>
        { t('choose_color_mode') }
      </Heading>
      <Radio.Group
        name="colorMode"
        accessibilityLabel="Color mode"
        value={colorMode || "light"}
        onChange={toggleColorMode}
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
      isSignedIn: false
    }))
  }

  return (
    <Button rounded='lg' size="lg" w="90%" bgColor="danger.600" onPress={logout}>
      { t('logout') }
    </Button>
  )
}

function Settings() {
  const { isLoading } = useProfile()

  return (
    <ScreenView>
      <VStack w="100%" alignItems="center" space={6}>
        {
          isLoading ? <ProfileSkeleton /> : <Profile />
        }
        <MyServices />
        <ChooseLanguage />
        <ChooseColorMode />
        <Logout />
      </VStack>
    </ScreenView>
  )
}

export default Settings