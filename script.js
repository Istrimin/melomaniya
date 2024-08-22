// Initialize VK Bridge
vkBridge.send('VKWebAppInit');

// Click Counter
let clickCount = 0;
const countDisplay = document.getElementById('click-count');
const clickButton = document.getElementById('click-button');
clickButton.addEventListener('click', () => countDisplay.textContent = ++clickCount);

// Get Audio Button
const getAudioButton = document.getElementById('get-audio-button');
const audioList = document.getElementById('audio-list');
const audioPlayer = document.getElementById('audio-player');

getAudioButton.addEventListener('click', () => {
  // Request access token
  vkBridge.send('VKWebAppGetAuthToken', {
    app_id: 52166766,
    scope: 'audio,offline' // Add more permissions as needed
  })
  .then(data => {
    if (data.access_token) {
      // Вывод токена доступа на экран
      const tokenDisplay = document.getElementById('token-display');
      tokenDisplay.textContent = `Токен доступа: ${data.access_token}`;

      // Get audio recordings
      return vkBridge.send('VKWebAppCallAPIMethod', {
        method: 'audio.get',
        params: {
          access_token: data.access_token,
          v: '5.131'
        }
      });
    } else {
      alert('Не удалось получить токен доступа. Пожалуйста, разрешите доступ к вашим аудиозаписям.');
    }
  })
  .then(audioData => {
    console.log('Audio Data:', audioData); // Log the received data
    if (audioData.response && audioData.response.items) {
      // Display the list of audio recordings
      audioList.innerHTML = '';
      audioData.response.items.forEach(audio => {
        const li = document.createElement('li');
        li.textContent = `${audio.artist} - ${audio.title}`;
        li.addEventListener('click', () => {
          audioPlayer.src = audio.url; // Устанавливаем источник для аудиоплеера
          audioPlayer.play(); // Воспроизводим аудиозапись
        });
        audioList.appendChild(li);
      });
    } else {
      console.error('Ошибка: Ответ VK API не содержит ожидаемых данных.');
      alert('Произошла ошибка при получении аудиозаписей. Пожалуйста, попробуйте позже.');
    }
  })
  .catch(error => {
    console.error('Ошибка:', error);
    console.error('Детали ошибки:', JSON.stringify(error)); // Log error details
    alert('Произошла ошибка при получении аудиозаписей: ' + error.message); 
  });
});