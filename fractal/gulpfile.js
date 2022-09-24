const gulp = require('gulp');
const { series, parallel, dest } = require('gulp');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const cssnano = require('gulp-cssnano');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const cache = require('gulp-cache');
const plumber = require('gulp-plumber');
const uglify = require('gulp-uglify');
const notifier = require('gulp-notifier');
const svgmin = require('gulp-svgmin');
const sass = require('gulp-sass')(require('sass'));
const favicons = require('gulp-favicons');
const webp = require('gulp-webp');
const webpackConfig = require('./webpack.config.js');
const webpackStream = require('webpack-stream');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');
const ttf2eot = require('gulp-ttf2eot');
const cleanCSS = require('gulp-clean-css');

// SOURCE PATHS
const filePaths = {
	scss: {
		src: ['./public/scss/reset.scss', './public/scss/fonts.scss', './public/scss/swiper.scss', './public/scss/variables.scss', './public/scss/keyframes.scss', './public/scss/typography.scss', './public/scss/mixins.scss', './public/scss/global.scss', './components/**/**/*.scss'],
		dist: ['./public/css', '../craft/web/css']
	},
	fonts: {
		src: ['./public/fonts/**/*.ttf'],
		dist: ['../craft/web/fonts', '../craft/web/fonts']
	},
	js: {
		src: ['./public/js/main.js', './components/**/*.js'],
		dist: ['./public/js', '../craft/web/js']
	},
	image: {
		src: ['./public/media/images/**/**/*.+(png|jpg|jpeg|gif)'],
		dist: ['./public/media/images', '../craft/web/media/images']
	},
	graphic: {
		src: ['./public/media/graphics/**/*.+(png|jpg|jpeg|gif|svg)'],
		dist: ['../craft/web/media/graphics']
	},
	icon : {
		src: ['./public/media/icons/**/*.svg'],
		dist: ['../craft/web/media/icons']
	},
	favicon: {
		src: ['./public/media/favicons/favicon.png'],
		dist: ['./public/media/favicons', '../craft/web/media/favicons']
	}
};

// SCSS
const scssTask = (done) => {
	gulp.src(filePaths.scss.src, { 'allowEmpty': true })
		.pipe(plumber({ errorHandler: notifier.error }))
		.pipe(concat('main.min.css'))
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(cssnano())
		.pipe(sourcemaps.write('.'))
		.pipe(cleanCSS())
		.pipe(dest(filePaths.scss.dist[0]))
		.pipe(dest(filePaths.scss.dist[1]));
	done();
};
	
// JS TASK
const jsTask = (done) => {
	gulp.src(filePaths.js.src)
		.pipe(plumber({ errorHandler: notifier.error }))
		.pipe(webpackStream(webpackConfig))
		.pipe(sourcemaps.write('.'))
		.pipe(uglify())
		.pipe(dest(filePaths.js.dist[0]))
		.pipe(dest(filePaths.js.dist[1]));
	done();
};

// FONT TASK
const fontTask = (done) => {
	gulp.src(filePaths.fonts.src)
		.pipe(gulp.dest(filePaths.fonts.dist[0]))
		.pipe(gulp.dest(filePaths.fonts.dist[1]));
	gulp.src(filePaths.fonts.src)
		.pipe(ttf2eot())
		.pipe(gulp.dest(filePaths.fonts.dist[0]))
		.pipe(gulp.dest(filePaths.fonts.dist[1]));
	gulp.src(filePaths.fonts.src)
		.pipe(ttf2woff())
		.pipe(gulp.dest(filePaths.fonts.dist[0]))
		.pipe(gulp.dest(filePaths.fonts.dist[1]));
	gulp.src(filePaths.fonts.src)
		.pipe(ttf2woff2())
		.pipe(gulp.dest(filePaths.fonts.dist[0]))
		.pipe(gulp.dest(filePaths.fonts.dist[1]));
	done();
};

// IMAGE TASK
const imageTask = (done) => {
	gulp.src(filePaths.image.src)
		.pipe(cache(webp()))
		.pipe(dest(filePaths.image.dist[0]))
		.pipe(dest(filePaths.image.dist[1]));
	done();
};

// GRAPHIC TASK
const graphicTask = (done) => {
	gulp.src(filePaths.graphic.src)
		.pipe(svgmin())
		.pipe(dest(filePaths.graphic.dist[0]));
	done();
};

// ICON TASK
const iconTask = (done) => {
	gulp.src(filePaths.icon.src)
		.pipe(svgmin())
		.pipe(dest(filePaths.icon.dist[0]));
	done();
};

// FAVICON TASK
const faviconTask = (done) => {
	gulp.src(filePaths.favicon.src)
		.pipe(favicons({
			appName: 'Lautissimi',
			appShortName: 'Lautissimi',
			appDescription: '',
			developerName: 'Jérôme Haas',
			developerURL: 'haaswebsolutions.io',
			background: '#fff',
			path: './public/media/favicons/',
			url: '',
			display: 'standalone',
			orientation: 'portrait',
			scope: '/',
			start_url: '/',
			version: 1.0,
			logging: false,
			html: 'index.html',
			pipeHTML: true,
			replace: true,
		}))
		.pipe(gulp.dest(filePaths.favicon.dist[0]))
		.pipe(gulp.dest(filePaths.favicon.dist[1]));
	done();
};

// WATCH TASK
const watchTask = () => {
	browserSync.init({
		server: { baseDir: './' },
		open: false,
		port: 3007,
		ui: { port: 3008 }
	});
	gulp.watch('./index.html').on('change', browserSync.reload);
	gulp.watch(filePaths.scss.src, scssTask).on('change', browserSync.reload);
	gulp.watch(filePaths.js.src, jsTask).on('change', browserSync.reload);
	gulp.watch(filePaths.image.src, imageTask).on('change', browserSync.reload);
};

const developTask = series(scssTask, jsTask, watchTask);
const buildTask = parallel(scssTask, jsTask, fontTask, imageTask, iconTask, graphicTask, faviconTask);

module.exports = {
	default: developTask,
	build: buildTask,
};