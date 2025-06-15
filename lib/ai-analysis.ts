import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

/**
 * Extracts JSON from a string that might contain explanatory text
 * This handles cases where the model outputs text before or after the JSON
 */
function extractJsonFromString(text: string): any {
  try {
    // First try direct parsing
    return JSON.parse(text)
  } catch (error) {
    // If direct parsing fails, try to extract JSON using regex
    try {
      const jsonRegex = /{[\s\S]*}/
      const match = text.match(jsonRegex)
      if (match && match[0]) {
        return JSON.parse(match[0])
      }
    } catch (innerError) {
      console.error("Failed to extract JSON with regex:", innerError)
    }

    // If all extraction attempts fail, return null
    console.error("Failed to extract JSON from response:", text)
    return null
  }
}

/**
 * Analyzes text content using Groq AI to detect fake news patterns
 */
export async function analyzeTextWithAI(text: string) {
  try {
    const prompt = `
      You are an expert fact-checker specializing in Nigerian news and media. Analyze the following text for potential misinformation or fake news indicators.
      
      Consider these aspects:
      1. Sensationalist language or clickbait
      2. Lack of sources or vague attribution
      3. Emotional manipulation
      4. Factual inconsistencies
      5. Political bias
      6. Outdated information presented as current
      7. Common Nigerian fake news patterns
      
      Text to analyze:
      """
      ${text}
      """
      
      IMPORTANT: Respond ONLY with a valid JSON object using the following structure, with no additional text before or after:
      {
        "credibilityScore": number from 0-100 (higher means more credible),
        "issues": [
          {
            "type": "issue" or "warning" or "positive",
            "title": "brief title",
            "description": "detailed explanation"
          }
        ],
        "explanation": "overall analysis explanation",
        "manipulationTechniques": ["list", "of", "techniques", "if", "any"],
        "suggestedVerificationSteps": ["list", "of", "steps", "to", "verify"]
      }
    `

    const { text: responseText } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.2,
      maxTokens: 1500,
    })

    // Try to extract JSON from the response
    const parsedResponse = extractJsonFromString(responseText)

    if (parsedResponse) {
      return parsedResponse
    }

    // Fallback response if parsing fails
    return {
      credibilityScore: 50,
      issues: [
        {
          type: "warning",
          title: "Analysis Error",
          description: "The AI analysis produced an invalid response format. Please try again.",
        },
      ],
      explanation: "There was an error processing this content. The system was unable to properly analyze the text.",
      manipulationTechniques: [],
      suggestedVerificationSteps: [
        "Try submitting a shorter text",
        "Check for special characters that might confuse the analysis",
      ],
    }
  } catch (error) {
    console.error("AI analysis error:", error)
    return {
      credibilityScore: 50,
      issues: [
        {
          type: "warning",
          title: "Analysis Failed",
          description: "The AI analysis service encountered an error. Please try again later.",
        },
      ],
      explanation:
        "There was an error connecting to the analysis service. This might be due to high traffic or a temporary service disruption.",
      manipulationTechniques: [],
      suggestedVerificationSteps: ["Try again later", "Check your internet connection"],
    }
  }
}

/**
 * Analyzes a URL using AI to evaluate source credibility and content
 */
export async function analyzeUrlWithAI(url: string) {
  try {
    const prompt = `
      You are an expert fact-checker specializing in Nigerian news sources. Analyze the following URL for credibility:
      
      URL: ${url}
      
      Evaluate:
      1. Is this a known Nigerian news source?
      2. What is the reputation of this source?
      3. Does the URL structure look legitimate?
      4. Are there any red flags in the domain name?
      5. Is this likely to be a credible source for Nigerian news?
      
      IMPORTANT: Respond ONLY with a valid JSON object using the following structure, with no additional text before or after:
      {
        "isCredibleSource": boolean,
        "sourceName": "name of the source if identified",
        "reliabilityScore": number from 0-100,
        "issues": [
          {
            "type": "issue" or "warning" or "positive",
            "title": "brief title",
            "description": "detailed explanation"
          }
        ],
        "recommendedAlternatives": ["list", "of", "more", "reliable", "sources"]
      }
    `

    const { text: responseText } = await generateText({
      model: groq("llama3-70b-8192"),
      prompt,
      temperature: 0.2,
      maxTokens: 1000,
    })

    // Try to extract JSON from the response
    const parsedResponse = extractJsonFromString(responseText)

    if (parsedResponse) {
      return parsedResponse
    }

    // Fallback response if parsing fails
    return {
      isCredibleSource: false,
      sourceName: "Unknown",
      reliabilityScore: 50,
      issues: [
        {
          type: "warning",
          title: "Analysis Error",
          description: "The AI analysis produced an invalid response format. Please try again.",
        },
      ],
      recommendedAlternatives: ["punchng.com", "guardian.ng", "channelstv.com"],
    }
  } catch (error) {
    console.error("AI analysis error:", error)
    return {
      isCredibleSource: false,
      sourceName: "Unknown",
      reliabilityScore: 50,
      issues: [
        {
          type: "warning",
          title: "Analysis Failed",
          description: "The AI analysis service encountered an error. Please try again later.",
        },
      ],
      recommendedAlternatives: ["punchng.com", "guardian.ng", "channelstv.com"],
    }
  }
}
