import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const CATEGORIES = ['Todas','Clássicas','Especiais','Premium','Vegetarianas','Picantes','Combos','Sobremesas','Bebidas']

const PIZZAS = [
  { id:1, name:'Margherita', description:'Molho de tomate San Marzano, mussarela de bufala fresca, manjericao aromatico e azeite extra virgem', category:'Clássicas', price:49.90, ingredients:['Molho de tomate','Mussarela de bufala','Manjericao','Azeite'], badge:'Classica', color:'#c8102e' },
  { id:2, name:'Quatro Queijos', description:'Mix de mussarela, gorgonzola, parmesao e provolone sobre creme de ricota', category:'Clássicas', price:54.90, ingredients:['Mussarela','Gorgonzola','Parmesao','Provolone','Creme de ricota'], badge:'Classica', color:'#d4a853' },
  { id:3, name:'Calabresa', description:'Calabresa artesanal defumada, cebola caramelizada roxa e azeitonas pretas', category:'Clássicas', price:44.90, ingredients:['Calabresa artesanal','Cebola caramelizada','Azeitonas pretas'], badge:'Classica', color:'#8b2500' },
  { id:4, name:'Portuguesa', description:'Presunto premium, ovos, cebola, azeitonas verdes, ervilha fresca e pimentao', category:'Clássicas', price:47.90, ingredients:['Presunto premium','Ovos','Cebola','Azeitonas verdes','Ervilha fresca','Pimentao'], badge:'Classica', color:'#228b22' },
  { id:5, name:'Napolitana', description:'Molho de tomate rustico, mussarela, tomate fresco fatiado e alho crocante', category:'Clássicas', price:46.90, ingredients:['Molho de tomate rustico','Mussarela','Tomate fresco','Alho crocante'], badge:'Classica', color:'#ff4500' },
  { id:6, name:'Frango com Catupiry', description:'Frango desfiado temperado, catupiry cremoso derretido e milho dourado', category:'Especiais', price:48.90, ingredients:['Frango desfiado','Catupiry cremoso','Milho dourado','Oregano'], badge:'Especial', color:'#daa520' },
  { id:7, name:'Bacon Supreme', description:'Bacon crocante artesanal, queijo cheddar maturado, cebola crispy e barbecue', category:'Especiais', price:56.90, ingredients:['Bacon artesanal','Cheddar maturado','Cebola crispy','Molho barbecue'], badge:'Especial', color:'#8b4513' },
  { id:8, name:'Chevre com Mel', description:'Queijo chevre cremoso, mel de lavanda, nozes caramelizadas e rucula', category:'Especiais', price:59.90, ingredients:['Queijo chevre','Mel de lavanda','Nozes caramelizadas','Rucula'], badge:'Especial', color:'#f0e68c' },
  { id:9, name:'Trufada', description:'Creme de ricota trufado, trufas negras, azeite trufado e parmesao 24 meses', category:'Premium', price:89.90, ingredients:['Creme de ricota trufado','Trufas negras','Azeite trufado','Parmesao 24 meses'], badge:'Premium', color:'#4a4a4a' },
  { id:10, name:'Lobster', description:'Lagosta grelhada suculenta, bisque reduzido, mussarela de bufala e ervas finas', category:'Premium', price:129.90, ingredients:['Lagosta grelhada','Bisque reduzido','Mussarela de bufala','Ervas finas'], badge:'Premium', color:'#dc143c' },
  { id:11, name:'Wagyu', description:'Carpaccio de wagyu A5, rucula selvagem, lascas de parmesao 36 meses', category:'Premium', price:149.90, ingredients:['Carpaccio wagyu A5','Rucula selvagem','Parmesao 36 meses','Reducao balsamica'], badge:'Premium', color:'#8b0000' },
  { id:12, name:'Vegetariana', description:'Abobrinha grelhada, berinjela, pimentao tricolor, tomate seco e queijo de cabra', category:'Vegetarianas', price:46.90, ingredients:['Abobrinha grelhada','Berinjela','Pimentao tricolor','Tomate seco','Queijo de cabra'], badge:'Verde', color:'#32cd32' },
  { id:13, name:'Mediterranea', description:'Azeitonas Kalamata, alcaparras, tomate cereja, rucula e azeite aromatico', category:'Vegetarianas', price:48.90, ingredients:['Azeitonas Kalamata','Alcaparras','Tomate cereja','Rucula','Azeite aromatico'], badge:'Verde', color:'#2e8b57' },
  { id:14, name:'Diavola', description:'Salame picante calabrese, pimenta habanero, provolone afumado e honey drizzle', category:'Picantes', price:52.90, ingredients:['Salame picante calabrese','Pimenta habanero','Provolone afumado','Mel'], badge:'Picante', color:'#ff0000' },
  { id:15, name:'Pepperoni Explosiva', description:'Tripla camada de pepperoni artesanal, jalapeno fresco, cebola crispy e chipotle mayo', category:'Picantes', price:54.90, ingredients:['Pepperoni artesanal','Jalapeno fresco','Cebola crispy','Chipotle mayo'], badge:'Picante', color:'#dc143c' },
]

