import React from "react";
import { ImageSourcePropType, TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VStack, Heading, Image, Text, StatusBar, Box, Button, HStack, Circle } from "native-base";
import AppIntroSlider from "react-native-app-intro-slider";
import { useTranslation } from "react-i18next";
import { useSetRecoilState } from "recoil";
import authAtom from "../recoil/atoms/auth";

type Slide = {
  titleKey: string,
  textKey: string,
  image: ImageSourcePropType
}

const slides: Slide[] = [
  {
    titleKey: "link_your_apps",
    textKey: "link_your_apps_text",
    image: require('../assets/app_intro_1.png'),
  },
  {
    titleKey: "create_workflows",
    textKey: "create_workflows_text",
    image: require('../assets/app_intro_2.png'),
  },
  {
    titleKey: "automate_your_needs",
    textKey: "automate_your_needs_text",
    image: require('../assets/app_intro_3.png'),
  },
];

function SlideItem({ slide } : { slide: Slide }) {
  const { t } = useTranslation('intro')

  return (
    <VStack mb={20} flex={1} space={6} justifyContent="center" alignItems="center" >
      <Heading size="3xl" color="primary.400">
        A
        <Heading size="3xl" color="black">
          REA
        </Heading>
      </Heading>
      <Image
        source={slide.image}
        alt="Slide illustration"
        width="320"
        height="260"
        resizeMode="contain"
      />
      <Heading textAlign="center">
        { t(slide.titleKey) }
      </Heading>
      <Text maxWidth="80%" fontSize="lg" textAlign="center">
        { t(slide.textKey) }
      </Text>
    </VStack>
  )
}

let slider: AppIntroSlider | undefined;

function Pagination({ activeIndex } : { activeIndex: number }) {
  const { t } = useTranslation('auth')
  const setAuth = useSetRecoilState(authAtom)
  const goToAuth = async () => {
    await AsyncStorage.setItem("intro_passed", "yes")
    setAuth(auth => ({
      ...auth,
      isFirstTimeUsingApp: false
    }))
  }

  return (
    <VStack
      safeArea
      position="absolute"
      bottom="16"
      left="16"
      right="16"
      flex={1}
      space={8}
      alignItems="center"
    >
      <HStack space={5}>
        {
          slides.length > 1 &&
          slides.map((_, i) =>
            <TouchableOpacity key={i} onPress={() => slider?.goToSlide(i, true)}>
              <Circle
                w="5"
                h="5"
                backgroundColor={i === activeIndex ? "primary.400" : "black"}
              />
            </TouchableOpacity>
          )
        }
      </HStack>
      <Button w="100%" shadow={6} onPress={async () => await goToAuth()}>
        { t('register') }
      </Button>
    </VStack>
  )
}

function AppIntroScreen() {
  const onDone = () => {
    console.log("done !")
  }

  return (
    <Box flex={1}  >
      <StatusBar translucent backgroundColor="transparent"/>
      <AppIntroSlider
        keyExtractor={item => item.titleKey}
        renderItem={item => <SlideItem slide={item.item}/>}
        renderPagination={(activeIndex) => <Pagination activeIndex={activeIndex} />}
        data={slides}
        onDone={onDone}
        ref={(ref) => (slider = ref!)}
      />
    </Box>
  )
}

export default AppIntroScreen