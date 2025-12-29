let games = []; 

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("gameForm");
    const input = document.getElementById("searchInput");
    const genreSelect = document.getElementById("genreSelect");
    const result = document.getElementById("result");
    const resetBtn = document.getElementById("resetBtn");

    // Fetch - Adatok betöltése rögtön az elején
    fetch("https://corsproxy.io/?https://www.freetogame.com/api/games")
        .then(response => response.json())
        .then(data => {
            games = data;
            console.log("Adatok betöltve:", games.length);
            // Opcionális: displayGames(games); // Ha azt akarod, hogy rögtön látszódjanak
        })
        .catch(err => console.error("Hiba az API hívásnál:", err));

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        
        const searchValue = input.value.toLowerCase().trim();
        const selectedGenre = genreSelect.value.toLowerCase();

        const filteredGames = games.filter(game => {
            const matchesName = game.title.toLowerCase().includes(searchValue);
            const matchesGenre = (selectedGenre === "all") || (game.genre.toLowerCase() === selectedGenre);
            return matchesName && matchesGenre;
        });

        displayGames(filteredGames);
    });

    // 2. A RESET funkció (tedd a form submit esemény után)
resetBtn.addEventListener("click", function() {
    // Kiürítjük a szöveges mezőt
    input.value = "";
    
    // Visszaállítjuk a kategóriát "Minden"-re
    genreSelect.value = "all";
    
    // Kitöröljük a találatokat (vagy megjelenítjük az összeset)
    result.innerHTML = "";
    
    // Visszajelzés a konzolon
    console.log("Az oldal alaphelyzetbe állt.");
});

    function displayGames(gameList) {
        result.innerHTML = ""; 
        if (gameList.length === 0) {
            result.innerHTML = "<p>Nincs a feltételeknek megfelelő játék.</p>";
            return;
        }

        gameList.forEach(game => {
            const gameCard = document.createElement("div");
            gameCard.className = "game-card";
            gameCard.innerHTML = `
                <img src="${game.thumbnail}" alt="${game.title}">
                <h3>${game.title}</h3>
                <p><strong>Műfaj:</strong> ${game.genre}</p>
                <p>${game.short_description}</p>
            `;
            result.appendChild(gameCard);
        });
    }
});