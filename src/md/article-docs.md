# Документация по ведению статей

## Заголовки

- # Заговок h1
    *Основной заголовок статьи*

- ## Заголовок h2
    *Используется для названия разделов статьи. Используется в навигации (все заголовки h2 используются в навигации по статье)*
    
- ### Заголовок h3
    *Используется для названия подпункта статьи*
    
- ### *Можно использовать по своему усмотрению:*
    - #### Заголовок h4
    - ##### Заголовок h5
    - ###### Заголовок h6
    
### *Markdown код этого раздела:*

```markdown
## Заголовки

- # Заговок h1
*Основной заголовок статьи*

- ## Заголовок h2
*Используется для названия разделов статьи. Используется в навигации (все заголовки h2 используются в навигации по статье)*

- ### Заголовок h3
*Используется для названия подпункта статьи*

- ### *Можно использовать по своему усмотрению:*
- #### Заголовок h4
- ##### Заголовок h5
- ###### Заголовок h6
```

## Списки

### Маркированные списки:

- Элемент 1
- Элемент 2
- Элемент 3
- Элемент 4

### Нумерованные списки:

1. Элемент 1
1. Элемент 2
1. Элемент 3
1. Элемент 4

### Вложенные списки:

- Элемент 1
    - Элемент 1.1
    - Элемент 1.2
        - Элемент 1.2.1
        
1. Элемент 1
    1. Элемент 1.1
    1. Элемент 1.2
        1. Элемент 1.2.1
        
### *Markdown код этого раздела:*

```markdown
## Списки

### Маркированные списки:

- Элемент 1
- Элемент 2
- Элемент 3
- Элемент 4

### Нумерованные списки:

1. Элемент 1
1. Элемент 2
1. Элемент 3
1. Элемент 4

### Вложенные списки:

- Элемент 1
    - Элемент 1.1
    - Элемент 1.2
        - Элемент 1.2.1

1. Элемент 1
    1. Элемент 1.1
    1. Элемент 1.2
        1. Элемент 1.2.1
```

## Markdown синтаксис

- **Жирный текст**
- *Наклонный текст*
- ***Жирный наклонный текст***
- `Выделенный блок`
- ### Большой выделенный блок:
`ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
### *Блок кода:*
```javascript
const ADD_DELAY = 80
const REMOVE_ANIMATION_DELAY = 1000
const ELEMENT_REMOVE_DELAY = 200
new Promise((res, rej) => {
    let notifyElemet = document.querySelector(".buffer-notify");
    setTimeout(() => {
        let left = window.innerWidth / 2 - notifyElemet.clientWidth / 2 - 15;
        let top = window.innerHeight - notifyElemet.clientHeight - 30;
        notifyElemet.style = `left: ${left}px; top: ${top}px`;
        notifyElemet.classList.add("active")
        res(notifyElemet)
    }, ADD_DELAY)
})
.then((notifyElemet) => {
    new Promise((res, rej) => {
        setTimeout(() => {
            notifyElemet.classList.add("remove");
            res(notifyElemet);
        }, REMOVE_ANIMATION_DELAY)
    })
    .then((notifyElemet) => {
        setTimeout(() => {
            notifyElemet.remove();
            sessionStorage.setItem("isAddNotify", JSON.stringify(true));
        }, ELEMENT_REMOVE_DELAY)
    });
});
```

### *Markdown код этого раздела:*

```markdown
- **Жирный текст**
- *Наклонный текст*
- ***Жирный наклонный текст***
- `Выделенный блок`
- ### Большой выделенный блок:
`ontrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.`
### *Блок кода:*
```javascript
const ADD_DELAY = 80
const REMOVE_ANIMATION_DELAY = 1000
const ELEMENT_REMOVE_DELAY = 200
new Promise((res, rej) => {
    let notifyElemet = document.querySelector(".buffer-notify");
    setTimeout(() => {
        let left = window.innerWidth / 2 - notifyElemet.clientWidth / 2 - 15;
        let top = window.innerHeight - notifyElemet.clientHeight - 30;
        notifyElemet.style = `left: ${left}px; top: ${top}px`;
        notifyElemet.classList.add("active")
        res(notifyElemet)
    }, ADD_DELAY)
})
.then((notifyElemet) => {
    new Promise((res, rej) => {
        setTimeout(() => {
            notifyElemet.classList.add("remove");
            res(notifyElemet);
        }, REMOVE_ANIMATION_DELAY)
    })
    .then((notifyElemet) => {
        setTimeout(() => {
            notifyElemet.remove();
            sessionStorage.setItem("isAddNotify", JSON.stringify(true));
        }, ELEMENT_REMOVE_DELAY)
    });
});
```

## Картинки

###  Картинка

![Director](@img/page/director/director.jpg)

### "Сетка" из картинок:

<div class="page-article_img-grid">
    <img alt="content-img" src="@img/website-content/nzo1.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo2.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo3.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo4.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo5.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo6.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo7.jpg" role="button">
</div>

### *Markdown код этого раздела:*

```markdown
## Картинки

###  Картинка

![Director](@img/page/director/director.jpg)

### "Сетка" из картинок:

<div class="page-article_img-grid">
    <img alt="content-img" src="@img/website-content/nzo1.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo2.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo3.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo4.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo5.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo6.jpg" role="button">
    <img alt="content-img" src="@img/website-content/nzo7.jpg" role="button">
</div>
```