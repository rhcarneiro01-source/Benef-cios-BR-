# Benefícios BR

![Benefícios BR](docs/capa.png)

[![Testes e demo web](https://github.com/rhcarneiro01-source/beneficios-br/actions/workflows/pages.yml/badge.svg)](https://github.com/rhcarneiro01-source/beneficios-br/actions/workflows/pages.yml)
![React Native](https://img.shields.io/badge/React%20Native-0.86-1748A5)
![Expo](https://img.shields.io/badge/Expo-SDK%2057-1748A5)
![Licença MIT](https://img.shields.io/badge/licen%C3%A7a-MIT-1748A5)

App mobile (React Native + Expo) que mostra a quais **descontos sociais de luz, água, gás e internet** uma família tem direito no Brasil, **simula a economia** nas contas e explica **como pedir** cada benefício.

| Início | Sua família | Resultado | Benefício | Regras |
|---|---|---|---|---|
| ![Início](docs/prints/1-inicio.png) | ![Família](docs/prints/2-familia.png) | ![Resultado](docs/prints/4-resultado.png) | ![Energia](docs/prints/5-energia.png) | ![Regras](docs/prints/7-regras.png) |

## Por que este projeto

Milhões de famílias têm direito a contas de luz e água mais baratas e a botijão de gás de graça, mas não sabem — ou perdem o benefício por causa de um cadastro desatualizado ou de uma conta no nome de outra pessoa. O Benefícios BR junta as regras de quatro programas num só lugar, em linguagem simples, e mostra quanto dinheiro está em jogo.

## O que o app faz

1. **Questionário em 3 etapas** — tamanho da família e renda, cadastros (CadÚnico, Bolsa Família, BPC, aparelho elétrico vital, titular da conta de luz, estudante da rede pública) e consumo das contas.
2. **Resultado** — economia possível por mês e por ano, conta de hoje × conta com desconto, e um cartão por serviço com status, motivo, avisos e passo a passo.
3. **Simulador** — botões − / + para mudar o consumo de luz, água e gás e ver a economia na hora.
4. **Regras e fontes** — resumo das regras com link para a lei de cada programa.

Nada é enviado para a internet: as respostas ficam só na memória do celular.

## Programas cobertos (regras de out/2026)

| Serviço | Programa | Quem tem direito | Benefício |
|---|---|---|---|
| Luz | Tarifa Social / Luz do Povo (Lei 15.235/2025) | CadÚnico com renda ≤ ½ SM por pessoa; BPC; aparelho vital com renda ≤ 3 SM | Primeiros 80 kWh grátis |
| Luz | Desconto Social (desde 01/01/2026) | CadÚnico com renda entre ½ e 1 SM por pessoa, consumo ≤ 120 kWh | Isenção da CDE (~12% em média) |
| Água | Tarifa Social de Água e Esgoto (Lei 14.898/2024) | Renda ≤ ½ SM por pessoa + CadÚnico ou BPC | 50% nos primeiros 15 m³ |
| Gás | Gás do Povo | CadÚnico, renda ≤ ½ SM, 2+ pessoas (prioridade Bolsa Família) | 4 botijões/ano (2–3 pessoas) ou 6 (4+) |
| Internet | Internet Brasil (Lei 14.351/2022) | Aluno da rede pública, 3º ano EF ao EM, família no CadÚnico, escola participante | Chip com 20 GB/mês |

Salário mínimo considerado: R$ 1.621,00 (meio salário: R$ 810,50).

## Rodar no celular

```bash
npm install
npx expo start
```

Escaneie o QR code com o app **Expo Go** (Android/iOS). Para ver no navegador: `npm run web`.

## Demo web (GitHub Pages)

A cada push na branch `main`, o workflow `.github/workflows/pages.yml` roda os testes, gera a versão web e publica no GitHub Pages. Para ativar uma vez: **Settings → Pages → Source: GitHub Actions**.

O caminho da demo vem de `experiments.baseUrl` no `app.json` (`/beneficios-br`). Se o repositório tiver outro nome, troque esse valor.

## Testes

As regras ficam em `src/regras.js`, separadas das telas. Para testar:

```bash
npm test
```

## Estrutura

```
App.js                  navegação entre telas e estado das respostas
src/regras.js           regras de cada programa e cálculo da economia
src/tema.js             cores (azul) e tipografia
src/componentes/ui.js   botões, campos, seletores, barras
src/telas/              Inicio, Perguntas, Resultado, Sobre
tests/regras.test.mjs   testes das regras (node --test)
```

## Atualizar as regras

Quando mudar o salário mínimo ou algum programa, edite só o objeto `PARAMETROS` no topo de `src/regras.js` e rode `npm test`.

## Próximos passos sugeridos

- Ícone e splash próprios (hoje são os padrões do Expo).
- Publicar na Google Play.
- Salvar as respostas no celular (`@react-native-async-storage/async-storage`).
- Tarifas reais por distribuidora/município.
- Publicar com EAS Build (`npx eas-cli@latest build`).

> O app faz estimativas. Quem concede os benefícios é o governo, a distribuidora de energia, a empresa de água e a Caixa.

## Autor

**Renan Henrique Carneiro** — logística, dados e IA.
