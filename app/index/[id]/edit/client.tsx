"use client"

import { useEffect } from "react"
import EditIndexEntryForm from "@/components/edit-index-entry-form"

export default function EditIndexEntryClient({ id }: { id: string }) {
  // This ensures the component only renders on the client
  useEffect(() => {
    // This is just to ensure client-side rendering
  }, [])

  return <EditIndexEntryForm id={id} />
}
