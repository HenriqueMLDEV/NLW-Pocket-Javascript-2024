const { select } = require("@inquirer/prompts");

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
          name: "Sair",
          value: "Sair",
        },
      ],
    });
    switch (option) {
      case "Cadastrar":
        console.log("Vamos cadastrar");
        break;
      case "Listar":
        console.log("Vamos Listar");
        break;
      case "Sair":
        console.log("Até a próxima");
        return;
    }
  }
};

start();
