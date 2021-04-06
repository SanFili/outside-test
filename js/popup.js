class Popup {
    constructor() {
        this.popup = document.querySelector('.popup');
        this.startBtn = document.querySelector('.start-page__btn');
        this.closeBtn = document.querySelector('.popup__close');
        this.calcBtn = document.querySelector('.popup__calc');
        this.form = document.querySelector('.popup__form');
        this.input = document.querySelector('.popup__input');
        this.open = this.open.bind(this);
        this.close = this.close.bind(this);
        this.calculate = this.calculate.bind(this);
        this.clear = this.clear.bind(this);
        this.render = this.render.bind(this);
        this.error = this.error.bind(this);
        this.setListeners = this.setListeners.bind(this);
    }

    open() {
        this.popup.classList.add('popup_is-opened');
    }

    close() {
        this.popup.classList.remove('popup_is-opened');
        this.clear();
        this.input.value = '';
    }

    calculate() {
        const inputValue = this.input.value;
        const payments = [];
        if (inputValue !== '') {
            const yearPayment = inputValue*12*0.13;
            payments.push(yearPayment);
            let fullPay =  payments.reduce((sum, item) => sum + item, 0)
            while (fullPay < 260000) {
                const yearPayment = inputValue*12*0.13;
                payments.push(yearPayment);
                fullPay =  payments.reduce((sum, item) => sum + item, 0)
            } if (fullPay > 260000) {
                const yearPayment = payments[payments.length - 1] - (fullPay - 260000);
                payments.splice(-1, 1, yearPayment);
            }
            this.clear();
            this.render(payments);
        } else {
            this.clear();   
        }
        this.error();
    }

    error() {
        if (this.input.value == '') {
            document.querySelector('.error-msg').textContent = 'Поле обязательно для заполнения';
            this.input.classList.add('popup__input_error');
        } else {
            document.querySelector('.error-msg').textContent = '';
            this.input.classList.remove('popup__input_error');
        }

    }

    clear() {
        if (document.querySelector('.popup__subtitle_final')) {
            document.querySelector('.popup__subtitle_final').remove();
            document.querySelectorAll('.popup__check').forEach((el) => el.remove());
            document.querySelectorAll('br').forEach((el) => el.remove());
        }
    }

    render(payments) {
        const checkboxTitle = `
        <h3 class="popup__subtitle popup__subtitle_final">Итого можете внести в качестве досрочных:</h3>`;
        this.calcBtn.insertAdjacentHTML('afterend', checkboxTitle);
        payments.forEach((pay, index) => {
            const label = `${pay} рублей`;
            const span = `в ${index+1}-й год`;
            const check = `
            <label class="popup__check"><input type="checkbox" name="check" ><span class="text">${label}<span>${span}</span></span></label><br>`
            this.form.insertAdjacentHTML('beforebegin', check);
        })
    }

    setListeners() {
        this.startBtn.addEventListener('click', this.open);
        this.closeBtn.addEventListener('click', this.close);
        this.calcBtn.addEventListener('click', this.calculate);
        this.input.addEventListener('keydown', () => {
            if(event.code === 'Enter') {
                this.calculate();
            }
        })
    } 
}