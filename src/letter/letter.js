const fillBtn = document.getElementById("fill-btn");
const copyBtn = document.getElementById("copy-btn");

fillBtn.addEventListener("click", () => {
  const name = document.getElementById("your-name").value || "[NAME]";
  const city = document.getElementById("your-city").value || "[CITY, STATE]";
  let body = document.getElementById("letter-body").value;
  body = body.replace(/\[NAME\]/g, name).replace(/\[CITY\]/g, city);
  document.getElementById("letter-body").value = body;
});

copyBtn.addEventListener("click", async () => {
  const text = document.getElementById("letter-body").value;
  try {
    await navigator.clipboard.writeText(text);
    alert("Letter copied to clipboard");
  } catch (e) {
    alert("Copy failed — select and copy manually.");
  }
});

// guys i don't want to do the work of making the recipient dropdown do anything. if anyone is super invested feel free to do that
