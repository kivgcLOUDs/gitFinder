"use strict";
const repo = document.querySelector(".public-repo");
const img = document.querySelector(".profile-photo");
const followers = document.querySelector(".followers");
const bio = document.querySelector(".bio");

async function gitHubProfile(username) {
  try {
    const res = await fetch(`https://api.github.com/users/${username}`);

    if (!res.ok) throw new Error();

    const data = await res.json();

    ////////////////////////
    /// HTML CHANGES
    img.src = data.avatar_url;
    repo.textContent = data.public_repos;
    followers.textContent = data.followers;
    bio.textContent = data.bio;

    //////////////////////////
    //
    console.log(data);
  } catch (err) {
    // alert(err.message);
  }
}

gitHubProfile("Deviant08");
