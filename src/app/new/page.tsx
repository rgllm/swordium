'use client'

import { useRouter, notFound } from 'next/navigation'

import { Role } from '@/types/Role'
import { useSwordiumUser } from '@/lib/useSwordiumUser'
import ArticleForm from '@/components/articleForm'

export default function NewArticlePage() {
  const { role } = useSwordiumUser()
  const router = useRouter()

  const handleSuccess = () => {
    router.push('/')
  }

  if (role !== Role.ADMIN) {
    return notFound()
  }

  return (
    <main className="container mx-auto py-12">
      <ArticleForm onSuccess={handleSuccess} />
    </main>
  )
}
