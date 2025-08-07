// mocks/handlers.js
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/endpoint', () => 
    HttpResponse.json({ message: 'Mock response' })
  ),
];
