"use client"

import { useEffect } from "react"
import NewIndexEntryForm from "@/components/new-index-entry-form"

export default function NewIndexEntryClient() {
  // This ensures the component only renders on the client
  useEffect(() => {
    // This is just to ensure client-side rendering
  }, [])

  return <NewIndexEntryForm />
}
