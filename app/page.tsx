"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Facebook, Instagram, Twitter, Droplet, MapPin, Mountain } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { WaterQualityCalculator } from "@/components/water-quality-calculator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Home() {
  // Remove the useEffect for animation as we're now handling it in the AnimatedSection component
  // This eliminates a potential source of the error

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white py-4 px-6 flex items-center justify-between border-b shadow-md">
        <div className="flex items-center">
          <Link href="/" className="text-blue-500 font-bold text-2xl">
          BlueAura
          </Link>
        </div>
        <nav className="hidden md:flex space-x-6">
          <Link href="#" className="text-gray-600 hover:text-blue-500">
            Home
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-500">
            About
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-500">
            Shop
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-500">
            Pages
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-500">
            Blog
          </Link>
          <Link href="#" className="text-gray-600 hover:text-blue-500">
            Contact
          </Link>
        </nav>
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center text-sm">
            <span className="text-gray-500">Call us:</span>
            <span className="ml-1 text-gray-700">+1 (234) 567-8900</span>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-600 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.3-4.3"></path>
              </svg>
            </button>
            <button className="p-2 text-gray-600 hover:text-blue-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="ml-2 flex items-center gap-1">
                  <Droplet className="h-4 w-4" />
                  <span>Water Quality</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[800px]">
                <DialogHeader>
                  <DialogTitle>Water Quality Calculator</DialogTitle>
                  <DialogDescription>Analyze your water quality and get personalized recommendations</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <WaterQualityCalculator />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-sky-50 to-white py-20">
          <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
            <AnimatedSection animation="fade-in-left" className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">
                <span className="text-gray-800">PURE WATER</span>
                <br />
                <span className="text-blue-500">DELIVERY SERVICE</span>
              </h1>
              <p className="text-gray-600 mb-8 max-w-md">
                Our water delivery service brings pure, refreshing water right to your doorstep. Enjoy the convenience
                of having clean water delivered to your home or office.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-blue-500 hover:bg-blue-600">Order Now</Button>
                <Link href="/water-calculator">
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    <Droplet className="h-4 w-4 mr-2" />
                    Check Water Quality
                  </Button>
                </Link>
                <Link href="/water-map">
                  <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                    <MapPin className="h-4 w-4 mr-2" />
                    Water Quality Map
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="fade-in-right" className="md:w-1/2 relative">
              <Image
                src="/homepage.jpeg?height=500&width=400"
                alt="Glass of pure water"
                width={400}
                height={500}
                className="mx-auto"
              />
            </AnimatedSection>
          </div>
        </section>

        {/* Water Composition Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-center text-3xl font-bold mb-12">WATER COMPOSITION</h2>
            </AnimatedSection>
            <AnimatedSection delay={200} className="flex justify-center">
              <div className="relative">
                <div className="w-64 h-64 md:w-80 md:h-80 rounded-full border-2 border-blue-500 flex items-center justify-center">
                  <Image
                    src="/bottle.jpeg?height=300&width=300"
                    alt="Water composition diagram"
                    width={300}
                    height={300}
                    className="rounded-full"
                  />
                </div>

                {/* Composition elements */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-3 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold text-gray-700">Calcium (Ca2+)</h3>
                  <p className="text-xs text-blue-500">40-80 mg/l</p>
                </div>

                <div className="absolute top-1/4 right-0 translate-x-1/2 bg-white p-3 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold text-gray-700">Magnesium (Mg2+)</h3>
                  <p className="text-xs text-blue-500">20-30 mg/l</p>
                </div>

                <div className="absolute bottom-1/4 right-0 translate-x-1/2 bg-white p-3 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold text-gray-700">Potassium</h3>
                  <p className="text-xs text-blue-500">10-15 mg/l</p>
                </div>

                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 bg-white p-3 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold text-gray-700">Sodium (Na+)</h3>
                  <p className="text-xs text-blue-500">5-10 mg/l</p>
                </div>

                <div className="absolute bottom-1/4 left-0 -translate-x-1/2 bg-white p-3 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold text-gray-700">Bicarbonate</h3>
                  <p className="text-xs text-blue-500">150-200 mg/l</p>
                </div>

                <div className="absolute top-1/4 left-0 -translate-x-1/2 bg-white p-3 rounded-lg shadow-md">
                  <h3 className="text-sm font-bold text-gray-700">Chloride</h3>
                  <p className="text-xs text-blue-500">20-40 mg/l</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Choose Your Water Section */}
        <section id="choose-water" className="py-16 bg-gradient-to-b from-white to-sky-50">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-center text-3xl font-bold mb-2">
                CHOOSE YOUR <span className="text-blue-500">WATER</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-gray-600 mb-12">Select the right water for your needs</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Option 1 */}
              <AnimatedSection delay={200}>
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                  <Image src="/download.jpeg?height=200&width=200" alt="Water bottles" width={200} height={200} />
                  <h3 className="text-lg font-bold mt-4">Five bottles of mineral water</h3>
                  <p className="text-gray-600 text-sm text-center my-2">
                    Five bottles of natural mineral water delivered to your door
                  </p>
                  <div className="mt-4 mb-6">
                    <span className="text-xl font-bold">$15.99</span>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 w-full">Add to Cart</Button>
                </div>
              </AnimatedSection>

              {/* Option 2 */}
              <AnimatedSection delay={300}>
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                  <Image src="/download.jpeg?height=200&width=200" alt="Water dispenser" width={200} height={200} />
                  <h3 className="text-lg font-bold mt-4">Big bottle of mineral water</h3>
                  <p className="text-gray-600 text-sm text-center my-2">
                    Large bottle of purified water with dispenser included
                  </p>
                  <div className="mt-4 mb-6">
                    <span className="text-xl font-bold">$24.99 - $36.99</span>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 w-full">Add to Cart</Button>
                </div>
              </AnimatedSection>

              {/* Option 3 */}
              <AnimatedSection delay={400}>
                <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
                  <Image src="/download.jpeg?height=200&width=200" alt="Water bottles" width={200} height={200} />
                  <h3 className="text-lg font-bold mt-4">Small bottles of mineral water</h3>
                  <p className="text-gray-600 text-sm text-center my-2">
                    Convenient small bottles perfect for on-the-go
                  </p>
                  <div className="mt-4 mb-6">
                    <span className="text-xl font-bold">$12.99</span>
                  </div>
                  <Button className="bg-blue-500 hover:bg-blue-600 w-full">Add to Cart</Button>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={500} className="flex justify-center mt-10">
              <Button className="bg-blue-500 hover:bg-blue-600">View All Products</Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Delivery Service Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center">
              <AnimatedSection animation="fade-in-left" className="md:w-1/2 mb-10 md:mb-0">
                <Image
                  src="/delivery.jpeg?height=400&width=400"
                  alt="Delivery person with water"
                  width={400}
                  height={400}
                  className="mx-auto"
                />
              </AnimatedSection>
              <AnimatedSection animation="fade-in-right" className="md:w-1/2">
                <h2 className="text-3xl font-bold mb-6">
                  DELIVERY <span className="text-blue-500">SERVICE</span>
                </h2>
                <p className="text-gray-600 mb-8">
                  We provide efficient, fast delivery service to your home or office. Our team ensures your water is
                  delivered promptly and with care.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">FREE DELIVERY</h3>
                      <p className="text-gray-600 text-sm">On all orders over $50</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">1 HOUR DELIVERY</h3>
                      <p className="text-gray-600 text-sm">Quick delivery within city limits</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="bg-blue-50 p-3 rounded-full mr-4">
                      <svg
                        className="w-6 h-6 text-blue-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                    </div>
                    <div>
                      <h3 className="font-bold">$30 - $100</h3>
                      <p className="text-gray-600 text-sm">Affordable pricing options</p>
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <Button className="bg-blue-500 hover:bg-blue-600">Order Now</Button>
                  <Button variant="link" className="text-blue-500 ml-4">
                    Read More
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Our Story Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-center text-3xl font-bold mb-4">OUR STORY</h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12">
                Our company was founded in 1995. Since then, we've been committed to providing the purest water possible
                to our customers. We believe in the importance of hydration for health and wellness.
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <AnimatedSection delay={200}>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full mb-4 shadow-md">
                    <svg
                      className="w-10 h-10 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-center">LABORATORY CONTROL</h3>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={300}>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full mb-4 shadow-md">
                    <svg
                      className="w-10 h-10 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-center">DAILY DELIVERY</h3>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={400}>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full mb-4 shadow-md">
                    <svg
                      className="w-10 h-10 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-center">FREE SAMPLES</h3>
                </div>
              </AnimatedSection>

              <AnimatedSection delay={500}>
                <div className="flex flex-col items-center">
                  <div className="bg-white p-4 rounded-full mb-4 shadow-md">
                    <svg
                      className="w-10 h-10 text-blue-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      ></path>
                    </svg>
                  </div>
                  <h3 className="text-sm font-bold text-center">100% PURE WATER</h3>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* How We Extract Water Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-12 text-center">
                HOW WE EXTRACT <span className="text-blue-500">WATER</span>
              </h2>
            </AnimatedSection>

            <div className="flex flex-col md:flex-row items-center">
              <AnimatedSection animation="fade-in-left" className="md:w-1/2 mb-10 md:mb-0">
                <Image
                  src="/tech.jpeg?height=200&width=500"
                  alt="Water extraction process"
                  width={500}
                  height={300}
                  className="rounded-lg"
                />
              </AnimatedSection>
              <AnimatedSection animation="fade-in-right" className="md:w-1/2 md:pl-10">
                <h3 className="text-xl font-bold mb-4">Our Technology</h3>
                <p className="text-gray-600 mb-6">
                  We use advanced filtration systems to extract pure water from natural sources. Our technology ensures
                  that every drop of water is clean, fresh, and free from impurities.
                </p>
                <div className="flex space-x-4">
                  <Button className="bg-blue-500 hover:bg-blue-600">Learn More</Button>
                  <Link href="/water-sources">
                    <Button variant="outline" className="border-blue-500 text-blue-500 hover:bg-blue-50">
                      <Mountain className="h-4 w-4 mr-2" />
                      Explore Water Sources
                    </Button>
                  </Link>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-2 text-center">
                WHAT <span className="text-blue-500">OUR CLIENTS SAY</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-gray-600 mb-12">Testimonials from our customers</p>
            </AnimatedSection>

            <div className="relative">
              <AnimatedSection animation="scale-in" delay={200}>
                <div className="flex overflow-hidden">
                  <div className="w-full md:w-2/3 mx-auto bg-white rounded-lg shadow-md p-8">
                    <div className="flex flex-col md:flex-row items-center">
                      <div className="mb-6 md:mb-0 md:mr-8">
                        <Image
                          src="/customer.jpeg?height=120&width=120"
                          alt="Customer"
                          width={120}
                          height={120}
                          className="rounded-full"
                        />
                      </div>
                      <div>
                        <p className="text-gray-600 italic mb-4">
                          "I've been using this water delivery service for over a year now and I'm extremely satisfied
                          with the quality and convenience. The water tastes great and delivery is always on time."
                        </p>
                        <h3 className="font-bold">Silvia Stone</h3>
                      </div>
                    </div>
                  </div>
                </div>
              </AnimatedSection>

              <button className="absolute left-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                <ChevronLeft className="h-6 w-6 text-blue-500" />
              </button>

              <button className="absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full p-2 shadow-md">
                <ChevronRight className="h-6 w-6 text-blue-500" />
              </button>
            </div>

            <AnimatedSection delay={300} className="flex justify-center mt-8">
              <Button className="bg-blue-500 hover:bg-blue-600">View All Reviews</Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Statistics Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center text-center">
              <AnimatedSection animation="fade-in-up" delay={100} className="w-full md:w-1/3 mb-8 md:mb-0">
                <h3 className="text-4xl font-bold text-blue-500">2,375</h3>
                <p className="text-gray-600">Happy Customers</p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-up" delay={200} className="w-full md:w-1/3 mb-8 md:mb-0">
                <h3 className="text-4xl font-bold text-blue-500">11</h3>
                <p className="text-gray-600">Years of Experience</p>
              </AnimatedSection>

              <AnimatedSection animation="fade-in-up" delay={300} className="w-full md:w-1/3">
                <h3 className="text-4xl font-bold text-blue-500">99%</h3>
                <p className="text-gray-600">Customer Satisfaction</p>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Blog Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-3xl font-bold mb-2 text-center text-blue-500">OUR BLOG</h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-gray-600 mb-12">Latest news</p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Blog Post 1 */}
              <AnimatedSection animation="fade-in-up" delay={200}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <Image
                      src="/savewater.jpeg?height=200&width=400"
                      alt="Blog post"
                      width={400}
                      height={200}
                      className="w-full"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      1
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">The importance of clean water</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Clean water is essential for health and wellbeing. Learn why you should prioritize water quality.
                    </p>
                    <Button variant="link" className="text-blue-500 p-0">
                      Read More
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Blog Post 2 */}
              <AnimatedSection animation="fade-in-up" delay={300}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <Image
                      src="/bottlewater.jpeg?height=200&width=400"
                      alt="Blog post"
                      width={400}
                      height={200}
                      className="w-full"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      2
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">Why bottled water is better</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Discover the benefits of choosing bottled water over tap water for your daily hydration needs.
                    </p>
                    <Button variant="link" className="text-blue-500 p-0">
                      Read More
                    </Button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Blog Post 3 */}
              <AnimatedSection animation="fade-in-up" delay={400}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative">
                    <Image
                      src="/hydration.jpeg?height=200&width=400"
                      alt="Blog post"
                      width={400}
                      height={200}
                      className="w-full"
                    />
                    <div className="absolute top-4 left-4 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      3
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2">Hydration and its benefits</h3>
                    <p className="text-gray-600 text-sm mb-4">
                      Learn about the importance of staying hydrated and how it affects your overall health.
                    </p>
                    <Button variant="link" className="text-blue-500 p-0">
                      Read More
                    </Button>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            <AnimatedSection delay={500} className="flex justify-center mt-10">
              <Button className="bg-blue-500 hover:bg-blue-600">View All Posts</Button>
            </AnimatedSection>
          </div>
        </section>

        {/* Water Sources Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-center text-3xl font-bold mb-2">
                WATER <span className="text-blue-500">SOURCES</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-gray-600 mb-12">Discover the journey of water from source to tap</p>
            </AnimatedSection>

            <AnimatedSection delay={200} className="flex flex-col md:flex-row gap-8 items-center">
              <div className="md:w-1/2">
                <Image
                  src="/origin.jpeg?height=400&width=500"
                  alt="Water sources"
                  width={500}
                  height={400}
                  className="rounded-lg"
                />
              </div>
              <div className="md:w-1/2 space-y-6">
                <h3 className="text-xl font-bold">The Origin of Our Water</h3>
                <p className="text-gray-600">
                  Our water comes from carefully selected natural sources including pristine springs, protected
                  aquifers, and glacial reserves. Each source is chosen for its unique mineral profile and exceptional
                  purity.
                </p>
                <p className="text-gray-600">
                  We believe that understanding where your water comes from is just as important as knowing what's in
                  it. That's why we've created an interactive visualization tool to explore different water sources.
                </p>
                <Link href="/water-sources">
                  <Button className="bg-blue-500 hover:bg-blue-600">
                    <Mountain className="h-4 w-4 mr-2" />
                    Explore Water Sources
                  </Button>
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </section>

        {/* Water Quality Calculator Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <AnimatedSection>
              <h2 className="text-center text-3xl font-bold mb-2">
                WATER <span className="text-blue-500">QUALITY CALCULATOR</span>
              </h2>
            </AnimatedSection>
            <AnimatedSection delay={100}>
              <p className="text-center text-gray-600 mb-12">
                Check your water quality and get personalized recommendations
              </p>
            </AnimatedSection>

            <AnimatedSection delay={200}>
              <div className="max-w-4xl mx-auto mb-10">
                <WaterQualityCalculator />
              </div>
            </AnimatedSection>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-navy-900 text-white mt-10 pb-8 relative">
        <div className="absolute mt-10 left-0 right-0 w-full overflow-hidden" style={{ transform: "translateY(-99%)" }}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto">
            <path
              fill="#0a1435"
              d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Links Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Shop
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Contact Us</h3>
              <p className="text-gray-300 mb-2">123 Water Street, Anytown, USA</p>
              <p className="text-gray-300 mb-2">+1 (234) 567-8900</p>
              <p className="text-gray-300">info@wavio.com</p>
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" className="text-gray-300 hover:text-white transition-colors">
                  <Instagram className="h-5 w-5" />
                </Link>
              </div>
            </div>

            {/* Newsletter Section */}
            <div>
              <h3 className="text-lg font-bold mb-4">Subscribe to Newsletter</h3>
              <p className="text-gray-300 mb-4">Stay updated with our latest news and offers</p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-4 py-2 w-full rounded-l-md focus:outline-none text-gray-900"
                />
                <Button className="bg-blue-500 hover:bg-blue-600 rounded-l-none">Subscribe</Button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-300 text-sm">
            <p>&copy; {new Date().getFullYear()} Wavio. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
