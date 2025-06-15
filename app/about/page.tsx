import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Database, Zap, Globe, Github, Twitter } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container max-w-4xl py-12 md:py-24 mx-auto px-4">
      <div className="space-y-6 text-center">
        <h1 className="text-3xl font-bold tracking-tighter md:text-4xl">About TruthGuard</h1>
        <p className="text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed max-w-[600px] mx-auto">
          Our mission is to combat the spread of misinformation across Nigerian news channels and social media
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mt-16 items-start">
        <div className="space-y-6">
          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Our Mission</h2>
            <p className="text-gray-600">
              TruthGuard was created to address the growing problem of fake news and misinformation in Nigerian media.
              Our platform uses advanced AI technology to help users verify the authenticity of news content, including
              images, videos, and text.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">How It Works</h2>
            <p className="text-gray-600">Our system combines multiple verification techniques:</p>
            <ul className="space-y-3">
              <li className="flex gap-2">
                <Database className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Reference Database</p>
                  <p className="text-sm text-gray-600">
                    Maintains a comprehensive database of verified Nigerian news sources and historical content.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <Zap className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">AI Analysis</p>
                  <p className="text-sm text-gray-600">
                    Uses computer vision and natural language processing to detect manipulated media and misleading
                    content.
                  </p>
                </div>
              </li>
              <li className="flex gap-2">
                <Globe className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">Source Verification</p>
                  <p className="text-sm text-gray-600">
                    Cross-references information with trusted Nigerian news outlets and fact-checking organizations.
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-2xl font-bold">Future Expansion</h2>
            <p className="text-gray-600">
              While our initial focus is on Nigerian news sources, our platform is designed for scalability. We are
              actively working to expand our coverage to include more news sources across Africa and eventually
              worldwide.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-gray-50 p-6 rounded-lg border">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="w-8 h-8 text-emerald-600" />
              <h2 className="text-xl font-bold">TruthGuard</h2>
            </div>
            <div className="space-y-4">
              <p className="text-gray-600">
                Founded in 2023, TruthGuard is committed to promoting media literacy and combating the spread of fake
                news.
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1" asChild>
                  <Link href="https://github.com">
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </Link>
                </Button>
                <Button variant="outline" size="sm" className="gap-1" asChild>
                  <Link href="https://twitter.com">
                    <Twitter className="w-4 h-4" />
                    <span>Twitter</span>
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Our Team</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <div className="w-16 h-16 bg-emerald-100 rounded-full mb-3 flex items-center justify-center mx-auto">
                  <span className="font-bold text-emerald-600">OA</span>
                </div>
                <div className="text-center">
                  <p className="font-medium">Oluwaseun Ajayi</p>
                  <p className="text-sm text-gray-500">Lead AI Engineer</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="w-16 h-16 bg-emerald-100 rounded-full mb-3 flex items-center justify-center mx-auto">
                  <span className="font-bold text-emerald-600">CN</span>
                </div>
                <div className="text-center">
                  <p className="font-medium">Chioma Nwosu</p>
                  <p className="text-sm text-gray-500">Data Scientist</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="w-16 h-16 bg-emerald-100 rounded-full mb-3 flex items-center justify-center mx-auto">
                  <span className="font-bold text-emerald-600">KO</span>
                </div>
                <div className="text-center">
                  <p className="font-medium">Kayode Ogunleye</p>
                  <p className="text-sm text-gray-500">News Researcher</p>
                </div>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <div className="w-16 h-16 bg-emerald-100 rounded-full mb-3 flex items-center justify-center mx-auto">
                  <span className="font-bold text-emerald-600">FI</span>
                </div>
                <div className="text-center">
                  <p className="font-medium">Fatima Ibrahim</p>
                  <p className="text-sm text-gray-500">UI/UX Designer</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 bg-emerald-50 rounded-lg border border-emerald-100">
            <h3 className="text-lg font-medium text-emerald-800 mb-2">Partner With Us</h3>
            <p className="text-sm text-emerald-700 mb-4">
              We're looking to collaborate with Nigerian news organizations, fact-checking initiatives, and technology
              partners.
            </p>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
