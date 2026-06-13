import { useState } from 'react'
import { Plus } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Dashboard from './components/Dashboard'
import Reservas from './components/Reservas'
import MapaMesas from './components/MapaMesas'
import GestorHumano from './components/GestorHumano'
import Metricas from './components/Metricas'
import ListaEspera from './components/ListaEspera'
import NuevaReservaModal from './components/NuevaReservaModal'
import { RESERVAS_INICIAL, MESAS_INICIAL, GESTOR_HUMANO_INICIAL } from './data/mockData'

const TITULO = {
  inicio:   'Panel Principal',
  reservas: 'Gestión de Reservas',
  mesas:    'Mapa de Mesas',
  gestor:   'Gestor Humano',
  metricas: 'Métricas y Análisis',
  espera:   'Lista de Espera',
}

function App() {
  const [seccion, setSeccion]         = useState('inicio')
  const [showModal, setShowModal]     = useState(false)
  const [reservas, setReservas]       = useState(RESERVAS_INICIAL)
  const [mesas]                       = useState(MESAS_INICIAL)
  const [gestorItems, setGestorItems] = useState(GESTOR_HUMANO_INICIAL)

  const addReserva = (nueva) =>
    setReservas(prev => [...prev, { ...nueva, id: Date.now(), personas: Number(nueva.personas) }])

  const updateGestorItem = (id, estado) =>
    setGestorItems(prev => prev.map(item => item.id === id ? { ...item, estado } : item))

  const pendingGestor = gestorItems.filter(i => i.estado === 'pendiente').length

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#1a1a2e' }}>
      <Sidebar seccion={seccion} setSeccion={setSeccion} pendingGestor={pendingGestor} />

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <header style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 32px', background: '#16213e',
          borderBottom: '1px solid rgba(255,255,255,0.06)', flexShrink: 0
        }}>
          <div>
            <h1 style={{ margin: 0, color: '#fff', fontSize: 20, fontWeight: 600 }}>{TITULO[seccion]}</h1>
            <p style={{ margin: '2px 0 0', color: '#9E9E9E', fontSize: 13 }}>Restaurante OLIVO · Guatapé · {new Date().toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>
          {seccion !== 'espera' && (
            <button
              onClick={() => setShowModal(true)}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: '#00E676', color: '#000', fontWeight: 700,
                padding: '10px 20px', borderRadius: 12, border: 'none',
                cursor: 'pointer', fontSize: 14,
                boxShadow: '0 4px 20px rgba(0,230,118,0.3)',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
              onMouseEnter={e => { e.target.style.transform = 'scale(1.04)' }}
              onMouseLeave={e => { e.target.style.transform = 'scale(1)' }}
            >
              <Plus size={18} strokeWidth={2.5} />
              Nueva Reserva
            </button>
          )}
        </header>

        <main style={{ flex: 1, overflowY: 'auto', padding: 24 }}>
          {seccion === 'inicio'   && <Dashboard reservas={reservas} mesas={mesas} setSeccion={setSeccion} />}
          {seccion === 'reservas' && <Reservas reservas={reservas} setReservas={setReservas} />}
          {seccion === 'mesas'    && <MapaMesas mesas={mesas} reservas={reservas} />}
          {seccion === 'gestor'   && <GestorHumano items={gestorItems} onUpdate={updateGestorItem} />}
          {seccion === 'metricas' && <Metricas reservas={reservas} />}
          {seccion === 'espera'   && <ListaEspera />}
        </main>
      </div>

      {showModal && <NuevaReservaModal onClose={() => setShowModal(false)} onAdd={addReserva} />}
    </div>
  )
}

export default App
