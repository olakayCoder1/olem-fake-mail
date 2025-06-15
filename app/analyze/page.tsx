"use client"

import type React from "react"
import type { ContentType } from "@/types/analysis"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Globe, ImageIcon, FileText, Upload, AlertTriangle, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { analyzeTextContent, checkSourceCredibility } from "@/lib/analyze-content"
import { analyzeTextAction, analyzeUrlAction, submitAnalysisAction } from "@/app/actions"

export default function AnalyzePage() {
  const router = useRouter()
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [url, setUrl] = useState("")
  const [text, setText] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [filePreview, setFilePreview] = useState<string | null>(null)

  // Quick analysis results (shown before full submission)
  const [quickTextAnalysis, setQuickTextAnalysis] = useState<{ score: number; indicators: any[] } | null>(null)
  const [quickUrlAnalysis, setQuickUrlAnalysis] = useState<{
    isCredible: boolean
    sourceName: string | null
    reliabilityScore: number
  } | null>(null)

  // AI analysis results
  const [aiTextAnalysis, setAiTextAnalysis] = useState<any>(null)
  const [aiUrlAnalysis, setAiUrlAnalysis] = useState<any>(null)
  const [isAiAnalyzing, setIsAiAnalyzing] = useState({ text: false, url: false })

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      setFile(selectedFile)

      // Create preview for images
      if (selectedFile.type.startsWith("image/")) {
        const reader = new FileReader()
        reader.onload = (e) => {
          setFilePreview(e.target?.result as string)
        }
        reader.readAsDataURL(selectedFile)
      } else {
        setFilePreview(null)
      }
    }
  }

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value
    setText(newText)

    // Only perform quick analysis if text is substantial
    if (newText.length > 20) {
      const analysis = analyzeTextContent(newText)
      setQuickTextAnalysis(analysis)
    } else {
      setQuickTextAnalysis(null)
    }

    // Reset AI analysis when text changes
    setAiTextAnalysis(null)
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)

    // Check if it's a valid URL before analysis
    if (newUrl.startsWith("http") && newUrl.includes(".")) {
      const analysis = checkSourceCredibility(newUrl)
      setQuickUrlAnalysis(analysis)
    } else {
      setQuickUrlAnalysis(null)
    }

    // Reset AI analysis when URL changes
    setAiUrlAnalysis(null)
  }

  const handleAiTextAnalysis = async () => {
    if (text.length < 20 || isAiAnalyzing.text) return

    setIsAiAnalyzing((prev) => ({ ...prev, text: true }))

    try {
      const result = await analyzeTextAction(text)
      if (result.success) {
        setAiTextAnalysis(result.result)
      }
    } catch (error) {
      console.error("AI text analysis error:", error)
    } finally {
      setIsAiAnalyzing((prev) => ({ ...prev, text: false }))
    }
  }

  const handleAiUrlAnalysis = async () => {
    if (!url.startsWith("http") || isAiAnalyzing.url) return

    setIsAiAnalyzing((prev) => ({ ...prev, url: true }))

    try {
      const result = await analyzeUrlAction(url)
      if (result.success) {
        setAiUrlAnalysis(result.result)
      }
    } catch (error) {
      console.error("AI URL analysis error:", error)
    } finally {
      setIsAiAnalyzing((prev) => ({ ...prev, url: false }))
    }
  }

  const handleSubmit = async (type: ContentType) => {
    setIsAnalyzing(true)

    try {
      // Create a FormData object to submit
      const formData = new FormData()
      formData.append("type", type)

      switch (type) {
        case "url":
          formData.append("content", url)
          break
        case "text":
          formData.append("content", text)
          break
        case "image":
        case "video":
          if (!file) throw new Error("No file selected")
          formData.append("file", file)
          break
      }

      // Submit for analysis
      const response = await submitAnalysisAction(formData)

      if (response.success) {
        // Store the result in localStorage for the results page to access
        if (typeof window !== "undefined") {
          localStorage.setItem(`analysis_${response.id}`, JSON.stringify(response.result))
        }

        // Navigate to results page with the analysis ID
        router.push(`/analyze/results?id=${response.id}`)
      } else {
        throw new Error(response.error)
      }
    } catch (error) {
      console.error("Analysis error:", error)
      alert(`Analysis failed: ${(error as Error).message}`)
      setIsAnalyzing(false)
    }
  }

  return (
    <div className="container max-w-4xl py-12 md:py-24 mx-auto px-4">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">Analyze Content</h1>
        <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px] mx-auto">
          Submit Nigerian news content for fake news detection and analysis
        </p>
      </div>

      <Card className="mt-12">
        <CardHeader>
          <CardTitle>Submit Content for Analysis</CardTitle>
          <CardDescription>Choose how you want to submit content for verification</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="url" className="w-full">
            <TabsList className="grid grid-cols-3 mb-8">
              <TabsTrigger value="url" className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                URL
              </TabsTrigger>
              <TabsTrigger value="text" className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Text
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4" />
                Image/Video
              </TabsTrigger>
            </TabsList>

            <TabsContent value="url" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">Enter the URL of a Nigerian news article or social media post</p>
                <Input placeholder="https://example.com/news-article" value={url} onChange={handleUrlChange} />

                {quickUrlAnalysis && (
                  <div
                    className={`mt-2 p-3 text-sm rounded-md ${
                      quickUrlAnalysis.isCredible
                        ? "bg-green-50 text-green-800 border border-green-200"
                        : "bg-amber-50 text-amber-800 border border-amber-200"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {quickUrlAnalysis.isCredible ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <AlertTriangle className="w-4 h-4" />
                      )}
                      <span className="font-medium">
                        {quickUrlAnalysis.isCredible ? "Recognized source" : "Unverified source"}
                      </span>
                    </div>
                    <p className="mt-1">
                      {quickUrlAnalysis.sourceName
                        ? `Source: ${quickUrlAnalysis.sourceName}`
                        : "Unable to determine source"}
                      {quickUrlAnalysis.reliabilityScore > 0 &&
                        ` (${quickUrlAnalysis.reliabilityScore}% reliability score)`}
                    </p>
                  </div>
                )}

                {!aiUrlAnalysis && url.startsWith("http") && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAiUrlAnalysis}
                    disabled={isAiAnalyzing.url}
                    className="mt-2"
                  >
                    {isAiAnalyzing.url ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Run AI Source Check"
                    )}
                  </Button>
                )}

                {aiUrlAnalysis && (
                  <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <h4 className="font-medium mb-2">AI Source Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Source:</span>
                        <span className="text-sm">{aiUrlAnalysis.aiAnalysis?.sourceName || "Unknown"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Reliability:</span>
                        <span className="text-sm">{aiUrlAnalysis.score}%</span>
                      </div>
                      {aiUrlAnalysis.findings && aiUrlAnalysis.findings.length > 0 && (
                        <div>
                          <span className="text-sm font-medium">Issues:</span>
                          <ul className="mt-1 space-y-1">
                            {aiUrlAnalysis.findings.map((issue: any, index: number) => (
                              <li key={index} className="text-sm flex items-start gap-1">
                                {issue.type === "issue" ? (
                                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                ) : issue.type === "warning" ? (
                                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                )}
                                <span>{issue.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={() => handleSubmit("url")} disabled={!url || isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze URL"
                )}
              </Button>
            </TabsContent>

            <TabsContent value="text" className="space-y-4">
              <div className="space-y-2">
                <p className="text-sm">Paste the text content you want to analyze</p>
                <Textarea
                  placeholder="Enter the text from a news article or social media post"
                  className="min-h-[200px]"
                  value={text}
                  onChange={handleTextChange}
                />

                {quickTextAnalysis && quickTextAnalysis.indicators.length > 0 && (
                  <div className="mt-2 p-3 text-sm rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="font-medium">Potential misinformation indicators detected</span>
                    </div>
                    <ul className="mt-1 space-y-1 list-disc list-inside">
                      {quickTextAnalysis.indicators.slice(0, 3).map((indicator, index) => (
                        <li key={index}>
                          Found pattern: "{indicator.pattern}" (severity: {indicator.severity}/10)
                        </li>
                      ))}
                    </ul>
                    <p className="mt-1 text-xs">Initial credibility score: {quickTextAnalysis.score}%</p>
                  </div>
                )}

                {!aiTextAnalysis && text.length > 20 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleAiTextAnalysis}
                    disabled={isAiAnalyzing.text}
                    className="mt-2"
                  >
                    {isAiAnalyzing.text ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Run AI Content Analysis"
                    )}
                  </Button>
                )}

                {aiTextAnalysis && (
                  <div className="mt-4 p-4 border rounded-md bg-gray-50">
                    <h4 className="font-medium mb-2">AI Content Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">Credibility Score:</span>
                        <span className="text-sm">{aiTextAnalysis.score}%</span>
                      </div>
                      {aiTextAnalysis.findings && aiTextAnalysis.findings.length > 0 && (
                        <div>
                          <span className="text-sm font-medium">Issues:</span>
                          <ul className="mt-1 space-y-1">
                            {aiTextAnalysis.findings.slice(0, 3).map((issue: any, index: number) => (
                              <li key={index} className="text-sm flex items-start gap-1">
                                {issue.type === "issue" ? (
                                  <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                                ) : issue.type === "warning" ? (
                                  <AlertTriangle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                ) : (
                                  <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                                )}
                                <span>{issue.title}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {aiTextAnalysis.aiAnalysis?.manipulationTechniques &&
                        aiTextAnalysis.aiAnalysis.manipulationTechniques.length > 0 && (
                          <div>
                            <span className="text-sm font-medium">Manipulation Techniques:</span>
                            <ul className="mt-1 space-y-1 list-disc list-inside">
                              {aiTextAnalysis.aiAnalysis.manipulationTechniques
                                .slice(0, 3)
                                .map((technique: string, index: number) => (
                                  <li key={index} className="text-sm">
                                    {technique}
                                  </li>
                                ))}
                            </ul>
                          </div>
                        )}
                    </div>
                  </div>
                )}
              </div>
              <Button className="w-full" onClick={() => handleSubmit("text")} disabled={!text || isAnalyzing}>
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Text"
                )}
              </Button>
            </TabsContent>

            <TabsContent value="media" className="space-y-4">
              <div className="space-y-4">
                <div className="grid w-full max-w-sm items-center gap-1.5 mx-auto">
                  <p className="text-sm">Upload an image or video from Nigerian news sources</p>
                  <label htmlFor="media" className="cursor-pointer">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-12 hover:bg-gray-50 transition-colors">
                      {filePreview ? (
                        <div className="relative w-full">
                          <img
                            src={filePreview || "/placeholder.svg"}
                            alt="Preview"
                            className="mx-auto max-h-[200px] object-contain"
                          />
                          <p className="text-sm text-center mt-2">{file?.name}</p>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2">
                          <div className="p-4 rounded-full bg-gray-100">
                            <Upload className="w-8 h-8 text-gray-500" />
                          </div>
                          <p className="text-sm font-medium">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-500">Images (JPG, PNG) or videos (MP4)</p>
                        </div>
                      )}
                    </div>
                  </label>
                  <Input
                    id="media"
                    type="file"
                    className="hidden"
                    accept="image/jpeg,image/png,video/mp4"
                    onChange={handleFileChange}
                  />
                </div>
                {file && (
                  <Button
                    className="w-full"
                    onClick={() => handleSubmit(file.type.startsWith("image/") ? "image" : "video")}
                    disabled={isAnalyzing}
                  >
                    {isAnalyzing ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      "Analyze Media"
                    )}
                  </Button>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      <div className="mt-12 space-y-6">
        <h2 className="text-xl font-bold text-center">What We Check For</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex gap-2 items-center mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-500" />
              <h3 className="font-medium">Manipulated Media</h3>
            </div>
            <p className="text-sm text-gray-500">
              Detection of digitally altered images and videos using advanced AI techniques
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex gap-2 items-center mb-2">
              <CheckCircle className="w-5 h-5 text-emerald-500" />
              <h3 className="font-medium">Source Verification</h3>
            </div>
            <p className="text-sm text-gray-500">
              Validation against known credible Nigerian news sources and fact-checking organizations
            </p>
          </div>
          <div className="p-4 border rounded-lg bg-white">
            <div className="flex gap-2 items-center mb-2">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h3 className="font-medium">Contextual Analysis</h3>
            </div>
            <p className="text-sm text-gray-500">
              Examination of context, timing, and consistency with verified reports
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
