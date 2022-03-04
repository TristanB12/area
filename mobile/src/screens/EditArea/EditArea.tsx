import React, { useLayoutEffect, useRef, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { TouchableOpacity, Alert } from "react-native";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackNavProp, StackParamList, TabParamList } from "../../navigation/types";
import { AlertDialog, Button, Icon } from "native-base"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScreenView from '../../components/ScreenView'
import EditArea from "../../components/EditArea";
import editedAreaAtom from "../../recoil/atoms/editedArea";
import { useTranslation } from "react-i18next";
import { useQueryClient } from "react-query";
import useAreaMutation from "../../hooks/useAreaMutation";

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

function DeleteAreaDialog({ isOpen, setIsOpen } : { isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
  const cancelRef = useRef(null);
  const { t } = useTranslation(['areas', 'common'])
  const navigation = useNavigation<StackNavProp>()
  const editedArea = useRecoilValue(editedAreaAtom)
  const queryClient = useQueryClient()
  const deleteAreaMutation = useAreaMutation('delete', queryClient)
  const [isDeleting, setIsDeleting] = useState(false)

  const onClose = () => setIsOpen(!isOpen)

  const onDelete = async () => {
    setIsDeleting(true)
    const { error } = await deleteAreaMutation.mutateAsync(editedArea)
    setIsDeleting(false)
    if (!error) {
      navigation.goBack()
    }
  }

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
            <Button
              colorScheme="danger"
              isLoading={isDeleting}
              onPress={onDelete}
            >
              { t('delete', { ns: "common" })}
            </Button>
          </Button.Group>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog>
  )
}

// Used for editing areas and creating new ones
function EditAreaScreen({ navigation }: EditAreaScreenProps) {
  const { t } = useTranslation('navigation')
  const [editedArea, setEditedArea] = useRecoilState(editedAreaAtom)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const queryClient = useQueryClient()
  const createAreaMutation = useAreaMutation('create', queryClient)
  const editAreaMutation = useAreaMutation('edit', queryClient)

  const canSave = (
    editedArea.title.length > 0
    && editedArea.action !== undefined
    && editedArea.reaction !== undefined
  )

  const onSave = async () => {
    const isNewArea = (editedArea.id === 0)
    setIsSaving(true)
    const { error } = (isNewArea)
      ? await createAreaMutation.mutateAsync(editedArea)
      : await editAreaMutation.mutateAsync(editedArea)
    setIsSaving(false)
    if (!error) {
      navigation.goBack()
    }
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
      />
      <Button
        w='80%'
        onPress={async () => await onSave()}
        isLoading={isSaving}
        _text={{ fontSize: "lg" }}
        disabled={!canSave}
        bgColor={canSave ? "primary.500" : "primary.100"}
      >
        { t('save', { ns: 'common' }) }
      </Button>
      <DeleteAreaDialog
        isOpen={isDeleteDialogOpen}
        setIsOpen={setIsDeleteDialogOpen}
      />
    </ScreenView>
  )
}

export default EditAreaScreen