import { ExpandableCards } from "./components/ExpandableCards";

export default function Home() {
  const cards = [
    {
      id: 1,
      content: (
        <div>
          <img
            src="/merofotos/merofora2.jpg"
            alt="Água cristalina em Angra dos Reis"
            style={{ width: "100%", borderRadius: 12, marginBottom: 8 }}
          />
          <h3 style={{ fontSize: "0.95rem", marginBottom: 4 }}>Água cristalina</h3>
          <p style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            Paradas para banho em ilhas de água transparente.
          </p>
        </div>
      ),
    },
    {
      id: 2,
      content: (
        <div>
          <img
            src="/merofotos/barco-mero-1.jpg"
            alt="Barco Mero em navegação"
            style={{ width: "100%", borderRadius: 12, marginBottom: 8 }}
          />
          <h3 style={{ fontSize: "0.95rem", marginBottom: 4 }}>Barco Mero</h3>
          <p style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            Navegação segura com equipe experiente.
          </p>
        </div>
      ),
    },
    {
      id: 3,
      content: (
        <div>
          <img
            src="/merofotos/merovistadrone.png"
            alt="Vista aérea da costa"
            style={{ width: "100%", borderRadius: 12, marginBottom: 8 }}
          />
          <h3 style={{ fontSize: "0.95rem", marginBottom: 4 }}>
            Vista panorâmica
          </h3>
          <p style={{ fontSize: "0.8rem", opacity: 0.85 }}>
            Ângulos panorâmicos da baía de Angra.
          </p>
        </div>
      ),
    },
  ];

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#020617",
        color: "white",
        fontFamily:
          "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* TOPO: barra superior + logo + navegação */}
      <header
        style={{
          borderBottom: "1px solid rgba(15,23,42,0.9)",
          background:
            "linear-gradient(to right, rgba(15,23,42,0.95), rgba(15,23,42,0.85))",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "14px 16px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "16px",
          }}
        >
          {/* logo + nome */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img
              src="/merofotos/logoMeroveto.png"
              alt="Mero Turismo"
              style={{ height: 40, width: "auto" }}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                lineHeight: 1.1,
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  opacity: 0.8,
                }}
              >
                Agência de Turismo
              </span>
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>
                Mero Turismo
              </span>
            </div>
          </div>

          {/* navegação simples */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              gap: "18px",
              fontSize: "0.9rem",
              opacity: 0.9,
            }}
          >
            <a href="#sobre">Sobre</a>
            <a href="#passeio">Passeio</a>
            <a href="#galeria">Galeria</a>
            <a href="#contato">Contato</a>
          </nav>
        </div>
      </header>

      {/* HERO: título grande + subtítulo + CTA */}
      <section
        id="sobre"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(56,189,248,0.35), transparent 55%), radial-gradient(circle at bottom right, rgba(30,64,175,0.5), #020617 65%)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "40px 16px 48px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
            gap: "32px",
          }}
        >
          {/* texto principal */}
          <div>
            <p
              style={{
                fontSize: "0.85rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#38bdf8",
                marginBottom: "10px",
              }}
            >
              Passeio panorâmico em Angra dos Reis
            </p>
            <h1
              style={{
                fontSize: "2.6rem",
                lineHeight: 1.1,
                marginBottom: "12px",
              }}
            >
              Explore as ilhas de Angra
              <br /> com conforto e segurança.
            </h1>
            <p
              style={{
                fontSize: "0.98rem",
                opacity: 0.88,
                maxWidth: "560px",
                marginBottom: "20px",
              }}
            >
              Embarque em um passeio panorâmico com paradas para banho,
              paisagens incríveis e acompanhamento de uma equipe experiente
              para que você só se preocupe em aproveitar o dia.
            </p>

            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
              <a
                href="#passeio"
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "none",
                  fontSize: "0.9rem",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, rgb(56,189,248), rgb(129,140,248))",
                  color: "#0f172a",
                  cursor: "pointer",
                }}
              >
                Ver detalhes do passeio
              </a>
              <a
                href="#contato"
                style={{
                  padding: "10px 18px",
                  borderRadius: "999px",
                  border: "1px solid rgba(148,163,184,0.5)",
                  fontSize: "0.9rem",
                  fontWeight: 500,
                  background: "rgba(15,23,42,0.8)",
                }}
              >
                Falar com a agência
              </a>
            </div>
          </div>

          {/* imagem destaque simples */}
          <div
            style={{
              borderRadius: 20,
              overflow: "hidden",
              border: "1px solid rgba(148,163,184,0.45)",
              backgroundColor: "rgba(15,23,42,0.95)",
            }}
          >
            <img
              src="/merofotos/agua-cristalina.jpg"
              alt="Passeio panorâmico em Angra dos Reis"
              style={{
                width: "100%",
                height: 260,
                objectFit: "cover",
                display: "block",
              }}
            />
          </div>
        </div>
      </section>

      {/* PARTE 2 – Card principal do passeio */}
      <section
        id="passeio"
        style={{
          background: "#020617",
          borderTop: "1px solid rgba(15,23,42,0.9)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "32px 16px 40px",
          }}
        >
          <div
            style={{
              borderRadius: 20,
              border: "1px solid rgba(148,163,184,0.5)",
              background:
                "radial-gradient(circle at top left, rgba(56,189,248,0.25), transparent 55%), rgba(15,23,42,0.98)",
              padding: "20px 20px 18px",
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
              gap: "20px",
            }}
          >
            {/* Título + descrição do passeio */}
            <div>
              <h2
                style={{
                  fontSize: "1.2rem",
                  marginBottom: "6px",
                }}
              >
                Passeio panorâmico em Angra dos Reis
              </h2>
              <p
                style={{
                  fontSize: "0.9rem",
                  opacity: 0.9,
                  maxWidth: "520px",
                }}
              >
                Saída do Rio de Janeiro com transporte rodoviário, embarcação
                autorizada, paradas para banho em ilhas de água cristalina e
                tempo livre para aproveitar as paisagens de Angra dos Reis.
              </p>
            </div>

            {/* Grade de informações rápidas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
                gap: "10px 18px",
                fontSize: "0.85rem",
              }}
            >
              <div>
                <div style={{ opacity: 0.7 }}>Duração</div>
                <div>1 dia inteiro</div>
              </div>
              <div>
                <div style={{ opacity: 0.7 }}>Saída</div>
                <div>Rio de Janeiro – madrugada</div>
              </div>
              <div>
                <div style={{ opacity: 0.7 }}>Tipo de passeio</div>
                <div>Panorâmico, com paradas para banho</div>
              </div>
              <div>
                <div style={{ opacity: 0.7 }}>Locais visitados</div>
                <div>Ilhas e enseadas da baía de Angra</div>
              </div>
            </div>

            {/* Linha inferior: observação + botão principal */}
            <div
              style={{
                gridColumn: "1 / -1",
                marginTop: "10px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "12px",
                flexWrap: "wrap",
                fontSize: "0.82rem",
                opacity: 0.9,
              }}
            >
              <p style={{ maxWidth: "520px" }}>
                Valores, datas e condições podem variar conforme a época do ano
                e a disponibilidade da embarcação. Consulte nossa equipe para
                informações atualizadas.
              </p>

              <a
                href="#contato"
                style={{
                  padding: "9px 18px",
                  borderRadius: "999px",
                  border: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, rgb(56,189,248), rgb(129,140,248))",
                  color: "#0f172a",
                  whiteSpace: "nowrap",
                  cursor: "pointer",
                }}
              >
                Tenho interesse nesse passeio
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* GALERIA – Expandable Cards */}
      <section
        id="galeria"
        style={{ background: "#020617", padding: "40px 16px 48px" }}
      >
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <h2 style={{ fontSize: "1.5rem", marginBottom: 8 }}>
            Galeria de Momentos MERO
          </h2>
          <p
            style={{
              fontSize: "0.9rem",
              opacity: 0.85,
              marginBottom: 20,
              maxWidth: 520,
            }}
          >
            Veja alguns registros dos passeios panorâmicos em Angra dos Reis.
          </p>

          <ExpandableCards cards={cards} />
        </div>
      </section>
       <section
        style={{
          background: "#020617",
          borderTop: "1px solid rgba(15,23,42,0.9)",
        }}
      >
        <div
          style={{
            maxWidth: "1120px",
            margin: "0 auto",
            padding: "32px 16px 40px",
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "20px",
          }}
        >
          {/* Incluído no passeio */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: 8,
              }}
            >
              Incluído no passeio
            </h3>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: 18,
                fontSize: "0.9rem",
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              <li>Embarcação com tripulação experiente.</li>
              <li>Combustível para todo o trajeto.</li>
              <li>Equipamentos de segurança a bordo.</li>
            </ul>
          </div>

          {/* Não incluído */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: 8,
              }}
            >
              Não incluído
            </h3>
            <ul
              style={{
                listStyle: "disc",
                paddingLeft: 18,
                fontSize: "0.9rem",
                opacity: 0.9,
                lineHeight: 1.5,
              }}
            >
              <li>Alimentação.</li>
              <li>Bebidas alcoólicas.</li>
            </ul>
          </div>

          {/* Observação + CTA valores sob consulta */}
          <div>
            <h3
              style={{
                fontSize: "1rem",
                marginBottom: 8,
              }}
            >
              Informações e reservas
            </h3>
            <p
              style={{
                fontSize: "0.9rem",
                opacity: 0.9,
                marginBottom: 12,
              }}
            >
              Valores sob consulta · Fale com a equipe MERO para receber uma
              proposta para o seu grupo.
            </p>
            <a
              href="https://wa.me/552493256372?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Passeio%20Panor%C3%A2mico%20pela%20Costa."
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-block",
                padding: "9px 18px",
                borderRadius: 999,
                fontSize: "0.85rem",
                fontWeight: 600,
                background:
                  "linear-gradient(135deg, rgb(56,189,248), rgb(129,140,248))",
                color: "#0f172a",
                textDecoration: "none",
                whiteSpace: "nowrap",
              }}
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
                    {/* SOBRE A AGÊNCIA DE TURISMO MERO */}
      <section
        id="sobre-agencia"
        style={{
          background: "#020617",
          borderTop: "1px solid rgba(15,23,42,0.9)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "40px 16px 40px",
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) minmax(0, 1fr)",
            gap: 24,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "1.4rem",
                marginBottom: 12,
              }}
            >
              Sobre a Agência de Turismo MERO
            </h2>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.9,
                marginBottom: 14,
                lineHeight: 1.6,
              }}
            >
              A Agência de Turismo MERO oferece passeios panorâmicos pela costa
              de Angra dos Reis, com foco em segurança, conforto e uma
              experiência inesquecível para grupos.
            </p>
            <p
              style={{
                fontSize: "0.95rem",
                opacity: 0.9,
                lineHeight: 1.6,
              }}
            >
              Nossa equipe atua com embarcações autorizadas e tripulação
              experiente, garantindo que cada saída aconteça dentro das normas
              e com todo o suporte necessário a bordo.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gap: 12,
              fontSize: "0.9rem",
              opacity: 0.95,
            }}
          >
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>
                Segurança em primeiro lugar
              </h3>
              <p>
                Embarcações equipadas com coletes, itens de segurança e
                documentação em dia para navegação.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>
                Tripulação experiente
              </h3>
              <p>
                Profissionais que conhecem bem a região e auxiliam o grupo
                durante todo o passeio.
              </p>
            </div>
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: 4 }}>
                Experiência personalizada
              </h3>
              <p>
                Roteiros ajustados conforme as condições de mar e o perfil do
                grupo, sempre priorizando a segurança.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTATO */}
      <section
        id="contato"
        style={{
          background: "#020617",
          borderTop: "1px solid rgba(15,23,42,0.9)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "40px 16px 40px",
          }}
        >
          <h2
            style={{
              fontSize: "1.4rem",
              marginBottom: 10,
            }}
          >
            Entre em contato com a MERO
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              opacity: 0.9,
              marginBottom: 18,
              maxWidth: 640,
            }}
          >
            Fale com a nossa equipe para tirar dúvidas, verificar datas
            disponíveis e solicitar uma proposta para o seu grupo.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1.1fr) minmax(0, 1fr)",
              gap: 24,
              fontSize: "0.9rem",
              opacity: 0.95,
            }}
          >
            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: 6 }}>
                Canais de atendimento
              </h3>
              <p style={{ marginBottom: 6 }}>
                Instagram:&nbsp;
                <a
                  href="https://www.instagram.com/mero_turismo/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#38bdf8", textDecoration: "none" }}
                >
                  @mero_turismo
                </a>
              </p>
              <p style={{ marginBottom: 6 }}>
                Horário de atendimento: 09h às 18h (horário de Brasília), em
                dias úteis.
              </p>
            </div>

            <div>
              <h3 style={{ fontSize: "1rem", marginBottom: 6 }}>
                Reserve seu passeio
              </h3>
              <p style={{ marginBottom: 10 }}>
                Envie uma mensagem no WhatsApp informando o tamanho do grupo e a
                data desejada para receber um retorno da equipe MERO.
              </p>
              <a
                href="https://wa.me/552493256372?text=Ol%C3%A1,%20gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20o%20Passeio%20Panor%C3%A2mico%20pela%20Costa."
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-block",
                  padding: "9px 18px",
                  borderRadius: 999,
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  background:
                    "linear-gradient(135deg, rgb(56,189,248), rgb(129,140,248))",
                  color: "#0f172a",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Falar com a equipe MERO
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer
        style={{
          background: "#020617",
          borderTop: "1px solid rgba(15,23,42,0.9)",
        }}
      >
        <div
          style={{
            maxWidth: 1120,
            margin: "0 auto",
            padding: "16px",
            fontSize: "0.8rem",
            opacity: 0.7,
            textAlign: "center",
          }}
        >
          © 2026 Agência de Turismo MERO. Todos os direitos reservados.
        </div>
      </footer>

    </main>
  );
}
