document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    const lengthInput = document.getElementById('length');
    const generatedPasswordInput = document.getElementById('generated-password');
    const sifreolusturucuDiv = document.getElementById('sifreolusturucuDiv');
    const copyButton = document.getElementById('copy-button');

    const defaultShadowOverlay = document.querySelector('.default-shadow-overlay');
    const shadowOverlay = document.querySelector('.shadow-overlay');

    // Yerel depolamadan seçimleri yükle
    const savedUseUpper = localStorage.getItem('useUpper') === 'true' || true;
    const savedUseLower = localStorage.getItem('useLower') === 'true' || true;
    const savedUseNumber = localStorage.getItem('useNumber') === 'true' || true;
    const savedUseSpecial = localStorage.getItem('useSpecial') === 'true' || true;
    const savedPasswordLength = localStorage.getItem('passwordLength') || 18; // Varsayılan uzunluk 18

    document.querySelector('input[name="useUpper"]').checked = savedUseUpper;
    document.querySelector('input[name="useLower"]').checked = savedUseLower;
    document.querySelector('input[name="useNumber"]').checked = savedUseNumber;
    document.querySelector('input[name="useSpecial"]').checked = savedUseSpecial;
    lengthInput.value = savedPasswordLength;

    // Şifre oluşturma fonksiyonu
    function generatePassword(length, useUpper, useLower, useNumber, useSpecial) {
        const upperCase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowerCase = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
        let allChars = '';
        let password = '';

        if (useUpper) allChars += upperCase;
        if (useLower) allChars += lowerCase;
        if (useNumber) allChars += numbers;
        if (useSpecial) allChars += specialChars;

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * allChars.length);
            password += allChars[randomIndex];
        }

        return password;
    }

    // Şifre güncelleme fonksiyonu
    window.updatePassword = function () {
        const length = parseInt(lengthInput.value);
        const useUpper = document.querySelector('input[name="useUpper"]').checked;
        const useLower = document.querySelector('input[name="useLower"]').checked;
        const useNumber = document.querySelector('input[name="useNumber"]').checked;
        const useSpecial = document.querySelector('input[name="useSpecial"]').checked;

        // Seçimleri yerel depolamaya kaydet
        localStorage.setItem('useUpper', useUpper);
        localStorage.setItem('useLower', useLower);
        localStorage.setItem('useNumber', useNumber);
        localStorage.setItem('useSpecial', useSpecial);
        localStorage.setItem('passwordLength', length);

        const password = generatePassword(length, useUpper, useLower, useNumber, useSpecial);
        generatedPasswordInput.value = password;


        // Güvenlik skoru hesaplama (örnek olarak basit bir hesaplama)
        const securityScore = calculateSecurityScore(length);
        const color = getColorForScore(securityScore);
        const width = getWidthForScore(securityScore);
        sifreolusturucuDiv.style.setProperty('--shadow-color', color);
        if (width !== '100%') {
            shadowOverlay.style.width = width;
            shadowOverlay.style.background = 'transparent';
        } else {
            shadowOverlay.style.width = '100%';
            shadowOverlay.style.background = 'transparent';
        }
        defaultShadowOverlay.style.width = '100%';
        sifreolusturucuDiv.className = `relative rounded-full transition-all duration-150 input-container shadow-[0_6px_0_0_var(--bg-primary)] validate-` + securityScore.toString();
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            const checkedCheckboxes = Array.from(checkboxes).filter(cb => cb.checked);
            if (checkedCheckboxes.length === 0) {
                this.checked = true;
            }
            updatePassword();
        });
    });

    lengthInput.addEventListener('input', function () {
        updatePassword();
    });

    window.updateLength = function (change) {
        const currentValue = parseInt(lengthInput.value);
        const newValue = currentValue + change;
        if (newValue >= parseInt(lengthInput.min) && newValue <= parseInt(lengthInput.max)) {
            lengthInput.value = newValue;
            updatePassword();
        }
    }

    copyButton.addEventListener('click', function () {
        const copyText = generatedPasswordInput.value;
        navigator.clipboard.writeText(copyText).then(() => {
            alert("Parola kopyalandı: " + copyText);
        }).catch(err => {
            console.error('Kopyalama hatası:', err);
        });
    });
    //function copyPassword() {
    //    const copyText = document.getElementById("generated-password").value;

    //    if (navigator.clipboard && window.isSecureContext) {
    //        // navigator.clipboard API kullanımı (Modern tarayıcılar)
    //        navigator.clipboard.writeText(copyText).then(() => {
    //            alert("Parola kopyalandı: " + copyText);
    //        }, (err) => {
    //            console.error('Kopyalama hatası:', err);
    //        });
    //    } else {
    //        // document.execCommand kullanımı (Eski yöntem)
    //        const textArea = document.createElement("textarea");
    //        textArea.value = copyText;
    //        // Metin alanını ekleyip seçmek
    //        document.body.appendChild(textArea);
    //        textArea.select();
    //        textArea.setSelectionRange(0, 99999); // Mobil cihazlar için
    //        try {
    //            const successful = document.execCommand('copy');
    //            const msg = successful ? 'successful' : 'unsuccessful';
    //            alert("Parola kopyalandı: " + copyText);
    //        } catch (err) {
    //            console.error('Kopyalama hatası:', err);
    //        }
    //        // Metin alanını kaldır
    //        document.body.removeChild(textArea);
    //    }
    //}

    function calculateSecurityScore(length) {
        let score = 0;
        if (length < 5) score = 1;
        else if (length > 4 && length <= 7) score = 2;
        else if (length > 7 && length <= 9) score = 3;
        else if (length > 9 && length <= 11) score = 4;
        else if (length > 11) score = 5;

        return score;
    }

    function getColorForScore(score) {
        switch (score) {
            case 1: return 'var(--bg-primary)';
            case 2: return 'var(--red)';
            case 3: return 'var(--orange)';
            case 4: return '#4FD868';
            default: return '#4BB592';
        }
    }

    function getWidthForScore(score) {
        switch (score) {
            case 1: return '20%';
            case 2: return '40%';
            case 3: return '60%';
            case 4: return '80%';
            default: return '100%';
        }
    }


    // Accordion kodları
    document.querySelectorAll('.accordion-header').forEach(header => {
        header.addEventListener('click', () => {
            const icon = header.querySelector('.accordion-icon');
            const content = header.nextElementSibling;

            icon.classList.toggle('accordion-active');
            header.classList.toggle('accordion-active');

            if (content.classList.contains('accordion-active')) {
                content.classList.remove('accordion-active');
                content.style.maxHeight = '0';
                content.style.opacity = '0';
                content.style.padding = '0 2rem';
            } else {
                content.classList.add('accordion-active');
                content.style.padding = '0 2rem';
                content.style.maxHeight = content.scrollHeight + '0' + 'px';
                content.style.opacity = '1';

                setTimeout(() => {
                    content.style.padding = '2rem';
                }, 100);
            }
        });
    });

    // Yıl güncelleme
    const currentYear = new Date().getFullYear();
    document.querySelector('.year').innerHTML = currentYear;

    // İlk şifre oluşturma
    updatePassword();
});
