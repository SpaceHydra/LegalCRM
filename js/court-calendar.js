// Court Calendar Module
// Manages hearing dates, court schedules, and case diary

let currentDate = new Date();
let currentView = 'month';
let editingHearingId = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadMattersToDropdown();
    renderCalendar();
    updateStats();
    loadCourtFilters();
});

// ===== CALENDAR RENDERING =====

function renderCalendar() {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    // Update header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                        'July', 'August', 'September', 'October', 'November', 'December'];
    document.getElementById('currentMonthYear').textContent = `${monthNames[month]} ${year}`;

    // Get first day of month
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay()); // Start from Sunday

    // Get hearings for the month
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');

    // Render days
    const daysContainer = document.getElementById('calendarDays');
    daysContainer.innerHTML = '';

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < 42; i++) { // 6 weeks
        const currentDay = new Date(startDate);
        currentDay.setDate(currentDay.getDate() + i);

        const isOtherMonth = currentDay.getMonth() !== month;
        const isToday = currentDay.getTime() === today.getTime();

        // Get hearings for this day
        const dayHearings = hearings.filter(h => {
            const hearingDate = new Date(h.date);
            hearingDate.setHours(0, 0, 0, 0);
            return hearingDate.getTime() === currentDay.getTime() && h.status !== 'completed';
        });

        const dayDiv = document.createElement('div');
        dayDiv.className = `calendar-day ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`;
        dayDiv.onclick = () => openDayDetails(currentDay);

        dayDiv.innerHTML = `
            <div class="day-number">${currentDay.getDate()}</div>
            <div class="day-events">
                ${dayHearings.slice(0, 3).map(h => {
                    const isUrgent = isWithinDays(currentDay, 2);
                    return `<div class="event-pill ${isUrgent ? 'urgent' : 'normal'}" onclick="event.stopPropagation(); viewHearing('${h.id}')">
                        ${h.time} ${getMatterShortName(h.matterId)}
                    </div>`;
                }).join('')}
                ${dayHearings.length > 3 ? `<div class="event-pill">+${dayHearings.length - 3} more</div>` : ''}
            </div>
        `;

        daysContainer.appendChild(dayDiv);
    }
}

function loadMattersToDropdown() {
    const matters = JSON.parse(localStorage.getItem('matters') || '[]');
    const select = document.getElementById('hearingMatter');

    matters.forEach(matter => {
        const option = document.createElement('option');
        option.value = matter.id;
        option.textContent = `${matter.serialNumber} - ${matter.title}`;
        select.appendChild(option);
    });
}

function loadCourtFilters() {
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const courts = [...new Set(hearings.map(h => h.court))];

    const filterSelect = document.getElementById('filterCourt');
    courts.forEach(court => {
        const option = document.createElement('option');
        option.value = court;
        option.textContent = court;
        filterSelect.appendChild(option);
    });
}

// ===== NAVIGATION =====

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

function goToToday() {
    currentDate = new Date();
    renderCalendar();
    updateStats();
}

function switchView(view) {
    currentView = view;

    // Update button states
    document.querySelectorAll('.view-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    if (view === 'month') {
        document.getElementById('monthView').style.display = 'block';
        document.getElementById('listView').style.display = 'none';
        document.getElementById('listFilters').style.display = 'none';
        renderCalendar();
    } else {
        document.getElementById('monthView').style.display = 'none';
        document.getElementById('listView').style.display = 'block';
        document.getElementById('listFilters').style.display = 'flex';
        renderHearingsList();
    }
}

// ===== LIST VIEW =====

function renderHearingsList() {
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const container = document.getElementById('hearingsList');

    if (hearings.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⚖️</div>
                <h3>No hearings scheduled</h3>
                <p>Click "Add Hearing" to schedule a court date</p>
            </div>
        `;
        return;
    }

    // Apply filters
    const filtered = filterHearingsData(hearings);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No hearings match your filters</h3>
                <p>Try adjusting your filter criteria</p>
            </div>
        `;
        return;
    }

    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    container.innerHTML = filtered.map(hearing => {
        const hearingDate = new Date(hearing.date);
        const isUrgent = isWithinDays(hearingDate, 2);
        const matterName = getMatterName(hearing.matterId);

        return `
            <div class="hearing-item">
                <div class="hearing-date-block ${isUrgent ? 'urgent' : ''}">
                    <div class="hearing-month">${hearingDate.toLocaleDateString('en-US', {month: 'short'}).toUpperCase()}</div>
                    <div class="hearing-day">${hearingDate.getDate()}</div>
                    <div class="hearing-time">${hearing.time || '10:00 AM'}</div>
                </div>
                <div class="hearing-details">
                    <div class="hearing-title">${escapeHtml(matterName)}</div>
                    <div class="hearing-court">🏛️ ${escapeHtml(hearing.court)} ${hearing.courtroom ? '- ' + escapeHtml(hearing.courtroom) : ''}</div>
                    <div class="hearing-meta">
                        ${hearing.judge ? `<span>👨‍⚖️ ${escapeHtml(hearing.judge)}</span>` : ''}
                        ${hearing.purpose ? `<span>📋 ${escapeHtml(hearing.purpose)}</span>` : ''}
                    </div>
                </div>
                <div class="hearing-actions">
                    <span class="hearing-type-badge ${hearing.type}">${formatHearingType(hearing.type)}</span>
                    <div class="action-buttons">
                        <button class="btn-icon" onclick="editHearing('${hearing.id}')" title="Edit">✏️</button>
                        <button class="btn-icon" onclick="markComplete('${hearing.id}')" title="Mark Complete">✅</button>
                        <button class="btn-icon" onclick="deleteHearing('${hearing.id}')" title="Delete">🗑️</button>
                    </div>
                </div>
            </div>
        `;
    }).join('');
}

