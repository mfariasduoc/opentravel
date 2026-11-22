import React, { useEffect, useState } from 'react';
import DestinationCard from './components/DestinationCard';
const PUBLIC_URL = process.env.PUBLIC_URL || '';
function DestinationList() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    // consulta rest para obtener los destinos
 function cargarDestinos() {
        setLoading(true);
        setError(null);

        fetch(`${PUBLIC_URL}/api/destinations`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(
                        'No fue posible obtener los destinos.'
                    );
                }
                return response.json();
            })
            .then((data) => {
                setDestinations(data);
                setLoading(false);
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    }

    useEffect(() => {
        cargarDestinos();
    }, []);

    if (loading) {
        return (
            <div className="text-center py-16">
                <p className="text-slate-500 animate-pulse">
                    Cargando destinos disponibles...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-rose-50 border border-rose-200 text-rose-700 p-6 rounded-xl text-center">
                <p className="font-bold mb-2">
                    Error al cargar destinos
                </p>
                <p className="text-sm mb-4">{error}</p>
                <button
                    onClick={cargarDestinos}
                    className="bg-blue-900 hover:bg-blue-800 text-white px-5 py-2 rounded-lg text-sm font-semibold"
                >
                    Intentar nuevamente
                </button>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h2 className="text-2xl font-bold text-blue-950">
                    Explora Sudamérica
                </h2>
                <p className="text-slate-500 text-sm mt-2">
                    Selecciona un país y descubre sus atractivos turísticos.
                </p>
            </div>

            {destinations.length > 0 ? (
                <div className="destinos-cont">
                    {destinations.map((destination) => (
                        <DestinationCard
                            key={destination.id}
                            destination={destination}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-white p-12 rounded-xl text-center border border-slate-200 shadow-sm">
                    <p className="text-slate-500">
                        No hay destinos disponibles en este momento.
                    </p>
                </div>
            )}
        </div>
    );
}

export default DestinationList;