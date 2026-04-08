let currentLang = 'zh';

let currentCalendarDate = new Date(2025, 10);

const events = {
    '2025-10': [
        { date: 5, title_zh: '畢業照拍攝方案登記截止', title_en: 'Photography Registration Deadline', type: 'urgent' },
        { date: 20, title_zh: '畢業服租借/購買登記截止', title_en: 'Gown Registration Deadline', type: 'urgent' },
        { date: 25, title_zh: '繳費截止日', title_en: 'Payment Deadline', type: 'important' }
    ],
    '2025-11': [
        { date: 4, title_zh: '學位照拍攝 (15:30-16:30，T4 廣場)', title_en: 'Portrait Session (15:30-16:30, T4 Plaza)', type: 'highlight' },
        { date: 11, title_zh: '領取畢業袍 (13:35-13:55，T4 廣場)', title_en: 'Gown Collection (13:35-13:55, T4 Plaza)', type: 'highlight' },
        { date: 20, title_zh: '畢業服尺寸更換日', title_en: 'Gown Size Exchange Day', type: 'normal' },
        { date: 21, title_zh: '畢業服尺寸更換日', title_en: 'Gown Size Exchange Day', type: 'normal' }
    ],
    '2025-12': [
        { date: 4, title_zh: '團體照拍攝日 (14:20-15:10，大門)', title_en: 'Group Photo Session (14:20-15:10, Main Gate)', type: 'highlight' }
    ],
    '2026-05': [
        { date: 23, title_zh: '發放實體照片', title_en: 'Physical Photo Distribution', type: 'normal' }
    ],
    '2026-06': [
        { date: 26, title_zh: '歸還畢業服', title_en: 'Gown Return', type: 'normal' }
    ]
};

function toggleLanguage() {
    const zhContent = document.getElementById('content-zh');
    const enContent = document.getElementById('content-en');
    const langBtn = document.getElementById('lang-btn-text');

    if (currentLang === 'zh') {
        zhContent.classList.remove('active');
        enContent.classList.add('active');
        langBtn.textContent = '中文';
        currentLang = 'en';
    } else {
        enContent.classList.remove('active');
        zhContent.classList.add('active');
        langBtn.textContent = 'English';
        currentLang = 'zh';
    }

    updateCalendar();
}

function toggleFAQ(element) {
    const answer = element.nextElementSibling;
    const allAnswers = document.querySelectorAll('.faq-answer');

    allAnswers.forEach(item => {
        if (item !== answer) {
            item.classList.remove('active');
        }
    });

    answer.classList.toggle('active');
}

function changeMonth(direction) {
    currentCalendarDate.setMonth(currentCalendarDate.getMonth() + direction);
    updateCalendar();
}

function updateCalendar() {
    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const monthNames_zh = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'];
    const monthNames_en = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const monthTitleZh = document.getElementById('current-month-zh');
    const monthTitleEn = document.getElementById('current-month-en');

    if (monthTitleZh) {
        monthTitleZh.textContent = `${year}年 ${monthNames_zh[month]}`;
    }
    if (monthTitleEn) {
        monthTitleEn.textContent = `${monthNames_en[month]} ${year}`;
    }

    generateCalendarDays(year, month);

    updateMonthEvents(year, month);
}

function generateCalendarDays(year, month) {
    const calendarDaysZh = document.getElementById('calendar-days-zh');
    const calendarDaysEn = document.getElementById('calendar-days-en');

    if (!calendarDaysZh && !calendarDaysEn) return;

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const prevMonthLastDay = new Date(year, month, 0).getDate();

    let daysHTML = '';
    const today = new Date();
    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthEvents = events[monthKey] || [];

    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
        const day = prevMonthLastDay - i;
        daysHTML += `<div class="calendar-day other-month">${day}</div>`;
    }

    for (let day = 1; day <= daysInMonth; day++) {
        let classes = 'calendar-day';

        if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
            classes += ' today';
        }

        const dayEvents = monthEvents.filter(event => event.date === day);
        if (dayEvents.length > 0) {
            const eventType = dayEvents[0].type;
            if (eventType === 'urgent') {
                classes += ' has-urgent';
            } else if (eventType === 'important') {
                classes += ' has-important';
            } else if (eventType === 'highlight') {
                classes += ' has-event';
            } else {
                classes += ' has-event';
            }
        }

        daysHTML += `<div class="${classes}">${day}</div>`;
    }

    const totalCells = Math.ceil((firstDayOfWeek + daysInMonth) / 7) * 7;
    const remainingCells = totalCells - (firstDayOfWeek + daysInMonth);
    for (let day = 1; day <= remainingCells; day++) {
        daysHTML += `<div class="calendar-day other-month">${day}</div>`;
    }

    if (calendarDaysZh) {
        calendarDaysZh.innerHTML = daysHTML;
    }
    if (calendarDaysEn) {
        calendarDaysEn.innerHTML = daysHTML;
    }
}

