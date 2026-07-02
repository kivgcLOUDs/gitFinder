"use strict";
const emptyQuery = document.querySelector(".query");
const contentContainer = document.querySelector(".content--right");
const searchBtn = document.querySelector(".controls--btn");
const searchBar = document.querySelector(".search-bar");

async function gitHubProfile(username) {
  try {
    loader();

    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) throw new Error();

    const data = await res.json();

    ////////////////////////
    /// HTML CHANGES
    // img.src = data.avatar_url;
    // repo.textContent = data.public_repos;
    // followers.textContent = data.followers;
    // bio.textContent = data.bio;

    const user = {
      img: data.avatar_url,
      repo: data.public_repos,
      followers: data.followers,
      bio: data.bio,
      followers: data.followers,
      following: data.following,
      username: data.login,
      name: data.name,
      location: data.location,
      dateCreated: data.created_at,
      company: data.company,
      website: data.website,
      url: data.html_url,
      timestring: data.created_at,
    };

    //////////////////////////
    gitHubContent(user);
    //
    console.log(data);
  } catch (err) {
    console.error(err);
    contentContainer.innerHTML = "";
    contentContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flexy">
            <h2 class="content--right-heading">profile record</h2>
          </div>

       <div class="query">
            
            <h2 class="query--sub col--red ft--s">An Error occured ${err.message}</h2>
          </div>
      `,
    );
  }
}

searchBtn.addEventListener("click", function (e) {
  e.preventDefault();

  gitHubProfile(searchBar.value);
});

// gitHubProfile("Deviant08");

function gitHubContent(user) {
  ////////////////////
  // YEAR JOINED
  const time = new Date(user.timestring);
  const createdDate = `${String(time.getDay()).padStart(2, "0")}/${String(time.getMonth()).padStart(2, "0")}/${time.getFullYear()}`;
  //////////////

  const currentTime = new Date();
  const currentTimeStr = `${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`;

  const gitHubHTML = `
        <div class="flexy">
            <h2 class="content--right-heading">profile record</h2>
            <h2 class="content--right-heading">${currentTimeStr}</h2>
        </div>

        <div class="result">
            <div class="result-profile">
              <div class="result-profile--container">
                <img
                  class="result-profile--image"
                  src="${user.img}"
                  alt="profile-image"
                />
              </div>

              <div class="result-info">
                <h2 class="result-info--name">${user.name}</h2>
                <p class="result-info--username">${user.username}</p>
                <p class="result-info--bio">
                 ${user.bio}
                </p>
              </div>
            </div>

            <div class="result-stat">
              <div class="result-stat--block">
                <span class="result-stat--block-main">${user.repo}</span>
                <span class="result-stat--block-sub">repos</span>
              </div>
              <div class="result-stat--block">
                <span class="result-stat--block-main">${user.followers}</span>
                <span class="result-stat--block-sub">followers</span>
              </div>
              <div class="result-stat--block">
                <span class="result-stat--block-main">${user.following}</span>
                <span class="result-stat--block-sub">following</span>
              </div>
            </div>

            <div class="result-extra">
              <ul>
                <li class="result-extra--info">
                  <p class="result-extra--info--main">location</p>
                  <div class="result-extra--info--sub">${user.location === null ? "-" : user.location}</div>
                </li>
                <li class="result-extra--info">
                  <p class="result-extra--info--main">company</p>
                  <div class="result-extra--info--sub">${user.company === null ? "-" : user.company}</div>
                </li>
                <li class="result-extra--info">
                  <p class="result-extra--info--main">website</p>
                  <div class="result-extra--info--sub">${user.website === undefined ? "-" : user.website}</div>
                </li>
                <li class="result-extra--info">
                  <p class="result-extra--info--main">joined</p>
                  <div class="result-extra--info--sub">${createdDate}</div>
                </li>
              </ul>
            </div>

            <a href="${user.url}" target="blank" class="link-style controls--btn wid--3 m--3">view on GitHub</a>
          </div>
    `;

  contentContainer.innerHTML = "";
  contentContainer.insertAdjacentHTML("beforeend", gitHubHTML);
}

function loader() {
  const loaderHTML = `
      <div class="flexy">
        <h2 class="content--right-heading">profile record</h2>
      </div>

      <div class="content--right-loader">
        <svg class="content--right-load">
          <use xlink:href="css/img/sprite.svg#icon-spinner6"></use>
        </svg>
      </div>
    `;

  contentContainer.innerHTML = ``;

  contentContainer.insertAdjacentHTML("beforeend", loaderHTML);
}
