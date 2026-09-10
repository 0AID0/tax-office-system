<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Формирование заголовка сообщения
    $to = "no.artem.name@bk.ru"; // Замените на ваш адрес электронной почты
    $subject = "Новое сообщение от $name";
    $headers = "From: $name <$email>";

    // Отправка сообщения
    if (mail($to, $subject, $message, $headers)) {
        echo "Ваше сообщение успешно отправлено.";
    } else {
        echo "Ошибка при отправке сообщения.";
    }
}
?>