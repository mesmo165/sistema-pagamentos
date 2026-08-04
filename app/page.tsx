"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

type Pagamento = {
  id: string
  nome: string;
  cpf: string;
  telefone: string;
  valor: number;
  data: string;
  status: string;
  ativo: boolean;
};

export default function Home() {
  const [nome, setNome] = useState("");
  const [valor, setValor] = useState("");
  const [codigoPix, setCodigoPix] = useState("");
  const [nomePagador, setNomePagador] = useState("");
const [cpfPagador, setCpfPagador] = useState("");
const [telefonePagador, setTelefonePagador] = useState("");
  const [nomeEmpresa, setNomeEmpresa] = useState("Minha Empresa");
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [logado, setLogado] = useState(false);
const [usuario, setUsuario] = useState("");
const [senha, setSenha] = useState("");
const [mostrarConfiguracoes, setMostrarConfiguracoes] = useState(false);
const [logoEmpresa, setLogoEmpresa] = useState("");
const [qrCodeEmpresa, setQrCodeEmpresa] = useState("");
const [faviconEmpresa, setFaviconEmpresa] = useState("");
const [codigoPixEmpresa, setCodigoPixEmpresa] = useState("");
const [mensagemCliente, setMensagemCliente] = useState(
  "Após a confirmação do pagamento, seu pedido será registrado automaticamente em nosso sistema em seu nome. Nossa equipe iniciará o processamento assim que o pagamento for identificado."
);
useEffect(() => {
  async function carregarConfiguracoes() {
  const { data, error } = await supabase
    .from("configuracoes")
    .select("*")
    .eq("id", 1)
    .single();

  if (!error && data) {
    setNomeEmpresa(data.nome_empresa || "");
    setMensagemCliente(data.mensagem_cliente || "");
    setLogoEmpresa(data.logo || "");
    setFaviconEmpresa(data.favicon || "");
    setQrCodeEmpresa(data.qr_pix || "");
    setCodigoPixEmpresa(data.pix_copia_cola || "");
  }
}

carregarConfiguracoes();
  const dados = localStorage.getItem("pagamentos");

  if (dados) {
    const lista = JSON.parse(dados).map((p: any) => ({
        ...p,
        ativo: p.ativo !== false
    }));

    setPagamentos(lista);
}
/*
  const nomeSalvo = localStorage.getItem("nomeEmpresa");
  if (nomeSalvo) {
    setNomeEmpresa(nomeSalvo);
  }

  const pixSalvo = localStorage.getItem("codigoPix");
  if (pixSalvo) {
    setCodigoPixEmpresa(pixSalvo);
  }
  const mensagemSalva = localStorage.getItem("mensagemCliente");

if (mensagemSalva) {
  setMensagemCliente(mensagemSalva);
}
  const logoSalva = localStorage.getItem("logoEmpresa");
if (logoSalva) {
  setLogoEmpresa(logoSalva);
}
const faviconSalvo = localStorage.getItem("faviconEmpresa");

if (faviconSalvo) {
  setFaviconEmpresa(faviconSalvo);

  let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

  if (!link) {
    link = document.createElement("link");
    link.rel = "icon";
    document.head.appendChild(link);
  }

  link.href = faviconSalvo;
}
const qrSalvo = localStorage.getItem("qrCodeEmpresa");
if (qrSalvo) {
  setQrCodeEmpresa(qrSalvo);
}
*/  

}, []);

useEffect(() => {
  localStorage.setItem("pagamentos", JSON.stringify(pagamentos));
}, [pagamentos]);
if (!logado) {1
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f3f4f6",
      }}
    >
      <div
        style={{
          width: 350,
          background: "#fff",
          padding: 30,
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
        }}
      >
        <h2>Painel Administrativo</h2>

        <input
  placeholder="Usuário"
  value={usuario}
  onChange={(e) => setUsuario(e.target.value)}
  style={{
    width: "100%",
    padding: 10,
    marginBottom: 10,
    color: "#000",
    background: "#fff",
    WebkitTextFillColor: "#000",
  }}
