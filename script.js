const API_GITHUB = "https://api.github.com/users/";
const searchForm = document.querySelector("form");
const search = document.querySelector("input");
const cardContainer = document.querySelector(".card-container");

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getProfile(search.value);
  search.value = "";
});

async function getRepos(value) {
  const response = await fetch(API_GITHUB + value + "/repos");
  const data = await response.json();
  let repos = [];
  for (let i = 0; i < 6; i++) {
    repos.push(data[i].name);
  }
  return repos;
}

async function getProfile(value) {
  const response = await fetch(API_GITHUB + value);
  const data = await response.json();
  const firstRepos = await getRepos(value);

  console.log(firstRepos);
  createCard(data, firstRepos);
}

function createCard(data, firstRepos) {
  cardContainer.innerHTML = "";

  const avatar = data.avatar_url;
  const name = data.name;
  const bio = data.bio;
  const followers = data.followers;
  const following = data.following;
  const repos = data.public_repos;

  const cardEl = document.createElement("div");
  cardEl.classList.add("card");
  cardEl.innerHTML = `
  <img src="${avatar}" alt="profile picture" />
      <div class="card-desc">
        <h3>${name}</h3>
        <p>
          ${bio}
        </p>
        <div class="counter">
          <p>${followers} Followers</p>
          <p>${following} Following</p>
          <p>${repos} Repos</p>
        </div>
        <div class="tags">
        </div>
      </div>
  `;
  cardContainer.appendChild(cardEl);

  const tagsEl = document.querySelector(".tags");
  console.log(tagsEl);
  firstRepos.map((repo) => {
    const repoEl = `<a>${repo}</a>`;
    tagsEl.innerHTML += repoEl;
  });
}
