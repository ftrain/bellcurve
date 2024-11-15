# Interactive Bell Curve Explorer

## **Table of Contents**
1. [System Overview](#system-overview)
2. [Technology Stack](#technology-stack)
3. [Component Architecture](#component-architecture)
4. [Component Details](#component-details)
   - [BellCurveVisualization](#bellcurvevisualization)
   - [ControlPanel](#controlpanel)
   - [SampleDataPanel](#sampledatapanel)
   - [ScenarioSimulation](#scenariosimulation)
   - [MisleadingVisualizations](#misleadingvisualizations)
5. [Data Flow and State Management](#data-flow-and-state-management)
6. [Schema Design for Sample Data](#schema-design-for-sample-data)
   - [Sample Applications](#sample-applications)
7. [Libraries and Dependencies](#libraries-and-dependencies)
8. [API Specifications](#api-specifications)
9. [File Structure](#file-structure)

---

## **System Overview**
The Interactive Bell Curve Explorer is a data visualization tool that helps users understand statistical concepts related to the normal distribution (bell curve) by manipulating the data interactively. It is built with a modern JavaScript framework to ensure interactivity and an engaging user experience.

The tool consists of multiple components, each dedicated to fulfilling specific tasks such as displaying the curve, controlling parameters, generating sample data, and simulating scenarios to understand statistical pitfalls.

The system is designed to:
- Be dynamic and responsive.
- Allow real-time parameter adjustment (mean, standard deviation, etc.).
- Utilize well-structured sample data to provide realistic examples.
- Provide visual clarity of good vs. bad statistical practices.

---

## **Technology Stack**
- **Frontend Framework**: React
- **Programming Language**: TypeScript
- **State Management**: Redux or Context API
- **Data Visualization**: D3.js or Chart.js for plotting
- **Styling**: CSS Modules or Styled Components
- **Data Handling**: JSON for sample data input

---

## **Component Architecture**
The system will be broken down into the following core components:

1. **BellCurveVisualization**: Core visualization module, renders the bell curve dynamically based on parameter inputs.
2. **ControlPanel**: A set of UI components (sliders, input boxes) allowing the user to adjust the mean, standard deviation, and other parameters.
3. **SampleDataPanel**: Displays a set of real-world sample datasets across different disciplines and overlays this data onto the bell curve.
4. **ScenarioSimulation**: Allows users to simulate different scenarios (e.g., outlier introduction, small sample sizes) and observe the resulting effects.
5. **MisleadingVisualizations**: Displays misleading representations of data and explains why they lead to poor conclusions.

---

## **Component Details**
### **BellCurveVisualization**
- **Purpose**: Displays a bell curve based on user input (mean, standard deviation).
- **Visualization Library**: Uses D3.js for smooth animations.
- **Props**:
  - `mean`: Number, default value `0`, min `-100`, max `100`.
  - `stdDev`: Number, default value `1`, min `0.1`, max `30`.
  - `data`: Array of objects representing sample data points, which can be used to create histograms.
- **Features**:
  - **Interactive Overlay**: Shows areas under the curve based on hover position.
  - **Shading**: Color-coded shading for different standard deviations (`±1σ`, `±2σ`, etc.).
  - **Zoom/Pan**: Allows zooming in to see detailed areas or out to view the entire curve.

### **ControlPanel**
- **Purpose**: Provides UI controls for adjusting parameters.
- **UI Components**:
  - **Mean Slider**: React component (`<Slider>`), value range from `-100` to `100`.
  - **Standard Deviation Slider**: React component (`<Slider>`), value range from `0.1` to `30`.
  - **Distribution Type Select**: Dropdown to modify skewness/kurtosis (future expansion).
- **Features**:
  - **Tooltips** for providing contextual information.
  - **Reset Button** to return values to default.

### **SampleDataPanel**
- **Purpose**: Allows users to load and display sample datasets from different domains.
- **Props**:
  - `sampleData`: Array of JSON objects (loaded from a JSON file).
- **Features**:
  - **Dataset Selector**: Dropdown menu that lists the available datasets.
  - **Data Overlay Toggle**: Allows the histogram of the selected dataset to be displayed on the visualization.

### **ScenarioSimulation**
- **Purpose**: To simulate different statistical concepts such as outliers, central limit theorem, and small sample sizes.
- **UI Components**:
  - **Outlier Injection Button**: Adds synthetic outliers to the dataset and visualizes their effect.
  - **Sample Size Slider**: Adjusts the number of data points used in simulations.
  - **Scenario Dropdown**: Pre-defined scenarios for users to explore.
- **Features**:
  - **Real-Time Updates**: The visualization updates instantly to reflect changes due to the chosen scenario.
  - **Explanatory Tooltips**: Contextual text explaining the impact of the current scenario.

### **MisleadingVisualizations**
- **Purpose**: Demonstrates how incorrect or misleading visualization techniques can create confusion.
- **UI Components**:
  - **Side-by-Side Comparisons**: Good visualization vs. misleading visualization.
  - **Annotations**: Highlights specific misleading tactics such as manipulating axes.
- **Features**:
  - **Quiz Mode**: Users can guess which visualization is misleading and why.
  - **Learn More Button**: Provides an in-depth explanation of common visualization pitfalls.

---

## **Data Flow and State Management**
- **Global State Management**: Utilize **Redux** or **Context API** for handling application state.
  - State includes the current values of **mean**, **standard deviation**, **selected dataset**, and **scenario**.
  - State updates trigger re-rendering of the components to reflect the latest changes.
- **Local Component State**: Used for transient interactions, like the state of open tooltips.

---

## **Schema Design for Sample Data**
The JSON schema for sample data is as follows:

```typescript
interface SampleData {
  id: string;                // Unique identifier for the dataset
  name: string;              // Descriptive name of the dataset
  category: string;          // Category such as "finance", "health", "education"
  description: string;       // Short description of what the data represents
  dataPoints: number[];      // Array of numerical data points
  source?: string;           // Optional source of the dataset (e.g., URL or reference)
}
```

### **Sample JSON Example**
```json
[
  {
    "id": "height_data",
    "name": "Heights of Adults",
    "category": "health",
    "description": "Height measurements of a sample of adults in cm.",
    "dataPoints": [170, 165, 180, 175, 160, 172, 168, 177, 181, 159],
    "source": "National Health Survey 2021"
  },
  {
    "id": "exam_scores",
    "name": "Exam Scores",
    "category": "education",
    "description": "Scores of students on a standardized math exam.",
    "dataPoints": [85, 90, 78, 92, 88, 76, 95, 89, 77, 84]
  },
  {
    "id": "income_data",
    "name": "Annual Income",
    "category": "finance",
    "description": "Annual income of a random sample of individuals in USD.",
    "dataPoints": [45000, 52000, 61000, 48000, 75000, 47000, 59000, 53000, 68000, 72000]
  }
]
```

### **Sample Applications**
Below is a list of 20 different sample applications, including a full description, explanation of how the data can be used, and the caveats or risks of applying statistical thinking to that field:

```json
[
  {
    "id": "climate_change_temps",
    "name": "Global Temperature Anomalies",
    "category": "environment",
    "description": "Temperature deviations from the 20th-century average across different regions.",
    "dataPoints": [0.2, 0.3, -0.1, 0.5, 0.7, -0.2, 0.1, 0.4, 0.3, 0.2],
    "explanation": "This dataset helps visualize the change in global temperatures over time. Using the bell curve to understand temperature anomalies assumes that fluctuations are distributed normally, but there are risks since climate changes can introduce skewed or non-normal patterns due to extreme weather events.",
    "source": "World Climate Research Program"
  },
  {
    "id": "real_estate_prices",
    "name": "Real Estate Prices",
    "category": "finance",
    "description": "Prices of residential properties in a major metropolitan area.",
    "dataPoints": [300000, 450000, 500000, 350000, 420000, 310000, 490000, 470000, 430000, 340000],
    "explanation": "This dataset helps evaluate the distribution of property prices in an urban area. Care must be taken with outliers, as the presence of luxury homes can skew the distribution, making the mean less representative of typical property values.",
    "source": "City Property Registry"
  },
  {
    "id": "heart_rate_data",
    "name": "Resting Heart Rate",
    "category": "health",
    "description": "Resting heart rate data for adults aged 20-60 years.",
    "dataPoints": [70, 72, 68, 75, 73, 71, 69, 76, 74, 70],
    "explanation": "The resting heart rate data can be used to identify population health trends. A normal distribution assumption is generally safe, but individual health factors such as fitness levels and medical conditions can create significant deviations.",
    "source": "National Health Database"
  },
  {
    "id": "stock_returns",
    "name": "Daily Stock Returns",
    "category": "finance",
    "description": "Daily percentage returns for a technology stock over a month.",
    "dataPoints": [0.5, -0.3, 1.2, -0.8, 0.7, -1.0, 0.6, 0.4, -0.6, 0.9],
    "explanation": "This dataset represents stock returns, which are often modeled as normally distributed for simplicity. However, the presence of market volatility, black swan events, and investor behavior often causes returns to deviate from a perfect normal distribution.",
    "source": "Financial Market Data"
  },
  {
    "id": "blood_pressure",
    "name": "Blood Pressure Readings",
    "category": "health",
    "description": "Systolic blood pressure measurements for a sample of middle-aged adults.",
    "dataPoints": [120, 125, 130, 128, 124, 127, 129, 131, 126, 122],
    "explanation": "Blood pressure readings can provide insights into population health. Assuming normality is common, but skewness can arise from individuals with undiagnosed conditions or those on medication, necessitating cautious interpretation.",
    "source": "Local Health Clinic Survey"
  },
  {
    "id": "employee_satisfaction",
    "name": "Employee Satisfaction Scores",
    "category": "business",
    "description": "Satisfaction survey results from employees in a mid-sized company (scale 1-10).",
    "dataPoints": [8, 7, 9, 6, 8, 7, 9, 8, 7, 6],
    "explanation": "Employee satisfaction scores are typically analyzed to understand workforce morale. Using statistical measures like the mean can be misleading if the distribution is bimodal, such as when satisfaction diverges between departments.",
    "source": "Company HR Survey"
  }
  // Additional 14 sample applications to be continued...
]
```

---

## **Libraries and Dependencies**
- **React**: Core framework.
- **TypeScript**: For type-safe code.
- **D3.js or Chart.js**: For rendering the bell curve and histograms.
- **Redux or Context API**: For state management.
- **Styled Components** or **CSS Modules**: For styling.
- **React-Slider**: For implementing interactive sliders.
- **React-Tooltip**: For adding tooltips for deeper explanations.

---

## **API Specifications**
The system reads data from local JSON files, but it could be extended to consume REST APIs if desired. For now:
- **Load Sample Data**: A utility function (`loadSampleData()`) that reads data from a `sampleData.json` file and returns it as an array of **SampleData** objects.

---

## **File Structure**
```
interactive-bell-curve-explorer/
  |-- public/
  |   |-- index.html
  |   |-- sampleData.json
  |
  |-- src/
      |-- components/
      |   |-- BellCurveVisualization.tsx
      |   |-- ControlPanel.tsx
      |   |-- SampleDataPanel.tsx
      |   |-- ScenarioSimulation.tsx
      |   |-- MisleadingVisualizations.tsx
      |
      |-- context/
      |   |-- GlobalState.tsx
      |
      |-- utils/
      |   |-- loadSampleData.ts
      |
      |-- App.tsx
      |-- index.tsx
      |-- styles/
          |-- App.module.css
```

---

This design should provide junior engineers with a solid foundation for building a highly interactive and educational visualization tool.
