import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Pizza3D from '../components/Pizza3D';

/* ============================================
   HOOK: Intersection Observer for scroll anims
   ============================================ */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

/* ============================================
   FEATURED PIZZAS DATA
   ============================================ */
const specialPizzas = [
  {
    id: 1,
    name: 'Margherita Classica',
    description: 'Molho de tomate San Marzano, mozzarella de bufala, manjericao fresco e azeite extra virgem.',
    price: 'R$ 54,90',
    ingredients: ['Molho de tomate', 'Mozzarella de bufala', 'Manjericao', 'Azeite'],
    color: '#c8102e',
  },
  {
    id: 2,
    name: 'Quattro Formaggi',
    description: 'Blend de quatro queijos italianos sobre base cremosa, finalizada com mel trufado.',
    price: 'R$ 62,90',
    ingredients: ['Gorgonzola', 'Parmesao', 'Provolone', 'Mozzarella'],
    color: '#d4a853',
  },
  {
    id: 3,
    name: 'Diavola Piccante',
    description: 'Salame calabresa defumado, pimenta calabresa, mozzarella e molho de tomate picante.',
    price: 'R$ 58,90',
    ingredients: ['Salame calabresa', 'Pimenta', 'Mozzarella', 'Molho picante'],
    color: '#ff4444',
  },
  {
    id: 4,
    name: 'Tartufata',
    description: 'Creme de trufa negra, mozzarella, funghi porcini e lascas de parmesao trufado.',
    price: 'R$ 78,90',
    ingredients: ['Trufa negra', 'Funghi porcini', 'Mozzarella', 'Parmesao'],
    color: '#8B6914',
  },
];

/* ============================================
   HERO SECTION
   ============================================ */
function HeroSection() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse at 30% 50%, rgba(200, 16, 46, 0.06) 0%, transparent 60%)',
    }}>
      {/* Background subtle pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle at 1px 1px, var(--color-gold) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '120px 24px 80px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        alignItems: 'center',
        width: '100%',
      }}
      className="hero-grid"
      >
        {/* Left: Text */}
        <div style={{
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'translateY(0)' : 'translateY(40px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <div style={{
            display: 'inline-block',
            padding: '6px 16px',
            borderRadius: 'var(--radius-full)',
            border: '1px solid var(--color-gold-dim)',
            background: 'var(--color-gold-dim)',
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: '#d4a853',
            marginBottom: '24px',
          }}>
            Desde 1985
          </div>

          <h1 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 7vw, 5.5rem)',
            fontWeight: 700,
            lineHeight: 1.05,
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #d4a853 0%, #f5d061 50%, #d4a853 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Forno
            <br />
            Nero
          </h1>

          <p style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
            color: 'var(--color-text-muted)',
            maxWidth: '480px',
            marginBottom: '40px',
            lineHeight: 1.8,
          }}>
            Pizza artesanal feita com massa fermentada naturalmente por 72 horas,
            ingredientes selecionados e assada em forno a lenha a mais de 400 graus.
          </p>

          <div style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
          }}>
            <Link to="/cardapio" className="btn btn-primary btn-lg">
              Ver Cardapio
            </Link>
            <Link to="/monte" className="btn btn-secondary btn-lg">
              Monte sua Pizza
            </Link>
          </div>

          {/* Stats */}
          <div style={{
            display: 'flex',
            gap: '40px',
            marginTop: '48px',
            paddingTop: '32px',
            borderTop: '1px solid var(--color-border)',
          }}>
            {[
              { value: '40+', label: 'Anos de historia' },
              { value: '15k+', label: 'Pizzas entregues' },
              { value: '4.9', label: 'Avaliacao media' },
            ].map((stat) => (
              <div key={stat.label}>
                <div style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.5rem',
                  fontWeight: 700,
                  color: '#d4a853',
                }}>
                  {stat.value}
                </div>
                <div style={{
                  fontSize: '0.75rem',
                  color: 'var(--color-text-dim)',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginTop: '4px',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: 3D Pizza */}
        <div style={{
          width: '100%',
          height: '500px',
          opacity: loaded ? 1 : 0,
          transform: loaded ? 'scale(1)' : 'scale(0.9)',
          transition: 'all 1s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
        }}>
          <Pizza3D />
        </div>
      </div>

      {/* Responsive style */}
      <style>{`
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            text-align: center;
            gap: 40px !important;
          }
          .hero-grid > div:last-child {
            height: 350px !important;
            order: -1;
          }
        }
      `}</style>
    </section>
  );
}

/* ============================================
   SPECIALS SECTION
   ============================================ */
