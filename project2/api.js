// 1. Constants and DOM Elements
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const notesList = document.getElementById("notes-list");
// We will use the form elements in Task 2

// 2. Reusable request function
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return await response.json();
}

// Helper to easily change status text and color
function setStatus(message, className) {
  statusText.textContent = message;
  statusText.className = className;
}

// 3. GET: Load Notes
async function loadNotes() {
  try {
    // UI Loading State
    loadBtn.disabled = true;
    setStatus("Loading notes...", "loading");
    notesList.textContent = ""; // Clear the list

    // Fetch exactly 10 notes
    const notes = await request(`${API_URL}?_limit=10`);

    // Check for empty state
    if (notes.length === 0) {
      notesList.textContent = "No notes found on the server.";
      setStatus("Loaded successfully, but no notes exist.", "success");
      return;
    }

    // Render notes using textContent for security
    notes.forEach((note) => {
      const li = document.createElement("li");
      li.className = "note-card";

      const title = document.createElement("h3");
      title.textContent = note.title;

      const body = document.createElement("p");
      body.textContent = note.body;

      li.appendChild(title);
      li.appendChild(body);
      notesList.appendChild(li);
    });

    setStatus("Loaded 10 notes from the server.", "success");
  } catch (error) {
    setStatus(`Failed to load notes: ${error.message}`, "error");
  } finally {
    // Always re-enable the button, even if it fails
    loadBtn.disabled = false;
  }
}

// 4. Event Listeners
loadBtn.addEventListener("click", loadNotes);
