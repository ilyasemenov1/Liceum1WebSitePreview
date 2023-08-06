import gulp from 'gulp';
import markdown from 'gulp-markdown';

export let md = () => {
    return app.gulp.src(app.path.src.md, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "ZIP",
                message: "Error: <%= error.message %>"
            })
            ))
        .pipe(markdown())
        .pipe(gulp.dest(app.path.build.md))
}