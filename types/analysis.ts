export type ContentType = "image" | "video" | "url" | "text"

export interface Finding {
  type: "issue" | "warning" | "positive"
  title: string
  description: string
}

export interface AnalysisResult {
  id: string
  type: ContentType
  title: string
  source: string
  score: number // 0-100 authenticity score
  manipulationScore: number // 0-100
  sourceReliabilityScore: number // 0-100
  contextAccuracyScore: number // 0-100
  findings: Finding[]
  explanation: string
  relatedFacts?: string[]
}

export interface TextAnalysisResult {
  score: number
  indicators: { pattern: string; severity: number }[]
}

export interface SourceCredibilityResult {
  isCredible: boolean
  sourceName: string | null
  reliabilityScore: number
}

export interface ImageAnalysisResult {
  manipulationDetected: boolean
  manipulationScore: number
  manipulatedRegions?: { x: number; y: number; width: number; height: number }[]
}
