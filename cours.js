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

document.addEventListener("DOMContentLoaded", function() {
  grist.ready();
  grist.onRecord(function(record) {
    document.getElementById('readout').innerHTML = JSON.stringify(record, null, 2);
  });
});