/>

        <input
  type="password"
  placeholder="Senha"
  value={senha}
  onChange={(e) => setSenha(e.target.value)}
  style={{
    width: "100%",
    padding: 10,
    marginBottom: 15,
    color: "#000",
    background: "#fff",
    WebkitTextFillColor: "#000",
  }}
/>
        <button
          onClick={() => {
            if (usuario === "admin" && senha === "123456") {
              setLogado(true);
            } else {
              alert("Usuário ou senha inválidos");
            }
          }}
          style={{
            width: "100%",
            padding: 12,
            background: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: 8,
          }}
        >
          Entrar
        </button>
      </div>
    </main>
  );
}

  async function registrarPagamento() {
    if (!nome || !valor) return;
const id = Date.now().toString();
console.log("Valor digitado:", valor);
console.log("Valor convertido:", Number(valor.replace(/\./g, "").replace(",", ".")));
const pagamento = {
  id,
  nome,
  cpf: cpfPagador,
  telefone: telefonePagador,
  valor: Number(valor.replace(/\./g, "").replace(",", ".")),
  data: new Date().toLocaleString("pt-BR"),
  status: "Aguardando",
  ativo: true,
  
  logo: logoEmpresa,
  nome_empresa: nomeEmpresa,
  codigo_pix: codigoPixEmpresa,
  mensagem: mensagemCliente,
};
console.log("logoEmpresa:", logoEmpresa);
console.log("nomeEmpresa:", nomeEmpresa);
console.log("codigoPixEmpresa:", codigoPixEmpresa);
console.log("mensagemCliente:", mensagemCliente);
alert(
  "nome_empresa: " + nomeEmpresa +
  "\ncodigo_pix: " + codigoPixEmpresa +
  "\nmensagem: " + mensagemCliente +
  "\nlogo existe: " + (logoEmpresa ? "SIM" : "NÃO")
);
const { error } = await supabase
  .from("pagamentos")
  .insert([pagamento]);

if (error) {
    console.log(error);
    alert(
        "Código: " + error.code +
        "\nMensagem: " + error.message +
        "\nDetalhes: " + error.details
    );
    return;
}
    setPagamentos([
  ...pagamentos,
  pagamento
]);

    localStorage.setItem("pagamento_" + id, JSON.stringify(pagamento));


    setNome("");
    setValor("");

    window.location.href = "/cliente?id=" + id;
  }

  function excluirPagamento(index: number) {
    setPagamentos(
      pagamentos.filter((_, i) => i !== index)
    );
  }

async function alterarAtivo(index: number, ativo: boolean) {
  const lista = [...pagamentos];

  lista[index].ativo = ativo;
  console.log("ID:", lista[index].id);
  const { data, error, count } = await supabase
  .from("pagamentos")
  .update({ ativo: ativo })
  .eq("id", lista[index].id)
  .select();

  console.log("ID:", lista[index].id);
console.log("NOVO ATIVO:", ativo);
console.log("DATA:", data);
console.log("ERROR:", error);
console.log("COUNT:", count);


if (error) {
  alert(error.message);
}

  setPagamentos(lista);

  localStorage.setItem("pagamentos", JSON.stringify(lista));

  localStorage.setItem(
    "pagamento_" + lista[index].id,
    JSON.stringify(lista[index])
  );
}
function alterarStatus(index: number, status: string) {
  const lista = [...pagamentos];

  lista[index].status = status;

  setPagamentos(lista);

  localStorage.setItem("pagamentos", JSON.stringify(lista));
  localStorage.setItem(
  "pagamento_" + lista[index].id,
  JSON.stringify(lista[index])
);
}

  const totalRecebido = pagamentos.reduce(
    (total, pagamento) => total + pagamento.valor,
    0
  );
  const totalClientes = pagamentos.length;

const mediaRecebida =
  pagamentos.length > 0
    ? totalRecebido / pagamentos.length
    : 0;
