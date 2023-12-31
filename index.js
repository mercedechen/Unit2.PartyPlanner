const COHORT = "2310-FSA-ET-WEB-PT-SF-mercede";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
  parties: [],
};

const parties = document.querySelector("#parties");
const addPartyForm = document.querySelector("#partyForm");
addPartyForm.addEventListener("submit", addParty);

// Wait to get party data first, then display on HTML
async function render() {
  await getParties();
  renderParties();
}
render();

// 1. Get events data from API URL
async function getParties() {
  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    const parties = json.data;
    state.parties = parties;
    console.log(state.parties);
  } catch (error) {
   console.log(error);
  }
};

// 2. Display party events on HTML using DOM
function renderParties() {
  if (!state.parties.length){
    partyList.innerHTML = "<li>No parties are being hosted in your area</li>";
    return;
  }

  const partyPosts = state.parties.map((party) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <h2>${party.name}</h2>
    <p>${new Date(party.date).toLocaleString("en-US")}</p>
    <p>${party.location}</p>
    <p>${party.description}</p>
    `;

    const remove = document.createElement("button");
    remove.innerText = "remove";
    li.appendChild(remove);
    li.addEventListener("click", () => removeParty(party.id));
    return li;
  });
  partyList.append(...partyPosts);
}

// 3. Add party post
async function addParty(event) {
  event.preventDefault();

  try {
     const response = await fetch (API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addPartyForm.name.value,
        description: addPartyForm.description.value,
        date: new Date(addPartyForm.date.value).toISOString(),
        location: addPartyForm.location.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to add party posting");
    }

    render();
    
    addPartyForm.name.value = "";
    addPartyForm.description.value = "";
    addPartyForm.date.value = ""
    addPartyForm.location.value = "";

  } catch (error) {
    console.error(error);
  };
};

// 4. Remove party post
async function removeParty(id) {
  try {
    const response = await fetch (API_URL + `/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Failed to delete party posting");
    }

    render();

  } catch (error) {
    console.error(error);
  };
};