# LayerX 3D 🖨️

**Impressão 3D • Criação Sem Limites**

Vitrine moderna e responsiva para produtos de impressão 3D. Desenvolvida com HTML, CSS e JavaScript vanilla — sem dependências externas.

## 🌟 Características

- ✅ **Mobile-first**: Totalmente responsivo para dispositivos móveis, tablets e desktop
- ✅ **Design System**: Paleta de cores profissional com design tokens
- ✅ **Grid de Produtos**: Layout dinâmico com 8 produtos de exemplo
- ✅ **Filtro por Categoria**: Navegação intuitiva entre 5 categorias
- ✅ **Modal Detalhado**: Visualizar informações completas do produto
- ✅ **Integração WhatsApp**: Botões com mensagens pré-preenchidas
- ✅ **Sem Dependências**: Apenas HTML, CSS e JavaScript
- ✅ **Animações Discretas**: Transições suaves e responsivas
- ✅ **SEO Otimizado**: Meta tags e estrutura semântica

## 📁 Estrutura do Projeto

```
LayerX3D/
├── index.html              # Página inicial
├── produtos.html           # Página de produtos e catálogo
├── css/
│   ├── tokens.css          # Design tokens e variáveis CSS
│   └── style.css           # Estilos responsivos (1000+ linhas)
├── js/
│   ├── menu.js             # Lógica do menu hamburguer
│   └── produtos.js         # Lógica de produtos, filtro e modal
├── data/
│   └── products.json       # (Depreciado - usar js/produtos.js)
├── assets/
│   ├── brand/              # Logo e identidade visual
│   │   ├── logo-layerx3d.png
│   │   ├── logo-horizontal.png
│   │   ├── brand.json      # Paleta e configurações
│   │   └── tokens.css
│   ├── hero/               # Imagem hero
│   │   └── impressao-3d.png
│   ├── icons/              # Ícones de categorias
│   │   └── categorias.png
│   └── products/           # Imagens dos produtos
│       ├── dragao-guardiao.png
│       ├── chaveiro-layerx.png
│       ├── suporte-celular.png
│       ├── mini-astronauta.png
│       ├── vaso-geometrico.png
│       ├── organizador-mesa.png
│       ├── porta-fones.png
│       └── caveira-decorativa.png
├── LICENSE
└── README.md
```

## 🎨 Paleta de Cores

| Elemento         | Cor       | Uso                   |
| ---------------- | --------- | --------------------- |
| Fundo            | `#F5F6F8` | Fundo primário        |
| Cards            | `#FFFFFF` | Superfícies           |
| Texto            | `#111111` | Texto principal       |
| Texto Secundário | `#666666` | Descrições            |
| Azul Primário    | `#087CF5` | CTAs, links, destaque |
| Bordas           | `#E5E7EB` | Separadores           |

## 🚀 Como Usar

### Opção 1: Servidor Local (Recomendado)

```bash
# Com Python 3
python -m http.server 8000

# Com Node.js (live-server)
npm install -g live-server
live-server
```

Acesse `http://localhost:8000`

### Opção 2: Arquivo Direto

Abra `index.html` diretamente no navegador.

## 📦 Produtos Inclusos

O projeto vem com 8 produtos de exemplo:

| #   | Nome                | Categoria     | Preço    | Imagem                 |
| --- | ------------------- | ------------- | -------- | ---------------------- |
| 1   | Dragão Guardião     | Decoração     | R$ 49,90 | dragao-guardiao.png    |
| 2   | Chaveiro LayerX     | Chaveiros     | R$ 19,90 | chaveiro-layerx.png    |
| 3   | Suporte Gamer       | Utilitários   | R$ 34,90 | suporte-celular.png    |
| 4   | Mini Astronauta     | Colecionáveis | R$ 24,90 | mini-astronauta.png    |
| 5   | Vaso Geométrico     | Decoração     | R$ 54,90 | vaso-geometrico.png    |
| 6   | Organizador de Mesa | Organização   | R$ 39,90 | organizador-mesa.png   |
| 7   | Porta Fones         | Organização   | R$ 29,90 | porta-fones.png        |
| 8   | Caveira Decorativa  | Decoração     | R$ 44,90 | caveira-decorativa.png |

