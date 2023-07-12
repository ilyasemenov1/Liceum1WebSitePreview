
import fileInclude from "gulp-file-include";
import webHtmlNoSvg from "gulp-webp-html-nosvg";
import versionNumber from "gulp-version-number";
import htmlmin from 'gulp-htmlmin';
import minifyInline from 'gulp-minify-inline';

let html = () => {
    return app.gulp.src(app.path.src.html)
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "HTML",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fileInclude())
        .pipe(app.plugins.replace(/@img\//g, "img/"))
        .pipe(webHtmlNoSvg())
        .pipe(versionNumber({
            "value": "%DT%",
            "append": {
                "key": "_v",
                "cover": 0,
                "to": [
                    "css",
                    "js"
                ]
            },
            "output": {
                "file": "gulp/version.json"
            }
        }))
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(minifyInline())
        .pipe(app.gulp.dest(app.path.build.html))
        .pipe(app.plugins.browsersync.stream())
}

export { html }