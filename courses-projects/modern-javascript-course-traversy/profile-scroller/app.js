const data = [
  {
    name: "John soe",
    age: 32,
    gender: "male",
    lookingFor: "female",
    location: "Bir djed",
    profileImage: "https://randomuser.me/api/portraits/men/75.jpg",
  },
  {
    name: "Jacen oui",
    age: 22,
    gender: "female",
    lookingFor: "male",
    location: "Rabat",
    profileImage: "https://randomuser.me/api/portraits/women/75.jpg",
  },
  {
    name: "Oisin oiler",
    age: 57,
    gender: "male",
    lookingFor: "female",
    location: "Casablanca",
    profileImage: "https://randomuser.me/api/portraits/men/25.jpg",
  },
  {
    name: "Jack lee",
    age: 66,
    gender: "male",
    lookingFor: "female",
    location: "Titians",
    profileImage: "https://randomuser.me/api/portraits/men/35.jpg",
  },
];

const profiles = profileIterator(data);

// Call first profile
nextProfile();

// profileIterator
function profileIterator(profiles) {
  let nextIndex = 0;

  return {
    next: function () {
      return nextIndex < profiles.length
        ? { value: profiles[nextIndex++], done: false }
        : { done: true };
    },
  };
}

// Next Event
document.getElementById("next").addEventListener("click", nextProfile);

function nextProfile() {
  const currentProfile = profiles.next().value;
  if (currentProfile !== undefined) {
    document.getElementById("profileDisplay").innerHTML = `
    <ul class="list-group">
        <li class="list-group-item">Name: ${currentProfile.name}</li>
        <li class="list-group-item">Age: ${currentProfile.age}</li>
        <li class="list-group-item">Gender: ${currentProfile.gender}</li>
        <li class="list-group-item">Location: ${currentProfile.location}</li>
        <li class="list-group-item">Looking for: ${currentProfile.lookingFor}</li>
    </ul>
    `;

    document.getElementById(
      "imageDisplay"
    ).innerHTML = `<img alt="${currentProfile.name}" src="${currentProfile.profileImage}">`;
  } else {
    // No more profiles
    window.location.reload();
  }
}
