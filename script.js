/* ==========================================================================
   LEO AR CONDICIONADO — Interações da página
   ========================================================================== */

(function () {
  "use strict";

  /* ---------- Menu mobile (hambúrguer) ---------- */
  const toggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  function fecharMenu() {
    nav.classList.remove("aberto");
    toggle.classList.remove("aberto");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Abrir menu");
  }

  toggle.addEventListener("click", function () {
    const aberto = nav.classList.toggle("aberto");
    toggle.classList.toggle("aberto", aberto);
    toggle.setAttribute("aria-expanded", String(aberto));
    toggle.setAttribute("aria-label", aberto ? "Fechar menu" : "Abrir menu");
  });

  // Fecha o menu ao clicar em qualquer link/botão dentro dele
  nav.addEventListener("click", function (evento) {
    if (evento.target.closest("a")) {
      fecharMenu();
    }
  });

  // Fecha o menu ao clicar fora dele
  document.addEventListener("click", function (evento) {
    if (
      nav.classList.contains("aberto") &&
      !nav.contains(evento.target) &&
      !toggle.contains(evento.target)
    ) {
      fecharMenu();
    }
  });

  /* ---------- Animação de entrada ao rolar (scroll reveal) ---------- */
  const elementosReveal = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const observador = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            entrada.target.classList.add("visivel");
            observador.unobserve(entrada.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elementosReveal.forEach(function (el) {
      observador.observe(el);
    });
  } else {
    // Navegadores antigos: mostra tudo direto
    elementosReveal.forEach(function (el) {
      el.classList.add("visivel");
    });
  }

  /* ---------- Destaca o link do menu conforme a seção visível ---------- */
  const secoes = document.querySelectorAll("section[id]");
  const links = document.querySelectorAll(".nav__link");

  if ("IntersectionObserver" in window && secoes.length && links.length) {
    const observadorSecoes = new IntersectionObserver(
      function (entradas) {
        entradas.forEach(function (entrada) {
          if (entrada.isIntersecting) {
            const id = entrada.target.id;
            links.forEach(function (link) {
              link.classList.toggle(
                "ativo",
                link.getAttribute("href") === "#" + id
              );
            });
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    secoes.forEach(function (secao) {
      observadorSecoes.observe(secao);
    });
  }

  /* ---------- Ano atual no rodapé ---------- */
  const ano = document.getElementById("ano");
  if (ano) {
    ano.textContent = new Date().getFullYear();
  }
})();
