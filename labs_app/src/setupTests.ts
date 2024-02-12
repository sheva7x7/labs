// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { server } from './testServer';

beforeAll(() => {
    // Enable API mocking before all the tests.
    server.listen();
});

afterEach(() => {
    // Reset the request handlers between each test.
    // This way the handlers we add on a per-test basis
    // do not leak to other, irrelevant tests.
    server.resetHandlers();
});

afterAll(() => {
    // Finally, disable API mocking after the tests are done.
    server.close();
});
