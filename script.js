// Herbal plant data
const herbData = {
    tulsi: {
        name: "Name: Tulsi (Holy Basil)",
        usage: "Usage: Tulsi is widely used in Ayurveda for its medicinal properties. It helps in relieving stress, boosting immunity, and is used for treating respiratory conditions."
    },
    ashwagandha: {
        name: "Name: Ashwagandha",
        usage: "Usage: Ashwagandha is used in Ayurveda to reduce stress, increase energy levels, and improve concentration. It is also known to promote muscle growth."
    },
	aloe_vera: {
	name: "Name: Aloe Vera",
	usage: "Usage: Aloe vera is a medicinal plant with antioxidant and antibacterial properties. Aloe vera benefits can include reducing dental plaque, accelerating wound healing, preventing wrinkles, and managing blood sugar."
	},
    // Add more herbs and their information here
};

// Function to show modal with herb details
function showDetails(herb) {
    const modal = document.getElementById('herb-info-modal');
    const herbName = document.getElementById('herb-name');
    const herbUsage = document.getElementById('herb-usage');

    herbName.textContent = herbData[herb].name;
    herbUsage.textContent = herbData[herb].usage;

    modal.style.display = 'block';
}

// Function to close the modal
function closeModal() {
    const modal = document.getElementById('herb-info-modal');
    modal.style.display = 'none';
}

// Function to handle tab switching
function openTab(evt, tabName) {
    // Hide all tabcontent
    const tabcontent = document.getElementsByClassName("tabcontent");
    for (let i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Remove "active" class from all tablinks
    const tablinks = document.getElementsByClassName("tablinks");
    for (let i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab and add "active" class to the clicked tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Modal handling functions
function showDetails(herb) {
    const modal = document.getElementById('herb-info-modal');
    const herbName = document.getElementById('herb-name');
    const herbUsage = document.getElementById('herb-usage');

    herbName.textContent = herbData[herb].name;
    herbUsage.textContent = herbData[herb].usage;

    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('herb-info-modal');
    modal.style.display = 'none';
}

// Set the default tab to "Herbal Plants"
document.getElementById("defaultTab").click();


// Load plant data
fetch('get_plants.php')
  .then(res => res.json())
  .then(data => {
    const plantList = document.getElementById('plant-list');
    data.forEach(plant => {
      const div = document.createElement('div');
      div.classList.add('plant-item');
      div.innerHTML = `<h3>${plant.name}</h3><p>${plant.description}</p><p><b>Usage:</b> ${plant.usage}</p>`;
      plantList.appendChild(div);
    });
  });

// Load remedy data
fetch('get_remedies.php')
  .then(res => res.json())
  .then(data => {
    const remedyList = document.getElementById('remedy-list');
    data.forEach(remedy => {
      const div = document.createElement('div');
      div.classList.add('remedy-item');
      div.innerHTML = `<h3>${remedy.title}</h3><p><b>Ingredients:</b> ${remedy.ingredients}</p><p>${remedy.instructions}</p>`;
      remedyList.appendChild(div);
    });
  });

// Doctor Info

window.onload = () => {
    const form = document.getElementById('contactForm');

    if (!form) {
        console.error("Form not found. Make sure your doctor.html has a form with id='contactForm'");
        return;
    }

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        if (name && email && message) {
            alert(`Thank you ${name}, your message has been sent.`);
            form.reset();
        } else {
            alert("Please fill all fields.");
        }
    });
};

//feedback
document.getElementById('feedbackForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('feedbackName').value.trim();
    const email = document.getElementById('feedbackEmail').value.trim();
    const message = document.getElementById('feedbackMessage').value.trim();

    if (name && email && message) {
        alert(`Thanks for your feedback, ${name}!`);
        document.getElementById('feedbackForm').reset();
    } else {
        alert('Please fill in all fields.');
    }
});

// Toggle chatbot visibility
function toggleChat() {
  const bot = document.getElementById("chatbot");
  bot.style.display = bot.style.display === "flex" ? "none" : "flex";
}

let chatContext = [];

async function sendMessage() {
  const input = document.getElementById("user-input");
  const message = input.value.trim();
  if (!message) return;

  const chatBody = document.getElementById("chat-body");

  // Show user message
  const userDiv = document.createElement("div");
  userDiv.className = "user-message";
  userDiv.textContent = message;
  chatBody.appendChild(userDiv);

  // Bot typing
  const botDiv = document.createElement("div");
  botDiv.className = "bot-message";
  botDiv.textContent = "Typing...";
  chatBody.appendChild(botDiv);

  input.value = "";
  chatBody.scrollTop = chatBody.scrollHeight;

  try {
    const res = await fetch('http://127.0.0.1:5000/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query: message, context: [] })
    });

    const data = await res.json();
    botDiv.textContent = data.response || "No response from server.";
  } catch (e) {
    console.error(e);
    botDiv.textContent = "⚠️ Response error. Try again.";
  }

  chatBody.scrollTop = chatBody.scrollHeight;
}

// Speech-to-Text
const micBtn = document.getElementById("mic-btn");
micBtn.addEventListener("click", () => {
  if (!("webkitSpeechRecognition" in window)) {
    alert("Your browser does not support speech recognition.");
    return;
  }

  const recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.start();

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    document.getElementById("user-input").value = transcript; // show speech in input box
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
  };
});



/* herbal plants */
window.onload = () => {
  fetch('get_plants.php')  // ✅ PHP must be accessible from here
  .then(res => res.json())
  .then(data => {
      const gallery = document.getElementById('herb-gallery');
      gallery.innerHTML = '';
      data.forEach(plant => {
          const div = document.createElement('div');
          div.className = 'herb-card';
          div.onclick = () => showDetails(plant.name, plant.usage);
          div.innerHTML = `
              <img src="${plant.image}" alt="${plant.name}">
              <h3>${plant.name}</h3>
          `;
          gallery.appendChild(div);
      });
  })
  .catch(error => console.error('Fetch error:', error));
};

function toggleChat() {
  const chat = document.getElementById("chatbot");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

