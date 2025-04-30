import { WaterSourceVisualization } from "@/components/water-source-visualization"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft, Droplet, Mountain, Waves } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"

export default function WaterSourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-600">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>

      <AnimatedSection className="max-w-5xl mx-auto mb-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Water Source Explorer</h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Discover the journey of water from source to tap. Learn about different water sources across regions and how
          they impact water quality, taste, and mineral content.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={200} className="max-w-5xl mx-auto mb-16">
        <WaterSourceVisualization />
      </AnimatedSection>

      <AnimatedSection delay={300} className="max-w-4xl mx-auto mt-16">
        <h2 className="text-2xl font-bold mb-6">The Journey of Water</h2>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Mountain className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg">Source</h3>
            </div>
            <p className="text-gray-600">
              Water begins its journey from natural sources like springs, aquifers, lakes, rivers, or glaciers. Each
              source imparts unique characteristics to the water.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Waves className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg">Treatment</h3>
            </div>
            <p className="text-gray-600">
              Water undergoes various treatment processes depending on its source and quality. This may include
              filtration, disinfection, softening, and mineral adjustment.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="flex items-center mb-4">
              <div className="bg-blue-100 p-3 rounded-full mr-3">
                <Droplet className="h-6 w-6 text-blue-500" />
              </div>
              <h3 className="font-bold text-lg">Delivery</h3>
            </div>
            <p className="text-gray-600">
              Treated water is delivered to homes and businesses through distribution systems. The water's final quality
              depends on both its source and the treatment processes used.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-100 mb-12">
          <h3 className="text-xl font-bold mb-4">How Water Sources Affect Quality</h3>
          <div className="space-y-4">
            <p>
              The source of your water significantly impacts its taste, mineral content, and overall quality. Natural
              springs and glacial sources often provide the purest water with balanced mineral content, while aquifers
              may contribute to harder water with higher mineral concentrations.
            </p>
            <p>
              Surface water from lakes and rivers typically requires more extensive treatment due to exposure to
              environmental factors. The geological features of each region also play a crucial role in determining
              water characteristics.
            </p>
            <p>
              At Wavio, we carefully select water sources that provide optimal mineral content and purity, ensuring you
              receive the highest quality water possible for your health and enjoyment.
            </p>
          </div>
        </div>

        <div className="text-center">
          <h3 className="text-xl font-bold mb-4">Explore More Water Quality Resources</h3>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/water-map">
              <Button className="bg-blue-500 hover:bg-blue-600">
                <Droplet className="h-4 w-4 mr-2" />
                Water Quality Map
              </Button>
            </Link>
            <Link href="/water-calculator">
              <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                Water Quality Calculator
              </Button>
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </div>
  )
}
