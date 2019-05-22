'use strict';

var concat = require('gulp-concat');

/* параметры для gulp-autoprefixer */
var autoprefixerList = [
'Chrome >= 45',
'Firefox ESR',
'Edge >= 12',
'Explorer >= 10',
'iOS >= 9',
'Safari >= 9',
'Android >= 4.4',
'Opera >= 30'
];

/* пути к исходным файлам (src), к готовым файлам (build), а также к тем, за изменениями которых нужно наблюдать (watch) */
var path = {
    build: {
        html: 'assets/build/',
        js: 'assets/build/js/',
        css: 'assets/build/css/',
        img: 'assets/build/img/',
        fonts: 'assets/build/fonts/',
        media: 'assets/build/css/',
        libs:  'assets/build/libs/'
    },
    src: {
        html: 'assets/src/*.html',
        js: [
        'assets/src/libs/jquery/dist/jquery.min.js',
        'assets/src/libs/mmenu/jquery.mmenu.all.js',
        'assets/src/libs/readmore/readmore.min.js',
        'assets/src/libs/slick/slick.js',
        'assets/src/libs/animate/wow.min.js',
        'assets/src/js/scripts.js'
        ],
        style: 'assets/src/style/main.scss',
        media: 'assets/src/style/media.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/src/fonts/**/*.*',
        libs: 'assets/src/libs/**/*.*'
    },
    watch: {
        html: 'assets/src/**/*.html',
        js: 'assets/src/js/**/*.js',
        css: 'assets/src/style/**/*.scss',
        img: 'assets/src/img/**/*.*',
        fonts: 'assets/srs/fonts/**/*.*',
        media: 'assets/src/style/**/*.scss',
        libs: 'assets/srs/libs/**/*.*'
    },
    clean: './assets/build/*'
};

/* настройки сервера */
var config = {
    server: {
        baseDir: './assets/build'
    },
    notify: false
};

/* подключаем gulp и плагины */
var gulp = require('gulp'),  // подключаем Gulp
    webserver = require('browser-sync'), // сервер для работы и автоматического обновления страниц
    plumber = require('gulp-plumber'), // модуль для отслеживания ошибок
    rigger = require('gulp-rigger'), // модуль для импорта содержимого одного файла в другой
    //sourcemaps = require('gulp-sourcemaps'),  модуль для генерации карты исходных файлов
    sass = require('gulp-sass'), // модуль для компиляции SASS (SCSS) в CSS
    autoprefixer = require('gulp-autoprefixer'), // модуль для автоматической установки автопрефиксов
    cleanCSS = require('gulp-clean-css'), // плагин для минимизации CSS
    uglify = require('gulp-uglify'), // модуль для минимизации JavaScript
    cache = require('gulp-cache'), // модуль для кэширования
    imagemin = require('gulp-imagemin'), // плагин для сжатия PNG, JPEG, GIF и SVG изображений
    jpegrecompress = require('imagemin-jpeg-recompress'), // плагин для сжатия jpeg	
    pngquant = require('imagemin-pngquant'), // плагин для сжатия png
    rimraf = require('gulp-rimraf'), // плагин для удаления файлов и каталогов
    rename = require('gulp-rename');

    /* задачи */

// запуск сервера
gulp.task('webserver', function () {
    webserver(config);
});

// сбор html
gulp.task('html:build', function () {
    return gulp.src(path.src.html) // выбор всех html файлов по указанному пути
        .pipe(plumber()) // отслеживание ошибок
        .pipe(rigger()) // импорт вложений
        .pipe(gulp.dest(path.build.html)) // выкладывание готовых файлов
        .pipe(webserver.reload({ stream: true })); // перезагрузка сервера
    });

// сбор стилей
gulp.task('css:build', function () {
    return gulp.src(path.src.style) // получим main.scss
        .pipe(plumber()) // для отслеживания ошибок
        //.pipe(sourcemaps.init())  инициализируем sourcemap
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer({ // добавим префиксы
            browsers: autoprefixerList
        }))
        .pipe(gulp.dest(path.build.css))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS()) // минимизируем CSS
        //.pipe(sourcemaps.write('./'))  записываем sourcemap
        .pipe(gulp.dest(path.build.css)) // выгружаем в build
        .pipe(webserver.reload({ stream: true })); // перезагрузим сервер
    });

gulp.task('media:build', function () {
    return gulp.src(path.src.media) // получим main.scss
        .pipe(plumber()) // для отслеживания ошибок
        //.pipe(sourcemaps.init())  инициализируем sourcemap
        .pipe(sass()) // scss -> css
        .pipe(autoprefixer({ // добавим префиксы
            browsers: autoprefixerList
        }))
        .pipe(gulp.dest(path.build.media))
        .pipe(rename({ suffix: '.min' }))
        .pipe(cleanCSS()) // минимизируем CSS
        //.pipe(sourcemaps.write('./'))  записываем sourcemap
        .pipe(gulp.dest(path.build.media)) // выгружаем в build
        .pipe(webserver.reload({ stream: true })); // перезагрузим сервер
    });

// сбор js
gulp.task('js:build', function () {
    return gulp.src(path.src.js) // получим файл main.js
    .pipe(concat('scripts.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js))
    .pipe(webserver.reload({ stream: true }));
});

// перенос шрифтов
gulp.task('fonts:build', function () {
    return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts));
});

// перенос libs
gulp.task('libs:build', function() {
    return gulp.src(path.src.libs)
    .pipe(gulp.dest(path.build.libs));
});

// обработка картинок
gulp.task('image:build', function () {
    return gulp.src(path.src.img) // путь с исходниками картинок
        .pipe(cache(imagemin([ // сжатие изображений
            imagemin.gifsicle({ interlaced: true }),
            jpegrecompress({
                progressive: true,
                max: 90,
                min: 80
            }),
            pngquant(),
            imagemin.svgo({ plugins: [{ removeViewBox: false }] })
            ])))
        .pipe(gulp.dest(path.build.img)); // выгрузка готовых файлов
    });

// удаление каталога build 
gulp.task('clean:build', function () {
    return gulp.src(path.clean, { read: false })
    .pipe(rimraf());
});

// очистка кэша
gulp.task('cache:clear', function () {
    cache.clearAll();
});

// сборка
gulp.task('build',
    gulp.series('clean:build',
        gulp.parallel(
            'html:build',
            'css:build',
            'media:build',
            'js:build',
            'fonts:build',
            'image:build',
            'libs:build'
            )
        )
    );

// запуск задач при изменении файлов
gulp.task('watch', function () {
    gulp.watch(path.watch.html, gulp.series('html:build'));
    gulp.watch(path.watch.css, gulp.series('css:build'));
    gulp.watch(path.watch.media, gulp.series('media:build'));
    gulp.watch(path.watch.js, gulp.series('js:build'));
    gulp.watch(path.watch.img, gulp.series('image:build'));
    gulp.watch(path.watch.libs, gulp.series('libs:build'));
    gulp.watch(path.watch.fonts, gulp.series('fonts:build'));
});

// задача по умолчанию
gulp.task('default', gulp.series(
    'build',
    gulp.parallel('webserver','watch')      
    ));
