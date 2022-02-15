import React from "react"
import ScreenView from "../components/ScreenView"
import { Text, Avatar, Heading, Box, Radio, HStack, VStack, Button, Icon } from "native-base"
import { useTranslation } from "react-i18next"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import Ionicons from "react-native-vector-icons/Ionicons"
import { TouchableOpacity } from "react-native"
import { useNavigation } from "@react-navigation/native"
import { StackNavProp } from "../navigation/types"

function Profile() {
  return (
    <VStack space={4} alignItems="center">
      <Avatar bgColor="transparent" size="2xl" source={require('../assets/logo.png')}>
        AREA
      </Avatar>
      <Heading>
        {/* TODO: remove mock */}
        julien.pause@epitech.eu
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

function Settings() {
  return (
    <ScreenView>
      <VStack w="100%" alignItems="center" space={4}>
        <Profile />
        <MyServices />
        <ChooseLanguage />
        <ChooseColorMode />
        <Button rounded='lg' size="lg" w="90%" bgColor="danger.600" onPress={() => console.log('heyy')}>
          Sign out
        </Button>
      </VStack>
    </ScreenView>
  )
}

export default Settings