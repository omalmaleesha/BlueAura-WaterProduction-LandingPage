"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle, CheckCircle, HelpCircle, Info, Droplet } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

interface WaterParameter {
  name: string
  value: number
  min: number
  max: number
  ideal: number
  unit: string
  description: string
}

export function WaterQualityCalculator() {
  const [parameters, setParameters] = useState<WaterParameter[]>([
    {
      name: "pH Level",
      value: 7.2,
      min: 0,
      max: 14,
      ideal: 7.5,
      unit: "",
      description: "pH measures how acidic or basic your water is. The ideal range for drinking water is 6.5-8.5.",
    },
    {
      name: "TDS (Total Dissolved Solids)",
      value: 150,
      min: 0,
      max: 1000,
      ideal: 150,
      unit: "ppm",
      description:
        "TDS measures the total concentration of dissolved substances in water. Ideal drinking water has 50-300 ppm.",
    },
    {
      name: "Hardness",
      value: 120,
      min: 0,
      max: 500,
      ideal: 100,
      unit: "mg/L",
      description:
        "Water hardness is caused by calcium and magnesium minerals. Soft water has 0-60 mg/L, moderately hard has 61-120 mg/L.",
    },
    {
      name: "Chlorine",
      value: 0.5,
      min: 0,
      max: 4,
      ideal: 0.5,
      unit: "mg/L",
      description:
        "Chlorine is commonly used to disinfect water. The EPA recommends levels up to 4 mg/L, but ideal is around 0.5 mg/L.",
    },
    {
      name: "Turbidity",
      value: 1,
      min: 0,
      max: 10,
      ideal: 0.5,
      unit: "NTU",
      description:
        "Turbidity measures water clarity. The lower the turbidity, the clearer the water. Drinking water should be below 1 NTU.",
    },
  ])

  const [activeTab, setActiveTab] = useState("calculator")

  const handleSliderChange = (index: number, newValue: number[]) => {
    const updatedParameters = [...parameters]
    updatedParameters[index].value = newValue[0]
    setParameters(updatedParameters)
  }

  const calculateQualityScore = (): number => {
    let totalScore = 0

    parameters.forEach((param) => {
      // Calculate how close the value is to the ideal (as a percentage)
      const range = param.max - param.min
      const deviation = Math.abs(param.value - param.ideal)
      const paramScore = 100 - (deviation / range) * 100

      // Add to total score
      totalScore += paramScore
    })

    // Return average score (0-100)
    return Math.round(totalScore / parameters.length)
  }

  const qualityScore = calculateQualityScore()

  const getQualityCategory = (score: number): { label: string; color: string; icon: JSX.Element } => {
    if (score >= 90) {
      return { label: "Excellent", color: "text-green-500", icon: <CheckCircle className="h-5 w-5" /> }
    } else if (score >= 75) {
      return { label: "Good", color: "text-blue-500", icon: <Droplet className="h-5 w-5" /> }
    } else if (score >= 50) {
      return { label: "Fair", color: "text-yellow-500", icon: <Info className="h-5 w-5" /> }
    } else {
      return { label: "Poor", color: "text-red-500", icon: <AlertCircle className="h-5 w-5" /> }
    }
  }

  const qualityCategory = getQualityCategory(qualityScore)

  const getRecommendation = (score: number): string => {
    if (score >= 90) {
      return "Your water quality is excellent! Our premium mineral water would be a perfect match for your taste preferences."
    } else if (score >= 75) {
      return "Your water quality is good. Consider our enhanced mineral water to maintain optimal hydration and taste."
    } else if (score >= 50) {
      return "Your water quality is fair. We recommend our purified water with added minerals for better taste and health benefits."
    } else {
      return "Your water quality needs improvement. Our premium filtered water delivery service would significantly enhance your water quality."
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl flex items-center">
          <Droplet className="h-6 w-6 text-blue-500 mr-2" />
          Water Quality Calculator
        </CardTitle>
        <CardDescription>
          Analyze your current water quality and get personalized recommendations for improvement
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="calculator">Calculator</TabsTrigger>
            <TabsTrigger value="results">Results & Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="calculator" className="space-y-6 pt-4">
            <div className="space-y-6">
              {parameters.map((param, index) => (
                <div key={param.name} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label htmlFor={`param-${index}`} className="text-sm font-medium flex items-center">
                      {param.name}
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-6 w-6 p-0 ml-1">
                            <HelpCircle className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>{param.name}</DialogTitle>
                            <DialogDescription>{param.description}</DialogDescription>
                          </DialogHeader>
                        </DialogContent>
                      </Dialog>
                    </Label>
                    <div className="flex items-center">
                      <span className="font-medium text-blue-500">{param.value}</span>
                      <span className="text-sm text-muted-foreground ml-1">{param.unit}</span>
                    </div>
                  </div>
                  <Slider
                    id={`param-${index}`}
                    min={param.min}
                    max={param.max}
                    step={(param.max - param.min) / 100}
                    value={[param.value]}
                    onValueChange={(value) => handleSliderChange(index, value)}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Min: {param.min}</span>
                    <span className="text-blue-500">Ideal: {param.ideal}</span>
                    <span>Max: {param.max}</span>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="results" className="pt-4">
            <div className="space-y-6">
              <div className="flex flex-col items-center justify-center py-6">
                <div className="relative mb-4">
                  <svg className="w-32 h-32">
                    <circle
                      className="text-gray-200"
                      strokeWidth="10"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                    />
                    <circle
                      className="text-blue-500"
                      strokeWidth="10"
                      strokeDasharray={360}
                      strokeDashoffset={360 - (qualityScore / 100) * 360}
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="transparent"
                      r="56"
                      cx="64"
                      cy="64"
                      style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-3xl font-bold">{qualityScore}</span>
                  </div>
                </div>
                <div className={`text-lg font-semibold flex items-center ${qualityCategory.color}`}>
                  {qualityCategory.icon}
                  <span className="ml-1">{qualityCategory.label}</span>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Recommendation</h3>
                <p>{getRecommendation(qualityScore)}</p>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-lg">Parameter Analysis</h3>
                {parameters.map((param) => {
                  const deviation = Math.abs(param.value - param.ideal)
                  const maxDeviation = Math.max(param.ideal - param.min, param.max - param.ideal)
                  const deviationPercentage = (deviation / maxDeviation) * 100
                  let status = "Optimal"
                  let statusColor = "text-green-500"

                  if (deviationPercentage > 70) {
                    status = "Poor"
                    statusColor = "text-red-500"
                  } else if (deviationPercentage > 30) {
                    status = "Fair"
                    statusColor = "text-yellow-500"
                  } else if (deviationPercentage > 10) {
                    status = "Good"
                    statusColor = "text-blue-500"
                  }

                  return (
                    <div key={param.name} className="flex justify-between items-center">
                      <span>{param.name}</span>
                      <span className={`font-medium ${statusColor}`}>{status}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setActiveTab("calculator")}>
          Adjust Parameters
        </Button>
        <Button onClick={() => setActiveTab("results")}>View Results</Button>
      </CardFooter>
    </Card>
  )
}
