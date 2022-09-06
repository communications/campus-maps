'use strict';

/* --------------------------
# Dependencies
---------------------------*/

const autoprefixer      = require( "autoprefixer" );
const notify            = require( "gulp-notify" );
const postcss           = require( "gulp-postcss")
const merge             = require( "merge-stream" );
const sass              = require( "gulp-sass")(require("node-sass"));
const gulp              = require( "gulp" );
const { watch, series } = require( "gulp" );

const plumber     = require( "gulp-plumber" );


/* --------------------------
# Configuration
---------------------------*/

let config = {
    sassPath: "./src/sass",
    npmDir: "./node_modules",
}

/* --------------------------
# Sass Compile
---------------------------*/

gulp.task('styles', () => {

    let main = gulp.src( config.sassPath + '/style.scss' )
        .pipe( sass({
            outputStyle: 'compressed',
            includePaths: [
            config.sassPath,
            config.npmDir + '/normalize.css',
            ]
        })
        .on("error", notify.onError(function (error) {
            return "Error: " + error.message;
        })))
        .pipe( postcss([ autoprefixer( {grid: "autoplace"} ) ]) )
        .pipe( gulp.dest('../') );

    return merge( main );

});

/* --------------------------
# Watch Tasks
---------------------------*/

gulp.task('watch', () => {

    // Watch the input folder for change,
    // and run `sass` task when something happens
    return gulp.watch( config.sassPath + '/**/*.scss', series( ['styles'] ) )

    .on('change', function( path, stats ) {
      console.log(`File ${path} was changed`);
    })

    .on('add', function(path, stats) {
      console.log(`File ${path} was added`);
    })

    .on('unlink', function(path, stats) {
      console.log(`File ${path} was removed`);
    });


});

/* --------------------------
# Dependencies
---------------------------*/

gulp.task( 'build', gulp.series([ 'styles' ]) );
gulp.task( 'default', gulp.series([ 'styles', 'watch' ]) );