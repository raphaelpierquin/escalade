window.onload = (event) => {
  const code = new URL(location).searchParams.get("c");
  var options = {
    text: code,
    quietZone: 40
  };
  new QRCode(document.getElementById("qrcode"), options);
  document.getElementById("code").innerHTML = code;
};
