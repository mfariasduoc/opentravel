import { http, graphql, HttpResponse, delay } from 'msw';
const PUBLIC_URL = process.env.PUBLIC_URL || '';
// destinos disponibles en sudamerica
const destinations = [
    {
        id: 'argentina',
        pais: 'Argentina',
        capitales: ['Buenos Aires'],
        atractivos: [
            {
                nombre: 'Cataratas del Iguazu',
                ubicacion: 'Misiones',
                fechas_recomendadas: ['Abril - Junio', 'Agosto - Octubre'],
                motivo: 'Temperaturas agradables y buen caudal de agua.'
            },
            {
                nombre: 'Glaciar Perito Moreno',
                ubicacion: 'Santa Cruz',
                fechas_recomendadas: ['Noviembre - Marzo'],
                motivo: 'Dias largos y temperaturas mas templadas.'
            },
            {
                nombre: 'Barrios historicos de Buenos Aires',
                ubicacion: 'Buenos Aires',
                fechas_recomendadas: ['Marzo - Mayo', 'Septiembre - Noviembre'],
                motivo: 'Clima templado ideal para recorrer la ciudad.'
            }
        ]
    },
    {
        id: 'bolivia',
        pais: 'Bolivia',
        capitales: ['Sucre', 'La Paz'],
        atractivos: [
            {
                nombre: 'Salar de Uyuni',
                ubicacion: 'Potosi',
                fechas_recomendadas: ['Mayo - Octubre', 'Enero - Marzo'],
                motivo: 'Permite conocer el salar seco o disfrutar del efecto espejo.'
            },
            {
                nombre: 'Lago Titicaca',
                ubicacion: 'La Paz',
                fechas_recomendadas: ['Mayo - Octubre'],
                motivo: 'Temporada seca ideal para recorrer el lago.'
            },
            {
                nombre: 'Parque Nacional Madidi',
                ubicacion: 'Amazonia boliviana',
                fechas_recomendadas: ['Mayo - Octubre'],
                motivo: 'Mejores condiciones para observar fauna y recorrer senderos.'
            }
        ]
    },
    {
        id: 'brasil',
        pais: 'Brasil',
        capitales: ['Brasilia'],
        atractivos: [
            {
                nombre: 'Rio de Janeiro',
                ubicacion: 'Rio de Janeiro',
                fechas_recomendadas: ['Abril - Junio', 'Septiembre - Noviembre'],
                motivo: 'Clima calido y menor aglomeracion turistica.'
            },
            {
                nombre: 'Cataratas del Iguazu',
                ubicacion: 'Foz do Iguacu',
                fechas_recomendadas: ['Abril - Junio', 'Agosto - Octubre'],
                motivo: 'Clima moderado para recorrer pasarelas y miradores.'
            },
            {
                nombre: 'Selva Amazonica',
                ubicacion: 'Manaos',
                fechas_recomendadas: ['Junio - Noviembre'],
                motivo: 'Periodo favorable para excursiones y observacion de fauna.'
            }
        ]
    },
    {
        id: 'chile',
        pais: 'Chile',
        capitales: ['Santiago'],
        atractivos: [
            {
                nombre: 'Torres del Paine',
                ubicacion: 'Magallanes',
                fechas_recomendadas: ['Diciembre - Febrero', 'Octubre - Noviembre'],
                motivo: 'Mayor cantidad de horas de luz para realizar excursiones.'
            },
            {
                nombre: 'Desierto de Atacama',
                ubicacion: 'Antofagasta',
                fechas_recomendadas: ['Marzo - Mayo', 'Septiembre - Noviembre'],
                motivo: 'Temperaturas moderadas y cielos despejados.'
            },
            {
                nombre: 'Rapa Nui',
                ubicacion: 'Isla de Pascua',
                fechas_recomendadas: ['Enero - Marzo', 'Octubre - Noviembre'],
                motivo: 'Clima calido ideal para actividades al aire libre.'
            }
        ]
    },
    {
        id: 'colombia',
        pais: 'Colombia',
        capitales: ['Bogota'],
        atractivos: [
            {
                nombre: 'Cartagena de Indias',
                ubicacion: 'Bolivar',
                fechas_recomendadas: ['Diciembre - Marzo'],
                motivo: 'Temporada seca del Caribe ideal para recorrer la ciudad.'
            },
            {
                nombre: 'Valle de Cocora',
                ubicacion: 'Quindio',
                fechas_recomendadas: ['Diciembre - Febrero', 'Julio - Agosto'],
                motivo: 'Condiciones favorables para caminatas y turismo rural.'
            },
            {
                nombre: 'Parque Nacional Tayrona',
                ubicacion: 'Magdalena',
                fechas_recomendadas: ['Diciembre - Marzo'],
                motivo: 'Menor cantidad de lluvias para disfrutar de playas y senderos.'
            }
        ]
    },
    {
        id: 'ecuador',
        pais: 'Ecuador',
        capitales: ['Quito'],
        atractivos: [
            {
                nombre: 'Islas Galapagos',
                ubicacion: 'Archipielago de Galapagos',
                fechas_recomendadas: ['Junio - Noviembre', 'Diciembre - Mayo'],
                motivo: 'Diferentes temporadas para disfrutar de fauna marina y playas.'
            },
            {
                nombre: 'Centro Historico de Quito',
                ubicacion: 'Quito',
                fechas_recomendadas: ['Junio - Septiembre'],
                motivo: 'Meses relativamente secos para recorrer la ciudad.'
            },
            {
                nombre: 'Volcan Cotopaxi',
                ubicacion: 'Avenida de los Volcanes',
                fechas_recomendadas: ['Junio - Septiembre'],
                motivo: 'Mejor visibilidad de las cumbres y senderos.'
            }
        ]
    },
    {
        id: 'guyana',
        pais: 'Guyana',
        capitales: ['Georgetown'],
        atractivos: [
            {
                nombre: 'Cataratas Kaieteur',
                ubicacion: 'Parque Nacional Kaieteur',
                fechas_recomendadas: ['Febrero - Abril', 'Agosto - Noviembre'],
                motivo: 'Condiciones favorables para vuelos y caminatas.'
            },
            {
                nombre: 'Selva de Iwokrama',
                ubicacion: 'Reserva de Iwokrama',
                fechas_recomendadas: ['Agosto - Noviembre', 'Febrero - Abril'],
                motivo: 'Periodo favorable para observar fauna y aves.'
            },
            {
                nombre: 'Catedral de San Jorge',
                ubicacion: 'Georgetown',
                fechas_recomendadas: ['Febrero - Abril', 'Agosto - Noviembre'],
                motivo: 'Menor intensidad de lluvias para recorrer la ciudad.'
            }
        ]
    },
    {
        id: 'paraguay',
        pais: 'Paraguay',
        capitales: ['Asuncion'],
        atractivos: [
            {
                nombre: 'Misiones Jesuiticas',
                ubicacion: 'Itapua',
                fechas_recomendadas: ['Mayo - Septiembre'],
                motivo: 'Temperaturas agradables para recorrer sitios historicos.'
            },
            {
                nombre: 'Represa de Itaipu',
                ubicacion: 'Alto Parana',
                fechas_recomendadas: ['Mayo - Septiembre'],
                motivo: 'Clima agradable para visitas guiadas.'
            },
            {
                nombre: 'Saltos del Monday',
                ubicacion: 'Presidente Franco',
                fechas_recomendadas: ['Abril - Septiembre'],
                motivo: 'Condiciones comodas para disfrutar de miradores y senderos.'
            }
        ]
    },
 {
        id: 'peru',
        pais: 'Peru',
        capitales: ['Lima'],
        atractivos: [
            {
                nombre: 'Machu Picchu',
                ubicacion: 'Cusco',
                fechas_recomendadas: ['Mayo - Septiembre'],
                motivo: 'Temporada seca ideal para recorrer los senderos.'
            },
            {
                nombre: 'Centro Historico de Lima',
                ubicacion: 'Lima',
                fechas_recomendadas: ['Diciembre - Abril'],
                motivo: 'Verano costero con dias soleados y calidos.'
            },
            {
                nombre: 'Oasis de Huacachina',
                ubicacion: 'Ica',
                fechas_recomendadas: ['Abril - Noviembre'],
                motivo: 'Clima favorable para deportes y excursiones en dunas.'
            }
        ]
    },
    {
        id: 'surinam',
        pais: 'Surinam',
        capitales: ['Paramaribo'],
        atractivos: [
            {
                nombre: 'Centro Historico de Paramaribo',
                ubicacion: 'Paramaribo',
                fechas_recomendadas: ['Agosto - Noviembre', 'Febrero - Marzo'],
                motivo: 'Menor cantidad de lluvias para recorrer la ciudad.'
            },
            {
                nombre: 'Reserva Natural de Surinam Central',
                ubicacion: 'Interior de Surinam',
                fechas_recomendadas: ['Agosto - Noviembre'],
                motivo: 'Periodo seco ideal para caminatas en la selva.'
            },
            {
                nombre: 'Reserva Natural Galibi',
                ubicacion: 'Costa noreste',
                fechas_recomendadas: ['Marzo - Julio'],
                motivo: 'Temporada de anidacion de tortugas marinas.'
            }
        ]
    },
    {
        id: 'uruguay',
        pais: 'Uruguay',
        capitales: ['Montevideo'],
        atractivos: [
            {
                nombre: 'Colonia del Sacramento',
                ubicacion: 'Colonia',
                fechas_recomendadas: ['Octubre - Abril'],
                motivo: 'Temperaturas agradables para recorrer el barrio historico.'
            },
            {
                nombre: 'Punta del Este',
                ubicacion: 'Maldonado',
                fechas_recomendadas: ['Diciembre - Marzo'],
                motivo: 'Verano ideal para playas y actividades nauticas.'
            },
            {
                nombre: 'Cabo Polonio',
                ubicacion: 'Rocha',
                fechas_recomendadas: ['Diciembre - Marzo'],
                motivo: 'Temporada favorable para disfrutar de la costa.'
            }
        ]
    },
    {
        id: 'venezuela',
        pais: 'Venezuela',
        capitales: ['Caracas'],
        atractivos: [
            {
                nombre: 'Salto Angel',
                ubicacion: 'Parque Nacional Canaima',
                fechas_recomendadas: ['Junio - Noviembre', 'Diciembre - Abril'],
                motivo: 'Permite disfrutar del mayor caudal o de periodos con menos lluvia.'
            },
            {
                nombre: 'Los Roques',
                ubicacion: 'Dependencias Federales',
                fechas_recomendadas: ['Diciembre - Abril'],
                motivo: 'Clima seco ideal para playas y actividades acuaticas.'
            },
            {
                nombre: 'Roraima y Gran Sabana',
                ubicacion: 'Bolivar',
                fechas_recomendadas: ['Diciembre - Abril'],
                motivo: 'Menos precipitaciones para realizar excursiones.'
            }
        ]
    }
];

