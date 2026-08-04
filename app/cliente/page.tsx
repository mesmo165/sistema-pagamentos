"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Cliente() {
    const [nomeEmpresa, setNomeEmpresa] = useState("Nome da Empresa");
const [mensagemCliente, setMensagemCliente] = useState("");
const [codigoPix, setCodigoPix] = useState("");
const [logoEmpresa, setLogoEmpresa] = useState("");
const [cliente, setCliente] = useState("");
const [valor, setValor] = useState("");
const [pedido, setPedido] = useState("");
const [status, setStatus] = useState("Aguardando pagamento");
const [linkDesativado, setLinkDesativado] = useState(false);
const [tempoRestante, setTempoRestante] = useState(900);
const [progresso, setProgresso] = useState(100);


useEffect(() => {
    const favicon = localStorage.getItem("faviconEmpresa");

if (favicon) {
  let link = document.querySelector("link[rel='icon']") as HTMLLinkElement | null;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = favicon;
}
    const params = new URLSearchParams(window.location.search);
const id = params.get("id");
  const nome = localStorage.getItem("nomeEmpresa");
  const mensagem = localStorage.getItem("mensagemCliente");
  const pix = localStorage.getItem("codigoPix");
  const logo = localStorage.getItem("logoEmpresa");
(async () => {
  const { data: pagamento, error } = await supabase
    .from("pagamentos")
    .select("*")
    .eq("id", id)
    .single();
    console.log("Pagamento encontrado:", pagamento);
    console.log("Erro:", error);

  if (error || !pagamento) {
    setLinkDesativado(true);
    return;
  }

  if (!pagamento.ativo) {
    setLinkDesativado(true);
    return;
  }

  setCliente(pagamento.nome);

  setValor(
    Number(pagamento.valor).toLocaleString("pt-BR", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  );

  setPedido("#" + pagamento.id.slice(-4));
  setStatus(pagamento.status);
  setLogoEmpresa(pagamento.logo || "");
setNomeEmpresa(pagamento.nome_empresa || "");
setMensagemCliente(pagamento.mensagem || "");
setCodigoPix(pagamento.codigo_pix || "");
})();

}, []);
useEffect(() => {
  const intervalo = setInterval(() => {
    setTempoRestante((tempo) => {
      if (tempo <= 1) {
        clearInterval(intervalo);
        return 0;
      }

      const novoTempo = tempo - 1;
      setProgresso((novoTempo / 900) * 100);

      return novoTempo;
    });
  }, 1000);

  return () => clearInterval(intervalo);
}, []);
if (linkDesativado) {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <h1 style={{ color: "#dc2626", marginBottom: 10 }}>
  ⚠️ Link desativado
</h1>

      <p>Este link de pagamento foi inspirado.</p>
    </main>
  );
}
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f3f4f6",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
      }}
    >
      <div
        style={{
          width: 430,
          background: "#fff",
          borderRadius: 18,
          padding: 30,
          boxShadow: "0 10px 35px rgba(0,0,0,.12)",
        }}
      >
        <div
  style={{
    background: "linear-gradient(90deg,#166534,#22c55e)",
    color: "#fff",
    padding: "28px",
    textAlign: "center",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    margin: "-30px -30px 30px -30px"
  }}
>
  <h1
  style={{
    margin: 0,
    fontSize: 42,
    fontWeight: 800,
    letterSpacing: "2px",
    textTransform: "uppercase",
    textShadow: "0 4px 12px rgba(0,0,0,0.35)",
    fontFamily: "Poppins, Arial, sans-serif",
  }}
>
  {nomeEmpresa}
</h1>

  <p
     style={{
    marginTop: "10px",
    color: "rgba(255,255,255,0.95)",
    fontSize: "17px",
    fontWeight: 500,
    letterSpacing: "1px",
  }}
>
  Plataforma Oficial de Pagamentos
</p>
</div>

        <div style={{ textAlign: "center" }}>
          <h1 style={{ color: "#166534", marginBottom: 5 }}>
            {logoEmpresa && (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      marginBottom: 20,
    }}
  >
    <img
      src={logoEmpresa}
      alt="Logo"
      style={{
        width: 160,
        height: 160,
        objectFit: "contain",
        borderRadius: 12,
      }}
    />
  </div>
)}
            Pagamento via PIX
          </h1>

          <p style={{ color: "#666", marginBottom: 25 }}>
            Finalize seu pagamento com segurança.
          </p>
        </div>
        <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: 12,
    padding: 12,
    marginBottom: 20
  }}
>
  <div>
    <div style={{ fontSize: 13, color: "#666" }}>
      Pedido
    </div>

    <div style={{ fontWeight: "bold", fontSize: 18 }}>
      {pedido}
    </div>
  </div>

  <div style={{ textAlign: "right" }}>
    <div style={{ fontSize: 13, color: "#666" }}>
      Valor
    </div>

    <div
      style={{
        color: "#16a34a",
        fontWeight: "bold",
        fontSize: 24
      }}
    >
      R$ {valor}
    </div>
  </div>
