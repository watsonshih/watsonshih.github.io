let currentWeekStart = new Date();
currentWeekStart.setHours(0, 0, 0, 0);
currentWeekStart.setDate(currentWeekStart.getDate() - (currentWeekStart.getDay() || 7) + 1);

let servers = [];
let reservations = [];
let editingReservationId = null;
let viewingReservationId = null;
let currentUser = null;

const loadingOverlay = document.getElementById('loadingOverlay');
const loginContainer = document.getElementById('loginContainer');
const mainContent = document.getElementById('mainContent');
const userModal = document.getElementById('userModal');
const userBox = document.getElementById('userBox');
const closeUserBtn = document.getElementById('closeUserModal');
const addUserBtn = document.getElementById('addUser');
const userEmailInput = document.getElementById('userEmail');
const userRoleSelect = document.getElementById('userRole');
const userList = document.getElementById('userList');
const manageUsersBtn = document.getElementById('manageUsersBtn');

function showLoadingOverlay() {
    loadingOverlay.classList.remove('hidden');
}

function hideLoadingOverlay() {
    loadingOverlay.classList.add('hidden');
}

function setupAutoRefresh() {
    const refreshInterval = 30 * 60 * 1000;

    setInterval(() => {
        console.log("執行自動重新整理...");
        window.location.reload();
    }, refreshInterval);

    console.log(`已設定每 ${refreshInterval / 60000} 分鐘自動重新整理`);
}

function showUserModal() {
    renderUserList();

    userModal.classList.remove('hidden');

    requestAnimationFrame(() => {
        userModal.classList.add('opacity-100');
        userBox.classList.add('opacity-100', 'scale-100');
        userBox.classList.remove('scale-95');
    });
}

function hideUserModal() {
    userModal.classList.remove('opacity-100');
    userBox.classList.remove('opacity-100', 'scale-100');
    userBox.classList.add('scale-95');

    setTimeout(() => {
        userModal.classList.add('hidden');
        userEmailInput.value = '';
    }, 300);
}

function renderUserList() {
    userList.innerHTML = '';

    const allowedUsersRef = window.firebase.ref(window.firebase.db, 'allowedUsers');
    window.firebase.get(allowedUsersRef).then((snapshot) => {
        if (!snapshot.exists()) {
            userList.innerHTML = `<li class="py-3 text-gray-400 text-center">尚无用户</li>`;
            return;
        }

        const usersData = snapshot.val();
        Object.keys(usersData).forEach(emailKey => {
            const email = emailKey.replace(/,/g, '.');
            const role = usersData[emailKey].role || 'user';

            const li = document.createElement('li');
            li.className = 'py-3 flex justify-between items-center';
            li.innerHTML = `
                <div>
                    <span class="text-gray-200">${email}</span>
                    <span class="ml-2 px-2 py-1 text-xs ${role === 'admin' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'} rounded-full">
                        ${role === 'admin' ? '管理員' : '一般使用者'}
                    </span>
                </div>
                <div class="flex space-x-2">
                    <button class="text-blue-400 hover:text-blue-300 change-role" data-email-key="${emailKey}" data-role="${role}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </button>
                    <button class="text-red-400 hover:text-red-300 delete-user" data-email-key="${emailKey}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                </div>
            `;

            li.querySelector('.change-role').addEventListener('click', () => changeUserRole(emailKey, role));
            li.querySelector('.delete-user').addEventListener('click', () => deleteUser(emailKey));

            userList.appendChild(li);
        });
    }).catch(error => {
        console.error("獲取使用者失敗：", error);
        userList.innerHTML = `<li class="py-3 text-gray-400 text-center">獲取使用者數據失敗</li>`;
    });
}

async function addUser(email, role) {
    if (!email || !email.includes('@')) {
        showAlertModal('請輸入有效的電子郵件地址');
        return;
    }

    const emailKey = email.replace(/\./g, ',');
    const userRef = window.firebase.ref(window.firebase.db, `allowedUsers/${emailKey}`);

    try {
        const snapshot = await window.firebase.get(userRef);
        if (snapshot.exists()) {
            showAlertModal('此使用者已存在');
            return;
        }

        await window.firebase.set(userRef, {
            role: role
        });

        userEmailInput.value = '';
        renderUserList();
        showAlertModal('使用者已新增');
    } catch (error) {
        console.error("新增使用者失敗:", error);
        showAlertModal('新增使用者失敗，請重試');
    }
}

