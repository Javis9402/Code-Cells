function sendFormByEmail(form) {
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const select = form.querySelector("select");
    const messageType = select.selectedOptions[0].text;
    const message = form.message.value.trim();

    const subject = `Contacto desde el sitio - ${messageType}`;

    const body = `Nombre: ${name}
Correo: ${email}
Tipo de mensaje: ${messageType}

Mensaje:
${message}`;

    const mailtoLink =
        `mailto:tu-correo@ejemplo.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoLink;
}

const formulario = document.querySelector("form");

formulario.addEventListener("submit", (event) => {
    event.preventDefault();

    sendFormByEmail(formulario);
});