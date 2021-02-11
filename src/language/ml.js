        import Vue from 'vue'
        import {MLInstaller, MLCreate, MLanguage} from 'vue-multilanguage'

        Vue.use(MLInstaller)

        export default new MLCreate({
            initial: 'poland',
            save: process.env.NODE_ENV === 'production',
            languages: [
                // eslint-disable-next-line no-undef

                new MLanguage('english').create({
                    word: {
                        table: 'table',
                        showPhoto: 'show images',
                        titlePhoto: 'photo gallery',
                        selectSearchPercent: 'select percent: ',
                        editing: 'editing',
                        text: "text",
                        yes: 'yes',
                        no: 'no',
                        paramSizeName: "repair dimensions",
                        number: "number",
                        range: "range",
                        engine: "engine type",
                        type: "type",
                        row: 'row',
                        registration: 'registration',
                        cylinders: "cylinders",
                        fuelType: "fuel type",
                        superchargedType: "supercharged types",
                        engineManufacture: "en. manufacturer",
                        autoEngine: "auto engine",
                        autoManufacturer: "car brand",
                        autoModel: "auto model",
                        engineNumber: "engine number",
                        empty: "empty",
                        nameElements: "element name",
                        releaseYear: "release year",
                        from: "from",
                        by: 'to',
                        releaseYearFrom: "year issue, s",
                        releaseYearBy: "year issue, to",
                        action: "action",
                        save: "save",
                        update: "update",
                        diamAndStroke: "Diam.cyl x piston st.",
                        engineCapacity: "Engine capacity",
                        powerKwt: "powerful, kWt",
                        horsepower: "powerful, horsepower",
                        degreeCompression: "degree of compression",
                        cylindersNumber: "number of cylinders",
                        flapNumber: "number of valves",
                        pistonStroke: "piston stroke",
                        pistonDiameter: "piston diameter",
                        add: "add",
                        confirm: "confirm",
                        file: 'file',
                        name: 'name',
                        units: "ed.",
                        min: "min",
                        max: "max",
                        color: 'color',
                        value: "value",
                        author: 'author',
                        confirmed: "confirmed",
                        source: "source",
                        data: "data...",
                        password: "password",
                        changeTypeOfEngine: "the type of engine you want to change",
                        login: "login",
                        logout: "exit",
                        selectBlock: "wybierz podzespoły: ",
                        language: "language",
                        filter: "filter",
                        treeElem: "element tree",
                        updateData: "directories",
                        search: "search",
                        dataChange: "data to change",
                        newData: "new data",
                        advancedSearch: "advanced search",
                        clearAllField: "clear all field",
                        parameter: 'parameter',
                        deleteR: 'delete',
                        changeRoot: 'select root to change',
                        tree: 'tree',
                        loginOnButton: 'login',
                        choose: 'choose',
                        title: 'name',
                        numRowOnPage: 'num. row: ',
                        mark: 'mark',
                        newBlockText: 'add new block',
                        status: 'status',
                        downlandBlank: 'downland blank',
                        shortName: 'short name',
                        clearAllFilter: 'clear all filter',
                        cancel: 'cancel',
                        addRow: 'add row',
                        dataAddSuccess: 'data added successfully',
                        fullName: 'full name',
                        importFile: 'import',
                        exportFile: 'export file',
                        clickToUpload: "click to upload",
                        column: "columns",
                        parameters: 'parameters',
                        setParameter: 'change parameters',
                        rows: ' row(s)',
                        inccYear: 'You entered the year incorrectly',
                        treeStruct: 'tree structure',
                        tableAutoHeader: 'Vehicle data',
                        tableParamHeader: 'Processing parameters',
                        tableFooterText: 'I am acquainted with and agree with the processing parameters',
                        signature: 'signature',
                        date: 'date',
                        client: 'client:',
                        noRecordsInDB: 'there are no records in the database'

                    },
                    msg: {
                        userRegist: "A message was sent to the mail to confirm the account. Open the message and follow the link",

                        alertParamWarn: "warning",
                        inNextParam: "New entries will be created in the following parameters: ",
                        passwordErr: 'password is required!',
                        usernamedErr: 'Username is required!',
                        colorAdd: "color changed",
                        deleteSuccess: 'removal was successful',
                        chooseColor: 'select element from the tree to change the color',
                        authErr: "Authorization Error",
                        confirmEmail: "Your account has been verified. You can go to the login page and log in.",
                        wrongMatchPass: "password does not match",
                        deleteConfirm: "Are you sure to delete this?",
                        tableHeader: 'Parameters of processing before the change #',
                        colorConfirmMsg: "do you want to change  the color of all child components of this element?",
                        duplicateValue: 'duplicate value'
                    },
                    errPage: {
                        logoText: 'error',

                        oopsRow: 'Oops! This page Could Not Be Found!',
                        deleteErr: 'first remove dependent items',
                        SorryRow: 'Sorry bit the page you are looking for does not exist, have been removed or name changed.',
                        buttonText: 'Go to homepage'
                    }
                }),

                new MLanguage('russian').create({
                    word: {
                        text: "текст",
                        number: "число",
                        selectSearchPercent: 'выберите процент: ',
                        range: "диапазон",
                        confirm: "Подтвердить",
                        confirmed: "подтверждено",
                        selectBlock: "виберіть блок:  ",
                        type: "тип",
                        yes: 'да',
                        no: 'нет',
                        table: 'таблица',
                        engine: "тип двигателя",
                        numRowOnPage: 'кол-во строк: ',
                        cylinders: "цилиндры",
                        fuelType: "вид топлива",
                        superchargedType: "виды наддува",
                        engineManufacture: "пр. двигателей",
                        autoEngine: "авто двигатель",
                        autoManufacturer: "марка авто",
                        autoModel: "модель авто",
                        registration: 'регистрация',
                        titlePhoto: 'фото галерея',
                        engineNumber: "номер двигателя",
                        nameElements: "название элемента",
                        releaseYear: "год выпуска",
                        from: "от",
                        empty: "пусто",

                        editing: 'редактарование',
                        by: 'до',
                        releaseYearFrom: "год вып, с",
                        downlandBlank: 'скачать бланк',
                        releaseYearBy: "год вып, к",
                        action: "действие",
                        save: "добавить запись",
                        update: "обновить",
                        diamAndStroke: "Диам.цил х ход.порш.",
                        engineCapacity: "Объем двигателя",
                        powerKwt: "мощн. kWt",
                        horsepower: "мощн. кон сил",
                        degreeCompression: "степень зжаття",
                        cylindersNumber: "кол-во цилиндров",
                        flapNumber: "кол-во клапанов",
                        pistonStroke: "ход поршня",
                        pistonDiameter: "диаметр цил.",
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
                        paramSizeName: "ремонтные размеры",
                        password: "пароль",
                        changeTypeOfEngine: "тип двигателя, который хотите изменить",
                        login: "войти",
                        logout: "выйти",
                        language: "язык",
                        treeElem: "дерево элементов",
                        updateData: "справочники",
                        search: "поиск",
                        dataChange: "данные для изменения",
                        newData: "новые данные",
                        advancedSearch: "улучшить поиск",
                        clearAllField: "очистить все поля",
                        parameter: 'параметр',
                        parameters: 'параметры',
                        deleteR: 'удалить',
                        addRow: 'добавить строку',
                        changeRoot: "выберите корень для изменения",
                        tree: 'дерево',
                        loginOnButton: 'авторизоваться',
                        choose: 'выбрать',
                        title: 'название',
                        mark: "Обозначение",
                        filter: "фильтр",
                        clearAllFilter: 'очистить фильтры',
                        newBlockText: 'добавить новый блок',
                        status: 'статус',
                        shortName: 'короткое назание',
                        cancel: 'Отмена',
                        dataAddSuccess: 'данные успешно добавлены',
                        fullName: 'полное название',
                        importFile: 'импорт',
                        showPhoto: 'показать изображения',
                        exportFile: 'экспортировать файл',
                        rows: ' шт.',
                        row: 'ряд',
                        clickToUpload: "нажмите, чтобы загрузить",
                        column: "столбцы",
                        inccYear: 'Вы некорректно ввели год',
                        treeStruct: 'структура дерева',
                        setParameter: 'изменение параметров',
                        noRecordsInDB: 'в базе нет записей',
                        tableAutoHeader: 'Данные автомобиля',
                        tableHeader: 'Параметры обробки до замовлення №',
                        tableParamHeader: 'Параметры обработки',
                        tableFooterText: 'С параметрами обработки ознакомлен и согласен',
                        signature: 'Підпис',
                        date: 'Дата',
                        client: 'Ф.И.О.',
                        color: 'цвет'
                    },
                    msg: {
                        alertParamWarn: "предупреждение",
                        passwordErr: "Пароль необходим!",
                        inNextParam: "В следующих параметрах будут созданы новые записи: ",
                        colorAdd: "цвет изменен",
                        deleteSuccess: 'удаление прошло успешно',
                        chooseColor: 'для изменения цвета выберите элемент из дерева',
                        userNamedErr: "Имя пользователя необходимо!",
                        wrongMatchPass: "пароль  не совпадает",
                        authErr: "Ошибка авторизации",
                        deleteConfirm: "Вы действительно хотите удалить это?",
                        confirmEmail: "Ваша учетная запись была подтверждена. Можете перейти на страницу входа, и авторизоваться.",
                        colorConfirmMsg: "вы хотите изменить цвет всех дочерних компонентов этого элемента?",
                        userRegist: "Для подтверждения учетной записина на  почту было выслано сообщения. Откройте сообщение и перейдите по ссылке",
                        duplicateValue: 'дублированное значение'
                    },
                    errPage: {
                        logoText: 'ошибка',
                        oopsRow: "Ой! Эту страницу не удалось найти!",
                        deleteErr: 'вначале удалите зависимые элементы',
                        SorryRow: 'К сожалению, искомая страница не существует, была удалена или изменено имя.',
                        buttonText: 'Перейти на домашнюю страницу'
                    }
                }),

                new MLanguage('ukraine').create({
                    word: {
                        parameters: 'параметри',
                        type: "тип",
                        row: 'рядок',
                        showPhoto: 'показати зображення',
                        selectSearchPercent: 'виберіть відсоток: ',
                        text: "текст",
                        yes: 'так',
                        no: 'ні',
                        number: "число",
                        color: 'колір',
                        editing: 'редагування',
                        numRowOnPage: 'к-cть рядків: ',
                        selectBlock: "выберите блок: ",
                        paramSizeName: "ремонтні розміри",
                        confirm: "Підтвердити",
                        range: "діапазон",
                        registration: 'реєстрація',
                        table: 'таблиця',
                        engine: 'тип двигуна',
                        cylinders: 'циліндри',
                        fuelType: 'вид палива',
                        addRow: 'додати рядок',
                        superchargedType: 'види наддуву',
                        engineManufacture: 'вир. двигунів',
                        autoEngine: 'авто двигун',
                        autoManufacturer: 'марка авто',
                        autoModel: 'модель авто',
                        engineNumber: 'номер двигуна',
                        downlandBlank: 'скачати бланк',
                        rows: ' шт.',
                        nameElements: 'назва елементу',
                        releaseYear: 'рік випуску',
                        titlePhoto: 'фото галерея',
                        from: 'від',
                        by: 'до',
                        releaseYearFrom: 'рік вип, з',
                        releaseYearBy: 'рік вип, до',
                        action: "дія",
                        save: 'додати запис',
                        update: 'обновити',
                        diamAndStroke: "Диам.цил х\n хід.порш.",
                        engineCapacity: 'об\'єм двигуна',
                        powerKwt: 'потуж, kWt',
                        horsepower: 'потуж, кін сил',
                        degreeCompression: 'ступінь зжаття',
                        cylindersNumber: 'к-ть циліндрів',
                        flapNumber: 'к-ть клапанів',
                        pistonStroke: 'хід поршня',
                        empty: "порожньо",
                        filter: "фільтр",
                        pistonDiameter: 'діаметр цил.',
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
                        updateData: 'довідники',
                        search: 'пошук',
                        dataChange: 'дані для зміни',
                        newData: 'нові дані',
                        advancedSearch: 'покращити пошук',
                        clearAllField: 'очистити всі поля',
                        clearAllFilter: 'очистити всі фільтри',
                        parameter: 'параметр',
                        deleteR: 'видалити',
                        changeRoot: 'виберіть корінь для зміни',
                        tree: 'дерево',
                        loginOnButton: 'вхід',
                        choose: 'вибрати',
                        title: 'назва',
                        mark: 'Позначення',
                        newBlockText: 'додати новий блок',
                        status: 'статус',
                        shortName: 'коротка назва',
                        cancel: 'скасувати',
                        dataAddSuccess: 'дані успішно додані',
                        confirmed: "підтверджено",
                        fullName: 'повна назва',
                        importFile: 'імпорт',
                        exportFile: 'експортувати файл',
                        clickToUpload: "натисніть для завантаження",
                        column: "стовпці",
                        tableHeader: 'Параметри ОБРОБКИ до замовлення №',
                        treeStruct: 'структура дерева',
                        setParameter: 'зміна параметрів',
                        tableAutoHeader: 'Дані автомобіля',
                        inccYear: 'Ви некоректно ввели рік',
                        tableParamHeader: 'Параметри обробки',
                        tableFooterText: 'З параметрами обробки ознайомлений та згоден',
                        signature: 'Підпис',
                        client: 'П.І.Б',
                        date: 'Дата',
                        noRecordsInDB: 'в базі немає записів'
                    },
                    msg: {
                        alertParamWarn: "попередження",
                        inNextParam: "У наступних параметрах будуть створені нові записи: ",
                        passwordErr: 'Пароль необхідний!',
                        chooseColor: 'для зміни кольору виберіть елемент з дерева',
                        userNamedErr: 'Ім\'я користувача обов\'язкове!',
                        colorAdd: "колір змінений",
                        wrongMatchPass: "не збігається пароль",
                        authErr: 'Помилка авторизації',
                        userRegist: "Для підтвердження облікової запісіна на пошту було вислано повідомлення. Відкрийте повідомлення та перейдіть за посиланням",
                        deleteConfirm: "Ви впевнені, що хочете видалити це?",
                        deleteSuccess: 'видалення пройшло успішно',
                        colorConfirmMsg: "ви хочете змінити колір всіх дочірніх компонентів цього елемента?",
                        confirmEmail: "Ваш обліковий запис була підтверджена. Можете перейти на сторінку входу, і авторизуватися.",
                        duplicateValue: 'повторюване значення',
                        formatIsIncorrect: "Формат вкладених файлів невірний. Видаліть і повторно завантажте!"
                    },
                    errPage: {
                        logoText: 'помилка',
                        oopsRow: "На жаль! Цю сторінку не вдалося знайти! ",
                        deleteErr: 'спочатку видаліть залежні елементи',
                        SorryRow: "Вибачте, що сторінки, яку ви шукаєте, не існує, її видалено або змінено ім'я.",
                        buttonText: "Перейти на головну сторінку"
                    }

                }),
                new MLanguage('poland').create({
                    word: {
                        parameters: 'parametry',
                        type: "typ",
                        row: 'rząd',
                        showPhoto: 'pokaż zdjęcia',
                        selectSearchPercent: 'precyzja : ',
                        text: "tekst",
                        yes: 'tak',
                        no: 'nie',
                        number: "numer",
                        color: 'kolor',
                        editing: 'edytować',
                        numRowOnPage: 'ilość rzędów: ',
                        selectBlock: "wybierz podzespoły: ",
                        paramSizeName: "wymiary napraw",
                        confirm: "potwierdzenie",
                        range: "zakres",
                        registration: 'rejestracja',
                        table: 'tabela',
                        engine: 'kod silnika',
                        cylinders: 'cylindry',
                        fuelType: 'rodzaj paliwa ',
                        addRow: 'dodaj linię',
                        superchargedType: 'typ turbosprężarki ',
                        engineManufacture: 'producent silnika',
                        autoEngine: 'silnik',
                        autoManufacturer: 'marka pojazdu',
                        autoModel: 'model',
                        engineNumber: 'numer silnika ',
                        downlandBlank: 'pobierz arkusz',
                        rows: ' szt.',
                        nameElements: 'nazwa',
                        releaseYear: 'rocznik',
                        titlePhoto: 'galeria zdjęć',
                        from: 'od',
                        by: 'do ',
                        releaseYearFrom: 'rocznik, od',
                        releaseYearBy: 'rocznik, do ',
                        action: "akcja",
                        save: 'dodaj notatkę',
                        update: 'aktualizacja',
                        diamAndStroke: "średnica X\n skok ",
                        engineCapacity: 'pojemność',
                        powerKwt: 'moc kWt',
                        horsepower: 'moc Km',
                        degreeCompression: 'stopień kompresji',
                        cylindersNumber: 'ilość cylindrów',
                        flapNumber: 'ilość zaworów',
                        pistonStroke: 'skok',
                        empty: "pusty",
                        filter: "oznaczenie",
                        pistonDiameter: 'średnica cylindra',
                        add: 'dodaj',
                        file: 'plik',
                        name: 'nazwa',
                        units: 'jednostka miary',
                        min: 'min',
                        max: 'max',
                        value: 'wielkość',
                        author: 'autor',
                        source: 'źródło informacji',
                        data: 'dane...',
                        password: 'hasło',
                        changeTypeOfEngine: 'typ silnika do zmiany',
                        login: 'Zaloguj',
                        logout: 'Wyloguj',
                        language: 'język',
                        treeElem: 'drzewo elementów',
                        updateData: 'informator',
                        search: 'szukaj',
                        dataChange: 'dane do zmiany',
                        newData: 'nowe dane',
                        advancedSearch: 'usprawnić wyszukiwanie',
                        clearAllField: 'wyczyść wszystkie pola',
                        clearAllFilter: 'wyczyść filtry',
                        parameter: 'parametr',
                        deleteR: 'usunąć',
                        changeRoot: 'wybierz root dla zmian',
                        tree: 'drzewo',
                        loginOnButton: 'Zaloguj sie',
                        choose: 'wybierać',
                        title: 'nazwa',
                        mark: 'znak',
                        newBlockText: 'dodaj nowy blok',
                        status: 'status',
                        shortName: 'krótka nazwa',
                        cancel: 'Anulowanie',
                        dataAddSuccess: 'dane dodane pomyślnie',
                        confirmed: "підтверджено",
                        fullName: 'pełna nazwa ',
                        importFile: 'import',
                        exportFile: 'eksportuj plik',
                        clickToUpload: "kliknij, aby pobrać",
                        column: "kolumny",
                        treeStruct: 'struktura drzewa',
                        tableHeader: 'Parametry przetwarzania na zlecenie №',
                        tableAutoHeader: 'Dane pojazdu',
                        setParameter: 'Zmień parametry',
                        inccYear: 'Niepoprawnie wprowadzony rok',
                        tableParamHeader: 'Parametry przetwarzania',
                        tableFooterText: 'Przeczytałem i zgadzam się z parametrami przetwarzania',
                        signature: 'Podpis',
                        date: 'Data  ',
                        client: 'Klient',
                        noRecordsInDB: 'w bazie danych nie ma żadnych rekordów'
                    },
                    msg: {
                        alertParamWarn: "ostrzeżenie",
                        inNextParam: "Nowe wpisy zostaną utworzone w następujących parametrach: ",
                        passwordErr: 'Wymagane jest hasło!',
                        chooseColor: 'wybierz element drzewa, aby zmienić kolor',
                        userNamedErr: 'Wymagana jest nazwa użytkownika!',
                        colorAdd: "kolor został zmieniony",
                        wrongMatchPass: "hasło nie pasuje",
                        userRegist: "Wiadomość została wysłana na pocztę, aby potwierdzić konto. Otwórz wiadomość i kliknij łącze",
                        authErr: 'Błąd autoryzacji',
                        deleteConfirm: "Czy na pewno chcesz usunąć ten element?",
                        deleteSuccess: 'usunięcie powiodło się',
                        colorConfirmMsg: "zmienić kolor wszystkich podrzędnych komponentów danego elementu?",
                        confirmEmail: "Twoje konto zostało zweryfikowane. Możesz przejść do strony logowania i zalogować się.",
                        duplicateValue: 'powtarzana wartość',
                        formatIsIncorrect: "Format załącznika jest nieprawidłowy. Usuń i załaduj ponownie!"
                    },
                    errPage: {
                        logoText: 'Błąd autoryzacji',
                        oopsRow: "Nie można znaleźć tej strony ",
                        deleteErr: 'najpierw usuń elementy zależne',
                        SorryRow: "Przepraszamy, strona, której szukasz, nie istnieje, została usunięta lub jej nazwa została zmieniona",
                        buttonText: "Wróć do strony głównej"
                    }

                })
            ]
        })