async function salvarConfiguracoes() {
  const resposta = await supabase
  .from("configuracoes")
  .update({
    nome_empresa: nomeEmpresa,
    mensagem_cliente: mensagemCliente,
    logo: logoEmpresa,
    qr_pix: qrCodeEmpresa,
    pix_copia_cola: codigoPixEmpresa,
  })
  .select();

console.log(resposta);
console.log("NOME:", nomeEmpresa);
if (resposta.error) {
  alert("Erro ao salvar: " + resposta.error.message);
  return;
}

  alert("Configurações salvas com sucesso!");
}
function copiarCodigoPix() {
  navigator.clipboard.writeText(codigoPixEmpresa);
  alert("Código PIX copiado com sucesso!");
}
  return (
    <>
{mostrarConfiguracoes && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
  background: "#fff",
  padding: 30,
  borderRadius: 12,
  width: 420,
  maxHeight: "90vh",
  overflowY: "auto",
  overflowX: "auto",
}}
    >
      <h2>Configurações</h2>

      <p>Nome da empresa</p>
<input
  type="text"
  value={nomeEmpresa}
  onChange={(e) => setNomeEmpresa(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    boxSizing: "border-box",
  }}
/>

<p>Mensagem para o cliente</p>

<textarea
  value={mensagemCliente}
  onChange={(e) => setMensagemCliente(e.target.value)}
  rows={4}
  style={{
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 15,
    marginBottom: 15,
    boxSizing: "border-box",
  }}
/>
<p>Logo da empresa</p>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      setLogoEmpresa(leitor.result as string);
    };

    leitor.readAsDataURL(arquivo);
  }}
  style={{
    width: "100%",
    marginBottom: 15,
  }}
/>
{logoEmpresa && (
  <img
    src={logoEmpresa}
    alt="Logo"
    style={{
      width: 120,
      height: 120,
      objectFit: "contain",
      marginTop: 10,
      marginBottom: 15,
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 8,
    }}
  />
)}

<div style={{ marginTop: 15 }}>
  <label><b>Favicon da Aba</b></label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const arquivo = e.target.files?.[0];
      if (!arquivo) return;

      const reader = new FileReader();

      reader.onload = () => {
        const imagem = reader.result as string;
        setFaviconEmpresa(imagem);
        localStorage.setItem("faviconEmpresa", imagem);
        let link = document.querySelector("link[rel='icon']") as HTMLLinkElement;

if (!link) {
  link = document.createElement("link");
  link.rel = "icon";
  document.head.appendChild(link);
}

link.href = imagem;
      };

      reader.readAsDataURL(arquivo);
    }}
  />
</div>

{faviconEmpresa && (
  <img
    src={faviconEmpresa}
    alt="Favicon"
    style={{
      width: 64,
      height: 64,
      objectFit: "contain",
      marginTop: 10,
      marginBottom: 20,
      border: "1px solid #ddd",
      borderRadius: 8,
      padding: 4,
    }}
  />
)}
<p>QR Code PIX</p>
<input
  type="file"
  accept="image/*"
  onChange={(e) => {
    const arquivo = e.target.files?.[0];
    if (!arquivo) return;

    const leitor = new FileReader();

    leitor.onload = () => {
      setQrCodeEmpresa(leitor.result as string);
    };

    leitor.readAsDataURL(arquivo);
  }}
  style={{
    width: "100%",
    marginBottom: 15,
  }}
/>
{qrCodeEmpresa && (
  <img
    src={qrCodeEmpresa}
    alt="QR Code"
    style={{
      width: 180,
      marginBottom: 15,
    }}
  />
)}

<p>Código PIX Copia e Cola</p>
<textarea
  rows={4}
  value={codigoPixEmpresa}
  onChange={(e) => setCodigoPixEmpresa(e.target.value)}
  placeholder="Cole aqui o código PIX"
  style={{
    width: "100%",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: 8,
    fontSize: 15,
    resize: "none",
    boxSizing: "border-box",
  }}
></textarea>

<br />
<br />

<button
onClick={salvarConfiguracoes}
  style={{
    background: "#16a34a",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    marginTop: 20,
  }}
>
  💾 Salvar Alterações
</button>

<button
  onClick={() => setMostrarConfiguracoes(false)}
  style={{
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "12px 22px",
    borderRadius: 8,
    cursor: "pointer",
    fontWeight: "bold",
    marginLeft: 10,
  }}