async function changeUserRole(emailKey, currentRole) {
    const newRole = currentRole === 'admin' ? 'user' : 'admin';
    const confirmed = await showConfirmModal(`確定要更改使用者身分成${newRole === 'admin' ? '管理員' : '普通使用者'}吗？`);
    if (!confirmed) return;

    const userRef = window.firebase.ref(window.firebase.db, `allowedUsers/${emailKey}/role`);

    try {
        await window.firebase.set(userRef, newRole);
        renderUserList();
        showAlertModal('使用者權限已更改');
    } catch (error) {
        console.error("更改使用者權限失敗:", error);
        showAlertModal('更改使用者權限失敗，請重試');
    }
}

async function deleteUser(emailKey) {
    const confirmed = await showConfirmModal('確定要刪除此使用者嗎？此操作無法撤銷。');
    if (!confirmed) return;

    const userRef = window.firebase.ref(window.firebase.db, `allowedUsers/${emailKey}`);

    try {
        await window.firebase.remove(userRef);
        renderUserList();
        showAlertModal('使用者已删除');
    } catch (error) {
        console.error("刪除錯誤：", error);
        showAlertModal('删除使用者失敗，請重試');
    }
}

function checkUserRole() {
    if (!currentUser) return Promise.resolve(false);

    const userEmailKey = currentUser.email.replace(/\./g, ',');
    const userRoleRef = window.firebase.ref(window.firebase.db, `allowedUsers/${userEmailKey}/role`);

    return window.firebase.get(userRoleRef)
        .then(snapshot => {
            if (snapshot.exists() && snapshot.val() === 'admin') {
                return true;
            }
            return false;
        })
        .catch(error => {
            console.error("使用者身分錯誤:", error);
            return false;
        });
}

function showConfirmModal(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('confirmModal');
        const box = document.getElementById('confirmBox');
        const msg = document.getElementById('confirmMessage');
        const confirmBtn = document.getElementById('confirmBtn');
        const cancelBtn = document.getElementById('cancelBtn');

        msg.textContent = message;
        modal.classList.remove('hidden');

        requestAnimationFrame(() => {
            modal.classList.add('opacity-100');
            box.classList.add('opacity-100', 'scale-100');
            box.classList.remove('scale-95');
        });

        const cleanup = () => {
            modal.classList.remove('opacity-100');
            box.classList.remove('opacity-100', 'scale-100');
            box.classList.add('scale-95');

            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);

            confirmBtn.removeEventListener('click', onConfirm);
            cancelBtn.removeEventListener('click', onCancel);
        };

        const onConfirm = () => {
            cleanup();
            resolve(true);
        };

        const onCancel = () => {
            cleanup();
            resolve(false);
        };

        confirmBtn.addEventListener('click', onConfirm);
        cancelBtn.addEventListener('click', onCancel);
    });
}

function showAlertModal(message) {
    return new Promise((resolve) => {
        const modal = document.getElementById('alertModal');
        const box = document.getElementById('alertBox');
        const msg = document.getElementById('alertMessage');
        const okBtn = document.getElementById('alertOkBtn');

        msg.textContent = message;
        modal.classList.remove('hidden');

        requestAnimationFrame(() => {
            modal.classList.add('opacity-100');
            box.classList.add('opacity-100', 'scale-100');
            box.classList.remove('scale-95');
        });

        const cleanup = () => {
            modal.classList.remove('opacity-100');
            box.classList.remove('opacity-100', 'scale-100');
            box.classList.add('scale-95');

            setTimeout(() => {
                modal.classList.add('hidden');
            }, 300);

            okBtn.removeEventListener('click', onOk);
        };

        const onOk = () => {
            cleanup();
            resolve(true);
        };

        okBtn.addEventListener('click', onOk);
    });
}

const reservationModal = document.getElementById('reservationModal');
const reservationBox = document.getElementById('reservationBox');
const reservationForm = document.getElementById('reservationForm');
const cancelReservationBtn = document.getElementById('cancelReservation');
const deleteReservationBtn = document.getElementById('deleteReservation');
const reservationTitle = document.getElementById('reservationTitle');

function isPastReservation(startTime) {
    const now = new Date().getTime();
    return new Date(startTime).getTime() < now;
}

