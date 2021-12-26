/*
 * @Author: Lee
 * @Date: 2021-12-26 01:56:07
 * @LastEditors: Lee
 * @LastEditTime: 2021-12-26 14:28:02
 */

const { src, dest, parallel, series, watch } = require('gulp');

// -- 通用
const rename = require('gulp-rename');
const del = require('del');
const browserSync = require('browser-sync');
const bs = browserSync.create();
const rev = require('gulp-rev');
const revCollector = require('gulp-rev-collector');

// -- 样式
const less = require('gulp-less');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const purgecss = require('@fullhuman/postcss-purgecss');

// -- 脚本
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');

// -- 模板
const htmlmin = require('gulp-htmlmin');

// -- 图片
const imagemin = require('gulp-imagemin');

// -- 清除文件
const clean = () => {
  return del(['dist']);
};

// -- 服务 & 热更新
const serve = () => {
  // watch(被监视的文件，对应的任务)
  watch('src/index.html', html);
  watch('src/**/*.less', style);
  watch('src/**/*.js', script);
  // watch('src/images/**', image);
  // 初始化服务
  bs.init({
    notify: false, // 禁用浏览器右上角的 browserSync connected 提示框
    files: 'dist/**', // 监视 dist 下 文件的变化，然后在浏览器上实时更新
    server: {
      baseDir: './dist', // 指定服务启动的目录
    },
    port: 5000,
  });
};

// - collector
const collector = () => {
  return src(['rev/*.json', 'dist/**/*.html'])
    .pipe(revCollector())
    .pipe(dest('dist'));
};

// -- 处理样式
const style = () => {
  var plugins = [
    autoprefixer({ overrideBrowserslist: ['last 2 version'] }),
    cssnano(),
    purgecss({
      content: ['./src/**/*.html'],
    }),
  ];
  return src('src/styles/*.less', { base: 'src' })
    .pipe(less())
    .pipe(postcss(plugins))
    .pipe(rename({ extname: '.min.css' }))
    // .pipe(rev())
    .pipe(dest('dist'))
    // .pipe(rev.manifest('css-rev-manifest.json'))
    // .pipe(dest('rev'));
};

// -- 处理脚本
const script = () => {
  return src('src/**/*.js')
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
      })
    )
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(dest('dist'));
};

// -- 处理模板
const html = () => {
  return src('src/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true, // 去除标签之间多余的空行和空白
        minifyCSS: true, // 压缩HTML中的CSS代码
        minifyJS: true, // 压缩HTML中的JS代码
      })
    )
    .pipe(dest('dist'));
};

// -- 处理图片
const image = () => {
  return src('src/images/**', { base: 'src' })
    .pipe(imagemin())
    .pipe(dest('dist'));
};

const build = series(clean, parallel([style, script, html, image]), /** collector */);
const dev = series(clean, build, serve);

module.exports = {
  build,
  dev,
  serve,
};
