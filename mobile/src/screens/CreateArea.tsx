import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import { TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../navigation/types";
import areasAtom from "../recoil/atoms/areas";
import Area from "../types";
import ScreenView from '../components/ScreenView'
import EditArea from "../components/EditArea";

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>

function CreateAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const [area, setArea] = useState<Area>({
    _id: 0,
    title: "",
    description: "",
    action: undefined,
    reaction: undefined
  })

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

export default CreateAreaScreen