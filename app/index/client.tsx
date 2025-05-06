"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { PlusCircle, Search, ExternalLink, Pencil, Trash, Wand2 } from "lucide-react"
import { getIndexEntries, deleteIndexEntry, autoGenerateIndex, searchIndexEntries } from "@/lib/storage"
import type { IndexEntry } from "@/lib/types"
import { formatDistanceToNow } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export default function IndexClient() {
  const [entries, setEntries] = useState<IndexEntry[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)

  useEffect(() => {
    loadEntries()
  }, [])

  useEffect(() => {
    if (searchQuery.trim()) {
      setEntries(searchIndexEntries(searchQuery))
    } else {
      loadEntries()
    }
  }, [searchQuery])

  const loadEntries = () => {
    setEntries(getIndexEntries())
  }

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteIndexEntry(id)
      loadEntries()
      toast({
        title: "Entry deleted",
        description: "The index entry has been deleted",
      })
    }
  }

  const handleAutoGenerate = async () => {
    try {
      setIsGenerating(true)
      const result = autoGenerateIndex()

      toast({
        title: "Index generated",
        description: `Added ${result.added} new entries to the index`,
      })

      loadEntries()
    } catch (error) {
      console.error("Error generating index:", error)
      toast({
        title: "Error",
        description: "Failed to generate index. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Reference Index</h1>
        <p className="text-muted-foreground mb-6">A searchable index of concepts, references, and resources</p>

        <div className="flex flex-col md:flex-row gap-3 mb-6">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search index..."
                className="w-full rounded-md border border-input bg-background px-3 py-2 pl-8 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAutoGenerate} disabled={isGenerating}>
              <Wand2 className="mr-2 h-4 w-4" />
              {isGenerating ? "Generating..." : "Auto-Generate"}
            </Button>
            <Link href="/index/new">
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </Link>
          </div>
        </div>

        <div className="space-y-4">
          {entries.length > 0 ? (
            entries.map((entry) => (
              <Card key={entry.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-xl flex justify-between items-start">
                    <Link href="#" className="hover:underline">
                      {entry.title}
                    </Link>
                    <div className="flex gap-2">
                      <Link href={`/index/${entry.id}/edit`}>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <Pencil className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                      </Link>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={() => handleDelete(entry.id)}>
                        <Trash className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground mb-2">
                    <span className="font-medium">Reference:</span>
                    <span className="ml-2">{entry.reference}</span>
                    {entry.reference.startsWith("http") && (
                      <a
                        href={entry.reference}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="ml-1 text-primary hover:text-primary/80"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-sm mb-3">{entry.description}</p>
                  <div className="flex justify-between items-center">
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="text-xs text-muted-foreground">Updated {formatDistanceToNow(entry.updatedAt)}</div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : searchQuery ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No entries found</h3>
              <p className="text-muted-foreground mb-4">No entries match your search query</p>
              <Button variant="outline" onClick={() => setSearchQuery("")}>
                Clear Search
              </Button>
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No entries yet</h3>
              <p className="text-muted-foreground mb-4">Create your first index entry to get started</p>
              <div className="flex justify-center gap-4">
                <Button variant="outline" onClick={handleAutoGenerate} disabled={isGenerating}>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Auto-Generate from Notes
                </Button>
                <Link href="/index/new">
                  <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Entry
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
