import del from "del";

let reset = () => {
    return del(app.path.clean)
}

export { reset }