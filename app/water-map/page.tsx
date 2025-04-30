import { WaterQualityMap } from "@/components/water-quality-map"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, FileText } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export default function WaterMapPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <AnimatedSection className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Water Quality Map</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Explore water quality data across different regions of the United States. This interactive map shows water
          quality scores and detailed parameters for each region, helping you understand how water quality varies
          geographically.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={200} className="max-w-5xl mx-auto mb-16">
        <WaterQualityMap />
      </AnimatedSection>

      <AnimatedSection delay={300} className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6">Understanding Regional Water Quality</h2>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-2">Why Water Quality Varies by Region</h3>
            <p className="text-gray-600 mb-4">
              Water quality varies significantly across different regions due to several factors including local
              geology, climate, industrial activity, agricultural practices, and water treatment methods.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Geological formations affect mineral content</li>
              <li>Agricultural runoff can introduce contaminants</li>
              <li>Urban areas may have different treatment standards</li>
              <li>Climate affects water sources and quality</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="font-bold text-lg mb-2">How We Adapt Our Products</h3>
            <p className="text-gray-600 mb-4">
              At Wavio, we understand that different regions have unique water profiles. That's why we offer specialized
              water products tailored to complement or improve upon your local water quality.
            </p>
            <ul className="list-disc pl-5 text-gray-600 space-y-1">
              <li>Mineral-enhanced water for soft water regions</li>
              <li>Purified water for areas with high mineral content</li>
              <li>Balanced pH formulations for acidic or alkaline regions</li>
              <li>Custom filtration solutions for specific regional concerns</li>
            </ul>
          </div>
        </div>

        <div className="mt-12">
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
            <div className="flex items-start">
              <FileText className="h-8 w-8 text-blue-500 mr-4 mt-1 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Downloadable Water Quality Reports</h3>
                <p className="text-gray-700 mb-4">
                  Select any region on the map to view detailed water quality information and download a comprehensive
                  PDF report. These reports include:
                </p>
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4">
                  <li>Complete water parameter analysis</li>
                  <li>Regional water quality assessment</li>
                  <li>Health implications of your water quality</li>
                  <li>Personalized product recommendations</li>
                  <li>Water quality improvement suggestions</li>
                </ul>
                <p className="text-gray-700">
                  Perfect for keeping records, sharing with family members, or consulting with health professionals
                  about your water quality.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h3 className="text-xl font-bold mb-4">Find the Perfect Water for Your Region</h3>
          <p className="text-gray-600 mb-6">
            Use our interactive map to discover which of our water products is best suited for your specific region.
            <span className="block mt-2 font-medium">
              Click the "Detect My Location" button to automatically find your region!
            </span>
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/water-calculator">
              <Button className="bg-blue-500 hover:bg-blue-600">Check Your Water Quality</Button>
            </Link>
            <Link href="/#choose-water">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                Explore Our Products
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
