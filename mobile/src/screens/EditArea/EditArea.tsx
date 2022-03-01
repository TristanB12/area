import React, { useLayoutEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackParamList, TabParamList } from "../../navigation/types";
import { AlertDialog, Button, Icon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import areasAtom from "../../recoil/atoms/areas";
import ScreenView from '../../components/ScreenView'
import EditArea from "../../components/EditArea";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import { useTranslation } from "react-i18next";

type EditAreaScreenProps = CompositeScreenProps<
  NativeStackScreenProps<StackParamList, 'EditArea'>,
  BottomTabScreenProps<TabParamList>
>


function DeleteAreaButton({ setIsDeleteDialogOpen } : { setIsDeleteDialogOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  const toggleDeleteDialog = () => setIsDeleteDialogOpen(isOpen => !isOpen)

  return (
    <TouchableOpacity onPress={toggleDeleteDialog}>
      <Icon as={MaterialCommunityIcons} name="delete" color="primary.500" />
    </TouchableOpacity>
  )
}

function DeleteAreaDialog({ isOpen, setIsOpen, onDelete } : { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, onDelete: () => void}) {
  const cancelRef = useRef(null);
  const { t } = useTranslation(['areas', 'common'])
  const onClose = () => setIsOpen(!isOpen)

  return (
    <AlertDialog leastDestructiveRef={cancelRef} isOpen={isOpen} onClose={onClose}>
      <AlertDialog.Content>
        <AlertDialog.CloseButton />
        <AlertDialog.Header>
          { t('delete.title') }
        </AlertDialog.Header>
        <AlertDialog.Body>
          { t('delete.message') }
        </AlertDialog.Body>
        <AlertDialog.Footer>
          <Button.Group space={2}>
            <Button variant="unstyled" colorScheme="coolGray" onPress={onClose} ref={cancelRef}>
              { t('cancel', { ns: "common" })}
            </Button>
            <Button colorScheme="danger" onPress={onDelete}>
              { t('delete', { ns: "common" })}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

// Used for editing areas and creating new ones
function EditAreaScreen({ route, navigation }: EditAreaScreenProps) {
  const { t } = useTranslation('navigation')
  const [areas, setAreas] = useRecoilState(areasAtom)
  const [editedArea, setEditedArea] = useRecoilState(editedAreaAtom)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  const onDelete = () => {
    setAreas(areas.filter(area => area.id !== editedArea.id))
    navigation.goBack()
  }
  const onSave = () => {
    // TODO: call API to store area, and get generated ID
    const randomId = Math.floor(Math.random() * 100)
    setAreas([...areas.filter(area => area.id !== editedArea.id),
      { ...editedArea, id: randomId }]
    )
    navigation.goBack()
  }

  useLayoutEffect(() => {
    const isNewArea = (editedArea.id === 0)

    navigation.setOptions({
      title: isNewArea ? t('create_area') : t('area'),
      headerRight: isNewArea ? undefined : () =>
        <DeleteAreaButton setIsDeleteDialogOpen={setIsDeleteDialogOpen} />
    });
  }, [navigation, editedArea]);

  return (
    <ScreenView style={{ justifyContent: "space-between", paddingBottom: 40 }}>
      <EditArea
        area={editedArea}
        setArea={setEditedArea}
        onSave={onSave}
      />
      <DeleteAreaDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
        onDelete={onDelete}
      />
    </ScreenView>
  )
}

export default EditAreaScreen