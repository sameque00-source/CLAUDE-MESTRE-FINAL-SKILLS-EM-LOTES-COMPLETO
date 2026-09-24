import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from './context/CartContext';
import Homepage from './pages/Homepage';
import Menu from './pages/Menu';
import PizzaBuilder from './pages/PizzaBuilder';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';

/* ============================================
   NAVIGATION BAR
   ============================================ */
function Navbar() {
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/cardapio', label: 'Cardapio' },
    { to: '/monte', label: 'Monte sua Pizza' },
    { to: '/carrinho', label: 'Carrinho' },
  ];

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      padding: scrolled ? '12px 0' : '20px 0',
      background: scrolled ? 'rgba(10, 10, 10, 0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent',
      transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <Link to="/" style={{
          fontFamily: 'var(--font-heading)',
          fontSize: '1.6rem',
          fontWeight: 700,
          color: '#d4a853',
          letterSpacing: '1px',
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
        }}>
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" fill="#c8102e" />
            <circle cx="16" cy="16" r="10" fill="#f5d061" opacity="0.7" />
            <circle cx="12" cy="13" r="2.5" fill="#8B1A1A" />
            <circle cx="20" cy="12" r="2" fill="#8B1A1A" />
            <circle cx="16" cy="19" r="2.2" fill="#8B1A1A" />
            <circle cx="11" cy="19" r="1.5" fill="#2d5a27" />
            <circle cx="21" cy="18" r="1.3" fill="#2d5a27" />
          </svg>
          Forno Nero
        </Link>

        {/* Desktop Links */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
        }}
        className="desktop-nav"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '0.9rem',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: location.pathname === link.to ? '#d4a853' : '#a09888',
                textDecoration: 'none',
                transition: 'color 0.3s',
                position: 'relative',
                paddingBottom: '4px',
              }}
              onMouseEnter={(e) => e.target.style.color = '#d4a853'}
              onMouseLeave={(e) => {
                if (location.pathname !== link.to) {
                  e.target.style.color = '#a09888';
                }
              }}
            >
              {link.label}
              {location.pathname === link.to && (
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, #d4a853, #c8102e)',
                  borderRadius: '1px',
                }} />
              )}
            </Link>
          ))}

          {/* Cart Icon */}
          <Link to="/carrinho" style={{
            position: 'relative',
            color: '#a09888',
            transition: 'color 0.3s',
            display: 'flex',
            alignItems: 'center',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = '#d4a853'}
          onMouseLeave={(e) => e.currentTarget.style.color = '#a09888'}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {cartCount > 0 && (
              <span style={{
                position: 'absolute',
                top: -6,
                right: -8,
                background: '#c8102e',
                color: '#fff',
                fontSize: 11,
                fontWeight: 700,
                width: 20,
                height: 20,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                lineHeight: 1,
              }}>
                {cartCount}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="mobile-hamburger"
          aria-label="Menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '8px',
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#d4a853" strokeWidth="2">
            {mobileOpen ? (
              <>
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{
          padding: '16px 24px',
          background: 'rgba(10, 10, 10, 0.98)',
          borderTop: '1px solid var(--color-border)',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}>
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: '1rem',
                fontWeight: 500,
                letterSpacing: '1px',
                textTransform: 'uppercase',
                color: location.pathname === link.to ? '#d4a853' : '#a09888',
                textDecoration: 'none',
                padding: '8px 0',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
}

/* ============================================
   FOOTER
   ============================================ */
function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid var(--color-border)',
      padding: '64px 0 32px',
      marginTop: 'auto',
      background: 'linear-gradient(180deg, #0a0a0a 0%, #050505 100%)',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '48px',
          marginBottom: '48px',
        }}>
          {/* Brand */}
          <div>
            <h3 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              color: '#d4a853',
              marginBottom: '12px',
            }}>
              Forno Nero
            </h3>
            <p style={{
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
            }}>
              Pizza artesanal feita com amor e dedicacao desde 1985.
              Massa fermentada naturalmente, ingredientes selecionados.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}>
              Navegacao
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { to: '/', label: 'Home' },
                { to: '/cardapio', label: 'Cardapio' },
                { to: '/monte', label: 'Monte sua Pizza' },
                { to: '/carrinho', label: 'Carrinho' },
              ].map((link) => (
                <Link key={link.to} to={link.to} style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  transition: 'color 0.3s',
                }}
                onMouseEnter={(e) => e.target.style.color = '#d4a853'}
                onMouseLeave={(e) => e.target.style.color = 'var(--color-text-muted)'}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}>
              Horario
            </h4>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              fontSize: '0.9rem',
              color: 'var(--color-text-muted)',
            }}>
              <span>Seg - Sex: 18h - 23h</span>
              <span>Sab - Dom: 12h - 00h</span>
              <span style={{ color: 'var(--color-gold)', marginTop: '4px' }}>
                Delivery ate 23h
              </span>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.1rem',
              color: 'var(--color-text)',
              marginBottom: '16px',
            }}>
              Social
            </h4>
            <div style={{ display: 'flex', gap: '12px' }}>
              {['Instagram', 'Facebook', 'WhatsApp'].map((name) => (
                <a key={name} href="#" style={{
                  padding: '10px 16px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--color-bg-card)',
                  border: '1px solid var(--color-border)',
                  fontSize: '0.8rem',
                  color: 'var(--color-text-muted)',
                  transition: 'all 0.3s',
                  textDecoration: 'none',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.color = '#d4a853';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-border)';
                  e.currentTarget.style.color = 'var(--color-text-muted)';
                }}
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid var(--color-border)',
          paddingTop: '24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            2025 Forno Nero. Todos os direitos reservados.
          </p>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
            Feito com paixao em Sao Paulo
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================
   APP ROOT
   ============================================ */
export default function App() {
  return (
    <HashRouter>
      <Navbar />
      <main style={{ flex: 1, paddingTop: '0' }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/cardapio" element={<Menu />} />
          <Route path="/monte" element={<PizzaBuilder />} />
          <Route path="/carrinho" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </main>
      <Footer />
    </HashRouter>
  );
}
