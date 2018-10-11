# DR Website Data

## Backend
- Node.js, using an Express server to define API routes that the client can call
- Each route returns the response from an external API request
- - Codebase: a Wordpress REST API endpoint that exposes theme data returned from ongoing curl requests to our websites
- - WPEngine: the WPEngine API (beta), exposes a variety of account data 

## Frontend
- React components (initially bootstrapped via create-react-app)
- Top level components query the backend server via fetch requests to the Express endpoints defined in server.js (for now),
then save the response data in state and pass it down as props to child components

## Next
- Add authorization
- Query APIs ony once when main component mounts, save all data in session or similar, instead of each time a component mounts