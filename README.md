Online book library 📚

Клиентское приложение React &#9883; + Сервер Node js &#128187;;

Установка пакетов 
### Сборщик проектов Vite

```
 npm create vite@latest
```

### Выбираем react + js

### Сервер

```
npm install express --save
```

### В package.json добавляем скрипт для запуска сервера

```
"server": "node server/index.js -p 80"
```

![image](https://github.com/ScherbakovM/ReactBookLib/assets/109952823/a9809c38-1325-4bd3-a50b-7c0f19fedc6f)


### Concurrently для одновременного запуска приложений

```
npm install concurrently
```

### Добавляем скрипт для одновременного запуска express js server и react app 

```
"start": "concurrently \"npm run dev\" \"npm run server\"",
```

### Axios для запросов на сервер

```
 npm install axios 
```