function showReservationModal(mode = 'new', reservationId = null) {
    editingReservationId = reservationId;

    if (mode === 'edit' && reservationId) {
        const reservation = reservations.find(r => r.id === reservationId);
        if (reservation) {
            const isPast = isPastReservation(reservation.startTime);
            checkUserRole().then(isAdmin => {
                if (isPast && !isAdmin) {
                    showAlertModal('預約時間已過');
                    return;
                }

                document.getElementById('userName').value = reservation.userName;
                document.getElementById('serverSelect').value = reservation.serverId;
                document.getElementById('reservationCreator').value = reservation.creatorId || '';

                const startDate = new Date(reservation.startTime);
                document.getElementById('reservationDate').value = formatDateForInput(startDate);
                document.getElementById('startTime').value = formatTimeForSelect(startDate);

                const endDate = new Date(reservation.endTime);
                document.getElementById('endTime').value = formatTimeForSelect(endDate);

                document.getElementById('notes').value = reservation.notes || '';

                const canDelete = reservation.creatorId === currentUser.uid;
                deleteReservationBtn.classList.toggle('hidden', !canDelete);

                checkUserRole().then(isAdmin => {
                    const canDelete = reservation.creatorId === currentUser.uid || isAdmin;
                    deleteReservationBtn.classList.toggle('hidden', !canDelete);
                });

                reservationTitle.textContent = mode === 'new' ? '新增預約' : '編輯預約';
                deleteReservationBtn.classList.toggle('hidden', mode === 'new');

                reservationModal.classList.remove('hidden');
                requestAnimationFrame(() => {
                    reservationModal.classList.add('opacity-100');
                    reservationBox.classList.add('opacity-100', 'scale-100');
                    reservationBox.classList.remove('scale-95');
                });
            });
            return;
        }
    } else {
        const reservationDate = document.getElementById('reservationDate').value;
        const startTime = document.getElementById('startTime').value;
        const startDateTime = new Date(`${reservationDate}T${startTime}`);

        if (isPastReservation(startDateTime)) {
            checkUserRole().then(isAdmin => {
                if (!isAdmin) {
                    showAlertModal('預約時間已過');
                    return;
                }
                setupNewReservationForm();
            });
            return;
        }
        setupNewReservationForm();
    }
}

function setupNewReservationForm() {
    reservationForm.reset();
    document.getElementById('reservationCreator').value = currentUser.uid;

    const today = new Date();
    document.getElementById('reservationDate').value = formatDateForInput(today);

    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
    const nextTwoHours = new Date(nextHour);
    nextTwoHours.setHours(nextTwoHours.getHours() + 1);

    document.getElementById('startTime').value = formatTimeForSelect(nextHour);
    document.getElementById('endTime').value = formatTimeForSelect(nextTwoHours);

    reservationTitle.textContent = '新增預約';
    deleteReservationBtn.classList.add('hidden');

    reservationModal.classList.remove('hidden');
    requestAnimationFrame(() => {
        reservationModal.classList.add('opacity-100');
        reservationBox.classList.add('opacity-100', 'scale-100');
        reservationBox.classList.remove('scale-95');
    });
}

function hideReservationModal() {
    reservationModal.classList.remove('opacity-100');
    reservationBox.classList.remove('opacity-100', 'scale-100');
    reservationBox.classList.add('scale-95');

    setTimeout(() => {
        reservationModal.classList.add('hidden');
        editingReservationId = null;
    }, 300);
}

const detailModal = document.getElementById('detailModal');
const detailBox = document.getElementById('detailBox');
const closeDetailBtn = document.getElementById('closeDetailModal');
const editReservationBtn = document.getElementById('editReservation');

function showDetailModal(reservationId) {
    const reservation = reservations.find(r => r.id === reservationId);
    if (!reservation) return;

    viewingReservationId = reservationId;

    document.getElementById('detailUserName').textContent = reservation.userName;

    const server = servers.find(s => s.id === reservation.serverId);
    document.getElementById('detailServer').textContent = server ? server.name : '';

    const startDate = new Date(reservation.startTime);
    const endDate = new Date(reservation.endTime);

    document.getElementById('detailStart').textContent = formatDateTime(startDate);
    document.getElementById('detailEnd').textContent = formatDateTime(endDate);
    document.getElementById('detailNotes').textContent = reservation.notes || '';

    if (reservation.creatorName) {
        document.getElementById('detailCreator').textContent = reservation.creatorName;
    } else {
        document.getElementById('detailCreator').textContent = '未知';
    }

    const isPast = isPastReservation(reservation.startTime);

    checkUserRole().then(isAdmin => {
        const canEdit = (reservation.creatorId === currentUser.uid || isAdmin) && (!isPast || isAdmin);
        editReservationBtn.style.display = canEdit ? 'block' : 'none';
    });

    detailModal.classList.remove('hidden');

    requestAnimationFrame(() => {
        detailModal.classList.add('opacity-100');
        detailBox.classList.add('opacity-100', 'scale-100');
        detailBox.classList.remove('scale-95');
    });
}

