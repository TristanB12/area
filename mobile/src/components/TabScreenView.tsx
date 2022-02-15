import React from "react";
import { Fab, Icon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenView from "./ScreenView";
import { useNavigation } from "@react-navigation/native";
import { StackNavProp } from "../navigation/types";
import { useRecoilState } from "recoil";
import editedAreaAtom from "../recoil/atoms/editedArea";

function TabScreenView({ children } : { children: React.ReactNode }) {
  const navigation = useNavigation<StackNavProp>()
  const [editedArea, setEditedArea] = useRecoilState(editedAreaAtom)
  const goToEditArea = () => {
    setEditedArea({
      _id: 0,
      title: "",
      description: "",
      action: undefined,
      reaction: undefined
    })
    navigation.push('EditArea')
  }

  return (
    <ScreenView>
      {
        children
      }
      <Fab
        renderInPortal={false}
        shadow={2}
        size="sm"
        icon={<Icon color="white" as={<MaterialCommunityIcons name="plus" />} />}
        onPress={goToEditArea}
      />
    </ScreenView>
  )
}

export default TabScreenView