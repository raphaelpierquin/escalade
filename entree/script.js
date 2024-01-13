window.onload = (event) => {
  const url = new URL(location)
  const qrcode = url.searchParams.get("qc");
  const barcode = url.searchParams.get("bc");
  const textcode = url.searchParams.get("tc");
  if (qrcode != null) {
    var options = {
      text: qrcode,
      quietZone: 40
    };
    new QRCode(document.getElementById("qrcode"), options);
    document.getElementById("text").innerHTML = qrcode;
    document.getElementById("ean").remove()
  } else if (barcode != null) {
    const code = barcode.replaceAll('-','')
    var element = document.getElementById("ean");
    new EAN13(element, code);
    document.getElementById("text").innerHTML = barcode;
  } else if (textcode != null) {
    document.getElementById("text").innerHTML = textcode;
    document.getElementById("ean").remove()
  }
};
