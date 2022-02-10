import React from "react"
import { FormControl, Icon, Input } from "native-base"
import { useTranslation } from "react-i18next"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"

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

export default EmailInput