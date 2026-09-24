import { useState, useEffect, useCallback } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function fmt(v) {
  return `R$ ${(v || 0).toFixed(2).replace('.', ',')}`;
}

export default function Cart() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getDeliveryFee,
    getGrandTotal,
  } = useCart();
  const navigate = useNavigate();

  const [confirmClear, setConfirmClear] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const handleRemove = useCallback(
    (id) => {
      setRemovingId(id);
      setTimeout(() => {
        removeFromCart(id);
        setRemovingId(null);
      }, 350);
    },
    [removeFromCart]
  );

  const handleQty = useCallback(
    (id, delta) => {
      const item = items.find((i) => i.id === id);
      if (!item) return;
      const next = item.quantity + delta;
      if (next >= 1) updateQuantity(id, next);
    },
    [items, updateQuantity]
  );

  const handleClear = useCallback(() => {
    if (!confirmClear) {
      setConfirmClear(true);
      setTimeout(() => setConfirmClear(false), 4000);
      return;
    }
    clearCart();
    setConfirmClear(false);
  }, [confirmClear, clearCart]);

  const subtotal = getCartTotal();
  const delivery = getDeliveryFee();
  const grandTotal = getGrandTotal();

  // Empty state
  if (items.length === 0) {
    return (
      <div style={s.empty}>
        <div style={s.emptyIcon}>🍕</div>
        <h2 style={s.emptyTitle}>Seu carrinho está vazio</h2>
        <p style={s.emptyText}>
          Adicione pizzas deliciosas ao seu carrinho para continuar.
        </p>
        <Link to="/cardapio" style={s.emptyBtn}>Ver Cardápio</Link>
      </div>
    );
  }

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.title}>Seu Carrinho</h1>
        <span style={s.badge}>
          {items.length} {items.length === 1 ? 'item' : 'itens'}
        </span>
      </div>

      {/* Desktop table */}
      {!isMobile && (
        <table style={s.table}>
          <thead>
            <tr>
              <th style={{ ...s.th, textAlign: 'left' }}>Pizza</th>
              <th style={s.th}>Quantidade</th>
              <th style={s.th}>Preço Unitário</th>
              <th style={s.th}>Total</th>
              <th style={s.th}></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const lineTotal = item.totalPrice * item.quantity;
              const gone = removingId === item.id;
              return (
                <tr
                  key={item.id}
                  style={{
                    ...s.tr,
                    opacity: gone ? 0 : 1,
                    transform: gone ? 'translateX(60px)' : 'none',
                    transition: 'opacity 0.35s ease, transform 0.35s ease',
                  }}
                >
                  <td style={s.tdLeft}>
                    <div style={s.pizzaCol}>
                      <span style={s.pizzaName}>{item.name}</span>
                      <span style={s.pizzaMeta}>
                        {item.size} &middot; {item.crust}
                      </span>
                      {item.toppings && item.toppings.length > 0 && (
                        <span style={s.pizzaToppings}>
                          {item.toppings.join(', ')}
                        </span>
                      )}
                    </div>
                  </td>
                  <td style={s.tdCenter}>
                    <div style={s.qtyRow}>
                      <button
                        onClick={() => handleQty(item.id, -1)}
                        disabled={item.quantity <= 1}
                        style={{ ...s.qtyBtn, opacity: item.quantity <= 1 ? 0.3 : 1 }}
                      >
                        &minus;
                      </button>
                      <span style={s.qtyNum}>{item.quantity}</span>
                      <button onClick={() => handleQty(item.id, 1)} style={s.qtyBtn}>
                        +
                      </button>
                    </div>
                  </td>
                  <td style={s.tdCenter}>{fmt(item.totalPrice)}</td>
                  <td style={{ ...s.tdCenter, fontWeight: 700, color: '#d4a853' }}>
                    {fmt(lineTotal)}
                  </td>
                  <td style={s.tdCenter}>
                    <button
                      onClick={() => handleRemove(item.id)}
                      style={s.removeBtn}
                      title="Remover"
                    >
                      ✕
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      {/* Mobile cards */}
      {isMobile && (
        <div>
          {items.map((item) => {
            const lineTotal = item.totalPrice * item.quantity;
            const gone = removingId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  ...s.card,
                  opacity: gone ? 0 : 1,
                  transform: gone ? 'translateX(40px)' : 'none',
                  transition: 'opacity 0.35s ease, transform 0.35s ease',
                }}
              >
                <div style={s.cardTop}>
                  <div style={{ flex: 1 }}>
                    <span style={s.pizzaName}>{item.name}</span>
                    <span style={s.pizzaMeta}>
                      {item.size} &middot; {item.crust}
                    </span>
                    {item.toppings && item.toppings.length > 0 && (
                      <span style={s.pizzaToppings}>
                        {item.toppings.join(', ')}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    style={s.removeBtn}
                  >
                    ✕
                  </button>
                </div>
                <div style={s.cardBottom}>
                  <div style={s.qtyRow}>
                    <button
                      onClick={() => handleQty(item.id, -1)}
                      disabled={item.quantity <= 1}
                      style={{ ...s.qtyBtn, opacity: item.quantity <= 1 ? 0.3 : 1 }}
                    >
                      &minus;
                    </button>
                    <span style={s.qtyNum}>{item.quantity}</span>
                    <button onClick={() => handleQty(item.id, 1)} style={s.qtyBtn}>
                      +
                    </button>
                  </div>
                  <span style={s.cardPrice}>{fmt(lineTotal)}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Summary */}
      <div style={s.summary}>
        <div style={s.summaryRow}>
          <span style={s.summaryLabel}>Subtotal</span>
          <span style={s.summaryVal}>{fmt(subtotal)}</span>
        </div>
        <div style={s.summaryRow}>
          <span style={s.summaryLabel}>Taxa de entrega (10%)</span>
          <span style={s.summaryVal}>{fmt(delivery)}</span>
        </div>
        <div style={{ ...s.summaryRow, ...s.summaryTotal }}>
          <span style={s.totalLabel}>Total</span>
          <span style={s.totalVal}>{fmt(grandTotal)}</span>
        </div>
      </div>

      {/* Actions */}
      <div style={s.actions}>
        <button
          onClick={handleClear}
          style={{ ...s.clearBtn, ...(confirmClear ? s.clearBtnActive : {}) }}
        >
          {confirmClear ? 'Confirmar limpeza?' : 'Limpar Carrinho'}
        </button>
        <button onClick={() => navigate('/checkout')} style={s.checkoutBtn}>
          Continuar Pedido
        </button>
      </div>

      {/* Sticky mobile bottom bar */}
      {isMobile && (
        <div style={s.stickyBar}>
          <div>
            <div style={s.stickyLabel}>Total</div>
            <div style={s.stickyTotal}>{fmt(grandTotal)}</div>
          </div>
          <button onClick={() => navigate('/checkout')} style={s.stickyBtn}>
            Continuar
          </button>
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    background: '#0a0a0a',
    color: '#f5f0e8',
    padding: '40px 20px 120px',
    maxWidth: 900,
    margin: '0 auto',
    fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif",
  },
  header: {
    display: 'flex',
    alignItems: 'baseline',
    gap: 12,
    marginBottom: 32,
    borderBottom: '1px solid #2a2a2a',
    paddingBottom: 16,
  },
  title: { fontSize: 28, fontWeight: 700, margin: 0 },
  badge: { fontSize: 14, color: '#888' },

  /* Table */
  table: { width: '100%', borderCollapse: 'collapse', fontSize: 14, marginBottom: 24 },
  th: {
    padding: '12px 16px',
    borderBottom: '1px solid #2a2a2a',
    color: '#888',
    fontWeight: 500,
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    textAlign: 'center',
  },
  tr: { borderBottom: '1px solid #1a1a1a' },
  tdLeft: { padding: 16, textAlign: 'left', verticalAlign: 'top' },
  tdCenter: { padding: 16, textAlign: 'center', verticalAlign: 'middle' },

  /* Pizza info */
  pizzaCol: { display: 'flex', flexDirection: 'column', gap: 2 },
  pizzaName: { fontSize: 15, fontWeight: 600, color: '#f5f0e8' },
  pizzaMeta: { fontSize: 12, color: '#999' },
  pizzaToppings: { fontSize: 11, color: '#c8102e', marginTop: 2 },

  /* Quantity */
  qtyRow: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 },
  qtyBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    border: '1px solid #333',
    background: '#1a1a1a',
    color: '#f5f0e8',
    fontSize: 16,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    lineHeight: 1,
  },
  qtyNum: { fontSize: 15, fontWeight: 600, minWidth: 24, textAlign: 'center' },

  removeBtn: {
    width: 30,
    height: 30,
    borderRadius: 6,
    border: 'none',
    background: 'transparent',
    color: '#c8102e',
    cursor: 'pointer',
    fontSize: 14,
    fontWeight: 700,
  },

  /* Mobile cards */
  card: {
    background: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    border: '1px solid #2a2a2a',
  },
  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 },
  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  cardPrice: { fontSize: 17, fontWeight: 700, color: '#d4a853' },

  /* Summary */
  summary: { borderTop: '1px solid #2a2a2a', paddingTop: 16, marginTop: 8 },
  summaryRow: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', fontSize: 14 },
  summaryLabel: { color: '#999' },
  summaryVal: { color: '#f5f0e8', fontWeight: 500 },
  summaryTotal: { borderTop: '1px solid #333', marginTop: 8, paddingTop: 12 },
  totalLabel: { fontSize: 18, fontWeight: 700, color: '#f5f0e8' },
  totalVal: { fontSize: 22, fontWeight: 800, color: '#d4a853' },

  /* Actions */
  actions: { display: 'flex', justifyContent: 'space-between', gap: 12, marginTop: 24 },
  clearBtn: {
    padding: '12px 24px',
    borderRadius: 8,
    border: '1px solid #333',
    background: 'transparent',
    color: '#999',
    fontSize: 14,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  clearBtnActive: { borderColor: '#c8102e', color: '#c8102e', background: 'rgba(200,16,46,0.1)' },
  checkoutBtn: {
    padding: '14px 32px',
    borderRadius: 8,
    border: 'none',
    background: '#c8102e',
    color: '#fff',
    fontSize: 15,
    fontWeight: 700,
    cursor: 'pointer',
    fontFamily: 'inherit',
  },

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

  /* Sticky bar (mobile) */
  stickyBar: {
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
  stickyLabel: { fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em' },
  stickyTotal: { fontSize: 20, fontWeight: 800, color: '#d4a853' },
  stickyBtn: {
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
