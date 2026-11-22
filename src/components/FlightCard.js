import React from 'react';

function FlightCard({ flight }) {

    return (
        <article className="bg-white p-5 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition">
            <div className="flex items-center justify-between gap-3">
                <h4 className="font-bold text-blue-950">
                    {flight.airline}
                </h4>
                <span className="text-2xl">✈️</span>
            </div>
            <div className="mt-4">
                <p className="text-sm font-semibold text-slate-700">
                    {flight.origin} → {flight.destination}
                </p>
                <p className="text-sm text-slate-500 mt-2">
                    Fecha de salida: {flight.date}
                </p>
            </div>
            <div className="flex flex-wrap justify-between items-center gap-3 mt-5 pt-4 border-t border-slate-100">
                <span className="text-emerald-700 font-bold text-lg">
                    ${flight.price.toLocaleString('es-CL')}
                </span>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                    flight.available
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-rose-50 text-rose-700'
                }`}>
                    {flight.available ? 'Disponible' : 'No disponible'}
                </span>
            </div>
        </article>
    );
}
export default FlightCard;