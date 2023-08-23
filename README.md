# Online book library 📚

Клиентское приложение React &#9883; + Сервер Node js &#128187;

![image](https://github.com/ScherbakovM/ReactBookLib/assets/109952823/e59ced63-dcc6-4f21-854b-aac0d1c4420c)


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


### Concurrently для одновременного запуска приложений

```
npm install concurrently
```


### Добавляем скрипт для одновременного запуска express js и react app 

```
"start": "concurrently \"npm run dev\" \"npm run server\"",
```

![image](https://github.com/ScherbakovM/ReactBookLib/assets/109952823/5f57ee97-58e3-4ea0-887e-904384b595df)

### Axios для запросов на сервер

```
 npm install axios 
```
