"use client"

import { Suspense, lazy } from "react"
import { Skeleton } from "@/components/ui/skeleton"

// Use React's lazy instead of next/dynamic in client components
const IndexClient = lazy(() => import("./client"))

export default function IndexWrapper() {
  return (
    <Suspense
      fallback={
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-4">Reference Index</h1>
          <p className="text-muted-foreground mb-4">Loading index entries...</p>
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      }
    >
      <IndexClient />
    </Suspense>
  )
}