>
  ✖ Fechar
</button>
    </div>
  </div>
)}
<main
  style={{
    minHeight: "100vh",
    background: "#f3f4f6",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  }}
>
  <button
  onClick={() => setMostrarConfiguracoes(true)}
  style={{
    padding: "10px 18px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginBottom: 20,
  }}
>
  ⚙️ Configurações
</button>
<div
  style={{
  width: "100%",
  maxWidth: 1000,
  display: "flex",
  flexWrap: "wrap",
  gap: 15,
  marginBottom: 20,
}}
>
  <div
    style={{
      flex: 1,
      background: "#2563eb",
      color: "#fff",
      padding: 20,
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <h3>💰 Total</h3>
    <h2>R$ {totalRecebido.toFixed(2)}</h2>
  </div>

  <div
    style={{
      flex: 1,
      background: "#16a34a",
      color: "#fff",
      padding: 20,
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <h3>👥 Clientes</h3>
    <h2>{totalClientes}</h2>
  </div>

  <div
    style={{
      flex: 1,
      background: "#f59e0b",
      color: "#fff",
      padding: 20,
      borderRadius: 12,
      textAlign: "center",
    }}
  >
    <h3>📊 Média</h3>
    <h2>R$ {mediaRecebida.toFixed(2)}</h2>
  </div>
  <h3>📈 Estatísticas</h3>

<p>Total de pagamentos: {pagamentos.length}</p>

<p>
  Maior pagamento: R$ {
    pagamentos.length
      ? Math.max(...pagamentos.map(p => p.valor)).toFixed(2)
      : "0.00"
  }
</p>

<p>
  Menor pagamento: R$ {
    pagamentos.length
      ? Math.min(...pagamentos.map(p => p.valor)).toFixed(2)
      : "0.00"
  }
</p>
</div>

  <div
    style={{
      width: 430,
      background: "#ffffff",
      borderRadius: 18,
      padding: 25,
      boxShadow: "0 10px 30px rgba(0,0,0,0.12)",
    }}
  >
    <h1
      style={{
        textAlign: "center",
        color: "#2563eb",
        marginBottom: 20,
      }}
    >
      Sistema de Pagamentos
    </h1>

    <input
      type="text"
      placeholder="Nome do cliente"
      value={nome}
      onChange={(e) => setNome(e.target.value)}
      style={{
        width: "100%",
        padding: 12,
        marginBottom: 10,
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 16,
        boxSizing: "border-box",
      }}
    />

    <input
  type="text"
  placeholder="CPF do pagador"
  value={cpfPagador}
  onChange={(e) => {
  const cpf = e.target.value.replace(/\D/g, "");

  const cpfFormatado = cpf
    .replace(/^(\d{3})(\d)/, "$1.$2")
    .replace(/^(\d{3})\.(\d{3})(\d)/, "$1.$2.$3")
    .replace(/\.(\d{3})(\d)/, ".$1-$2")
    .slice(0, 14);

  setCpfPagador(cpfFormatado);
}}
  style={{
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 16,
  boxSizing: "border-box",
}}
/>

<input
  type="text"
  placeholder="Telefone do pagador"
  value={telefonePagador}
  onChange={(e) => {
  const telefone = e.target.value.replace(/\D/g, "");

  const telefoneFormatado = telefone
    .replace(/^(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .slice(0, 15);

  setTelefonePagador(telefoneFormatado);
}}
  style={{
  width: "100%",
  padding: 12,
  marginBottom: 10,
  borderRadius: 8,
  border: "1px solid #d1d5db",
  fontSize: 16,
  boxSizing: "border-box",
}}
/>

    <input
      type="text"
      placeholder="Valor"
      value={valor}
      onChange={(e) => {
  const somenteNumeros = e.target.value.replace(/\D/g, "");

  const valorFormatado = (
    Number(somenteNumeros) / 100
  ).toLocaleString("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  setValor(valorFormatado);
}}
      style={{
        width: "100%",
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        border: "1px solid #d1d5db",
        fontSize: 16,
        boxSizing: "border-box",
      }}
    />

    <button
      onClick={registrarPagamento}
      style={{
        width: "100%",
        padding: 14,
        background: "#2563eb",
        color: "#fff",
        border: "none",
        borderRadius: 8,
        fontWeight: "bold",
        fontSize: 16,
        cursor: "pointer",
      }}
    >
      Registrar Pagamento
    </button>

    <h2
      style={{
        marginTop: 20,
        color: "#16a34a",
        fontSize: 22,
      }}
    >
      Total Recebido: R$ {totalRecebido.toFixed(2)}
    </h2>
<div
      style={{
        marginTop: 20,
        padding: 15,
        border: "1px solid #e5e7eb",
        borderRadius: 10,
        background: "#f9fafb",
      }}
    >
      <div
  style={{
    background: "#ecfdf5",
    border: "1px solid #16a34a",
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    color: "#166534",
    fontSize: 14,
    lineHeight: 1.6,
  }}
>
  ✅ {mensagemCliente}
</div>

      <h3 style={{ marginTop: 0, textAlign: "center" }}>
        Pagamento via PIX
      </h3>

      <div
        style={{
          width: 180,
          height: 180,
          margin: "15px auto",
          border: "2px dashed #9ca3af",
          borderRadius: 10,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#fff",
          color: "#6b7280",
          fontWeight: "bold",
        }}
      >
        <img
  src={qrCodeEmpresa}
  alt="QR Code PIX"
  style={{
    width: "170px",
    height: "170px",
    objectFit: "contain",
  }}
/>
      </div>

      <textarea
      value={codigoPixEmpresa}
readOnly
        placeholder="Cole aqui o código PIX Copia e Cola"
        rows={4}
        style={{
          width: "100%",
          padding: 10,
          borderRadius: 8,
          border: "1px solid #d1d5db",
          resize: "none",
          boxSizing: "border-box",
        }}
      />

      <button
  onClick={copiarCodigoPix}
        style={{
          width: "100%",
          marginTop: 10,
          padding: 12,
          background: "#16a34a",
          color: "#fff",
          border: "none",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        📋 Copiar Código PIX
      </button>
    </div>
{pagamentos.map((pagamento, index) => (
      <div
        key={index}
        style={{
          marginTop: 20,
          padding: 15,
          border: "1px solid #e5e7eb",
          borderRadius: 10,
          background: "#ffffff",
        }}
      >
        <h3 style={{ margin: 0 }}>{pagamento.nome}</h3>
        <p>CPF: {pagamento.cpf}</p>

<p>Telefone: {pagamento.telefone}</p>

<p>Status: {pagamento.status}</p>

        <p
          style={{
            color: "#16a34a",
            fontWeight: "bold",
            fontSize: 20,
            marginTop: 8,
            marginBottom: 12,
          }}
        >
         R$ {Number(String(pagamento.valor ?? 0).replace(/\./g, "").replace(",", ".")).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </p>
<p
  style={{
    color: "#666",
    fontSize: 13,
    marginTop: -8,
  }}
>
  {pagamento.data}
</p>

<div style={{ display: "flex", gap: 10, marginBottom: 10 }}>

  <button
    onClick={() => alterarStatus(index, "Pago")}
    style={{
      background: "#22c55e",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Aprovar
  </button>

  <button
    onClick={() => alterarStatus(index, "Recusado")}
    style={{
      background: "#f59e0b",
      color: "#fff",
      border: "none",
      borderRadius: 8,
      padding: "10px 18px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    Rejeitar
  </button>

</div>
<button
  onClick={() => {
    navigator.clipboard.writeText(
      window.location.origin + "/cliente?id=" + pagamento.id
    );
    alert("Link copiado!");
  }}
  style={{
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Copiar Link
</button>

<button
  onClick={() => alterarAtivo(index, !pagamento.ativo)}
  style={{
    background: pagamento.ativo ? "#dc2626" : "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "10px 18px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  {pagamento.ativo ? "Desativar Link" : "Ativar Link"}
</button>

        <button
          onClick={() => excluirPagamento(index)}
          style={{
            background: "#ef4444",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "10px 18px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Excluir
        </button>
      </div>
    ))}

  </div>
</main>
</>
  );
}
