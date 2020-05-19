import Vue from 'vue'
import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

Vue.use(MLInstaller)

export default new MLCreate({
    initial: 'ukraine',
    save: process.env.NODE_ENV === 'production',
    languages: [
        new MLanguage('english').create({
            word: {
                engine: "engines",
                cylinders: "arrangement of cylinders",
                fuelType: "fuel type",
                superchargedType: "supercharged types",
                engineManufacture: "engine manufacturers",
                autoEngine: "auto engine",
                autoManufacturer: "car brand",
                autoModel: "auto model",
                engineNumber: "engine number",
                nameElements: "element name",
                releaseYear: "release year",
                from: "from",
                by: 'to',
                releaseYearFrom: "year issue, s",
                releaseYearBy: "year issue, to",
                action: "action",
                save: "save",
                update: "update",
                engineCapacity: "Engine capacity",
                powerKwt: "powerful, kWt",
                horsepower: "powerful, horsepower",
                degreeCompression: "degree of compression",
                cylindersNumber: "number of cylinders",
                flapNumber: "number of valves",
                pistonStroke: "piston stroke",
                pistonDiameter: "piston diameter",
                add: "add",
                file: 'file',
                name: 'name',
                units: "ed.",
                min: "min",
                max: "max",
                value: "value",
                author: 'author',
                source: "source",
                data: "data...",
                password: "password",
                changeTypeOfEngine: "the type of engine you want to change",
                login: "login",
                logout: "exit",
                language: "language",
                treeElem: "element tree",
                updateData: "data update",
                search: "search",
                dataChange: "data to change",
                newData: "new data",
                advancedSearch: "advanced search",
                clearAllField: "clear all field",
                parameter:'parameter',
                deleteR:'delete',
                changeRoot: 'select root to change',
                tree:'tree',
                loginOnButton:'login',
                choose:'choose'
            },
            msg: {
                passwordErr: 'password is required!',
                usernamedErr: 'Username is required!',
                authErr: "Authorization Error"
            }
        }),

        new MLanguage('russian').create({
            word: {
                engine: "двигатели",
                cylinders: "расположение цилиндров",
                fuelType: "вид топлива",
                superchargedType: "виды наддува",
                engineManufacture: "производители двигателей",
                autoEngine: "авто двигатель",
                autoManufacturer: "марка авто",
                autoModel: "модель авто",
                engineNumber: "номер двигателя",
                nameElements: "название элемента",
                releaseYear: "год выпуска",
                from: "от",
                by: 'до',
                releaseYearFrom: "год вып, с",
                releaseYearBy: "год вып, к",
                action: "действие",
                save: "сохранить",
                update: "обновить",
                engineCapacity: "Объем двигателя",
                powerKwt: "мощно, kWt",
                horsepower: "мощно, кон сил",
                degreeCompression: "степень зжаття",
                cylindersNumber: "кол-во цилиндров",
                flapNumber: "кол-во клапанов",
                pistonStroke: "ход поршня",
                pistonDiameter: "диаметр поршня",
                add: "добавить",
                file: 'файл',
                name: 'имя',
                units: "ед. изм ",
                min: "мин",
                max: "макс",
                value: "значение",
                author: 'автор',
                source: "источник",
                data: "данные ...",
                password: "пароль",
                changeTypeOfEngine: "тип двигателя, который хотите изменить",
                login: "войти",
                logout: "выйти",
                language: "язык",
                treeElem: "дерево элементов",
                updateData: "обновление данных",
                search: "поиск",
                dataChange: "данные для изменения",
                newData: "новые данные",
                advancedSearch: "улучшить поиск",
                clearAllField: "очистить все поля",
                parameter:'параметр',
                deleteR:'удалить',
                changeRoot: "выберите корень для изменения",
                tree:'дерево',
                loginOnButton:'авторизоваться',
                choose:'выбрать'

            },
            msg: {
                passwordErr: "Пароль необходим!",
                userNamedErr: "Имя пользователя необходимо!",
                authErr: "Ошибка авторизации"
            }
        }),

        new MLanguage('ukraine').create({
            word: {
                engine: 'двигуни',
                cylinders: 'розміщення циліндрів',
                fuelType: 'вид палива',
                superchargedType: 'види наддуву',
                engineManufacture: 'виробники двигунів',
                autoEngine: 'авто двигун',
                autoManufacturer: 'марка авто',
                autoModel: 'модель авто',
                engineNumber: 'номер двигуна',
                nameElements: 'назва елементу',
                releaseYear: 'рік випуску',
                from: 'від',
                by: 'до',
                releaseYearFrom: 'рік вип, з',
                releaseYearBy: 'рік вип, до',
                action: "дія",
                save: 'зберегти',
                update: 'обновити',
                engineCapacity: 'об\'єм двигуна',
                powerKwt: 'потуж, kWt',
                horsepower: 'потуж, кін сил',
                degreeCompression: 'ступінь зжаття',
                cylindersNumber: 'к-ть циліндрів',
                flapNumber: 'к-ть клапанів',
                pistonStroke: 'хід поршня',
                pistonDiameter: 'діаметр поршня',
                add: 'додати',
                file: 'файл',
                name: 'ім\'я',
                units: 'од. вим',
                min: 'мін',
                max: 'макс',
                value: 'значення',
                author: 'автор',
                source: 'джерело',
                data: 'дані...',
                password: 'пароль',
                changeTypeOfEngine: 'виберіть тип двигуна, який хочете змінити',
                login: 'увійти',
                logout: 'вийти',
                language: 'мова',
                treeElem: 'дерево елементів',
                updateData: 'оновлення даних',
                search: 'пошук',
                dataChange: 'дані для зміни',
                newData: 'нові дані',
                advancedSearch: 'покращити пошук',
                clearAllField: 'очистити всі поля',
                parameter:'параметр',
                deleteR:'видалити',
                changeRoot:'виберіть корінь для зміни',
                tree:'дерево',
                loginOnButton:'вхід',
                choose:'вибрати'

            },
            msg: {
                passwordErr: 'Пароль необхідний!',
                userNamedErr: 'Ім\'я користувача обов\'язкове!',
                authErr: 'Помилка авторизації'
            }

        })

    ]
})