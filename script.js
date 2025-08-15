document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("calc");
  const out = document.getElementById("result");

  btn.addEventListener("click", function () {
    out.textContent = ""; // clear previous

    let n1 = document.getElementById("name1").value.toLowerCase().replace(/[^a-z]/g, "");
    let n2 = document.getElementById("name2").value.toLowerCase().replace(/[^a-z]/g, "");

    if (!n1 || !n2) {
      out.textContent = "Please enter both names.";
      return;
    }

    // remove matching letters reliably
    while (true) {
      let removed = false;
      for (let i = 0; i < n1.length; i++) {
        const ch = n1[i];
        const j = n2.indexOf(ch);
        if (j !== -1) {
          n1 = n1.slice(0, i) + n1.slice(i + 1);
          n2 = n2.slice(0, j) + n2.slice(j + 1);
          removed = true;
          break;
        }
      }
      if (!removed) break;
    }

    const count = n1.length + n2.length;

    const meanings = {
      D: "Dream Partners 💭",
      E: "Enemies ⚔️",
      S: "Soulmates ❤️",
      T: "Together Forever 💍",
      I: "Inspiration ✨",
      N: "Nothing Special 😅",
      Y: "Yearning Love 💌",
    };

    // identical names -> special case
    if (count === 0) {
      out.innerHTML = "Result: <b>" + meanings.D + "</b>";
      return;
    }

    // elimination that continues from removal point
    let word = ["D", "E", "S", "T", "I", "N", "Y"];
    let idx = 0;
    while (word.length > 1) {
      idx = (idx + count - 1) % word.length; // removal index
      word.splice(idx, 1);                     // remove it
      if (idx === word.length) idx = 0;        // if removed last, wrap to 0
      // next round will start counting from current idx (as requested)
    }

    out.innerHTML = "Result: <b>" + meanings[word[0]] + "</b>";
  });
});
