import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import client_1 from './fixtures/client1.json';
import hunt_1 from './fixtures/hunt1.json';
import filters from './fixtures/filters.json';

export const handlers = [
    http.get('http://localhost:3001/client/1', () => {
        return HttpResponse.json(client_1);
    }),
    http.get('http://localhost:3001/hunt/1', () => {
        return HttpResponse.json(hunt_1);
    }),
    http.get('http://localhost:3001/config/filters', () => {
        return HttpResponse.json(filters);
    }),
];

export const server = setupServer(...handlers);
