import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { AlertCircle, AlertTriangle, CheckCircle } from "lucide-react"
import type { Finding } from "@/types/analysis"

interface AnalysisResultCardProps {
  title: string
  description: string
  score: number
  findings: Finding[]
  explanation: string
  relatedFacts?: string[]
}

export function AnalysisResultCard({
  title,
  description,
  score,
  findings,
  explanation,
  relatedFacts,
}: AnalysisResultCardProps) {
  const getVeracityText = () => {
    if (score >= 80) {
      return "Likely Authentic"
    } else if (score >= 40) {
      return "Possibly Misleading"
    } else {
      return "Likely Fake"
    }
  }

  const getVeracityColor = () => {
    if (score >= 80) {
      return "bg-green-100 text-green-800"
    } else if (score >= 40) {
      return "bg-amber-100 text-amber-800"
    } else {
      return "bg-red-100 text-red-800"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className={`px-3 py-1 rounded-full text-sm font-medium ${getVeracityColor()}`}>{getVeracityText()}</div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex flex-col items-center">
              {score >= 80 ? (
                <CheckCircle className="w-8 h-8 text-green-500" />
              ) : score >= 40 ? (
                <AlertTriangle className="w-8 h-8 text-amber-500" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-500" />
              )}
              <div className="mt-1 text-sm font-medium">{score}%</div>
              <div className="text-xs text-gray-500">Authenticity</div>
            </div>

            <div className="flex-1">
              <Progress value={score} className="h-2" />
            </div>
          </div>

          {findings && findings.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-3">Key Findings</h3>

              <div className="space-y-3">
                {findings.map((finding, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    {finding.type === "issue" ? (
                      <AlertCircle className="w-5 h-5 text-red-500 mt-0.5" />
                    ) : finding.type === "warning" ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    ) : (
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    )}
                    <div>
                      <p className="font-medium">{finding.title}</p>
                      <p className="text-sm text-gray-600">{finding.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <h3 className="font-medium text-lg mb-3">Detailed Analysis</h3>
            <p className="text-gray-700">{explanation}</p>
          </div>

          {relatedFacts && relatedFacts.length > 0 && (
            <div>
              <h3 className="font-medium text-lg mb-3">Verification Steps</h3>
              <ul className="space-y-2 list-disc list-inside text-gray-700">
                {relatedFacts.map((fact, index) => (
                  <li key={index}>{fact}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
