document.addEventListener("DOMContentLoaded", function () {
  const inputText = document.getElementById("inputText");
  const output = document.getElementById("output");
  const convertBtn = document.getElementById("convertBtn");
  const copyBtn = document.getElementById("copyBtn");
  const successMessage = document.getElementById("successMessage");

  // Regular characters to bold Unicode characters mapping
  const boldMap = {
    a: "𝗮",
    b: "𝗯",
    c: "𝗰",
    d: "𝗱",
    e: "𝗲",
    f: "𝗳",
    g: "𝗴",
    h: "𝗵",
    i: "𝗶",
    j: "𝗷",
    k: "𝗸",
    l: "𝗹",
    m: "𝗺",
    n: "𝗻",
    o: "𝗼",
    p: "𝗽",
    q: "𝗾",
    r: "𝗿",
    s: "𝘀",
    t: "𝘁",
    u: "𝘂",
    v: "𝘃",
    w: "𝘄",
    x: "𝘅",
    y: "𝘆",
    z: "𝘇",
    A: "𝗔",
    B: "𝗕",
    C: "𝗖",
    D: "𝗗",
    E: "𝗘",
    F: "𝗙",
    G: "𝗚",
    H: "𝗛",
    I: "𝗜",
    J: "𝗝",
    K: "𝗞",
    L: "𝗟",
    M: "𝗠",
    N: "𝗡",
    O: "𝗢",
    P: "𝗣",
    Q: "𝗤",
    R: "𝗥",
    S: "𝗦",
    T: "𝗧",
    U: "𝗨",
    V: "𝗩",
    W: "𝗪",
    X: "𝗫",
    Y: "𝗬",
    Z: "𝗭",
    0: "𝟬",
    1: "𝟭",
    2: "𝟮",
    3: "𝟯",
    4: "𝟰",
    5: "𝟱",
    6: "𝟲",
    7: "𝟳",
    8: "𝟴",
    9: "𝟵",
  };

  // Convert text to bold - with proper error handling
  function convertToBold(text) {
    if (!text) return "";
    try {
      return text
        .split("")
        .map((char) => boldMap[char] || char)
        .join("");
    } catch (error) {
      console.error("Error converting text to bold:", error);
      return text; // Return original text if conversion fails
    }
  }

  // Event listeners for buttons
  convertBtn.addEventListener("click", function () {
    const text = inputText.value;
    const boldText = convertToBold(text);
    output.textContent = boldText;

    // Visual feedback that conversion happened
    convertBtn.textContent = "Converted!";
    setTimeout(() => {
      convertBtn.textContent = "Convert to Bold";
    }, 1000);
  });

  // Event listener for copy button
  copyBtn.addEventListener("click", function () {
    const boldText = output.textContent;

    // Copy to clipboard
    navigator.clipboard
      .writeText(boldText)
      .then(function () {
        // Show success message
        successMessage.style.opacity = "1";

        // Hide success message after 2 seconds
        setTimeout(function () {
          successMessage.style.opacity = "0";
        }, 2000);
      })
      .catch(function (err) {
        console.error("Could not copy text: ", err);
        alert("Failed to copy text. Please try again.");
      });
  });

  // Also convert on input change with debounce for better performance
  let debounceTimer;
  inputText.addEventListener("input", function () {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(function () {
      const text = inputText.value;
      const boldText = convertToBold(text);
      output.textContent = boldText;
    }, 300); // 300ms debounce
  });

  // Initial conversion on page load if there's text
  if (inputText.value) {
    output.textContent = convertToBold(inputText.value);
  }
});
