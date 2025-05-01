"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

// Mock chat data
const initialMessages = [
  {
    id: 1,
    role: "assistant",
    content:
      "Hello! I'm your AI assistant for best practices. Ask me about workplace etiquette, programming standards, safety procedures, or any other best practices you'd like to learn about.",
  },
]

// Mock responses for demo purposes
const mockResponses: Record<string, string> = {
  coding:
    "When it comes to programming standards, it's important to follow consistent formatting, use meaningful variable names, write comprehensive documentation, and implement proper error handling. Regular code reviews and automated testing are also crucial best practices.",
  workplace:
    "Workplace etiquette includes clear communication, respecting colleagues' boundaries, being punctual for meetings, and maintaining a clean shared environment. It's also important to follow company policies and contribute positively to the workplace culture.",
  safety:
    "Safety procedures typically include proper equipment usage, regular training, clear emergency protocols, and consistent reporting of incidents or hazards. Always prioritize personal and team safety over expedience.",
  meeting:
    "Effective meeting practices include having a clear agenda, starting and ending on time, ensuring all voices are heard, documenting decisions, and assigning clear action items with owners and deadlines.",
  default:
    "That's a great question about best practices. Generally, best practices involve standardized procedures that have been proven effective through experience and research. They often focus on efficiency, safety, and quality outcomes.",
}

export default function ChatInterface() {
  const [messages, setMessages] = useState(initialMessages)
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  // Check for example prompt from home page
  useEffect(() => {
    if (typeof window !== "undefined") {
      const examplePrompt = sessionStorage.getItem("examplePrompt")
      if (examplePrompt) {
        setInput(examplePrompt)
        sessionStorage.removeItem("examplePrompt")
      }
    }
  }, [])

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault()

    if (!input.trim() || isTyping) return

    // Add user message
    const userMessage = { id: Date.now(), role: "user", content: input }
    setMessages([...messages, userMessage])
    setInput("")

    // Simulate bot typing
    setIsTyping(true)

    // Determine which mock response to use based on keywords
    let responseContent = mockResponses.default
    const lowerInput = input.toLowerCase()

    if (lowerInput.includes("code") || lowerInput.includes("programming")) {
      responseContent = mockResponses.coding
    } else if (lowerInput.includes("workplace") || lowerInput.includes("office")) {
      responseContent = mockResponses.workplace
    } else if (lowerInput.includes("safety") || lowerInput.includes("procedure")) {
      responseContent = mockResponses.safety
    } else if (lowerInput.includes("meeting")) {
      responseContent = mockResponses.meeting
    }

    // Simulate bot response after a delay
    setTimeout(() => {
      const botMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: responseContent,
      }
      setMessages((prev) => [...prev, botMessage])
      setIsTyping(false)
      inputRef.current?.focus()
    }, 1500)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-64px)]">
      {/* Chat messages */}
      <div className="flex-1 overflow-y-auto bg-white dark:bg-gm-darknavy p-4 md:p-0">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6 py-8">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn(
                    "px-4 py-6 md:px-6 md:py-8 border-b border-gray-100 dark:border-gm-navy",
                    message.role === "user" ? "bg-white dark:bg-gm-darknavy" : "bg-[#f7f7f8] dark:bg-gm-navy",
                  )}
                >
                  <div className="max-w-3xl mx-auto flex">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center mr-4 mt-1",
                        message.role === "user"
                          ? "bg-gm-darkgray text-white dark:bg-gray-300 dark:text-gray-800"
                          : "bg-gm-blue text-white",
                      )}
                    >
                      {message.role === "user" ? "U" : "AI"}
                    </div>
                    <div className="flex-1">{message.content}</div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="px-4 py-6 md:px-6 md:py-8 border-b border-gray-100 dark:border-gm-navy bg-[#f7f7f8] dark:bg-gm-navy"
              >
                <div className="max-w-3xl mx-auto flex">
                  <div className="w-7 h-7 rounded-full bg-gm-blue text-white flex items-center justify-center mr-4 mt-1">
                    AI
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gm-gray dark:bg-gm-lightblue/50"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gm-gray dark:bg-gm-lightblue/50"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0.2,
                        }}
                      />
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gm-gray dark:bg-gm-lightblue/50"
                        animate={{ y: [0, -5, 0] }}
                        transition={{
                          duration: 0.6,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "loop",
                          delay: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gm-navy bg-white dark:bg-gm-darknavy p-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex items-center gap-2">
            <Input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about best practices..."
              className="flex-1 border-gray-300 dark:border-gm-navy focus-visible:ring-gm-blue dark:focus-visible:ring-gm-blue"
              disabled={isTyping}
            />
            <Button
              type="submit"
              disabled={isTyping || !input.trim()}
              className="bg-gm-blue hover:bg-gm-darkblue text-white"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
            AI assistant provides advice on best practices based on general knowledge.
          </p>
        </div>
      </div>
    </div>
  )
}
