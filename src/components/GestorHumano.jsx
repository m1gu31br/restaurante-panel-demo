import { CheckCircle, XCircle, AlertTriangle, Calendar, Clock, Phone, Users } from 'lucide-react'

const CARD = { background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', overflow: 'hidden', marginBottom: 16 }

const EST = {
  pendiente:  { bg: 'rgba(255,193,7,0.1)',  text: '#FFB300', border: 'rgba(255,193,7,0.25)',  label: 'Pendiente'  },
  aprobado:   { bg: 'rgba(76,175,80,0.1)',  text: '#4CAF50', border: 'rgba(76,175,80,0.25)',  label: 'Aprobado'   },
  rechazado:  { bg: 'rgba(255,82,82,0.1)',  text: '#FF5252', border: 'rgba(255,82,82,0.25)',  label: 'Rechazado'  },
}

function InfoBox({ icon, label, value }) {
  return (
    <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px', flex: 1 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9E9E9E', fontSize: 11, marginBottom: 5 }}>
        {icon} {label}
      </div>
      <div style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{value}</div>
    </div>
  )
}

function GestorCard({ item, onUpdate }) {
  const s = EST[item.estado]
  const pending = item.estado === 'pendiente'

  return (
    <div style={{ ...CARD, opacity: pending ? 1 : 0.72 }}>
      <div style={{ padding: '20px 24px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              <span style={{
                background: s.bg, color: s.text, border: `1px solid ${s.border}`,
                fontSize: 11, fontWeight: 700, padding: '2px 8px', borderRadius: 6,
              }}>{s.label}</span>
              <span style={{ color: '#9E9E9E', fontSize: 12 }}>ID #{item.id}</span>
            </div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 17, lineHeight: 1.3 }}>{item.cliente}</div>
            <div style={{ color: '#9E9E9E', fontSize: 13, marginTop: 4 }}>
              Contacto: <span style={{ color: 'rgba(255,255,255,0.75)' }}>{item.contacto}</span>
            </div>
          </div>

          {/* Personas highlight */}
          <div style={{
            width: 72, height: 72, borderRadius: 14, flexShrink: 0,
            background: 'rgba(255,193,7,0.1)', border: '1px solid rgba(255,193,7,0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: '#FFB300', fontWeight: 900, fontSize: 26, lineHeight: 1 }}>{item.personas}</span>
            <span style={{ color: '#FFB300', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 2 }}>personas</span>
          </div>
        </div>

        {/* Info boxes */}
        <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
          <InfoBox icon={<Calendar size={11} />} label="Fecha"    value={item.fecha}    />
          <InfoBox icon={<Clock size={11} />}    label="Hora"     value={item.hora}     />
          <InfoBox icon={<Phone size={11} />}    label="Teléfono" value={item.telefono} />
        </div>

        <div style={{ display: 'flex', gap: 10, marginBottom: pending ? 20 : 0 }}>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px', flex: 1 }}>
            <div style={{ color: '#9E9E9E', fontSize: 11, marginBottom: 4 }}>Ambiente solicitado</div>
            <div style={{ color: '#00E676', fontWeight: 600, fontSize: 13 }}>{item.ambiente}</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '10px 12px', flex: 1 }}>
            <div style={{ color: '#9E9E9E', fontSize: 11, marginBottom: 4 }}>Motivo del evento</div>
            <div style={{ color: '#fff', fontSize: 13 }}>{item.motivo}</div>
          </div>
        </div>

        {/* Action buttons */}
        {pending && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={() => onUpdate(item.id, 'aprobado')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 0', borderRadius: 12, border: 'none', cursor: 'pointer',
                background: '#4CAF50', color: '#000', fontWeight: 700, fontSize: 14,
                boxShadow: '0 4px 16px rgba(76,175,80,0.25)', transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#43A047'}
              onMouseLeave={e => e.currentTarget.style.background = '#4CAF50'}
            >
              <CheckCircle size={17} />
              Aprobar Reserva
            </button>
            <button
              onClick={() => onUpdate(item.id, 'rechazado')}
              style={{
                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                padding: '13px 0', borderRadius: 12, cursor: 'pointer',
                background: 'rgba(255,82,82,0.1)', color: '#FF5252',
                border: '1px solid rgba(255,82,82,0.25)', fontWeight: 600, fontSize: 14,
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,82,82,0.2)'}
              onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,82,82,0.1)'}
            >
              <XCircle size={17} />
              Rechazar
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GestorHumano({ items, onUpdate }) {
  const pendientes  = items.filter(i => i.estado === 'pendiente')
  const procesados  = items.filter(i => i.estado !== 'pendiente')

  return (
    <div>
      {/* Alert banner */}
      <div style={{
        display: 'flex', alignItems: 'flex-start', gap: 12,
        background: 'rgba(255,193,7,0.06)', border: '1px solid rgba(255,193,7,0.2)',
        borderRadius: 14, padding: '14px 18px', marginBottom: 24,
      }}>
        <AlertTriangle size={20} color="#FFB300" style={{ flexShrink: 0, marginTop: 1 }} />
        <div>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 14 }}>Gestión Manual Requerida</div>
          <div style={{ color: '#9E9E9E', fontSize: 13, marginTop: 4, lineHeight: 1.5 }}>
            Reservas con más de 10 personas requieren coordinación especial de espacio y personal.
            Revisa cada solicitud y aprueba o rechaza manualmente.
          </div>
        </div>
      </div>

      {/* Pendientes */}
      {pendientes.length > 0 && (
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#FFB300', boxShadow: '0 0 6px #FFB300' }} />
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Solicitudes Pendientes ({pendientes.length})</span>
          </div>
          {pendientes.map(item => <GestorCard key={item.id} item={item} onUpdate={onUpdate} />)}
        </div>
      )}

      {/* Procesadas */}
      {procesados.length > 0 && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, marginTop: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#9E9E9E' }} />
            <span style={{ color: '#9E9E9E', fontWeight: 600, fontSize: 15 }}>Solicitudes Procesadas</span>
          </div>
          {procesados.map(item => <GestorCard key={item.id} item={item} onUpdate={onUpdate} />)}
        </div>
      )}

      {items.length === 0 && (
        <div style={{
          background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
          padding: '64px 24px', textAlign: 'center',
        }}>
          <CheckCircle size={44} color="#4CAF50" style={{ margin: '0 auto 12px', opacity: 0.5 }} />
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 16 }}>No hay solicitudes pendientes</div>
          <div style={{ color: '#9E9E9E', fontSize: 13, marginTop: 6 }}>Todas las solicitudes de grupos grandes han sido procesadas</div>
        </div>
      )}
    </div>
  )
}
