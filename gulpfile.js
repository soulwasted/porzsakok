var gulp = require('gulp');
var del = require('del');
var gulpSequence = require('gulp-sequence');
var concat = require('gulp-concat');
var gutil = require('gulp-util');
var buffer = require('vinyl-buffer');
var sourcemaps = require('gulp-sourcemaps');
var postcss = require('gulp-postcss');
var flexibility = require('postcss-flexibility');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var cleancss = require('gulp-clean-css');
var autoprefixer = require('gulp-autoprefixer');
var flexibility = require('postcss-flexibility');
var jade = require('gulp-jade');
var prettify = require('gulp-prettify');
var uglify = require('gulp-uglify');

var env = "";

var paths = {
    base: "./",
    watch: {
        jade: "assets/jade/**/*.jade",
        js: "assets/js/**/*.js",
        sass: "assets/scss/**/*.scss",
        css: "assets/css/**/*.css",
        images: "assets/images/**/*"
    },
    fonts: {
        src: [
            "bower_components/bootstrap-sass/assets/fonts/bootstrap/**",
        ],
        dest: "www/fonts",
        clean: "www/fonts/**/*"
    },
	jade: {
        src: "assets/jade/*.jade",
        dest: "www"
    },
    scripts: {
        src: [
            "bower_components/jquery/dist/jquery.js",
            // "bower_components/bootstrap-sass/assets/javascripts/bootstrap/affix.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/alert.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/button.js",
            // "bower_components/bootstrap-sass/assets/javascripts/bootstrap/carousel.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/collapse.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/dropdown.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/modal.js",
            // "bower_components/bootstrap-sass/assets/javascripts/bootstrap/tooltip.js",
            // "bower_components/bootstrap-sass/assets/javascripts/bootstrap/popover.js",
            // "bower_components/bootstrap-sass/assets/javascripts/bootstrap/scrollspy.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/tab.js",
            "bower_components/bootstrap-sass/assets/javascripts/bootstrap/transition.js",
			"bower_components/responsive-bootstrap-toolkit/dist/bootstrap-toolkit.js",
            "bower_components/ekko-lightbox/dist/ekko-lightbox.min.js",
            "bower_components/smooth-scroll/dist/js/smooth-scroll.js",
			"bower_components/scrollreveal/dist/scrollreveal.js",
			"assets/js/wNumb.js",
			"assets/js/modernizr.js",
			"bower_components/nouislider/distribute/nouislider.js",
            "node_modules/readmore-js/readmore.min.js"
            // "assets/js/**/*.js"
        ],
        dest: "www/js",
        name: "scripts.js",
        min: "scripts.min.js",
        justcopy: [
            "assets/js/app.js",
            "assets/js/slider.js"
        ]
    },
    sass: {
        src: "assets/scss/app.scss",
        dest: "www/css",
        min: "app.min.css",
        hotfixes: "assets/scss/components/hotfixes.scss"
    },
    css: {
        src: "assets/css/**/*.css",
        dest: "www/css"
    },
    cleanPreprocessStyles: "assets/preprocess/**/*",
    cleanFilesInProduction: [
        "www/js/scripts.js",
        "www/js/scripts.js.map",
        "www/css/app.css",
        "www/css/app.css.map"
    ]
};

var autoprefixerOptions = {
    browsers: [
        "Android 2.3",
        "Android >= 4",
        "Chrome >= 20",
        "Firefox >= 24",
        "Explorer >= 8",
        "iOS >= 6",
        "Opera >= 12",
        "Safari >= 6"
    ]
};

var sassOptions = {
    // Default: nested
    // Values: nested, expanded, compact, compressed
    // outputStyle: 'compressed',
    // Default: 5
    // bootstrap-sass requires minimum Sass number precision of 8
    precision: 10
};


var pixremOptions = {
    rootValue: '16px',
    atrules: true,
    unitPrecision: 4
}

var cssnanoOptions = {
    // http://cssnano.co/optimisations/
    // http://cssnano.co/options/
    // discardComments: { removeAll: true },
    calc: false,
    minifySelectors: false,
    minifyFontValues: false,
    convertValues: false,
    autoprefixer: false,
    reduceTransforms: false,
    colormin: false,
    minifyGradients: false,
    discardUnused: false,
    zindex: false,
    mergeIdents: false,
    reduceIdents: false
};

var uglifyStageOptions = {
    mangle: false,
    output: {
        beautify: true
    }
};

var uglifyProductionOptions = {
    mangle: true
};


gulp.task('scripts-dev', gulpSequence(
    'set-env-dev',
    'process-scripts'
));
gulp.task('scripts-stage', gulpSequence(
    'set-env-stage',
    'process-scripts'
));
gulp.task('scripts-production', gulpSequence(
    'set-env-production',
    'process-scripts'
));

gulp.task('sass-dev', gulpSequence(
    'set-env-dev',
    // 'preprocess-styles',
    'process-sass'
));
gulp.task('sass-stage', gulpSequence(
    'set-env-stage',
    // 'preprocess-styles',
    'process-sass'
));
gulp.task('sass-production', gulpSequence(
    'set-env-production',
    // 'preprocess-styles',
    'process-sass'
));





gulp.task('watch', function () {
    gulp.watch(paths.watch.js, ['process-scripts']);
	gulp.watch(paths.watch.jade, ['process-jade']);
    gulp.watch(paths.watch.sass, ['process-sass']);
});




