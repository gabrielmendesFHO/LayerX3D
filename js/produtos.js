// js/produtos.js
// Dados dos produtos
const PRODUTOS = [
    {
        id: 1,
        nome: "Dragão Guardião",
        categoria: "decoracao",
        preco: 49.90,
        descricao: "Uma majesosa figura de dragão em impressão 3D. Perfeito para decorar sua sala, escritório ou coleção particular. Detalhes intrincados e acabamento refinado.",
        imagem: "./assets/products/dragao-guardiao.png",
        disponivel: true
    },
    {
        id: 2,
        nome: "Chaveiro LayerX",
        categoria: "chaveiros",
        preco: 19.90,
        descricao: "Chaveiro personalizado com o logo LayerX 3D. Pequeno, leve e resistente. Ideal para identificar suas chaves com estilo.",
        imagem: "./assets/products/chaveiro-layerx.png",
        disponivel: true
    },
    {
        id: 3,
        nome: "Suporte Gamer",
        categoria: "utilitarios",
        preco: 34.90,
        descricao: "Suporte ergonômico para controle de videogame ou smartphone. Design moderno em 3D com acabamento profissional. Mantenha seus dispositivos seguros.",
        imagem: "./assets/products/suporte-celular.png",
        disponivel: true
    },
    {
        id: 4,
        nome: "Mini Astronauta",
        categoria: "colecionaveis",
        preco: 24.90,
        descricao: "Minúscula figura de astronauta em estilo cartoon. Perfeito para colecionadores e entusiastas de espaço. Grande adição para sua coleção.",
        imagem: "./assets/products/mini-astronauta.png",
        disponivel: true
    },
    {
        id: 5,
        nome: "Vaso Geométrico",
        categoria: "decoracao",
        preco: 54.90,
        descricao: "Vaso com design geométrico moderno em impressão 3D. Perfeito para flores ou plantas suculentas. Traz um toque contemporâneo a qualquer ambiente.",
        imagem: "./assets/products/vaso-geometrico.png",
        disponivel: true
    },
    {
        id: 6,
        nome: "Organizador de Mesa",
        categoria: "organizacao",
        preco: 39.90,
        descricao: "Organizador multifuncional para sua mesa. Múltiplos compartimentos para canetas, clipes e outros objetos pequenos. Mantenha seu espaço organizado e bonito.",
        imagem: "./assets/products/organizador-mesa.png",
        disponivel: true
    },
    {
        id: 7,
        nome: "Porta Fones",
        categoria: "organizacao",
        preco: 29.90,
        descricao: "Suporte elegante para seus fones de ouvido. Mantém seus fones seguros e acessíveis. Design minimalista que se adapta a qualquer ambiente.",
        imagem: "./assets/products/porta-fones.png",
        disponivel: true
    },
    {
        id: 8,
        nome: "Caveira Decorativa",
        categoria: "decoracao",
        preco: 44.90,
        descricao: "Caveira artística em impressão 3D com detalhes esculturais. Perfeita para decorar ambientes com personalidade. Um statement piece único.",
        imagem: "./assets/products/caveira-decorativa.png",
        disponivel: true
    }
];

const WA_PHONE = "5519999999999";
let categoriaAtiva = "todos";

// Inicializa ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    // Renderiza produtos inicialmente
    renderizarProdutos(PRODUTOS);
    
    // Carrega filtro da URL se houver
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('cat');
    if (cat) {
        aplicarFiltro(cat);
    }
    
    // Event listeners para filtros
    const botoesFiltrô = document.querySelectorAll('.btn-filtro');
    botoesFiltrô.forEach(botao => {
        botao.addEventListener('click', (e) => {
            aplicarFiltro(e.target.dataset.categoria);
        });
    });
    
    // Event listeners para modal
    const modal = document.getElementById('produtoModal');
    const closeBtn = document.getElementById('modalClose');
    
    closeBtn.addEventListener('click', fecharModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) fecharModal();
    });
});

