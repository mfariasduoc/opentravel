import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.css';

import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink } from '@apollo/client';

// gitHub pages
const PUBLIC_URL = process.env.PUBLIC_URL || '';

// configuracion de apollo client
const httpLink = new HttpLink({ uri: `${PUBLIC_URL}/graphql` });

const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

// iniciar msw antes de cargar la aplicacion
async function iniciarAplicacion() {
    try {
        if (process.env.NODE_ENV === 'development') {
            const { worker } = await import('./mocks/browser');

            await worker.start({
                serviceWorker: {
                    url: `${PUBLIC_URL}/mockServiceWorker.js`
                },
                onUnhandledRequest: 'bypass'
            });
        }

        const root = ReactDOM.createRoot(
            document.getElementById('root')
        );

        root.render(
            <React.StrictMode>
                <ApolloProvider client={client}>
                    <App />
                </ApolloProvider>
            </React.StrictMode>
        );

    } catch (error) {
        console.error(
            'Error al iniciar la aplicacion:',
            error
        );
    }
}

iniciarAplicacion();

reportWebVitals();