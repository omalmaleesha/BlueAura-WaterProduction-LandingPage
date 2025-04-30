"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Droplet, Info, MapPin, Loader2, AlertCircle, CheckCircle } from "lucide-react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { WaterQualityReport } from "@/components/water-quality-report"

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

// Mock data for different regions with added coordinates and bounding boxes
const regionData: WaterQualityData[] = [
  {
    id: "ne",
    region: "Northeast",
    state: "New York",
    qualityScore: 87,
    coordinates: {
      lat: 42.165726,
      lng: -74.948051,
    },
    boundingBox: {
      north: 47.459686,
      south: 37.911536,
      east: -66.969271,
      west: -82.518758,
    },
    parameters: {
      ph: 7.2,
      tds: 120,
      hardness: 85,
      chlorine: 0.8,
      turbidity: 0.5,
    },
    description:
      "The Northeast region generally has good water quality with moderate hardness. Some areas may have higher chlorine levels due to municipal treatment. The region's water sources include both surface water from lakes and rivers, as well as groundwater from aquifers.",
    recommendation: "Our mineral-enhanced water is ideal for this region to balance the existing mineral content.",
  },
  {
    id: "se",
    region: "Southeast",
    state: "Florida",
    qualityScore: 72,
    coordinates: {
      lat: 27.664827,
      lng: -81.515754,
    },
    boundingBox: {
      north: 39.147232,
      south: 24.396308,
      east: -75.410767,
      west: -94.615036,
    },
    parameters: {
      ph: 7.8,
      tds: 250,
      hardness: 180,
      chlorine: 1.2,
      turbidity: 1.8,
    },
    description:
      "The Southeast has varying water quality with higher mineral content and hardness. Coastal areas may have higher sodium levels. The warm climate and agricultural activities in the region can affect water quality, particularly during rainy seasons when runoff increases.",
    recommendation:
      "Our purified water with added minerals would be best to reduce excess minerals while maintaining taste.",
  },
  {
    id: "mw",
    region: "Midwest",
    state: "Illinois",
    qualityScore: 78,
    coordinates: {
      lat: 40.633125,
      lng: -89.398528,
    },
    boundingBox: {
      north: 49.384358,
      south: 35.995683,
      east: -80.518758,
      west: -104.053563,
    },
    parameters: {
      ph: 7.5,
      tds: 180,
      hardness: 150,
      chlorine: 0.9,
      turbidity: 0.8,
    },
    description:
      "Midwest water tends to be moderately hard with good overall quality. Agricultural areas may have seasonal variations in quality. The region relies heavily on groundwater sources, which naturally contain minerals that contribute to water hardness.",
    recommendation: "Our balanced mineral water is recommended for this region's moderate hardness levels.",
  },
  {
    id: "sw",
    region: "Southwest",
    state: "Arizona",
    qualityScore: 65,
    coordinates: {
      lat: 34.048928,
      lng: -111.093731,
    },
    boundingBox: {
      north: 42.000709,
      south: 26.0,
      east: -94.430662,
      west: -124.733253,
    },
    parameters: {
      ph: 8.1,
      tds: 320,
      hardness: 210,
      chlorine: 1.0,
      turbidity: 1.2,
    },
    description:
      "The Southwest has harder water with higher mineral content due to the arid climate and geological features. Water scarcity in the region often means that available water sources have higher concentrations of dissolved minerals and salts.",
    recommendation: "Our premium filtered water is ideal to reduce the high mineral content common in this region.",
  },
  {
    id: "w",
    region: "West",
    state: "California",
    qualityScore: 82,
    coordinates: {
      lat: 36.778261,
      lng: -119.417932,
    },
    boundingBox: {
      north: 42.009517,
      south: 32.534156,
      east: -114.131211,
      west: -124.409591,
    },
    parameters: {
      ph: 7.4,
      tds: 150,
      hardness: 110,
      chlorine: 0.7,
      turbidity: 0.6,
    },
    description:
      "The West coast has varying water quality, generally good in northern areas with increasing hardness in southern regions. The diverse geography of the West means water quality can vary significantly between coastal areas, mountain regions, and inland valleys.",
    recommendation: "Our spring water collection would complement the existing water profile in this region.",
  },
  {
    id: "nw",
    region: "Northwest",
    state: "Washington",
    qualityScore: 92,
    coordinates: {
      lat: 47.751074,
      lng: -120.740139,
    },
    boundingBox: {
      north: 49.002494,
      south: 41.991794,
      east: -111.043564,
      west: -124.836097,
    },
    parameters: {
      ph: 7.0,
      tds: 80,
      hardness: 65,
      chlorine: 0.5,
      turbidity: 0.3,
    },
    description:
      "The Northwest has some of the best water quality in the country with low mineral content and excellent clarity. The abundant rainfall and pristine mountain sources contribute to the region's exceptional water quality, with minimal need for extensive treatment.",
    recommendation: "Our light mineral water is perfect to maintain the excellent taste profile of this region.",
  },
  {
    id: "ak",
    region: "Alaska",
    state: "Alaska",
    qualityScore: 95,
    coordinates: {
      lat: 64.200841,
      lng: -149.493673,
    },
    boundingBox: {
      north: 71.352561,
      south: 51.175092,
      east: -130.001297,
      west: -179.148909,
    },
    parameters: {
      ph: 6.9,
      tds: 50,
      hardness: 40,
      chlorine: 0.3,
      turbidity: 0.2,
    },
    description:
      "Alaska has pristine water quality with very low mineral content and minimal contamination. The remote nature of much of Alaska and limited industrial development has preserved the exceptional purity of its water sources.",
    recommendation:
      "Our pure spring water would be an excellent match for those accustomed to Alaska's pristine water.",
  },
  {
    id: "hi",
    region: "Hawaii",
    state: "Hawaii",
    qualityScore: 88,
    coordinates: {
      lat: 19.898682,
      lng: -155.665857,
    },
    boundingBox: {
      north: 22.234394,
      south: 18.910361,
      east: -154.806773,
      west: -160.236588,
    },
    parameters: {
      ph: 7.3,
      tds: 110,
      hardness: 75,
      chlorine: 0.6,
      turbidity: 0.4,
    },
    description:
      "Hawaii has good water quality with moderate mineral content influenced by volcanic geology. The islands' unique volcanic filtration system naturally purifies water as it passes through porous volcanic rock, creating a distinctive mineral profile.",
    recommendation: "Our volcanic mineral water would complement Hawaii's natural water profile.",
  },
]

