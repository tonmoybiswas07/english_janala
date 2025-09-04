const loadLevel = () => {
  const url = `https://openapi.programming-hero.com/api/levels/all`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLesson(data.data));
};

const loadLevelWord = (id) => {
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordCard(data.data));
};
const displayWordCard = (words) => {
  const wordCardContainer = document.getElementById("word-card-container");
  wordCardContainer.innerHTML = "";

  if (words.length == 0) {
    return;
  }
  words.forEach((element) => {
    const cardDiv = document.createElement("div");
    cardDiv.innerHTML = `
      <div class="bg-white text-center p-10 m-5 rounded-lg shadow-sm h-100%">
        <h2 class="text-[32px] font-bold"> ${element.word} </h2>
        <p class="text-gray-400 my-3">Meaning /Pronounciation</p>
        <h2 class="text-[32px] font-semibold bangla-font">${element.meaning} /${element.pronunciation} </h2>
        <div class="flex justify-between items-center mt-10">
          <button class="btn bg-[#1A91FF10]">
            <i class="fa-solid fa-circle-info"></i>
          </button>
          <button class="btn bg-[#1A91FF10]">
            <i class="fa-solid fa-volume-high"></i>
          </button>
        </div>
      </div>
    
    
    `;
    wordCardContainer.append(cardDiv);
  });
};
const displayLesson = (lessons) => {
  const levelContainer = document.getElementById("level-container");

  for (const lesson of lessons) {
    const div = document.createElement("div");
    div.innerHTML = `<button onclick = "loadLevelWord(${lesson.level_no})" class= "btn btn-outline btn-primary">
                    <i class="fa-solid fa-book-open"></i> Lesson -  ${lesson.level_no}
                    </button>
                                `;
    levelContainer.append(div);
  }
};

loadLevel();
