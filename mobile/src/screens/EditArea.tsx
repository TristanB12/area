import React, { useLayoutEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import { Icon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import areasAtom from "../recoil/atoms/areas";
import ScreenView from '../components/ScreenView'
import EditArea from "../components/EditArea";

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>

type RightHeaderButtonsProps = {
  navigation: EditAreaScreenProps['navigation']
}

function RightHeaderButtons({ navigation} : RightHeaderButtonsProps) {
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
      <Icon as={MaterialCommunityIcons} name="delete" color="primary.500" />
    </TouchableOpacity>
  )
}

function EditAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const { areaId } = route.params
  const areas = useRecoilValue(areasAtom)
  const [area, setArea] = useState(areas.find(area => area._id === areaId))

  if (area === undefined) {
    return null
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <RightHeaderButtons navigation={navigation} />
    });
  }, [navigation]);

  return (
    <ScreenView style={{ justifyContent: "space-between", paddingBottom: 40 }}>
      <EditArea
        area={area}
        setArea={setArea}
        onSave={() => navigation.goBack()}
      />
    </ScreenView>
  )
}

export default EditAreaScreen