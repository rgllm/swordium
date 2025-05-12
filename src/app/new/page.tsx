'use client'

import { notFound } from "next/navigation";

import ArticleForm from "@/components/articleForm";
import { useSwordiumUser } from "@/lib/useSwordiumUser";
import { Role } from "@/types/Role";

export default function NewArticlePage() {
  const { role } = useSwordiumUser()

  if(role !== Role.ADMIN) {
    return notFound()
  }
  
  return (
  <main className="container mx-auto py-12">
    <ArticleForm/>
  </main>
  );
}
