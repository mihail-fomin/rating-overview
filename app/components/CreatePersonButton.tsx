import React from 'react'
import Link from 'next/link'
import { Button } from '@radix-ui/themes'
import { PersonIcon } from '@radix-ui/react-icons'

import { getServerSession } from 'next-auth'
import authOptions from '@/app/auth/authOptions'

const CreatePersonButton = async () => {
  const session = await getServerSession(authOptions)

  return (
    session && (
      <Link href="/cards/new">
        <Button>
          Добавить <PersonIcon />
        </Button>
      </Link>
    )
  )
}

export default CreatePersonButton
