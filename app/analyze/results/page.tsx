"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, Download, ExternalLink, FileVideo, Share2, ThumbsDown, ThumbsUp } from "lucide-react"
import { AnalysisResultCard } from "@/components/analysis-result-card"

export default function ResultsPage() {
  const searchParams = useSearchParams()
  const analysisId = searchParams.get("id")
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchResults = async () => {
      if (!analysisId) {
        setError("No analysis ID provided")
        setLoading(false)
        return
      }

      try {
        // Try to get the result from localStorage
        if (typeof window !== "undefined") {
          const storedResult = localStorage.getItem(analysisId)
          if (storedResult) {
            setResult(JSON.parse(storedResult))
            setLoading(false)
            return
          }
        }

        // If not found in localStorage, show error
        setError("Analysis results not found")
        setLoading(false)
      } catch (err) {
        setError("Failed to fetch analysis results")
        console.error(err)
        setLoading(false)
      }
    }

    fetchResults()
  }, [analysisId])

  if (loading) {
    return (
      <div className="container max-w-4xl py-24 mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Analyzing content...</h1>
          <Progress value={65} className="w-[300px]" />
          <p className="text-gray-500">This may take a few moments</p>
        </div>
      </div>
    )
  }

  if (error || !result) {
    return (
      <div className="container max-w-4xl py-24 mx-auto px-4 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="space-y-4 text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold">Analysis Error</h1>
          <p className="text-gray-500">{error || "Failed to retrieve analysis results"}</p>
          <Button asChild>
            <Link href="/analyze">Try Again</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Extract content type and title
  const contentType = result.aiAnalysis?.contentType || "text"
  const title = result.aiAnalysis?.title || "Content Analysis"
  const source = result.aiAnalysis?.source || "Unknown source"

  // Extract scores
  const manipulationScore = result.aiAnalysis?.manipulationScore || 50
  const sourceReliabilityScore =
    result.aiAnalysis?.sourceReliabilityScore || result.basicAnalysis?.reliabilityScore || 50
  const contextAccuracyScore = result.aiAnalysis?.contextAccuracyScore || 50

  return (
    <div className="container max-w-4xl py-12 md:py-24 mx-auto px-4">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tighter">Analysis Results</h1>
          <div className="flex gap-2">
            <Button variant="outline" size="icon">
              <Share2 className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Download className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                {contentType === "image" ? (
                  <div className="w-[180px] h-[120px] bg-gray-100 rounded overflow-hidden relative">
                    <Image
                      src="/placeholder.svg?height=120&width=180"
                      alt="Analyzed content"
                      width={180}
                      height={120}
                      className="object-cover"
                    />
                  </div>
                ) : contentType === "video" ? (
                  <div className="w-[180px] h-[120px] bg-gray-100 rounded overflow-hidden relative flex items-center justify-center">
                    <FileVideo className="w-10 h-10 text-gray-400" />
                  </div>
                ) : (
                  <div className="w-[180px] h-[120px] bg-gray-100 rounded overflow-hidden relative flex items-center justify-center">
                    <ExternalLink className="w-10 h-10 text-gray-400" />
                  </div>
                )}
              </div>

              <div className="flex-1">
                <h3 className="font-medium text-lg mb-1">{title}</h3>
                <p className="text-sm text-gray-500 mb-3">{source}</p>

                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1">
                    <div className="text-xs flex justify-between">
                      <span>Manipulation Detection</span>
                      <span className="font-medium">{manipulationScore}%</span>
                    </div>
                    <Progress value={manipulationScore} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs flex justify-between">
                      <span>Source Reliability</span>
                      <span className="font-medium">{sourceReliabilityScore}%</span>
                    </div>
                    <Progress value={sourceReliabilityScore} className="h-2" />
                  </div>

                  <div className="space-y-1">
                    <div className="text-xs flex justify-between">
                      <span>Context Accuracy</span>
                      <span className="font-medium">{contextAccuracyScore}%</span>
                    </div>
                    <Progress value={contextAccuracyScore} className="h-2" />
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <AnalysisResultCard
          title="Content Analysis"
          description={
            contentType === "image"
              ? "Image analysis results"
              : contentType === "video"
                ? "Video analysis results"
                : contentType === "url"
                  ? "Web content analysis results"
                  : "Text content analysis results"
          }
          score={result.score}
          findings={result.findings || []}
          explanation={result.explanation || "Analysis completed"}
          relatedFacts={result.aiAnalysis?.suggestedVerificationSteps || []}
        />

        <div className="pt-4 flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex gap-1">
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful</span>
            </Button>
            <Button variant="outline" size="sm" className="flex gap-1">
              <ThumbsDown className="w-4 h-4" />
              <span>Not Helpful</span>
            </Button>
          </div>

          <Button asChild>
            <Link href="/analyze">Analyze More Content</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