function SpecialsSection() {
  const [ref, visible] = useInView(0.1);

  return (
    <section ref={ref} style={{
      padding: '96px 0',
      position: 'relative',
    }}>
      {/* Decorative glow */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(200, 16, 46, 0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#c8102e',
          }}>
            Especiais
          </span>
          <div className="section-divider" style={{ marginTop: '16px' }} />
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text)',
            marginBottom: '16px',
          }}>
            Nossas Especiais
          </h2>
          <p style={{
            maxWidth: '500px',
            margin: '0 auto',
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem',
          }}>
            Selecionadas pelo nosso mestre pizzaiolo, criadas para surpreender
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '24px',
        }}>
          {specialPizzas.map((pizza, i) => (
            <div
              key={pizza.id}
              className="card"
              style={{
                padding: 0,
                overflow: 'hidden',
                opacity: visible ? 1 : 0,
                transform: visible ? 'translateY(0)' : 'translateY(40px)',
                transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1) ' + (i * 0.1) + 's',
              }}
            >
              {/* Color bar */}
              <div style={{
                height: '4px',
                background: 'linear-gradient(90deg, ' + pizza.color + ', transparent)',
              }} />

              {/* Pizza illustration area */}
              <div style={{
                height: '140px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at center, ' + pizza.color + '10, transparent)',
                position: 'relative',
              }}>
                <svg width="100" height="100" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill={pizza.color} opacity="0.15" />
                  <circle cx="50" cy="50" r="45" fill="none" stroke={pizza.color} strokeWidth="2" opacity="0.3" />
                  <circle cx="50" cy="50" r="35" fill={pizza.color} opacity="0.1" />
                  {[
                    [35, 40], [55, 35], [65, 50], [40, 60], [55, 65],
                  ].map(([x, y], j) => (
                    <circle key={j} cx={x} cy={y} r="4" fill={pizza.color} opacity="0.4" />
                  ))}
                </svg>
              </div>

              {/* Content */}
              <div style={{ padding: '24px' }}>
                <h3 style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.25rem',
                  marginBottom: '8px',
                  color: 'var(--color-text)',
                }}>
                  {pizza.name}
                </h3>
                <p style={{
                  fontSize: '0.9rem',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                  minHeight: '48px',
                }}>
                  {pizza.description}
                </p>

                {/* Ingredients tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '6px',
                  marginBottom: '20px',
                }}>
                  {pizza.ingredients.map((ing) => (
                    <span key={ing} style={{
                      padding: '4px 10px',
                      borderRadius: 'var(--radius-full)',
                      background: 'rgba(212, 168, 83, 0.08)',
                      border: '1px solid rgba(212, 168, 83, 0.15)',
                      fontSize: '0.72rem',
                      color: 'var(--color-gold)',
                      letterSpacing: '0.3px',
                    }}>
                      {ing}
                    </span>
                  ))}
                </div>

                {/* Price and CTA */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                  <span style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#d4a853',
                  }}>
                    {pizza.price}
                  </span>
                  <Link to="/monte" style={{
                    padding: '8px 16px',
                    borderRadius: 'var(--radius-full)',
                    border: '1px solid var(--color-accent)',
                    color: '#c8102e',
                    fontSize: '0.8rem',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s',
                    textDecoration: 'none',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#c8102e';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = '#c8102e';
                  }}
                  >
                    Pedir
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================
   CTA SECTION: Monte sua Pizza
   ============================================ */
function CTASection() {
  const [ref, visible] = useInView(0.2);

  return (
    <section ref={ref} style={{
      padding: '96px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 24px',
      }}>
        <div style={{
          background: 'linear-gradient(135deg, rgba(200, 16, 46, 0.08) 0%, rgba(212, 168, 83, 0.05) 100%)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-xl)',
          padding: '80px 60px',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          {/* Decorative elements */}
          <div style={{
            position: 'absolute',
            top: '-50px',
            right: '-50px',
            width: '200px',
            height: '200px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(200, 16, 46, 0.08) 0%, transparent 70%)',
          }} />
          <div style={{
            position: 'absolute',
            bottom: '-30px',
            left: '-30px',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(212, 168, 83, 0.06) 0%, transparent 70%)',
          }} />

          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: '#c8102e',
          }}>
            Personalize
          </span>

          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            margin: '16px 0',
            color: 'var(--color-text)',
          }}>
            Monte sua Propria Pizza
          </h2>

          <p style={{
            maxWidth: '500px',
            margin: '0 auto 40px',
            color: 'var(--color-text-muted)',
            fontSize: '1.05rem',
            lineHeight: 1.7,
          }}>
            Escolha a massa, o molho, os queijos e os recheios. Criamos a pizza
            perfeita do seu jeito, assada fresca no momento.
          </p>

          <Link to="/monte" className="btn btn-primary btn-lg">
            Comecar Agora
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ============================================
   STORY SECTION
   ============================================ */
