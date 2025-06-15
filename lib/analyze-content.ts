import type { AnalysisResult, ContentType, Finding } from "@/types/analysis"

// Text patterns that might indicate fake news
const FAKE_NEWS_PATTERNS = [
  { pattern: /shocking truth/i, weight: 0.7 },
  { pattern: /they don't want you to know/i, weight: 0.8 },
  { pattern: /doctors hate this/i, weight: 0.9 },
  { pattern: /government conspiracy/i, weight: 0.6 },
  { pattern: /miracle cure/i, weight: 0.8 },
  { pattern: /secret remedy/i, weight: 0.7 },
  { pattern: /exclusive report/i, weight: 0.3 },
  { pattern: /breaking news/i, weight: 0.2 },
]

// Credible Nigerian news sources
const CREDIBLE_SOURCES = [
  { domain: "punchng.com", name: "Punch Newspapers", reliability: 0.85 },
  { domain: "thisdaylive.com", name: "ThisDay", reliability: 0.82 },
  { domain: "guardian.ng", name: "The Guardian Nigeria", reliability: 0.88 },
  { domain: "vanguardngr.com", name: "Vanguard Nigeria", reliability: 0.8 },
  { domain: "channelstv.com", name: "Channels Television", reliability: 0.87 },
  { domain: "thecable.ng", name: "The Cable", reliability: 0.83 },
  { domain: "premiumtimesng.com", name: "Premium Times", reliability: 0.86 },
  { domain: "dailytrust.com", name: "Daily Trust", reliability: 0.81 },
]

/**
 * Analyzes content for fake news indicators
 */
export async function analyzeContent({
  type,
  content,
}: {
  type: ContentType
  content: string | File
}): Promise<{ id: string }> {
  // In a real implementation, this would send the content to an AI service
  // For now, we'll simulate the process with a delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Generate a unique ID for this analysis
  const analysisId = `analysis_${Date.now()}`

  // Store the content for later retrieval (in a real app, this would go to a database)
  // For this demo, we'll use localStorage in the browser
  if (typeof window !== "undefined") {
    localStorage.setItem(
      analysisId,
      JSON.stringify({
        type,
        content: typeof content === "string" ? content : content.name,
        timestamp: new Date().toISOString(),
      }),
    )
  }

  return { id: analysisId }
}

/**
 * Retrieves and processes analysis results
 */
export async function getAnalysisResults(id: string): Promise<AnalysisResult> {
  // Simulate processing delay
  await new Promise((resolve) => setTimeout(resolve, 2000))


  // Extract a seed from the ID to ensure consistent results for the same ID
  const seed = Number.parseInt(id.replace(/\D/g, "").slice(-6))
  const random = seedRandom(seed)

  // Generate scores with some randomness but weighted toward the middle
  const manipulationScore = Math.floor(random() * 100)
  const sourceReliabilityScore = Math.floor(random() * 100)
  const contextAccuracyScore = Math.floor(random() * 100)

  // Overall authenticity score is a weighted average
  const score = Math.floor(manipulationScore * 0.4 + sourceReliabilityScore * 0.4 + contextAccuracyScore * 0.2)

  // Generate findings based on scores
  const findings: Finding[] = generateFindings(manipulationScore, sourceReliabilityScore, contextAccuracyScore)

  // Generate a realistic explanation
  const explanation = generateExplanation(score, manipulationScore, sourceReliabilityScore, contextAccuracyScore)

  // Generate related facts
  const relatedFacts = generateRelatedFacts(random)

  return {
    id,
    type: determineContentType(random),
    title: generateTitle(random),
    source: generateSource(random),
    score,
    manipulationScore,
    sourceReliabilityScore,
    contextAccuracyScore,
    findings,
    explanation,
    relatedFacts,
  }
}

/**
 * Analyzes text content for fake news indicators
 */
export function analyzeTextContent(text: string): {
  score: number
  indicators: { pattern: string; severity: number }[]
} {
  let totalWeight = 0
  const indicators: { pattern: string; severity: number }[] = []

  // Check for fake news patterns
  FAKE_NEWS_PATTERNS.forEach(({ pattern, weight }) => {
    if (pattern.test(text)) {
      totalWeight += weight
      indicators.push({
        pattern: pattern.toString().replace(/[/]/g, "").replace("i", ""),
        severity: weight * 10,
      })
    }
  })

  // Calculate score (higher weight = lower score)
  const score = Math.max(0, Math.min(100, Math.round(100 - totalWeight * 50)))

  return { score, indicators }
}

/**
 * Checks URL credibility based on known sources
 */
export function checkSourceCredibility(url: string): {
  isCredible: boolean
  sourceName: string | null
  reliabilityScore: number
} {
  try {
    const domain = new URL(url).hostname.replace("www.", "")

    const source = CREDIBLE_SOURCES.find((source) => domain.includes(source.domain))

    if (source) {
      return {
        isCredible: true,
        sourceName: source.name,
        reliabilityScore: Math.round(source.reliability * 100),
      }
    }

    return {
      isCredible: false,
      sourceName: domain,
      reliabilityScore: Math.round(Math.random() * 40), // Low score for unknown sources
    }
  } catch (error) {
    return {
      isCredible: false,
      sourceName: null,
      reliabilityScore: 0,
    }
  }
}

// Helper functions for generating mock data
function seedRandom(seed: number) {
  return () => {
    seed = (seed * 9301 + 49297) % 233280
    return seed / 233280
  }
}

function determineContentType(random: () => number): "image" | "video" | "url" | "text" {
  const types: ["image", "video", "url", "text"] = ["image", "video", "url", "text"]
  return types[Math.floor(random() * types.length)]
}

function generateTitle(random: () => number): string {
  const titles = [
    "Flooding in Lagos State",
    "Government Announces New Policy",
    "Protest in Abuja Over Fuel Prices",
    "Nigerian Team Wins International Competition",
    "Economic Crisis Looms as Naira Falls",
    "President Addresses Nation on Security",
    "Health Alert: New Outbreak in Southern States",
    "Election Results Disputed in Northern Region",
  ]
  return titles[Math.floor(random() * titles.length)]
}

function generateSource(random: () => number): string {
  const sources = [
    "Instagram post shared by @nigeriannews",
    "WhatsApp message forwarded multiple times",
    "Facebook post by 'Nigeria Daily Updates'",
    "Twitter post by @NGNewsNow",
    "Article from nigerianewstoday.com",
    "YouTube video by 'Nigeria Insider'",
    "Telegram channel 'Lagos Updates'",
    "TikTok video trending in Nigeria",
  ]
  return sources[Math.floor(random() * sources.length)]
}

function generateFindings(
  manipulationScore: number,
  sourceReliabilityScore: number,
  contextAccuracyScore: number,
): Finding[] {
  const findings: Finding[] = []

  // Manipulation findings
  if (manipulationScore < 40) {
    findings.push({
      type: "issue",
      title: "Image Manipulation Detected",
      description: "Analysis found evidence of digital manipulation. The image appears to have been altered.",
    })
  } else if (manipulationScore < 70) {
    findings.push({
      type: "warning",
      title: "Possible Image Alteration",
      description: "Some indicators of image processing were detected, though may be minor adjustments.",
    })
  } else {
    findings.push({
      type: "positive",
      title: "No Manipulation Detected",
      description: "No evidence of significant digital manipulation was found in the media.",
    })
  }

  // Source reliability findings
  if (sourceReliabilityScore < 40) {
    findings.push({
      type: "issue",
      title: "Unverified Source",
      description: "The content appears on channels not associated with verified Nigerian news sources.",
    })
  } else if (sourceReliabilityScore < 70) {
    findings.push({
      type: "warning",
      title: "Partially Reliable Source",
      description: "The source has mixed reliability ratings and should be verified with other sources.",
    })
  } else {
    findings.push({
      type: "positive",
      title: "Reliable Source",
      description: "The content comes from a generally reliable Nigerian news source.",
    })
  }

  // Context accuracy findings
  if (contextAccuracyScore < 40) {
    findings.push({
      type: "issue",
      title: "Misleading Context",
      description: "The content appears to be presented out of context or with misleading information.",
    })
  } else if (contextAccuracyScore < 70) {
    findings.push({
      type: "warning",
      title: "Partial Context",
      description: "Some contextual information may be missing, making the full story unclear.",
    })
  } else {
    findings.push({
      type: "positive",
      title: "Accurate Context",
      description: "The content appears to be presented with appropriate context and accurate information.",
    })
  }

  // Add a random additional finding
  const additionalFindings = [
    {
      type: "warning" as const,
      title: "Outdated Content",
      description: "This content appears to be from a previous event, not recent as implied.",
    },
    {
      type: "issue" as const,
      title: "Misleading Headline",
      description: "The headline makes claims not supported by the content itself.",
    },
    {
      type: "positive" as const,
      title: "Verified Information",
      description: "Key facts in this content have been independently verified by fact-checkers.",
    },
    {
      type: "warning" as const,
      title: "Emotional Language",
      description: "The content uses highly emotional language that may influence perception.",
    },
  ]

  const randomIndex = Math.floor(Math.random() * additionalFindings.length)
  findings.push(additionalFindings[randomIndex])

  return findings
}

function generateExplanation(
  score: number,
  manipulationScore: number,
  sourceReliabilityScore: number,
  contextAccuracyScore: number,
): string {
  if (score < 40) {
    return `Our analysis indicates this content has significant credibility issues. ${
      manipulationScore < 50 ? "There are signs of digital manipulation in the media. " : ""
    }${sourceReliabilityScore < 50 ? "The source does not appear to be a verified Nigerian news outlet. " : ""}${
      contextAccuracyScore < 50 ? "The context appears to be misleading or inaccurate. " : ""
    }We recommend seeking information from verified Nigerian news sources before sharing this content.`
  } else if (score < 70) {
    return `Our analysis shows this content has some reliability concerns. ${
      manipulationScore < 70 ? "There may be some alterations to the original media. " : ""
    }${sourceReliabilityScore < 70 ? "The source has limited verification or mixed reliability. " : ""}${
      contextAccuracyScore < 70 ? "Some contextual information may be missing or misleading. " : ""
    }We recommend cross-checking with other reliable Nigerian news sources.`
  } else {
    return `Our analysis indicates this content appears to be authentic. ${
      manipulationScore >= 70 ? "No significant manipulation of the media was detected. " : ""
    }${sourceReliabilityScore >= 70 ? "The source is generally considered reliable. " : ""}${
      contextAccuracyScore >= 70 ? "The context appears to be accurate and appropriate. " : ""
    }While no detection system is perfect, this content shows strong indicators of reliability.`
  }
}

function generateRelatedFacts(random: () => number): string[] {
  const allFacts = [
    "Lagos did experience significant flooding in July 2021",
    "The Nigerian Meteorological Agency provides official flood warnings and reports",
    "Manipulated disaster images are commonly spread during rainy season in Nigeria",
    "The original, unaltered images are available from The Guardian Nigeria archives",
    "Nigeria's Centre for Disease Control is the official source for outbreak information",
    "Election results are officially announced by INEC (Independent National Electoral Commission)",
    "The Central Bank of Nigeria is the authoritative source on currency and economic policies",
    "Nigerian fact-checking organizations include Dubawa and Africa Check",
    "Many viral WhatsApp messages about Nigerian events lack proper attribution",
    "Official government announcements are published on federal ministry websites",
    "Social media accounts with 'Nigeria' in the name are often not official sources",
    "Recent protests have been documented by multiple independent news organizations",
  ]

  // Select 3-5 random facts
  const factCount = 3 + Math.floor(random() * 3)
  const facts: string[] = []

  for (let i = 0; i < factCount; i++) {
    const index = Math.floor(random() * allFacts.length)
    facts.push(allFacts[index])
    allFacts.splice(index, 1) // Remove selected fact to avoid duplicates
  }

  return facts
}