function hideDetailModal() {
    detailModal.classList.remove('opacity-100');
    detailBox.classList.remove('opacity-100', 'scale-100');
    detailBox.classList.add('scale-95');

    setTimeout(() => {
        detailModal.classList.add('hidden');
        viewingReservationId = null;
    }, 300);
}

const serverModal = document.getElementById('serverModal');
const serverBox = document.getElementById('serverBox');
const closeServerBtn = document.getElementById('closeServerModal');
const addServerBtn = document.getElementById('addServer');
const serverNameInput = document.getElementById('serverName');
const serverList = document.getElementById('serverList');

function showServerModal() {
    renderServerList();

    serverModal.classList.remove('hidden');

    requestAnimationFrame(() => {
        serverModal.classList.add('opacity-100');
        serverBox.classList.add('opacity-100', 'scale-100');
        serverBox.classList.remove('scale-95');
    });
}

function hideServerModal() {
    serverModal.classList.remove('opacity-100');
    serverBox.classList.remove('opacity-100', 'scale-100');
    serverBox.classList.add('scale-95');

    setTimeout(() => {
        serverModal.classList.add('hidden');
        serverNameInput.value = '';
    }, 300);
}

function renderServerList() {
    serverList.innerHTML = '';

    if (servers.length === 0) {
        serverList.innerHTML = `<li class="py-3 text-gray-400 text-center">尚無Server</li>`;
        return;
    }

    servers.forEach(server => {
        const li = document.createElement('li');
        li.className = 'py-3 flex justify-between items-center';
        li.innerHTML = `
                    <span class="text-gray-200">${server.name}</span>
                    <button class="text-red-400 hover:text-red-300" data-server-id="${server.id}">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </button>
                `;

        li.querySelector('button').addEventListener('click', () => deleteServer(server.id));

        serverList.appendChild(li);
    });
}

function formatDate(date) {
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
}

function formatDateForInput(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
}

