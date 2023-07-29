import gulp from 'gulp';
import browserSync from 'browser-sync';
import cssImport from 'gulp-cssimport';
import gulpCssimport from 'gulp-cssimport';
import {deleteAsync} from 'del';//задачи

export const html = () => gulp
  .src('src/*.html')
  .pipe(gulp.dest('dist'))
  .pipe(browserSync.stream());

  export const css = () => gulp
  .src('src/css/index.css') // когда файлов много то можно использовать **/*.css правильный путь (src/css/index.css)
  .pipe(cssImport({
    extensios: ['css'],
  }))
  .pipe(gulp.dest('dist/css'))
  .pipe(browserSync.stream());

  export const js = () => gulp
  .src('src/js/**/*.js')
  .pipe(gulp.dest('dist/js'))
  .pipe(browserSync.stream());

  export const copy = () => gulp
    .src([
      'src/fonts/**/*',
      'src/img/**/*', // 'src/assets/**/*.{png, jpg, jpeg, svg}
    ], {
      base: 'src'
    })
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream({
      once: true,
    }))
  

  export const server = () => {
    browserSync.init({
      ui: false,
      notify: false,
      // tunnel: true, // используется когда необходимо показать сайт заказчику
      server: {
        baseDir: 'dist'
      }
    })

    gulp.watch('./src/**/*.html', html);
    gulp.watch('./src/css/**/*.css', css);
    gulp.watch('./src/js/**/*.js', js);
    gulp.watch([
      './src/img/**/*',
      './src/fonts/**/*'
    ], copy);
  };

  export const clear = async () => await deleteAsync('dist/**/*', {forse: true,});

  // запуск
  export const base = gulp.parallel(html, css, js, copy);

  export const build = gulp.series(clear, base);

  export default gulp.series(base, server);
  