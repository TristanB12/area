import React, { useLayoutEffect } from "react";
import { View, TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import { Card, Image, Text, Icon, useTheme, Button, Input } from "react-native-elements";
import Area, { ServiceAction } from "../types";
import { useRecoilValue } from "recoil";
import areasAtom from "../recoil/atoms/areas";
import ScreenView from '../components/ScreenView'

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>

type RightHeaderButtonsProps = {
  navigation: EditAreaScreenProps['navigation']
}

function RightHeaderButtons({ navigation} : RightHeaderButtonsProps) {
  const { theme } = useTheme()

  const confirmDeletion = () =>
    Alert.alert(
      "Supprimer l'AREA",
      "Souhaitez-vous vraiment supprimer l'AREA ?",
      [
        {
          text: "OUI",
          onPress: () => {
            navigation.goBack()
          }
        },
        {
          text: "NON"
        },
      ]
  );

  return (
    <TouchableOpacity onPress={confirmDeletion}>
      <Icon
        name='delete'
        type='materialIcons'
        size={32}
        color={theme.colors?.primary}
      />
    </TouchableOpacity>
  )
}

function ServiceCard({ action } : { action: ServiceAction }) {
  return (
    <Card containerStyle={{ width: "100%" }}>
      <View style={{ flexDirection: "row", alignItems: 'center' }}>
        <Image
          source={{ uri: action.logoUri }}
          containerStyle={{ width: 32, height: 32, marginRight: 10 }}
          resizeMode="contain"
        />
        <Text h2 style={{ flex: 1, textAlign: 'center' }}>
          { action.title }
        </Text>
      </View>
    </Card>
  )
}

function EditAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const { areaId } = route.params
  const areas = useRecoilValue(areasAtom)
  const area = areas.find(area => area._id === areaId)
  const { theme } = useTheme()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightHeaderButtons navigation={navigation} />
    });
  }, [navigation]);

  if (area === undefined) {
    return null
  }
  return (
    <ScreenView>
      <Input
        label="Area name"
        labelStyle={{ fontFamily: "NotoSans-Bold", fontSize: 25, color: theme.colors?.secondary }}
        placeholder='Your area name'
        placeholderTextColor='#6F6F6F'
        inputContainerStyle={{ backgroundColor: "#F4F4F4", borderRadius: 6, borderBottomWidth: 0, paddingLeft: 10 }}
        containerStyle={{ height: 80 }}
      />
      <Input
        label="Description (optional)"
        labelStyle={{ fontFamily: "NotoSans-Bold", fontSize: 25, color: theme.colors?.secondary }}
        multiline
        placeholder='Your area description'
        placeholderTextColor='#6F6F6F'
        inputContainerStyle={{ backgroundColor: "#F4F4F4", borderRadius: 6, borderBottomWidth: 0, paddingLeft: 10 }}
        containerStyle={{ height: 80 }}
      />
      <ServiceCard action={area.action} />
      <ServiceCard action={area.reaction} />
      <Button
        title="Save"
        containerStyle={{ width: "80%" }}
        icon={{
          name: 'save',
          type: 'material-icons',
          size: 24,
          color: 'white',
        }}
        titleStyle={{
          fontSize: 20
        }}
        onPress={() => navigation.goBack()}
      />
    </ScreenView>
  )
}

export default EditAreaScreen