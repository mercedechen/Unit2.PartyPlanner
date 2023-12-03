const cohort = "2310-FSA-ET-WEB-PT-SF-mercede";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}/events`;

const state = {
  parties: [],
};

const partyList = document.querySelector("#parties");

async function render() {
  await getParties();
  renderParties();
}
render();

async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const parties = json.data;
    state.parties = parties;
    console.log("parties", parties);
    return parties;
  } catch (error) {
   console.error(error.message);
  }
};

function renderParties() {
  const partyCards = state.parties.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = 
    `<h2>${party.name}</h2>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>`;
    return li;
  });
  partyList.replaceChildren(...partyCards);
}
