import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const SIZES = [
  { label: 'Pequena', cm: '25cm', price: 35 },
  { label: 'Media', cm: '30cm', price: 45 },
  { label: 'Grande', cm: '35cm', price: 55 },
  { label: 'Gigante', cm: '40cm', price: 65 },
]

const CRUSTS = ['Tradicional', 'Fina', 'Integral', 'Recheada']
const EDGES = ['Sem borda', 'Catupiry', 'Chocolate', 'Cheddar']

const ADD_ONS = [
  { name: 'Bacon extra', price: 5 },
  { name: 'Cebola crispy', price: 3 },
  { name: 'Azeitona', price: 3 },
  { name: 'Champignon', price: 6 },
  { name: 'Tomate seco', price: 4 },
  { name: 'Rucula', price: 4 },
  { name: 'Catupiry extra', price: 5 },
  { name: 'Calabresa extra', price: 5 },
]

function fp(v) { return 'R$ ' + (v || 0).toFixed(2).replace('.', ',') }

export default function PizzaDetail({ item, onClose }) {
  const [size, setSize] = useState('Grande')
  const [crust, setCrust] = useState('Tradicional')
  const [edge, setEdge] = useState('Sem borda')
  const [selectedExtras, setSelectedExtras] = useState([])
  const [qty, setQty] = useState(1)
  const [notes, setNotes] = useState('')
  const navigate = useNavigate()
  const { addToCart } = useCart()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const sizeObj = SIZES.find(s => s.label === size) || SIZES[2]
  const edgePrice = edge === 'Sem borda' ? 0 : 8
  const extrasPrice = selectedExtras.reduce((sum, e) => sum + e.price, 0)
  const unitPrice = sizeObj.price + edgePrice + extrasPrice
  const total = unitPrice * qty

  function toggleExtra(extra) {
    setSelectedExtras(prev =>
      prev.find(e => e.name === extra.name)
        ? prev.filter(e => e.name !== extra.name)
        : [...prev, extra]
    )
  }

  function handleAdd() {
    addToCart({
      name: item.name,
      size,
      crust,
      edge,
      toppings: item.ingredients || [],
      extras: selectedExtras.map(e => e.name),
      quantity: qty,
      unitPrice,
      totalPrice: unitPrice,
      notes,
    })
    onClose()
  }

  return (
    <div style={s.overlay} onClick={onClose}>
      <div style={s.modal} onClick={e => e.stopPropagation()}>
        <button style={s.closeBtn} onClick={onClose}>&times;</button>

        {/* Hero Image */}
        <div style={{ ...s.hero, background: 'linear-gradient(135deg, ' + (item.color || '#c8102e') + '44, ' + (item.color || '#c8102e') + '88)' }}>
          <div style={s.badgeWrap}>
            <span style={s.badge}>{item.badge || item.category}</span>
          </div>
        </div>

        <div style={s.body}>
          <h2 style={s.title}>{item.name}</h2>
          <p style={s.desc}>{item.description}</p>

          {/* Ingredients */}
          {item.ingredients && (
            <div style={s.section}>
              <h4 style={s.label}>Ingredientes</h4>
              <div style={s.ingRow}>
                {item.ingredients.map(i => <span key={i} style={s.ingTag}>{i}</span>)}
              </div>
            </div>
          )}

          {/* Size */}
          <div style={s.section}>
            <h4 style={s.label}>Tamanho</h4>
            <div style={s.sizeRow}>
              {SIZES.map(sz => (
                <button key={sz.label} onClick={() => setSize(sz.label)}
                  style={{ ...s.sizeBtn, ...(size === sz.label ? s.sizeActive : {}) }}>
                  <span style={s.sizeName}>{sz.label}</span>
                  <span style={s.sizeCm}>{sz.cm}</span>
                  <span style={s.sizePrice}>{fp(sz.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Crust */}
          <div style={s.section}>
            <h4 style={s.label}>Massa</h4>
            <div style={s.optRow}>
              {CRUSTS.map(c => (
                <button key={c} onClick={() => setCrust(c)}
                  style={{ ...s.optBtn, ...(crust === c ? s.optActive : {}) }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Edge */}
          <div style={s.section}>
            <h4 style={s.label}>Borda</h4>
            <div style={s.optRow}>
              {EDGES.map(e => (
                <button key={e} onClick={() => setEdge(e)}
                  style={{ ...s.optBtn, ...(edge === e ? s.optActive : {}) }}>
                  {e}{e !== 'Sem borda' ? ' (+R$8,00)' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div style={s.section}>
            <h4 style={s.label}>Extras</h4>
            <div style={s.extrasGrid}>
              {ADD_ONS.map(a => {
                const sel = selectedExtras.some(e => e.name === a.name)
                return (
                  <button key={a.name} onClick={() => toggleExtra(a)}
                    style={{ ...s.extraBtn, ...(sel ? s.extraActive : {}) }}>
                    <span>{a.name}</span>
                    <span style={s.extraPrice}>+{fp(a.price)}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Quantity */}
          <div style={s.section}>
            <h4 style={s.label}>Quantidade</h4>
            <div style={s.qtyRow}>
              <button style={s.qtyBtn} onClick={() => setQty(Math.max(1, qty - 1))}>-</button>
              <span style={s.qtyVal}>{qty}</span>
              <button style={s.qtyBtn} onClick={() => setQty(qty + 1)}>+</button>
            </div>
          </div>

          {/* Notes */}
          <div style={s.section}>
            <h4 style={s.label}>Observacoes</h4>
            <textarea value={notes} onChange={e => setNotes(e.target.value)}
              placeholder="Ex: sem cebola, borda bem crocante..."
              style={s.textarea} rows={3} />
          </div>

          {/* Total + Add */}
          <div style={s.footer}>
            <div style={s.priceBlock}>
              <span style={s.priceLabel}>Total</span>
              <span style={s.priceVal}>{fp(total)}</span>
            </div>
            <button style={s.addBtn} onClick={handleAdd}>Adicionar ao Pedido</button>
          </div>

          <button style={s.builderLink} onClick={() => { onClose(); navigate('/monte') }}>
            Montar do zero no Pizza Builder &rarr;
          </button>
        </div>
      </div>
    </div>
  )
}

const s = {
  overlay: { position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 16 },
  modal: { background: '#1a1a1a', borderRadius: 16, maxWidth: 600, width: '100%', maxHeight: '90vh', overflow: 'auto', position: 'relative', border: '1px solid #333' },
  closeBtn: { position: 'absolute', top: 12, right: 12, zIndex: 2, background: 'rgba(0,0,0,0.6)', border: 'none', color: '#fff', width: 36, height: 36, borderRadius: '50%', fontSize: 20, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  hero: { height: 200, borderRadius: '16px 16px 0 0', position: 'relative' },
  badgeWrap: { position: 'absolute', top: 16, left: 16 },
  badge: { padding: '4px 12px', borderRadius: 12, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', background: 'rgba(0,0,0,0.5)', color: '#fff', letterSpacing: '0.05em' },
  body: { padding: '24px' },
  title: { margin: '0 0 6px', fontSize: '1.5rem', fontWeight: 800, fontFamily: 'Georgia, serif', color: '#f5f0e8' },
  desc: { margin: '0 0 20px', color: '#999', fontSize: '0.9rem', lineHeight: 1.5 },
  section: { marginBottom: 20 },
  label: { margin: '0 0 10px', fontSize: '0.8rem', color: '#d4a853', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 600 },
  ingRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  ingTag: { padding: '4px 12px', background: '#222', borderRadius: 12, fontSize: '0.78rem', color: '#ccc', border: '1px solid #333' },
  sizeRow: { display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 },
  sizeBtn: { padding: '10px 4px', background: '#222', border: '2px solid #333', borderRadius: 8, color: '#ccc', cursor: 'pointer', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 2, fontFamily: 'inherit', transition: 'all 0.2s' },
  sizeActive: { borderColor: '#c8102e', color: '#fff', background: 'rgba(200,16,46,0.1)' },
  sizeName: { fontSize: '0.85rem', fontWeight: 600 },
  sizeCm: { fontSize: '0.7rem', color: '#888' },
  sizePrice: { fontSize: '0.75rem', color: '#d4a853', fontWeight: 700 },
  optRow: { display: 'flex', flexWrap: 'wrap', gap: 8 },
  optBtn: { padding: '8px 14px', background: '#222', border: '1px solid #333', borderRadius: 8, color: '#ccc', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit', transition: 'all 0.2s' },
  optActive: { borderColor: '#c8102e', color: '#fff', background: 'rgba(200,16,46,0.1)' },
  extrasGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: 8 },
  extraBtn: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 12px', background: '#222', border: '1px solid #333', borderRadius: 8, color: '#ccc', cursor: 'pointer', fontSize: '0.8rem', fontFamily: 'inherit', transition: 'all 0.2s' },
  extraActive: { borderColor: '#c8102e', color: '#fff', background: 'rgba(200,16,46,0.1)' },
  extraPrice: { fontSize: '0.7rem', color: '#d4a853' },
  qtyRow: { display: 'flex', alignItems: 'center', gap: 16 },
  qtyBtn: { width: 36, height: 36, borderRadius: '50%', border: '1px solid #444', background: '#222', color: '#fff', fontSize: '1.1rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  qtyVal: { fontSize: '1.2rem', fontWeight: 700, minWidth: 30, textAlign: 'center' },
  textarea: { width: '100%', boxSizing: 'border-box', padding: '10px 14px', borderRadius: 8, border: '1px solid #333', background: '#222', color: '#f5f0e8', fontSize: '0.85rem', fontFamily: 'inherit', outline: 'none', resize: 'vertical' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 24, paddingTop: 20, borderTop: '1px solid #333' },
  priceBlock: { display: 'flex', flexDirection: 'column' },
  priceLabel: { fontSize: '0.75rem', color: '#888', textTransform: 'uppercase' },
  priceVal: { fontSize: '1.4rem', fontWeight: 800, color: '#d4a853' },
  addBtn: { padding: '14px 28px', background: '#c8102e', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer', fontFamily: 'inherit' },
  builderLink: { display: 'block', textAlign: 'center', marginTop: 16, background: 'none', border: 'none', color: '#d4a853', cursor: 'pointer', fontSize: '0.85rem', textDecoration: 'underline', fontFamily: 'inherit' },
}