function updateMonthEvents(year, month) {
    const monthEventsZh = document.getElementById('month-events-zh');
    const monthEventsEn = document.getElementById('month-events-en');

    const monthKey = `${year}-${String(month + 1).padStart(2, '0')}`;
    const monthEvents = events[monthKey] || [];

    let eventsHTML = '';

    if (monthEvents.length === 0) {
        eventsHTML = currentLang === 'zh' ?
            '<div class="no-events">無重要事件</div>' :
            '<div class="no-events">No important events</div>';
    } else {
        monthEvents.forEach(event => {
            const title = currentLang === 'zh' ? event.title_zh : event.title_en;
            eventsHTML += `
                <div class="event-item ${event.type}">
                    <div class="event-date">${event.date}</div>
                    <div class="event-title">${title}</div>
                </div>
            `;
        });
    }

    if (monthEventsZh && currentLang === 'zh') {
        monthEventsZh.innerHTML = eventsHTML;
    }
    if (monthEventsEn && currentLang === 'en') {
        monthEventsEn.innerHTML = eventsHTML;
    }
}
function calculateTotal() {
    const gownPlan = document.getElementById('gown-plan').value;
    const photoPlan = document.getElementById('photo-plan').value;
    const totalPriceElement = document.getElementById('total-price');

    let gownPrice = 0;
    let photoPrice = 0;
    let deposit = 0;

    if (gownPlan.includes('$500')) {
        gownPrice = 500;
        deposit = 1000;
    } else if (gownPlan.includes('$1000')) {
        gownPrice = 1000;
        deposit = 500;
    } else if (gownPlan.includes('$1500')) {
        gownPrice = 1500;
        deposit = 0;
    }

    if (photoPlan.includes('$550')) {
        photoPrice = 550;
    } else if (photoPlan.includes('$350')) {
        photoPrice = 350;
    } else if (photoPlan.includes('$300')) {
        photoPrice = 300;
    } else if (photoPlan.includes('$0')) {
        photoPrice = 0;
    }

    if (gownPrice > 0 && photoPlan) {
        const total = gownPrice + photoPrice + deposit;
        if (deposit > 0) {
            totalPriceElement.textContent = `NT$ ${total.toLocaleString()} (含押金$${deposit})`;
        } else {
            totalPriceElement.textContent = `NT$ ${total.toLocaleString()}`;
        }
        totalPriceElement.style.color = '#4CAF50';
    } else {
        totalPriceElement.textContent = '請選擇方案';
        totalPriceElement.style.color = '#999';
    }
}

function calculateTotalEn() {
    const gownPlan = document.getElementById('gown-plan-en').value;
    const photoPlan = document.getElementById('photo-plan-en').value;
    const totalPriceElement = document.getElementById('total-price-en');

    let gownPrice = 0;
    let photoPrice = 0;
    let deposit = 0;

    if (gownPlan.includes('NT$500')) {
        gownPrice = 500;
        deposit = 1000;
    } else if (gownPlan.includes('NT$1000')) {
        gownPrice = 1000;
        deposit = 500;
    } else if (gownPlan.includes('NT$1500')) {
        gownPrice = 1500;
        deposit = 0;
    }

    if (photoPlan.includes('NT$550')) {
        photoPrice = 550;
    } else if (photoPlan.includes('NT$350')) {
        photoPrice = 350;
    } else if (photoPlan.includes('NT$300')) {
        photoPrice = 300;
    } else if (photoPlan.includes('NT$0')) {
        photoPrice = 0;
    }

    if (gownPrice > 0 && photoPlan) {
        const total = gownPrice + photoPrice + deposit;
        if (deposit > 0) {
            totalPriceElement.textContent = `NT$ ${total.toLocaleString()} (incl. $${deposit} deposit)`;
        } else {
            totalPriceElement.textContent = `NT$ ${total.toLocaleString()}`;
        }
        totalPriceElement.style.color = '#4CAF50';
    } else {
        totalPriceElement.textContent = 'Please select plans';
        totalPriceElement.style.color = '#999';
    }
}

