"use strict";
const emptyQuery = document.querySelector(".query");
const contentContainer = document.querySelector(".content--right");
const searchBtn = document.querySelector(".controls--btn");
const searchBar = document.querySelector(".search-bar");

class App {
  #user = {};

  constructor() {
    searchBtn.addEventListener("click", (e) => {
      e.preventDefault();

      this.gitHubProfile(searchBar.value);
    });
  }

  gitHubProfile = async (username) => {
    try {
      // RETURN IF SEARCH QUERY IS EMPTY
      if (!username) return;

      // LOADER FOR WHEN ASYNC FUNCTION STARTS
      this.loader();

      const res = await fetch(`https://api.github.com/users/${username}`);
      if (!res.ok) throw new Error();
      const data = await res.json();

      /////////////////////
      // STATUS CHECKS FOR REQUEST

      // SPLITING DATA FOR EASY ACCESS
      this.#user = {
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
      // WHERE DATA IS CALLED AND DISPLAYED IN BROWSER
      this.gitHubContent(this.#user);
    } catch (err) {
      console.error(err);

      // ERROR MESSAGE FOR ANY FAILED QUERY
      this.errorMessage(contentContainer, err.message);
    }
  };

  // EVERYTHING ABOUT THE SEARCH QUERY
  // INCLUDING
  // 1. THE TIME WHEN A USER SEARCHES
  // 2. ADDING PADDING TO DATE DATA FOR DISPLAY
  // 3. HTML STRUCTURE ADDED HERE
  gitHubContent(user) {
    // ADDING PADDING TO USERS CREATED DATE
    const time = new Date(user.timestring);
    const usersCreatedDate = `${String(time.getDay()).padStart(2, "0")}/${String(time.getMonth()).padStart(2, "0")}/${time.getFullYear()}`;

    //NEW FEATURE OF TIME INWHICH SEARCH STARTED
    const currentTime = new Date();
    const timeOfSearch = `${String(currentTime.getHours()).padStart(2, "0")}:${String(currentTime.getMinutes()).padStart(2, "0")}:${String(currentTime.getSeconds()).padStart(2, "0")}`;

    // CONTENT HTML
    const gitHubHTML = `
        <div class="flexy">
            <h2 class="content--right-heading">profile record</h2>
            <h2 class="content--right-heading">${timeOfSearch}</h2>
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
                  <div class="result-extra--info--sub">${usersCreatedDate}</div>
                </li>
              </ul>
            </div>

            <a href="${user.url}" target="blank" class="link-style controls--btn wid--3 m--3">view on GitHub</a>
          </div>
    `;

    // INSERTING HTML IN CONTAINER
    this.containerReset(contentContainer, gitHubHTML);
  }

  // LOADER FOR SEARCH CONTENT
  loader() {
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

    // INSERTING THE LOADER HTML INTO THE CONTAINER
    this.containerReset(contentContainer, loaderHTML);
  }

  // ERROR MESSAGE FOR FAILED SEARCH
  errorMessage(container, errMessage) {
    container.innerHTML = "";
    container.insertAdjacentHTML(
      "beforeend",
      `
      <div class="flexy">
            <h2 class="content--right-heading">profile record</h2>
          </div>

       <div class="query">
            
            <h2 class="query--sub col--red ft--s">An Error occured ${errMessage}</h2>
          </div>
      `,
    );
  }

  containerReset(container, HTML, insertType = "beforeend") {
    container.innerHTML = ``;
    container.insertAdjacentHTML(insertType, HTML);
  }
}

const app = new App();
