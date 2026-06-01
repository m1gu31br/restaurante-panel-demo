import { useState } from 'react'
import { X, User, Phone, Users, MapPin, Clock, FileText, AlertTriangle } from 'lucide-react'

const HORAS = {
  almuerzo: ['12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30'],
  cena:     ['19:00','19:30','20:00','20:30','21:00','21:30','22:00','22:30'],
}

const OVERLAY = {
  position: 'fixed', inset: 0, zIndex: 50,
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(0,0,0,0.72)', backdropFilter: 'blur(4px)',
}

const INPUT_STYLE = {
  width: '100%', background: '#1a1a2e', border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: 10, padding: '10px 12px', color: '#fff', fontSize: 13,
  outline: 'none', transition: 'border-color 0.15s', fontFamily: 'Inter, sans-serif',
}

const INPUT_ERROR_STYLE = { ...INPUT_STYLE, borderColor: '#FF5252' }

function Field({ label, icon, error, children }) {
  return (
    <div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 5, color: '#9E9E9E', fontSize: 12, fontWeight: 500, marginBottom: 6 }}>
        {icon} {label}
      </label>
      {children}
      {error && <p style={{ color: '#FF5252', fontSize: 11, margin: '4px 0 0' }}>{error}</p>}
    </div>
  )
}