</div>

       

        <hr />

        <div style={{ marginTop: 15 }}>
         <div
  style={{
    background: "#f8fafc",
    border: "1px solid #e5e7eb",
    borderRadius: 14,
    padding: 18,
    marginTop: 20,
    marginBottom: 20,
  }}
>
  <div style={{ marginBottom: 12 }}>
    👤 <b>Cliente</b>
    <br />
    <span style={{ color: "#555", fontSize: 17 }}>
      {cliente}
    </span>
  </div>

  <div style={{ marginBottom: 12 }}>
    📦 <b>Pedido</b>
    <br />
    <span style={{ color: "#555", fontSize: 17 }}>
      {pedido}
    </span>
  </div>

  <div>
    🟡 <b>Status</b>
    <br />
    <span
      style={{
        color: "#d97706",
        fontWeight: "bold",
        fontSize: 17,
      }}
    >
      {status}
    </span>
  </div>
</div>

          <div
  style={{
    background: "#166534",
    color: "#fff",
    borderRadius: 16,
    padding: "20px",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
  }}
>
  <div
    style={{
      fontSize: 14,
      opacity: 0.9,
      marginBottom: 8,
    }}
  >
    VALOR A PAGAR
  </div>

  <div
    style={{
      fontSize: 36,
      fontWeight: "bold",
    }}
  >
    R$ {valor}
  </div>
</div>

          <p>
            <b>Status:</b>{" "}
            <span style={{ color: "#f59e0b" }}>
              Aguardando pagamento
            </span>
          </p>
        </div>

        <div
          style={{
            background: "#ecfdf5",
            border: "1px solid #16a34a",
            borderRadius: 10,
            padding: 15,
            marginTop: 20,
            marginBottom: 20,
            color: "#166534",
          }}
        >


<div
  style={{
    textAlign: "center",
    fontSize: 14,
    color: "#166534",
  }}
>
  {mensagemCliente}
</div>
        </div>

        <div
  style={{
    background: "#ffffff",
    border: "2px solid #e5e7eb",
    borderRadius: 20,
    padding: 25,
    marginTop: 20,
    marginBottom: 25,
    textAlign: "center",
    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
  }}
>
  <div
    style={{
      fontSize: 16,
      fontWeight: "bold",
      color: "#166534",
      marginBottom: 8,
    }}
  >
    📱 Escaneie o QR Code
  </div>

  <div
    style={{
      color: "#6b7280",
      fontSize: 14,
      marginBottom: 20,
    }}
  >
    Utilize o aplicativo do seu banco para efetuar o pagamento.
  </div>
<div
  style={{
    width: "100%",
    height: 12,
    background: "#e5e7eb",
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 15,
  }}
>
  <div
    style={{
      width: `${progresso}%`,
      height: "100%",
      background: "#22c55e",
      transition: "width 1s linear",
    }}
  />
</div>

<p
  style={{
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: tempoRestante > 60 ? "#166534" : "#dc2626",
    marginBottom: 20,
  }}
>
  ⏳ Tempo restante:{" "}
  {String(Math.floor(tempoRestante / 60)).padStart(2, "0")}:
  {String(tempoRestante % 60).padStart(2, "0")}
</p>
  <Image
    src="/pix/qrcode.png"
    alt="QR Code PIX"
    width={240}
    height={240}
    style={{
      margin: "0 auto",
      display: "block",
    }}
  />

  <div
    style={{
      marginTop: 20,
      background: "#ecfdf5",
      color: "#166534",
      padding: 12,
      borderRadius: 10,
      fontSize: 14,
      fontWeight: "bold",
    }}
  >
    🔒 Pagamento protegido e processado com segurança.
  </div>

</div>

<div
  style={{
    background: "#fff7ed",
    border: "1px solid #fdba74",
    borderRadius: 12,
    padding: 14,
    marginBottom: 20,
    textAlign: "center",
  }}
>
  <div
    style={{
      fontWeight: "bold",
      color: "#c2410c",
      fontSize: 15,
    }}
  >
    ⏳ PIX válido por 15 minutos
  </div>

  <div
    style={{
      fontSize: 13,
      color: "#7c2d12",
      marginTop: 5,
    }}
  >
    Após esse período será necessário gerar um novo QR Code.
  </div>
</div>
        <button
  onClick={() => {
    navigator.clipboard.writeText(codigoPix);
    alert("Código PIX copiado!");
  }}
  style={{
            width: "100%",
            background: "#16a34a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "14px",
            fontSize: 16,
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          📋 Copiar Código PIX
        </button>

        <div
          style={{
            marginTop: 20,
            padding: 12,
            background: "#f9fafb",
            borderRadius: 8,
            fontSize: 13,
            wordBreak: "break-all",
          }}
        >
         {codigoPix}
        </div>

        <p
          style={{
            marginTop: 25,
            textAlign: "center",
            color: "#777",
            fontSize: 13,
          }}
        >
          🔒 Ambiente protegido por criptografia.
        </p>
      </div>
    </div>
  );
}
