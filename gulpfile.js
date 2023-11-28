const {src, dest, series, watch} = require('gulp')
const concat = require('gulp-concat')
const htmlMin = require('gulp-htmlmin')
const autoprefixer = require('gulp-autoprefixer')
const cleancss = require ('gulp-clean-css')
const autoPrefixer = require('gulp-autoprefixer')
const svgSprite = require('gulp-svg-sprite')
// const image = require('gulp-image')
const sass = require('gulp-sass')(require('sass'));
const babel = require('gulp-babel')
const uglify = require('gulp-uglify-es').default
const notify = require('gulp-notify')
const fonter = require('gulp-fonter');
const sourcemaps = require('gulp-sourcemaps')

const gulpIf = require('gulp-if')

const del = require('del')
const browserSync = require('browser-sync').create()


const inDevelopment = true; // true = in dev; false = in prod

const resources = () => {
    return src('src/resources/**')
    .pipe(dest('dist'))
}

const clean = () => {
    return del(['dist'])
}

function buildStyles() {
    return src('src/styles/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(dest('src/styles/'));
  };

function media() {
    return src('src/media/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const styles = () => {
    return src('src/styles/**/*.css')
    .pipe(gulpIf(inDevelopment, sourcemaps.init()))
    .pipe(concat('main.css'))
    .pipe(autoPrefixer({
        cascade: false
    }))
    .pipe(gulpIf(!inDevelopment, 
        cleancss({
            level: 2
        })))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
    
}
const htmlMinify = () => {
    return src('src/**/*.html')
    .pipe(gulpIf(!inDevelopment, 
        htmlMin({collapseWhitespace: true,})
        ))
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}

const svgSprites = () => {
    return src('src/images/svg/**/*.svg')
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: '../sprite.svg'
            }
        }
    }))
    .pipe(dest('dist/images'))
}

const scripts = () => {
    return src(['src/js/components/**/*.js', 'src/js/main.js'])
    .pipe(gulpIf(inDevelopment, sourcemaps.init()))
    .pipe(gulpIf(!inDevelopment, 
        babel({
            presets: ['@babel/env']
        })
        ))
    .pipe(concat('app.js'))
    .pipe(gulpIf(!inDevelopment, uglify().on('error', notify.onError())))
    .pipe(sourcemaps.write())
    .pipe(dest('dist'))
    .pipe(browserSync.stream())
}



const watchFiles = () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        }
    })
}

const images = () => {
    return src([
        'src/images/**/*.jpg', 
        'src/images/**/*.png',
        'src/images/*.svg',
        'src/images/**/*.jpeg', 
    ])
    // .pipe(image())
    .pipe(dest('dist/images'))
}

const fonts = () => {
    return src('./src/font/**/**')
      .pipe(fonter())
      .pipe(dest('./dist/font'));
  };

watch('src/**/*.html', htmlMinify)
watch('src/styles/**/*.css', styles)
watch('src/media/**/*.scss', media)
watch('src/images/svg/**/*.svg', svgSprites)
watch('src/js/**/*.js', scripts)
watch('src/resources/**', resources)
watch('src/styles/**/*.scss', buildStyles)
watch('src/font/**/*', fonts)

exports.buildStyles = buildStyles;

exports.fonts = fonts
exports.styles = styles 
exports.clean = clean 
exports.scripts = scripts
exports.htmlMinify = htmlMinify
exports.default = series(clean, buildStyles, media, fonts, resources, htmlMinify, scripts, styles, images, svgSprites, watchFiles)