import { useState, useEffect } from 'react'
import { Users, Phone, Clock, Bell, CheckCircle } from 'lucide-react'

const WEBHOOK_URL = 'https://qwsd-n8n.hi49ib.easypanel.host/webhook/notificar-espera'

const BASEROW_TOKEN = 'H8sBhz0TS1T870ghr5qVmie7CPC3MSey'
const BASEROW_TABLE = '993201'

export default function ListaEspera() {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [notificando, setNotificando] = useState(null)

  const fetchClientes = async () => {
    try {
      const res = await fetch(
        `https://api.baserow.io/api/database/rows/table/${BASEROW_TABLE}/?user_field_names=true`,
        { headers: { Authorization: `Token ${BASEROW_TOKEN}` } }
      )
      const data = await res.json()
      const esperando = (data.results || []).filter(c => c.Estado?.value === 'Esperando')
      setClientes(esperando)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchClientes() }, [])

  const notificar = async (cliente) => {
    setNotificando(cliente.id)
    try {
      await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: cliente.id })
      })
      await fetchClientes()
    } catch (e) {
      console.error(e)
    } finally {
      setNotificando(null)
    }
  }

  if (loading) return (
    <div style={{ textAlign: 'center', color: '#9E9E9E', padding: 48 }}>Cargando lista de espera...</div>
  )

  return (
    <div>
      {/* Header */}
      <div style={{
        background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
        padding: '16px 24px', marginBottom: 20,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>⏳ Clientes en Espera</div>
          <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 2 }}>
            {clientes.length} {clientes.length === 1 ? 'cliente esperando' : 'clientes esperando'}
          </div>
        </div>
        <button
          onClick={fetchClientes}
          style={{
            padding: '8px 16px', borderRadius: 10, fontSize: 12, fontWeight: 600, cursor: 'pointer',
            background: 'rgba(255,255,255,0.06)', color: '#9E9E9E',
            border: '1px solid rgba(255,255,255,0.08)', transition: 'all 0.15s'
          }}
          onMouseEnter={e => e.target.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={e => e.target.style.background = 'rgba(255,255,255,0.06)'}
        >Actualizar</button>
      </div>

      {/* Lista */}
      <div style={{
        background: '#16213e', borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden'
      }}>
        {clientes.length === 0 ? (
          <div style={{ padding: '48px 0', textAlign: 'center', color: '#9E9E9E', fontSize: 13 }}>
            No hay clientes en lista de espera
          </div>
        ) : clientes.map((c, i) => (
          <div
            key={c.id}
            style={{
              display: 'flex', alignItems: 'center', gap: 14, padding: '16px 24px',
              borderBottom: i < clientes.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
              transition: 'background 0.15s',
            }}
            onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.03)'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            {/* Número en espera */}
            <div style={{
              width: 32, height: 32, borderRadius: '50%', flexShrink: 0,
              background: 'rgba(255,193,7,0.15)', border: '1px solid rgba(255,193,7,0.3)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#FFB300', fontSize: 13, fontWeight: 700
            }}>{i + 1}</div>

            {/* Barra */}
            <div style={{ width: 3, height: 48, borderRadius: 2, background: '#FFB300', flexShrink: 0, opacity: 0.7 }} />

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginBottom: 4 }}>
                {c.Nombre}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#9E9E9E', fontSize: 12 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Users size={11} /> {c.Personas} pers.
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Clock size={11} /> {c.Fecha_solicitada} {c.Hora_solicitada}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                  <Phone size={11} /> {c.Telefono}
                </span>
              </div>
              {c.Notas && (
                <div style={{ color: '#FFB300', fontSize: 11, marginTop: 4, fontStyle: 'italic' }}>
                  "{c.Notas}"
                </div>
              )}
            </div>

            {/* Badge espera */}
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              background: 'rgba(255,193,7,0.12)', color: '#FFB300',
              border: '1px solid rgba(255,193,7,0.25)',
              fontSize: 11, fontWeight: 600, padding: '4px 10px', borderRadius: 8,
            }}>
              <Clock size={12} /> Esperando
            </span>

            {/* Botón notificar */}
            <button
              onClick={() => notificar(c)}
              disabled={notificando === c.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '8px 14px', borderRadius: 8, fontSize: 12, fontWeight: 600,
                cursor: notificando === c.id ? 'not-allowed' : 'pointer',
                background: notificando === c.id ? 'rgba(0,230,118,0.05)' : 'rgba(0,230,118,0.12)',
                color: notificando === c.id ? '#9E9E9E' : '#00E676',
                border: notificando === c.id ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(0,230,118,0.25)',
                transition: 'all 0.15s', flexShrink: 0
              }}
              onMouseEnter={e => { if (notificando !== c.id) e.currentTarget.style.background = 'rgba(0,230,118,0.22)' }}
              onMouseLeave={e => { if (notificando !== c.id) e.currentTarget.style.background = 'rgba(0,230,118,0.12)' }}
            >
              {notificando === c.id
                ? <><CheckCircle size={13} /> Notificando...</>
                : <><Bell size={13} /> Notificar</>
              }
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
