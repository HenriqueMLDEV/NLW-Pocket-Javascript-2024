const start = () => {
  while (true) {
    let opcao = "Sair";
    switch (opcao) {
      case "Cadastrar":
        console.log("Vamos cadastrar");
        break;
      case "Listar":
        console.log("Vamos Listar");
        break;
      case "Sair":
        return;
    }
  }
};

start();