function formatTimeForSelect(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function formatDateTime(date) {
    return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function populateTimeSelects() {
    const startTimeSelect = document.getElementById('startTime');
    const endTimeSelect = document.getElementById('endTime');

    startTimeSelect.innerHTML = '';
    endTimeSelect.innerHTML = '';

    for (let hour = 0; hour < 24; hour++) {
        for (let minute = 0; minute < 60; minute += 30) {
            const time = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;

            const startOption = document.createElement('option');
            startOption.value = time;
            startOption.textContent = time;
            startTimeSelect.appendChild(startOption);

            const endOption = document.createElement('option');
            endOption.value = time;
            endOption.textContent = time;
            endTimeSelect.appendChild(endOption);
        }
    }
}

function updateServerSelect() {
    const serverSelect = document.getElementById('serverSelect');
    serverSelect.innerHTML = '';

    servers.forEach(server => {
        const option = document.createElement('option');
        option.value = server.id;
        option.textContent = server.name;
        serverSelect.appendChild(option);
    });
}

function getReservationStatus(reservation) {
    const now = new Date().getTime();
    const startTime = new Date(reservation.startTime).getTime();
    const endTime = new Date(reservation.endTime).getTime();

    if (now < startTime) {
        return 'future';
    } else if (now > endTime) {
        return 'past';
    } else {
        return 'current';
    }
}

function renderCalendar() {
    const calendarContainer = document.getElementById('calendarContainer');
    calendarContainer.innerHTML = '';

    if (servers.length === 0) {
        calendarContainer.innerHTML = `
                    <div class="py-8 text-center text-gray-400">
                        您可能還沒有權限，或是資料庫發生問題，請聯絡管理員。
                    </div>
                `;
        return;
    }

    const weekDates = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(currentWeekStart);
        date.setDate(date.getDate() + i);
        weekDates.push(date);
    }

    updateDateRangeDisplay(weekDates);

    const table = document.createElement('table');
    table.className = 'w-full border-collapse border-dark-300';

    const thead = document.createElement('thead');
    let headerRow = document.createElement('tr');
    headerRow.className = 'bg-dark-200';

    let timeHeader = document.createElement('th');
    timeHeader.className = 'calendar-header border border-dark-300 p-2 text-left';
    timeHeader.textContent = '';
    headerRow.appendChild(timeHeader);

    const dayNames = ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'];
    weekDates.forEach((date, index) => {
        const th = document.createElement('th');
        th.className = 'border border-dark-300 p-2 text-center';

        const isToday = isSameDay(date, new Date());

        const dayLabel = document.createElement('div');
        dayLabel.className = 'text-sm mb-1 ' + (isToday ? 'text-blue-400' : 'text-gray-400');
        dayLabel.textContent = dayNames[index];

        const dateLabel = document.createElement('div');
        dateLabel.className = isToday ? 'text-blue-400 font-semibold' : 'text-gray-200';
        dateLabel.textContent = `${date.getMonth() + 1}/${date.getDate()}`;

        th.appendChild(dayLabel);
        th.appendChild(dateLabel);
        headerRow.appendChild(th);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement('tbody');

    servers.forEach(server => {
        const serverRow = document.createElement('tr');
        serverRow.className = 'border-t border-dark-300';

        const serverNameCell = document.createElement('td');
        serverNameCell.className = 'calendar-header border border-dark-300 p-2 font-medium text-gray-200';
        serverNameCell.textContent = server.name;
        serverRow.appendChild(serverNameCell);

        weekDates.forEach(date => {
            const cell = document.createElement('td');
            cell.className = 'calendar-cell border border-dark-300 p-1 align-top';

            const dayReservations = getReservationsForDay(server.id, date);

            dayReservations.sort((a, b) => {
                const aStartTime = new Date(a.startTime).getTime();
                const bStartTime = new Date(b.startTime).getTime();
                return aStartTime - bStartTime;
            });

            dayReservations.forEach(reservation => {
                const badge = document.createElement('div');
                const status = getReservationStatus(reservation);

                badge.className = 'reservation-badge';
                if (status === 'current') {
                    badge.classList.add('current-reservation');
                } else if (status === 'past') {
                    badge.classList.add('past-reservation');
                }

                badge.textContent = `${getTimeText(new Date(reservation.startTime))} - ${getTimeText(new Date(reservation.endTime))} ${reservation.userName}`;
                badge.setAttribute('data-reservation-id', reservation.id);
                badge.setAttribute('data-reservation-status', status);

                badge.addEventListener('click', () => {
                    showDetailModal(reservation.id);
                });

                cell.appendChild(badge);
            });

            cell.addEventListener('click', (e) => {
                if (e.target.classList.contains('reservation-badge')) return;

                const clickedDate = new Date(date);
                const isPast = clickedDate < new Date() - 24 * 60 * 60 * 1000;

                if (isPast) {
                    checkUserRole().then(isAdmin => {
                        if (!isAdmin) {
                            showAlertModal('預約時間已過');
                            return;
                        }
                        resetReservationForm();
                        showReservationModal('new');
                        document.getElementById('serverSelect').value = server.id;
                        document.getElementById('reservationDate').value = formatDateForInput(clickedDate);
                    });
                } else {
                    resetReservationForm();
                    showReservationModal('new');
                    document.getElementById('serverSelect').value = server.id;
                    document.getElementById('reservationDate').value = formatDateForInput(clickedDate);
                }
            });

            serverRow.appendChild(cell);
        });

        tbody.appendChild(serverRow);
    });

    table.appendChild(tbody);
    calendarContainer.appendChild(table);
}

function getTimeText(date) {
    return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function getReservationsForDay(serverId, date) {
    return reservations.filter(reservation => {
        const startTime = new Date(reservation.startTime);
        const endTime = new Date(reservation.endTime);

        return reservation.serverId === serverId &&
            (isSameDay(startTime, date) || isSameDay(endTime, date) ||
                (startTime < date && endTime > date));
    });
}

function isSameDay(date1, date2) {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

function updateDateRangeDisplay(weekDates) {
    const startDate = weekDates[0];
    const endDate = weekDates[6];

    let dateRangeText;
    if (startDate.getMonth() === endDate.getMonth()) {
        dateRangeText = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日 - ${endDate.getDate()}日`;
    } else {
        dateRangeText = `${startDate.getFullYear()}年${startDate.getMonth() + 1}月${startDate.getDate()}日 - ${endDate.getMonth() + 1}月${endDate.getDate()}日`;
    }

    document.getElementById('currentDateRange').textContent = dateRangeText;
}

function resetReservationForm() {
    reservationForm.reset();
    document.getElementById('reservationId').value = '';
    document.getElementById('reservationCreator').value = currentUser.uid;

    const today = new Date();
    document.getElementById('reservationDate').value = formatDateForInput(today);

    const nextHour = new Date();
    nextHour.setHours(nextHour.getHours() + 1, 0, 0, 0);
    const nextTwoHours = new Date(nextHour);
    nextTwoHours.setHours(nextTwoHours.getHours() + 1);

    document.getElementById('startTime').value = formatTimeForSelect(nextHour);
    document.getElementById('endTime').value = formatTimeForSelect(nextTwoHours);
}

function loadServers() {
    const serversRef = window.firebase.ref(window.firebase.db, 'servers');

    return window.firebase.get(serversRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                servers = Object.keys(data).map(key => ({
                    id: key,
                    name: data[key].name
                }));
            } else {
                servers = [];
            }
            updateServerSelect();
        })
        .catch((error) => {
            console.error("讀取資料錯誤:", error);
        });
}

function loadReservations() {
    const reservationsRef = window.firebase.ref(window.firebase.db, 'reservations');

    return window.firebase.get(reservationsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                reservations = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            } else {
                reservations = [];
            }
        })
        .catch((error) => {
            console.error("讀取預約資料錯誤:", error);
        });
}

function addServer(name) {
    if (servers.some(server => server.name === name)) {
        showAlertModal('Server 名稱已存在');
        return Promise.reject(new Error('Server name already exists'));
    }

    const serversRef = window.firebase.ref(window.firebase.db, 'servers');
    const newServerRef = window.firebase.push(serversRef);

    return window.firebase.set(newServerRef, {
        name: name,
        createdBy: currentUser.uid,
        createdAt: new Date().toISOString()
    }).then(() => {
        servers.push({
            id: newServerRef.key,
            name: name
        });
        updateServerSelect();
        renderServerList();
        renderCalendar();
        showAlertModal('Server 新增成功');
    }).catch(error => {
        console.error("新增 Server 錯誤:", error);
    });
}

async function deleteServer(serverId) {
    const confirmed = await showConfirmModal('確定要刪除此 Server 嗎？相關的預約也將被刪除。');
    if (!confirmed) return;

    const serverRef = window.firebase.ref(window.firebase.db, `servers/${serverId}`);

    const relatedReservations = reservations.filter(r => r.serverId === serverId);

    const deletePromises = [window.firebase.remove(serverRef)];

    relatedReservations.forEach(reservation => {
        const reservationRef = window.firebase.ref(window.firebase.db, `reservations/${reservation.id}`);
        deletePromises.push(window.firebase.remove(reservationRef));
    });

    Promise.all(deletePromises)
        .then(() => {
            servers = servers.filter(server => server.id !== serverId);
            reservations = reservations.filter(r => r.serverId !== serverId);
            updateServerSelect();
            renderServerList();
            renderCalendar();
            showAlertModal('Server 刪除成功');
        })
        .catch(error => {
            console.error("刪除 Server 錯誤:", error);
        });
}

function saveReservation(reservationData) {
    let reservationRef;

    const startDateTime = new Date(reservationData.startTime);
    const isPast = isPastReservation(startDateTime);

    return checkUserRole().then(isAdmin => {
        if (isPast && !isAdmin) {
            showAlertModal('您沒有權限新增或編輯過去的預約');
            return Promise.reject(new Error('No permission for past reservations'));
        }

        if (editingReservationId) {
            const existingReservation = reservations.find(r => r.id === editingReservationId);
            if (existingReservation && existingReservation.creatorId !== currentUser.uid && !isAdmin) {
                showAlertModal('您沒有權限編輯此預約');
                return Promise.reject(new Error('No permission to edit'));
            }

            reservationRef = window.firebase.ref(window.firebase.db, `reservations/${editingReservationId}`);

            return window.firebase.update(reservationRef, reservationData)
                .then(() => {
                    const index = reservations.findIndex(r => r.id === editingReservationId);
                    if (index !== -1) {
                        reservations[index] = {
                            ...reservations[index],
                            ...reservationData
                        };
                    }

                    renderCalendar();
                    hideReservationModal();
                    showAlertModal('預約更新成功');
                })
                .catch(error => {
                    console.error("更新預約錯誤:", error);
                });
        } else {
            const reservationsRef = window.firebase.ref(window.firebase.db, 'reservations');
            reservationRef = window.firebase.push(reservationsRef);

            return window.firebase.set(reservationRef, reservationData)
                .then(() => {
                    reservations.push({
                        id: reservationRef.key,
                        ...reservationData
                    });

                    renderCalendar();
                    hideReservationModal();
                    showAlertModal('預約新增成功');
                })
                .catch(error => {
                    console.error("新增預約錯誤:", error);
                });
        }
    });
}

async function deleteReservation(reservationId) {
    const reservation = reservations.find(r => r.id === reservationId);

    checkUserRole().then(isAdmin => {
        if (reservation && reservation.creatorId !== currentUser.uid && !isAdmin) {
            showAlertModal('您沒有權限刪除此預約');
            return;
        }
    });

    const confirmed = await showConfirmModal('確定要刪除此預約嗎？');
    if (!confirmed) return;

    const reservationRef = window.firebase.ref(window.firebase.db, `reservations/${reservationId}`);

    window.firebase.remove(reservationRef)
        .then(() => {
            reservations = reservations.filter(r => r.id !== reservationId);

            hideReservationModal();
            hideDetailModal();
            renderCalendar();
            showAlertModal('預約刪除成功');
        })
        .catch(error => {
            console.error("刪除預約錯誤:", error);
        });
}

function isOverlapping(serverId, startTime, endTime, excludeReservationId = null) {
    return reservations.some(reservation => {
        if (excludeReservationId && reservation.id === excludeReservationId) {
            return false;
        }

        if (reservation.serverId !== serverId) {
            return false;
        }

        const reservationStart = new Date(reservation.startTime).getTime();
        const reservationEnd = new Date(reservation.endTime).getTime();

        return (startTime < reservationEnd && endTime > reservationStart);
    });
}

function setupAuthListeners() {
    const googleLoginBtn = document.getElementById('googleLoginBtn');
    googleLoginBtn.addEventListener('click', () => {
        showLoadingOverlay();
        window.firebase.signInWithPopup(window.firebase.auth, window.firebase.provider)
            .then((result) => {
                const user = result.user;
                const userEmailKey = user.email.replace(/\./g, ',');
                const allowedUsersRef = window.firebase.ref(window.firebase.db, `allowedUsers/${userEmailKey}`);

                return window.firebase.get(allowedUsersRef).then(snapshot => {
                    if (!snapshot.exists()) {
                        return window.firebase.signOut(window.firebase.auth).then(() => {
                            throw new Error('未授權帳號');
                        });
                    }
                    return user;
                });
            })
            .catch(error => {
                console.error('登入錯誤:', error);
                hideLoadingOverlay();
                showAlertModal('存取資料庫失敗，可能是您的帳戶未經授權，請聯繫管理員。');
            });
    });

    const logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.addEventListener('click', () => {
        window.firebase.signOut(window.firebase.auth)
            .then(() => {
            })
            .catch(error => {
                console.error('登出錯誤:', error);
            });
    });

    window.firebase.onAuthStateChanged(window.firebase.auth, (user) => {
        hideLoadingOverlay();

        if (user) {
            currentUser = user;
            showUserInterface();
        } else {
            currentUser = null;
            showLoginInterface();
        }
    });
}

function showUserInterface() {
    const userProfile = document.getElementById('userProfile');
    userProfile.innerHTML = `
                <img src="${currentUser.photoURL}" alt="${currentUser.displayName}" title="${currentUser.email}">
                <span class="hidden sm:inline-block text-sm">${currentUser.displayName}</span>
            `;

    loginContainer.style.display = 'none';
    mainContent.style.display = 'block';

    showLoadingOverlay();
    Promise.all([loadServers(), loadReservations(), checkUserRole()])
        .then(([_, __, isAdmin]) => {
            document.getElementById('manageServersBtn').classList.toggle('hidden', !isAdmin);
            document.getElementById('manageUsersBtn').classList.toggle('hidden', !isAdmin);

            renderCalendar();
            setupRealtimeListeners();
            hideLoadingOverlay();
        })
        .catch(error => {
            console.error("初始化錯誤", error);
            hideLoadingOverlay();
        });
}

function showLoginInterface() {
    loginContainer.style.display = 'flex';
    mainContent.style.display = 'none';
}

document.addEventListener('firebaseReady', () => {
    setupAuthListeners();
    populateTimeSelects();

    document.getElementById('manageUsersBtn').addEventListener('click', () => {
        showUserModal();
    });

    closeUserBtn.addEventListener('click', () => {
        hideUserModal();
    });

    addUserBtn.addEventListener('click', () => {
        const email = userEmailInput.value.trim();
        const role = userRoleSelect.value;

        addUser(email, role);
    });

    userEmailInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            addUserBtn.click();
        }
    });

    document.getElementById('prevWeekBtn').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() - 7);
        renderCalendar();
    });

    document.getElementById('nextWeekBtn').addEventListener('click', () => {
        currentWeekStart.setDate(currentWeekStart.getDate() + 7);
        renderCalendar();
    });

    document.getElementById('todayBtn').addEventListener('click', () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        currentWeekStart = new Date(today);
        currentWeekStart.setDate(currentWeekStart.getDate() - (currentWeekStart.getDay() || 7) + 1);
        renderCalendar();
    });

    document.getElementById('manageServersBtn').addEventListener('click', () => {
        showServerModal();
    });

    document.getElementById('newReservationBtn').addEventListener('click', () => {
        resetReservationForm();
        showReservationModal('new');
    });

    closeServerBtn.addEventListener('click', () => {
        hideServerModal();
    });

    addServerBtn.addEventListener('click', () => {
        const serverName = serverNameInput.value.trim();
        if (!serverName) {
            showAlertModal('請輸入Server名稱');
            return;
        }

        addServer(serverName).then(() => {
            serverNameInput.value = '';
        });
    });

    serverNameInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            addServerBtn.click();
        }
    });

    cancelReservationBtn.addEventListener('click', () => {
        hideReservationModal();
    });

    deleteReservationBtn.addEventListener('click', () => {
        if (editingReservationId) {
            deleteReservation(editingReservationId);
        }
    });

    reservationForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const userName = document.getElementById('userName').value.trim();
        const serverId = document.getElementById('serverSelect').value;
        const reservationDate = document.getElementById('reservationDate').value;
        const startTime = document.getElementById('startTime').value;
        const endTime = document.getElementById('endTime').value;
        const notes = document.getElementById('notes').value.trim();
        const creatorId = document.getElementById('reservationCreator').value;

        const startDateTime = new Date(`${reservationDate}T${startTime}`);
        const endDateTime = new Date(`${reservationDate}T${endTime}`);

        if (endDateTime <= startDateTime) {
            showAlertModal('結束時間必須晚於開始時間');
            return;
        }

        const isPast = isPastReservation(startDateTime);
        if (isPast) {
            checkUserRole().then(isAdmin => {
                if (!isAdmin) {
                    showAlertModal('您沒有權限新增或編輯過去的預約');
                    return;
                }
                continueSubmitReservation();
            });
        } else {
            continueSubmitReservation();
        }

        function continueSubmitReservation() {
            if (isOverlapping(serverId, startDateTime.getTime(), endDateTime.getTime(), editingReservationId)) {
                showAlertModal('該時段已有預約，請選擇其他時段');
                return;
            }

            const reservationData = {
                userName,
                serverId,
                startTime: startDateTime.toISOString(),
                endTime: endDateTime.toISOString(),
                notes,
                creatorId: creatorId || currentUser.uid,
                creatorName: currentUser.displayName,
                creatorEmail: currentUser.email,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            };

            saveReservation(reservationData);
        }
    });

    closeDetailBtn.addEventListener('click', () => {
        hideDetailModal();
    });

    editReservationBtn.addEventListener('click', () => {
        if (viewingReservationId) {
            hideDetailModal();
            showReservationModal('edit', viewingReservationId);
        }
    });

    function setupRealtimeListeners() {
        if (!currentUser) return;

        const serversRef = window.firebase.ref(window.firebase.db, 'servers');
        window.firebase.onValue(serversRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                servers = Object.keys(data).map(key => ({
                    id: key,
                    name: data[key].name
                }));
            } else {
                servers = [];
            }
            updateServerSelect();
            renderCalendar();
        });

        const reservationsRef = window.firebase.ref(window.firebase.db, 'reservations');
        window.firebase.onValue(reservationsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                reservations = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                }));
            } else {
                reservations = [];
            }
            renderCalendar();
        });
    }
    setupAutoRefresh();
});