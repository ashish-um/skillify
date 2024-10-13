// Function to get the query parameter value from the URL
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // Function to fetch data and display results based on the skill query
  async function fetchAndDisplayResults() {
    const query = getQueryParameter('q'); // Get the 'q' parameter from the URL
    if (!query) {
      document.getElementById('results').innerText = 'No search query provided.';
      return;
    }
  
    try {
      const response = await fetch('./assets/data.json'); // Fetch data from your JSON file
      const data = await response.json();
  
      // Find the skill that matches the query
      const skillData = data.skills.find(skillItem =>
        skillItem.skill.toLowerCase().includes(query.toLowerCase())
      );
  
      const resultsContainer = document.getElementById('results');
  
      // If skill is found, display the people with that skill
      if (skillData) {
        const people = skillData.people;
        if (people.length > 0) {
          resultsContainer.innerHTML = people
            .map(person => `
              <div style="margin-top: 8rem;">
                <span style="display: flex; gap: 10px; align-items: center;"><img width="40" height="40" style="object-fit: cover; object-position: top; border-radius: 100vw;" src="${person.profile_photo}" alt=""><h2>${person.name}</h2></span>
                <p><strong>Position:</strong> ${person.position} at ${person.company}</p>
                <p><strong>Years of Experience:</strong> ${person.years_of_experience}</p>
                <p><img width="12" src="https://cdn4.iconfinder.com/data/icons/social-media-logos-6/512/112-gmail_email_mail-512.png" alt="" srcset=""> <strong>Email:</strong> <a href="mailto:${person.email}">${person.email}</a></p>
                <p><img width="12" src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="" srcset=""> <strong>GitHub:</strong> <a href="${person.github}" target="_blank">${person.github}</a></p>
                <p><img width="12" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/LinkedIn_logo_initials.png/480px-LinkedIn_logo_initials.png" alt="" srcset=""> <strong>LinkedIn:</strong> <a href="${person.linkedin}" target="_blank">${person.linkedin}</a></p>
                <p><img width="12" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdB-EbJVMxRYtNz1i4dn7jOVSfHq-002oe4w&s" alt="" srcset=""> <strong>Twitter:</strong> <a href="${person.twitter}" target="_blank">${person.twitter}</a></p>
                <h3>Projects:</h3>
                <ul>
                  ${person.projects.map(project => `
                    <li>
                      <strong>${project.name}:</strong> ${project.description}
                      (<a href="${project.url}" target="_blank">View Project</a>)
                    </li>`).join('')}
                </ul>
              </div>
            `)
            .join('');
        } else {
          resultsContainer.innerText = `No people found with the skill "${query}".`;
        }
      } else {
        resultsContainer.innerText = `Skill "${query}" not found.`;
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      document.getElementById('results').innerText = 'Error loading data.';
    }
  }
  
  // Call the function to fetch and display results when the page loads
  fetchAndDisplayResults();
  