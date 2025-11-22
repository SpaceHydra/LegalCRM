// Time Tracking Module
// Handles timer, manual entries, reporting

let timerInterval = null;
let timerStartTime = null;
let timerElapsedSeconds = 0;
let timerPaused = false;
let currentTimerEntry = null;

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadMattersToDropdown();
    loadTimeEntries();
    updateStats();

    // Set default date to today
    document.getElementById('entryDate').valueAsDate = new Date();

    // Load active timer if exists
    loadActiveTimer();
});

// ===== TIMER FUNCTIONS =====

function loadActiveTimer() {
    const activeTimer = JSON.parse(localStorage.getItem('activeTimer') || 'null');
    if (activeTimer) {
        currentTimerEntry = activeTimer;
        timerStartTime = new Date(activeTimer.startTime);
        timerElapsedSeconds = activeTimer.elapsedSeconds || 0;

        // Update UI
        document.getElementById('timerMatter').textContent = activeTimer.matter || 'Not selected';
        document.getElementById('timerTask').textContent = activeTimer.description || 'Not specified';
        document.getElementById('timerBillable').textContent = activeTimer.billable ? 'Yes' : 'No';
        document.getElementById('timerRate').textContent = `₹${activeTimer.rate || 0}/hr`;

        // Start the timer display
        startTimerDisplay();
    }
}

function startTimer() {
    // Show timer configuration modal
    const matter = prompt('Enter matter (or leave blank):');
    const description = prompt('Enter task description:');
    const rateStr = prompt('Enter hourly rate (₹):', '5000');
    const rate = parseFloat(rateStr) || 5000;
    const billable = confirm('Is this billable time?');

    currentTimerEntry = {
        matter: matter || 'Unassigned',
        description: description || 'Task',
        rate: rate,
        billable: billable,
        startTime: new Date().toISOString(),
        elapsedSeconds: 0
    };

    timerStartTime = new Date();
    timerElapsedSeconds = 0;
    timerPaused = false;

    // Update UI
    document.getElementById('timerMatter').textContent = currentTimerEntry.matter;
    document.getElementById('timerTask').textContent = currentTimerEntry.description;
    document.getElementById('timerBillable').textContent = currentTimerEntry.billable ? 'Yes' : 'No';
    document.getElementById('timerRate').textContent = `₹${currentTimerEntry.rate}/hr`;

    // Save to localStorage
    localStorage.setItem('activeTimer', JSON.stringify(currentTimerEntry));

    startTimerDisplay();
}

function startTimerDisplay() {
    // Update button states
    document.getElementById('startBtn').style.display = 'none';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('stopBtn').style.display = 'inline-block';

    // Start interval
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        if (!timerPaused) {
            timerElapsedSeconds++;
            updateTimerDisplay();

            // Update localStorage every 10 seconds
            if (timerElapsedSeconds % 10 === 0 && currentTimerEntry) {
                currentTimerEntry.elapsedSeconds = timerElapsedSeconds;
                localStorage.setItem('activeTimer', JSON.stringify(currentTimerEntry));
            }
        }
    }, 1000);
}

function pauseTimer() {
    timerPaused = !timerPaused;
    const pauseBtn = document.getElementById('pauseBtn');

    if (timerPaused) {
        pauseBtn.textContent = '▶ Resume';
        pauseBtn.classList.remove('pause');
        pauseBtn.classList.add('start');
    } else {
        pauseBtn.textContent = '⏸ Pause';
        pauseBtn.classList.remove('start');
        pauseBtn.classList.add('pause');
    }
}

function stopTimer() {
    if (!currentTimerEntry) return;

    if (!confirm('Stop timer and save this time entry?')) return;

    // Clear interval
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }

    // Calculate duration in hours
    const hours = timerElapsedSeconds / 3600;

    // Create time entry
    const entry = {
        id: 'time_' + Date.now(),
        date: new Date().toISOString().split('T')[0],
        matter: currentTimerEntry.matter,
        description: currentTimerEntry.description,
        hours: parseFloat(hours.toFixed(2)),
        rate: currentTimerEntry.rate,
        billable: currentTimerEntry.billable,
        amount: parseFloat((hours * currentTimerEntry.rate).toFixed(2)),
        createdAt: new Date().toISOString(),
        type: 'timer'
    };

    // Save entry
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('timeEntries', JSON.stringify(entries));

    // Clear timer
    resetTimer();

    // Reload entries
    loadTimeEntries();
    updateStats();

    // Show success
    alert(`Time entry saved: ${hours.toFixed(2)} hours`);
}

function resetTimer() {
    timerElapsedSeconds = 0;
    timerPaused = false;
    currentTimerEntry = null;

    localStorage.removeItem('activeTimer');

    // Reset UI
    document.getElementById('timerDisplay').textContent = '00:00:00';
    document.getElementById('timerMatter').textContent = 'Not selected';
    document.getElementById('timerTask').textContent = 'Not specified';
    document.getElementById('timerBillable').textContent = 'Yes';
    document.getElementById('timerRate').textContent = '₹0/hr';

    document.getElementById('startBtn').style.display = 'inline-block';
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('stopBtn').style.display = 'none';
}

