function recordAppels(appels) {
  max = 0;
  if ("content" in document.createElement("template")) {
    const row_template = document.querySelector("template");
    const tbody = document.querySelector("tbody");
    while (tbody.firstChild) {
      tbody.removeChild(tbody.lastChild);
    }

    appels.forEach(function(appel){
      const clone = row_template.content.cloneNode(true);
      let td = clone.querySelectorAll("td");
      td[0].textContent = appel.numero;
      var qui = appel.qui
      if (Array.isArray(qui)) qui.shift();
      td[1].textContent = qui;
      tbody.appendChild(clone);
      max = Math.max(max,appel.numero)
    });
  } else {
    console.log("template not supported by browser");
  }
  return max;
}

function populate() {
  const appels = JSON.parse(this.response).records.map(r=>r.fields);
  const max = recordAppels(appels.reverse());
  setupBouton(max+1);
}

function setupBouton(numero) {
  const bouton = document.querySelector("button")
  bouton.dataset.numero = numero;
  bouton.innerHTML = 'J\'appelle le n° suivant.' ;
  bouton.classList.remove('is-light')
}

function disableBouton() {
  const bouton = document.querySelector("button")
  bouton.classList.add('is-light')
}

function boutonDisabled() {
  const bouton = document.querySelector("button")
  return bouton.classList.contains('is-light')
}

function loadAppels() { 
  const req = new XMLHttpRequest();
  req.addEventListener("load", populate);
  req.open("GET", "https://escaladeasnieres.getgrist.com/api/docs/itvAw5pXaQEq/tables/Appel/records");
  req.send();
}

document.addEventListener("DOMContentLoaded", function() {
  loadAppels();
  var waiting = false;

  bouton.addEventListener("click", (event) => {
    if (boutonDisabled()) return;
    disableBouton();
    const gristDocUrl = "https://escaladeasnieres.getgrist.com/itvAw5pXaQEq/souhaits-inscriptions-2023-2024/p18";
    const gristTableId = "Appel";
    const formData = new FormData();
    formData.append("numero", event.target.dataset.numero);
    gristFormSubmit(gristDocUrl, gristTableId, formData).then(function(p) {
      loadAppels();
    })
  });
});
