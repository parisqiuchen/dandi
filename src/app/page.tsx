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
          <span className="font-bold text-xl">Dandi</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:underline underline-offset-4" href="#features">
            Features
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
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <Badge variant="secondary" className="w-fit">
                    <Zap className="w-3 h-3 mr-1" />
                    AI-Powered Insights
                  </Badge>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unlock Deep Insights from Any GitHub Repository
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get comprehensive analysis, trending metrics, and actionable insights from open source repositories.
                    Track stars, pull requests, releases, and discover hidden gems in the GitHub ecosystem.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
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
              <div className="flex items-center justify-center">
                <Image
                  src="/placeholder.svg?height=400&width=600"
                  width="600"
                  height="400"
                  alt="Dandi GitHub Analyzer Dashboard"
                  className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Features</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Everything You Need to Analyze GitHub Repositories
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  From basic metrics to advanced insights, Dandi provides comprehensive analysis tools for developers,
                  researchers, and organizations.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
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

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <Badge variant="secondary">Pricing</Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Simple, Transparent Pricing
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Start free and scale as you grow. No hidden fees, no surprises.
                </p>
              </div>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 max-w-5xl mx-auto mt-12">
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
              <Card className="relative border-primary">
                <Badge className="absolute -top-2 left-1/2 -translate-x-1/2">Most Popular</Badge>
                <CardHeader>
                  <CardTitle className="text-2xl">Pro</CardTitle>
                  <CardDescription>For serious developers and teams</CardDescription>
                  <div className="text-4xl font-bold">
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
                  <Button variant="hero" className="w-full">Start Pro Trial</Button>
                </CardFooter>
              </Card>

              {/* Enterprise Tier */}
              <Card className="relative">
                <CardHeader>
                  <CardTitle className="text-2xl">Enterprise</CardTitle>
                  <CardDescription>For organizations and teams</CardDescription>
                  <div className="text-4xl font-bold">
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
                  <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200" variant="outline">
                    Contact Sales
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Ready to Discover GitHub Insights?
                </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join thousands of developers who use Dandi to make better decisions about open source projects.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
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
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-muted-foreground">© 2024 Dandi GitHub Analyzer. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
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
