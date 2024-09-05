const searchInput = document.getElementById("searchInput");
const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");
let typingTimer;

searchInput.addEventListener("input", ()=> {
    clearTimeout(typingTimer);
    typingTimer = setTimeout(searchSongs, 1000);
});

async function searchSongs() {
    const searchTerm = searchInput.value.trim();
    if(!searchTerm) {
        resultsDiv.innerHTML = "";
        return;
    }

    loader.style.display = "block";
    resultsDiv.innerHTML = "";

    try {
        const response = await fetch(`https://itunes.apple.com/search?term=${searchTerm}&entity=song`);
        const data = await response.json();
        console.log(data.results);
        displayResults(data.results); 
    } catch(error) {
        resultsDiv.innerHTML = "<p>Error occured while fetching results! Try again or modify your input...</p>";
    } finally {
        loader.style.display = "none";
    }
}

function displayResults(results) {
    if(!results.length) {
        resultsDiv.innerHTML="<p>No results found.</p>";
        return;
    }

    const resultList = document.createElement("ul");

    results.forEach(result => {
        const listItem = document.createElement("li");
        listItem.textContent = `${result.trackName} - ${result.artistName}`;
        resultList.appendChild(listItem);
    });

    resultsDiv.appendChild(resultList);
}