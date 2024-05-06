'use client'

import React from 'react'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import toast from 'react-hot-toast'
import Spinner from '@/app/components/Spinner'


const DeleteUserButton = ({ workerId }: { workerId: string }) => {
    const router = useRouter()
    const [error, setError] = React.useState<boolean>(false)
    const [isDeleting, setIsDeleting] = React.useState<boolean>(false)
  
    const handleDeleteButton = async () => {
      try {
        setIsDeleting(true)
        await axios.delete('/api/cards/' + workerId)
        toast.success('Карточка была удалена')
        router.push('/')
        router.refresh()
      } catch (error) {
        setIsDeleting(false)
        setError(true)
      }
    }

  return (
    <>
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button color="red" disabled={isDeleting}>
            Удалить карточку
            {isDeleting && <Spinner />}
          </Button>
        </AlertDialog.Trigger>
        <AlertDialog.Content>
          <AlertDialog.Title>Подтвердить удаление</AlertDialog.Title>
          <AlertDialog.Description>
            Вы уверены, что хотите удалить карточку? Данное действие нельзя будет вернуть
          </AlertDialog.Description>
          <Flex mt="4" gap="3" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Отменить
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button color="red" onClick={handleDeleteButton}>
                Удалить карточку
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
      <AlertDialog.Root open={error}>
        <AlertDialog.Content>
          <AlertDialog.Title>Error</AlertDialog.Title>
          <AlertDialog.Description>Данная карточка не может быть удалена.</AlertDialog.Description>
          <Button color="gray" variant="soft" mt="2" onClick={() => setError(false)}>
            OK
          </Button>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </>
  )
}

export default DeleteUserButton

