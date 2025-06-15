"use server"

import { analyzeTextWithAI, analyzeUrlWithAI } from "@/lib/ai-analysis"
import { analyzeTextContent, checkSourceCredibility } from "@/lib/analyze-content"
import type { ContentType, Finding } from "@/types/analysis"

/**
 * Server action to analyze text directly
 */
export async function analyzeTextAction(text: string) {
  try {
    if (!text || text.length < 10) {
      return {
        success: false,
        error: "Text is too short for analysis",
      }
    }

    // First do basic analysis
    const basicAnalysis = analyzeTextContent(text)

    // Then do AI analysis
    const aiAnalysis = await analyzeTextWithAI(text)

    // Combine the results
    const findings: Finding[] = []

    // Add findings from AI analysis
    if (aiAnalysis && aiAnalysis.issues) {
      aiAnalysis.issues.forEach((issue: any) => {
        findings.push({
          type: issue.type as "issue" | "warning" | "positive",
          title: issue.title,
          description: issue.description,
        })
      })
    }

    // Calculate combined score
    const score = aiAnalysis ? aiAnalysis.credibilityScore : basicAnalysis.score

    return {
      success: true,
      result: {
        score,
        findings,
        explanation: aiAnalysis ? aiAnalysis.explanation : "Basic analysis completed",
        manipulationTechniques: aiAnalysis ? aiAnalysis.manipulationTechniques : [],
        suggestedVerificationSteps: aiAnalysis ? aiAnalysis.suggestedVerificationSteps : [],
        basicAnalysis,
        aiAnalysis,
      },
    }
  } catch (error) {
    console.error("Text analysis error:", error)
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}

/**
 * Server action to analyze URL directly
 */
export async function analyzeUrlAction(url: string) {
  try {
    if (!url || !url.startsWith("http")) {
      return {
        success: false,
        error: "Invalid URL",
      }
    }

    // First do basic analysis
    const basicAnalysis = checkSourceCredibility(url)

    // Then do AI analysis
    const aiAnalysis = await analyzeUrlWithAI(url)

    // Combine the results
    const findings: Finding[] = []

    // Add findings from AI analysis
    if (aiAnalysis && aiAnalysis.issues) {
      aiAnalysis.issues.forEach((issue: any) => {
        findings.push({
          type: issue.type as "issue" | "warning" | "positive",
          title: issue.title,
          description: issue.description,
        })
      })
    }

    // Calculate combined score
    const score = aiAnalysis ? aiAnalysis.reliabilityScore : basicAnalysis.reliabilityScore

    return {
      success: true,
      result: {
        score,
        findings,
        explanation: aiAnalysis
          ? `This URL was analyzed for credibility. ${aiAnalysis.isCredibleSource ? "It appears to be a credible source." : "It may not be a reliable source."}`
          : "Basic analysis completed",
        recommendedAlternatives: aiAnalysis ? aiAnalysis.recommendedAlternatives : [],
        basicAnalysis,
        aiAnalysis,
      },
    }
  } catch (error) {
    console.error("URL analysis error:", error)
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}

/**
 * Server action to submit full analysis
 */
export async function submitAnalysisAction(formData: FormData) {
  try {
    const type = formData.get("type") as ContentType
    let content: string | null = null

    if (type === "text") {
      content = formData.get("content") as string
      if (!content) {
        throw new Error("No content provided")
      }

      const result = await analyzeTextAction(content)
      if (!result.success) {
        throw new Error(result.error)
      }

      // Generate a unique ID for this analysis
      const analysisId = `analysis_${Date.now()}`

      // In a real app, we would store the result in a database
      // For this demo, we'll use localStorage in the client
      return {
        success: true,
        id: analysisId,
        result: result.result,
      }
    } else if (type === "url") {
      content = formData.get("content") as string
      if (!content) {
        throw new Error("No content provided")
      }

      const result = await analyzeUrlAction(content)
      if (!result.success) {
        throw new Error(result.error)
      }

      // Generate a unique ID for this analysis
      const analysisId = `analysis_${Date.now()}`

      // In a real app, we would store the result in a database
      // For this demo, we'll use localStorage in the client
      return {
        success: true,
        id: analysisId,
        result: result.result,
      }
    }

    // For image/video, we would need more complex processing
    // For now, return a placeholder
    return {
      success: false,
      error: "Analysis for this content type is not yet implemented",
    }
  } catch (error) {
    console.error("Analysis submission error:", error)
    return {
      success: false,
      error: (error as Error).message,
    }
  }
}