const COMBOS = [
  { id:101, name:'Combo Familia', description:'3 pizzas grandes + 2L refrigerante', category:'Combos', price:149.90, details:'3 Pizzas Grandes + Refrigerante 2L', badge:'Combo', color:'#ff6b35' },
  { id:102, name:'Combo Casal', description:'2 pizzas medias + sobremesa compartilhada', category:'Combos', price:99.90, details:'2 Pizzas Medias + 1 Sobremesa', badge:'Combo', color:'#e91e63' },
  { id:103, name:'Combo Individual', description:'1 pizza pequena + bebida', category:'Combos', price:49.90, details:'1 Pizza Pequena + Bebida', badge:'Combo', color:'#4caf50' },
]

const SOBREMESAS = [
  { id:201, name:'Tiramisu', description:'Classico italiano com mascarpone, cafe e cacau', category:'Sobremesas', price:29.90, badge:'Doce', color:'#d2691e' },
  { id:202, name:'Panna Cotta', description:'Creme suave de baunilha com calda de frutas vermelhas', category:'Sobremesas', price:24.90, badge:'Doce', color:'#ffe4e1' },
  { id:203, name:'Petit Gateau', description:'Bolinho de chocolate belga com centro liquido e sorvete', category:'Sobremesas', price:32.90, badge:'Doce', color:'#3e1a00' },
]

const BEBIDAS = [
  { id:301, name:'Coca-Cola 2L', description:'Refrigerante de cola gelado', category:'Bebidas', price:14.90, badge:'Bebida', color:'#c41230' },
  { id:302, name:'Suco Natural', description:'Laranja, limao ou maracuja espremido na hora', category:'Bebidas', price:12.90, badge:'Bebida', color:'#ff8c00' },
  { id:303, name:'Chopp Duplo', description:'2 choops artesanais gelados de 500ml', category:'Bebidas', price:29.90, badge:'Bebida', color:'#daa520' },
  { id:304, name:'Vinho Tinto', description:'Malbec argentino encorpado, garrafa', category:'Bebidas', price:79.90, badge:'Bebida', color:'#722f37' },
  { id:305, name:'Guarana 350ml', description:'Guarana Antarctica gelado lata', category:'Bebidas', price:7.90, badge:'Bebida', color:'#2e8b57' },
  { id:306, name:'Agua Mineral', description:'Agua mineral com ou sem gas 500ml', category:'Bebidas', price:5.90, badge:'Bebida', color:'#87ceeb' },
]

const ALL_ITEMS = [...PIZZAS, ...COMBOS, ...SOBREMESAS, ...BEBIDAS]

const BC = {
  Classica:{bg:'#c8102e22',text:'#c8102e',border:'#c8102e'}, Especial:{bg:'#d4a85322',text:'#d4a853',border:'#d4a853'},
  Premium:{bg:'#ffd70022',text:'#ffd700',border:'#ffd700'}, Verde:{bg:'#32cd3222',text:'#32cd32',border:'#32cd32'},
  Picante:{bg:'#ff000022',text:'#ff4444',border:'#ff4444'}, Combo:{bg:'#ff6b3522',text:'#ff6b35',border:'#ff6b35'},
  Doce:{bg:'#d2691e22',text:'#d2691e',border:'#d2691e'}, Bebida:{bg:'#87ceeb22',text:'#87ceeb',border:'#87ceeb'},
}

function fp(v){return 'R$ '+v.toFixed(2).replace('.',',')}