function addInteractivity() {
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        if (!link.hasAttribute('rel') || !link.getAttribute('rel').includes('noopener')) {
            link.setAttribute('rel', 'noopener');
        }

        link.addEventListener('click', function () {
            console.log('External link clicked:', this.href);
        });
    });

    const inputs = document.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', function () {
            if (this.hasAttribute('required') && !this.value.trim()) {
                this.style.borderColor = '#ff6b6b';
            } else {
                this.style.borderColor = 'var(--watson_gray)';
            }
        });

        input.addEventListener('focus', function () {
            this.style.borderColor = 'var(--watson_blue)';
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.info-card, .timeline-item, .plan-card, .service-card');
    animatedElements.forEach(el => {
        el.classList.add('reveal');
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', function () {
    const formZh = document.getElementById('registration-form');
    if (formZh) {
        formZh.addEventListener('submit', function (e) {
            e.preventDefault();
            submitForm('registration-form', false);
        });
    }

    const formEn = document.getElementById('registration-form-en');
    if (formEn) {
        formEn.addEventListener('submit', function (e) {
            e.preventDefault();
            submitForm('registration-form-en', true);
        });
    }

    const toTopBtn = document.querySelector('.toTop');
    if (toTopBtn) {
        toTopBtn.classList.remove('show');

        toTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        window.addEventListener('scroll', function () {
            if (window.scrollY > 300) {
                toTopBtn.classList.add('show');
            } else {
                toTopBtn.classList.remove('show');
            }
        });
    }

    addInteractivity();

    updateCalendar();
});

function validateForm(formId) {
    const form = document.getElementById(formId);
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#ff4444';
            isValid = false;
        } else {
            field.style.borderColor = 'var(--watson_gray)';
        }
    });

    const emailField = form.querySelector('input[type="email"]');
    if (emailField && emailField.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailField.value)) {
            emailField.style.borderColor = '#ff4444';
            isValid = false;
        }
    }

    const studentIdField = form.querySelector('input[name="student-id"]');
    if (studentIdField && studentIdField.value) {
        const studentId = studentIdField.value.trim().toUpperCase();
        if (!/^[A-Z0-9]{9}$/.test(studentId) || studentId.length !== 9) {
            studentIdField.style.borderColor = '#ff4444';
            isValid = false;
        }
    }

    const bankAccountField = form.querySelector('input[name="bank-account"]');
    if (bankAccountField && bankAccountField.value) {
        if (!/^\d{5}$/.test(bankAccountField.value.trim())) {
            bankAccountField.style.borderColor = '#ff4444';
            isValid = false;
        }
    }

    return isValid;
}

function submitForm(formId, isEnglish = false) {
    if (!validateForm(formId)) {
        const message = isEnglish ?
            'Please fill in all required fields correctly.' :
            '請正確填寫所有必填欄位。';
        alert(message);
        return;
    }

    const form = document.getElementById(formId);
    const formData = new FormData(form);

    const params = new URLSearchParams();
    params.append('entry.190104514', formData.get('name') || '');
    params.append('entry.65186038', formData.get('student-id') || '');
    params.append('entry.767067232', formData.get('email') || '');
    params.append('entry.694395905', formData.get('gown-plan') || '');
    params.append('entry.1522487748', formData.get('photo-plan') || '');

    const gownPlan = formData.get('gown-plan') || '';
    const photoPlan = formData.get('photo-plan') || '';
    let gownPrice = 0;
    let photoPrice = 0;
    let deposit = 0;

    if (gownPlan.includes('500')) {
        gownPrice = 500;
        deposit = 1000;
    } else if (gownPlan.includes('1000')) {
        gownPrice = 1000;
        deposit = 500;
    } else if (gownPlan.includes('1500')) {
        gownPrice = 1500;
        deposit = 0;
    }

    if (photoPlan.includes('550')) photoPrice = 550;
    else if (photoPlan.includes('350')) photoPrice = 350;
    else if (photoPlan.includes('300')) photoPrice = 300;
    else if (photoPlan.includes('0')) photoPrice = 0;

    const totalAmount = gownPrice + photoPrice + deposit;
    if (deposit > 0) {
        params.append('entry.1031727261', `NT$ ${totalAmount.toLocaleString()} (含押金$${deposit})`);
    } else {
        params.append('entry.1031727261', `NT$ ${totalAmount.toLocaleString()}`);
    }
    params.append('entry.1993725608', formData.get('bank-account') || '');
    params.append('entry.1748599338', formData.get('notes') || '');

    const url = `https://docs.google.com/forms/d/e/1FAIpQLSfvQExHUEQ5fN9mRO8CvTYwyEVleSO34uo5WQrj00Fk6GEmEA/formResponse?${params.toString()}`;
    window.open(url, '_blank', 'noopener');

    const message = isEnglish ?
        'Form data has been prepared and opened in a new window. Please check the submission there.' :
        '表單資料已準備完成並在新視窗中開啟，請確認已經送出。';

    alert(message);
}