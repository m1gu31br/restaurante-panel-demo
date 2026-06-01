import { TrendingUp, TrendingDown } from 'lucide-react'
import { RESERVAS_SEMANA } from '../data/mockData'

const CARD = { background: '#16213e', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: 20 }

function KpiCard({ label, value, sub, trend, color = '#00E676' }) {
  return (
    <div style={CARD}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ color: '#9E9E9E', fontSize: 12 }}>{label}</span>
        {trend === 'up'
          ? <TrendingUp  size={15} color="#4CAF50" />
          : <TrendingDown size={15} color="#FF5252" />}
      </div>
      <div style={{ color: color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{value}</div>
      <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 6 }}>{sub}</div>
    </div>
  )
}

function BarChart({ data, hoy = 4 }) {
  const max = Math.max(...data.map(d => d.total))
  return (
    <div style={{ display: 'flex', alignItems: 'flex-end', gap: 10, height: 140 }}>
      {data.map((d, i) => {
        const pct = (d.total / max) * 100
        const isHoy = i === hoy
        return (
          <div key={d.dia} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            <span style={{ color: '#9E9E9E', fontSize: 12 }}>{d.total}</span>
            <div style={{
              width: '100%', height: `${pct}%`, borderRadius: '6px 6px 0 0', minHeight: 8,
              background: isHoy ? '#00E676' : 'rgba(255,255,255,0.1)',
              boxShadow: isHoy ? '0 0 12px rgba(0,230,118,0.3)' : 'none',
              transition: 'background 0.2s',
            }} />
            <span style={{
              fontSize: 11, fontWeight: isHoy ? 700 : 400,
              color: isHoy ? '#00E676' : '#9E9E9E',
            }}>{d.dia}</span>
          </div>
        )
      })}
    </div>
  )
}

function ProgressBar({ label, value, total, color }) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div style={{ marginBottom: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ color: '#9E9E9E', fontSize: 13 }}>{label}</span>
        <span style={{ color: '#fff', fontSize: 13, fontWeight: 600 }}>{value} ({pct}%)</span>
      </div>
      <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 4, overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: 4, transition: 'width 0.5s ease' }} />
      </div>
    </div>
  )
}

function MiniBar({ label, value, max }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
      <span style={{ color: '#9E9E9E', fontSize: 12, width: 52, flexShrink: 0 }}>{label}</span>
      <div style={{ flex: 1, height: 5, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{ width: `${max > 0 ? (value / max) * 100 : 0}%`, height: '100%', background: '#00E676', borderRadius: 3 }} />
      </div>
      <span style={{ color: '#fff', fontSize: 12, fontWeight: 600, width: 16, textAlign: 'right' }}>{value}</span>
    </div>
  )
}

function StatBox({ label, value, color = '#fff' }) {
  return (
    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.04)', borderRadius: 10, padding: '12px 8px' }}>
      <div style={{ color, fontSize: 24, fontWeight: 800 }}>{value}</div>
      <div style={{ color: '#9E9E9E', fontSize: 11, marginTop: 3 }}>{label}</div>
    </div>
  )
}

export default function Metricas({ reservas }) {
  const total       = reservas.length
  const confirmadas = reservas.filter(r => r.estado === 'confirmada').length
  const pendientes  = reservas.filter(r => r.estado === 'pendiente').length
  const canceladas  = reservas.filter(r => r.estado === 'cancelada').length
  const tasaConv    = total > 0 ? Math.round((confirmadas / total) * 100) : 0
  const tasaCanc    = total > 0 ? Math.round((canceladas  / total) * 100) : 0
  const totalPers   = reservas.filter(r => r.estado !== 'cancelada').reduce((a, r) => a + r.personas, 0)

  const ambientes = ['Salón', 'Terraza', 'VIP']
  const ambCounts = ambientes.map(a => reservas.filter(r => r.ambiente === a && r.estado !== 'cancelada').length)
  const maxAmb    = Math.max(...ambCounts)

  const semanaTotal = RESERVAS_SEMANA.reduce((a, d) => a + d.total, 0)

  const turnos = ['almuerzo', 'cena'].map(turno => {
    const items = reservas.filter(r => r.turno === turno)
    return {
      label: turno === 'almuerzo' ? '☀️ Almuerzo' : '🌙 Cena',
      total: items.length,
      pers: items.filter(r => r.estado !== 'cancelada').reduce((a, r) => a + r.personas, 0),
      conf: items.filter(r => r.estado === 'confirmada').length,
      pctConf: items.length > 0 ? Math.round((items.filter(r => r.estado === 'confirmada').length / items.length) * 100) : 0,
    }
  })

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {/* KPIs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <KpiCard label="Tasa de Conversión"   value={`${tasaConv}%`}    sub="Confirmadas / Total"    trend="up"   color="#00E676" />
        <KpiCard label="Tasa de Cancelación"  value={`${tasaCanc}%`}    sub="Del total de hoy"       trend="down" color="#FF5252" />
        <KpiCard label="Comensales Esperados" value={totalPers}          sub="Personas confirmadas"   trend="up"   color="#4CAF50" />
        <KpiCard label="Ticket Mesa Estimado" value="$142.500"           sub="Promedio por reserva"   trend="up"   color="#2979FF" />
      </div>

      {/* Bar chart + distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 16 }}>
        {/* Weekly bar chart */}
        <div style={CARD}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <div>
              <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>Reservas Esta Semana</div>
              <div style={{ color: '#9E9E9E', fontSize: 12, marginTop: 3 }}>Total por día — Hoy: Viernes</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ color: '#00E676', fontWeight: 800, fontSize: 22 }}>{semanaTotal}</div>
              <div style={{ color: '#9E9E9E', fontSize: 11 }}>total semana</div>
            </div>
          </div>
          <BarChart data={RESERVAS_SEMANA} hoy={4} />
        </div>

        {/* Distribution */}
        <div style={CARD}>
          <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 18 }}>Distribución de Hoy</div>
          <ProgressBar label="Confirmadas" value={confirmadas} total={total} color="#4CAF50" />
          <ProgressBar label="Pendientes"  value={pendientes}  total={total} color="#2979FF" />
          <ProgressBar label="Canceladas"  value={canceladas}  total={total} color="#FF5252" />

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', marginTop: 16, paddingTop: 16 }}>
            <div style={{ color: '#9E9E9E', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, fontWeight: 600 }}>Por Ambiente</div>
            {ambientes.map((a, i) => (
              <MiniBar key={a} label={a} value={ambCounts[i]} max={maxAmb} />
            ))}
          </div>
        </div>
      </div>

      {/* Turnos */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        {turnos.map(t => (
          <div key={t.label} style={CARD}>
            <div style={{ color: '#fff', fontWeight: 600, fontSize: 15, marginBottom: 16 }}>{t.label}</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
              <StatBox label="Reservas"    value={t.total}    color="#fff"    />
              <StatBox label="Confirmadas" value={t.conf}     color="#4CAF50" />
              <StatBox label="Comensales"  value={t.pers}     color="#00E676" />
              <StatBox label="% Conf."     value={`${t.pctConf}%`} color="#2979FF" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
