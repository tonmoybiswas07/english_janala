const createElement = (arr) => {
  const htmlElement = arr.map((el) => `<span class = btn>${el}</span>`);
  return htmlElement.join(" ");
};
// speaker functionality

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const loadLevel = () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

// loading container
const loadingCircle = (status) => {
  if (status == true) {
    document.getElementById("loading-container").classList.remove("hidden");
    document.getElementById("word-card-container").classList.add("hidden");
  } else {
    document.getElementById("word-card-container").classList.remove("hidden");
    document.getElementById("loading-container").classList.add("hidden");
  }
};

const loadLevelWord = (id) => {
  loadingCircle(true);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const lessonActive = document.querySelectorAll(".lesson-active");
      lessonActive.forEach((element) => {
        element.classList.remove("active");
      });
      const lessonBtn = document.getElementById(`lesson-btn-${id}`);
      lessonBtn.classList.add("active");

      displayWordCard(data.data);
    });
};
const wordModal = (id) => {
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayModals(data.data));
};

const displayModals = (words) => {
  const modalContainer = document.getElementById("modal-container");
  document.getElementById("word_modals").showModal();
  modalContainer.innerHTML = `
  <div class = "space-y-4">
 <div >
            <h1 class="text-2xl font-bold bangla-font">${
              words.word
            } ( <span><i class="fa-solid fa-microphone-lines "></span></i> :${
    words.pronunciation
  })</h1>
          </div>
          <div>
            <p class = "font-bold">Meaning</p>
            <h2 class = "bangla-font">${words.meaning}</h2>
          </div>
          <div>
            <p class = "font-bold">Example</p>
            <h2>${words.sentence}</h2>
          </div>
          <div >
            <p class="font-bold bangla-font">সমার্থক শব্দ গুলো</p>
            <div class="flex gap-3">
              ${createElement(words.synonyms)}
            </div>
          </div>
          </div>
 
 `;
};
const displayWordCard = (words) => {
  const wordCardContainer = document.getElementById("word-card-container");
  wordCardContainer.innerHTML = "";

  if (words.length == 0) {
    wordCardContainer.innerHTML = `
      <div class="text-center col-span-full bangla-font space-y-6">
      <img class = "mx-auto" src = "./images/alert-error.png"/>
        <p class="text-xl font-semibold text-gray-400">
          এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।
        </p>
        <h2 class="text-4xl font-bold">নেক্সট Lesson এ যান</h2>
      </div>
    
    `;
    loadingCircle(false);
    return;
  }
  words.forEach((element) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="bg-white text-center md:w-[350px] md:h-[350px] p-10 m-5 rounded-lg shadow-sm h-100%">
         <h2 class="text-[32px] font-bold"> ${
           element.word ? element.word : "অর্থ পাওয়া যাই নি"
         } </h2>
        <p class="text-gray-400 my-3">Meaning /Pronounciation</p>
        <h2 class="text-[32px] font-semibold bangla-font">${
          element.meaning ? element.meaning : "অর্থ পাওয়া যাই নি"
        } / ${
      element.pronunciation ? element.pronunciation : "pronunciation নাই"
    } </h2>
        <div class="flex justify-between items-center mt-10">
          <button class="btn bg-[#1A91FF10]" onclick="wordModal(${element.id})">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button onclick ="pronounceWord('${
            element.word
          }')" class="btn bg-[#1A91FF10]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    
    
    `;
    wordCardContainer.append(cardDiv);
  });
  loadingCircle(false);
};
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  for (const lesson of lessons) {
    const div = document.createElement("div");
    div.innerHTML = `<button id="lesson-btn-${lesson.level_no}" onclick = "loadLevelWord(${lesson.level_no})" class= "btn btn-outline btn-primary lesson-active">
                    <i class="fa-solid fa-book-open"></i> Lesson -  ${lesson.level_no}
                    </button>
                                `;
    levelContainer.append(div);
  }
};

loadLevel();
// search input section

document.getElementById("search-button").addEventListener("click", () => {
  const searchInput = document.getElementById("input-search");
  const searchInputValue = searchInput.value.trim().toLowerCase();

  const url = "https://openapi.programming-hero.com/api/words/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      const allWords = data.data;
      const allWordsFilter = allWords.filter((word) =>
        word.word.toLowerCase().includes(searchInputValue)
      );

      displayWordCard(allWordsFilter);
    });
});
