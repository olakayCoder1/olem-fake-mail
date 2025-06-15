import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Upload, Globe, Info, BarChart3 } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="border-b">
        <div className="container flex items-center justify-between h-16 mx-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-emerald-600" />
            <span className="text-xl font-bold">TruthGuard</span>
          </Link>
          <nav className="hidden space-x-6 md:flex">
            <Link className="text-sm font-medium hover:underline" href="/">
              Home
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/analyze">
              Analyze Content
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/about">
              About
            </Link>
            <Link className="text-sm font-medium hover:underline" href="/resources">
              Resources
            </Link>
          </nav>
          <Button asChild>
            <Link href="/analyze">Start Detection</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-b from-white to-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Combat Misinformation in Nigerian News
                </h1>
                <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  TruthGuard helps you detect fake news, manipulated images, and misleading videos spreading across
                  Nigerian news channels and social media.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild size="lg">
                    <Link href="/analyze">Analyze Content</Link>
                  </Button>
                  <Button variant="outline" size="lg" asChild>
                    <Link href="/learn">How It Works</Link>
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative w-full max-w-md">
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg transform rotate-1 opacity-20"></div>
                  <div className="relative bg-white p-6 rounded-lg shadow-lg">
                    <div className="space-y-4">
                      <h3 className="text-xl font-bold">Recently Debunked</h3>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <Info className="w-4 h-4 text-red-500" />
                          <p className="text-sm">Fake flood images circulating on WhatsApp</p>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <Info className="w-4 h-4 text-red-500" />
                          <p className="text-sm">Doctored political speech video from Lagos rally</p>
                        </div>
                        <div className="flex items-center gap-2 p-2 bg-red-50 rounded">
                          <Info className="w-4 h-4 text-red-500" />
                          <p className="text-sm">Misleading headline about national policy change</p>
                        </div>
                      </div>
                      <Button variant="link" className="p-0" asChild>
                        <Link href="/recent">View all recent checks</Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">How TruthGuard Works</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
                Our platform uses advanced AI technology to analyze and verify the authenticity of news content from
                Nigerian sources.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-emerald-100">
                      <Upload className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Submit Content</h3>
                    <p className="text-gray-500">
                      Upload an image, video, URL, or text from Nigerian news sources for analysis.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-emerald-100">
                      <BarChart3 className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">AI Analysis</h3>
                    <p className="text-gray-500">
                      Our algorithms check for manipulation, inconsistencies, and verification against trusted sources.
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="p-3 rounded-full bg-emerald-100">
                      <Globe className="w-6 h-6 text-emerald-600" />
                    </div>
                    <h3 className="text-xl font-bold">Get Results</h3>
                    <p className="text-gray-500">
                      Receive a detailed report with an authenticity score and explanation of our findings.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-24 lg:py-32 bg-gray-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Designed for Growth</h2>
              <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[800px] mx-auto">
                TruthGuard is built with scalability in mind, allowing for expansion to additional news sources beyond
                Nigeria.
              </p>
            </div>
            <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-4">
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-white">
                <p className="text-2xl font-bold">94%</p>
                <p className="text-sm text-gray-500 text-center">Accuracy in detecting manipulated images</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-white">
                <p className="text-2xl font-bold">50+</p>
                <p className="text-sm text-gray-500 text-center">Nigerian news sources monitored</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-white">
                <p className="text-2xl font-bold">12k+</p>
                <p className="text-sm text-gray-500 text-center">Content pieces analyzed monthly</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 border rounded-lg bg-white">
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-gray-500 text-center">Different verification methods</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t">
        <div className="container flex flex-col gap-4 py-10 mx-auto md:flex-row md:justify-between">
          <div className="flex flex-col gap-2">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-emerald-600" />
              <span className="font-bold">TruthGuard</span>
            </Link>
            <p className="text-sm text-gray-500">Fighting misinformation across Nigerian news channels.</p>
          </div>
          <div className="flex gap-8">
            <div className="flex flex-col gap-2">
              <p className="font-medium">Platform</p>
              <Link className="text-sm hover:underline" href="/analyze">
                Analyze Content
              </Link>
              <Link className="text-sm hover:underline" href="/recent">
                Recent Checks
              </Link>
              <Link className="text-sm hover:underline" href="/trends">
                Misinformation Trends
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-medium">Company</p>
              <Link className="text-sm hover:underline" href="/about">
                About Us
              </Link>
              <Link className="text-sm hover:underline" href="/contact">
                Contact
              </Link>
              <Link className="text-sm hover:underline" href="/privacy">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
