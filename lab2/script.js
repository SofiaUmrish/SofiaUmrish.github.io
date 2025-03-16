document.addEventListener("DOMContentLoaded", () => {
    const expeditions = {
        "Дослідження Марса": `🌕 Ця експедиція спрямована на вивчення поверхні Марса, збору зразків ґрунту та пошук можливого життя.
                              Вчені досліджуватимуть марсіанські кратери та долини для виявлення слідів води в минулому. 
                              Планується використання роботизованих апаратів для аналізу атмосфери, 
                              а також дослідження марсіанських льодовиків для вивчення потенційних ресурсів, 
                              які можуть бути використані під час майбутніх колонізацій.`,
                              
        "Місія на Титан": `🪐 Місія передбачає дослідження атмосфери та океанів супутника Сатурна – Титана, щоб дізнатися більше про його можливу придатність до життя.
                          Вчені планують використовувати спеціальні апарати, здатні занурюватися в метанові океани Титана, 
                          щоб вивчити хімію його атмосфери та поверхні. Місія також має на меті з'ясувати, 
                          чи можуть на Титані існувати органічні молекули, які є передумовою для життя.`,
                          
        "Пошук позаземного життя": `🚀 Експедиція, яка відправиться у глибокий космос для аналізу екзопланет і пошуку ознак життя за межами нашої Сонячної системи.
                                   Це амбіційна місія, яка використовує телескопи та міжзоряні зонди для виявлення планет, 
                                   що перебувають у зоні «золотої середини», де можуть бути умови для існування води в рідкому вигляді. 
                                   Місія також включатиме пошук атмосферних ознак, таких як метан або кисень, 
                                   що можуть вказувати на наявність біологічних процесів.`
    };

    // додача опису на кнопки вибору експедицій
    const buttons = document.querySelectorAll(".expedition-btn");
    
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", () => {
            const missionSection = document.getElementById("missions");
            let missionDescription = missionSection.querySelector(".mission-description");
    
            if (!missionDescription) {
                missionDescription = document.createElement("p");
                missionDescription.classList.add("mission-description");
                missionSection.appendChild(missionDescription);
            }
    
            // плавна зміна тексту
            missionDescription.style.opacity = "0";
            setTimeout(() => {
                missionDescription.textContent = expeditions[buttons[i].textContent];
                missionDescription.style.opacity = "1";
            }, 300);
        });
    }

    const missions = ["Дослідження Марса", "Місія на Титан", "Пошук позаземного життя"];
    const missionData = [{ fuel: 80, energy: 65 }, { fuel: 60, energy: 55 }, { fuel: 90, energy: 70 }];

    const travelsSection = document.querySelector("#travels");

    // Створення елементів
    const missionSelect = document.createElement("select");
    missionSelect.classList.add("mission-select");

    const startMissionBtn = document.createElement("button");
    startMissionBtn.textContent = "Почати місію";
    startMissionBtn.classList.add("mission-btn");

    const completedMissionsContainer = document.createElement("div");
    completedMissionsContainer.id = "completed-missions";

    const noMissionsMessage = document.createElement("p");
    noMissionsMessage.textContent = "Ви ще не здійснили жодної експедиції.";
    noMissionsMessage.id = "no-missions-message";

    const currentMissionStatus = document.createElement("p");
    currentMissionStatus.id = "current-mission-status";

    travelsSection.append(missionSelect, startMissionBtn, completedMissionsContainer, noMissionsMessage, currentMissionStatus);

    // Додавання варіантів місій у select
    for (let index = 0; index < missions.length; index++) {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = missions[index];
        missionSelect.appendChild(option);
    }    

    startMissionBtn.addEventListener("click", function () {
        const selectedMissionIndex = missionSelect.value;
        const missionName = missions[selectedMissionIndex];

        const missionItem = document.createElement("div");
        missionItem.textContent = `${missionName} - В процесі...`;
        completedMissionsContainer.appendChild(missionItem);

        let countdown = 5;
        const countdownInterval = setInterval(() => {
            missionItem.textContent = `${missionName} - ${countdown} сек.`;
            countdown--;

            if (countdown < 0) {
                clearInterval(countdownInterval);
                missionItem.textContent = `${missionName} - Завершено!`;
                checkCompletedMissions();
                updateShipStatus(missionData[selectedMissionIndex]);
            }
        }, 1000);
    });

    function checkCompletedMissions() {
        if (noMissionsMessage && completedMissionsContainer.children.length > 0) {
            noMissionsMessage.style.display = "none";
        }
    }

    function updateShipStatus({ fuel, energy }) {
        const shipStatus = document.querySelector(".ship-status");
        shipStatus.querySelector("p:nth-child(1)").textContent = `🚀 Паливо: ${fuel}%`;
        shipStatus.querySelector(".status-fill").style.width = `${fuel}%`;
        shipStatus.querySelector("p:nth-child(3)").textContent = `⚡ Енергія: ${energy}%`;
        shipStatus.querySelectorAll(".status-fill")[1].style.width = `${energy}%`;
    }
    

    // Коментарі
    const commentsTitle = document.createElement("h3");
    commentsTitle.textContent = "Коментарі";
    commentsTitle.style.marginTop = "40px";
    travelsSection.appendChild(commentsTitle);

    const commentForm = document.createElement("form");
    commentForm.classList.add("comment-form");
    commentForm.innerHTML = `
        <input type="text" id="userName" placeholder="Ваше ім'я" required>
        <input type="text" id="userComment" placeholder="Ваш коментар" required>
        <button type="submit">Додати коментар</button>
    `;
    travelsSection.appendChild(commentForm);

    const commentList = document.createElement("div");
    commentList.classList.add("comment-list");
    travelsSection.appendChild(commentList);

    commentForm.addEventListener("submit", function (event) {
        event.preventDefault();
        const name = document.getElementById("userName").value.trim();
        const comment = document.getElementById("userComment").value.trim();

        if (name && comment) {
            const commentItem = document.createElement("div");
            commentItem.innerHTML = `<strong>${name}:</strong> ${comment}`;
            commentList.appendChild(commentItem);
            document.getElementById("userName").value = "";
            document.getElementById("userComment").value = "";
        }
    });
});
