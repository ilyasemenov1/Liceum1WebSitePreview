
import webp from "gulp-webp";
import imagemin from "gulp-imagemin";
import rename from "gulp-rename";
import gm from "gulp-gm";

let images = () => {
    return app.gulp.src(app.path.src.images)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "IMG",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(webp())
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(app.plugins.newer(app.path.build.images))
    .pipe(imagemin({
        progressive: true,
        svgPlugins: [{ removeVievBox: false }],
        interlaced: true,
        optimizationLevel: 3
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.images))
    .pipe(gm(function (gmfile) {
        gmfile.resize(20, 20);
        return gmfile;
      }))
    .pipe(rename(function(opt) {
        opt.basename = `${opt.basename}-low`
        return opt;
      }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.gulp.src(app.path.src.svg))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}

export { images }