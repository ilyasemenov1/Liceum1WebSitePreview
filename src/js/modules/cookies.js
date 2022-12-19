
function cookiesEvents() {
    let isCookies = JSON.parse(localStorage.getItem("isCookies"));

    if (!isCookies) {
        createCookiesMenu();
        cookiesAccEevnt();
        window.addEventListener("resize", () => {
            add_pos();
        });
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
    let left = window.innerWidth / 2 - cookies_menu.clientWidth / 2;
    let top = cookies_menu.clientHeight + 15;

    cookies_menu.classList.add("active");
    cookies_menu.style = `left: ${left}px; top: calc(100vh - ${top}px);`;
}

function cookiesAccEevnt() {
    let accButton = document.querySelector(".cookies_sup");
    accButton.addEventListener("click", () => {
        localStorage.setItem("isCookies", JSON.stringify(true));

        let cookies_menu = document.querySelector(".cookies");
        cookies_menu.classList.add("remove");
        setTimeout(() => {
            cookies_menu.remove();
        }, 300);
    });
}

export { cookiesEvents }