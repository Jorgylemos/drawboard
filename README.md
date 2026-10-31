# 🎨 Drawboard Minimal

Um aplicativo de desktop minimalista, leve e *Always-On-Top* construído com **Electron** e **Tailwind CSS**. Desenhado especificamente para rascunhar equações, fazer anotações rápidas e desenhar por cima de qualquer janela do sistema sem precisar de `Alt + Tab`.

> ⚠️ **Atenção:** Este projeto foi inteiramente *vibe coded*; não passou por uma revisão manual profunda de código. Use com sabedoria!

---

## 🚀 Funcionalidades Principais

- **Always-On-Top & Transparência:** Fica fixado no topo de todas as janelas com um design moderno em *Glassmorphism*.
- **Temas Claro e Escuro:** Alterne entre os modos com um clique. O aplicativo conta com **inversão inteligente de tinta**, adaptando os traços automaticamente para garantir contraste perfeito em qualquer fundo.
- **Auto-Save Persistente:** O seu progresso é guardado automaticamente no `localStorage` e restaurado sempre que reabre a aplicação.
- **Estabilização de Traço (Estilo Paint Tool SAI):** Controle deslizante de suavização (`Suav.`) para eliminar tremores e desenhar linhas limpas e precisas.
- **Sensibilidade à Pressão:** Suporte nativo a mesas digitalizadoras (Wacom, Huion, etc.) através de *PointerEvents*.
- **Paleta Dinâmica:** Cores adaptadas para máxima visibilidade tanto no modo claro quanto no escuro.
- **Auto-Update Integrado:** O aplicativo verifica e baixa novas versões automaticamente via GitHub Releases.

---

## 📥 Como Instalar (Para Usuários)

Você não precisa compilar nada para usar o Drawboard Minimal. Baixe o instalador mais recente direto da aba [**Releases**](https://github.com/jorgylemos/drawboard/releases) do GitHub.

### 🐧 Linux

O projeto disponibiliza três formatos para Linux. Escolha o que melhor se adapta à sua distribuição:

#### Opção 1: AppImage (Universal - Recomendado para testes)
Funciona em qualquer distribuição Linux sem precisar instalar.
1. Baixe o arquivo `.AppImage` na aba de Releases.
2. Dê permissão de execução:
   ```bash
   chmod +x "Drawboard Minimal-1.0.0.AppImage"
   ```
3. Execute o aplicativo:
   ```bash
   ./"Drawboard Minimal-1.0.0.AppImage"
   ```

#### Opção 2: Pacote DEB (Ubuntu, Debian, Linux Mint, Pop!_OS)
1. Baixe o arquivo `.deb` na aba de Releases.
2. Instale via terminal:
   ```bash
   sudo apt install ./drawboard-minimal_1.0.0_amd64.deb
   ```
   *(Nota: o `./` antes do nome do arquivo é obrigatório para que o `apt` instale o arquivo local em vez de procurar na internet).*

#### Opção 3: Pacote RPM (Fedora, RHEL, openSUSE)
1. Baixe o arquivo `.rpm` na aba de Releases.
2. Instale via terminal:
   ```bash
   sudo dnf install drawboard-minimal-1.0.0.x86_64.rpm
   ```
   *(No openSUSE, use `sudo zypper install ./drawboard-minimal-1.0.0.x86_64.rpm`)*

### 🪟 Windows
1. Baixe o arquivo `Setup.exe` mais recente na aba de Releases.
2. Execute o instalador e siga as instruções na tela.
3. *(Nota: O Windows SmartScreen pode exibir um aviso sobre "aplicativo não reconhecido" porque o binário não possui uma assinatura digital paga. Clique em "Mais informações" e depois em "Executar assim mesmo").*

---

## 🛠️ Como Compilar e Desenvolver (Para Desenvolvedores)

Se você quer rodar o projeto localmente, modificar o código ou gerar os seus próprios binários, siga os passos abaixo.

### Pré-requisitos
- **Node.js** (versão 20 ou superior)
- **pnpm** (recomendado) ou **npm**
- Apenas para Linux: Ferramentas de empacotamento (veja detalhes abaixo).

### Passo a Passo (Ambiente de Desenvolvimento)

1. Clone o repositório:
   ```bash
   git clone https://github.com/jorgylemos/drawboard.git
   cd drawboard
   ```
2. Instale as dependências:
   ```bash
   pnpm install
   ```
3. Inicie o app em modo de desenvolvimento *(hot reload não disponível, recarregue a janela manualmente)*:
   ```bash
   pnpm start
   ```

### Gerando os binários (Build Local)

Para gerar os arquivos executáveis na sua máquina, use os scripts configurados no `package.json`. Todos os arquivos finais serão gerados na pasta `/dist`.

1. **Buildar tudo para Linux (AppImage + DEB + RPM):**
   ```bash
   pnpm run build:linux
   ```
   *(Gera os três pacotes de uma vez)*

2. **Buildar para Windows (Gera o instalador .exe):**
   ```bash
   pnpm run build:win
   ```
   *(Nota: Se estiver compilando para Windows a partir do Linux, precisará do `wine` instalado na máquina. Recomenda-se usar o GitHub Actions para builds de Windows).*

3. **Buildar para Linux e Windows ao mesmo tempo:**
   ```bash
   pnpm run build:all
   ```

4. **Gerar pacotes específicos (Avançado):**
   Se quiser gerar apenas um formato específico, você pode chamar o `electron-builder` diretamente:
   ```bash
   # Apenas AppImage
   npx electron-builder --linux AppImage

   # Apenas DEB
   npx electron-builder --linux deb

   # Apenas RPM
   npx electron-builder --linux rpm
   ```

💡 **Dica de Ouro para Linux (Fedora):**
Se você estiver no Fedora e o build do `.rpm` falhar com erro de `libcrypt` ou `fpm`, instale as dependências do sistema e o `fpm` moderno:
```bash
sudo dnf install ruby-devel gcc make rpm-build libffi-devel
sudo gem install --no-document fpm
export USE_SYSTEM_FPM="true"
pnpm run build:linux
```

---

## 🔄 Como lançar uma nova versão (CI/CD)

O projeto está configurado com **GitHub Actions** para compilar automaticamente os binários (Linux e Windows) e criar uma Draft Release quando uma nova tag é enviada. Você não precisa compilar nada no seu computador para lançar uma versão.

Para lançar uma atualização:

1. Incremente a versão no `package.json` e crie a tag com um único comando:
   ```bash
   pnpm version patch
   ```
2. Envie os commits e a tag para o GitHub:
   ```bash
   git push --follow-tags
   ```
3. O GitHub Actions irá rodar, compilar os arquivos nativamente e criar a Release em rascunho no GitHub. Vá na aba **Releases**, revise e clique em **"Publish release"**. O auto-update dos usuários será disparado automaticamente.

---

## 📁 Estrutura do Projeto

```text
drawboard/
├── .github/workflows/  # Configuração do CI/CD (GitHub Actions)
│   └── release.yml
├── build/              # Ícones do app (icon.png, icon.ico)
├── dist/               # Arquivos compilados (ignorado no git)
├── index.html          # Interface do usuário (UI) e lógica do Canvas (Vanilla JS)
├── main.js             # Processo principal do Electron e configuração do AutoUpdater
├── preload.js          # Ponte segura (ContextBridge) entre o main e o renderer
├── package.json        # Dependências e configuração do electron-builder
└── pnpm-lock.yaml
```

---

## 📄 Licença

Este projeto está licenciado sob a licença **MIT**. Consulte o arquivo [LICENSE](LICENSE) para mais detalhes.
