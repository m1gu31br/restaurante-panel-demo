export const RESERVAS_INICIAL = [
  // ALMUERZO
  { id: 1, cliente: 'Andrés Molina Reyes', hora: '12:00', personas: 4, ambiente: 'Salón', mesa: 'S-03', estado: 'confirmada', turno: 'almuerzo', telefono: '310 234 5678', nota: '' },
  { id: 2, cliente: 'María Alejandra Gutiérrez', hora: '12:30', personas: 2, ambiente: 'Salón', mesa: 'S-07', estado: 'confirmada', turno: 'almuerzo', telefono: '315 876 5432', nota: '' },
  { id: 3, cliente: 'Carlos Ernesto Ospina', hora: '13:00', personas: 8, ambiente: 'Salón', mesa: 'S-09', estado: 'pendiente', turno: 'almuerzo', telefono: '320 111 2233', nota: 'Cumpleaños — pedir pastel' },
  { id: 4, cliente: 'Valentina Ramos Cárdenas', hora: '13:30', personas: 4, ambiente: 'Terraza', mesa: 'T-02', estado: 'confirmada', turno: 'almuerzo', telefono: '311 445 6677', nota: '' },
  { id: 5, cliente: 'Jorge Luis Bermúdez', hora: '14:00', personas: 6, ambiente: 'VIP', mesa: 'V-01', estado: 'confirmada', turno: 'almuerzo', telefono: '317 889 0011', nota: 'Cliente frecuente VIP' },
  { id: 6, cliente: 'Sofía Natalia Méndez', hora: '14:30', personas: 4, ambiente: 'Terraza', mesa: 'T-04', estado: 'cancelada', turno: 'almuerzo', telefono: '312 234 5678', nota: '' },
  // CENA
  { id: 7, cliente: 'Hernando Zapata Ruiz', hora: '19:00', personas: 4, ambiente: 'Salón', mesa: 'S-01', estado: 'confirmada', turno: 'cena', telefono: '313 567 8901', nota: '' },
  { id: 8, cliente: 'Luisa Fernanda Arango', hora: '19:30', personas: 2, ambiente: 'Salón', mesa: 'S-08', estado: 'pendiente', turno: 'cena', telefono: '316 234 5678', nota: 'Alergia a mariscos' },
  { id: 9, cliente: 'Miguel Ángel Suárez', hora: '20:00', personas: 6, ambiente: 'VIP', mesa: 'V-02', estado: 'confirmada', turno: 'cena', telefono: '314 567 8901', nota: '' },
  { id: 10, cliente: 'Isabella Moreno Pérez', hora: '20:30', personas: 4, ambiente: 'Terraza', mesa: 'T-01', estado: 'confirmada', turno: 'cena', telefono: '318 234 5678', nota: '' },
  { id: 11, cliente: 'Sebastián Díaz Vargas', hora: '21:00', personas: 8, ambiente: 'Salón', mesa: 'S-10', estado: 'pendiente', turno: 'cena', telefono: '319 567 8901', nota: '' },
  { id: 12, cliente: 'Paula Andrea Gómez', hora: '21:30', personas: 4, ambiente: 'Terraza', mesa: 'T-03', estado: 'confirmada', turno: 'cena', telefono: '321 234 5678', nota: '' },
]

export const MESAS_INICIAL = {
  salon: [
    { id: 'S-01', capacidad: 4, estado: 'ocupada',    reservaId: 7  },
    { id: 'S-02', capacidad: 4, estado: 'disponible', reservaId: null },
    { id: 'S-03', capacidad: 4, estado: 'reservada',  reservaId: 1  },
    { id: 'S-04', capacidad: 4, estado: 'disponible', reservaId: null },
    { id: 'S-05', capacidad: 4, estado: 'disponible', reservaId: null },
    { id: 'S-06', capacidad: 4, estado: 'ocupada',    reservaId: null },
    { id: 'S-07', capacidad: 2, estado: 'reservada',  reservaId: 2  },
    { id: 'S-08', capacidad: 2, estado: 'reservada',  reservaId: 8  },
    { id: 'S-09', capacidad: 8, estado: 'reservada',  reservaId: 3  },
    { id: 'S-10', capacidad: 8, estado: 'disponible', reservaId: 11 },
  ],
  terraza: [
    { id: 'T-01', capacidad: 4, estado: 'reservada',  reservaId: 10 },
    { id: 'T-02', capacidad: 4, estado: 'reservada',  reservaId: 4  },
    { id: 'T-03', capacidad: 4, estado: 'reservada',  reservaId: 12 },
    { id: 'T-04', capacidad: 4, estado: 'disponible', reservaId: null },
    { id: 'T-05', capacidad: 4, estado: 'disponible', reservaId: null },
  ],
  vip: [
    { id: 'V-01', capacidad: 6, estado: 'reservada', reservaId: 5 },
    { id: 'V-02', capacidad: 6, estado: 'reservada', reservaId: 9 },
  ],
}

export const GESTOR_HUMANO_INICIAL = [
  {
    id: 101,
    cliente: 'Tecnologías del Pacífico SAS',
    contacto: 'Ricardo Herrera Castro',
    hora: '13:00',
    personas: 15,
    ambiente: 'Salón + Terraza',
    fecha: '30 mayo 2026',
    estado: 'pendiente',
    motivo: 'Almuerzo corporativo trimestral',
    telefono: '601 234 5678',
  },
  {
    id: 102,
    cliente: 'Familia Castellanos Durán',
    contacto: 'Patricia Castellanos',
    hora: '19:30',
    personas: 12,
    ambiente: 'VIP + Salón',
    fecha: '30 mayo 2026',
    estado: 'pendiente',
    motivo: 'Celebración 50 años de bodas',
    telefono: '310 987 6543',
  },
  {
    id: 103,
    cliente: 'Universidad Nacional — Facultad Ingeniería',
    contacto: 'Prof. Camilo Torres Vega',
    hora: '12:30',
    personas: 20,
    ambiente: 'Salón',
    fecha: '31 mayo 2026',
    estado: 'pendiente',
    motivo: 'Almuerzo de grado promoción 2026',
    telefono: '315 123 4567',
  },
]

export const RESERVAS_SEMANA = [
  { dia: 'Lun', total: 18 },
  { dia: 'Mar', total: 24 },
  { dia: 'Mié', total: 21 },
  { dia: 'Jue', total: 19 },
  { dia: 'Vie', total: 28 },
  { dia: 'Sáb', total: 35 },
  { dia: 'Dom', total: 30 },
]
