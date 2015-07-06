/**
 * Created by Victor on 24/04/2015.
 */
var attributes = {
        smartphones: ['cpu', 'ram', 'internalStorage', 'externalStorage', 'connectivity', 'pixelDensity', 'HDLevel', 
                      'screenSize', 'weight', 'price', 'batteryCapacity', 'batteryTalkTime', 'camera', 'frontCamera'],
        tablets: ['cpu', 'ram', 'internalStorage', 'externalStorage', 'connectivity', 'pixelDensity', 'screenSize', 
                  'weight', 'price', 'batteryCapacity', 'camera', 'frontCamera'],
        laptops: ['cpu', 'ram', 'hardDrive', 'sound', 'screenResolution', 'screenSize', 'weight', 
                  'price', 'batteryLife', 'graphicsMemory', 'graphicsSpeed']
    };

var action1 = {
        smartphones: ['games', 'download', 'phonecalls', 'surfWeb', 'socialNetwork', 
                      'takePhotos', 'price', 'weight', 'batteryCapacity', 'screenSize'],
        tablets: ['games', 'download', 'movies', 'readEBooks', 'surfWeb', 'socialNetwork', 'price',
                  'weight', 'batteryCapacity', 'screenSize', 'takePhotos'],
        laptops: ['games', 'music', 'download', 'movies', 'wordProcessing', 'graphicsHandling',
                  'price', 'weight', 'batteryLife', 'screenSize']
    };

var action = {};

