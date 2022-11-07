
import svgSprite from "gulp-svg-sprite";

let svgSpriteFunc = () => {
    return app.gulp.src(app.path.src.svgicons)
    .pipe(app.plugins.plumber(
        app.plugins.notify.onError({
            title: "HTML",
            message: "Error: <%= error.message %>"
        })
    ))
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: `../icons/icons.svg`,
                example: true
            }
        }
    }))
    .pipe(app.gulp.dest(app.path.build.images))
    .pipe(app.plugins.browsersync.stream())
}

export { svgSpriteFunc }