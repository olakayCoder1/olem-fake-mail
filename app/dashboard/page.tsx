import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertCircle,
  AlertTriangle,
  BarChart3,
  CheckCircle,
  FileText,
  ImageIcon,
  Newspaper,
  TrendingUpIcon as Trending,
} from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container max-w-6xl py-12 mx-auto px-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tighter">Fake News Dashboard</h1>
          <p className="text-gray-500">Monitor and analyze misinformation trends in Nigerian news</p>
        </div>
        <Button asChild>
          <Link href="/analyze">Analyze New Content</Link>
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Analyses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,248</div>
            <p className="text-xs text-muted-foreground">+24% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Fake Content Detected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">486</div>
            <p className="text-xs text-muted-foreground">39% of total content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Manipulated Media</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">312</div>
            <p className="text-xs text-muted-foreground">25% of total content</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Unreliable Sources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">174</div>
            <p className="text-xs text-muted-foreground">14% of total content</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mt-8 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Misinformation Trends</CardTitle>
            <CardDescription>Weekly analysis of fake news detection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-md border">
              <div className="text-center">
                <BarChart3 className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500">Trend visualization would appear here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle>Recent Analyses</CardTitle>
            <CardDescription>Latest content analyzed by the system</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Flood images from Lagos</p>
                  <p className="text-xs text-gray-500">Image • 25% authentic • 2 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                  <AlertTriangle className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Government policy announcement</p>
                  <p className="text-xs text-gray-500">Text • 65% authentic • 5 hours ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Election results from Abuja</p>
                  <p className="text-xs text-gray-500">URL • 92% authentic • 1 day ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                  <AlertCircle className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <p className="font-medium text-sm">Protest video from Port Harcourt</p>
                  <p className="text-xs text-gray-500">Video • 18% authentic • 2 days ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="all">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Content Analysis History</h2>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="text">Text</TabsTrigger>
              <TabsTrigger value="urls">URLs</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-4 font-medium">Content</th>
                        <th className="text-left p-4 font-medium">Type</th>
                        <th className="text-left p-4 font-medium">Source</th>
                        <th className="text-left p-4 font-medium">Score</th>
                        <th className="text-left p-4 font-medium">Date</th>
                        <th className="text-left p-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <ImageIcon className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-medium">Flooding in Lagos State</span>
                          </div>
                        </td>
                        <td className="p-4">Image</td>
                        <td className="p-4">Instagram</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span>25%</span>
                          </div>
                        </td>
                        <td className="p-4">2 hours ago</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/analyze/results?id=analysis_123">View</Link>
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <FileText className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-medium">Government policy announcement</span>
                          </div>
                        </td>
                        <td className="p-4">Text</td>
                        <td className="p-4">WhatsApp</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <AlertTriangle className="w-4 h-4 text-amber-500" />
                            <span>65%</span>
                          </div>
                        </td>
                        <td className="p-4">5 hours ago</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/analyze/results?id=analysis_124">View</Link>
                          </Button>
                        </td>
                      </tr>
                      <tr className="border-b">
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <Newspaper className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-medium">Election results from Abuja</span>
                          </div>
                        </td>
                        <td className="p-4">URL</td>
                        <td className="p-4">The Guardian Nigeria</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span>92%</span>
                          </div>
                        </td>
                        <td className="p-4">1 day ago</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/analyze/results?id=analysis_125">View</Link>
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td className="p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center">
                              <Trending className="w-4 h-4 text-gray-500" />
                            </div>
                            <span className="font-medium">Protest video from Port Harcourt</span>
                          </div>
                        </td>
                        <td className="p-4">Video</td>
                        <td className="p-4">Twitter</td>
                        <td className="p-4">
                          <div className="flex items-center gap-1">
                            <AlertCircle className="w-4 h-4 text-red-500" />
                            <span>18%</span>
                          </div>
                        </td>
                        <td className="p-4">2 days ago</td>
                        <td className="p-4">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href="/analyze/results?id=analysis_126">View</Link>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="images" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <ImageIcon className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Image analysis history would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="text" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <FileText className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">Text analysis history would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="urls" className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="text-center py-8">
                  <Newspaper className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-500">URL analysis history would appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