function filterHearingsData(hearings) {
    const court = document.getElementById('filterCourt').value;
    const type = document.getElementById('filterType').value;
    const status = document.getElementById('filterStatus').value;

    let filtered = [...hearings];

    // Filter by court
    if (court !== 'all') {
        filtered = filtered.filter(h => h.court === court);
    }

    // Filter by type
    if (type !== 'all') {
        filtered = filtered.filter(h => h.type === type);
    }

    // Filter by status
    if (status === 'upcoming') {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        filtered = filtered.filter(h => {
            const hDate = new Date(h.date);
            hDate.setHours(0, 0, 0, 0);
            return hDate >= today && h.status !== 'completed';
        });
    } else if (status === 'completed') {
        filtered = filtered.filter(h => h.status === 'completed');
    }

    return filtered;
}

function filterHearings() {
    renderHearingsList();
}

// ===== ADD/EDIT HEARING =====

function openAddHearingModal() {
    editingHearingId = null;
    document.getElementById('modalTitle').textContent = 'Add Hearing';
    document.getElementById('hearingForm').reset();
    document.getElementById('hearingModal').classList.add('active');

    // Set default date to today
    document.getElementById('hearingDate').valueAsDate = new Date();
}

function openDayDetails(date) {
    // Open add hearing modal with pre-filled date
    openAddHearingModal();
    document.getElementById('hearingDate').valueAsDate = date;
}

function closeHearingModal() {
    document.getElementById('hearingModal').classList.remove('active');
    editingHearingId = null;
}

function saveHearing(event) {
    event.preventDefault();

    const matterId = document.getElementById('hearingMatter').value;
    const date = document.getElementById('hearingDate').value;
    const time = document.getElementById('hearingTime').value;
    const court = document.getElementById('hearingCourt').value;
    const courtroom = document.getElementById('hearingCourtroom').value;
    const judge = document.getElementById('hearingJudge').value;
    const type = document.getElementById('hearingType').value;
    const purpose = document.getElementById('hearingPurpose').value;
    const reminder = parseInt(document.getElementById('hearingReminder').value);

    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');

    if (editingHearingId) {
        // Update existing
        const hearing = hearings.find(h => h.id === editingHearingId);
        if (hearing) {
            hearing.matterId = matterId;
            hearing.date = date;
            hearing.time = time;
            hearing.court = court;
            hearing.courtroom = courtroom;
            hearing.judge = judge;
            hearing.type = type;
            hearing.purpose = purpose;
            hearing.reminder = reminder;
            hearing.updatedAt = new Date().toISOString();
        }
    } else {
        // Create new
        const hearing = {
            id: 'hearing_' + Date.now(),
            matterId: matterId,
            date: date,
            time: time,
            court: court,
            courtroom: courtroom,
            judge: judge,
            type: type,
            purpose: purpose,
            reminder: reminder,
            status: 'upcoming',
            createdAt: new Date().toISOString()
        };
        hearings.push(hearing);
    }

    localStorage.setItem('courtHearings', JSON.stringify(hearings));

    closeHearingModal();
    renderCalendar();
    renderHearingsList();
    updateStats();
    loadCourtFilters();

    alert(editingHearingId ? 'Hearing updated!' : 'Hearing added!');
}

