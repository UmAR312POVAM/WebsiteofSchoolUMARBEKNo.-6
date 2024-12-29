
// Функция для загрузки данных из JSON-файла
async function fetchData(file) {
    try {
        const response = await fetch(file);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return await response.json();
    } catch (error) {
        console.error(`Ошибка загрузки данных из ${file}:`, error);
        return [];
    }
}


// Слайдер
let slideIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

// Функция для показа слайда
function showSlide(index) {
    if (index >= totalSlides) {
        slideIndex = 0;
    } else if (index < 0) {
        slideIndex = totalSlides - 1;
    }
    const offset = -slideIndex * 100; // сдвиг для текущего слайда
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;
}

// Обработчики кнопок
prevButton.addEventListener('click', () => {
    slideIndex--;
    showSlide(slideIndex);
});

nextButton.addEventListener('click', () => {
    slideIndex++;
    showSlide(slideIndex);
});

// Изначально показываем первый слайд
showSlide(slideIndex);


    // Инициализация
    showSlide(currentSlide);
    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Автоматическая прокрутка
    setInterval(nextSlide, 5000);

// Главная страница
function renderIndexPage() {
    const main = document.querySelector('main');
    main.innerHTML = `
        <h2>Добро пожаловать на сайт школы города Истиклол!</h2>
        <p>Здесь вы найдете информацию о наших учителях, классах, новостях и достижениях.</p>
        <div class="slider">
            <div class="slides">
                <div class="slide"><img src="фото/школо.jpeg" alt="Фото школы 1"></div>
                <div class="slide"><img src="фото/призи.jpeg" alt="Фото школы 2"></div>
                <div class="slide"><img src="фото/школо2.jpeg" alt="Фото школы 3"></div>
            </div>
            <button class="prev">&#10094;</button>
            <button class="next">&#10095;</button>
        </div>
    `;
    setupSlider();
}

// Учителя
function renderTeachersPage() {
    fetchData('data/teachers.json').then(teachers => {
        const main = document.querySelector('main');
        main.innerHTML = `
            <h2>Наши учителя</h2>
            <ul id="teacher-list"></ul>
        `;
        const list = document.getElementById('teacher-list');
        teachers.forEach(teacher => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${teacher.name}</h3>
                <p><strong>Предмет:</strong> ${teacher.subject}</p>
                <p><strong>Возраст:</strong> ${teacher.age} лет</p>
                <p><strong>Классы:</strong> ${teacher.classes}</p>
            `;
            list.appendChild(li);
        });
    });
}

// Классы
function renderClassesPage() {
    fetchData('data/classes.json').then(classes => {
        const main = document.querySelector('main');
        main.innerHTML = `
            <h2>Классы</h2>
            <ul id="class-list"></ul>
        `;
        const list = document.getElementById('class-list');
        classes.forEach(classItem => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${classItem.name}</h3>
                <p><strong>Классный руководитель:</strong> ${classItem.teacher}</p>
                <p><strong>Количество учеников:</strong> ${classItem.studentsCount}</p>
            `;
            list.appendChild(li);
        });
    });
}

// Новости
function renderNewsPage() {
    fetchData('data/news.json').then(news => {
        const main = document.querySelector('main');
        main.innerHTML = `
            <h2>Новости</h2>
            <ul id="news-list"></ul>
        `;
        const list = document.getElementById('news-list');
        news.forEach(item => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${item.title}</h3>
                <p><strong>Дата:</strong> ${item.date}</p>
            `;
            list.appendChild(li);
        });
    });
}

// Достижения
function renderAchievementsPage() {
    fetchData('data/achievements.json').then(achievements => {
        const main = document.querySelector('main');
        main.innerHTML = `
            <h2>Достижения</h2>
            <ul id="achievement-list"></ul>
        `;
        const list = document.getElementById('achievement-list');
        achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.innerHTML = `
                <h3>${achievement.title}</h3>
                <p>${achievement.description}</p>
                <p><strong>Дата:</strong> ${achievement.date}</p>
            `;
            list.appendChild(li);
        });
    });
}

// Переключение между страницами
document.addEventListener('DOMContentLoaded', () => {
    const pageId = document.body.querySelector('main').dataset.page;
    switch (pageId) {
        case 'index':
            renderIndexPage();
            break;
        case 'teachers':
            renderTeachersPage();
            break;
        case 'classes':
            renderClassesPage();
            break;
        case 'news':
            renderNewsPage();
            break;
        case 'achievements':
            renderAchievementsPage();
            break;
        default:
            console.error('Неизвестная страница!');
    }
});