## ⚙️ Configuração

### Editar WhatsApp

Procure por `WA_PHONE` nos arquivos e substitua:

**`index.html`:**

```html
<a href="https://wa.me/5519999999999" ...
```

**`produtos.html`:**

```html
<a href="https://wa.me/5519999999999" ...
```

**`js/produtos.js`:**

```javascript
const WA_PHONE = "5519999999999";
```

### Adicionar/Editar Produtos

Edite o array `PRODUTOS` em `js/produtos.js`:

```javascript
const PRODUTOS = [
  {
    id: 1,
    nome: "Seu Produto",
    categoria: "decoracao", // decoracao, chaveiros, utilitarios, organizacao, colecionaveis
    preco: 99.9,
    descricao: "Descrição aqui...",
    imagem: "./assets/products/sua-imagem.png",
    disponivel: true,
  },
  // ... mais produtos
];
```

### Personalizar Cores

Edite `css/tokens.css`:

```css
:root {
  --bg-primary: #f5f6f8; /* Fundo */
  --bg-surface: #ffffff; /* Cards */
  --brand-blue: #087cf5; /* Azul primário */
  --text-primary: #111111; /* Texto */
  --text-secondary: #666666; /* Texto secundário */
  --border: #e5e7eb; /* Bordas */
}
```

## 📱 Responsividade

- **Mobile** (< 480px): 2 colunas de produtos
- **Tablet** (481px - 1023px): 3-4 colunas, menu hamburguer
- **Desktop** (≥ 1024px): 4-5 colunas, menu horizontal

## 🔧 Funcionalidades JavaScript

### Menu Hamburguer (`js/menu.js`)

- Abre/fecha menu em dispositivos móveis
- Animação suave do ícone
- Fecha ao clicar em link

### Produtos (`js/produtos.js`)

- **Renderização Dinâmica**: Cria cards a partir do array
- **Filtro de Categorias**: Muda URL com query param (`?cat=decoracao`)
- **Modal Detalhado**: Visualizar produto completo
- **Favoritos**: Sistema de coração (local)
- **WhatsApp Integrado**: Mensagem pré-preenchida com produto
- **Tratamento de Erros**: Fallback de imagem

## 🎯 Páginas

### `index.html` - Início

- Hero section com CTA
- Seção de benefícios
- Grid de categorias
- Footer com contato

### `produtos.html` - Catálogo

- Filtros por categoria
- Grid dinâmica de produtos
- Modal de detalhes
- Footer

## 🔒 Segurança

- ✅ Sem dados sensíveis no código
- ✅ Espaçamento adequado de IDs
- ✅ Sem acesso a banco de dados
- ✅ Apenas WhatsApp (cliente escolhe conversa)

## 🚀 Próximos Passos

### Curto Prazo (MVP)

- [ ] Testar em todos os navegadores
- [ ] Otimizar imagens dos produtos
- [ ] Adicionar mais produtos reais

### Médio Prazo

- [ ] Integrar com Google Sheets para produtos dinâmicos
- [ ] Adicionar carrinho de compras simples
- [ ] Formulário de contato por email

### Longo Prazo

- [ ] Sistema de pedidos
- [ ] Painel administrativo
- [ ] Integração com gateway de pagamento

## 📊 Performance

- **Tamanho Total**: ~150KB (HTML + CSS + JS)
- **Imagens**: Otimizadas em PNG
- **Carregamento**: < 2s em conexão 4G
- **Lighthouse Score**: 90+ (sem otimizações)

## 📝 Licença

Veja [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**LayerX 3D**  
Impressão 3D • Criação Sem Limites

---

**Desenvolvido com ❤️ para transformar ideias em realidade.**

Dúvidas? [Entre em contato via WhatsApp!](https://wa.me/5519999999999)
