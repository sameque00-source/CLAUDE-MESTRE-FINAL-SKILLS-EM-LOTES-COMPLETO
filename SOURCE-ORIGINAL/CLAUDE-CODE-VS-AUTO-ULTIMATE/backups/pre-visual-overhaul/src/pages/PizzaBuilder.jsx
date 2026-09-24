import { useState, useEffect } from 'react'
import { useCart } from '../context/CartContext'

const STEPS = ['Tamanho', 'Massa', 'Molho', 'Queijo', 'Ingredientes', 'Borda', 'Extras']

const SIZES = [
  { label: 'Pequena', cm: '25cm', price: 35 },
  { label: 'Media', cm: '30cm', price: 45 },
  { label: 'Grande', cm: '35cm', price: 55 },
  { label: 'Gigante', cm: '40cm', price: 65 },
]

const CRUSTS = [
  { label: 'Tradicional', price: 0 },
  { label: 'Fina', price: 0 },
  { label: 'Integral', price: 3 },
  { label: 'Recheada', price: 8 },
]

const SAUCES = [
  { label: 'Tomate', color: '#c8102e', price: 0 },
  { label: 'Branco', color: '#f5f0e8', price: 3 },
  { label: 'Pesto', color: '#4caf50', price: 5 },
  { label: 'Barbecue', color: '#8b4513', price: 4 },
]

const CHEESES = [
  { label: 'Mozzarella', color: '#f5d061', price: 0 },
  { label: 'Provolone', color: '#ffeaa7', price: 3 },
  { label: 'Parmesao', color: '#fdcb6e', price: 4 },
  { label: 'Gorgonzola', color: '#dfe6e9', price: 5 },
  { label: 'Catupiry', color: '#fff3e0', price: 5 },
]

const TOPPINGS = [
  { label: 'Calabresa', color: '#c0392b', price: 0 },
  { label: 'Pepperoni', color: '#e74c3c', price: 0 },
  { label: 'Presunto', color: '#e8a0bf', price: 0 },
  { label: 'Frango', color: '#ffeaa7', price: 0 },
  { label: 'Tomate', color: '#ff6348', price: 0 },
  { label: 'Cebola', color: '#dfe6e9', price: 0 },
  { label: 'Azeitona', color: '#2d3436', price: 0 },
  { label: 'Champignon', color: '#b2bec3', price: 3 },
  { label: 'Milho', color: '#fdcb6e', price: 0 },
  { label: 'Ervilha', color: '#00b894', price: 0 },
  { label: 'Bacon', color: '#d63031', price: 5 },
  { label: 'Rucula', color: '#55a855', price: 3 },
]

const EDGES = [
  { label: 'Sem borda', price: 0 },
  { label: 'Catupiry', price: 8 },
  { label: 'Chocolate', price: 8 },
  { label: 'Cheddar', price: 8 },
  { label: 'Cream Cheese', price: 9 },
]

const EXTRAS = [
  { label: 'Bacon extra', price: 5 },
  { label: 'Cebola crispy', price: 3 },
  { label: 'Azeitona extra', price: 3 },
  { label: 'Champignon extra', price: 6 },
  { label: 'Tomate seco', price: 4 },
  { label: 'Rucula extra', price: 4 },
]

function fp(v) { return 'R$ ' + (v || 0).toFixed(2).replace('.', ',') }

