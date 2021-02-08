
### установка последней версии vue/cli
`npm install -g @vue/cli`

### инсталляция данных
`npm install`

### собрать проект
`npm run build `


### запускаем  проект
`npm run serve -- --port 7020` здесь можете указать свой порт

### изменить api бекенда
изменить значение urlApi в таких файлах
`src/vuex/action/api-requests.js`
`src/vuex/action/api-delete.js`
`src/vuex/action/api-import.js`
`src/vuex/action/api-save-requests.js`
`src/vuex/action/api-update-requests.js`
`src/service/auth.service.js`

### ошибки с версиями node
удалить `package-lock.json`, после запустить `npm install` для инсталяции   