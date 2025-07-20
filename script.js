async function getGitHubProfile() {
  const username = document.getElementById("username").value.trim();
  const profileContainer = document.getElementById("profile");

  profileContainer.innerHTML = "";
  profileContainer.classList.add("hidden");

  if (!username) {
    alert("⚠️ Please enter a GitHub username");
    return;
  }

  const url = `https://api.github.com/users/${username}`;
  profileContainer.innerHTML = `<div class="loader"></div>`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("❌ User not found");

    const data = await response.json();

    profileContainer.innerHTML = `
      <div class="card">
        <img src="${data.avatar_url}" alt="${data.login}" class="avatar"/>
        <h2>${data.name || data.login}</h2>
        <p class="bio">${data.bio || "No bio available"}</p>
        <div class="info">
          <p>📍 ${data.location || "Unknown"}</p>
          <p>📦 Repos: ${data.public_repos}</p>
          <p>👥 ${data.followers} followers • Following ${data.following}</p>
        </div>
        <a href="${data.html_url}" target="_blank" class="profile-btn">🔗 View GitHub</a>
      </div>
    `;
    profileContainer.classList.remove("hidden");
  } catch (err) {
    profileContainer.innerHTML = `<p class="error">${err.message}</p>`;
    profileContainer.classList.remove("hidden");
  }
}

// Allow "Enter" key to search
document.getElementById("username").addEventListener("keypress", function (e) {
  if (e.key === "Enter") getGitHubProfile();
});