// opciones de vuelos y hoteles por destino
const travelOptions = {
    argentina: {
        flights: [
            {
                id: 'vuelo-1',
                airline: 'Aerolineas Argentinas',
                origin: 'Santiago',
                destination: 'Buenos Aires',
                price: 120000,
                date: '2026-12-20',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-1',
                name: 'Hotel Buenos Aires',
                city: 'Buenos Aires',
                price: 65000,
                date: '2026-12-20',
                available: true
            }
        ]
    },
    bolivia: {
        flights: [
            {
                id: 'vuelo-2',
                airline: 'Boliviana de Aviacion',
                origin: 'Santiago',
                destination: 'La Paz',
                price: 160000,
                date: '2026-12-21',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-2',
                name: 'Hotel Andino',
                city: 'La Paz',
                price: 55000,
                date: '2026-12-21',
                available: true
            }
        ]
    },
    brasil: {
        flights: [
            {
                id: 'vuelo-3',
                airline: 'LATAM Airlines',
                origin: 'Santiago',
                destination: 'Rio de Janeiro',
                price: 180000,
                date: '2026-12-22',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-3',
                name: 'Hotel Copacabana',
                city: 'Rio de Janeiro',
                price: 110000,
                date: '2026-12-22',
                available: true
            }
        ]
    },

    chile: {
        flights: [
            {
                id: 'vuelo-4',
                airline: 'LATAM Airlines',
                origin: 'Santiago',
                destination: 'Punta Arenas',
                price: 85000,
                date: '2026-12-15',
                available: true
            },
            {
                id: 'vuelo-5',
                airline: 'Sky Airline',
                origin: 'Santiago',
                destination: 'Calama',
                price: 55000,
                date: '2026-12-18',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-4',
                name: 'Hotel Patagonia',
                city: 'Punta Arenas',
                price: 75000,
                date: '2026-12-15',
                available: true
            },
            {
                id: 'hotel-5',
                name: 'Hotel Atacama',
                city: 'San Pedro de Atacama',
                price: 95000,
                date: '2026-12-18',
                available: true
            }
        ]
    },
    colombia: {
        flights: [
            {
                id: 'vuelo-6',
                airline: 'LATAM Airlines',
                origin: 'Santiago',
                destination: 'Bogota',
                price: 220000,
                date: '2026-12-20',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-6',
                name: 'Hotel Cartagena',
                city: 'Cartagena',
                price: 85000,
                date: '2026-12-20',
                available: true
            }
        ]
    },
    ecuador: {
        flights: [
            {
                id: 'vuelo-7',
                airline: 'LATAM Airlines',
                origin: 'Santiago',
                destination: 'Quito',
                price: 250000,
                date: '2026-12-22',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-7',
                name: 'Hotel Quito',
                city: 'Quito',
                price: 70000,
                date: '2026-12-22',
                available: true
            }
        ]
    },
    guyana: {
        flights: [],
            hotels: [
            {
                id: 'hotel-8',
                name: 'Hotel Kaieteur',
                city: 'Georgetown',
                price: 90000,
                date: '2026-12-23',
                available: true
            }
        ]
    },
    paraguay: {
        flights: [
            {
                id: 'vuelo-9',
                airline: 'LATAM Airlines',
                origin: 'Santiago',
                destination: 'Asuncion',
                price: 175000,
                date: '2026-12-24',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-9',
                name: 'Hotel Asuncion',
                city: 'Asuncion',
                price: 60000,
                date: '2026-12-24',
                available: true
            }
        ]
    },
    peru: {
        flights: [
            {
                id: 'vuelo-10',
                airline: 'Sky Airline',
                origin: 'Santiago',
                destination: 'Lima',
                price: 145000,
                date: '2026-12-25',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-10',
                name: 'Hotel Miraflores',
                city: 'Lima',
                price: 80000,
                date: '2026-12-25',
                available: true
            }
        ]
    },
    surinam: {
        flights: [
            {
                id: 'vuelo-11',
                airline: 'Copa Airlines',
                origin: 'Santiago',
                destination: 'Paramaribo',
                price: 380000,
                date: '2026-12-26',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-11',
                name: 'Hotel Paramaribo',
                city: 'Paramaribo',
                price: 95000,
                date: '2026-12-26',
                available: true
            }
        ]
    },
    uruguay: {
        flights: [
            {
                id: 'vuelo-12',
                airline: 'LATAM Airlines',
                origin: 'Santiago',
                destination: 'Montevideo',
                price: 165000,
                date: '2026-12-27',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-12',
                name: 'Hotel Montevideo',
                city: 'Montevideo',
                price: 85000,
                date: '2026-12-27',
                available: true
            }
        ]
    },
    venezuela: {
        flights: [
            {
                id: 'vuelo-13',
                airline: 'Copa Airlines',
                origin: 'Santiago',
                destination: 'Caracas',
                price: 320000,
                date: '2026-12-28',
                available: true
            }
        ],
        hotels: [
            {
                id: 'hotel-13',
                name: 'Hotel Caracas',
                city: 'Caracas',
                price: 75000,
                date: '2026-12-28',
                available: true
            }
        ]
    }
};

// configuracion de las consultas REST y GraphQL
export const handlers = [

    // REST para obtener todos los destinos
    http.get(`${PUBLIC_URL}/api/destinations`, () => {
        return HttpResponse.json(destinations);
    }),

    // GraphQL para consultar vuelos y hoteles por destino
    graphql.query('GetTravelOptions', async ({ variables }) => {
        const { destinationId } = variables;

        await delay(1000);

        const options = travelOptions[destinationId];

        if (!options) {
            return HttpResponse.json({
                errors: [
                    {
                        message: `No se encontraron opciones de viaje para ${destinationId}`
                    }
                ]
            });
        }

        return HttpResponse.json({
            data: {
                flights: options.flights,
                hotels: options.hotels
            }
        });
    })

];