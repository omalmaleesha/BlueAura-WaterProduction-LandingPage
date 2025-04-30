# BlueAura Water Delivery Service

BlueAura is a modern water delivery service application designed to provide users with clean, refreshing water delivered right to their doorstep. The application includes features such as water quality calculators, regional water quality maps, and an interactive visualization of water sources.

## Features

- **Sticky Header**: A responsive and sticky header for easy navigation.
- **Hero Section**: A visually appealing introduction to the service.
- **Water Quality Calculator**: Analyze water quality and get personalized recommendations.
- **Water Quality Map**: Explore water quality data across different regions.
- **Water Source Visualization**: Learn about various water sources and their impact on quality.
- **Product Showcase**: Display and purchase water products.
- **Testimonials**: Customer reviews and feedback.
- **Blog Section**: Latest news and articles about water and hydration.
- **Footer**: Includes links, contact information, and a newsletter subscription.

## Tech Stack

- **Frontend**: React with Next.js
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **PDF Generation**: jsPDF
- **Maps**: Custom map visualization for water quality data

## Installation

```bash
git clone https://github.com/omalmaleesha/BlueAura-WaterProduction-LandingPage.git
cd BlueAura-WaterProduction-LandingPage
npm install
npm run dev

my-app/
├── app/
│   ├── page.tsx                        # Main application page
│   ├── layout.tsx                      # Application layout
├── components/
│   ├── animated-section.tsx           # Animated section component
│   ├── water-quality-calculator.tsx   # Water quality calculator
│   ├── water-quality-map.tsx          # Water quality map
│   ├── water-source-visualization.tsx # Water source visualization
│   ├── ui/                             # Reusable UI components
├── public/
│   ├── images/                         # Static images
├── styles/
│   ├── globals.css                     # Global styles
├── package.json                        # Project dependencies and scripts
