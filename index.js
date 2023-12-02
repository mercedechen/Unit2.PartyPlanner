const cohort = "2310-fsa-et-web-pt-sf-b-mercede/events";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${cohort}`;


const state = {
  parties: [],
};

const ul = document.getElementById("parties");

async function getParties() {
  try {
    const response = await fetch(API_URL);
    const partyList = await response.json();
  } catch (error) {
   console.error(error);
  }
};
getParties();


