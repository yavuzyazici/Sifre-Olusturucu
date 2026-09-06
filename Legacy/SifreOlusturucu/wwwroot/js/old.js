
//document.addEventListener("DOMContentLoaded", function () {
//    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//    const lengthInput = document.getElementById('length');
//    const generatedPasswordInput = document.getElementById('generated-password');
//    const sifreolusturucuDiv = document.getElementById('sifreolusturucuDiv');

//    checkboxes.forEach(checkbox => {
//        checkbox.addEventListener('change', function () {
//            const checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);
//            if (checkedCheckboxes.length === 0) {
//                this.checked = true;
//            }
//            updatePassword();
//        });
//    });

//    Accordion Codes
//    document.querySelectorAll('.accordion-header').forEach(header => {
//        header.addEventListener('click', () => {
//            const icon = header.querySelector('.accordion-icon');
//            const content = header.nextElementSibling;

//            icon.classList.toggle('accordion-active');
//            header.classList.toggle('accordion-active');

//            if (content.classList.contains('accordion-active')) {

//                content.classList.remove('accordion-active');
//                content.style.maxHeight = '0';
//                content.style.opacity = '0';
//                content.style.padding = '0 2rem';
//            } else {

//                content.classList.add('accordion-active');

//                content.style.padding = '0 2rem';
//                content.style.maxHeight = content.scrollHeight + '0' + 'px';
//                content.style.opacity = '1';

//                setTimeout(() => {
//                    content.style.padding = '2rem';
//                }, 100);
//            }
//        });
//    });

//    lengthInput.addEventListener('input', function () {
//        updatePassword();
//    });

//    window.updateLength = function (change) {
//        const currentValue = parseInt(lengthInput.value);
//        const newValue = currentValue + change;
//        if (newValue >= parseInt(lengthInput.min) && newValue <= parseInt(lengthInput.max)) {
//            lengthInput.value = newValue;
//            updatePassword();
//        }
//    }

//    window.updatePassword = function () {
//        const formData = new FormData();
//        formData.append('length', lengthInput.value);
//        formData.append('useUpper', document.querySelector('input[name="useUpper"]').checked);
//        formData.append('useLower', document.querySelector('input[name="useLower"]').checked);
//        formData.append('useNumber', document.querySelector('input[name="useNumber"]').checked);
//        formData.append('useSpecial', document.querySelector('input[name="useSpecial"]').checked);

//        fetch('@Url.Action("GeneratePassword", "Home")', {
//            method: 'POST',
//            body: formData
//        })
//            .then(response => response.json())
//            .then(data => {
//                generatedPasswordInput.value = data.generatedPassword;
//                sifreolusturucuDiv.className = `relative rounded-full transition-all duration-150 input-container shadow-[0_6px_0_0_var(--bg-primary)] validate-${data.securityScore}`;
//            })
//            .catch(error => console.error('Error:', error));
//    }

//    function copyPassword() {
//        var copyText = document.getElementById("generated-password");
//        copyText.select();
//        copyText.setSelectionRange(0, 99999);
//        copyTextToClipboard(copyText)
//        alert("Parola kopyalandı: " + copyText.value);
//    }

//     Initial password generation
//    updatePassword();
//});

//function updateLengthValue(value) {
//    updatePassword();
//}

// Generate Current Year
//const currentYear = new Date().getFullYear();
//document.querySelector('.year').innerHTML = currentYear;

//function copyTextToClipboard(text) {
//    if (navigator.clipboard) {
//        navigator.clipboard.writeText(text).then(function () {
//            console.log('Metin başarıyla kopyalandı: ', text);
//        }).catch(function (err) {
//            console.error('Kopyalama sırasında bir hata oluştu: ', err);
//        });
//    } else {
//         Tarayıcı Clipboard API'sini desteklemiyorsa eski yöntemi kullanabilirsiniz.
//        fallbackCopyTextToClipboard(text);
//    }
//}

//function fallbackCopyTextToClipboard(text) {
//    var textArea = document.createElement("textarea");
//    textArea.value = text;

//     Kullanıcı arayüzünü gizle
//    textArea.style.position = "fixed";
//    textArea.style.top = "0";
//    textArea.style.left = "0";
//    textArea.style.width = "2em";
//    textArea.style.height = "2em";
//    textArea.style.padding = "0";
//    textArea.style.border = "none";
//    textArea.style.outline = "none";
//    textArea.style.boxShadow = "none";
//    textArea.style.background = "transparent";

//    document.body.appendChild(textArea);
//    textArea.select();

//    try {
//        var successful = document.execCommand('copy');
//        var msg = successful ? 'başarılı' : 'başarısız';
//        console.log('Kopyalama işlemi ' + msg);
//    } catch (err) {
//        console.error('Kopyalama işlemi başarısız oldu', err);
//    }

//    document.body.removeChild(textArea);
//}