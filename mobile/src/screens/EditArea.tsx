import React, { useLayoutEffect, useState } from "react";
import { useRecoilState } from "recoil";
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

function DeleteAreaButton({ onDelete } : { onDelete: () => void }) {
  const confirmDeletion = () =>
    Alert.alert(
      "Supprimer l'AREA",
      "Souhaitez-vous vraiment supprimer l'AREA ?",
      [
        {
          text: "OUI",
          onPress: onDelete
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

// Used for editing areas and creating new ones
function EditAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const areaId = route.params?.areaId
  const [areas, setAreas] = useRecoilState(areasAtom)
  const [area, setArea] = useState(areas.find(area => area._id === areaId) || {
    _id: 0,
    title: "",
    description: "",
    action: undefined,
    reaction: undefined
  })
  const isNewArea = (area._id === 0)
  const onDelete = () => {
    setAreas(areas.filter(area => area._id !== areaId))
    navigation.goBack()
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isNewArea ? "Create Area" : "Area",
      headerRight: isNewArea ? undefined : () =>
        <DeleteAreaButton onDelete={onDelete} />
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