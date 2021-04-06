class Form {
    constructor() {
        this.form = document.querySelector('.popup__form');
        document.addEventListener('click', this.check)
    }

    check(e) {
        if (e.target.classList.contains('.popup__radio')) {
            if (e.target.input.checked) {
                console.log(e.target)
            }
        }
    }
}