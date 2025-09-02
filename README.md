# AI LinkedIn Outreach SAAS

## Project Description

A modern web application designed to streamline LinkedIn outreach campaigns. It leverages AI to identify and generate targeted prospect lists based on user-defined criteria such as job title, industry, location, and organization type, helping users efficiently find ideal leads for their campaigns.

## Features

- **AI-Powered Prospect Targeting**: Utilizes advanced AI algorithms to find prospects that precisely match specified criteria.
- **Intuitive User Interface**: Provides a user-friendly form for defining detailed outreach parameters.
- **Quality Lead Generation**: Generates verified profiles with comprehensive professional information.
- **Instant Results**: Delivers prospect lists rapidly, enabling quick campaign initiation.
- **Frontend**: Built with React, Vite, TypeScript, and a rich set of UI components from Shadcn-UI.
- **Backend**: A Node.js/Express.js server handles the outreach request processing and integration.

## Technologies Used

- **Frontend**: React, Vite, TypeScript, Shadcn-UI, Tailwind CSS, Radix UI, Framer Motion, React Router DOM.
- **Backend**: Node.js, Express.js, CORS, Dotenv.
- **Other Key Libraries**: `@hookform/resolvers`, `react-hook-form`, `@tanstack/react-query`, `zod`, `npm-run-all`.

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or Bun package manager

### Installation

```bash
# Step 1: Clone the repository
git clone https://github.com/Dap42/outreach-sparkle-78.git

# Step 2: Navigate to the project directory
cd outreach-sparkle-78

# Step 3: Install dependencies
npm install # or bun install

# Step 4: Set up environment variables
# Create a `.env` file in the root directory.
# Example content for .env:
# VITE_API_URL=http://localhost:5678/webhook/YOUR_WEBHOOK_ID
# (You may need to replace YOUR_WEBHOOK_ID with the actual webhook ID if applicable)

# Step 5: Start the development servers (frontend and backend)
npm run dev
# This command concurrently runs the Vite development server for the frontend
# and the Node.js server.js for the backend.
```

## Project Structure

- `public/`: Contains static assets like `favicon.ico`, `robots.txt`, and placeholder images.
- `src/`: The main directory for the frontend application's source code.
  - `src/assets/`: Stores images and other media resources.
  - `src/components/`: Houses reusable UI components, including custom components and those from Shadcn-UI.
  - `src/context/`: Manages global state using React Context (e.g., `AuthContext.tsx`).
  - `src/hooks/`: Contains custom React hooks for encapsulating reusable logic (e.g., `use-toast.ts`).
  - `src/lib/`: Provides utility functions and helper modules (e.g., `utils.ts`).
  - `src/pages/`: Defines the main views and routes of the application (e.g., `Outreach.tsx`, `Results.tsx`, `Login.tsx`, `Home.tsx`).
- `server.js`: The entry point for the backend server, implemented with Express.js.

## Usage

- After starting the development servers, open your web browser and navigate to `http://localhost:5173` (or the port indicated by Vite).
- On the Outreach page, fill in the required fields for job title, industry, location, organization type, and desired results range.
- Click the "Find My Prospects" button to initiate the AI-powered lead generation process.
- You will be redirected to a results page where the generated prospect list will be displayed.

## Deployment

- This project can be built for production using `npm run build`. The output will be in the `dist` directory.
- Further deployment steps would depend on your chosen hosting platform (e.g., Vercel, Netlify, AWS, etc.).

## Contributing

- Contributions are welcome! Please fork the repository and submit pull requests.
- Ensure your code adheres to the project's coding standards and includes relevant tests.
