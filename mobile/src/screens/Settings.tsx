import React from "react"
import ScreenView from "../components/ScreenView"
import { Text, Avatar, Heading, Box, Radio, HStack, VStack } from "native-base"
import { useTranslation } from "react-i18next"

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

// language === "en" || "fr" || "es" ...
function RadioFlag({ language } : { language: string }) {
  const { t } = useTranslation('settings')

  return (
    <VStack bgColor="green" justifyContent="center" alignItems="center">
      <Heading size="2xl">
        { language === "en" ? `🇺🇸` : `🇫🇷` }
      </Heading>
      <Radio value={language} size="md" color="primary.500">
        { language === "en" ? t('english') : t('french') }
      </Radio>
    </VStack>
  )
}

function Settings() {
  return (
    <ScreenView>
      <Avatar bgColor="transparent" size="2xl" source={require('../assets/logo.png')}>
        AR
      </Avatar>
      <Heading>
        {/* TODO: remove mock */}
        julien.pause@epitech.eu
      </Heading>
      <Text>
        My services (unlink services)
      </Text>
      <ChooseLanguage />
      <Text>
        Switch from light to dark
      </Text>
      <Text>
        Sign out
      </Text>
    </ScreenView>
  )
}

export default Settings