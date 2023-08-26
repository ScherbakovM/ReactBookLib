# Online book library 📚

Принцип работы:   
Во время загрузки клиентского приложения карточки с книгами загружаются c expres js сервера   
Можно загружать новые карточки и удалять (запросы на сервер)   
Клиентское приложение React &#9883; + Сервер Node js &#128187;   

![image](https://github.com/ScherbakovM/ReactBookLib/assets/109952823/030e4a6e-a490-4130-a09a-e676531ecc49)


Установка пакетов 
### Сборщик проектов Vite

```
 npm create vite@latest
```

### Выбираем react + js

### Сервер

В корневой дирректории создаём папку server и копируем туда фаил index.js 

```
npm install express --save
```

### В package.json добавляем скрипт для запуска сервера

```
"server": "node server/index.js -p 80"
```

![image](https://github.com/ScherbakovM/ReactBookLib/assets/109952823/a9809c38-1325-4bd3-a50b-7c0f19fedc6f)


### Axios для запросов на сервер

```
 npm install axios 
```

### Cors для предоставления доступа к серверу

```
$ npm install cors
```
