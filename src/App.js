import React from 'react';
import { HashRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DestinationList from './DestinationList';
import TravelDetails from './TravelDetails';

function App() {

    return (
        <Router>
            <div className="app-container text-slate-800">
                {/* encabezado */}
                <Header />
                {/* navegacion */}
                <Navbar />
                {/* contenido principal */}
                <main className="flex-grow px-4 py-8 max-w-5xl mx-auto w-full">
                    <Routes>
                        {/* pagina de inicio */}
                        <Route
                            path="/"
                            element={
                                <div className="text-center py-16 bg-white rounded-2xl shadow border border-slate-200 p-8">
                                    <div className="text-5xl mb-4">
                                        ✈️
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800 mb-2">
                                        Bienvenido a OpenTravel
                                    </h2>
                                    <p className="text-slate-500 text-sm mb-6">
                                        Explora destinos turísticos, encuentra vuelos y descubre hoteles para tu próxima aventura.
                                    </p>
                                    <Link
                                        to="/destinations"
                                        className="inline-block bg-blue-900 hover:bg-blue-800 text-white px-6 py-3 rounded-lg font-semibold transition"
                                    >
                                        Explorar destinos
                                    </Link>

                                </div>
                            }
                        />
                        {/* listado de destinos */}
                        <Route
                            path="/destinations"
                            element={<DestinationList />}
                        />
                        {/* detalle del destino mediante graphql */}
                        <Route
                            path="/destinations/:destination"
                            element={<TravelDetails />}
                        />
                    </Routes>
                </main>
                {/* pie de pagina */}
                <Footer />
            </div>
        </Router>
    );
}
export default App;