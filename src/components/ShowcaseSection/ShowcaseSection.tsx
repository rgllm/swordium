'use client'

import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ShowcaseSectionProps {
  slug: string
  title: string
  description: string
  image: string
}

export function ShowcaseSection({
  slug,
  title,
  description,
  image
}: ShowcaseSectionProps) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <Link href={`/article/${slug}`}>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
              </Link>
              <p className="text-muted-foreground md:text-lg">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Link href={`/article/${slug}`}>
                <Button asChild size="lg">
                  Read More
                </Button>
              </Link>
            </div>
          </div>
          <Card className="overflow-hidden border-0 shadow-none">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Link href={`/article/${slug}`}>
                  <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
