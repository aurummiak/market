const products = {
  accounts: [
    {
      title: "Класс. Нож  Ур.  87.72%",
      category: "premium",
      price: 5900,
      region: "Россия",
      drop: "Золотой лут",
      typeClass: "gold",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Защита", value: 285 },
        { icon: "img/tags/resistance.png", label: "Снижение урона", value: 910 }
      ],
      cover: "img/product1_1.jpg",
      images: [
        "img/product1_1.jpg",
        "img/product1_2.jpg",
        "img/product1_3.jpg"
      ],
      stats: {
        def: 0,
        reduction: 0,
        resist: 0,
        damage: 0,
        accuracy: 0
      },
      skills: [
        { name: "Канапель", a: 11, b: 11, c: 11, note: "2 скилла" },
        { name: "Марис", a: 9, b: 9, c: 9, note: "2 скилла" },
        { name: "Анаис", a: 8, b: 10, c: 8, note: "" },
        { name: "Тиада", a: 8, b: 9, c: 9, note: "" },
        { name: "Истхина", a: 8, b: 8, c: 8, note: "" },
        { name: "Экимус", a: 7, b: 7, c: 6, note: "" }
      ],
      description: "Другие Характеристики: Крит Атака 173 , Шанс Двойного Защитаа 176, Шанс Тройного Защитаа 40 , Блокировка Оружия 159, Увеличение Защитаа от Оружия 326%, Увеличение Защитаа от Умений 334%, Сопротивление Оглушению , Шанс Оглушения",
      details: ["Регион: Россия", "Класс: Titan", "Уровень: 85", "Дроп: Золотой лут"]
    },
    {
      title: "Класс. Нож  Ур.  87.72%",
      category: "ranked",
      price: 3900,
      region: "Украина",
      drop: "Красный лут",
      typeClass: "red",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],
      cover: "img/product2_1.jpg",
      images: [
        "img/product2_1.jpg",
        "img/product2_2.jpg"
      ],
      stats: {
        def: 406,
        reduction: 229,
        resist: 467,
        damage: 404,
        accuracy: 470
      },
      skills: [
        { name: "Канапель", a: 11, b: 11, c: 11, note: "2 скилла" },
        { name: "Марис", a: 9, b: 9, c: 9, note: "2 скилла" },
        { name: "Анаис", a: 8, b: 10, c: 8, note: "" },
        { name: "Тиада", a: 8, b: 9, c: 9, note: "" },
        { name: "Истхина", a: 8, b: 8, c: 8, note: "" },
        { name: "Экимус", a: 7, b: 7, c: 6, note: "" }
      ],
      description: "Магический персонаж для PvP и фарма.",
      details: ["Регион: Украина", "Класс: Archmage", "Уровень: 82", "Дроп: Красный лут"]
    },
    {
      title: "Арбалет 84,31% RU [Эрика]",
      category: "premium",
      price: 5900,
      region: "Россия",
      drop: "Золотой лут",
      typeClass: "gold",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],

      cover: "img/product1_1.jpg",
      images: [
        "img/product1_1.jpg",
        "img/product1_2.jpg",
        "img/product1_3.jpg"
      ],
      stats: {
        def: 1280,
        reduction: 740,
        resist: 920,
        damage: 1550,
        accuracy: 1180
      },
      skills: [
        { name: "Канапель", a: 11, b: 11, c: 11, note: "2 скилла" },
        { name: "Марис", a: 9, b: 9, c: 9, note: "2 скилла" },
        { name: "Анаис", a: 8, b: 10, c: 8, note: "" },
        { name: "Тиада", a: 8, b: 9, c: 9, note: "" },
        { name: "Истхина", a: 8, b: 8, c: 8, note: "" },
        { name: "Экимус", a: 7, b: 7, c: 6, note: "" }
      ],
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],
      description: "Другие Характеристики: Крит Атака 173 , Шанс Двойного Защитаа 176, Шанс Тройного Защитаа 40 , Блокировка Оружия 159, Увеличение Защитаа от Оружия 326%, Увеличение Защитаа от Умений 334%, Сопротивление Оглушению , Шанс Оглушения",
      details: ["Регион: Россия", "Класс: Titan", "Уровень: 85", "Дроп: Золотой лут"]
    },
    {
      title: "Класс. Нож  Ур.  87.72%",
      category: "ranked",
      price: 3900,
      region: "Украина",
      drop: "Красный лут",
      typeClass: "red",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],

      cover: "img/product2_1.jpg",
      images: [
        "img/product2_1.jpg",
        "img/product2_2.jpg"
      ],
      stats: {
        def: 406,
        reduction: 229,
        resist: 467,
        damage: 404,
        accuracy: 470
      },
      skills: [
        { name: "Канапель", a: 11, b: 11, c: 11, note: "2 скилла" },
        { name: "Марис", a: 9, b: 9, c: 9, note: "2 скилла" },
        { name: "Анаис", a: 8, b: 10, c: 8, note: "" },
        { name: "Тиада", a: 8, b: 9, c: 9, note: "" },
        { name: "Истхина", a: 8, b: 8, c: 8, note: "" },
        { name: "Экимус", a: 7, b: 7, c: 6, note: "" }
      ],
      description: "Магический персонаж для PvP и фарма.",
      details: ["Регион: Украина", "Класс: Archmage", "Уровень: 82", "Дроп: Красный лут"]
    },
    {
      title: "Маг 85,53% RU [леона]",
      category: "cheap",
      price: 1900,
      region: "Россия",
      drop: "Фиолетовый лут",
      typeClass: "purple",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],

      cover: "img/product3_1.jpg",
      images: [
        "img/product3_1.jpg",
        "img/product3_2.jpg",
        "img/product3_3.jpg"
      ],
      stats: {
        def: 420,
        reduction: 260,
        resist: 380,
        damage: 520,
        accuracy: 340
      },
      skills: [
        { name: "Канапель", a: 11, b: 11, c: 11, note: "2 скилла" },
        { name: "Марис", a: 9, b: 9, c: 9, note: "2 скилла" },
        { name: "Анаис", a: 8, b: 10, c: 8, note: "" },
        { name: "Тиада", a: 8, b: 9, c: 9, note: "" },
        { name: "Истхина", a: 8, b: 8, c: 8, note: "" },
        { name: "Экимус", a: 7, b: 7, c: 6, note: "" }
      ],
      description: "Бюджетный аккаунт Lineage 2 для старта.",
      details: ["Регион: Россия", "Уровень: 76", "Тип: стартовый аккаунт", "Дроп: Фиолетовый лут"]
    }
  ],

  items: [
    {
      title: "Ветер Сайхи",
      category: "premium",
      price: 4500,
      region: "Россия",
      drop: "Золотой лут",
      typeClass: "gold",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],

      cover: "img/objects/object1_1.png",
      images: [
        "img/objects/object1_2.png",
      ],
      description: "Редкий лук S-grade для персонажей дальнего боя.",
      details: ["Регион: Россия", "Тип: оружие", "Грейд: S-grade", "Дроп: Золотой лут"]
    },
    {
      title: "Перчатки Падшего Ангела",
      category: "ranked",
      price: 3600,
      region: "Украина",
      drop: "Красный лут",
      typeClass: "red",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],

      cover: "img/objects/object3_1.png",
      images: [
        "img/objects/object2_1.png",
        "img/objects/object3_2.png"
      ],
      description: "Тяжёлая броня S-grade для танков и воинов.",
      details: ["Регион: Украина", "Тип: броня", "Грейд: S-grade", "Дроп: Красный лут"]
    },
    {
      title: "+5 Перчатки из ДК",
      category: "cheap",
      price: 2500,
      region: "Россия",
      drop: "Фиолетовый лут",
      typeClass: "purple",
      cardStats: [
        { icon: "img/tags/damage.png", label: "Защита", value: 570 },
        { icon: "img/tags/accuracy.png", label: "Снижение урона", value: 430 },
        { icon: "img/tags/defence.png", label: "Сопротивление умениям", value: 690 },
        { icon: "img/tags/reduction.png", label: "Урон", value: 285 },
        { icon: "img/tags/resistance.png", label: "Точность", value: 910 }
      ],

      cover: "img/objects/object3_1.png",
      images: [
        "img/objects/object3_2.png",
        "img/objects/object3_3.png"
      ],
      description: "Пак игровой валюты для покупки экипировки и ресурсов.",
      details: ["Регион: Россия", "Тип: игровая валюта", "Передача: вручную", "Дроп: Фиолетовый лут"]
    }
  ],
  diamonds: [
    {
      title: "Покупка алмазов RU/EU",
      category: "diamonds",
      price: 1,
      region: "Россия",
      drop: "Алмазы",
      typeClass: "red",
      cover: "img/catalog/diamonds/diamonds-preview.png",
      images: [
        "img/diamonds/diamonds-cover.png"
      ],
      description: "Покупка алмазов Lineage 2. Выберите сервер, кластер и нужное количество алмазов.",
      clusters: ["Барц", "Зигхард", "Эрика", "Леона"],
      clusterServers: {
        Барц: ["Барц-1", "Барц-2", "Барц-3", "Барц-4", "Барц-5", "Барц-6"],
        Зигхард: ["Зигхард-1", "Зигхард-2", "Зигхард-3", "Зигхард-4", "Зигхард-5", "Зигхард-6"],
        Эрика: ["Эрика-1", "Эрика-2", "Эрика-3", "Эрика-4", "Эрика-5", "Эрика-6"],
        Леона: ["Леона-1", "Леона-2", "Леона-3", "Леона-4", "Леона-5", "Леона-6"]
      },
      minAmount: 0,
      maxAmount: 1000000,
      amountStep: 100,
      defaultAmount: 1000
    }
  ]
};