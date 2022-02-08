import React, { useLayoutEffect, useCallback } from "react";
import { useRecoilState } from "recoil";
import { TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import { Icon, useLayout } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import areasAtom from "../recoil/atoms/areas";
import ScreenView from '../components/ScreenView'
import EditArea from "../components/EditArea";
import editedAreaAtom from "../recoil/atoms/editedArea";

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
  const [areas, setAreas] = useRecoilState(areasAtom)
  const [area, setArea] = useRecoilState(editedAreaAtom)
  const areaId = route.params?.areaId || area._id

  const onDelete = () => {
    setAreas(areas.filter(area => area._id !== areaId))
    navigation.goBack()
  }
  const onSave = () => {
    // TODO: call API to store area, and get generated ID
    const randomId = Math.floor(Math.random() * 100)
    setAreas([...areas.filter(area => area._id !== areaId),
      { ...area, _id: randomId }]
    )
    navigation.goBack()
  }

  useLayoutEffect(() => {
    const isNewArea = (areaId === undefined)

    navigation.setOptions({
      title: isNewArea ? "Create Area" : "Area",
      headerRight: isNewArea ? undefined : () =>
        <DeleteAreaButton onDelete={onDelete} />
    });
    setArea(areas.find(area => area._id === areaId) || {
      _id: 0,
      title: "",
      description: "",
      action: undefined,
      reaction: undefined
    })
  }, [navigation]);

  return (
    <ScreenView style={{ justifyContent: "space-between", paddingBottom: 40 }}>
      <EditArea
        area={area}
        setArea={setArea}
        onSave={onSave}
      />
    </ScreenView>
  )
}

export default EditAreaScreen