const { select, input, checkbox } = require("@inquirer/prompts");

let meta = {
  value: "Tomar Água",
  checked: false,
};

let metas = [meta];

const cadastrarMeta = async () => {
  const meta = await input({ message: "Digite a meta: " });

  if (meta.length == 0) {
    console.log("A meta não pode ser vazia");
    return;
  }

  metas.push({ value: meta, checked: false });
};

const listarMetas = async () => {
  const respostas = await checkbox({
    message:
      "Use as setas para mudar a meta, o espaço para marcar e o Enter para finalizar",
    choices: [...metas],
    instructions: false,
  });

  metas.forEach((m) => {
    m.checked = false;
  });

  if (respostas.length == 0) {
    console.log("Nenhuma meta selecionada");
    return;
  }

  respostas.forEach((resposta) => {
    const meta = metas.find((m) => {
      return m.value == resposta;
    });

    meta.checked = true;
  });

  console.log("Metas marcadas como concluidas");
};

const metasRealizadas = async () => {
  const realizadas = metas.filter((meta) => {
    return meta.checked;
  });

  if (realizadas.length == 0) {
    console.log("Nâo existem metas realizadas :(");
    return;
  }

  await select({
    message: "Metas Realizadas: " + realizadas.length,
    choices: [...realizadas],
  });
};

const metasAbertas = async () => {
  const abertas = metas.filter((meta) => {
    return meta.checked != true;
  });

  if (abertas.length == 0) {
    console.log("Não existem metas abertas :)");
    return;
  }

  await select({
    message: "Metas Abertas: " + abertas.length,
    choices: [...abertas],
  });
};

const deletarMetas = async () => {
  const metasDesmarcadas = metas.map((meta) => {
    return { value: meta.value, checked: false };
  });
  const itemsADeletar = await checkbox({
    message: "Selecione um item para deletar",
    choices: [...metasDesmarcadas],
    instructions: false,
  });

  if (itemsADeletar.length == 0) {
    console.log("Nenhum item para Deletar");
    return;
  }

  itemsADeletar.forEach((item) => {
    metas = metas.filter((meta) => {
      return meta.value != item;
    });
  });

  console.log("Metas Deletadas com sucesso");
};

const start = async () => {
  while (true) {
    const option = await select({
      message: "Menu >",
      choices: [
        {
          name: "Cadastrar Meta",
          value: "Cadastrar",
        },
        {
          name: "Listar Metas",
          value: "Listar",
        },
        {
          name: "Metas Realizadas",
          value: "Realizadas",
        },
        {
          name: "Metas Abertas",
          value: "Abertas",
        },
        {
          name: "Deletar Metas",
          value: "Deletar",
        },
        {
          name: "Sair",
          value: "Sair",
        },
      ],
    });
    switch (option) {
      case "Cadastrar":
        await cadastrarMeta();
        console.log(metas);
        break;
      case "Listar":
        await listarMetas();
        break;
      case "Realizadas":
        await metasRealizadas();
        break;
      case "Abertas":
        await metasAbertas();
        break;
      case "Deletar":
        await deletarMetas();
        break;
      case "Sair":
        console.log("Até a próxima");
        return;
    }
  }
};

start();