function processJade() {
	var YOUR_LOCALS = {};
    var isErr = false;
    return gulp.src(paths.jade.src)
	.pipe(jade({locals: YOUR_LOCALS}))
	.pipe(gulp.dest(paths.jade.dest))
}
gulp.task('process-jade', function () {
    switch(env) {
        case "dev":
            return processJade();
        break;
        case "stage":
            return processJade();
        break;
        case "production":
            return processJade();
        break;
        default:
            return gutil.log(gutil.colors.red("env not set"));
        break;
    }
});
function prettifyHtml() {
	return gulp.src(paths.jade.dest + '/*.html')
    .pipe(prettify({
        indent_size: 4
    }))
    .pipe(gulp.dest(paths.jade.dest))
}
gulp.task('process-prettify-html', function () {
	return prettifyHtml();
});

function processDevSass() {
    var isErr = false;
    return gulp.src(paths.sass.src)
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', function (err) {
        isErr = true;
        gutil.log(gutil.colors.red(err.message));
        // browserSync.notify("Error has occurred during compiling of Sass: <span style='color: #f99157;'>" + err.message + "</span>", 10000);
        this.emit('end');
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    // .pipe(pixrem(pixremOptions))
    .pipe(postcss([flexibility]))
    .pipe(sourcemaps.write(paths.base))
    .pipe(gulp.dest(paths.sass.dest).on('end', function () {
    //     if (isErr === false && browserSyncState === true) {
    //         browserSync.reload();
    //     }
    }));
}

function processStageSass() {
    return gulp.src(paths.sass.src)
	gutil.log
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions).on('error', function (err) {
        gutil.log(gutil.colors.red(err.message));
        // browserSync.notify("Error has occurred during compiling of Sass: <span style='color: #f99157;'>" + err.message + "</span>", 10000);
        this.emit('end');
    }))
    // .pipe(autoprefixer(autoprefixerOptions))
    // .pipe(pixrem(pixremOptions))
    .pipe(sourcemaps.write(paths.base))
    .pipe(gulp.dest(paths.sass.dest));
}
function processProductionSass() {
    return gulp.src(paths.sass.src)
    .pipe(sass(sassOptions).on('error', function (err) {
        gutil.log(gutil.colors.red(err.message));
        // browserSync.notify("Error has occurred during compiling of Sass: <span style='color: #f99157;'>" + err.message + "</span>", 10000);
        this.emit('end');
    }))
    .pipe(autoprefixer(autoprefixerOptions))
    // .pipe(pixrem(pixremOptions))
    .pipe(rename(paths.sass.min))
    // .pipe(cssnano(cssnanoOptions))
    .pipe(cleancss())
    .pipe(gulp.dest(paths.sass.dest));
}
gulp.task('process-sass', function () {
    switch(env) {
        case "dev":
            return processDevSass();
        break;
        case "stage":
            return processStageSass();
        break;
        case "production":
            return processProductionSass();
        break;
        default:
            return gutil.log(gutil.colors.red("env not set"));
        break;
    }
});


function processCopyCss() {
    return gulp.src(paths.css.src)
    .pipe(gulp.dest(paths.css.dest));
}
gulp.task('process-css', function () {
    processCopyCss();
});


function processCopyScripts() {
    return gulp.src(paths.scripts.justcopy)
    .pipe(gulp.dest(paths.scripts.dest));
}
function processDevScripts() {
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.scripts.name))
    .pipe(sourcemaps.write(paths.base))
    .pipe(gulp.dest(paths.scripts.dest));
}
function processStageScripts() {
    return gulp.src(paths.scripts.src)
    .pipe(sourcemaps.init())
    .pipe(concat(paths.scripts.name))
    .pipe(uglify(uglifyStageOptions).on('error', function (err) {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
    }))
    .pipe(sourcemaps.write(paths.base))
    .pipe(gulp.dest(paths.scripts.dest));
}
function processProductionScripts() {
    return gulp.src(paths.scripts.src)
    .pipe(concat(paths.scripts.min))
    .pipe(uglify(uglifyProductionOptions).on('error', function (err) {
        gutil.log(gutil.colors.red(err));
        this.emit('end');
    }))
    .pipe(gulp.dest(paths.scripts.dest));
}
gulp.task('process-scripts', function () {
    processCopyScripts();
    switch(env) {
        case "dev":
            return processDevScripts();
        break;
        case "stage":
            return processStageScripts();
        break;
        case "production":
            return processProductionScripts();
        break;
        default:
            return gutil.log(gutil.colors.red("env not set"));
        break;
    }
});

gulp.task('set-env-dev', function () {
    env = "dev";
    gutil.log(gutil.colors.yellow("development env set"));
});
gulp.task('set-env-stage', function () {
    env = "stage";
    gutil.log(gutil.colors.yellow("stage env set"));
});
gulp.task('set-env-production', function () {
    env = "production";
    gutil.log(gutil.colors.yellow("production env set"));
});

gulp.task('default', gulpSequence(
	'set-env-dev',
	'process-jade',
	'process-scripts',
	'process-sass',
	'process-css',
	// 'process-livereload',
	// 'process-fonts',
	'watch'
))

gulp.task('production', gulpSequence(
    'set-env-production',
	'process-jade',
	'process-prettify-html',
    'process-scripts',
    // 'process-sprites',
    // 'preprocess-styles',
    'process-sass',
    'process-css'
    // 'clean-images',
    // 'process-images',
    // 'process-fonts',
    // 'check-hotfixes',
    // 'delete-useless-files'
));
