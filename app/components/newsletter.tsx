"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { parseFormData, sendEvent } from "basehub/events"
import type { Subscribers } from "@/basehub"

interface NewsletterProps {
  newsletter: Pick<Subscribers, "ingestKey" | "schema">
}

export function Newsletter({ newsletter }: NewsletterProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [message, setMessage] = useState<{
    type: "success" | "error"
    text: string
  } | null>(null)

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const parsedSubmission = parseFormData(newsletter.ingestKey, newsletter.schema, formData)

      if (!parsedSubmission.success) {
        throw new Error(JSON.stringify(parsedSubmission.errors))
      }

      await sendEvent(newsletter.ingestKey, parsedSubmission.data)

      setMessage({
        type: "success",
        text: "Thanks for subscribing! You'll receive our latest updates.",
      })

      // Reset form
      const form = document.querySelector("form") as HTMLFormElement
      form?.reset()
    } catch (error) {
      console.error("Newsletter submission error:", error)
      setMessage({
        type: "error",
        text: "Something went wrong. Please try again later.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="border-t bg-blue-50">
      <div className="container mx-auto px-5">
        <div className="py-16 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tighter leading-tight mb-4 text-gray-900">
            Stay Updated with Tech Insights
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Subscribe to NsengiBlog newsletter to get the latest programming tutorials, tech insights, and development
            tips delivered straight to your inbox.
          </p>

          <form action={handleSubmit} className="max-w-md mx-auto space-y-4">
            {newsletter.schema.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                {field.type === "email" ? (
                  <div className="flex gap-2">
                    <Input
                      {...field}
                      className="flex-1 bg-white border-gray-300"
                      disabled={isSubmitting}
                      placeholder={field.placeholder || "Enter your email"}
                    />
                    <Button type="submit" disabled={isSubmitting} className="px-6 bg-blue-600 hover:bg-blue-700">
                      {isSubmitting ? "Subscribing..." : "Subscribe"}
                    </Button>
                  </div>
                ) : (
                  <div>
                    <label className="block text-sm font-medium mb-1 text-gray-700">{field.label}</label>
                    <Input
                      {...field}
                      disabled={isSubmitting}
                      placeholder={field.placeholder}
                      className="bg-white border-gray-300"
                    />
                  </div>
                )}
              </div>
            ))}

            {newsletter.schema.length === 0 && (
              <div className="flex gap-2">
                <Input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  className="flex-1 bg-white border-gray-300"
                  disabled={isSubmitting}
                />
                <Button type="submit" disabled={isSubmitting} className="px-6 bg-blue-600 hover:bg-blue-700">
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
            )}

            {message && (
              <p className={`text-sm ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {message.text}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