var getActions = function (language) {
    var EN = language === 'english' ? true : false;

    var acts = {
        smartphones: [{
            id: 'games',
            name: EN ? 'Games' : 'Juegos',
            upperbound: EN ? 'High Quality Games' : 'Juegos con buena calidad de graficos',
            lowerbound: EN ? 'Low Quality Games' : 'Juegos con baja calidad de graficos'
        }, {
            id: 'download',
            name: EN ? 'Download Frequency' : 'Frecuencia de descarga',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'phonecalls',
            name: EN ? 'Calls Frequency' : 'Frecuencia de llamadas',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'surfWeb',
            name: EN ? 'Internet Use' : 'Navegar por internet',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'socialNetwork',
            name: EN ? 'Social Networks Use' : 'Uso de Redes Sociales',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'takePhotos',
            name: EN ? 'Camera Resolution' : 'Resolución de cámara',
            upperbound: '12 Mpx',
            lowerbound: 'VGA'
        }, {
            id: 'price',
            name: EN ? 'Price' : 'Precio',
            upperbound: '1025 $',
            lowerbound: '150 $'
        }, {
            id: 'weight',
            name: EN ? 'Weight' : 'Peso',
            upperbound: '191 g',
            lowerbound: '91 g'
        }, {
            id: 'batteryCapacity',
            name: EN ? 'Battery Life' : 'Duración batería',
            upperbound: '20 h',
            lowerbound: '3 h'
        }, {
            id: 'screenSize',
            name: EN ? 'Screen Size' : 'Tamaño de la pantalla',
            upperbound: '5.8"',
            lowerbound: '3.3"'
        }],
        tablets: [{
            id: 'games',
            name: EN ? 'Games' : 'Juegos',
            upperbound: EN ? 'High Quality Games' : 'Juegos con buena calidad de graficos',
            lowerbound: EN ? 'Low Quality Games' : 'Juegos con baja calidad de graficos'
        }, {
            id: 'download',
            name: EN ? 'Download Frequency' : 'Frecuencia de descarga',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'movies',
            name: EN ? 'Watching Movies' : 'Ver peliculas',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'readEBooks',
            name: EN ? 'Reading Electronic Books' : 'Leer libros electrónicos',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'surfWeb',
            name: EN ? 'Internet Use' : 'Navegar por internet',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'socialNetwork',
            name: EN ? 'Social Networks Use' : 'Uso de redes sociales',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'price',
            name: EN ? 'Price' : 'Precio',
            upperbound: '2800 $',
            lowerbound: '200 $'
        }, {
            id: 'weight',
            name: EN ? 'Weight' : 'Peso',
            upperbound: '1150 g',
            lowerbound: '97 g'
        }, {
            id: 'batteryCapacity',
            name: EN ? 'Battery Life' : 'Duración de la Batería',
            upperbound: '15 h',
            lowerbound: '3 h'
        }, {
            id: 'screenSize',
            name: EN ? 'Screen Size' : 'Tamaño de la pantalla',
            upperbound: '13"',
            lowerbound: '3"'
        }, {
            id: 'takePhotos',
            name: EN ? 'Camera Resolution' : 'Resolución de la cámara',
            upperbound: '8.5 Mpx',
            lowerbound: '1 Mpx'
        }],
        laptops: [{
            id: 'games',
            name: EN ? 'Games' : 'Juegos',
            upperbound: EN ? 'High Quality Games' : 'Juegos con buena calidad de graficos',
            lowerbound: EN ? 'Low Quality Games' : 'Juegos con baja calidad de graficos'
        }, {
            id: 'music',
            name: EN ? 'Sound Quality' : 'Calidad de sonido',
            upperbound: EN ? 'High Sound Quality' : 'Alta calidad de sonido',
            lowerbound: EN ? 'Low Sound Quality' : 'Baja calidad de sonido'
        }, {
            id: 'download',
            name: EN ? 'Download Frequency' : 'Frecuencia de descarga',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'movies',
            name: EN ? 'Watching Movies' : 'Ver peliculas',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'wordProcessing',
            name: 'Write Documents',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'graphicsHandling',
            name: 'Graphic Design & Video Edition',
            upperbound: EN ? 'Very Often' : 'Muy frecuente',
            lowerbound: EN ? 'Hardly Ever' : 'Rara Vez'
        }, {
            id: 'price',
            name: EN ? 'Price' : 'Precio',
            upperbound: '2900 $',
            lowerbound: '400 $'
        }, {
            id: 'weight',
            name: EN ? 'Weight' : 'Peso',
            upperbound: '3500 g',
            lowerbound: '1500 g'
        }, {
            id: 'batteryCapacity',
            name: EN ? 'Battery Life' : 'Duración de la Batería',
            upperbound: '15 h',
            lowerbound: '2.5 h'
        }, {
            id: 'screenSize',
            name: EN ? 'Screen Size' : 'Tamaño de la pantalla',
            upperbound: '17.5"',
            lowerbound: '10"'
        }]
    };

    action = acts;
    return acts;
};

var labels = {
    spanish: {
        appTitle: 'RECOMENDADOR DE DISPOSITIVOS',
        lookFor: 'Estas buscando...',
        laptops: 'Computadoras portatiles',
        smartPhones: 'Telefonos Inteligentes',
        options: 'Opciones',
        exit: 'Salir',

        changeLanguage: 'Cambiar Idioma',
        changeTheme: 'Cambiar Color',

        languages: 'Idiomas',
        english: 'Ingles',
        spanish: 'Español',
        select: 'Seleccionar',
        cancel: 'Cancelar',

        theme: 'Colores',

        brands: 'Marcas',
        backToMain: 'Volver al Menu',
        next: 'Siguiente',

        scores: 'Puntuaciones',
        process: 'Procesar',
        processing: 'Procesando...',

        results: 'Dispositivos recomendados',
        moreDetails: 'Mas detalles',

        details: 'Detalles'
    },
    english: {
        appTitle: 'DEVICE RECOMMENDER',
        lookFor: 'Looking for...',
        laptops: 'Laptops',
        smartPhones: 'Smart Phones',
        options: 'Options',
        exit: 'Exit',

        changeLanguage: 'Change Language',
        changeTheme: 'Change Theme',

        languages: 'Laguages',
        english: 'English',
        spanish: 'Spanish',
        select: 'Select',
        cancel: 'Cancel',

        theme: 'Themes',

        brands: 'Brands',
        backToMain: 'Back To Main',
        next: 'Next',

        scores: 'Scores',
        process: 'Process',
        processing: 'Processing...',

        results: 'Recommended Devices',
        moreDetails: 'More Details',

        details: 'Details'
    }
};

