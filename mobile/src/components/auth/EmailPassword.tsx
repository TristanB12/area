import React, { useRef, useState } from "react";
import {
  VStack,
  Button,
  FormControl,
  Input,
  Icon
} from "native-base";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from 'react-hook-form';
import api from '../../api'
import { AuthForm } from "../../api/auth";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useSetRecoilState } from "recoil";
import authAtom from "../../recoil/atoms/auth";
import { storeUserSessionToStorage } from '../../storage'
import { signIn } from "../../utils";

function AuthEmailPassword({ action } : { action: "login" | "register" }) {
  const { t } = useTranslation('auth')
  const { control, handleSubmit, watch, setError, setValue, formState: { errors } } = useForm<AuthForm>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: ""
    }
  });
  const setAuth = useSetRecoilState(authAtom)
  const [isLoading, setIsLoading] = useState(false)
  const password = useRef({})
  password.current = watch("password")
  const [showPassword, setShowPassword] = useState(false)
  const shouldConfirmPassword = (action === "register")

  const onSubmit = async (authForm: AuthForm) => {
    setIsLoading(true)
    const { data, error } = ((action === "login")
      ? await api.auth.login.email(authForm)
      : await api.auth.signup.email(authForm)
    )
    setIsLoading(false)
    if (error) {
      if (error.status === 400) {
        setError("password", { type: "validate", message: error.message })
      } else if (error.status === 409) {
        setError("email", { type: "validate", message: error.message })
      }
      return
    } else if (!data) {
      return
    }
    await signIn(data, setAuth)
  }

  return (
    <VStack space={4} >
      <FormControl isRequired isInvalid={'email' in errors}>
        <FormControl.Label>
          { t('email_address') }
        </FormControl.Label>
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, value }}) => (
            <Input
              type="text"
              placeholder="example@gmail.com"
              autoCapitalize="none"
              borderRadius="9"
              borderColor="primary.500"
              fontSize="14"
              onBlur={() => setValue('email', value.trim())}
              onChangeText={onChange}
              value={value}
              InputLeftElement={
                <Icon
                  size="sm"
                  color="primary.500"
                  ml={4}
                  as={<MaterialCommunityIcons name="email-outline" />}
                />
              }
            />
          )}
          rules={{
            required: {
              value: true,
              message: t('email_is_required')
            },
            pattern: {
              value: /^\S+@\S+$/i,
              message: t('email_is_invalid')
            },
          }}
        />
        <FormControl.ErrorMessage>
          { errors.email && errors.email.message }
        </FormControl.ErrorMessage>
      </FormControl>
      <FormControl isRequired isInvalid={'password' in errors}>
        <FormControl.Label>
          { t('password') }
        </FormControl.Label>
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, value }}) => (
            <Input
              type={showPassword ? "text" : "password"}
              onBlur={() => setValue('password', value.trim())}
              onChangeText={onChange}
              value={value}
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
            />
          )}
          rules={{
            required: {
              value: true,
              message: t('password_is_required')
            },
            minLength: {
              value: 8,
              message: t('password_too_short')
            },
            maxLength: {
              value: 42,
              message: t('password_too_long'),
            },
            validate: {
              containsSpecialChar: (value) => {
                const format = /[ `!@#$%^&*()_+\-=!\[\]{};':"\\|,.<>\/?~]/;
                const errMessage = t('password_must_contain_special_char')

                return format.test(value) || errMessage
              },
              containsNumber: (value) => {
                const errMessage = t('password_must_contain_number')

                return /\d/.test(value) || errMessage;
              }
            }
          }}
        />
        <FormControl.ErrorMessage>
          { errors.password && errors.password.message }
        </FormControl.ErrorMessage>
      </FormControl>
      {
        shouldConfirmPassword &&
        <FormControl isRequired isInvalid={'confirmPassword' in errors}>
          <FormControl.Label>
            { t('confirm_password') }
          </FormControl.Label>
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, value }}) => (
              <Input
                type={showPassword ? "text" : "password"}
                onBlur={() => setValue('confirmPassword', value.trim())}
                onChangeText={onChange}
                value={value}
                placeholder={t('confirm_password')}
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
              />
            )}
            rules={{
              required: {
                value: true,
                message: t('confirm_password_is_required')
              },
              minLength: {
                value: 8,
                message: t('password_too_short')
              },
              maxLength: {
                value: 42,
                message: t('password_too_long'),
              },
              validate: {
                containsSpecialChar: (value) => {
                  const format = /[ `!@#$%^&*()_+\-=!\[\]{};':"\\|,.<>\/?~]/;
                  const errMessage = t('password_must_contain_special_char')

                  return format.test(value) || errMessage
                },
                containsNumber: (value) => {
                  const errMessage = t('password_must_contain_number')

                  return /\d/.test(value) || errMessage;
                },
                passwordsMatch: value => value === password.current || t('passwords_dont_match')
              }
            }}
            defaultValue=""
          />
          <FormControl.ErrorMessage>
            { errors.confirmPassword && errors.confirmPassword.message }
          </FormControl.ErrorMessage>
        </FormControl>
      }
      <Button
        isLoading={isLoading}
        isLoadingText={t('login_in')}
        disabled={isLoading}
        onPress={handleSubmit(onSubmit)}
        mt="2"
        shadow={6}
      >
        { t(action) }
      </Button>
    </VStack>
  )
}

export default AuthEmailPassword