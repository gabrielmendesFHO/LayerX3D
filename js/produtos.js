// js/produtos.js
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRHHe1stIgM3vmW_g-IpJ8TxxrB_1svOT4zQ7uRdoaBiMHLMMBR_hVl-QXUXvN7DMtPqbCavk257aVd/pub?gid=723108535&single=true&output=csv";
const WA_PHONE = "5519988390218";

let produtosGlobais = [];
let filtroAtual = 'todos';

document.addEventListener('DOMContentLoaded', () => {
    inicializarFiltros();
    carregarProdutos();
});

function inicializarFiltros() {
    document.querySelectorAll('.btn-filtro').forEach(botao => {
        botao.addEventListener('click', () => {
            const categoria = botao.dataset.filter || 'todos';
            aplicarFiltro(categoria, true);
        });
    });

    document.querySelectorAll('.cat-card').forEach(cartao => {
        cartao.addEventListener('click', (event) => {
            event.preventDefault();
            const categoria = cartao.dataset.category || 'todos';
            aplicarFiltro(categoria, true);
        });
    });
}

function aplicarFiltro(categoria = 'todos', scrollParaProdutos = false) {
    filtroAtual = categoria;

    document.querySelectorAll('.btn-filtro').forEach(botao => {
        const ativo = (botao.dataset.filter || 'todos') === categoria;
        botao.classList.toggle('ativo', ativo);
    });

    document.querySelectorAll('.cat-card').forEach(cartao => {
        const ativo = (cartao.dataset.category || 'todos') === categoria;
        cartao.classList.toggle('active', ativo);
    });

    const cards = document.querySelectorAll('.card-produto');
    cards.forEach(card => {
        const categoriaCard = (card.dataset.categoria || '').trim();
        const deveExibir = categoria === 'todos' || categoriaCard === categoria;
        card.style.display = deveExibir ? '' : 'none';
    });

    if (scrollParaProdutos) {
        document.getElementById('produtos')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

async function carregarProdutos() {
    const grid = document.querySelector('.produtos-grid');

    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
            throw new Error(`A planilha respondeu com HTTP ${response.status}.`);
        }

        const csvText = await response.text();
        const produtos = csvParaJSON(csvText);
        produtosGlobais = produtos;
        renderizarProdutos(produtos);
        aplicarFiltro(filtroAtual, false);
    } catch (error) {
        console.error("Erro ao carregar a planilha de produtos:", error);
        if (grid) {
            grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Não foi possível carregar os produtos. Verifique se a planilha está publicada na web e abra o site por um servidor local.</p>';
        }
    }
}

function converterLinkDrive(url) {
    if (!url) return '';
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/[?&]id=([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
        return `https://drive.google.com/thumbnail?id=${match[1]}&sz=w1000`;
    }
    return url;
}

function formatarPreco(precoSujo) {
    if (!precoSujo) return "0,00";
    let precoLimpo = precoSujo.replace('R$', '').replace(/\s/g, '').replace(',', '.');
    let precoNumero = parseFloat(precoLimpo);
    return isNaN(precoNumero) ? "0,00" : precoNumero.toFixed(2).replace('.', ',');
}

function csvParaJSON(csv) {
    const linhas = [];
    let aspasAbertas = false;
    let linhaAtual = 0;
    let colunaAtual = 0;
    
    for (let c = 0; c < csv.length; c++) {
        let char = csv[c];
        let proxChar = csv[c+1];
        
        linhas[linhaAtual] = linhas[linhaAtual] || [];
        linhas[linhaAtual][colunaAtual] = linhas[linhaAtual][colunaAtual] || '';
        
        if (char === '"' && aspasAbertas && proxChar === '"') { 
            linhas[linhaAtual][colunaAtual] += char; c++; continue; 
        }
        if (char === '"') { aspasAbertas = !aspasAbertas; continue; }
        if (char === ',' && !aspasAbertas) { colunaAtual++; continue; }
        if (char === '\n' && !aspasAbertas) { linhaAtual++; colunaAtual = 0; continue; }
        if (char === '\r' && !aspasAbertas) { continue; }
        
        linhas[linhaAtual][colunaAtual] += char;
    }
    
    const cabecalhos = linhas[0].map(h => h.trim().toLowerCase());
    const resultado = [];
    
    for (let i = 1; i < linhas.length; i++) {
        if (linhas[i].length === 1 && !linhas[i][0]) continue;
        
        const obj = {};
        cabecalhos.forEach((cabecalho, index) => {
            obj[cabecalho] = linhas[i][index] ? linhas[i][index].trim() : '';
        });
        
        if (obj.nome) {
            resultado.push(obj);
        }
    }
    return resultado;
}

function renderizarProdutos(produtos) {
    const grid = document.querySelector('.produtos-grid');
    if (!grid) return;

    if (produtos.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; color: var(--text-secondary);">Nenhum produto encontrado na planilha.</p>';
        return;
    }

    grid.innerHTML = produtos.map(produto => {
        const precoFormatado = formatarPreco(produto.preco);
        const imagemDireta = converterLinkDrive(produto.link_drive_imagem);
        const msgWa = encodeURIComponent(`Olá, vim pelo site e tenho interesse no produto: *${produto.nome}* (R$ ${precoFormatado}).`);
        
        return `
        <article class="card-produto" data-categoria="${(produto.categoria || '').toLowerCase()}">
            <div class="card-produto-image">
                <img src="${imagemDireta}" alt="${produto.nome}" loading="lazy">
            </div>
            <div class="card-info">
                ${produto.categoria ? `<span class="card-categoria">${produto.categoria}</span>` : ''}
                <h3>${produto.nome}</h3>
                ${produto.descricao ? `<p class="descricao-curta">${produto.descricao}</p>` : ''}
                <span class="preco">R$ ${precoFormatado}</span>
                <a href="https://wa.me/${WA_PHONE}?text=${msgWa}" target="_blank" class="btn-primary" rel="noopener noreferrer">
                    Tenho interesse
                </a>
            </div>
        </article>
        `;
    }).join('');
}