function editHearing(id) {
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const hearing = hearings.find(h => h.id === id);

    if (!hearing) return;

    editingHearingId = id;
    document.getElementById('modalTitle').textContent = 'Edit Hearing';
    document.getElementById('hearingMatter').value = hearing.matterId;
    document.getElementById('hearingDate').value = hearing.date;
    document.getElementById('hearingTime').value = hearing.time;
    document.getElementById('hearingCourt').value = hearing.court;
    document.getElementById('hearingCourtroom').value = hearing.courtroom || '';
    document.getElementById('hearingJudge').value = hearing.judge || '';
    document.getElementById('hearingType').value = hearing.type;
    document.getElementById('hearingPurpose').value = hearing.purpose || '';
    document.getElementById('hearingReminder').value = hearing.reminder || 1;

    document.getElementById('hearingModal').classList.add('active');
}

function deleteHearing(id) {
    if (!confirm('Delete this hearing?')) return;

    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const filtered = hearings.filter(h => h.id !== id);
    localStorage.setItem('courtHearings', JSON.stringify(filtered));

    renderCalendar();
    renderHearingsList();
    updateStats();
}

function markComplete(id) {
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const hearing = hearings.find(h => h.id === id);

    if (!hearing) return;

    const nextDate = prompt('Next hearing date (YYYY-MM-DD) or leave blank if case disposed:');

    hearing.status = 'completed';
    hearing.completedAt = new Date().toISOString();

    if (nextDate) {
        // Create next hearing
        const nextHearing = {
            ...hearing,
            id: 'hearing_' + Date.now(),
            date: nextDate,
            status: 'upcoming',
            createdAt: new Date().toISOString(),
            previousHearingId: id
        };
        hearings.push(nextHearing);
        alert('Hearing marked complete and next hearing scheduled!');
    } else {
        alert('Hearing marked complete!');
    }

    localStorage.setItem('courtHearings', JSON.stringify(hearings));

    renderCalendar();
    renderHearingsList();
    updateStats();
}

function viewHearing(id) {
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const hearing = hearings.find(h => h.id === id);

    if (!hearing) return;

    const matterName = getMatterName(hearing.matterId);

    const details = `
Hearing Details:
━━━━━━━━━━━━━━━━━━━━━━
Matter: ${matterName}
Date: ${formatDate(hearing.date)}
Time: ${hearing.time || 'Not specified'}
Court: ${hearing.court}
${hearing.courtroom ? `Courtroom: ${hearing.courtroom}` : ''}
${hearing.judge ? `Judge: ${hearing.judge}` : ''}
Type: ${formatHearingType(hearing.type)}
${hearing.purpose ? `\nPurpose:\n${hearing.purpose}` : ''}
    `;

    alert(details);
}

// ===== STATISTICS =====

function updateStats() {
    const hearings = JSON.parse(localStorage.getItem('courtHearings') || '[]');
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const weekEnd = new Date(today);
    weekEnd.setDate(weekEnd.getDate() + 7);

    // Count upcoming hearings
    const upcomingHearings = hearings.filter(h => {
        const hDate = new Date(h.date);
        hDate.setHours(0, 0, 0, 0);
        return hDate >= today && h.status !== 'completed';
    });

    const todayCount = upcomingHearings.filter(h => {
        const hDate = new Date(h.date);
        hDate.setHours(0, 0, 0, 0);
        return hDate.getTime() === today.getTime();
    }).length;

    const tomorrowCount = upcomingHearings.filter(h => {
        const hDate = new Date(h.date);
        hDate.setHours(0, 0, 0, 0);
        return hDate.getTime() === tomorrow.getTime();
    }).length;

    const weekCount = upcomingHearings.filter(h => {
        const hDate = new Date(h.date);
        hDate.setHours(0, 0, 0, 0);
        return hDate >= today && hDate <= weekEnd;
    }).length;

    // Update UI
    document.getElementById('statToday').textContent = todayCount;
    document.getElementById('statTomorrow').textContent = tomorrowCount;
    document.getElementById('statThisWeek').textContent = weekCount;
    document.getElementById('statPending').textContent = upcomingHearings.length;
}

// ===== UTILITY FUNCTIONS =====

function getMatterName(matterId) {
    const matters = JSON.parse(localStorage.getItem('matters') || '[]');
    const matter = matters.find(m => m.id === matterId);
    return matter ? `${matter.serialNumber} - ${matter.title}` : 'Unknown Matter';
}

function getMatterShortName(matterId) {
    const matters = JSON.parse(localStorage.getItem('matters') || '[]');
    const matter = matters.find(m => m.id === matterId);
    return matter ? matter.serialNumber : 'N/A';
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatHearingType(type) {
    const types = {
        'preliminary': 'Preliminary',
        'arguments': 'Arguments',
        'hearing': 'Hearing',
        'judgment': 'Judgment',
        'mention': 'Mention',
        'chamber': 'Chamber'
    };
    return types[type] || type;
}

function isWithinDays(date, days) {
    const target = new Date(date);
    target.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays >= 0 && diffDays <= days;
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('✅ Court Calendar module loaded');