export function WaterQualityMap() {
  const [selectedRegion, setSelectedRegion] = useState<WaterQualityData | null>(null)
  const [activeParameter, setActiveParameter] = useState<string>("overall")
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [locationStatus, setLocationStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [locationError, setLocationError] = useState<string | null>(null)
  const [userRegion, setUserRegion] = useState<string | null>(null)
  const mapRef = useRef<HTMLDivElement>(null)

  // Select a region when clicked
  const handleRegionClick = (regionId: string) => {
    const region = regionData.find((r) => r.id === regionId)
    setSelectedRegion(region || null)
  }

  // Get color based on quality score
  const getQualityColor = (score: number): string => {
    if (score >= 90) return "#10b981" // Green (excellent)
    if (score >= 80) return "#3b82f6" // Blue (good)
    if (score >= 70) return "#f59e0b" // Yellow (fair)
    if (score >= 60) return "#f97316" // Orange (moderate)
    return "#ef4444" // Red (poor)
  }

  // Get parameter-specific color
  const getParameterColor = (region: WaterQualityData, parameter: string): string => {
    let score = 0

    switch (parameter) {
      case "ph":
        // pH is best at 7.0, score decreases as it moves away
        score = 100 - Math.abs(region.parameters.ph - 7.0) * 20
        break
      case "tds":
        // TDS is best below 150, worst above 500
        score = 100 - region.parameters.tds / 5
        break
      case "hardness":
        // Hardness is best below 100, worst above 300
        score = 100 - region.parameters.hardness / 3
        break
      case "chlorine":
        // Chlorine is best below 0.5, worst above 2.0
        score = 100 - region.parameters.chlorine * 40
        break
      case "turbidity":
        // Turbidity is best below 0.5, worst above 5.0
        score = 100 - region.parameters.turbidity * 20
        break
      default:
        return getQualityColor(region.qualityScore)
    }

    // Ensure score is within 0-100 range
    score = Math.max(0, Math.min(100, score))
    return getQualityColor(score)
  }

  // Function to determine which region a coordinate belongs to
  const getRegionFromCoordinates = (lat: number, lng: number): string | null => {
    for (const region of regionData) {
      const { boundingBox } = region
      if (lat <= boundingBox.north && lat >= boundingBox.south && lng <= boundingBox.east && lng >= boundingBox.west) {
        return region.id
      }
    }
    return null
  }

  // Function to detect user's location
  const detectUserLocation = () => {
    if (!navigator.geolocation) {
      setLocationStatus("error")
      setLocationError("Geolocation is not supported by your browser")
      return
    }

    setLocationStatus("loading")
    setLocationError(null)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const regionId = getRegionFromCoordinates(latitude, longitude)

        if (regionId) {
          setUserRegion(regionId)
          setSelectedRegion(regionData.find((r) => r.id === regionId) || null)
          setLocationStatus("success")
        } else {
          setLocationStatus("error")
          setLocationError("Could not determine your region from your location")
        }
      },
      (error) => {
        setLocationStatus("error")
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setLocationError("Location permission denied. Please enable location access to use this feature.")
            break
          case error.POSITION_UNAVAILABLE:
            setLocationError("Location information is unavailable.")
            break
          case error.TIMEOUT:
            setLocationError("The request to get your location timed out.")
            break
          default:
            setLocationError("An unknown error occurred while trying to get your location.")
        }
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
        maximumAge: 0,
      },
    )
  }

  // Reset location detection
  const resetLocation = () => {
    setLocationStatus("idle")
    setLocationError(null)
    setUserRegion(null)
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <CardTitle className="flex items-center">
              <MapPin className="h-6 w-6 text-blue-500 mr-2" />
              Water Quality Map
            </CardTitle>
            <CardDescription>Explore water quality data across different regions of the United States</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={locationStatus === "idle" || locationStatus === "error" ? detectUserLocation : resetLocation}
                  variant={locationStatus === "success" ? "outline" : "default"}
                  className={locationStatus === "success" ? "border-green-500 text-green-500" : "bg-blue-500"}
                  disabled={locationStatus === "loading"}
                >
                  {locationStatus === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Detecting...
                    </>
                  ) : locationStatus === "success" ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Location Found
                    </>
                  ) : (
                    <>
                      <MapPin className="h-4 w-4 mr-2" />
                      Detect My Location
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                {locationStatus === "idle"
                  ? "Automatically find your region based on your location"
                  : locationStatus === "loading"
                    ? "Getting your location..."
                    : locationStatus === "success"
                      ? "Click to reset location detection"
                      : "Try again to detect your location"}
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        {locationError && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Location Error</AlertTitle>
            <AlertDescription>{locationError}</AlertDescription>
          </Alert>
        )}
        {locationStatus === "success" && userRegion && (
          <Alert className="mt-4 border-green-500 text-green-700 bg-green-50">
            <CheckCircle className="h-4 w-4" />
            <AlertTitle>Location Detected</AlertTitle>
            <AlertDescription>
              You are in the {regionData.find((r) => r.id === userRegion)?.region} region. Showing relevant water
              quality data.
            </AlertDescription>
          </Alert>
        )}
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Tabs value={activeParameter} onValueChange={setActiveParameter} className="w-full">
            <TabsList className="grid grid-cols-3 md:grid-cols-6 w-full">
              <TabsTrigger value="overall">Overall</TabsTrigger>
              <TabsTrigger value="ph">pH Level</TabsTrigger>
              <TabsTrigger value="tds">TDS</TabsTrigger>
              <TabsTrigger value="hardness">Hardness</TabsTrigger>
              <TabsTrigger value="chlorine">Chlorine</TabsTrigger>
              <TabsTrigger value="turbidity">Turbidity</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Map visualization */}
          <div className="w-full lg:w-2/3 relative" ref={mapRef}>
            <div className="aspect-[4/3] bg-gray-100 rounded-lg overflow-hidden relative">
              {/* US Map SVG */}
              <svg
                viewBox="0 0 960 600"
                className="w-full h-full"
                aria-label="United States water quality map"
                role="img"
              >
                {/* Northeast */}
                <path
                  d="M830,90 L880,120 L890,170 L840,200 L790,190 L770,150 L790,110 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "ne")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "ne")!, activeParameter)
                  }
                  stroke={userRegion === "ne" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "ne" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("ne")}
                  onMouseEnter={() => setHoveredRegion("ne")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Northeast region"
                  role="button"
                />

                {/* Southeast */}
                <path
                  d="M750,200 L830,220 L820,320 L730,350 L680,300 L700,230 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "se")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "se")!, activeParameter)
                  }
                  stroke={userRegion === "se" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "se" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("se")}
                  onMouseEnter={() => setHoveredRegion("se")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Southeast region"
                  role="button"
                />

                {/* Midwest */}
                <path
                  d="M600,120 L730,150 L720,230 L650,270 L580,230 L570,170 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "mw")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "mw")!, activeParameter)
                  }
                  stroke={userRegion === "mw" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "mw" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("mw")}
                  onMouseEnter={() => setHoveredRegion("mw")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Midwest region"
                  role="button"
                />

                {/* Southwest */}
                <path
                  d="M400,200 L550,230 L530,350 L350,320 L330,250 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "sw")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "sw")!, activeParameter)
                  }
                  stroke={userRegion === "sw" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "sw" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("sw")}
                  onMouseEnter={() => setHoveredRegion("sw")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Southwest region"
                  role="button"
                />

                {/* West */}
                <path
                  d="M200,150 L330,170 L320,300 L180,270 L150,200 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "w")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "w")!, activeParameter)
                  }
                  stroke={userRegion === "w" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "w" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("w")}
                  onMouseEnter={() => setHoveredRegion("w")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="West region"
                  role="button"
                />

                {/* Northwest */}
                <path
                  d="M150,50 L300,80 L280,170 L120,150 L100,100 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "nw")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "nw")!, activeParameter)
                  }
                  stroke={userRegion === "nw" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "nw" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("nw")}
                  onMouseEnter={() => setHoveredRegion("nw")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Northwest region"
                  role="button"
                />

                {/* Alaska */}
                <path
                  d="M80,400 L150,420 L140,470 L70,460 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "ak")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "ak")!, activeParameter)
                  }
                  stroke={userRegion === "ak" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "ak" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("ak")}
                  onMouseEnter={() => setHoveredRegion("ak")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Alaska region"
                  role="button"
                />

                {/* Hawaii */}
                <path
                  d="M180,450 L230,460 L220,490 L170,480 Z"
                  fill={
                    activeParameter === "overall"
                      ? getQualityColor(regionData.find((r) => r.id === "hi")!.qualityScore)
                      : getParameterColor(regionData.find((r) => r.id === "hi")!, activeParameter)
                  }
                  stroke={userRegion === "hi" ? "#000" : "#fff"}
                  strokeWidth={userRegion === "hi" ? "3" : "2"}
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => handleRegionClick("hi")}
                  onMouseEnter={() => setHoveredRegion("hi")}
                  onMouseLeave={() => setHoveredRegion(null)}
                  aria-label="Hawaii region"
                  role="button"
                />

                {/* Region labels */}
                <text x="830" y="150" className="text-xs font-medium" fill="#000">
                  Northeast
                </text>
                <text x="750" y="270" className="text-xs font-medium" fill="#000">
                  Southeast
                </text>
                <text x="650" y="180" className="text-xs font-medium" fill="#000">
                  Midwest
                </text>
                <text x="450" y="270" className="text-xs font-medium" fill="#000">
                  Southwest
                </text>
                <text x="230" y="220" className="text-xs font-medium" fill="#000">
                  West
                </text>
                <text x="200" y="120" className="text-xs font-medium" fill="#000">
                  Northwest
                </text>
                <text x="110" y="440" className="text-xs font-medium" fill="#000">
                  Alaska
                </text>
                <text x="200" y="470" className="text-xs font-medium" fill="#000">
                  Hawaii
                </text>

                {/* User location marker if detected */}
                {userRegion && (
                  <g>
                    <circle
                      cx={regionData.find((r) => r.id === userRegion)?.coordinates.lng || 0}
                      cy={regionData.find((r) => r.id === userRegion)?.coordinates.lat || 0}
                      r="8"
                      fill="#000"
                      className="animate-ping"
                      opacity="0.3"
                    />
                    <circle
                      cx={regionData.find((r) => r.id === userRegion)?.coordinates.lng || 0}
                      cy={regionData.find((r) => r.id === userRegion)?.coordinates.lat || 0}
                      r="4"
                      fill="#000"
                    />
                  </g>
                )}
              </svg>

              {/* Tooltip for hovered region */}
              {hoveredRegion && !selectedRegion && (
                <div className="absolute top-0 left-0 bg-white p-2 rounded shadow-md text-sm pointer-events-none transform translate-x-[20px] translate-y-[20px]">
                  <p className="font-bold">{regionData.find((r) => r.id === hoveredRegion)?.region}</p>
                  <p>Quality Score: {regionData.find((r) => r.id === hoveredRegion)?.qualityScore}</p>
                </div>
              )}
            </div>

            {/* Map legend */}
            <div className="mt-4 flex items-center justify-center">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-red-500 rounded-sm mr-1"></div>
                  <span>Poor</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-orange-500 rounded-sm mr-1"></div>
                  <span>Moderate</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-yellow-500 rounded-sm mr-1"></div>
                  <span>Fair</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-blue-500 rounded-sm mr-1"></div>
                  <span>Good</span>
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 bg-green-500 rounded-sm mr-1"></div>
                  <span>Excellent</span>
                </div>
              </div>
            </div>
          </div>

          {/* Region details panel */}
          <div className="w-full lg:w-1/3">
            {selectedRegion ? (
              <div className="bg-white rounded-lg border p-4 h-full">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-bold">{selectedRegion.region}</h3>
                    <p className="text-sm text-gray-500">{selectedRegion.state} (Representative)</p>
                    {userRegion === selectedRegion.id && (
                      <Badge className="mt-1 bg-black text-white">Your Region</Badge>
                    )}
                  </div>
                  <Badge
                    className={`${
                      selectedRegion.qualityScore >= 90
                        ? "bg-green-500"
                        : selectedRegion.qualityScore >= 80
                          ? "bg-blue-500"
                          : selectedRegion.qualityScore >= 70
                            ? "bg-yellow-500"
                            : selectedRegion.qualityScore >= 60
                              ? "bg-orange-500"
                              : "bg-red-500"
                    }`}
                  >
                    Score: {selectedRegion.qualityScore}
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">WATER PARAMETERS</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>pH Level</span>
                        <span className="font-medium">{selectedRegion.parameters.ph}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>TDS</span>
                        <span className="font-medium">{selectedRegion.parameters.tds} ppm</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hardness</span>
                        <span className="font-medium">{selectedRegion.parameters.hardness} mg/L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Chlorine</span>
                        <span className="font-medium">{selectedRegion.parameters.chlorine} mg/L</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Turbidity</span>
                        <span className="font-medium">{selectedRegion.parameters.turbidity} NTU</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">DESCRIPTION</h4>
                    <p className="text-sm">{selectedRegion.description}</p>
                  </div>

                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-1">RECOMMENDATION</h4>
                    <div className="bg-blue-50 p-3 rounded-md text-sm">
                      <div className="flex items-start">
                        <Droplet className="h-5 w-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                        <p>{selectedRegion.recommendation}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-2">
                  <Button variant="outline" onClick={() => setSelectedRegion(null)} className="w-full">
                    Back to Map
                  </Button>
                  <WaterQualityReport regionData={selectedRegion} isUserRegion={userRegion === selectedRegion.id} />
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-lg border border-dashed border-gray-300 p-6 h-full flex flex-col items-center justify-center text-center">
                <Info className="h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-600 mb-2">Select a Region</h3>
                <p className="text-gray-500 text-sm mb-4">
                  Click on any region on the map to view detailed water quality information and recommendations.
                </p>
                <div className="bg-blue-50 p-3 rounded-md text-sm w-full">
                  <p className="flex items-center">
                    <Droplet className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span>
                      Water quality varies by region due to differences in source, treatment methods, and environmental
                      factors.
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-gray-500">
          <p>Data is representative of general trends and may vary within regions.</p>
        </div>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by parameter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Parameters</SelectLabel>
              <SelectItem value="overall" onClick={() => setActiveParameter("overall")}>
                Overall Quality
              </SelectItem>
              <SelectItem value="ph" onClick={() => setActiveParameter("ph")}>
                pH Level
              </SelectItem>
              <SelectItem value="tds" onClick={() => setActiveParameter("tds")}>
                TDS
              </SelectItem>
              <SelectItem value="hardness" onClick={() => setActiveParameter("hardness")}>
                Hardness
              </SelectItem>
              <SelectItem value="chlorine" onClick={() => setActiveParameter("chlorine")}>
                Chlorine
              </SelectItem>
              <SelectItem value="turbidity" onClick={() => setActiveParameter("turbidity")}>
                Turbidity
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </CardFooter>
    </Card>
  )
}
