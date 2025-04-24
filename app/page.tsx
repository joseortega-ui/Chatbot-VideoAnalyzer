import Link from "next/link"
import { MessageSquare, BarChart2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import ExamplePrompts from "@/components/example-prompts"

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-64px)] bg-white dark:bg-[#1a1a1a]">
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-8">
        <div className="max-w-3xl w-full mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">AI Tools Platform</h1>
          <p className="text-xl text-muted-foreground">
            Get best practice advice and analyze video sentiment with our AI-powered tools
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/chat">
              <Button
                size="lg"
                className="w-full sm:w-auto gap-2 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                <MessageSquare className="h-5 w-5" />
                AI Best Practices Chatbot
              </Button>
            </Link>
            <Link href="/analyzer">
              <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2">
                <BarChart2 className="h-5 w-5" />
                Video Sentiment Analyzer
              </Button>
            </Link>
          </div>
        </div>

        <div className="w-full max-w-3xl mt-16">
          <h2 className="text-center text-lg font-medium mb-6">Examples</h2>
          <ExamplePrompts />
        </div>
      </div>

      <footer className="border-t border-gray-200 dark:border-gray-800 py-4 text-center text-sm text-muted-foreground">
        <div className="max-w-3xl mx-auto">
          AI Tools Platform — Get advice on best practices and analyze video sentiment
        </div>
      </footer>
    </div>
  )
}
