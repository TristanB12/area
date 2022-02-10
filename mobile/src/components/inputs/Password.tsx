import React, { useState } from "react"
import { useTranslation } from "react-i18next"
import { FormControl, Icon, Input } from "native-base"
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"

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

export default PasswordInput