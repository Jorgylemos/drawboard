# Drawboard Minimal (Electron)

Um aplicativo de desktop minimalista, leve e *Always-On-Top* construído com **Electron** e **Tailwind CSS**. Desenhado especificamente para rascunhar equações, fazer anotações rápidas e desenhar por cima de qualquer janela do sistema sem precisar de Alt + Tab.

---

## 🚀 Funcionalidades Principais

* **Always-On-Top & Transparência:** Fica fixado no topo de todas as janelas com um design moderno em *Glassmorphism*.
* **Temas Claro e Escuro:** Alterne entre os modos com um clique. O aplicativo conta com **inversão inteligente de tinta**, adaptando os traços automaticamente para garantir contraste perfeito em qualquer fundo.
* **Auto-Save Persistente:** O seu progresso é guardado automaticamente no `localStorage` e restaurado sempre que reabre a aplicação.
* **Estabilização de Traço (Estilo Paint Tool SAI):** Controle deslizante de suavização (`Suav.`) para eliminar tremores e desenhar linhas limpas e precisas.
* **Sensibilidade à Pressão:** Suporte nativo a mesas digitalizadoras (Wacom, Huion, etc.) através de *PointerEvents*.
* **Paleta Dinâmica:** Cores adaptadas para máxima visibilidade tanto no modo claro quanto no escuro.

---

## 📁 Estrutura do Projeto

```text
drawboard-electron/
├── package.json
├── main.js
├── preload.js
└── index.html