export default function PizzaBuilder() {
  const [step, setStep] = useState(0)
  const [size, setSize] = useState(SIZES[2])
  const [crust, setCrust] = useState(CRUSTS[0])
  const [sauce, setSauce] = useState(SAUCES[0])
  const [cheese, setCheese] = useState(CHEESES[0])
  const [toppings, setToppings] = useState([])
  const [edge, setEdge] = useState(EDGES[0])
  const [extras, setExtras] = useState([])
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const { addToCart } = useCart()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  function toggleTopping(t) {
    setToppings(prev => prev.find(x => x.label === t.label) ? prev.filter(x => x.label !== t.label) : [...prev, t])
  }
  function toggleExtra(e) {
    setExtras(prev => prev.find(x => x.label === e.label) ? prev.filter(x => x.label !== e.label) : [...prev, e])
  }

  const toppingsPrice = toppings.reduce((s, t) => s + t.price, 0)
  const extrasPrice = extras.reduce((s, e) => s + e.price, 0)
  const unitPrice = size.price + crust.price + sauce.price + cheese.price + toppingsPrice + edge.price + extrasPrice
  const total = unitPrice * qty

  function handleAdd() {
    addToCart({
      name: 'Pizza Personalizada',
      size: size.label,
      crust: crust.label,
      edge: edge.label,
      toppings: toppings.map(t => t.label),
      extras: extras.map(e => e.label),
      quantity: qty,
      unitPrice,
      totalPrice: unitPrice,
      notes: '',
    })
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  function prev() { if (step > 0) setStep(step - 1) }
  function next() { if (step < STEPS.length - 1) setStep(step + 1) }

  return (
    <div style={s.page}>
      <h1 style={s.title}>Monte sua Pizza</h1>
      <p style={s.sub}>Personalize cada detalhe ao seu gosto</p>

      {/* Progress Bar */}
      <div style={s.progressWrap}>
        <div style={s.progressTrack}>
          <div style={{ ...s.progressFill, width: ((step + 1) / STEPS.length * 100) + '%' }} />
        </div>
        <div style={s.stepLabels}>
          {STEPS.map((st, i) => (
            <div key={st} style={{ ...s.stepLabel, ...(i <= step ? s.stepLabelActive : {}) }}>
              <div style={{ ...s.stepDot, ...(i < step ? s.stepDotDone : i === step ? s.stepDotCurrent : {}) }}>
                {i < step ? '✓' : i + 1}
              </div>
              <span style={s.stepText}>{st}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={s.layout}>
        {/* Pizza Visual */}
        <div style={s.visualPanel}>
          <div style={s.pizzaOuter}>
            <div style={{ ...s.pizzaCrust, background: crust.label === 'Integral' ? '#8B7355' : crust.label === 'Fina' ? '#C4A76C' : crust.label === 'Recheada' ? '#E8C97A' : '#D4A56A' }}>
              <div style={{ ...s.pizzaSauce, background: sauce.color }}>
                <div style={s.pizzaCheese} />
                {toppings.map((t, i) => (
                  <div key={t.label} style={{
                    ...s.pizzaTopping,
                    background: t.color,
                    left: (20 + (i * 37) % 60) + '%',
                    top: (15 + (i * 43) % 60) + '%',
                    transform: 'translate(-50%, -50%)',
                  }} />
                ))}
              </div>
            </div>
            {edge.label !== 'Sem borda' && (
              <div style={{ ...s.edgeLabel, color: edge.label === 'Chocolate' ? '#8B4513' : edge.label === 'Catupiry' ? '#FFFDD0' : '#FFA500' }}>
                Borda: {edge.label}
              </div>
            )}
          </div>
          <div style={s.visualSummary}>
            <span style={s.visualSize}>{size.label} ({size.cm})</span>
            <span style={s.visualPrice}>{fp(unitPrice)}</span>
          </div>
        </div>

        {/* Step Content */}
        <div style={s.stepPanel}>
          <div style={s.stepCard}>
            {step === 0 && (
              <>
                <h3 style={s.stepTitle}>Qual tamanho?</h3>
                <div style={s.optionGrid}>
                  {SIZES.map(sz => (
                    <button key={sz.label} onClick={() => setSize(sz)} style={{ ...s.optBtn, ...(size.label === sz.label ? s.optActive : {}) }}>
                      <span style={s.optName}>{sz.label}</span>
                      <span style={s.optCm}>{sz.cm}</span>
                      <span style={s.optPrice}>{fp(sz.price)}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <h3 style={s.stepTitle}>Tipo de massa</h3>
                <div style={s.optionGrid}>
                  {CRUSTS.map(c => (
                    <button key={c.label} onClick={() => setCrust(c)} style={{ ...s.optBtn, ...(crust.label === c.label ? s.optActive : {}) }}>
                      <span style={s.optName}>{c.label}</span>
                      <span style={s.optPrice}>{c.price > 0 ? '+' + fp(c.price) : 'Gratis'}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <h3 style={s.stepTitle}>Escolha o molho</h3>
                <div style={s.optionGrid}>
                  {SAUCES.map(sc => (
                    <button key={sc.label} onClick={() => setSauce(sc)} style={{ ...s.optBtn, ...(sauce.label === sc.label ? s.optActive : {}) }}>
                      <div style={{ ...s.colorDot, background: sc.color }} />
                      <span style={s.optName}>{sc.label}</span>
                      <span style={s.optPrice}>{sc.price > 0 ? '+' + fp(sc.price) : 'Gratis'}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 3 && (
              <>
                <h3 style={s.stepTitle}>Qual queijo?</h3>
                <div style={s.optionGrid}>
                  {CHEESES.map(ch => (
                    <button key={ch.label} onClick={() => setCheese(ch)} style={{ ...s.optBtn, ...(cheese.label === ch.label ? s.optActive : {}) }}>
                      <div style={{ ...s.colorDot, background: ch.color }} />
                      <span style={s.optName}>{ch.label}</span>
                      <span style={s.optPrice}>{ch.price > 0 ? '+' + fp(ch.price) : 'Gratis'}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 4 && (
              <>
                <h3 style={s.stepTitle}>Ingredientes (multi)</h3>
                <div style={s.toppingGrid}>
                  {TOPPINGS.map(t => {
                    const sel = toppings.some(x => x.label === t.label)
                    return (
                      <button key={t.label} onClick={() => toggleTopping(t)} style={{ ...s.topBtn, ...(sel ? s.topActive : {}) }}>
                        <div style={{ ...s.topDot, background: t.color }} />
                        <span>{t.label}</span>
                        {t.price > 0 && <span style={s.topPrice}>+{fp(t.price)}</span>}
                      </button>
                    )
                  })}
                </div>
              </>
            )}
            {step === 5 && (
              <>
                <h3 style={s.stepTitle}>Borda recheada</h3>
                <div style={s.optionGrid}>
                  {EDGES.map(e => (
                    <button key={e.label} onClick={() => setEdge(e)} style={{ ...s.optBtn, ...(edge.label === e.label ? s.optActive : {}) }}>
                      <span style={s.optName}>{e.label}</span>
                      <span style={s.optPrice}>{e.price > 0 ? '+' + fp(e.price) : 'Gratis'}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 6 && (
              <>
                <h3 style={s.stepTitle}>Extras adicionais</h3>
                <div style={s.toppingGrid}>
                  {EXTRAS.map(e => {
                    const sel = extras.some(x => x.label === e.label)
                    return (
                      <button key={e.label} onClick={() => toggleExtra(e)} style={{ ...s.topBtn, ...(sel ? s.topActive : {}) }}>
                        <span>{e.label}</span>
                        <span style={s.topPrice}>+{fp(e.price)}</span>
                      </button>
                    )
                  })}
                </div>

                {/* Quantity + Add */}
                <div style={{ marginTop: 24 }}>
                  <h4 style={s.labelSm}>Quantidade</h4>
                  <div style={s.qtyRow}>
                    <button style={s.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
                    <span style={s.qtyVal}>{qty}</span>
                    <button style={s.qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Navigation */}
          <div style={s.navRow}>
            {step > 0 && <button style={s.backBtn} onClick={prev}>&larr; Voltar</button>}
            <div style={{ flex: 1 }} />
            {step < STEPS.length - 1 ? (
              <button style={s.nextBtn} onClick={next}>Proximo &rarr;</button>
            ) : (
              <button style={s.addBtn} onClick={handleAdd}>
                {added ? '✓ Adicionado!' : 'Adicionar ao Pedido'}
              </button>
            )}
          </div>

          {/* Summary Sidebar */}
          <div style={s.summaryCard}>
            <h4 style={s.summaryTitle}>Resumo</h4>
            <div style={s.sumRow}><span style={s.sumLabel}>Tamanho</span><span>{size.label} ({size.cm})</span></div>
            <div style={s.sumRow}><span style={s.sumLabel}>Massa</span><span>{crust.label}{crust.price > 0 ? ' (+' + fp(crust.price) + ')' : ''}</span></div>
            <div style={s.sumRow}><span style={s.sumLabel}>Molho</span><span>{sauce.label}{sauce.price > 0 ? ' (+' + fp(sauce.price) + ')' : ''}</span></div>
            <div style={s.sumRow}><span style={s.sumLabel}>Queijo</span><span>{cheese.label}{cheese.price > 0 ? ' (+' + fp(cheese.price) + ')' : ''}</span></div>
            {toppings.length > 0 && <div style={s.sumRow}><span style={s.sumLabel}>Ingredientes</span><span>{toppings.map(t => t.label).join(', ')}</span></div>}
            {toppingsPrice > 0 && <div style={s.sumRow}><span style={s.sumLabel}>Extras ing.</span><span>+{fp(toppingsPrice)}</span></div>}
            <div style={s.sumRow}><span style={s.sumLabel}>Borda</span><span>{edge.label}{edge.price > 0 ? ' (+' + fp(edge.price) + ')' : ''}</span></div>
            {extras.length > 0 && <div style={s.sumRow}><span style={s.sumLabel}>Extras</span><span>{extras.map(e => e.label).join(', ')}</span></div>}
            {extrasPrice > 0 && <div style={s.sumRow}><span style={s.sumLabel}>Preco extras</span><span>+{fp(extrasPrice)}</span></div>}
            <div style={s.sumDivider} />
            <div style={s.sumTotal}>
              <span>Total</span>
              <span style={s.totalVal}>{fp(unitPrice)}{qty > 1 ? ' x' + qty + ' = ' + fp(total) : ''}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const s = {
  page: { minHeight: '100vh', background: '#0a0a0a', color: '#f5f0e8', padding: '100px 24px 60px', maxWidth: 1100, margin: '0 auto', fontFamily: "'Inter','Segoe UI',system-ui,sans-serif" },
  title: { fontSize: '2rem', fontWeight: 800, margin: '0 0 4px', fontFamily: 'Georgia, serif' },
  sub: { color: '#888', fontSize: '0.9rem', margin: '0 0 24px' },
  progressWrap: { marginBottom: 32 },
  progressTrack: { height: 4, background: '#222', borderRadius: 2, overflow: 'hidden', marginBottom: 12 },
  progressFill: { height: '100%', background: 'linear-gradient(90deg, #c8102e, #d4a853)', borderRadius: 2, transition: 'width 0.3s ease' },
  stepLabels: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8 },
  stepLabel: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, opacity: 0.4, transition: 'opacity 0.2s' },
  stepLabelActive: { opacity: 1 },
  stepDot: { width: 28, height: 28, borderRadius: '50%', background: '#222', border: '2px solid #444', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem', fontWeight: 700, transition: 'all 0.2s' },
  stepDotDone: { background: '#c8102e', borderColor: '#c8102e', color: '#fff' },
  stepDotCurrent: { background: '#d4a853', borderColor: '#d4a853', color: '#000' },
  stepText: { fontSize: '0.65rem', color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' },
  layout: { display: 'flex', gap: 24, alignItems: 'flex-start' },
  visualPanel: { flex: '0 0 280px', position: 'sticky', top: 100, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 },
  pizzaOuter: { position: 'relative', width: 240, height: 240 },
  pizzaCrust: { width: 240, height: 240, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.4)' },
  pizzaSauce: { width: 200, height: 200, borderRadius: '50%', position: 'relative', overflow: 'hidden' },
  pizzaCheese: { position: 'absolute', inset: 0, background: 'rgba(245,208,97,0.3)', borderRadius: '50%' },
  pizzaTopping: { position: 'absolute', width: 20, height: 20, borderRadius: '50%', opacity: 0.8 },
  edgeLabel: { position: 'absolute', bottom: -24, left: '50%', transform: 'translateX(-50%)', fontSize: '0.75rem', fontWeight: 600, whiteSpace: 'nowrap' },
  visualSummary: { display: 'flex', justifyContent: 'space-between', width: '100%', padding: '0 8px' },
  visualSize: { color: '#888', fontSize: '0.8rem' },
  visualPrice: { fontSize: '1.2rem', fontWeight: 800, color: '#d4a853' },
  stepPanel: { flex: 1, minWidth: 0 },
  stepCard: { background: '#1a1a1a', borderRadius: 12, padding: 24, border: '1px solid #222', marginBottom: 16, minHeight: 200 },
  stepTitle: { margin: '0 0 16px', fontSize: '1.1rem', fontWeight: 700, color: '#f5f0e8' },
  labelSm: { margin: '0 0 8px', fontSize: '0.8rem', color: '#d4a853', textTransform: 'uppercase', fontWeight: 600 },
  optionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 },
  optBtn: { display: 'flex', flexDirection: 'column', gap: 2, padding: '12px 14px', background: '#222', border: '2px solid #333', borderRadius: 8, color: '#ccc', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit', transition: 'all 0.2s' },
  optActive: { borderColor: '#c8102e', color: '#fff', background: 'rgba(200,16,46,0.1)' },
  optName: { fontWeight: 600, fontSize: '0.9rem' },
  optCm: { fontSize: '0.7rem', color: '#888' },
  optPrice: { fontSize: '0.75rem', color: '#d4a853', fontWeight: 700 },
  colorDot: { width: 16, height: 16, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.2)' },
  toppingGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: 8 },
  topBtn: { display: 'flex', alignItems: 'center', gap: 8, padding: '10px 12px', background: '#222', border: '2px solid #333', borderRadius: 8, color: '#ccc', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', transition: 'all 0.2s' },
  topActive: { borderColor: '#c8102e', color: '#fff', background: 'rgba(200,16,46,0.1)' },
  topDot: { width: 14, height: 14, borderRadius: '50%', flexShrink: 0 },
  topPrice: { marginLeft: 'auto', fontSize: '0.7rem', color: '#d4a853' },
  navRow: { display: 'flex', gap: 12, marginBottom: 16 },
  backBtn: { padding: '10px 20px', background: '#222', border: '1px solid #444', borderRadius: 8, color: '#ccc', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', fontWeight: 600 },
  nextBtn: { padding: '10px 24px', background: '#c8102e', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', fontWeight: 700 },
  addBtn: { padding: '10px 24px', background: '#4caf50', border: 'none', borderRadius: 8, color: '#fff', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'inherit', fontWeight: 700 },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 },
  qtyBtn: { width: 32, height: 32, borderRadius: 8, border: '1px solid #444', background: '#222', color: '#fff', fontSize: '1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyVal: { fontSize: '1.1rem', fontWeight: 700, minWidth: 24, textAlign: 'center' },
  summaryCard: { background: '#1a1a1a', borderRadius: 12, padding: 18, border: '1px solid #222' },
  summaryTitle: { margin: '0 0 12px', fontSize: '0.85rem', fontWeight: 700, color: '#f5f0e8' },
  sumRow: { display: 'flex', justifyContent: 'space-between', padding: '4px 0', fontSize: '0.78rem', color: '#999' },
  sumLabel: { color: '#666' },
  sumDivider: { height: 1, background: '#333', margin: '8px 0' },
  sumTotal: { display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', fontWeight: 700, color: '#f5f0e8' },
  totalVal: { color: '#d4a853', fontWeight: 800 },
}
