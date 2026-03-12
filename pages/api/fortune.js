const FORTUNES = [
  // Data science wisdom
  { text: "All models are wrong, but some are useful.", author: "George Box" },
  { text: "The goal is to turn data into information, and information into insight.", author: "Carly Fiorina" },
  { text: "Without data you're just another person with an opinion.", author: "W. Edwards Deming" },
  { text: "Data are just summaries of thousands of stories. Tell a few of those stories to help make the data meaningful.", author: "Chip Heath & Dan Heath" },
  { text: "It is a capital mistake to theorise before one has data.", author: "Arthur Conan Doyle" },
  { text: "The best thing about being a statistician is that you get to play in everyone's backyard.", author: "John Tukey" },
  { text: "In God we trust. All others must bring data.", author: "W. Edwards Deming" },
  { text: "The data may not contain the answer. The combination of some data and an aching desire for an answer does not ensure that a reasonable answer can be extracted from a given body of data.", author: "John Tukey" },
  { text: "Torture the data, and it will confess to anything.", author: "Ronald Coase" },
  { text: "Data science is not about data. It's about decisions.", author: "Unknown" },

  // Engineering & craft
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
  { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
  { text: "The most important property of a program is whether it accomplishes the intention of its user.", author: "C.A.R. Hoare" },
  { text: "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.", author: "Martin Fowler" },
  { text: "Code is like humour. When you have to explain it, it's bad.", author: "Cory House" },
  { text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" },

  // Life & growth
  { text: "Compound interest is the eighth wonder of the world.", author: "Albert Einstein (attributed)" },
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
  { text: "You can't connect the dots looking forward; you can only connect them looking backwards.", author: "Steve Jobs" },
  { text: "Be the change you wish to see in the world.", author: "Mahatma Gandhi" },
  { text: "It's not that I'm so smart; it's just that I stay with problems longer.", author: "Albert Einstein" },
  { text: "The more I learn, the more I realise how much I don't know.", author: "Albert Einstein" },
  { text: "Continuous improvement is better than delayed perfection.", author: "Mark Twain" },
  { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },

  // Rin originals
  { text: "Strategic thinking is knowing which questions to ask before you know the answers.", author: "Rin Huang" },
  { text: "The best dataset is a well-framed question.", author: "Rin Huang" },
  { text: "Ship it. Iterate. Improve. Repeat.", author: "Rin Huang" },
];

export default function handler(req, res) {
  const fortune = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];

  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.setHeader("X-Fortune-Count", FORTUNES.length);
  res.setHeader("X-Powered-By", "rin.contact fortune engine");

  res.status(200).json({
    fortune: fortune.text,
    author:  fortune.author,
    generated_at: new Date().toISOString(),
    tip: "GET /api/fortune again for a different one. Or: curl rin.contact/api/fortune | python3 -m json.tool",
    more: "https://rin.contact/api/rin.json",
  });
}
