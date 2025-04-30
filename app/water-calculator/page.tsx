import { WaterQualityCalculator } from "@/components/water-quality-calculator"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function WaterCalculatorPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <div className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Water Quality Calculator</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use our interactive tool to analyze your current water quality and get personalized recommendations. Adjust
          the parameters to match your water test results or use the default values for an estimate.
        </p>
      </div>

      <WaterQualityCalculator />

      <div className="mt-16 max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Understanding Water Quality Parameters</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-2">pH Level</h3>
            <p className="text-gray-600 mb-4">
              pH is a measure of how acidic or basic your water is on a scale from 0 to 14. A pH of 7 is neutral, below
              7 is acidic, and above 7 is basic.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Ideal range: 6.5-8.5</li>
              <li>Low pH: Can cause metal leaching from pipes</li>
              <li>High pH: Can cause bitter taste and scale buildup</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-2">Total Dissolved Solids (TDS)</h3>
            <p className="text-gray-600 mb-4">
              TDS measures the total concentration of dissolved substances in water, including minerals, salts, and
              metals.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Ideal range: 50-300 ppm</li>
              <li>Low TDS: Water may taste flat</li>
              <li>High TDS: Can affect taste and cause scale buildup</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-2">Water Hardness</h3>
            <p className="text-gray-600 mb-4">
              Water hardness is primarily caused by calcium and magnesium minerals dissolved in water.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Soft: 0-60 mg/L</li>
              <li>Moderately hard: 61-120 mg/L</li>
              <li>Hard: 121-180 mg/L</li>
              <li>Very hard: 180+ mg/L</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-2">Chlorine</h3>
            <p className="text-gray-600 mb-4">
              Chlorine is commonly used to disinfect water and kill harmful bacteria and viruses.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Ideal range: 0.2-1.0 mg/L</li>
              <li>EPA maximum: 4.0 mg/L</li>
              <li>High levels can cause taste and odor issues</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Ready to improve your water quality?</h3>
          <p className="text-gray-600 mb-6">
            Our water delivery service provides pure, high-quality water that meets or exceeds all quality standards.
          </p>
          <Link href="/#choose-water">
            <Button className="bg-blue-500 hover:bg-blue-600">Explore Our Water Options</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
