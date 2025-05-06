import dynamic from "next/dynamic"

// Dynamically import the client component with SSR disabled
const EditIndexEntryClient = dynamic(() => import("./client"), {
  ssr: false,
  loading: () => (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Edit Index Entry</h1>
      <p>Loading form...</p>
    </div>
  ),
})

export default function EditIndexEntryPage({ params }: { params: { id: string } }) {
  return <EditIndexEntryClient id={params.id} />
}
