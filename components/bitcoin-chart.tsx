"use client"

import { useEffect, useRef } from "react"
import { Plus } from "lucide-react"
import { useTheme } from '@/context/theme-context'

export function BitcoinChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = canvas.offsetWidth * window.devicePixelRatio
    canvas.height = canvas.offsetHeight * window.devicePixelRatio
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio)

    // Draw chart
    const width = canvas.offsetWidth
    const height = canvas.offsetHeight

    // Generate random data points
    const points = 20
    const data = Array.from({ length: points }, () => Math.random() * 0.5 + 0.25)

    // Draw gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height)
    gradient.addColorStop(0, "rgba(124, 58, 237, 0.2)")
    gradient.addColorStop(1, "rgba(124, 58, 237, 0)")

    // Draw line
    ctx.beginPath()
    ctx.moveTo(0, height * (1 - data[0]))

    for (let i = 1; i < points; i++) {
      const x = (width / (points - 1)) * i
      const y = height * (1 - data[i])

      // Create a smooth curve
      const prevX = (width / (points - 1)) * (i - 1)
      const prevY = height * (1 - data[i - 1])

      const cpX1 = prevX + (x - prevX) / 3
      const cpX2 = prevX + ((x - prevX) * 2) / 3

      ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y)
    }

    // Complete the path for fill
    ctx.lineTo(width, height)
    ctx.lineTo(0, height)
    ctx.closePath()

    // Fill with gradient
    ctx.fillStyle = gradient
    ctx.fill()

    // Draw the line
    ctx.beginPath()
    ctx.moveTo(0, height * (1 - data[0]))

    for (let i = 1; i < points; i++) {
      const x = (width / (points - 1)) * i
      const y = height * (1 - data[i])

      const prevX = (width / (points - 1)) * (i - 1)
      const prevY = height * (1 - data[i - 1])

      const cpX1 = prevX + (x - prevX) / 3
      const cpX2 = prevX + ((x - prevX) * 2) / 3

      ctx.bezierCurveTo(cpX1, prevY, cpX2, y, x, y)
    }

    ctx.strokeStyle = "#8b5cf6"
    ctx.lineWidth = 2
    ctx.stroke()
  }, [])

  return (
    <div className={`p-8 ${theme === 'light' ? 'bg-white' : 'bg-gray-900'}`}>
      <h2 className={`text-2xl font-bold mb-6 ${theme === 'light' ? 'text-gray-800' : 'text-white'}`}>
        Bitcoin Price Analysis
      </h2>
      <div className="relative h-full w-full">
        <div className="absolute top-0 left-0 p-3 flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center">
            <Plus className="w-4 h-4" />
          </div>
          <div>
            <div className="text-sm font-medium">Bitcoin</div>
            <div className="text-xs text-gray-500">$29,850.15</div>
          </div>
        </div>
        <canvas ref={canvasRef} className="w-full h-full" style={{ width: "100%", height: "100%" }} />
      </div>
    </div>
  )
}

