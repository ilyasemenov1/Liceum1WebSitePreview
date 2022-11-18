
import fs from "fs";
import fonter from "gulp-fonter-fix";
import ttf2woff2 from "gulp-ttf2woff2";

let fromfToTtf = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.otf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ["ttf"]
        }))
        .pipe(app.gulp.dest(`${app.path.srcFolder}/fonts/`))
}

let fromTtfToWoff = () => {
    return app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`, {})
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "FONTS",
                message: "Error: <%= error.message %>"
            })
        ))
        .pipe(fonter({
            formats: ["woff"]
        }))
        .pipe(app.gulp.dest(`${app.path.build.fonts}`))
        .pipe(app.gulp.src(`${app.path.srcFolder}/fonts/*.ttf`))
        .pipe(ttf2woff2())
        .pipe(app.gulp.dest(`${app.path.build.fonts}/`))
}

let fontStyle = () => {
    let fontsFile = `${app.path.srcFolder}/scss/fonts.scss`;
    fs.readdir(app.path.build.fonts, function(err, fontsFiles) {
        if (!fontsFiles) {
            return;
        }

        if (!fs.existsSync(fontsFile)) {
            fs.writeFile(fontsFile, "", cb);
            let newFileOnly;
            fontsFiles.forEach(element => {
                let fontStyle = "normal";
                let fontFileName = element.split(".")[0];
                if (newFileOnly !== fontFileName) {
                    let fontName = fontFileName.split("-")[0] ? fontFileName.split("-")[0] : fontFileName;
                    let fontWeight = fontFileName.split("-")[1] ? fontFileName.split("-")[1] : fontFileName;
                    let fontConf = fontWeight.toLowerCase();
                    if (fontConf == "thin") {
                        fontWeight = 100;
                    } else if (fontConf.match(/extralight/)) {
                        fontWeight = 200;
                    } else if (fontConf.match(/light/)) {
                        fontWeight = 300;
                    } else if (fontConf.match(/medium/)) {
                        fontWeight = 500;
                    } else if (fontConf.match(/semibold/)) {
                        fontWeight = 600;
                    } else if (fontConf.match(/extrabold|heavy/)) {
                        fontWeight = 800;
                    } else if (fontConf.match(/bold/)) {
                        fontWeight = 700;
                    } else if (fontConf.match(/black/)) {
                        fontWeight = 900;
                    } else {
                        fontWeight = 400;
                    }

                    if (fontConf.match(/italic/)) {
                        fontStyle = "italic";
                    } else if (fontConf.match(/oblique/)) {
                        fontStyle = "oblique";
                    }

                    fs.appendFile(fontsFile, `@font-face {\n\tfont-family: ${fontName};\n\tfont-display: swap;\n\tsrc: url("../fonts/${fontFileName}.woff2") format("woff2"),\n\t\t url("../fonts/${fontFileName}.woff") format("woff");\n\tfont-weight: ${fontWeight};\n\tfont-style: ${fontStyle};\n}\r\n`, cb);
                    newFileOnly = fontFileName;
                }
            });
        } else {
            console.log("scss/fonts.csss have already exsist");
        }
    });
    return app.gulp.src(`${app.path.srcFolder}`);
    function cb() { }
}

export { fromfToTtf, fromTtfToWoff, fontStyle }