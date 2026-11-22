import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { gql, useQuery } from '@apollo/client';
import FlightCard from './components/FlightCard';
import HotelCard from './components/HotelCard';

// consulta graphql para obtener vuelos y hoteles
const GET_TRAVEL_OPTIONS = gql`
    query GetTravelOptions($destinationId: String!) {
        flights(destinationId: $destinationId) {
            id
            airline
            origin
            destination
            price
            date
            available
        }
        hotels(destinationId: $destinationId) {
            id
            name
            city
            price
            date
            available
        }
    }
`;

function TravelDetails() {
    const { destination } = useParams();
    const { loading, error, data } = useQuery(GET_TRAVEL_OPTIONS, {
        variables: {
            destinationId: destination
        }
    });
    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-slate-500 animate-pulse">
                    Cargando vuelos y hoteles...
                </p>
            </div>
        );
    }
    if (error) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-xl">
                <h2 className="font-bold mb-2">
                    Error al consultar los viajes
                </h2>
                <p>{error.message}</p>
                <Link
                    to="/destinations"
                    className="text-blue-800 font-semibold mt-4 inline-block"
                >
                    Volver a destinos
                </Link>
            </div>
        );
    }
    return (
        <div className="space-y-8">
            <div>
                <Link
                    to="/destinations"
                    className="text-blue-800 font-semibold text-sm"
                >
                    ← Volver a destinos
                </Link>
                <h2 className="text-2xl font-bold text-blue-950 mt-4">
                    Opciones de viaje
                </h2>
                <p className="text-slate-500 text-sm">
                    Vuelos y hoteles disponibles para {destination}.
                </p>
            </div>
            {/* vuelos */}
            <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">
                    ✈️ Vuelos disponibles
                </h3>
                {data?.flights?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.flights.map((flight) => (
                            <FlightCard
                                key={flight.id}
                                flight={flight}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-amber-50 border border-amber-200 text-amber-800 p-5 rounded-xl">
                        <p className="font-semibold">
                            No hay vuelos disponibles para este destino en este momento.
                        </p>
                        <p className="text-sm mt-1">
                            Puedes consultar los hoteles disponibles mientras tanto.
                        </p>
                    </div>
                )}
            </section>
            {/* hoteles */}
            <section>
                <h3 className="text-xl font-bold text-blue-950 mb-4">
                    🏨 Hoteles disponibles
                </h3>
                {data?.hotels?.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {data.hotels.map((hotel) => (
                            <HotelCard
                                key={hotel.id}
                                hotel={hotel}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500">
                        No hay hoteles disponibles para este destino.
                    </p>
                )}
            </section>
        </div>
    );
}
export default TravelDetails;