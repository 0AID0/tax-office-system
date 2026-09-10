function addNewPerson() {
    var table = document.getElementById('personsTable');
    var newRow = table.insertRow(table.rows.length);

    // Функция для проверки наличия цифр в строке
    var containsNumber = function(input) {
        return /\d/.test(input);
    };

    // Запрос на ввод данных о новом лице через HTML-форму (примерно)
    var name = prompt("Введите Фамилию");
    var surname = prompt("Введите Имя");
    var patronymic = prompt("Введите Отчество");
    var age = prompt("Введите возраст");
    var inn = prompt("Введите ИНН");

    // Проверка на заполненность полей
    if (!name || !surname || !patronymic || !age || !inn) {
        alert("Пожалуйста, заполните все поля.");
        return;
    }

    // Проверка на корректность заполнения поля возраста
    if (isNaN(age) || age < 18 || age > 100) {
        alert("Пожалуйста, введите корректный возраст (от 20 до 95).");
        return;
    }

    // Проверка наличия цифр в полях имени, фамилии и отчества
    if (containsNumber(name) || containsNumber(surname) || containsNumber(patronymic)) {
        alert("Пожалуйста, введите корректные данные без цифр для имени, фамилии и отчества.");
        return;
    }

    // Проверка корректности ИНН (пример)
    var innRegex = /^\d{10}$/; // Пример регулярного выражения для ИНН
    if (!inn.match(innRegex)) {
        alert("Пожалуйста, введите корректный ИНН.");
        return;
    }

    // Добавляем ячейки со значениями для нового лица
    var cell1 = newRow.insertCell(0);
    cell1.innerHTML = name;

    var cell2 = newRow.insertCell(1);
    cell2.innerHTML = surname;

    var cell3 = newRow.insertCell(2);
    cell3.innerHTML = patronymic;

    var cell4 = newRow.insertCell(3);
    cell4.innerHTML = age;

    var cell5 = newRow.insertCell(4);
    cell5.innerHTML = inn;

    var cell6 = newRow.insertCell(5);
    cell6.innerHTML = '<button onclick="deletePerson(this.parentNode.parentNode);"><i class="fas fa-trash"></i></button>';
}

function deletePerson(row) {
    var rowIndex = row.rowIndex;
    document.getElementById('personsTable').deleteRow(rowIndex);
}

// Функция для перехода на страницу функций
function goToFunctionsPage() {
    // Реализация перехода на страницу функций
}

function searchPerson() {
    // Получаем значение из поля ввода поиска
    var searchText = document.getElementById('searchInput').value.toLowerCase();

    // Получаем таблицу и строки таблицы
    var table = document.getElementById('personsTable');
    var rows = table.getElementsByTagName('tr');

    // Проходимся по каждой строке таблицы, начиная с 1, чтобы пропустить заголовок
    for (var i = 1; i < rows.length; i++) {
        var name = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase(); // Получаем текст из ячейки с именем

        // Проверяем, содержит ли имя текст из поля ввода поиска
        if (name.includes(searchText)) {
            rows[i].style.display = ''; // Показываем строку, если содержит
        } else {
            rows[i].style.display = 'none'; // Иначе скрываем строку
        }
    }
}

// Функция для просмотра данных о пользователе
function viewPersonDetails(row) {
    // Получаем данные о пользователе из ячеек строки таблицы
    var name = row.cells[0].innerHTML;
    var lastName = row.cells[1].innerHTML;
    var middleName = row.cells[2].innerHTML;
    var age = row.cells[3].innerHTML;
    var inn = row.cells[4].innerHTML;

    // Создаем сообщение с данными о пользователе
    var message = "Имя: " + name + "\n" +
                "Фамилия: " + lastName + "\n" +
                "Отчество: " + middleName + "\n" +
                "Возраст: " + age + "\n" +
                "ИНН: " + inn;

    // Выводим сообщение с данными о пользователе
    alert(message);
}

// Обработчик события для строк таблицы, позволяющий просматривать данные о пользователе при нажатии на строку
document.getElementById("personsTable").addEventListener("click", function(event) {
    // Проверяем, была ли нажата строка таблицы
    if (event.target.tagName === "TD") {
        // Получаем родительскую строку (TR) нажатой ячейки (TD)
        var row = event.target.parentNode;

        // Передаем эту строку в функцию для просмотра данных о пользователе
        viewPersonDetails(row);
    }
});



// Загрузка данных о налоговых ставках при загрузке страницы
window.onload = loadTaxRates;


// Функция расчёта налогов
function calculateTax() {
    // Получение значений из формы
    const income = document.getElementById("income").value;
    const expense = document.getElementById("expense").value;
    const taxRate = document.getElementById("tax-rate").value;

    // Расчёт налогооблагаемого дохода
    const taxableIncome = income - expense;

    // Расчёт суммы налога
    const taxAmount = taxableIncome * (taxRate / 100);

    // Отображение результатов расчёта
    const resultElement = document.getElementById("taxCalculationResult");
    resultElement.innerHTML = `Налогооблагаемый доход: ${taxableIncome}<br>Сумма налога: ${taxAmount}`;
}

// Функция для загрузки данных о налоговых ставках из JSON-файла
function loadTaxRates() {
    fetch('tax-rates.json')
        .then(response => response.json())
        .then(data => {
            // Получаем таблицу
            const tableBody = document.querySelector('#taxRatesTable tbody');

            // Очищаем текущие данные в таблице
            tableBody.innerHTML = '';

            // Добавляем каждую запись в таблицу
            data.forEach(entry => {
                const row = `
                    <tr>
                        <td>${entry.category}</td>
                        <td>${entry.tax_rate}</td>
                    </tr>
                `;
                tableBody.innerHTML += row;
            });
        })
        .catch(error => {
            console.error('Ошибка загрузки данных о налоговых ставках:', error);
        });
}

// Загрузка данных о налоговых ставках при загрузке страницы
window.onload = loadTaxRates;

// Функция для поиска лиц
function searchPerson() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredPersons = persons.filter(person =>
        person.name.toLowerCase().includes(searchInput) ||
        person.surname.toLowerCase().includes(searchInput)
    );
    displayPersons(filteredPersons);
}

// Функция для загрузки и отображения данных
function displayPersons(personsToDisplay = persons) {
    const tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    personsToDisplay.forEach((person, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${person.surname}</td>
            <td>${person.name}</td>
            <td>${person.patronymic}</td>
            <td>${person.age}</td>
            <td>${person.inn}</td>
            <td><button onclick="viewPersonData(${index})">Просмотр</button> <button onclick="deletePerson(${index})">Удалить</button></td>
        `;
        tableBody.appendChild(row);
    });
}