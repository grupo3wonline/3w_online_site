export interface CodeTemplate {
  id: string
  name: string
  description: string
  category: 'cards' | 'forms' | 'animations' | 'components' | 'landing'
  html?: string
  css?: string
  js?: string
}

export const templateCategories = [
  { key: 'cards', label: 'Cards' },
  { key: 'forms', label: 'Formulários' },
  { key: 'animations', label: 'Animações' },
  { key: 'components', label: 'Componentes' },
  { key: 'landing', label: 'Landing' },
] as const

export const templates: CodeTemplate[] = [
  {
    id: 'card-profile',
    name: 'Card de Perfil',
    description: 'Card de perfil com avatar e estatísticas.',
    category: 'cards',
    html: `<div class="profile-card">
  <img src="https://placehold.co/150" alt="Avatar" class="profile-avatar">
  <h2 class="profile-name">João Silva</h2>
  <p class="profile-role">Desenvolvedor Web</p>
  <div class="profile-stats">
    <div class="stat"><span class="stat-value">1.2K</span><span class="stat-label">Seguidores</span></div>
    <div class="stat"><span class="stat-value">458</span><span class="stat-label">Seguindo</span></div>
  </div>
  <button class="profile-button">Seguir</button>
</div>`,
    css: `.profile-card{background:#fff;border-radius:12px;padding:30px;text-align:center;box-shadow:0 4px 6px rgba(0,0,0,.1);max-width:300px;margin:20px auto}
.profile-avatar{width:100px;height:100px;border-radius:50%;margin-bottom:15px}
.profile-name{font-size:24px;font-weight:bold;margin:10px 0 5px;color:#333}
.profile-role{color:#666;margin-bottom:20px}
.profile-stats{display:flex;justify-content:space-around;margin:20px 0;padding:15px 0;border-top:1px solid #eee;border-bottom:1px solid #eee}
.stat{display:flex;flex-direction:column}
.stat-value{font-size:20px;font-weight:bold;color:#7c3aed}
.stat-label{font-size:12px;color:#999;margin-top:5px}
.profile-button{background:#7c3aed;color:#fff;border:none;padding:12px 40px;border-radius:25px;cursor:pointer;font-size:16px;margin-top:15px}`,
  },
  {
    id: 'card-pricing',
    name: 'Card de Preço',
    description: 'Card de plano com valores e recursos.',
    category: 'cards',
    html: `<div class="pricing-card">
  <div class="pricing-header">
    <h3>Plano Pro</h3>
    <div class="price"><span class="currency">R$</span><span class="amount">49</span><span class="period">/mês</span></div>
  </div>
  <ul class="pricing-features">
    <li>✓ Projetos ilimitados</li>
    <li>✓ 50GB de armazenamento</li>
    <li>✓ Suporte prioritário</li>
  </ul>
  <button class="pricing-button">Assinar Agora</button>
</div>`,
    css: `.pricing-card{background:linear-gradient(135deg,#7c3aed,#3b82f6);border-radius:16px;padding:40px 30px;color:#fff;max-width:320px;margin:20px auto;box-shadow:0 10px 30px rgba(0,0,0,.2)}
.pricing-header{text-align:center;margin-bottom:30px}
.price{display:flex;align-items:baseline;justify-content:center;gap:5px}
.amount{font-size:56px;font-weight:bold}
.pricing-features{list-style:none;padding:0;margin:30px 0}
.pricing-features li{padding:12px 0;border-bottom:1px solid rgba(255,255,255,.2)}
.pricing-button{width:100%;background:#fff;color:#7c3aed;border:none;padding:15px;border-radius:8px;font-size:16px;font-weight:bold;cursor:pointer}`,
  },
  {
    id: 'form-login',
    name: 'Formulário de Login',
    description: 'Formulário de login moderno.',
    category: 'forms',
    html: `<form class="login-form" id="loginForm" autocomplete="off">
  <h2>Entrar</h2>
  <div class="form-group"><label for="email">E-mail</label><input type="email" id="email" placeholder="seu@email.com" autocomplete="off" required></div>
  <div class="form-group"><label for="password">Senha</label><input type="password" id="password" placeholder="••••••••" autocomplete="off" required></div>
  <button type="submit" class="submit-button">Entrar</button>
</form>`,
    css: `.login-form{background:#fff;padding:40px;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,.1);max-width:400px;margin:40px auto}
.login-form h2{color:#333;margin-bottom:30px;text-align:center}
.form-group{margin-bottom:20px}
.form-group label{display:block;margin-bottom:8px;color:#555;font-weight:500}
.form-group input{width:100%;padding:12px 15px;border:2px solid #e0e0e0;border-radius:8px;font-size:16px;box-sizing:border-box}
.submit-button{width:100%;background:#7c3aed;color:#fff;border:none;padding:14px;border-radius:8px;font-size:16px;font-weight:600;cursor:pointer}`,
    js: `document.getElementById('loginForm').addEventListener('submit',function(e){e.preventDefault();console.log('Login:',document.getElementById('email').value)});`,
  },
  {
    id: 'anim-bounce',
    name: 'Botão Bounce',
    description: 'Botão com animação de bounce ao passar o mouse.',
    category: 'animations',
    html: `<div class="bounce-container"><button class="bounce-button">Clique Aqui</button></div>`,
    css: `@keyframes bounce{0%,20%,50%,80%,100%{transform:translateY(0)}40%{transform:translateY(-30px)}60%{transform:translateY(-15px)}}
.bounce-container{display:flex;justify-content:center;padding:60px}
.bounce-button{background:#7c3aed;color:#fff;border:none;padding:15px 40px;border-radius:50px;font-size:18px;font-weight:bold;cursor:pointer;box-shadow:0 4px 15px rgba(124,58,237,.4)}
.bounce-button:hover{animation:bounce 1s}`,
    js: `document.querySelector('.bounce-button').addEventListener('click',function(){console.log('Botão clicado!')});`,
  },
  {
    id: 'comp-modal',
    name: 'Modal',
    description: 'Modal com overlay e animação.',
    category: 'components',
    html: `<button class="open-modal" id="openModal">Abrir Modal</button>
<div class="modal-overlay" id="modalOverlay">
  <div class="modal">
    <button class="modal-close" id="closeModal">×</button>
    <h2>Título do Modal</h2>
    <p>Conteúdo do modal. Adicione o que quiser aqui.</p>
    <button class="modal-button">Confirmar</button>
  </div>
</div>`,
    css: `.open-modal,.modal-button{background:#7c3aed;color:#fff;border:none;padding:12px 24px;border-radius:6px;font-size:16px;cursor:pointer;margin:20px}
.modal-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:1000;justify-content:center;align-items:center}
.modal-overlay.active{display:flex}
.modal{background:#fff;padding:40px;border-radius:12px;max-width:500px;width:90%;position:relative}
.modal h2{margin-top:0;color:#333}
.modal p{color:#666;line-height:1.6}
.modal-close{position:absolute;top:15px;right:15px;background:none;border:none;font-size:30px;cursor:pointer;color:#999}`,
    js: `const o=document.getElementById('modalOverlay');
document.getElementById('openModal').addEventListener('click',()=>o.classList.add('active'));
document.getElementById('closeModal').addEventListener('click',()=>o.classList.remove('active'));
o.addEventListener('click',e=>{if(e.target===o)o.classList.remove('active')});`,
  },
  {
    id: 'card-stats',
    name: 'Card de Estatística',
    description: 'Card com número e indicador de variação.',
    category: 'cards',
    html: `<div class="stat-card">
  <div class="stat-icon">📈</div>
  <div class="stat-info">
    <span class="stat-label">Vendas do mês</span>
    <span class="stat-number">R$ 45.280</span>
    <span class="stat-trend">▲ 12,5% vs. mês anterior</span>
  </div>
</div>`,
    css: `.stat-card{display:flex;gap:16px;align-items:center;background:#fff;border-radius:16px;padding:24px;max-width:340px;margin:30px auto;box-shadow:0 8px 24px rgba(0,0,0,.08)}
.stat-icon{width:56px;height:56px;display:flex;align-items:center;justify-content:center;font-size:28px;background:#f3e8ff;border-radius:12px}
.stat-info{display:flex;flex-direction:column}
.stat-label{color:#6b7280;font-size:13px}
.stat-number{font-size:28px;font-weight:800;color:#111827}
.stat-trend{color:#16a34a;font-size:13px;font-weight:600;margin-top:2px}`,
  },
  {
    id: 'form-signup',
    name: 'Cadastro (multi-campo)',
    description: 'Formulário de cadastro com validação simples.',
    category: 'forms',
    html: `<form class="signup" id="signup" autocomplete="off">
  <h2>Criar conta</h2>
  <input type="text" id="nome" placeholder="Nome completo" autocomplete="off" required>
  <input type="email" id="mail" placeholder="E-mail" autocomplete="off" required>
  <input type="password" id="pass" placeholder="Senha (mín. 6)" autocomplete="off" minlength="6" required>
  <button type="submit">Cadastrar</button>
  <p class="msg" id="msg"></p>
</form>`,
    css: `.signup{max-width:380px;margin:40px auto;background:#fff;padding:32px;border-radius:16px;box-shadow:0 8px 24px rgba(0,0,0,.1);display:flex;flex-direction:column;gap:14px}
.signup h2{margin:0 0 8px;color:#111827;text-align:center}
.signup input{padding:12px 14px;border:2px solid #e5e7eb;border-radius:10px;font-size:15px}
.signup input:focus{outline:none;border-color:#7c3aed}
.signup button{background:#7c3aed;color:#fff;border:none;padding:13px;border-radius:10px;font-weight:600;cursor:pointer;font-size:15px}
.msg{text-align:center;color:#16a34a;font-size:14px;min-height:18px}`,
    js: `document.getElementById('signup').addEventListener('submit',e=>{
  e.preventDefault();
  document.getElementById('msg').textContent='Conta criada com sucesso!';
  console.log('Cadastro:',document.getElementById('mail').value);
});`,
  },
  {
    id: 'anim-gradient',
    name: 'Gradiente Animado',
    description: 'Fundo com gradiente que se move suavemente.',
    category: 'animations',
    html: `<div class="hero-anim"><h1>Gradiente Animado</h1></div>`,
    css: `@keyframes grad{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
.hero-anim{height:300px;display:flex;align-items:center;justify-content:center;background:linear-gradient(-45deg,#7c3aed,#3b82f6,#ec4899,#8b5cf6);background-size:400% 400%;animation:grad 12s ease infinite;border-radius:16px;margin:20px}
.hero-anim h1{color:#fff;font-family:system-ui,sans-serif;font-size:36px;text-shadow:0 2px 10px rgba(0,0,0,.3)}`,
  },
  {
    id: 'comp-tabs',
    name: 'Abas (Tabs)',
    description: 'Navegação por abas com conteúdo dinâmico.',
    category: 'components',
    html: `<div class="tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="1">Aba 1</button>
    <button class="tab-btn" data-tab="2">Aba 2</button>
    <button class="tab-btn" data-tab="3">Aba 3</button>
  </div>
  <div class="tab-content active" data-tab="1">Conteúdo da primeira aba.</div>
  <div class="tab-content" data-tab="2">Conteúdo da segunda aba.</div>
  <div class="tab-content" data-tab="3">Conteúdo da terceira aba.</div>
</div>`,
    css: `.tabs{max-width:500px;margin:40px auto;font-family:system-ui,sans-serif}
.tab-buttons{display:flex;gap:4px;border-bottom:2px solid #e5e7eb}
.tab-btn{background:none;border:none;padding:12px 20px;cursor:pointer;font-size:15px;color:#6b7280;border-bottom:2px solid transparent;margin-bottom:-2px}
.tab-btn.active{color:#7c3aed;border-bottom-color:#7c3aed;font-weight:600}
.tab-content{display:none;padding:20px 4px;color:#374151;line-height:1.6}
.tab-content.active{display:block}`,
    js: `document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const id=btn.dataset.tab;
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.toggle('active',b===btn));
    document.querySelectorAll('.tab-content').forEach(c=>c.classList.toggle('active',c.dataset.tab===id));
  });
});`,
  },
  {
    id: 'landing-hero',
    name: 'Hero de Landing',
    description: 'Seção principal de uma página de vendas.',
    category: 'landing',
    html: `<section class="lp-hero">
  <span class="lp-badge">🚀 Novo</span>
  <h1>Construa algo <span>incrível</span> hoje</h1>
  <p>A solução completa para lançar seu produto rápido e com estilo.</p>
  <div class="lp-cta">
    <button class="lp-primary">Começar grátis</button>
    <button class="lp-ghost">Saber mais</button>
  </div>
</section>`,
    css: `.lp-hero{text-align:center;padding:80px 24px;font-family:system-ui,sans-serif;background:radial-gradient(ellipse at top,#f3e8ff,#fff)}
.lp-badge{display:inline-block;background:#f3e8ff;color:#7c3aed;padding:6px 14px;border-radius:999px;font-size:13px;font-weight:600;margin-bottom:20px}
.lp-hero h1{font-size:44px;color:#111827;margin:0 0 16px;line-height:1.1}
.lp-hero h1 span{background:linear-gradient(90deg,#7c3aed,#3b82f6);-webkit-background-clip:text;background-clip:text;color:transparent}
.lp-hero p{color:#6b7280;font-size:18px;max-width:520px;margin:0 auto 32px}
.lp-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.lp-primary{background:linear-gradient(90deg,#7c3aed,#3b82f6);color:#fff;border:none;padding:14px 28px;border-radius:10px;font-weight:600;cursor:pointer;font-size:16px}
.lp-ghost{background:#fff;color:#374151;border:2px solid #e5e7eb;padding:14px 28px;border-radius:10px;font-weight:600;cursor:pointer;font-size:16px}`,
  },
]
