var BASE_PATH = 'app/';
var DEST_PATH = 'dest/';

var gulp = require('gulp'),
    $ = require('gulp-load-plugins')(),
    runSequence = require('run-sequence'),
    wiredep = require('wiredep').stream,
    browser = require('browser-sync');

// パス設定
var path = {
    html: {
        src: [
            base_path('**/*.html'),
            base_path_not('bower_components/**/*.html',true),
            base_path_not('views/**/*.html',true)
        ],
        dest: dest_path()
    },
    views: {
        src: [
            base_path('views/**/*.html')
        ],
        dest: base_path('js')
    },
    view: {
        src: base_path('views/**/*.html')
    },
    sass: {
        src: base_path('sass/**/*.scss'),
        dest: base_path('css')
    },
    css: {
        min: dest_path('css') + '**/*.css',
        dest: dest_path('css')
    },
    js: {
        src: base_path('js/**/*.js'),
        test: 'test/**/*Spec.js',
        dest: dest_path('js'),
        min: dest_path('js') + '**/*.js'
    },
    img: {
        src: base_path('images/**/*'),
        dest: dest_path('images')
    },
    sprite: {
        src: base_path('images/sprites'),
        dest: base_path('sass/sprites')
    },
    font: {
        src: base_path('fonts/**/*'),
        dest: dest_path('fonts')
    }
};

/**
 * baseパスを返却
 * @param path
 * @returns {string}
 */
function base_path(path) {
    path = path || '';
    return BASE_PATH + path;
}
/**
 * baseパスに!をつけたパスを返却
 * @param path
 * @returns {string}
 */
function base_path_not(path) {
    path = path || '';
    return '!' + BASE_PATH + path;
}
/**
 * destパスを返却
 * @param path
 * @returns {string}
 */
function dest_path(path) {
    path = path || '';
    return DEST_PATH + path;
}

/**
 * CSS系タスク
 * sassコンパイルしてautoprefixerかけて出力
 */
gulp.task('style', function () {
    return gulp.src(path.sass.src)
        .pipe($.plumber())
        .pipe($.newer(path.sass.dest))
        .pipe($.sass({imagePath:'../images',imageerrLogToConsole: true}))
        .pipe($.autoprefixer(['last 3 version', 'ie >= 8', 'Android 4.0']))
        .pipe(gulp.dest(path.sass.dest))
        .pipe(browser.reload({stream: true}));
});
/**
 * 画像系タスク
 * imageminして出力
 */
gulp.task('image', function () {
    return gulp.src(path.img.src)
        .pipe($.plumber())
        .pipe($.imagemin())
        .pipe(gulp.dest(path.img.dest))
        .pipe(browser.reload({stream: true}));
});

/**
 * JS系タスク
 * jshint実行
 */
gulp.task('script', function () {
    return gulp.src(path.js.src)
        .pipe($.plumber())
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe($.jshint.reporter('fail'))
        .pipe(browser.reload({stream: true}));
});

/**
 * テスト系タスク
 * karma実行
 */
gulp.task('test', function() {
    return gulp.src([path.js.src,path.js.test])
        .pipe($.plumber())
        .pipe($.karma({
            configFile: 'karma.conf.js'
        }))
        .on('error', function(err) {
            // Make sure failed tests cause gulp to exit non-zero
            throw err;
        });
});

/**
 * Bower系タスク
 * bowerでインストールしたファイルをHTMLに出力
 */
gulp.task('bower', function () {
    return gulp.src(path.html.src)
        .pipe($.plumber())
        .pipe(wiredep())
        .pipe(gulp.dest(BASE_PATH))
        .pipe(browser.reload({stream: true}));
});

/**
 * HTML系タスク
 */
gulp.task('html', function() {
    runSequence(['htmllint','template']);
});


/**
 * HTMLLint
 */
gulp.task('htmllint', function() {
    return gulp.src(path.html.src)
        .pipe($.plumber())
        .pipe($.htmlhint())
        .pipe($.htmlhint.reporter())
        .pipe(browser.reload({stream: true}));
});
/**
 * angularTemplateCache
 */
gulp.task('template', function() {
    return gulp.src(path.views.src)
        .pipe($.angularTemplatecache({
            root: 'views'
        }))
        .pipe(gulp.dest(path.views.dest));
});
/**
 * フォントの複製
 */
gulp.task('font', function() {
    return gulp.src(path.font.src)
        .pipe(gulp.dest(path.font.dest));
});

/**
 * サーバー起動
 */
gulp.task('serv', function () {
    browser.init(null, {
        server: {
            baseDir: BASE_PATH
        }
    });
});
/**
 * サーバーリロード
 */
gulp.task('reload', function () {
    browser.reload();
});
/**
 * クリーンタスク
 */
gulp.task('clean', function () {
    return gulp.src(path.html.dest)
        .pipe($.clean());
});

/**
 * スプライト生成
 * glue実行
 */
gulp.task('sprite', function() {
    gulp.src(path.sprite.src)
        .pipe($.plumber())
        .pipe($.newer(path.sprite.dest))
        .pipe($.spriteGlue(path.sprite.dest,{
            project: true,
            scss: true,
            img: base_path('images/sprites'),
            css: base_path('css/sprites')
        }));
});

/**
 * 圧縮系タスク
 */
gulp.task('_minify',['_useref'], function() {
    return runSequence(['_minjs','_mincss']);
});
gulp.task('_minjs', function() {
    return gulp.src(path.js.min)
        .pipe($.ngAnnotate())
        .pipe($.uglify())
        .pipe(gulp.dest(path.js.dest));
});
gulp.task('_mincss', function() {
    return gulp.src(path.css.min)
        .pipe($.minifyCss())
        .pipe(gulp.dest(path.css.dest));
});
gulp.task('_useref', function() {
    return gulp.src(path.html.src)
        .pipe($.useref.assets())
        .pipe($.useref.restore())
        .pipe($.useref())
        .pipe(gulp.dest(path.html.dest));
});

/**
 * リリースタスク
 */
gulp.task('build', function () {
    return runSequence('clean', ['html','script', 'style', 'image','font'],'_minify');
});

/**
 * デフォルトタスク
 */
gulp.task('default',['serv'], function () {
    gulp.watch(path.js.src, ['script','reload']);
    gulp.watch(path.sass.src, ['style']);
    gulp.watch(path.img.src, ['image']);
    gulp.watch(path.html.src, ['html']);
    gulp.watch(path.view.src, ['html']);


//    return gulp.src([path.js.src,path.js.test])
//        .pipe($.plumber())
//        .pipe($.karma({
//            configFile: 'karma.conf.js',
//            action: 'watch'
//        }))
//        .on('error', function(err) {
//            // Make sure failed tests cause gulp to exit non-zero
//            throw err;
//        });

});