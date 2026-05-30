# Plano de Implementação — Dízimo, Oferta e Pedido de Oração

## 1. Visão Geral
Adicionar ao site funcionalidades de contribuição financeira (dízimo/oferta) e pedido de oração, integradas ao layout existente sem comprometer a experiência de leitura da Bíblia.

## 2. Dízimo e Oferta — LivePix

### Solução
Utilizar o **LivePix** como plataforma de pagamento, já configurada na conta:

```
https://widget.livepix.gg/embed/fb99d8b8-4ffd-4ca8-bca9-371dbdbcc0ed
```

### Implementação
- **Abordagem**: Iframe embed do LivePix em uma página dedicada `/contribuir`
- **Prévia do valor**: Botões de valor rápido (R$ 10, R$ 20, R$ 50, R$ 100, R$ 200, Outro)
- **PIX como principal**: O LivePix já prioriza PIX, ideal para o público brasileiro
- **Cards de valores**: Design consistente com o tema bíblico (dourado/bordô)

### Páginas
| Rota | Descrição |
|------|-----------|
| `/contribuir` | Página principal com embed do LivePix + texto de contribuição |
| `/contribuir/dizimo` | Âncora na mesma página com foco em dízimo |
| `/contribuir/oferta` | Âncora na mesma página com foco em oferta |

### Versículos de Apoio (exibidos na página)
- Malaquias 3:10 — Dízimo
- 2 Coríntios 9:7 — Oferta voluntária
- Lucas 6:38 — Medida boa

---

## 3. Pedido de Oração

### Fluxo
1. Usuário preenche formulário em `/oracao`
2. Dados enviados para um destino (a definir: e-mail, banco, planilha)
3. Confirmação exibida na tela

### Formulário
| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| Nome | Texto | Sim |
| E-mail | Email | Sim |
| Pedido | Textarea (500 caracteres) | Sim |
| Consentimento | Checkbox (compartilhar com equipe) | Sim |

### Destino dos Dados (a definir)
- Opção A: Envio por e-mail via `mailto:` ou serviço SMTP
- Opção B: Armazenamento em banco de dados (criar tabela `pedidos_oracao`)
- Opção C: Webhook para planilha/CRM
- **Sugestão inicial**: Opção B (tabela no Oracle) + notificação por e-mail

### Versículo de Apoio
- Tiago 5:16 — "Confessai as vossas culpas uns aos outros e orai uns pelos outros"

---

## 4. Navegação

### Header
- Item **Contribuir** no menu principal (entre Busca e os controles de acessibilidade)
- Item **Oração** opcional ou combinado

### Footer
- Links na coluna de navegação ou recursos

### Home
- Card de acesso rápido para contribuir (ícone 🙏)

---

## 5. Design

- Cards com valores em destaque (dourado sobre bordô)
- Fundo de página com padrão sutil (mesma paleta do site)
- Formulário de oração com estilo consistente (bordas douradas no foco)
- Mensagens de confirmação com versículo

---

## 6. Acessibilidade

- Formulário com labels e ARIA
- Valores em botões grandes (≥ 48px)
- Feedback visual de envio
- Modo escuro e alto contraste compatíveis

## 7. Implementação Futura

- [ ] Histórico de contribuições (perfil do doador)
- [ ] Campanhas especiais (Natal, Missões)
- [ ] Assinatura mensal recorrente
- [ ] Mural de oração público (com autorização)
- [ ] Notificação por e-mail quando alguém ora por você