function updateTimerDisplay() {
    const hours = Math.floor(timerElapsedSeconds / 3600);
    const minutes = Math.floor((timerElapsedSeconds % 3600) / 60);
    const seconds = timerElapsedSeconds % 60;

    const display = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('timerDisplay').textContent = display;
}

// ===== MANUAL ENTRY FUNCTIONS =====

function loadMattersToDropdown() {
    const matters = JSON.parse(localStorage.getItem('matters') || '[]');
    const select = document.getElementById('entryMatter');
    const filterSelect = document.getElementById('filterMatter');

    matters.forEach(matter => {
        const option = document.createElement('option');
        option.value = matter.id;
        option.textContent = `${matter.serialNumber} - ${matter.title}`;
        option.dataset.rate = matter.hourlyRate || 5000;
        select.appendChild(option);

        const filterOption = option.cloneNode(true);
        filterSelect.appendChild(filterOption);
    });
}

function updateRateFromMatter() {
    const select = document.getElementById('entryMatter');
    const selectedOption = select.options[select.selectedIndex];

    if (selectedOption && selectedOption.dataset.rate) {
        document.getElementById('entryRate').value = selectedOption.dataset.rate;
    }
}

function toggleBillable() {
    const toggle = document.getElementById('entryBillableToggle');
    const label = document.getElementById('billableLabel');

    toggle.classList.toggle('active');

    if (toggle.classList.contains('active')) {
        label.textContent = 'Billable';
    } else {
        label.textContent = 'Non-Billable';
    }
}

function addManualEntry(event) {
    event.preventDefault();

    const matterId = document.getElementById('entryMatter').value;
    const matterText = document.getElementById('entryMatter').selectedOptions[0].textContent;
    const date = document.getElementById('entryDate').value;
    const hours = parseFloat(document.getElementById('entryHours').value);
    const rate = parseFloat(document.getElementById('entryRate').value);
    const description = document.getElementById('entryDescription').value;
    const billable = document.getElementById('entryBillableToggle').classList.contains('active');

    const entry = {
        id: 'time_' + Date.now(),
        date: date,
        matterId: matterId,
        matter: matterText,
        description: description,
        hours: hours,
        rate: rate,
        billable: billable,
        amount: billable ? parseFloat((hours * rate).toFixed(2)) : 0,
        createdAt: new Date().toISOString(),
        type: 'manual'
    };

    // Save entry
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    entries.unshift(entry);
    localStorage.setItem('timeEntries', JSON.stringify(entries));

    // Reset form
    event.target.reset();
    document.getElementById('entryDate').valueAsDate = new Date();
    document.getElementById('entryBillableToggle').classList.add('active');
    document.getElementById('billableLabel').textContent = 'Billable';

    // Reload
    loadTimeEntries();
    updateStats();

    // Switch to entries tab
    switchTab('entries');

    alert('Time entry added successfully!');
}

// ===== TIME ENTRIES DISPLAY =====

