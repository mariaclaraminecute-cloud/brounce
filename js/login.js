
    document.getElementById("formLogin").addEventListener("submit", function(e) {

      e.preventDefault(); 

      const email = document.getElementById("email").value;
      const senha = document.getElementById("senha").value;

      const dados = {
        email: email,
        senha: senha
      };

      console.log("POST Login:", dados);

      fetch("https://jsonplaceholder.typicode.com/posts", {

        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify(dados)

      })

      .then(res => {

        console.log("Status:", res.status);

        return res.json();

      })

      .then(data => {

        console.log("Resposta:", data);

        alert("Login enviado com sucesso!");

   
        window.location.href = "index.html";

      })

      .catch(err => {

        console.error(err);

        alert("Erro no login!");

      });

    });
