const url = "data/members.json";

const membersContainer = document.querySelector("#members");
const gridButton = document.querySelector("#gridView");
const listButton = document.querySelector("#listView");
const menuButton = document.querySelector("#menuButton");
const navMenu = document.querySelector("#navMenu");
const currentYear = document.querySelector("#currentYear");
const lastModified = document.querySelector("#lastModified");

async function getMembers() {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error("Error loading member data:", error);
    membersContainer.innerHTML =
      "<p>Sorry, the member directory could not be loaded.</p>";
  }
}

const displayMembers = (members) => {
  membersContainer.innerHTML = "";

  members.forEach((member) => {
    const card = document.createElement("section");
    const image = document.createElement("img");
    const name = document.createElement("h2");
    const address = document.createElement("p");
    const phone = document.createElement("p");
    const website = document.createElement("a");

    card.classList.add("member-card");

    image.setAttribute("src", `images/${member.image}`);
    image.setAttribute("alt", `${member.name} logo`);
    image.setAttribute("loading", "lazy");
    image.setAttribute("width", "120");
    image.setAttribute("height", "80");

    name.textContent = member.name;
    address.textContent = member.address;
    phone.textContent = member.phone;

    website.setAttribute("href", member.website);
    website.setAttribute("target", "_blank");
    website.setAttribute("rel", "noopener");
    website.textContent = member.website;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(address);
    card.appendChild(phone);
    card.appendChild(website);

    membersContainer.appendChild(card);
  });
};

gridButton.addEventListener("click", () => {
  membersContainer.classList.add("grid");
  membersContainer.classList.remove("list");

  gridButton.classList.add("active-view");
  listButton.classList.remove("active-view");
});

listButton.addEventListener("click", () => {
  membersContainer.classList.add("list");
  membersContainer.classList.remove("grid");

  listButton.classList.add("active-view");
  gridButton.classList.remove("active-view");
});

menuButton.addEventListener("click", () => {
  navMenu.classList.toggle("open");
  menuButton.classList.toggle("open");
});

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modified: ${document.lastModified}`;

getMembers();
