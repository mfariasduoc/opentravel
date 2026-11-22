import React from 'react';
import { Link } from 'react-router-dom';

function DestinationCard({ destination }) {
    return (
        <article className="destino-card p-5 flex flex-col justify-between bg-white">
            <div>
                <div className="text-3xl mb-3">🌎</div>
                <h3 className="text-xl font-bold text-blue-950 mb-2">
                    {destination.pais}
                </h3>
                <p className="text-slate-500 text-sm mb-3">
                    Capital: {destination.capitales.join(' / ')}
                </p>
                <div className="border-t border-slate-100 pt-3">
                    <p className="text-xs font-bold text-slate-700 mb-2">
                        Atractivos turísticos
                    </p>
                    <ul className="text-sm text-slate-500 space-y-2">
                        {destination.atractivos.slice(0, 3).map((atractivo, index) => (
                            <li key={index}>
                                📍 {atractivo.nombre}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <Link
                to={`/destinations/${destination.id}`}
                className="block text-center bg-blue-900 hover:bg-blue-800 text-white px-4 py-3 rounded-lg text-sm font-semibold mt-5 transition"> 
                Explorar destino
            </Link>
        </article>
    );
}
export default DestinationCard;