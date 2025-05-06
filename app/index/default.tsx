export default function DefaultIndexPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Reference Index</h1>
      <p className="text-muted-foreground mb-4">Loading index entries...</p>
      <div className="animate-pulse space-y-4">
        <div className="h-24 bg-muted rounded-md"></div>
        <div className="h-24 bg-muted rounded-md"></div>
        <div className="h-24 bg-muted rounded-md"></div>
      </div>
    </div>
  )
}
