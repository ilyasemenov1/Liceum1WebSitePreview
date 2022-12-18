
function cookiesEvents() {
    let isCookies = JSON.parse(localStorage.getItem("isCookies"));

    if (!isCookies) {
        createCookiesMenu();

    }
}

function createCookiesMenu() {
    let cookies = document.createElement("div");
    cookies.className = "cookies";

    cookies.innerHTML = `
    <div class="cookies_content">
        <span>Мы используем cookies!</span>
        <div class="cookies_buttons">
            <button class="cookies_for">Для чего?</button>
            <button class="cookies_sup">Понятно</button>
        </div>
    </div>
    `;
    document.body.append(cookies);

    setTimeout(() => {
        add_pos();
    }, 80);
}

function add_pos() {
    let cookies_menu = document.querySelector(".cookies");
    let top = cookies_menu.clientHeight + 15;

    cookies_menu.classList.add("active");
    cookies_menu.style = `top: calc(100vh - ${top}px);`;
}

export { cookiesEvents }