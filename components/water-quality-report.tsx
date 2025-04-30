"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { FileText, Loader2 } from "lucide-react"
import { jsPDF } from "jspdf"
import autoTable from "jspdf-autotable"

interface WaterQualityData {
  id: string
  region: string
  state: string
  qualityScore: number
  coordinates: {
    lat: number
    lng: number
  }
  boundingBox: {
    north: number
    south: number
    east: number
    west: number
  }
  parameters: {
    ph: number
    tds: number
    hardness: number
    chlorine: number
    turbidity: number
  }
  description: string
  recommendation: string
}

interface WaterQualityReportProps {
  regionData: WaterQualityData
  isUserRegion?: boolean
}

export function WaterQualityReport({ regionData, isUserRegion = false }: WaterQualityReportProps) {
  const [isGenerating, setIsGenerating] = useState(false)

  const getQualityCategory = (score: number): string => {
    if (score >= 90) return "Excellent"
    if (score >= 80) return "Good"
    if (score >= 70) return "Fair"
    if (score >= 60) return "Moderate"
    return "Poor"
  }

  const getParameterStatus = (parameter: string, value: number): string => {
    switch (parameter) {
      case "ph":
        if (Math.abs(value - 7.0) <= 0.5) return "Optimal"
        if (Math.abs(value - 7.0) <= 1.0) return "Good"
        if (Math.abs(value - 7.0) <= 1.5) return "Fair"
        return "Poor"
      case "tds":
        if (value <= 150) return "Optimal"
        if (value <= 250) return "Good"
        if (value <= 350) return "Fair"
        return "Poor"
      case "hardness":
        if (value <= 100) return "Soft (Optimal)"
        if (value <= 150) return "Moderately Hard (Good)"
        if (value <= 200) return "Hard (Fair)"
        return "Very Hard (Poor)"
      case "chlorine":
        if (value <= 0.5) return "Optimal"
        if (value <= 1.0) return "Good"
        if (value <= 2.0) return "Fair"
        return "Poor"
      case "turbidity":
        if (value <= 0.5) return "Optimal"
        if (value <= 1.0) return "Good"
        if (value <= 2.0) return "Fair"
        return "Poor"
      default:
        return "Unknown"
    }
  }

  const generatePDF = async () => {
    setIsGenerating(true)

    try {
      // Create a new PDF document
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      // Add header with logo
      doc.setFillColor(10, 20, 53) // Navy blue color
      doc.rect(0, 0, 210, 30, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(22)
      doc.text("WAVIO", 15, 15)
      doc.setFontSize(16)
      doc.text("Water Quality Report", 15, 23)

      // Add date
      const today = new Date()
      const dateStr = today.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
      doc.setFontSize(10)
      doc.text(`Generated on: ${dateStr}`, 130, 15)

      // Add region information
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(18)
      doc.text(`${regionData.region} Region Water Quality Report`, 15, 45)
      doc.setFontSize(12)
      doc.text(`State: ${regionData.state}`, 15, 55)

      // Add quality score
      doc.setFontSize(14)
      doc.text("Water Quality Score", 15, 70)

      // Draw quality score circle
      const scoreX = 40
      const scoreY = 85
      const scoreRadius = 15
      const qualityCategory = getQualityCategory(regionData.qualityScore)
      let scoreColor

      if (regionData.qualityScore >= 90)
        scoreColor = [16, 185, 129] // Green
      else if (regionData.qualityScore >= 80)
        scoreColor = [59, 130, 246] // Blue
      else if (regionData.qualityScore >= 70)
        scoreColor = [245, 158, 11] // Yellow
      else if (regionData.qualityScore >= 60)
        scoreColor = [249, 115, 22] // Orange
      else scoreColor = [239, 68, 68] // Red

      doc.setFillColor(scoreColor[0], scoreColor[1], scoreColor[2])
      doc.circle(scoreX, scoreY, scoreRadius, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(14)
      doc.text(regionData.qualityScore.toString(), scoreX - 4, scoreY + 2)

      // Add quality category
      doc.setTextColor(0, 0, 0)
      doc.setFontSize(12)
      doc.text(`Category: ${qualityCategory}`, 65, 85)

      // Add description
      doc.setFontSize(14)
      doc.text("Regional Water Profile", 15, 110)
      doc.setFontSize(11)

      // Split description into multiple lines if needed
      const splitDescription = doc.splitTextToSize(regionData.description, 180)
      doc.text(splitDescription, 15, 120)

      // Add water parameters table
      doc.setFontSize(14)
      doc.text("Water Quality Parameters", 15, 145)

      const parameterData = [
        ["Parameter", "Value", "Status", "Ideal Range"],
        [
          "pH Level",
          regionData.parameters.ph.toString(),
          getParameterStatus("ph", regionData.parameters.ph),
          "6.5 - 7.5",
        ],
        [
          "TDS",
          `${regionData.parameters.tds} ppm`,
          getParameterStatus("tds", regionData.parameters.tds),
          "50 - 150 ppm",
        ],
        [
          "Hardness",
          `${regionData.parameters.hardness} mg/L`,
          getParameterStatus("hardness", regionData.parameters.hardness),
          "60 - 120 mg/L",
        ],
        [
          "Chlorine",
          `${regionData.parameters.chlorine} mg/L`,
          getParameterStatus("chlorine", regionData.parameters.chlorine),
          "0.2 - 0.5 mg/L",
        ],
        [
          "Turbidity",
          `${regionData.parameters.turbidity} NTU`,
          getParameterStatus("turbidity", regionData.parameters.turbidity),
          "0.0 - 1.0 NTU",
        ],
      ]

      autoTable(doc, {
        startY: 150,
        head: [parameterData[0]],
        body: parameterData.slice(1),
        theme: "striped",
        headStyles: {
          fillColor: [59, 130, 246], // Blue
          textColor: [255, 255, 255],
        },
        styles: {
          fontSize: 10,
        },
        columnStyles: {
          0: { cellWidth: 40 },
          1: { cellWidth: 30 },
          2: { cellWidth: 50 },
          3: { cellWidth: 40 },
        },
      })

      // Add recommendation
      doc.setFontSize(14)
      doc.text("Recommendation", 15, 210)
      doc.setFontSize(11)
      const splitRecommendation = doc.splitTextToSize(regionData.recommendation, 180)
      doc.text(splitRecommendation, 15, 220)

      // Add health implications section
      doc.setFontSize(14)
      doc.text("Health Implications", 15, 235)
      doc.setFontSize(11)
      const healthImplications = `Water quality directly impacts health. ${
        regionData.qualityScore >= 80
          ? "The high quality water in this region generally supports good health and proper hydration."
          : "The water quality in this region may require additional treatment for optimal health benefits."
      } Regular hydration with clean water supports kidney function, cognitive performance, and overall wellbeing.`
      const splitHealthImplications = doc.splitTextToSize(healthImplications, 180)
      doc.text(splitHealthImplications, 15, 245)

      // Add footer
      doc.setFillColor(10, 20, 53) // Navy blue color
      doc.rect(0, 277, 210, 20, "F")
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(10)
      doc.text("© Wavio Water Delivery Service", 15, 287)
      doc.text("www.wavio.com | info@wavio.com | (234) 567-8900", 15, 292)

      // Save the PDF
      doc.save(`${regionData.region.toLowerCase().replace(/\s+/g, "-")}-water-quality-report.pdf`)
    } catch (error) {
      console.error("Error generating PDF:", error)
      alert("There was an error generating your PDF. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      variant="outline"
      className="w-full mt-4 border-blue-500 text-blue-500 hover:bg-blue-50"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating Report...
        </>
      ) : (
        <>
          <FileText className="h-4 w-4 mr-2" />
          Download Detailed Report
        </>
      )}
    </Button>
  )
}