export default function Menu(){
  const [ac,setAc]=useState('Todas')
  const [search,setSearch]=useState('')
  const [sort,setSort]=useState('name')
  const [sel,setSel]=useState(null)
  const nav=useNavigate()
  const {addToCart}=useCart()

  const filtered=useMemo(()=>{
    let items=ALL_ITEMS
    if(ac!=='Todas')items=items.filter(p=>p.category===ac)
    if(search.trim()){const q=search.toLowerCase();items=items.filter(p=>p.name.toLowerCase().includes(q)||p.description.toLowerCase().includes(q))}
    return[...items].sort((a,b)=>{
      if(sort==='name')return a.name.localeCompare(b.name)
      if(sort==='price-asc')return a.price-b.price
      if(sort==='price-desc')return b.price-a.price
      return 0
    })
  },[ac,search,sort])

  function qa(e,item){e.stopPropagation();addToCart({name:item.name,size:'Grande',crust:'Tradicional',edge:'Sem borda',toppings:[],extras:[],quantity:1,unitPrice:item.price,totalPrice:item.price,notes:''})}

  return(
    <div style={st.pg}>
      <div style={st.hd}><h1 style={st.ti}><span style={st.ta}>Nossas</span> Pizzas</h1><p style={st.sub}>Arte Italiana desde 1998 - ingredientes selecionados, massa artesanal</p></div>
      <div style={st.ctl}>
        <div style={st.sw}><span style={st.si}>&#128269;</span><input type="text" placeholder="Buscar pizza, ingrediente..." value={search} onChange={e=>setSearch(e.target.value)} style={st.si2}/>{search&&<button onClick={()=>setSearch('')} style={st.cb}>&times;</button>}</div>
        <select value={sort} onChange={e=>setSort(e.target.value)} style={st.ss}><option value="name">Nome A-Z</option><option value="price-asc">Menor Preco</option><option value="price-desc">Maior Preco</option></select>
      </div>
      <div style={st.tw}><div style={st.tb}>{CATEGORIES.map(c=><button key={c} onClick={()=>setAc(c)} style={{...st.tt,...(ac===c?st.ta2:{})}}>{c}</button>)}</div></div>
      <div style={st.bcta} onClick={()=>nav('/monte')}><div style={st.cti}><span style={st.ctic}>&#127829;</span><div style={{flex:1}}><h3 style={st.ctt}>Monte sua Pizza</h3><p style={st.cts}>Escolha cada ingrediente do seu jeito</p></div><span style={st.cta2}>&rarr;</span></div></div>
      <div style={st.gd}>
        {filtered.length===0&&<div style={st.emp}><span style={st.ei}>&#128270;</span><p>Nenhuma pizza encontrada</p></div>}
        {filtered.map(item=>{const bd=BC[item.badge]||BC.Classica;return(
          <div key={item.id} style={st.cd} onClick={()=>setSel(item)} onMouseEnter={e=>{e.currentTarget.style.transform='translateY(-6px)';e.currentTarget.style.boxShadow='0 16px 48px rgba(200,16,46,0.15)'}} onMouseLeave={e=>{e.currentTarget.style.transform='translateY(0)';e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.3)'}}>
            <div style={{...st.ci,background:'linear-gradient(135deg,'+item.color+'44,'+item.color+'88)'}}><div style={{...st.bd,bg:bd.bg,color:bd.text,border:'1px solid '+bd.border}}>{item.badge}</div></div>
            <div style={st.cb2}><h3 style={st.cn}>{item.name}</h3><p style={st.cd2}>{item.description}</p><div style={st.cf}><span style={st.cp}>{fp(item.price)}</span><button style={st.ab} onClick={e=>qa(e,item)}>Adicionar</button></div></div>
          </div>)})}
      </div>
      {sel&&<Modal item={sel} onClose={()=>setSel(null)} onNav={nav} onAdd={addToCart}/>}
    </div>
  )
}

function Modal({item,onClose,onNav,onAdd}){
  const [sz,setSz]=useState('Grande')
  const [q,setQ]=useState(1)
  const bd=BC[item.badge]||BC.Classica
  const szs={'Pequena':35,'Media':45,'Grande':55,'Gigante':65}
  const bp=szs[sz]||item.price
  function ha(){onAdd({name:item.name,size:sz,crust:'Tradicional',edge:'Sem borda',toppings:item.ingredients||[],extras:[],quantity:q,unitPrice:bp,totalPrice:bp,notes:''});onClose()}
  return(
    <div style={st.mb} onClick={onClose}>
      <div style={st.mc} onClick={e=>e.stopPropagation()}>
        <button style={st.mx} onClick={onClose}>&times;</button>
        <div style={{...st.mi,background:'linear-gradient(135deg,'+item.color+'44,'+item.color+'88)'}}><div style={{...st.bd,bg:bd.bg,color:bd.text,border:'1px solid '+bd.border,position:'absolute',top:16,left:16}}>{item.badge}</div></div>
        <div style={st.mb2}>
          <h2 style={st.mt}>{item.name}</h2><p style={st.md}>{item.description}</p>
          {item.ingredients&&<div style={st.ms}><h4 style={st.st2}>Ingredientes</h4><div style={st.il}>{item.ingredients.map(i=><span key={i} style={st.it}>{i}</span>)}</div></div>}
          {item.details&&<div style={st.ms}><h4 style={st.st2}>Inclui</h4><p style={{color:'#ccc',margin:0}}>{item.details}</p></div>}
          <div style={st.ms}><h4 style={st.st2}>Tamanho</h4><div style={st.sg}>{Object.entries(szs).map(([s,p])=><button key={s} onClick={()=>setSz(s)} style={{...st.sb,...(sz===s?st.sba:{})}}><span>{s}</span><span style={st.sp}>{fp(p)}</span></button>)}</div></div>
          <div style={st.ms}><h4 style={st.st2}>Quantidade</h4><div style={st.qr}><button style={st.qb} onClick={()=>setQ(Math.max(1,q-1))}>-</button><span style={st.qv}>{q}</span><button style={st.qb} onClick={()=>setQ(q+1)}>+</button></div></div>
          <div style={st.ma}><span style={st.mt2}>{fp(bp*q)}</span><button style={st.mab} onClick={ha}>Adicionar ao Pedido</button></div>
          <button style={st.cl} onClick={()=>{onClose();onNav('/monte')}}>Personalizar no Monte sua Pizza &rarr;</button>
        </div>
      </div>
    </div>
  )
}

const st={
  pg:{minHeight:'100vh',background:'#0a0a0a',color:'#f5f0e8',padding:'100px 24px 60px',maxWidth:1280,margin:'0 auto',fontFamily:"'Inter','Segoe UI',system-ui,sans-serif"},
  hd:{textAlign:'center',marginBottom:32},ti:{fontSize:'2.5rem',fontWeight:800,margin:'0 0 8px',fontFamily:'Georgia,serif'},ta:{color:'#c8102e'},sub:{color:'#999',fontSize:'1rem',margin:0},
  ctl:{display:'flex',gap:12,marginBottom:20,flexWrap:'wrap',alignItems:'center'},sw:{flex:1,minWidth:200,position:'relative',display:'flex',alignItems:'center'},si:{position:'absolute',left:14,color:'#666',fontSize:18},
  si2:{width:'100%',padding:'12px 36px 12px 42px',background:'#1a1a1a',border:'1px solid #333',borderRadius:8,color:'#f5f0e8',fontSize:'0.95rem',outline:'none',boxSizing:'border-box',fontFamily:'inherit'},
  cb:{position:'absolute',right:10,background:'none',border:'none',color:'#999',fontSize:20,cursor:'pointer'},ss:{padding:'12px 16px',background:'#1a1a1a',border:'1px solid #333',borderRadius:8,color:'#f5f0e8',fontSize:'0.9rem',cursor:'pointer',fontFamily:'inherit'},
  tw:{marginBottom:24,overflowX:'auto',WebkitOverflowScrolling:'touch'},tb:{display:'flex',gap:8,paddingBottom:4,minWidth:'max-content'},
  tt:{padding:'8px 18px',borderRadius:20,border:'1px solid #333',background:'transparent',color:'#999',cursor:'pointer',fontSize:'0.85rem',whiteSpace:'nowrap',transition:'all 0.2s',fontWeight:500,fontFamily:'inherit'},ta2:{background:'#c8102e',color:'#fff',borderColor:'#c8102e'},
  bcta:{marginBottom:28,borderRadius:16,background:'linear-gradient(135deg,#c8102e,#d4a853)',padding:2,cursor:'pointer'},cti:{display:'flex',alignItems:'center',gap:16,padding:'18px 24px',background:'#0a0a0a',borderRadius:14,margin:2},
  ctic:{fontSize:'2.5rem'},ctt:{margin:0,fontSize:'1.2rem',fontWeight:700,color:'#f5f0e8'},cts:{margin:'4px 0 0',color:'#999',fontSize:'0.85rem'},cta2:{fontSize:'1.5rem',color:'#c8102e',fontWeight:700},
  gd:{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:20},emp:{gridColumn:'1/-1',textAlign:'center',padding:'60px 20px',color:'#666'},ei:{fontSize:'3rem',display:'block',marginBottom:12},
  cd:{background:'#1a1a1a',borderRadius:14,overflow:'hidden',cursor:'pointer',transition:'transform 0.25s,box-shadow 0.25s',boxShadow:'0 4px 20px rgba(0,0,0,0.3)',border:'1px solid #222'},
  ci:{height:180,position:'relative',overflow:'hidden'},bd:{position:'absolute',top:12,left:12,padding:'4px 10px',borderRadius:12,fontSize:'0.7rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.05em'},
  cb2:{padding:'16px 18px 18px'},cn:{margin:'0 0 6px',fontSize:'1.1rem',fontWeight:700,color:'#f5f0e8'},
  cd2:{margin:'0 0 14px',color:'#888',fontSize:'0.82rem',lineHeight:1.4,display:'-webkit-box',WebkitLineClamp:2,WebkitBoxOrient:'vertical',overflow:'hidden'},
  cf:{display:'flex',justifyContent:'space-between',alignItems:'center'},cp:{fontSize:'1.15rem',fontWeight:800,color:'#d4a853'},
  ab:{padding:'8px 16px',background:'#c8102e',color:'#fff',border:'none',borderRadius:8,fontWeight:600,cursor:'pointer',fontSize:'0.8rem',fontFamily:'inherit'},
  mb:{position:'fixed',inset:0,background:'rgba(0,0,0,0.8)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1000,padding:16},
  mc:{background:'#1a1a1a',borderRadius:16,maxWidth:560,width:'100%',maxHeight:'90vh',overflow:'auto',position:'relative',border:'1px solid #333'},
  mx:{position:'absolute',top:12,right:12,zIndex:2,background:'rgba(0,0,0,0.6)',border:'none',color:'#fff',width:36,height:36,borderRadius:'50%',fontSize:20,cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'},
  mi:{height:220,borderRadius:'16px 16px 0 0',position:'relative'},mb2:{padding:24},mt:{margin:'0 0 8px',fontSize:'1.6rem',fontWeight:800,fontFamily:'Georgia,serif'},md:{margin:'0 0 20px',color:'#999',fontSize:'0.9rem',lineHeight:1.5},
  ms:{marginBottom:20},st2:{margin:'0 0 10px',fontSize:'0.85rem',color:'#d4a853',textTransform:'uppercase',letterSpacing:'0.05em'},il:{display:'flex',flexWrap:'wrap',gap:8},
  it:{padding:'4px 12px',background:'#222',borderRadius:12,fontSize:'0.78rem',color:'#ccc',border:'1px solid #333'},
  sg:{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:8},sb:{padding:'10px 4px',background:'#222',border:'2px solid #333',borderRadius:8,color:'#ccc',cursor:'pointer',textAlign:'center',fontSize:'0.8rem',display:'flex',flexDirection:'column',gap:2,fontFamily:'inherit'},
  sba:{borderColor:'#c8102e',color:'#fff',background:'rgba(200,16,46,0.1)'},sp:{fontSize:'0.75rem',color:'#d4a853',fontWeight:700},
  qr:{display:'flex',alignItems:'center',gap:16},qb:{width:36,height:36,borderRadius:'50%',border:'1px solid #444',background:'#222',color:'#fff',fontSize:'1.1rem',cursor:'pointer',display:'flex',alignItems:'center',justifyContent:'center'},
  qv:{fontSize:'1.2rem',fontWeight:700,minWidth:30,textAlign:'center'},ma:{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:24,paddingTop:20,borderTop:'1px solid #333'},
  mt2:{fontSize:'1.4rem',fontWeight:800,color:'#d4a853'},mab:{padding:'14px 32px',background:'#c8102e',color:'#fff',border:'none',borderRadius:10,fontWeight:700,fontSize:'0.95rem',cursor:'pointer',fontFamily:'inherit'},
  cl:{display:'block',textAlign:'center',marginTop:16,background:'none',border:'none',color:'#d4a853',cursor:'pointer',fontSize:'0.85rem',textDecoration:'underline',fontFamily:'inherit'},
}
