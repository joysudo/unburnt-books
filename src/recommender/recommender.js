/* this is where joy & rachel are writing code for the recommender */

document.addEventListener("DOMContentLoaded", () => {
  const titleEl = document.getElementById("book-title");
  const authorEl = document.getElementById("book-author");
  const descEl = document.getElementById("book-description");
  const dropdown = document.getElementById("genre-dropdown");
  const goBtn = document.getElementById("go-button");

  let books = [];

  // load and parse the CSV
  fetch(
    "https://raw.githubusercontent.com/joysudo/unburnt/refs/heads/main/banned_books_refiltered.csv"
  )
    .then((resp) => {
      console.log("Fetch status:", resp.status);
      if (!resp.ok) {
        throw new Error(
          `Failed to load banned_books_filtered.csv: ${resp.status}`
        );
      }
      return resp.text();
    })
    .then((csvText) => {
      const parsed = Papa.parse(csvText, {
        header: true,
        skipEmptyLines: true,
        transformHeader: (h) => h.trim(),
      });

      console.log("Parsed CSV data:", parsed.data);

      // check required columns
      const sampleRow = parsed.data[0] || {};
      const required = ["Author", "Title", "Description", "Genre"];
      const missing = required.filter((col) => !(col in sampleRow));
      if (missing.length > 0) {
        console.error(`CSV is missing required columns: ${missing.join(", ")}`);
        return;
      }

      // store the books
      books = parsed.data.map((row) => ({
        Author: (row.Author || "").trim(),
        Title: (row.Title || "").trim(),
        Description: (row.Description || "").trim(),
        Genre: (row.Genre || "").trim(),
      }));

      populateGenres();
    })
    .catch((err) => {
      console.error(err);
    });

  function populateGenres() {
    const genreCount = new Map();

    books.forEach((book) => {
      (book.Genre || "")
        .split(",")
        .map((g) => g.trim())
        .forEach((g) => {
          if (g) genreCount.set(g, (genreCount.get(g) || 0) + 1);
        });
    });

    dropdown.innerHTML = "";
    dropdown.appendChild(new Option("random genre", ""));

    [...genreCount.entries()]
      .filter(([, count]) => count >= 50)
      .sort(([a], [b]) => a.localeCompare(b))
      .forEach(([genre]) => dropdown.appendChild(new Option(genre, genre)));
  }

  function pickRandomBook() {
    const selected = dropdown.value.trim();
    if (!selected) {
      const randomBook = books[Math.floor(Math.random() * books.length)];
      titleEl.textContent = randomBook.Title;
      authorEl.textContent = randomBook.Author;
      descEl.textContent = randomBook.Description;
      return;
    }

    const filtered = books.filter((book) =>
      book.Genre.split(",")
        .map((g) => g.trim().toLowerCase())
        .includes(selected.toLowerCase())
    );

    if (filtered.length === 0) {
      alert(`No books found for genre: ${selected}`);
      return;
    }

    const randomBook = filtered[Math.floor(Math.random() * filtered.length)];
    titleEl.textContent = randomBook.Title;
    authorEl.textContent = randomBook.Author;
    descEl.textContent = randomBook.Description;
  }

  goBtn.addEventListener("click", pickRandomBook);
});
