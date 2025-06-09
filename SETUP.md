# Setup Instructions for Event Manager App

## Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the GraphQL server:
   ```
   npm run dev
   ```
   The server will start on http://localhost:4000

## Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the Next.js development server:
   ```
   npm run dev
   ```
   The app will be available at http://localhost:3000

## Notes

- Ensure the backend server is running before starting the frontend to enable GraphQL queries.
- The frontend uses Apollo Client to connect to the backend GraphQL server.
- TailwindCSS is used for styling; ensure the styles are properly loaded.
- Use the following URLs for the app:
  - List events: http://localhost:3000/events
  - Create event: http://localhost:3000/events/new
  - Event details: http://localhost:3000/events/[id]
