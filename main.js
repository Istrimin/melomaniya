bridge.send('VKWebAppInit')
  .then((data) => { 
    if (data.result) {
      // Приложение инициализировано
    } else {
      // Ошибка
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    console.error('Детали ошиб.stringify(error));
    alert('Произошла ошибка при получении аудиозаписей: ' + error.message);
  });

  });