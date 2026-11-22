import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './tailwind.css';

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

// configuracion de apollo client
const client = new ApolloClient({
    uri: '/graphql',
    cache: new InMemoryCache(),
});

// iniciar msw antes de cargar la aplicacion
async function iniciarAplicacion() {
    try {
        const { worker } = await import('./mocks/browser');
        await worker.start({
            onUnhandledRequest: 'bypass'
        });
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
        console.error('Error al iniciar la aplicacion:', error);
    }
}
iniciarAplicacion();
reportWebVitals();