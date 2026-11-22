import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
    const estiloLink = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-sm font-semibold transition ${
            isActive
                ? 'bg-blue-900 text-white shadow'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
        }`;
    return (
        <nav className="bg-white border-b border-slate-200 px-4 py-3 shadow-sm sticky top-0 z-50">
            <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-3">
                <NavLink
                    to="/"
                    end
                    className={estiloLink}
                >
                    🏠 Inicio
                </NavLink>

                <NavLink
                    to="/destinations"
                    className={estiloLink}
                >
                    🌎 Destinos
                </NavLink>
            </div>
        </nav>
    );
}
export default Navbar;