function loadTimeEntries() {
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    const container = document.getElementById('timeEntriesList');

    if (entries.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">⏱️</div>
                <h3>No time entries yet</h3>
                <p>Start the timer or add a manual entry to track your time</p>
            </div>
        `;
        return;
    }

    // Apply filters
    const filtered = filterEntriesData(entries);

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No entries match your filters</h3>
                <p>Try adjusting your filter criteria</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(entry => `
        <div class="time-entry-item">
            <div class="time-entry-date">
                ${formatDate(entry.date)}
            </div>
            <div class="time-entry-details">
                <div class="time-entry-matter">${escapeHtml(entry.matter)}</div>
                <div class="time-entry-description">${escapeHtml(entry.description)}</div>
                <span class="billable-badge ${entry.billable ? 'billable' : 'non-billable'}">
                    ${entry.billable ? '✓ Billable' : '✗ Non-Billable'}
                </span>
            </div>
            <div class="time-entry-duration">
                ${entry.hours.toFixed(2)}h
                <div style="font-size: 12px; color: #9ca3af; font-weight: normal;">@ ₹${entry.rate}/hr</div>
            </div>
            <div class="time-entry-value">
                <div class="time-entry-amount">₹${entry.amount.toLocaleString('en-IN')}</div>
                <div class="action-buttons">
                    <button class="btn-icon" onclick="editTimeEntry('${entry.id}')" title="Edit">✏️</button>
                    <button class="btn-icon" onclick="deleteTimeEntry('${entry.id}')" title="Delete">🗑️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterEntriesData(entries) {
    const period = document.getElementById('filterPeriod').value;
    const matterId = document.getElementById('filterMatter').value;
    const status = document.getElementById('filterStatus').value;

    let filtered = [...entries];

    // Filter by period
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (period === 'today') {
        filtered = filtered.filter(e => {
            const entryDate = new Date(e.date);
            return entryDate >= today;
        });
    } else if (period === 'week') {
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        filtered = filtered.filter(e => new Date(e.date) >= weekAgo);
    } else if (period === 'month') {
        const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
        filtered = filtered.filter(e => new Date(e.date) >= monthStart);
    }

    // Filter by matter
    if (matterId !== 'all') {
        filtered = filtered.filter(e => e.matterId === matterId);
    }

    // Filter by status
    if (status === 'billable') {
        filtered = filtered.filter(e => e.billable);
    } else if (status === 'non-billable') {
        filtered = filtered.filter(e => !e.billable);
    }

    return filtered;
}

function filterEntries() {
    loadTimeEntries();
    updateStats();
}

function deleteTimeEntry(id) {
    if (!confirm('Delete this time entry?')) return;

    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    const filtered = entries.filter(e => e.id !== id);
    localStorage.setItem('timeEntries', JSON.stringify(filtered));

    loadTimeEntries();
    updateStats();
}

function editTimeEntry(id) {
    alert('Edit functionality - Coming soon!');
}

// ===== STATISTICS =====

function updateStats() {
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');

    // Filter to current month
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const monthEntries = entries.filter(e => new Date(e.date) >= monthStart);

    // Calculate stats
    const totalHours = monthEntries.reduce((sum, e) => sum + e.hours, 0);
    const billableEntries = monthEntries.filter(e => e.billable);
    const billableHours = billableEntries.reduce((sum, e) => sum + e.hours, 0);
    const billableAmount = billableEntries.reduce((sum, e) => sum + e.amount, 0);
    const utilization = totalHours > 0 ? (billableHours / totalHours * 100) : 0;

    // Update UI
    document.getElementById('statTotalHours').textContent = totalHours.toFixed(1);
    document.getElementById('statBillableAmount').textContent = '₹' + billableAmount.toLocaleString('en-IN');
    document.getElementById('statBillableHours').textContent = billableHours.toFixed(1);
    document.getElementById('statUtilization').textContent = utilization.toFixed(0) + '%';

    // Update reports tab
    updateReports(monthEntries);
}

function updateReports(entries) {
    // Days worked
    const uniqueDates = new Set(entries.map(e => e.date));
    const daysWorked = uniqueDates.size;

    // Average per day
    const totalHours = entries.reduce((sum, e) => sum + e.hours, 0);
    const avgPerDay = daysWorked > 0 ? totalHours / daysWorked : 0;

    // Average rate
    const billableEntries = entries.filter(e => e.billable);
    const avgRate = billableEntries.length > 0
        ? billableEntries.reduce((sum, e) => sum + e.rate, 0) / billableEntries.length
        : 0;

    // Top matter by hours
    const matterHours = {};
    entries.forEach(e => {
        if (!matterHours[e.matter]) matterHours[e.matter] = 0;
        matterHours[e.matter] += e.hours;
    });

    const topMatter = Object.entries(matterHours)
        .sort((a, b) => b[1] - a[1])[0];

    // Update UI
    document.getElementById('reportDaysWorked').textContent = daysWorked;
    document.getElementById('reportAvgPerDay').textContent = avgPerDay.toFixed(1) + 'h';
    document.getElementById('reportAvgRate').textContent = '₹' + avgRate.toFixed(0);
    document.getElementById('reportTopMatter').textContent = topMatter ? topMatter[0] : '-';
}

// ===== EXPORT FUNCTIONS =====

function exportToCSV() {
    const entries = JSON.parse(localStorage.getItem('timeEntries') || '[]');
    const filtered = filterEntriesData(entries);

    if (filtered.length === 0) {
        alert('No entries to export!');
        return;
    }

    // Create CSV
    const headers = ['Date', 'Matter', 'Description', 'Hours', 'Rate', 'Billable', 'Amount'];
    const rows = filtered.map(e => [
        e.date,
        e.matter,
        e.description,
        e.hours,
        e.rate,
        e.billable ? 'Yes' : 'No',
        e.amount
    ]);

    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
        csv += row.map(cell => `"${cell}"`).join(',') + '\n';
    });

    // Download
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `time-entries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
}

function exportToPDF() {
    alert('PDF export - Coming soon! Use CSV export for now.');
}

// ===== TAB SWITCHING =====

function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    event.target.classList.add('active');

    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

    if (tabName === 'manual') {
        document.getElementById('manualTab').classList.add('active');
    } else if (tabName === 'entries') {
        document.getElementById('entriesTab').classList.add('active');
        loadTimeEntries();
        updateStats();
    } else if (tabName === 'reports') {
        document.getElementById('reportsTab').classList.add('active');
        updateStats();
    }
}

// ===== UTILITY FUNCTIONS =====

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('✅ Time Tracking module loaded');
