# DR Website Data

## Server
- Node.js, using an Express server to define API routes that the client can call
- Each route returns the response from an external API request
- - Codebase: a Wordpress REST API endpoint that exposes theme data returned from ongoing curl requests to our websites
- - WPEngine: the WPEngine API (beta), exposes a limited amount of account data 

## Client
- React components
- Top level component queries the backend server via fetch requests to the Express endpoints defined in server.js (for now),
then saves the response data in state and passes it down as props to child components

## Next Steps
- Add authorization
- Compile data into single page dashboard
- Add search/filter functionality
- Add unit and integration tests