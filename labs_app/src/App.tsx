import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layout';
import Home from './pages/Home/Home';
import Client from './pages/Client/Client';

const queryClient = new QueryClient();

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Layout>
                    <Routes>
                        <Route path="/client">
                            <Route path=":clientId" element={<Client />} />
                        </Route>
                        <Route path="/" element={<Home />} />
                    </Routes>
                </Layout>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
