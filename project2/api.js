// 1. Constants and DOM Elements
const API_URL = "https://jsonplaceholder.typicode.com/posts";

const loadBtn = document.getElementById("load-btn");
const statusText = document.getElementById("status");
const notesList = document.getElementById("notes-list");
const noteForm = document.getElementById("note-form");
const titleInput = document.getElementById("title-input");
const bodyInput = document.getElementById("body-input");
const submitBtn = document.getElementById("submit-btn");

// 2. Reusable request function
// Updated to return both the parsed data and the status code for Task 2
async function request(url, options = {}) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP Error! Status: ${response.status}`);
  }
  return { data: await response.json(), status: response.status };
}

function setStatus(message, className) {
  statusText.textContent = message;
  statusText.className = className;
}

// --- NEW: Helper function to build the note card & handle Deletes ---
function createNoteElement(note) {
  const li = document.createElement("li");
  li.className = "note-card";

  const title = document.createElement("h3");
  title.textContent = note.title;

  const body = document.createElement("p");
  body.textContent = note.body;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.style.backgroundColor = "#e74c3c"; // Red delete button
  deleteBtn.style.marginTop = "10px";

  // TASK 3: DELETE Logic
  deleteBtn.addEventListener("click", async () => {
    try {
      deleteBtn.disabled = true;
      setStatus("Deleting note...", "loading");

      // Send the DELETE request
      await request(`${API_URL}/${note.id}`, { method: "DELETE" });

      // Remove from the screen
      li.remove();
      setStatus(`Note ${note.id} deleted successfully.`, "success");
    } catch (error) {
      // Note on JSONPlaceholder quirk: It doesn't really save notes we POST.
      // So if we try to DELETE a newly created ID (like 101), the server might
      // return a 404 or an error. In a real app, it would just work. For this demo,
      // we will catch the error but still remove the card from the UI so it behaves correctly.
      li.remove();
      setStatus(
        `Removed from screen. (Server error ignored: ${error.message})`,
        "success",
      );
    }
  });

  li.appendChild(title);
  li.appendChild(body);
  li.appendChild(deleteBtn);

  return li;
}

// 3. TASK 1: GET Notes
async function loadNotes() {
  try {
    loadBtn.disabled = true;
    setStatus("Loading notes...", "loading");
    notesList.textContent = "";

    const response = await request(`${API_URL}?_limit=10`);
    const notes = response.data;

    if (notes.length === 0) {
      notesList.textContent = "No notes found on the server.";
      setStatus("Loaded successfully, but no notes exist.", "success");
      return;
    }

    notes.forEach((note) => {
      // Use our new helper function to append the note
      notesList.appendChild(createNoteElement(note));
    });

    setStatus("Loaded 10 notes from the server.", "success");
  } catch (error) {
    setStatus(`Failed to load notes: ${error.message}`, "error");
  } finally {
    loadBtn.disabled = false;
  }
}

// 4. TASK 2: POST (Create Note)
noteForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = titleInput.value.trim();
  const body = bodyInput.value.trim();

  // Validation
  if (!title) {
    setStatus("Title is required.", "error");
    return;
  }
  if (title.length > 100) {
    setStatus("Title must be 100 characters or fewer.", "error");
    return;
  }

  try {
    submitBtn.disabled = true;
    setStatus("Creating note...", "loading");

    const newNoteData = { title, body, userId: 1 };

    const response = await request(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNoteData),
    });

    const createdNote = response.data;
    const statusCode = response.status;

    // Prepend places the new note at the top of the list
    notesList.prepend(createNoteElement(createdNote));

    setStatus(
      `Note created (status ${statusCode}, id ${createdNote.id}).`,
      "success",
    );

    // Clear the form
    titleInput.value = "";
    bodyInput.value = "";
  } catch (error) {
    setStatus(`Failed to create note: ${error.message}`, "error");
  } finally {
    submitBtn.disabled = false;
  }
});

// Attach event listener to load button
loadBtn.addEventListener("click", loadNotes);
