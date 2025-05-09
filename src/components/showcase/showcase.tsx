import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface ShowcaseSectionProps {
  title: string
  description: string
  buttonText: string
  buttonHref: string
  imageSrc: string
  imageAlt: string
}

export function ShowcaseSection({
  title = "Showcase your thought provoking topics and ideas",
  description = "Big company announcement or simple sub-header taking two or more lines.",
  buttonText = "Read more",
  buttonHref = "#",
  imageSrc = "https://images.unsplash.com/photo-1742836531244-de8454b8bc06?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  imageAlt = "Showcase image",
}: Partial<ShowcaseSectionProps>) {
  return (
    <section className="w-full py-12 md:py-16 lg:py-20">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{title}</h2>
              <p className="text-muted-foreground md:text-lg">{description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <Button asChild size="lg">
                <Link href={buttonHref}>{buttonText}</Link>
              </Button>
            </div>
          </div>
          <Card className="overflow-hidden border-0 shadow-none">
            <CardContent className="p-0">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
