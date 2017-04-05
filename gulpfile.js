var gulp = require("gulp"),
    gulpLoadPlugins = require("gulp-load-plugins"),
    Browsersync = require("browser-sync").create(),
    reload = Browsersync.reload;

const $ = gulpLoadPlugins();

gulp.task('less', function() {
    return gulp.src('./style/less/*.less')
        .pipe($.less()) //该任务调用的模块
        .pipe($.autoprefixer())
        .pipe(gulp.dest('./style/css'));
        // .pipe(reload({ stream: true );
});

gulp.task("css",function() {
    return gulp.src("./style/css/*.css")
               .pipe($.autoprefixer({
                   browsers : ['last 2 versions'],
                   cascade : true,
                   remove : true
               }))
               .pipe(gulp.dest('./style/css'));
                // .pipe(reload({stream:true}));
});

gulp.task("server",["css"],function() {
    Browsersync.init({
        server:{
            baseDir:"./"
        }

    });

    gulp.watch("./css/*.css").on("change",reload);
    gulp.watch("./*.html").on("change",reload);
    gulp.watch("./style/less/*.less",['less']);
    gulp.watch("./js/*.js").on("change",reload);
});