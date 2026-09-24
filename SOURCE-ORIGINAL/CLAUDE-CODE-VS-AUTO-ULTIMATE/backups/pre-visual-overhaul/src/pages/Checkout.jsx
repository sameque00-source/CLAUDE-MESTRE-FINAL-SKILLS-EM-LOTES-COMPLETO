import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function fmt(v) {
  return `R$ ${(v || 0).toFixed(2).replace('.', ',')}`;
}

function formatPhone(v) {
  const d = v.replace(/\D/g, '').slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : '';
  if (d.length <= 7) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const PAYMENT_METHODS = [
  { id: 'dinheiro', label: 'Dinheiro', icon: '💵' },
  { id: 'credito', label: 'Cartão de Crédito', icon: '💳' },
  { id: 'debito', label: 'Cartão de Débito', icon: '💳' },
  { id: 'pix', label: 'PIX', icon: '📱' },
];

const INITIAL = {
  nome: '',
  telefone: '',
  email: '',
  endereco: '',
  numero: '',
  complemento: '',
  bairro: '',
  cidade: '',
  observacoes: '',
  delivery: true,
  pagamento: 'dinheiro',
  trocoPara: '',
};

export default function Checkout() {
  const { items, getCartTotal, getDeliveryFee, getGrandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const subtotal = getCartTotal();
  const delivery = form.delivery ? getDeliveryFee() : 0;
  const grandTotal = getGrandTotal() - (form.delivery ? 0 : getDeliveryFee());

  const setField = useCallback((key, value) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }, []);

  const validate = useCallback(() => {
    const err = {};
    if (!form.nome.trim()) err.nome = 'Informe seu nome';
    if (!form.telefone.replace(/\D/g, '').match(/^\d{10,11}$/))
      err.telefone = 'Informe um telefone válido';
    if (form.delivery) {
      if (!form.endereco.trim()) err.endereco = 'Informe o endereço';
      if (!form.numero.trim()) err.numero = 'Informe o número';
      if (!form.bairro.trim()) err.bairro = 'Informe o bairro';
      if (!form.cidade.trim()) err.cidade = 'Informe a cidade';
    }
    if (form.pagamento === 'dinheiro' && form.trocoPara) {
      const troco = parseFloat(form.trocoPara.replace(',', '.'));
      if (!isNaN(troco) && troco < grandTotal) {
        err.trocoPara = 'Valor deve ser maior que o total';
      }
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  }, [form, grandTotal]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!validate()) return;
      setSubmitting(true);
      // Simulated 2-second processing
      await new Promise((r) => setTimeout(r, 2000));
      const orderNum = Math.floor(1000 + Math.random() * 9000);
      setSuccess({
        orderNum,
        time: form.delivery ? '40-60 min' : '20-30 min',
      });
      clearCart();
      setSubmitting(false);
    },
    [validate, clearCart, form.delivery]
  );

  // Empty cart guard
  if (items.length === 0 && !success) {
    return (
      <div style={s.empty}>
        <div style={s.emptyIcon}>🛒</div>
        <h2 style={s.emptyTitle}>Carrinho vazio</h2>
        <p style={s.emptyText}>Adicione pizzas antes de finalizar o pedido.</p>
        <Link to="/cardapio" style={s.emptyBtn}>Ver Cardápio</Link>
      </div>
    );
  }

  // Success modal
  if (success) {
    return (
      <div style={s.modalOverlay}>
        <div style={s.modal}>
          <div style={s.modalIcon}>🎉</div>
          <h2 style={s.modalTitle}>Pedido Recebido!</h2>
          <p style={s.modalSubtitle}>Obrigado pelo seu pedido!</p>
          <div style={s.modalOrder}>
            <span style={s.modalOrderLabel}>Número do Pedido</span>
            <span style={s.modalOrderNum}>#{success.orderNum}</span>
          </div>
          <div style={s.modalTime}>
            <span style={s.modalTimeLabel}>Tempo estimado</span>
            <span style={s.modalTimeVal}>{success.time}</span>
          </div>
          <button
            onClick={() => navigate('/cardapio')}
            style={s.modalBtn}
          >
            Voltar ao Cardápio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={s.page}>
      <h1 style={s.title}>Finalizar Pedido</h1>

      <div style={s.layout}>
        {/* Form */}
        <form onSubmit={handleSubmit} style={s.form}>
          {/* Delivery toggle */}
          <div style={s.toggleRow}>
            <button
              type="button"
              onClick={() => setField('delivery', true)}
              style={{
                ...s.toggleBtn,
                ...(form.delivery ? s.toggleActive : s.toggleInactive),
              }}
            >
              🛵 Entrega
            </button>
            <button
              type="button"
              onClick={() => setField('delivery', false)}
              style={{
                ...s.toggleBtn,
                ...(!form.delivery ? s.toggleActive : s.toggleInactive),
              }}
            >
              🏪 Retirada
            </button>
          </div>

          {/* Contact */}
          <div style={s.sectionTitle}>Dados Pessoais</div>
          <div style={s.fields}>
            <Field
              label="Nome completo"
              required
              value={form.nome}
              onChange={(v) => setField('nome', v)}
              error={errors.nome}
            />
            <Field
              label="Telefone"
              required
              value={form.telefone}
              onChange={(v) => setField('telefone', formatPhone(v))}
              error={errors.telefone}
              placeholder="(XX) XXXXX-XXXX"
              inputMode="tel"
            />
            <Field
              label="E-mail"
              value={form.email}
              onChange={(v) => setField('email', v)}
              error={errors.email}
              placeholder="Opcional"
              type="email"
            />
          </div>

          {/* Address - only for delivery */}
          {form.delivery && (
            <>
              <div style={s.sectionTitle}>Endereço de Entrega</div>
              <div style={s.fields}>
                <Field
                  label="Endereço completo"
                  required
                  value={form.endereco}
                  onChange={(v) => setField('endereco', v)}
                  error={errors.endereco}
                  placeholder="Rua, Avenida..."
                />
                <div style={s.row2}>
                  <Field
                    label="Número"
                    required
                    value={form.numero}
                    onChange={(v) => setField('numero', v)}
                    error={errors.numero}
                  />
                  <Field
                    label="Complemento"
                    value={form.complemento}
                    onChange={(v) => setField('complemento', v)}
                    placeholder="Apto, Bloco..."
                  />
                </div>
                <div style={s.row2}>
                  <Field
                    label="Bairro"
                    required
                    value={form.bairro}
                    onChange={(v) => setField('bairro', v)}
                    error={errors.bairro}
                  />
                  <Field
                    label="Cidade"
                    required
                    value={form.cidade}
                    onChange={(v) => setField('cidade', v)}
                    error={errors.cidade}
                  />
                </div>
              </div>
            </>
          )}

          {/* Observations */}
          <div style={s.sectionTitle}>Observações</div>
          <textarea
            value={form.observacoes}
            onChange={(e) => setField('observacoes', e.target.value)}
            placeholder="Ex: sem cebola, borda recheada..."
            rows={3}
            style={s.textarea}
          />

          {/* Payment */}
          <div style={s.sectionTitle}>Forma de Pagamento</div>
          <div style={s.payGrid}>
            {PAYMENT_METHODS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setField('pagamento', m.id)}
                style={{
                  ...s.payBtn,
                  ...(form.pagamento === m.id ? s.payActive : {}),
                }}
              >
                <span>{m.icon}</span>
                <span style={s.payLabel}>{m.label}</span>
              </button>
            ))}
          </div>

          {/* Change field for cash */}
          {form.pagamento === 'dinheiro' && (
            <div style={{ marginTop: 12 }}>
              <Field
                label="Troco para"
                value={form.trocoPara}
                onChange={(v) => setField('trocoPara', v.replace(/[^\d.,]/g, ''))}
                error={errors.trocoPara}
                placeholder="Ex: 50,00"
                inputMode="decimal"
              />
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            style={{
              ...s.submitBtn,
              ...(submitting ? s.submitDisabled : {}),
            }}
          >
            {submitting ? (
              <span style={s.spinnerRow}>
                <span style={s.spinner} />
                Processando...
              </span>
            ) : (
              `Finalizar Pedido — ${fmt(grandTotal)}`
            )}
          </button>
        </form>

        {/* Summary sidebar (desktop) */}
        {!isMobile && (
          <aside style={s.sidebar}>
            <div style={s.sidebarCard}>
              <h3 style={s.sidebarTitle}>Resumo do Pedido</h3>
              <div style={s.sidebarItems}>
                {items.map((item) => (
                  <div key={item.id} style={s.sidebarItem}>
                    <div style={{ flex: 1 }}>
                      <div style={s.sidebarName}>
                        {item.quantity}x {item.name}
                      </div>
                      <div style={s.sidebarMeta}>
                        {item.size} &middot; {item.crust}
                      </div>
                    </div>
                    <span style={s.sidebarPrice}>
                      {fmt(item.totalPrice * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div style={s.sidebarDivider} />
              <div style={s.summaryRow}>
                <span style={s.summaryLabel}>Subtotal</span>
                <span style={s.summaryVal}>{fmt(subtotal)}</span>
              </div>
              {form.delivery && (
                <div style={s.summaryRow}>
                  <span style={s.summaryLabel}>Entrega (10%)</span>
                  <span style={s.summaryVal}>{fmt(delivery)}</span>
                </div>
              )}
              {!form.delivery && (
                <div style={s.summaryRow}>
                  <span style={s.summaryLabel}>Retirada</span>
                  <span style={{ ...s.summaryVal, color: '#4caf50' }}>Grátis</span>
                </div>
              )}
              <div style={{ ...s.summaryRow, ...s.summaryTotal }}>
                <span style={s.totalLabel}>Total</span>
                <span style={s.totalVal}>{fmt(grandTotal)}</span>
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Mobile sticky bottom bar */}
      {isMobile && (
        <div style={s.mobileBar}>
          <div>
            <div style={s.mobileBarLabel}>Total</div>
            <div style={s.mobileBarTotal}>{fmt(grandTotal)}</div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={submitting}
            style={{ ...s.mobileBarBtn, ...(submitting ? { opacity: 0.6 } : {}) }}
          >
            {submitting ? '...' : 'Finalizar'}
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Field component ── */
function Field({ label, required, value, onChange, error, placeholder, type = 'text', inputMode }) {
  return (
    <div style={s.fieldGroup}>
      <label style={s.label}>
        {label}
        {required && <span style={{ color: '#c8102e', marginLeft: 4 }}>*</span>}
      </label>
      <input
        type={type}
        inputMode={inputMode}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          ...s.input,
          ...(error ? s.inputError : {}),
        }}
      />
      {error && <span style={s.fieldError}>{error}</span>}
    </div>
  );
}

/* ── Styles ── */
const s = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f5f0e8',
    padding: '40px 20px 120px',
    maxWidth: 1000,
    margin: '0 auto',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
  title: { fontSize: 28, fontWeight: 700, margin: '0 0 32px' },
  layout: { display: 'flex', gap: 32, alignItems: 'flex-start' },

  /* Form */
  form: { flex: 1, minWidth: 0 },
  toggleRow: { display: 'flex', gap: 8, marginBottom: 24 },
  toggleBtn: {
    flex: 1,
    padding: '12px 16px',
    borderRadius: 8,
    border: '1px solid #333',
    fontSize: 14,
    fontWeight: 600,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  toggleActive: {
    background: '#c8102e',
    color: '#fff',
    borderColor: '#c8102e',
  },
  toggleInactive: {
    background: 'transparent',
    color: '#999',
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    color: '#d4a853',
    marginBottom: 12,
    marginTop: 24,
  },
  fields: { display: 'flex', flexDirection: 'column', gap: 12 },
  row2: { display: 'flex', gap: 12 },
  fieldGroup: { display: 'flex', flexDirection: 'column', gap: 4 },
  label: { fontSize: 13, color: '#888', fontWeight: 500 },
  input: {
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#f5f0e8',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.2s',
    width: '100%',
    boxSizing: 'border-box',
  },
  inputError: { borderColor: '#c8102e' },
  fieldError: { fontSize: 12, color: '#c8102e' },
  textarea: {
    width: '100%',
    boxSizing: 'border-box',
    padding: '10px 14px',
    borderRadius: 8,
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#f5f0e8',
    fontSize: 14,
    fontFamily: 'inherit',
    outline: 'none',
    resize: 'vertical',
  },

  /* Payment */
  payGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 },
  payBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '12px 14px',
    borderRadius: 8,
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#f5f0e8',
    fontSize: 13,
    cursor: 'pointer',
    fontFamily: 'inherit',
    transition: 'all 0.2s',
  },
  payActive: { borderColor: '#c8102e', background: 'rgba(200,16,46,0.1)' },
  payLabel: { fontWeight: 500 },

  /* Submit */
  submitBtn: {
    width: '100%',
    padding: '16px',
    borderRadius: 8,
    border: 'none',
    background: '#c8102e',
    color: '#fff',
    fontSize: 16,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
    marginTop: 24,
    transition: 'all 0.2s',
  },
  submitDisabled: { opacity: 0.6, cursor: 'not-allowed' },
  spinnerRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 },
  spinner: {
    width: 18,
    height: 18,
    border: '2px solid rgba(255,255,255,0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    animation: 'spin 0.6s linear infinite',
    display: 'inline-block',
  },

  /* Sidebar */
  sidebar: { width: 340, flexShrink: 0, position: 'sticky', top: 20 },
  sidebarCard: {
    background: '#1a1a1a',
    borderRadius: 12,
    padding: 20,
    border: '1px solid #2a2a2a',
  },
  sidebarTitle: { fontSize: 16, fontWeight: 700, margin: '0 0 16px' },
  sidebarItems: { display: 'flex', flexDirection: 'column', gap: 12 },
  sidebarItem: { display: 'flex', alignItems: 'flex-start', gap: 8 },
  sidebarName: { fontSize: 13, fontWeight: 600, color: '#f5f0e8' },
  sidebarMeta: { fontSize: 11, color: '#888' },
  sidebarPrice: { fontSize: 13, fontWeight: 600, color: '#d4a853', whiteSpace: 'nowrap' },
  sidebarDivider: { height: 1, background: '#2a2a2a', margin: '16px 0' },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '6px 0', fontSize: 13 },
  summaryLabel: { color: '#888' },
  summaryVal: { fontWeight: 500 },
  summaryTotal: { borderTop: '1px solid #333', marginTop: 8, paddingTop: 12 },
  totalLabel: { fontSize: 16, fontWeight: 700, color: '#f5f0e8' },
  totalVal: { fontSize: 20, fontWeight: 800, color: '#d4a853' },

  /* Empty */
  empty: {
    minHeight: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#0a0a0a',
    color: '#f5f0e8',
    padding: 40,
    textAlign: 'center',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
  emptyIcon: { fontSize: 64, marginBottom: 16, opacity: 0.6 },
  emptyTitle: { fontSize: 24, fontWeight: 700, margin: '0 0 8px' },
  emptyText: { fontSize: 15, color: '#888', marginBottom: 24, maxWidth: 320 },
  emptyBtn: {
    padding: '12px 28px',
    borderRadius: 8,
    background: '#c8102e',
    color: '#fff',
    fontSize: 14,
    fontWeight: 700,
    textDecoration: 'none',
    fontFamily: 'inherit',
  },

  /* Success modal */
  modalOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.85)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 200,
    padding: 20,
  },
  modal: {
    background: '#1a1a1a',
    borderRadius: 16,
    padding: 40,
    textAlign: 'center',
    maxWidth: 380,
    width: '100%',
    border: '1px solid #2a2a2a',
  },
  modalIcon: { fontSize: 48, marginBottom: 12 },
  modalTitle: { fontSize: 24, fontWeight: 700, margin: '0 0 8px' },
  modalSubtitle: { fontSize: 14, color: '#888', marginBottom: 24 },
  modalOrder: {
    background: '#0a0a0a',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  modalOrderLabel: { display: 'block', fontSize: 11, color: '#888', textTransform: 'uppercase', marginBottom: 4 },
  modalOrderNum: { fontSize: 28, fontWeight: 800, color: '#d4a853' },
  modalTime: {
    background: '#0a0a0a',
    borderRadius: 8,
    padding: 12,
    marginBottom: 24,
  },
  modalTimeLabel: { display: 'block', fontSize: 11, color: '#888', textTransform: 'uppercase', marginBottom: 4 },
  modalTimeVal: { fontSize: 18, fontWeight: 700, color: '#f5f0e8' },
  modalBtn: {
    width: '100%',
    padding: '14px',
    borderRadius: 8,
    border: 'none',
    background: '#c8102e',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

  /* Mobile bottom bar */
  mobileBar: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(17,17,17,0.95)',
    borderTop: '1px solid #2a2a2a',
    padding: '12px 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 100,
    backdropFilter: 'blur(12px)',
  },
  mobileBarLabel: { fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' },
  mobileBarTotal: { fontSize: 20, fontWeight: 800, color: '#d4a853' },
  mobileBarBtn: {
    padding: '12px 28px',
    borderRadius: 8,
    background: '#c8102e',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    border: 'none',
    fontFamily: 'inherit',
    cursor: 'pointer',
  },
};

// Inject spinner animation
if (typeof document !== 'undefined') {
  const id = 'checkout-anim';
  if (!document.getElementById(id)) {
    const style = document.createElement('style');
    style.id = id;
    style.textContent = `
      @keyframes spin { to { transform: rotate(360deg); } }
      @media (max-width: 768px) {
        .checkout-layout { flex-direction: column !important; }
        .checkout-row2 { flex-direction: column !important; }
      }
    `;
    document.head.appendChild(style);
  }
}
