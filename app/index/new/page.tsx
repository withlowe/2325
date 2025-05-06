import dynamic from "next/dynamic"

// Dynamically import the client component with SSR disabled
const NewIndexEntryClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">New Index Entry</h1>
      <p>Loading form...</p>
    </div>
  ),
})

export default function NewIndexEntryPage() {
  return <NewIndexEntryClient />
}