var map = [
            { n1:0, n2:1, n3:2 }, // Very Low   (VL)
            { n1:1, n2:2, n3:3 }, // Low        (L)
            { n1:2, n2:3, n3:4 }, // Medium Low (ML)
            { n1:3, n2:4, n3:5 }, // Medium     (M)
            { n1:4, n2:5, n3:6 }, // Medium High(MH)
            { n1:5, n2:6, n3:7 }, // High       (H)
            { n1:6, n2:7, n3:8 }  // Very High  (VH)
        ];

var comparizonRanges = {
        smartphones: {
            cpuSpeed: [
                {                 upperBound: 0.9},
                {lowerBound: 0.9, upperBound: 1.1},
                {lowerBound: 1.1, upperBound: 1.3},
                {lowerBound: 1.3, upperBound: 1.5},
                {lowerBound: 1.5, upperBound: 1.7},
                {lowerBound: 1.7, upperBound: 1.9},
                {lowerBound: 1.9}
            ],
            cpuCores: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 2},
                {lowerBound: 2, upperBound: 3},
                {lowerBound: 3, upperBound: 5},
                {lowerBound: 5, upperBound: 7},
                {lowerBound: 7, upperBound: 9},
                {lowerBound: 9}
            ],
            ram: [
                {               upperBound: 373},
                {lowerBound: 373, upperBound: 745},
                {lowerBound: 745, upperBound: 1117},
                {lowerBound: 1117, upperBound: 1489},
                {lowerBound: 1489, upperBound: 1861},
                {lowerBound: 1861, upperBound: 2233},
                {lowerBound: 2233}
            ],
            internalStorage: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 2},
                {lowerBound: 2, upperBound: 4},
                {lowerBound: 4, upperBound: 8},
                {lowerBound: 8, upperBound: 16},
                {lowerBound: 16, upperBound: 32},
                {lowerBound: 32}
            ],
            externalStorage: [
                {               upperBound: 2},
                {lowerBound: 2, upperBound: 4},
                {lowerBound: 4, upperBound: 8},
                {lowerBound: 8, upperBound: 16},
                {lowerBound: 16, upperBound: 32},
                {lowerBound: 32, upperBound: 64},
                {lowerBound: 64}
            ],
            connectivity: ['', '2g', '2,5g', '3g', '3.5g', '4g', ''],
            pixelDensity: [
                {               upperBound: 207},
                {lowerBound: 207, upperBound: 259},
                {lowerBound: 259, upperBound: 311},
                {lowerBound: 311, upperBound: 363},
                {lowerBound: 363, upperBound: 415},
                {lowerBound: 415, upperBound: 467},
                {lowerBound: 467}
            ],
            HDLevel: ['', '0','720', '', '1080', '', '2k'],
            screenSize: [
                {               upperBound: 3.3},
                {lowerBound: 3.3, upperBound: 3.8},
                {lowerBound: 3.8, upperBound: 4.3},
                {lowerBound: 4.3, upperBound: 4.8},
                {lowerBound: 4.8, upperBound: 5.3},
                {lowerBound: 5.3, upperBound: 5.8},
                {lowerBound: 5.8}
            ],
            weight: [
                {               upperBound: 91},
                {lowerBound: 91, upperBound: 111},
                {lowerBound: 111, upperBound: 131},
                {lowerBound: 131, upperBound: 151},
                {lowerBound: 151, upperBound: 171},
                {lowerBound: 171, upperBound: 191},
                {lowerBound: 191}
            ],
            price: [
                {               upperBound: 150},
                {lowerBound: 150, upperBound: 325},
                {lowerBound: 325, upperBound: 500},
                {lowerBound: 500, upperBound: 675},
                {lowerBound: 675, upperBound: 850},
                {lowerBound: 850, upperBound: 1025},
                {lowerBound: 1025}
            ],
            batteryCapacity: [
                {               upperBound: 861},
                {lowerBound: 861, upperBound: 1306},
                {lowerBound: 1306, upperBound: 1751},
                {lowerBound: 1751, upperBound: 2196},
                {lowerBound: 2196, upperBound: 2641},
                {lowerBound: 2641, upperBound: 3086},
                {lowerBound: 3086}
            ],
            batteryTalkTime: [
                {               upperBound: 3},
                {lowerBound: 3, upperBound: 8},
                {lowerBound: 8, upperBound: 13},
                {lowerBound: 13, upperBound: 18},
                {lowerBound: 18, upperBound: 23},
                {lowerBound: 23, upperBound: 28},
                {lowerBound: 28}
            ],
            camera: [
                {               upperBound: 3},
                {lowerBound: 3, upperBound: 6},
                {lowerBound: 6, upperBound: 7},
                {lowerBound: 7, upperBound: 12},
                {lowerBound: 12, upperBound: 15},
                {lowerBound: 15, upperBound: 18},
                {lowerBound: 18}
            ],
            frontCamera: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 2},
                {lowerBound: 2, upperBound: 3},
                {lowerBound: 3, upperBound: 4},
                {lowerBound: 4, upperBound: 5},
                {lowerBound: 5, upperBound: 6},
                {lowerBound: 6}
            ]
        },
        tablets: {
            cpuSpeed: [
                {                 upperBound: 0.9},
                {lowerBound: 0.9, upperBound: 1.1},
                {lowerBound: 1.1, upperBound: 1.3},
                {lowerBound: 1.3, upperBound: 1.5},
                {lowerBound: 1.5, upperBound: 1.7},
                {lowerBound: 1.7, upperBound: 1.9},
                {lowerBound: 1.9}
            ],
            cpuCores: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 2},
                {lowerBound: 2, upperBound: 3},
                {lowerBound: 3, upperBound: 5},
                {lowerBound: 5, upperBound: 7},
                {lowerBound: 7, upperBound: 9},
                {lowerBound: 9}
            ],
            ram: [
                {               upperBound: 1000},
                {lowerBound: 1000, upperBound: 1400},
                {lowerBound: 1400, upperBound: 1800},
                {lowerBound: 1800, upperBound: 2200},
                {lowerBound: 2200, upperBound: 2600},
                {lowerBound: 2600, upperBound: 3000},
                {lowerBound: 3000}
            ],
            internalStorage: [
                {               upperBound: 2},
                {lowerBound: 2, upperBound: 5},
                {lowerBound: 5, upperBound: 11},
                {lowerBound: 11, upperBound: 21},
                {lowerBound: 21, upperBound: 33},
                {lowerBound: 33, upperBound: 64},
                {lowerBound: 64}
            ],
            externalStorage: [
                {               upperBound: 4},
                {lowerBound: 4, upperBound: 9},
                {lowerBound: 9, upperBound: 17},
                {lowerBound: 17, upperBound: 33},
                {lowerBound: 33, upperBound: 65},
                {lowerBound: 65, upperBound: 128},
                {lowerBound: 128}
            ],
            connectivity: ['', '2g', '2,5g', '3g', '3.5g', '4g', ''],
            pixelDensity: [
                {               upperBound: 164},
                {lowerBound: 164, upperBound: 199},
                {lowerBound: 199, upperBound: 234},
                {lowerBound: 234, upperBound: 269},
                {lowerBound: 269, upperBound: 304},
                {lowerBound: 304, upperBound: 339},
                {lowerBound: 339}
            ],
            screenSize: [
                {               upperBound: 3},
                {lowerBound: 3, upperBound: 5},
                {lowerBound: 5, upperBound: 7},
                {lowerBound: 7, upperBound: 9},
                {lowerBound: 9, upperBound: 11},
                {lowerBound: 11, upperBound: 13},
                {lowerBound: 13}
            ],
            weight: [
                {               upperBound: 97},
                {lowerBound: 97, upperBound: 249},
                {lowerBound: 249, upperBound: 401},
                {lowerBound: 401, upperBound: 553},
                {lowerBound: 553, upperBound: 801},
                {lowerBound: 801, upperBound: 1150},
                {lowerBound: 1150}
            ],
            price: [
                {               upperBound: 200},
                {lowerBound: 200, upperBound: 600},
                {lowerBound: 600, upperBound: 1200},
                {lowerBound: 1200, upperBound: 1600},
                {lowerBound: 1600, upperBound: 2200},
                {lowerBound: 2200, upperBound: 2800},
                {lowerBound: 2800}
            ],
            batteryCapacity: [
                {               upperBound: 2807},
                {lowerBound: 2807, upperBound: 3734},
                {lowerBound: 3734, upperBound: 4661},
                {lowerBound: 4661, upperBound: 5588},
                {lowerBound: 5588, upperBound: 6515},
                {lowerBound: 6515, upperBound: 7441},
                {lowerBound: 7441}
            ],
            camera: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 2.5},
                {lowerBound: 2.5, upperBound: 4},
                {lowerBound: 4, upperBound: 5.5},
                {lowerBound: 5.5, upperBound: 7},
                {lowerBound: 7, upperBound: 8.5},
                {lowerBound: 8.5}
            ],
            frontCamera: [
                {               upperBound: 0.5},
                {lowerBound: 0.5, upperBound: 1.3},
                {lowerBound: 1.3, upperBound: 2.1},
                {lowerBound: 2.1, upperBound: 3.1},
                {lowerBound: 3.1, upperBound: 4.1},
                {lowerBound: 4.1, upperBound: 5},
                {lowerBound: 5}
            ]
        },
        laptops: {
            cpuSpeed: [
                {                 upperBound: 0.9},
                {lowerBound: 0.9, upperBound: 1.4},
                {lowerBound: 1.4, upperBound: 1.9},
                {lowerBound: 1.9, upperBound: 2.4},
                {lowerBound: 2.4, upperBound: 2.9},
                {lowerBound: 2.9, upperBound: 3.4},
                {lowerBound: 3.4}
            ],
            cpuCores: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 2},
                {lowerBound: 2, upperBound: 3},
                {lowerBound: 3, upperBound: 5},
                {lowerBound: 5, upperBound: 7},
                {lowerBound: 7, upperBound: 9},
                {lowerBound: 9}
            ],
            ram: [
                {               upperBound: 2000},
                {lowerBound: 2000, upperBound: 4000},
                {lowerBound: 4000, upperBound: 6000},
                {lowerBound: 6000, upperBound: 8000},
                {lowerBound: 8000, upperBound: 12000},
                {lowerBound: 12000, upperBound: 16000},
                {lowerBound: 16000}
            ],
            hardDrive: [
                {               upperBound: 250},
                {lowerBound: 250, upperBound: 500},
                {lowerBound: 500, upperBound: 750},
                {lowerBound: 750, upperBound: 1000},
                {lowerBound: 1000, upperBound: 1250},
                {lowerBound: 1250, upperBound: 1500},
                {lowerBound: 1500}
            ],
            screenResolution: ['', '','1366 x 768', '1600 x 900', '1920 x 1080', '2560 x 1600', '3200 x 1800'],
            sound: ['', '','', '-', 'DTS', 'jbl', 'beatsAudio'],
            screenSize: [
                {               upperBound: 10},
                {lowerBound: 10, upperBound: 11.5},
                {lowerBound: 11.5, upperBound: 13},
                {lowerBound: 13, upperBound: 14.5},
                {lowerBound: 14.5, upperBound: 16},
                {lowerBound: 16, upperBound: 17.5},
                {lowerBound: 17.5}
            ],
            weight: [
                {               upperBound: 1500},
                {lowerBound: 1500, upperBound: 1900},
                {lowerBound: 1900, upperBound: 2300},
                {lowerBound: 2300, upperBound: 2700},
                {lowerBound: 2700, upperBound: 3100},
                {lowerBound: 3100, upperBound: 3500},
                {lowerBound: 3500}
            ],
            price: [
                {               upperBound: 400},
                {lowerBound: 400, upperBound: 900},
                {lowerBound: 900, upperBound: 1400},
                {lowerBound: 1400, upperBound: 1900},
                {lowerBound: 1900, upperBound: 2400},
                {lowerBound: 2400, upperBound: 2900},
                {lowerBound: 2900}
            ],
            batteryLife: [
                {               upperBound: 2.5},
                {lowerBound: 2.5, upperBound: 5},
                {lowerBound: 5, upperBound: 7.5},
                {lowerBound: 7.5, upperBound: 10},
                {lowerBound: 10, upperBound: 12.5},
                {lowerBound: 12.5, upperBound: 15},
                {lowerBound: 15}
            ],
            graphicsMemory: [
                {               upperBound: 0.5},
                {lowerBound: 0.5, upperBound: 2},
                {lowerBound: 2, upperBound: 3.5},
                {lowerBound: 3.5, upperBound: 5},
                {lowerBound: 5, upperBound: 6.5},
                {lowerBound: 6.5, upperBound: 8},
                {lowerBound: 8}
            ],
            graphicsSpeed: [
                {               upperBound: 1},
                {lowerBound: 1, upperBound: 3},
                {lowerBound: 3, upperBound: 5},
                {lowerBound: 5, upperBound: 7},
                {lowerBound: 7, upperBound: 9},
                {lowerBound: 9, upperBound: 11},
                {lowerBound: 11}
            ]
        }
    };

