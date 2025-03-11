# Team Self-Assessment Tool

A React-based web application that allows teams to assess their performance across five key domains: Strategic Focus, Change Maker, Inclusive, Collaborative, and Entrepreneurial.

## Overview

This tool enables teams to evaluate their capabilities through a series of questions in each domain. Team members can rate their performance using a traffic light system (Strength, Developing, Needs Growth), and results are visualized in a radar chart.

## Features

- **Domain-based Assessment**: Structured evaluation across five key domains
- **Traffic Light Rating System**: Simple 3-level scoring (Strength, Developing, Needs Growth)
- **Real-time Visualization**: Dynamic radar chart updates as ratings are entered
- **Responsive Design**: Works on desktop and mobile devices

## Technical Stack

- React
- Recharts for data visualization
- Tailwind CSS for styling

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/team-assessment-tool.git
cd team-assessment-tool
```

2. Install dependencies:
```bash
npm install
# or
yarn
```

3. Start the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. For each question in each domain, select the appropriate rating:
   - 🟢 Strength (5 points)
   - 🟡 Developing (3 points)
   - 🔴 Needs Growth (1 point)

2. As you complete the assessment, the radar chart automatically updates to show the team's average score in each domain.

## Project Structure

- `App.jsx` - Main application component
- `RadarChartComponent.jsx` - Visualization component for the radar chart
- `TrafficLightAssessment.jsx` - Component for rendering the traffic light indicators
- `index.css` - Global styles
- `main.jsx` - Application entry point

## Customization

To modify the assessment domains or questions, edit the `domains` and `questions` objects in `App.jsx`.
