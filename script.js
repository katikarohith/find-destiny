function playGame() {
  const out = document.getElementById("result");
  let n1 = document.getElementById("name1").value.toLowerCase().replace(/[^a-z]/g,"");
  let n2 = document.getElementById("name2").value.toLowerCase().replace(/[^a-z]/g,"");
  if(!n1 || !n2){ out.innerHTML = "⚠️ Please enter both names."; return; }

  // remove matching letters until none left
  while(true){
    let removed = false;
    for(let i=0;i<n1.length;i++){
      const ch = n1[i];
      const j = n2.indexOf(ch);
      if(j !== -1){
        n1 = n1.slice(0,i) + n1.slice(i+1);
        n2 = n2.slice(0,j) + n2.slice(j+1);
        removed = true;
        break;
      }
    }
    if(!removed) break;
  }

  const count = n1.length + n2.length;
  const meanings = {
    D: "Dream Partners 💭",
    E: "Enemies ⚔️",
    S: "Soulmates ❤️",
    T: "Together Forever 💍",
    I: "Inspiration ✨",
    N: "Nothing Special 😅",
    Y: "Yearning Love 💌"
  };

  // special case: identical names -> show D
  if(count === 0){
    out.innerHTML = "Result: <b>" + meanings.D + "</b>";
    return;
  }

  let word = ["D","E","S","T","I","N","Y"];
  let idx = 0;
  while(word.length > 1){
    idx = (idx + count - 1) % word.length;
    word.splice(idx,1);
  }

  out.innerHTML = "Result: <b>" + meanings[word[0]] + "</b>";
}