export default function NuevaReservaModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    cliente: '', telefono: '', personas: 2,
    turno: 'almuerzo', hora: '12:00', ambiente: 'Salón', mesa: '', nota: '',
  })
  const [errors, setErrors] = useState({})

  const set = (k, v) => setForm(prev => ({ ...prev, [k]: v }))

  const handleTurnoChange = (turno) => {
    set('turno', turno)
    set('hora', HORAS[turno][0])
  }

  const validate = () => {
    const e = {}
    if (!form.cliente.trim()) e.cliente = 'El nombre es requerido'
    if (!form.telefono.trim()) e.telefono = 'El teléfono es requerido'
    if (!form.mesa.trim()) e.mesa = 'Asigna una mesa'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    onAdd({ ...form, estado: Number(form.personas) > 10 ? 'pendiente' : 'confirmada' })
    onClose()
  }

  const largeGroup = Number(form.personas) > 10

  return (
    <div style={OVERLAY} onClick={onClose}>
      <div
        style={{
          background: '#16213e', borderRadius: 20, border: '1px solid rgba(255,255,255,0.1)',
          width: '100%', maxWidth: 520, boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
          maxHeight: '90vh', overflowY: 'auto',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '20px 24px', borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: 17 }}>Nueva Reserva</div>
            <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 3 }}>Completa los datos del cliente</div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9E9E9E', padding: 4, borderRadius: 8 }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Cliente & Teléfono */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Nombre del cliente" icon={<User size={12} />} error={errors.cliente}>
              <input
                value={form.cliente} onChange={e => set('cliente', e.target.value)}
                placeholder="Ej: Camila Torres"
                style={errors.cliente ? INPUT_ERROR_STYLE : INPUT_STYLE}
                onFocus={e => e.target.style.borderColor = '#00E676'}
                onBlur={e => e.target.style.borderColor = errors.cliente ? '#FF5252' : 'rgba(255,255,255,0.1)'}
              />
            </Field>
            <Field label="Teléfono" icon={<Phone size={12} />} error={errors.telefono}>
              <input
                value={form.telefono} onChange={e => set('telefono', e.target.value)}
                placeholder="310 123 4567"
                style={errors.telefono ? INPUT_ERROR_STYLE : INPUT_STYLE}
                onFocus={e => e.target.style.borderColor = '#00E676'}
                onBlur={e => e.target.style.borderColor = errors.telefono ? '#FF5252' : 'rgba(255,255,255,0.1)'}
              />
            </Field>
          </div>

          {/* Turno */}
          <Field label="Turno" icon={<Clock size={12} />}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              {['almuerzo', 'cena'].map(t => (
                <button
                  key={t} type="button" onClick={() => handleTurnoChange(t)}
                  style={{
                    padding: '10px 0', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer',
                    border: form.turno === t ? '1px solid #00E676' : '1px solid rgba(255,255,255,0.1)',
                    background: form.turno === t ? 'rgba(0,230,118,0.1)' : '#1a1a2e',
                    color: form.turno === t ? '#00E676' : '#9E9E9E',
                    transition: 'all 0.15s',
                  }}
                >
                  {t === 'almuerzo' ? '☀️ Almuerzo' : '🌙 Cena'}
                </button>
              ))}
            </div>
          </Field>

          {/* Hora & Personas */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Hora">
              <select
                value={form.hora} onChange={e => set('hora', e.target.value)}
                style={{ ...INPUT_STYLE, cursor: 'pointer', colorScheme: 'dark' }}
                onFocus={e => e.target.style.borderColor = '#00E676'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {HORAS[form.turno].map(h => <option key={h} value={h}>{h}</option>)}
              </select>
            </Field>
            <Field label="Número de personas" icon={<Users size={12} />}>
              <input
                type="number" min={1} max={50}
                value={form.personas} onChange={e => set('personas', e.target.value)}
                style={INPUT_STYLE}
                onFocus={e => e.target.style.borderColor = '#00E676'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              />
            </Field>
          </div>

          {/* Ambiente & Mesa */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <Field label="Ambiente" icon={<MapPin size={12} />}>
              <select
                value={form.ambiente} onChange={e => set('ambiente', e.target.value)}
                style={{ ...INPUT_STYLE, cursor: 'pointer', colorScheme: 'dark' }}
                onFocus={e => e.target.style.borderColor = '#00E676'}
                onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
              >
                {['Salón', 'Terraza', 'VIP'].map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </Field>
            <Field label="Mesa asignada" error={errors.mesa}>
              <input
                value={form.mesa} onChange={e => set('mesa', e.target.value)}
                placeholder="S-05, T-02, V-01…"
                style={errors.mesa ? INPUT_ERROR_STYLE : INPUT_STYLE}
                onFocus={e => e.target.style.borderColor = '#00E676'}
                onBlur={e => e.target.style.borderColor = errors.mesa ? '#FF5252' : 'rgba(255,255,255,0.1)'}
              />
            </Field>
          </div>

          {/* Nota */}
          <Field label="Nota especial (opcional)" icon={<FileText size={12} />}>
            <textarea
              value={form.nota} onChange={e => set('nota', e.target.value)}
              placeholder="Ej: Celebración de cumpleaños, alergia a mariscos…"
              rows={2}
              style={{ ...INPUT_STYLE, resize: 'none' }}
              onFocus={e => e.target.style.borderColor = '#00E676'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </Field>

          {/* Large group notice */}
          {largeGroup && (
            <div style={{
              display: 'flex', alignItems: 'flex-start', gap: 10,
              background: 'rgba(255,193,7,0.08)', border: '1px solid rgba(255,193,7,0.2)',
              borderRadius: 10, padding: '12px 14px',
            }}>
              <AlertTriangle size={16} color="#FFB300" style={{ flexShrink: 0, marginTop: 1 }} />
              <span style={{ color: '#FFB300', fontSize: 12, lineHeight: 1.5 }}>
                Grupos mayores de 10 personas requieren aprobación del <strong>Gestor Humano</strong>. La reserva quedará en estado pendiente hasta ser revisada.
              </span>
            </div>
          )}

          {/* Buttons */}
          <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
            <button
              type="button" onClick={onClose}
              style={{
                flex: 1, padding: '12px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 500,
                background: 'transparent', border: '1px solid rgba(255,255,255,0.12)', color: '#9E9E9E',
                transition: 'all 0.15s',
              }}
              onMouseEnter={e => { e.target.style.borderColor = 'rgba(255,255,255,0.25)'; e.target.style.color = '#fff' }}
              onMouseLeave={e => { e.target.style.borderColor = 'rgba(255,255,255,0.12)'; e.target.style.color = '#9E9E9E' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              style={{
                flex: 1, padding: '12px 0', borderRadius: 12, cursor: 'pointer', fontSize: 14, fontWeight: 700,
                background: '#00E676', color: '#000', border: 'none',
                boxShadow: '0 4px 16px rgba(0,230,118,0.3)', transition: 'all 0.15s',
              }}
              onMouseEnter={e => e.currentTarget.style.background = '#00C853'}
              onMouseLeave={e => e.currentTarget.style.background = '#00E676'}
            >
              {largeGroup ? 'Enviar al Gestor Humano' : 'Crear Reserva'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
