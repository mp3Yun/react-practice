import createFetchClient from 'openapi-fetch'

// Create a custom API client
const apiClient = createFetchClient({
  baseUrl: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers if needs
  },
})

export default apiClient
