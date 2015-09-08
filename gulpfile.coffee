gulp = require 'gulp'
load = require 'gulp-load-plugins'
pkg  = require './package.json'

$ = load
  pattern: ['*']
  scope: ['devDependencies']
  lazy: false
  rename:
    'vinyl-source-stream': 'source'
    'vinyl-buffer'       : 'buffer'
    'coffee-reactify'    : 'reactify'
    'gulp-coffeelint'    : 'lint'

reload = $.browserSync.reload
p =
  app    : './scripts/app.coffee'
  scss   : 'styles/main.scss'
  bundle : 'app.js'
  distJs : 'dist/js'
  distCss: 'dist/css'

gulp.task 'clean', (cb) ->
  $.del ['dist'], cb

gulp.task 'lint', ->
  gulp.src 'scripts/**/*'
    .pipe $.lint()
    .pipe $.lint.reporter()

gulp.task 'browserSync', ['watchify', 'index', 'styles'], ->
  $.browserSync
    server: baseDir: './dist'

gulp.task 'watchify', ['lint'], ->
  bundler = $.watchify $.browserify p.app, $.watchify.args

  rebundle = ->
    gulp.start 'lint'
    bundler
      .bundle()
      .on 'error', $.notify.onError()
      .pipe $.source p.bundle
      .pipe gulp.dest p.distJs
      .pipe reload stream: true

  bundler
    .transform extension: 'coffee', $.reactify
    .on 'update', rebundle
  rebundle()

gulp.task 'browserify', ['clean'], ->
  $.browserify p.app
    .transform extension: 'coffee', $.reactify
    .bundle()
    .pipe $.source p.bundle
    .pipe $.buffer()
    .pipe $.sourcemaps.init loadMaps: true
    .pipe $.uglify()
    .pipe $.sourcemaps.write './'
    .pipe gulp.dest p.distJs

gulp.task 'styles', ->
  gulp.src p.scss
    .pipe $.changed p.distCss
    .pipe $.sass errLogToConsole: true
    .on 'error', $.notify.onError()
    .pipe $.autoprefixer 'last 1 version'
    .pipe $.csso()
    .pipe gulp.dest p.distCss
    .pipe reload stream: true

gulp.task 'index', ->
  gulp.src 'index.html'
    .pipe $.replace /\$VERSION/g, pkg.version
    .pipe $.replace /\$AUTHOR/g,  pkg.author
    .pipe gulp.dest 'dist'

gulp.task 'inline', ['browserify', 'index', 'styles'], ->
  gulp.src 'dist/index.html'
    .pipe $.inline base:'dist/'
    .pipe gulp.dest 'dist/inlined'

gulp.task 'release', ->
  try
    aws = require './aws.json'
    options =
      headers:
        'Cache-Control': 'max-age=0, no-cache, no-transform, public'

    gulp.src 'dist/**'
    .pipe $.s3Ls aws, options
  catch e
    throw new Error "Can't find aws.json. Did you create it?"

gulp.task 'watch', ['clean'], ->
  gulp.start 'browserSync'
  gulp.watch 'styles/*.scss', ['styles']
  gulp.watch 'index.html', ['index']

gulp.task 'build', ['clean'], ->
  process.env.NODE_ENV = 'production'
  gulp.start 'inline'

gulp.task 'default', ['watch']