// Renderiza os produtos na grid
function renderizarProdutos(produtos) {
    const grid = document.getElementById('produtosGrid');
    
    if (produtos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-secondary);">Nenhum produto encontrado nesta categoria.</p>';
        return;
    }
    
    grid.innerHTML = produtos.map(produto => `
        <div class="card-produto" onclick="abrirModal(${produto.id})">
            <div class="card-produto-image">
                <img src="${produto.imagem}" alt="${produto.nome}" onerror="this.src='./assets/products/dragao-guardiao.png'">
                <button class="btn-fav" onclick="event.stopPropagation(); toggleFav(this)">🤍</button>
            </div>
            <div class="card-info">
                <h3>${produto.nome}</h3>
                <div class="card-categoria">${formatarCategoria(produto.categoria)}</div>
                <p class="descricao-curta">${produto.descricao.substring(0, 60)}...</p>
                <div class="preco">R$ ${produto.preco.toFixed(2).replace('.', ',')}</div>
                <button class="btn-primary" onclick="event.stopPropagation(); abrirModal(${produto.id})">Saiba Mais</button>
            </div>
        </div>
    `).join('');
}

// Aplica filtro por categoria
function aplicarFiltro(categoria) {
    categoriaAtiva = categoria;
    
    // Atualiza botões
    document.querySelectorAll('.btn-filtro').forEach(btn => {
        btn.classList.remove('ativo');
        if (btn.dataset.categoria === categoria) {
            btn.classList.add('ativo');
        }
    });
    
    // Filtra e renderiza
    let produtosFiltrados = PRODUTOS;
    if (categoria !== 'todos') {
        produtosFiltrados = PRODUTOS.filter(p => p.categoria === categoria);
    }
    
    renderizarProdutos(produtosFiltrados);
    
    // Atualiza URL
    if (categoria !== 'todos') {
        window.history.pushState({ categoria }, '', `?cat=${categoria}`);
    } else {
        window.history.pushState({ categoria }, '', '/produtos.html');
    }
}

// Abre o modal com detalhes do produto
function abrirModal(produtoId) {
    const produto = PRODUTOS.find(p => p.id === produtoId);
    if (!produto) return;
    
    document.getElementById('modalProdutoNome').textContent = produto.nome;
    document.getElementById('modalProdutoCategoria').textContent = formatarCategoria(produto.categoria);
    document.getElementById('modalProdutoImagem').src = produto.imagem;
    document.getElementById('modalProdutoImagem').onerror = function() {
        this.src = './assets/products/dragao-guardiao.png';
    };
    document.getElementById('modalProdutoDescricao').textContent = produto.descricao;
    document.getElementById('modalProdutoDisponivel').textContent = produto.disponivel ? 'Sim ✅' : 'Não ❌';
    document.getElementById('modalProdutoPreco').textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`;
    
    // Atualiza botão WhatsApp com produto
    const mensagem = `Olá! Tenho interesse no produto: *${produto.nome}* (R$ ${produto.preco.toFixed(2).replace('.', ',')}) - Gostaria de saber mais e receber um orçamento.`;
    const linkWA = `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(mensagem)}`;
    document.getElementById('modalBtnWhatsapp').href = linkWA;
    
    // Abre modal
    document.getElementById('produtoModal').classList.add('ativo');
    document.body.style.overflow = 'hidden';
}

// Fecha o modal
function fecharModal() {
    document.getElementById('produtoModal').classList.remove('ativo');
    document.body.style.overflow = 'auto';
}

// Toggle favorito
function toggleFav(elemento) {
    elemento.textContent = elemento.textContent === '🤍' ? '❤️' : '🤍';
}

// Formata nome da categoria
function formatarCategoria(categoria) {
    const categorias = {
        'decoracao': 'Decoração',
        'chaveiros': 'Chaveiros',
        'utilitarios': 'Utilitários',
        'organizacao': 'Organização',
        'colecionaveis': 'Colecionáveis'
    };
    return categorias[categoria] || categoria;
}

// Event listener para fechar modal com ESC
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        fecharModal();
    }
});
