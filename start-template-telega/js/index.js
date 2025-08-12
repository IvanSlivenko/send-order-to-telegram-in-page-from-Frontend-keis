"use strict"
//==========================================
const TELEGRAM_BOT_TOKEN = '8364283814:AAGqGWOrpALFYdvkAwRacoNzm1Ws-LDmni0';
const TELEGRAM_CHAT_ID = '@testUmanProger';// Назва групи в телеграм
const API = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`

async function sendEmailTelegram(event) {
    event.preventDefault();

    const form = event.target;

    const formBtn = document.querySelector('.form__submit-button button');
    const formSendResult = document.querySelector('.form__send-result');
    formSendResult.textContent = '';

    // const formData = new FormData(form);
    // const formDataObject = Object.fromEntries(formData.entries())

    const { name, email, phone, pass } = Object.fromEntries(new FormData(form).entries());

    const text = `Заявка від ${name} \nemail: ${email}\ntelephon:${phone}\nвідомості з паспорта${pass} `

    try {
        formBtn.textContent='Loading...'
        const response = await fetch(API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: text,

            })
        });

        if(response.ok){
            formSendResult.textContent = "Ваше замовлення отримано.";
            form.reset();
        }else{
            throw new Error(response.statusText)
        }

    } catch (error) {
        console.error(error);
        formSendResult.textContent = "З вашим замовленням виникли трудноші, спробуйте через 30 хвилин.";
        formSendResult.style.color = "red";

    }finally{
        formBtn.textContent='Відправити';
    }

}