function StorySection() {
  const [ref, visible] = useInView(0.15);

  const milestones = [
    { year: '1985', text: 'Giuseppe abre o primeiro Forno Nero no bairro da Mooca, Sao Paulo.' },
    { year: '1995', text: 'Expansao para a zona sul. O forno a lenha original acompanha a equipe.' },
    { year: '2010', text: 'Reconhecimento como uma das melhores pizzarias artesanais do Brasil.' },
    { year: '2024', text: 'Delivery premium: pizza artesanal entregue quente em 40 minutos.' },
  ];

  return (
    <section ref={ref} style={{
      padding: '96px 0',
      position: 'relative',
      background: 'linear-gradient(180deg, transparent 0%, rgba(212, 168, 83, 0.02) 50%, transparent 100%)',
    }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
        }}>
          <span style={{
            fontSize: '0.8rem',
            fontWeight: 600,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            color: 'var(--color-gold)',
          }}>
            Nossa Historia
          </span>
          <div className="section-divider" style={{ marginTop: '16px' }} />
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: 'var(--color-text)',
            marginBottom: '16px',
          }}>
            Tradicao que se faz na brasa
          </h2>
        </div>

        {/* Story content */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center',
        }}
        className="story-grid"
        >
          {/* Left: Fire illustration */}
          <div style={{
            aspectRatio: '4/3',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, #1a1408 0%, #0a0a0a 100%)',
            border: '1px solid var(--color-border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s',
          }}>
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'radial-gradient(circle at 40% 50%, rgba(200, 16, 46, 0.1) 0%, transparent 60%)',
            }} />
            <svg width="120" height="120" viewBox="0 0 120 120" style={{ opacity: 0.6 }}>
              <defs>
                <linearGradient id="flameGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#c8102e" />
                  <stop offset="50%" stopColor="#d4a853" />
                  <stop offset="100%" stopColor="#f5d061" />
                </linearGradient>
              </defs>
              <path d="M60 15 C60 15, 25 50, 30 75 C32 83, 40 90, 50 92 C45 80, 55 65, 60 55 C65 65, 75 80, 70 92 C80 90, 88 83, 90 75 C95 50, 60 15, 60 15Z" fill="url(#flameGrad)" opacity="0.7" />
              <path d="M60 45 C60 45, 42 65, 45 80 C46 85, 52 90, 60 90 C68 90, 74 85, 75 80 C78 65, 60 45, 60 45Z" fill="#f5d061" opacity="0.5" />
            </svg>
            <span style={{
              position: 'absolute',
              bottom: '16px',
              left: '50%',
              transform: 'translateX(-50%)',
              fontSize: '0.75rem',
              color: 'var(--color-text-dim)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
            }}>
              Forno a lenha desde 1985
            </span>
          </div>

          {/* Right: Timeline */}
          <div style={{
            opacity: visible ? 1 : 0,
            transform: visible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.3s',
          }}>
            <p style={{
              fontSize: '1.05rem',
              lineHeight: 1.8,
              color: 'var(--color-text-muted)',
              marginBottom: '40px',
            }}>
              Tudo comecou com Giuseppe Ferraro, um pizzaiolo napolitano que trouxe
              a receita da familia e um forno de pedra de mais de 200kg de Napes.
              A paixao por fazer a pizza perfeita continua viva em cada peca que sai
              do nosso forno.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {milestones.map((m, i) => (
                <div key={m.year} style={{
                  display: 'flex',
                  gap: '20px',
                  alignItems: 'flex-start',
                  opacity: visible ? 1 : 0,
                  transform: visible ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) ' + (0.4 + i * 0.15) + 's',
                }}>
                  <div style={{
                    minWidth: '60px',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#c8102e',
                  }}>
                    {m.year}
                  </div>
                  <div style={{
                    flex: 1,
                    paddingLeft: '20px',
                    borderLeft: '2px solid var(--color-border)',
                  }}>
                    <p style={{
                      fontSize: '0.95rem',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.6,
                    }}>
                      {m.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .story-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ============================================
   FINAL CTA
   ============================================ */
function FinalCTA() {
  const [ref, visible] = useInView(0.2);

  return (
    <section ref={ref} style={{
      padding: '96px 0',
      textAlign: 'center',
    }}>
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        padding: '0 24px',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(30px)',
        transition: 'all 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
      }}>
        <h2 style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.75rem, 3.5vw, 2.5rem)',
          color: 'var(--color-text)',
          marginBottom: '16px',
        }}>
          Pronto para Saborear?
        </h2>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--color-text-muted)',
          marginBottom: '32px',
          lineHeight: 1.7,
        }}>
          Faca seu pedido agora e receba em casa uma pizza artesanal
          assada com maestria no forno a lenha.
        </p>
        <Link to="/cardapio" className="btn btn-primary btn-lg">
          Ver Cardapio Completo
        </Link>
      </div>
    </section>
  );
}

/* ============================================
   HOMEPAGE ROOT
   ============================================ */
export default function Homepage() {
  return (
    <div style={{ overflow: 'hidden' }}>
      <HeroSection />
      <SpecialsSection />
      <CTASection />
      <StorySection />
      <FinalCTA />
    </div>
  );
}