var search = function (field, data, deviceType, flag) {
    var ranges = comparizonRanges[deviceType][field],
        i;
    for (i = ranges.length - 1; i >= 0; i--) {
        if(flag && ranges[i] === data) break;
        else {
            if(i === ranges.length - 1 && ranges[i].lowerBound <= data) break;
            if(!i && data < ranges[i].upperBound) break;
            if(ranges[i].lowerBound <= data && data < ranges[i].upperBound) break;
        }
    }
    return map[i];
};

var decode = function(data, deviceType) {
    var decodedData = {},
        attr = attributes[deviceType];
    
    decodedData.cpu = add(multiply(search('cpuSpeed', data.cpuSpeed, deviceType), 0.7), multiply(search('cpuCores', data.cpuCores, deviceType), 0.3));
    
    for (var i = 1; i < attr.length; i++) {
        decodedData[attr[i]] = search(attr[i], data[attr[i]], deviceType, (attr[i] === 'connectivity' || attr[i] === 'HDLevel' || attr[i] === 'screenResolution' || attr[i] === 'sound') ? 'text' : '');
    }
    return decodedData;
};

/**** DEVICE CAPABILITY ****/

var componentWeight = {
    smartphones: {
        games: {
            cpu: 0.25,
            ram:0.15,
            pixelDensity: 0.18,
            HDLevel: 0.07,
            internalStorage: 0.15,
            externalStorage: 0.1,
            screenSize: 0.1
        },
        download: {
            cpu: 0.4,
            connectivity: 0.3,
            ram: 0.15,
            internalStorage: 0.05,
            externalStorage: 0.1
        },
        phonecalls: {
            cpu: 0.05,
            batteryTalkTime: 0.6,
            pixelDensity: 0.03,
            HDLevel: 0.02,
            frontCamera: 0.2,
            screenSize: 0.05,
            ram: 0.05
        },
        surfWeb: {
            cpu: 0.35,
            connectivity: 0.5,
            ram: 0.15
        },
        socialNetwork: {
            connectivity: 0.45,
            ram: 0.2,
            cpu: 0.2,
            internalStorage: 0.1,
            externalStorage: 0.05
        },
        takePhotos: {
            camera: 0.5,
            frontCamera: 0.3,
            pixelDensity: 0.06,
            HDLevel: 0.04,
            internalStorage: 0.05,
            externalStorage: 0.05
        },
        price: { price: 1},
        weight: { weight: 1},
        batteryCapacity: { batteryCapacity: 1},
        screenSize: { screenSize: 1}
    }, 
    tablets: {
        games: {
            cpu: 0.25,
            ram:0.15,
            pixelDensity: 0.25,
            internalStorage: 0.15,
            externalStorage: 0.1,
            screenSize: 0.1
        },
        download: {
            cpu: 0.4,
            connectivity: 0.3,
            ram: 0.15,
            internalStorage: 0.05,
            externalStorage: 0.1
        },
        movies: {
            cpu: 0.1,
            pixelDensity: 0.35,
            internalStorage: 0.15,
            externalStorage: 0.15,
            screenSize: 0.2,
            ram: 0.05
        },
        takePhotos: {
            camera: 0.5,
            frontCamera: 0.3,
            pixelDensity: 0.1,
            internalStorage: 0.05,
            externalStorage: 0.05
        },
        surfWeb: {
            cpu: 0.35,
            connectivity: 0.5,
            ram: 0.15
        },
        socialNetwork: {
            connectivity: 0.45,
            ram: 0.2,
            cpu: 0.2,
            internalStorage: 0.1,
            externalStorage: 0.05
        },
        readEBooks: {
            cpu: 0.3,
            pixelDensity: 0.4,
            screenSize: 0.2,
            ram: 0.1
        },
        price: { price: 1},
        weight: { weight: 1},
        batteryCapacity: { batteryCapacity: 1},
        screenSize: { screenSize: 1}
    },
    laptops: {
        games: {
            cpu: 0.25,
            ram:0.15,
            graphicsMemory: 0.18,
            graphicsSpeed: 0.07,
            sound: 0.1,
            screenResolution: 0.1,
            hardDrive: 0.05
        },
        music: { sound: 1 },
        download: {
            cpu: 0.4,
            ram: 0.3,
            hardDrive: 0.3
        },
        movies: {
            cpu: 0.05,
            hardDrive: 0.1,
            sound: 0.15,
            graphicsSpeed: 0.2,
            graphicsMemory: 0.15,
            screenResolution: 0.15,
            screenSize: 0.15,
            ram: 0.05
        },
        wordProcessing: {
            cpu: 0.9,
            ram: 0.1
        },
        dataAnalysis: {
            cpu: 0.65,
            ram: 0.35
        },
        graphicsHandling: {
            graphicsMemory: 0.1,
            graphicsSpeed: 0.1,
            screenResolution: 0.15,
            screenSize: 0.15,
            hardDrive: 0.1,
            ram: 0.2,
            cpu: 0.2
        },
        price: { price: 1},
        weight: { weight: 1},
        batteryLife: { batteryLife: 1},
        screenSize: { screenSize: 1}
    }
};

var getDeviceCapability = function (TFNs, deviceType) {
    var deviceCapability = {},
        attr = attributes[deviceType],
        act = action[deviceType],
        compWeight = componentWeight[deviceType];

    for (var i = 0; i < act.length; i++) {
        var array = [];
        for(var j = 0; j < attr.length; j++) {
            if(compWeight[act[i].id] && compWeight[act[i].id][attr[j]]) array.push(multiply(TFNs[attr[j]], compWeight[act[i].id][attr[j]]));
        }
        deviceCapability[act[i].id] = cumSum(array);
    }
    return deviceCapability;
};