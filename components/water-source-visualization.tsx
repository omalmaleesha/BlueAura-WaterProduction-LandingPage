"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Droplet, Mountain, Waves, Cloud, Filter, Info } from "lucide-react"
import { AnimatedSection } from "@/components/animated-section"
import Image from "next/image"

interface WaterSourceData {
  id: string
  name: string
  icon: React.ReactNode
  description: string
  qualityImpact: string
  mineralContent: string
  filtrationProcess: string
  regions: string[]
  image: string
}

const waterSources: WaterSourceData[] = [
  {
    id: "spring",
    name: "Natural Springs",
    icon: <Mountain className="h-5 w-5" />,
    description:
      "Natural springs occur when water from an aquifer flows naturally to the surface. Spring water is often naturally filtered through layers of rock and soil, giving it a unique mineral composition.",
    qualityImpact:
      "Spring water typically has excellent clarity and purity. It often contains beneficial minerals and has a balanced pH level. The quality can vary based on the geological formations the water passes through.",
    mineralContent:
      "Springs often contain calcium, magnesium, potassium, and sodium in varying amounts. The mineral content depends on the rocks and soil the water contacts during its journey.",
    filtrationProcess:
      "Natural springs undergo natural filtration as water percolates through layers of soil, sand, and rock. This process can take decades and removes many impurities while adding minerals.",
    regions: ["Northwest", "Alaska", "Hawaii", "West"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "aquifer",
    name: "Underground Aquifers",
    icon: <Droplet className="h-5 w-5" />,
    description:
      "Aquifers are underground layers of water-bearing permeable rock or unconsolidated materials (sand, gravel) from which groundwater can be extracted. They serve as vast natural reservoirs.",
    qualityImpact:
      "Aquifer water is typically well-protected from surface contaminants and has consistent quality. It may have higher mineral content due to prolonged contact with rocks and soil.",
    mineralContent:
      "Aquifer water often contains higher levels of minerals like calcium and magnesium, contributing to water hardness. Iron, manganese, and sulfur compounds may also be present depending on the geology.",
    filtrationProcess:
      "Water in aquifers is filtered naturally as it moves through soil and rock layers. This slow process removes many contaminants but can also introduce minerals from the surrounding geology.",
    regions: ["Midwest", "Southwest", "Southeast", "Northeast"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "lake",
    name: "Lakes & Reservoirs",
    icon: <Waves className="h-5 w-5" />,
    description:
      "Lakes and reservoirs are large bodies of standing water that serve as important freshwater sources. Reservoirs are man-made lakes created by damming rivers to store water for various uses.",
    qualityImpact:
      "Lake water quality can vary seasonally and is affected by surrounding land use. It typically requires more treatment than groundwater due to exposure to environmental factors.",
    mineralContent:
      "Lakes generally have moderate mineral content. The composition depends on the watershed geology, surrounding land use, and water inputs from rivers and streams.",
    filtrationProcess:
      "Lakes provide some natural filtration through settling of particles and biological processes. However, they require additional treatment to remove contaminants, algae, and organic matter.",
    regions: ["Northeast", "Midwest", "West"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "river",
    name: "Rivers & Streams",
    icon: <Waves className="h-5 w-5" />,
    description:
      "Rivers and streams are flowing bodies of water that serve as important water sources for many communities. They are part of the larger water cycle and connect to lakes, oceans, and groundwater.",
    qualityImpact:
      "River water quality can vary significantly based on seasonal changes, weather events, and upstream activities. It typically requires extensive treatment before consumption.",
    mineralContent:
      "Rivers contain minerals picked up from their watershed. The content varies widely depending on the geology of the areas they flow through and human activities in the watershed.",
    filtrationProcess:
      "Rivers have limited natural filtration compared to groundwater sources. Water treatment facilities use multiple processes including sedimentation, filtration, and disinfection to make river water safe.",
    regions: ["Southeast", "Northeast", "West", "Northwest"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "rain",
    name: "Rainwater Collection",
    icon: <Cloud className="h-5 w-5" />,
    description:
      "Rainwater collection involves capturing and storing rain for later use. This ancient practice is becoming increasingly popular as a sustainable water source in many regions.",
    qualityImpact:
      "Rainwater is naturally soft and free of minerals, making it very pure in unpolluted areas. However, it can pick up contaminants from collection surfaces and the atmosphere.",
    mineralContent:
      "Rainwater has very low mineral content, making it naturally soft. It lacks calcium and magnesium, which can be both an advantage for certain uses and a disadvantage for drinking water.",
    filtrationProcess:
      "Rainwater requires filtration to remove debris and potential contaminants picked up from collection surfaces. Treatment typically includes first-flush diversion, filtration, and disinfection.",
    regions: ["Hawaii", "Southeast", "Northwest"],
    image: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "glacial",
    name: "Glacial Sources",
    icon: <Mountain className="h-5 w-5" />,
    description:
      "Glacial water comes from melting glaciers and snowpack in mountainous regions. These sources provide some of the purest water available and feed many major river systems.",
    qualityImpact:
      "Glacial water is typically very pure with low mineral content and minimal human-caused contamination. It's often considered premium water due to its purity and origin.",
    mineralContent:
      "Glacial water has low mineral content initially but may pick up minerals as it flows over rocks. It typically contains small amounts of calcium, magnesium, and silica.",
    filtrationProcess:
      "Glacial water undergoes natural filtration through freezing and thawing cycles and as it percolates through rock and soil. It generally requires minimal treatment compared to other sources.",
    regions: ["Alaska", "Northwest"],
    image: "/placeholder.svg?height=300&width=500",
  },
]

interface RegionWaterSourceData {
  region: string
  primarySource: string
  secondarySources: string[]
  description: string
  treatmentLevel: "Minimal" | "Moderate" | "Extensive"
  qualityImpact: string
}

const regionWaterSources: RegionWaterSourceData[] = [
  {
    region: "Northeast",
    primarySource: "lake",
    secondarySources: ["river", "aquifer"],
    description:
      "The Northeast relies heavily on surface water from lakes and reservoirs, with the Great Lakes being a major source. Groundwater from aquifers serves as an important secondary source, especially in rural areas.",
    treatmentLevel: "Moderate",
    qualityImpact:
      "The diverse water sources in the Northeast contribute to good overall water quality with moderate hardness. Urban areas typically use more surface water requiring additional treatment.",
  },
  {
    region: "Southeast",
    primarySource: "river",
    secondarySources: ["aquifer", "rain"],
    description:
      "The Southeast uses a combination of surface water from rivers and groundwater from the extensive Floridan Aquifer system. Coastal areas may also utilize rainwater collection systems.",
    treatmentLevel: "Moderate",
    qualityImpact:
      "The warm climate and agricultural activities in the Southeast can affect water quality. Surface water sources require significant treatment, while the limestone aquifers contribute to harder water.",
  },
  {
    region: "Midwest",
    primarySource: "aquifer",
    secondarySources: ["lake", "river"],
    description:
      "The Midwest relies heavily on groundwater from major aquifer systems. The Great Lakes also provide water to many communities near the lakes, while rivers serve as important sources for others.",
    treatmentLevel: "Moderate",
    qualityImpact:
      "Midwest water tends to be moderately hard due to the limestone and dolomite aquifers. Agricultural activities can impact surface water quality, requiring additional treatment.",
  },
  {
    region: "Southwest",
    primarySource: "aquifer",
    secondarySources: ["river"],
    description:
      "The arid Southwest depends primarily on groundwater from deep aquifers and surface water from the Colorado River system. Water scarcity is a significant issue in this region.",
    treatmentLevel: "Extensive",
    qualityImpact:
      "Southwest water typically has high mineral content due to the arid climate and geological features. Extensive treatment is often required to address hardness and total dissolved solids.",
  },
  {
    region: "West",
    primarySource: "river",
    secondarySources: ["lake", "spring"],
    description:
      "The West relies on a mix of surface water from river systems originating in the mountains and reservoirs. Groundwater and springs are important in some areas, particularly in mountainous regions.",
    treatmentLevel: "Moderate",
    qualityImpact:
      "Water quality varies widely across the West. Mountain sources provide excellent quality water, while areas with water scarcity may have higher mineral content requiring additional treatment.",
  },
  {
    region: "Northwest",
    primarySource: "spring",
    secondarySources: ["river", "glacial"],
    description:
      "The Northwest benefits from abundant rainfall and snowmelt, with many pristine mountain springs and rivers. Glacial meltwater contributes to river systems, providing high-quality water.",
    treatmentLevel: "Minimal",
    qualityImpact:
      "The Northwest has some of the best water quality in the country due to pristine sources and minimal industrial impact. Many areas require only basic treatment before distribution.",
  },
  {
    region: "Alaska",
    primarySource: "glacial",
    secondarySources: ["spring", "river"],
    description:
      "Alaska's water primarily comes from glacial meltwater, pristine springs, and rivers. The vast wilderness and limited human development help maintain exceptional water quality.",
    treatmentLevel: "Minimal",
    qualityImpact:
      "Alaska's water is among the purest in the world, with very low mineral content and minimal contamination. Many communities require only basic treatment for their water supply.",
  },
  {
    region: "Hawaii",
    primarySource: "spring",
    secondarySources: ["rain", "aquifer"],
    description:
      "Hawaii's unique volcanic geology creates excellent natural springs and groundwater sources. Rainwater collection is also common, especially in remote areas.",
    treatmentLevel: "Minimal",
    qualityImpact:
      "Hawaii's volcanic filtration system naturally purifies water, resulting in good quality with a distinctive mineral profile. The isolated nature of the islands helps maintain water purity.",
  },
]

export function WaterSourceVisualization() {
  const [activeSource, setActiveSource] = useState<string>("spring")
  const [activeTab, setActiveTab] = useState<string>("sources")
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)

  const getSourceIcon = (sourceId: string) => {
    const source = waterSources.find((s) => s.id === sourceId)
    return source?.icon || <Droplet className="h-5 w-5" />
  }

  const getTreatmentLevelColor = (level: "Minimal" | "Moderate" | "Extensive") => {
    switch (level) {
      case "Minimal":
        return "bg-green-500"
      case "Moderate":
        return "bg-blue-500"
      case "Extensive":
        return "bg-orange-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Droplet className="h-6 w-6 text-blue-500 mr-2" />
          Water Source Visualization
        </CardTitle>
        <CardDescription>
          Explore different water sources and understand how they affect water quality across regions
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-6">
            <TabsTrigger value="sources">Water Sources</TabsTrigger>
            <TabsTrigger value="regions">Regional Sources</TabsTrigger>
          </TabsList>

          <TabsContent value="sources" className="space-y-6">
            <div className="flex flex-wrap gap-2 mb-6">
              {waterSources.map((source) => (
                <Badge
                  key={source.id}
                  className={`cursor-pointer text-sm py-1.5 px-3 ${
                    activeSource === source.id
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                  onClick={() => setActiveSource(source.id)}
                >
                  <span className="flex items-center">
                    {source.icon}
                    <span className="ml-1">{source.name}</span>
                  </span>
                </Badge>
              ))}
            </div>

            {waterSources
              .filter((source) => source.id === activeSource)
              .map((source) => (
                <div key={source.id} className="space-y-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/2">
                      <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
                        <Image
                          src={source.image || "/placeholder.svg"}
                          alt={source.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    </div>
                    <div className="w-full md:w-1/2 space-y-4">
                      <div>
                        <h3 className="text-xl font-bold flex items-center">
                          {source.icon}
                          <span className="ml-2">{source.name}</span>
                        </h3>
                        <p className="text-gray-600 mt-2">{source.description}</p>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-700">Common in Regions:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {source.regions.map((region) => (
                            <Badge key={region} variant="outline" className="bg-gray-50">
                              {region}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-blue-700 flex items-center">
                        <Droplet className="h-4 w-4 mr-2" />
                        Quality Impact
                      </h4>
                      <p className="text-sm mt-2">{source.qualityImpact}</p>
                    </div>

                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-green-700 flex items-center">
                        <Mountain className="h-4 w-4 mr-2" />
                        Mineral Content
                      </h4>
                      <p className="text-sm mt-2">{source.mineralContent}</p>
                    </div>

                    <div className="bg-purple-50 p-4 rounded-lg">
                      <h4 className="font-semibold text-purple-700 flex items-center">
                        <Filter className="h-4 w-4 mr-2" />
                        Filtration Process
                      </h4>
                      <p className="text-sm mt-2">{source.filtrationProcess}</p>
                    </div>
                  </div>
                </div>
              ))}
          </TabsContent>

          <TabsContent value="regions">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Select a Region to View Water Sources</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {regionWaterSources.map((region) => (
                  <div
                    key={region.region}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedRegion === region.region
                        ? "bg-blue-100 border-2 border-blue-500"
                        : "bg-gray-50 border border-gray-200 hover:bg-gray-100"
                    }`}
                    onClick={() => setSelectedRegion(region.region)}
                  >
                    <p className="font-medium text-center">{region.region}</p>
                  </div>
                ))}
              </div>
            </div>

            {selectedRegion ? (
              <AnimatedSection animation="fade-in-up">
                {regionWaterSources
                  .filter((region) => region.region === selectedRegion)
                  .map((region) => {
                    const primarySource = waterSources.find((s) => s.id === region.primarySource)
                    return (
                      <div key={region.region} className="space-y-6">
                        <div className="flex flex-col md:flex-row gap-6">
                          <div className="w-full md:w-1/2">
                            <div className="relative h-64 rounded-lg overflow-hidden">
                              <Image
                                src={primarySource?.image || "/placeholder.svg?height=300&width=500"}
                                alt={`${region.region} water source`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 50vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                                <div>
                                  <h3 className="text-white text-xl font-bold">{region.region}</h3>
                                  <div className="flex items-center mt-1">
                                    <Badge className={`${getTreatmentLevelColor(region.treatmentLevel)} text-white`}>
                                      {region.treatmentLevel} Treatment
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-full md:w-1/2">
                            <h3 className="text-xl font-bold mb-3">Water Sources in {region.region}</h3>
                            <p className="text-gray-600 mb-4">{region.description}</p>

                            <div className="space-y-3">
                              <div className="flex items-center">
                                <div className="w-1/3 font-medium">Primary Source:</div>
                                <div className="w-2/3 flex items-center">
                                  {getSourceIcon(region.primarySource)}
                                  <span className="ml-2">
                                    {waterSources.find((s) => s.id === region.primarySource)?.name}
                                  </span>
                                </div>
                              </div>

                              <div className="flex items-start">
                                <div className="w-1/3 font-medium pt-1">Secondary Sources:</div>
                                <div className="w-2/3">
                                  <div className="flex flex-wrap gap-2">
                                    {region.secondarySources.map((sourceId) => (
                                      <Badge key={sourceId} variant="outline" className="flex items-center">
                                        {getSourceIcon(sourceId)}
                                        <span className="ml-1">
                                          {waterSources.find((s) => s.id === sourceId)?.name}
                                        </span>
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-blue-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-blue-700 flex items-center">
                            <Info className="h-4 w-4 mr-2" />
                            Impact on Water Quality
                          </h4>
                          <p className="mt-2">{region.qualityImpact}</p>
                        </div>

                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-semibold flex items-center">
                            <Filter className="h-4 w-4 mr-2" />
                            Water Treatment Process
                          </h4>
                          <div className="mt-4">
                            <div className="relative pt-1">
                              <div className="flex mb-2 items-center justify-between">
                                <div>
                                  <span
                                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                      region.treatmentLevel === "Minimal"
                                        ? "bg-green-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    Minimal
                                  </span>
                                </div>
                                <div>
                                  <span
                                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                      region.treatmentLevel === "Moderate"
                                        ? "bg-blue-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    Moderate
                                  </span>
                                </div>
                                <div>
                                  <span
                                    className={`text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full ${
                                      region.treatmentLevel === "Extensive"
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-200 text-gray-600"
                                    }`}
                                  >
                                    Extensive
                                  </span>
                                </div>
                              </div>
                              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                                <div
                                  style={{
                                    width:
                                      region.treatmentLevel === "Minimal"
                                        ? "33%"
                                        : region.treatmentLevel === "Moderate"
                                          ? "66%"
                                          : "100%",
                                  }}
                                  className={`shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center ${
                                    region.treatmentLevel === "Minimal"
                                      ? "bg-green-500"
                                      : region.treatmentLevel === "Moderate"
                                        ? "bg-blue-500"
                                        : "bg-orange-500"
                                  }`}
                                ></div>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600">
                              {region.treatmentLevel === "Minimal"
                                ? "Water sources in this region require minimal treatment due to their natural purity. Basic filtration and disinfection are typically sufficient."
                                : region.treatmentLevel === "Moderate"
                                  ? "Water in this region requires standard treatment processes including filtration, disinfection, and some mineral adjustment."
                                  : "Water sources in this region require extensive treatment including advanced filtration, softening, and comprehensive disinfection processes."}
                            </p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </AnimatedSection>
            ) : (
              <div className="bg-gray-50 border border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Info className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-600">Select a Region</h3>
                <p className="text-gray-500 mt-2">
                  Click on any region above to view detailed information about its water sources
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
