'use client';

import { Button } from "../components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Github, Star, GitPullRequest, Package, BarChart3, Zap, Shield, Check, ArrowRight } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import AuthButton from "../components/AuthButton"
import { useSession } from "next-auth/react"

export default function LandingPage() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="px-4 lg:px-6 h-14 flex items-center border-b">
        <Link className="flex items-center justify-center" href="/">
          <Github className="h-6 w-6 mr-2" />
          <span className="font-bold text-lg sm:text-xl">Dandi</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#try-it-out">
            Try it out
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#pricing">
            Pricing
          </Link>
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#about">
            About
          </Link>
        </nav>
        <div className="flex items-center gap-2 ml-4">
          <AuthButton />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered Insights
                  </Badge>
                  <h1 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl/none">
                    Unlock Deep Insights from Any GitHub Repository
                  </h1>
                  <p className="max-w-[600px] text-sm sm:text-base text-muted-foreground md:text-xl">
                    Get comprehensive analysis, trending metrics, and actionable insights from open source repositories.
                    Track stars, pull requests, releases, and discover hidden gems in the GitHub ecosystem.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                  {session ? (
                    <>
                      <Link href="/dashboards">
                        <Button variant="hero" size="lg" className="h-11">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href="/background">
                        <Button variant="outline" size="lg" className="h-11 bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:border-purple-500">
                          API Playground
                        </Button>
                      </Link>
                    </>
                  ) : (
                    <>
                      <AuthButton />
                      <Button variant="outline" size="lg" className="h-11 bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:border-purple-500">
                        View Demo
                      </Button>
                    </>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-500" />
                    {session ? "Dashboard access enabled" : "Free tier available"}
                  </div>
                  <div className="flex items-center gap-1">
                    <Check className="h-4 w-4 text-green-500" />
                    {session ? "AI-powered insights" : "No credit card required"}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center order-1 lg:order-2">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="Dandi GitHub Analyzer Dashboard"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center w-full max-w-sm sm:max-w-md lg:max-w-none"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Features</Badge>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Everything You Need to Analyze GitHub Repositories
                </h2>
                <p className="max-w-[900px] text-sm sm:text-base text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From basic metrics to advanced insights, Dandi provides comprehensive analysis tools for developers,
                  researchers, and organizations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-4 sm:gap-6 py-8 sm:py-12 grid-cols-1 md:grid-cols-2 lg:gap-12">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <BarChart3 className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Repository Summary & Analytics</CardTitle>
                    <CardDescription>
                      Get comprehensive overviews including contributor statistics, commit patterns, and growth trends.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Star className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Star Tracking & Trends</CardTitle>
                    <CardDescription>
                      Monitor star growth, identify viral moments, and track popularity trends over time.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <GitPullRequest className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Pull Request Insights</CardTitle>
                    <CardDescription>
                      Analyze important PRs, merge patterns, and contributor activity to understand project health.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <Package className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Version & Release Tracking</CardTitle>
                    <CardDescription>
                      Stay updated with latest releases, version history, and breaking changes across repositories.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Zap className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Cool Facts & Discoveries</CardTitle>
                    <CardDescription>
                      Uncover interesting patterns, hidden gems, and surprising insights about any repository.
                    </CardDescription>
                  </CardHeader>
                </Card>
                <Card>
                  <CardHeader>
                    <Shield className="h-8 w-8 mb-2 text-primary" />
                    <CardTitle>Security & Quality Metrics</CardTitle>
                    <CardDescription>
                      Assess code quality, security practices, and maintenance status of open source projects.
                    </CardDescription>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Try it out Section */}
        <section id="try-it-out" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 sm:mb-12">
              <div className="space-y-2">
                <Badge variant="secondary">
                  <Zap className="w-3 h-3 mr-1" />
                  Try it out
                </Badge>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  See Dandi in Action
                </h2>
                <p className="max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Experience the power of AI-driven GitHub analysis. Enter any repository URL and get instant insights.
                </p>
              </div>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
                {/* Input Box */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Github className="h-5 w-5" />
                      Repository Input
                    </CardTitle>
                    <CardDescription>
                      Enter a GitHub repository URL to analyze
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GitHub Repository URL</label>
                      <div className="relative">
                        <input
                          type="url"
                          placeholder="https://github.com/owner/repository"
                          value="https://github.com/facebook/react"
                          readOnly
                          className="w-full px-3 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Demo shows analysis for Facebook&apos;s React repository
                      </p>
                    </div>

                    <div className="pt-4">
                      {session ? (
                        <Link href="/background" className="w-full">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-base py-6">
                            🔍 Try the Real Playground
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      ) : (
                        <Link href="/auth/signin" className="w-full">
                          <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium text-base py-6">
                            🔐 Sign in to Try
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Results Box */}
                <Card className="h-fit">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Analysis Results
                    </CardTitle>
                    <CardDescription>
                      AI-powered insights and repository metrics
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Repository Info */}
                    <div className="grid grid-cols-3 gap-3">
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <div className="text-yellow-800 font-semibold text-xs">⭐ Stars</div>
                        <div className="text-lg font-bold text-yellow-900">223,000</div>
                      </div>
                      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                        <div className="text-green-800 font-semibold text-xs">🏷️ Version</div>
                        <div className="text-sm font-bold text-green-900">v18.3.1</div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <div className="text-blue-800 font-semibold text-xs">📜 License</div>
                        <div className="text-sm font-bold text-blue-900">MIT</div>
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                        <span>📝</span>
                        <span className="text-sm">Summary</span>
                      </h4>
                      <p className="text-gray-700 text-xs leading-relaxed">
                        React is a JavaScript library for building user interfaces, maintained by Meta. 
                        It&apos;s component-based, declarative, and designed for creating interactive UIs with minimal effort.
                      </p>
                    </div>

                    {/* Cool Facts */}
                    <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
                      <h4 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                        <span>✨</span>
                        <span className="text-sm">Cool Facts</span>
                      </h4>
                      <ul className="space-y-1">
                        <li className="text-purple-800 flex items-start gap-2 text-xs">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>Powers websites of Netflix, Instagram, and Airbnb</span>
                        </li>
                        <li className="text-purple-800 flex items-start gap-2 text-xs">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>Over 1,700 contributors from around the world</span>
                        </li>
                        <li className="text-purple-800 flex items-start gap-2 text-xs">
                          <span className="text-purple-600 mt-1">•</span>
                          <span>First released in 2013, revolutionized web development</span>
                        </li>
                      </ul>
                    </div>

                    <div className="pt-2">
                      <p className="text-xs text-center text-muted-foreground">
                        {session ? "Access the full playground to analyze any repository" : "Sign in to analyze any repository you want"}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-8 sm:py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Pricing</Badge>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-sm sm:text-base text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start free and scale as you grow. No hidden fees, no surprises.
                </p>
              </div>
            </div>
            <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 max-w-5xl mx-auto mt-8 sm:mt-12">
              {/* Free Tier */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-2xl">Free</CardTitle>
                  <CardDescription>Perfect for getting started</CardDescription>
                  <div className="text-4xl font-bold">
                    $0<span className="text-base font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />5 repository analyses per month
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Basic insights and summaries
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Star tracking
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Community support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  {session ? (
                    <Link href="/dashboards" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white hover:from-green-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200">
                        Go to Dashboard
                      </Button>
                    </Link>
                  ) : (
                    <AuthButton />
                  )}
                </CardFooter>
              </Card>

              {/* Pro Tier */}
              <Card className="relative border-primary opacity-75">
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Most Popular</Badge>
                <Badge variant="coming-soon" className="absolute -top-2 -right-2">Coming Soon</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-600">Pro</CardTitle>
                  <CardDescription>For serious developers and teams</CardDescription>
                  <div className="text-4xl font-bold text-gray-600">
                    $19<span className="text-base font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      100 repository analyses per month
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Advanced insights and trends
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      PR and release tracking
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Export reports (PDF, CSV)
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Priority support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" disabled className="w-full opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card className="relative opacity-75">
                <Badge variant="coming-soon" className="absolute -top-2 -right-2">Coming Soon</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-600">Enterprise</CardTitle>
                  <CardDescription>For organizations and teams</CardDescription>
                  <div className="text-4xl font-bold text-gray-600">
                    $99<span className="text-base font-normal text-muted-foreground">/month</span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Unlimited analyses
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Custom integrations
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Team collaboration tools
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      API access
                    </li>
                    <li className="flex items-center">
                      <Check className="mr-2 h-4 w-4 text-green-500" />
                      Dedicated support
                    </li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" disabled className="w-full opacity-50 cursor-not-allowed">
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-8 sm:py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl md:text-4xl lg:text-5xl">
                  Ready to Discover GitHub Insights?
                </h2>
                <p className="mx-auto max-w-[600px] text-sm sm:text-base text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who use Dandi to make better decisions about open source projects.
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row sm:gap-2">
                {session ? (
                  <>
                                         <Link href="/dashboards">
                      <Button variant="hero" size="lg" className="h-12 px-8">
                        Go to Dashboard
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                     </Link>
                                         <Link href="/background">
                       <Button variant="outline" size="lg" className="h-12 px-8 bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:border-purple-500">
                         Try API Playground
                       </Button>
                     </Link>
                  </>
                ) : (
                  <>
                    <AuthButton />
                                         <Button variant="outline" size="lg" className="h-12 px-8 bg-white/80 backdrop-blur-sm border-purple-300 text-purple-700 hover:border-purple-500">
                       Schedule Demo
                     </Button>
                  </>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                No credit card required • Free tier available • Cancel anytime
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="flex flex-col gap-3 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground text-center sm:text-left">© 2024 Dandi GitHub Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex flex-wrap justify-center sm:justify-end gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Terms of Service
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Privacy Policy
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contact
          </Link>
        </nav>
      </footer>
    </div>
  )
}
