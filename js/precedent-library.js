// Precedent Library Module
// Manages legal document templates and successful precedents

let uploadedFile = null;
let currentTags = [];
let currentCategory = 'all';

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    loadPrecedents();
    updateCategoryCounts();
});

// ===== LOAD AND DISPLAY PRECEDENTS =====

function loadPrecedents() {
    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');
    const container = document.getElementById('precedentsGrid');
    const sortBy = document.getElementById('sortBy').value;
    const practiceArea = document.getElementById('filterPracticeArea').value;

    // Filter by category
    let filtered = currentCategory === 'all'
        ? precedents
        : precedents.filter(p => p.category === currentCategory);

    // Filter by practice area
    if (practiceArea !== 'all') {
        filtered = filtered.filter(p => p.practiceArea === practiceArea);
    }

    // Sort
    if (sortBy === 'recent') {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === 'popular') {
        filtered.sort((a, b) => (b.usageCount || 0) - (a.usageCount || 0));
    } else if (sortBy === 'alphabetical') {
        filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">📚</div>
                <h3>No precedents found</h3>
                <p>No documents match your current filters</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(precedent => `
        <div class="precedent-card" onclick="viewPrecedent('${precedent.id}')">
            <div class="precedent-header">
                <div class="precedent-type-icon">
                    ${getCategoryIcon(precedent.category)}
                </div>
                <div class="precedent-actions">
                    <button class="btn-icon-small" onclick="event.stopPropagation(); usePrecedent('${precedent.id}')" title="Use Template">📋</button>
                    <button class="btn-icon-small" onclick="event.stopPropagation(); downloadPrecedent('${precedent.id}')" title="Download">⬇️</button>
                    <button class="btn-icon-small" onclick="event.stopPropagation(); deletePrecedent('${precedent.id}')" title="Delete">🗑️</button>
                </div>
            </div>
            <div class="precedent-title">${escapeHtml(precedent.title)}</div>
            <div class="precedent-description">${escapeHtml(precedent.description)}</div>
            <div class="precedent-meta">
                ${precedent.practiceArea ? `<span>📌 ${formatPracticeArea(precedent.practiceArea)}</span>` : ''}
                <span>📅 ${formatDate(precedent.createdAt)}</span>
                ${precedent.file ? `<span>📎 ${precedent.file.name}</span>` : ''}
            </div>
            ${precedent.tags && precedent.tags.length > 0 ? `
                <div class="precedent-tags">
                    ${precedent.tags.slice(0, 4).map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    ${precedent.tags.length > 4 ? `<span class="tag">+${precedent.tags.length - 4}</span>` : ''}
                </div>
            ` : ''}
            <div class="precedent-stats">
                <div class="stat-item">
                    <span>👁️</span>
                    <span>${precedent.viewCount || 0} views</span>
                </div>
                <div class="stat-item">
                    <span>📋</span>
                    <span>${precedent.usageCount || 0} uses</span>
                </div>
            </div>
        </div>
    `).join('');
}

function updateCategoryCounts() {
    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');

    document.getElementById('countAll').textContent = `${precedents.length} items`;
    document.getElementById('countPleadings').textContent = `${precedents.filter(p => p.category === 'pleadings').length} items`;
    document.getElementById('countContracts').textContent = `${precedents.filter(p => p.category === 'contracts').length} items`;
    document.getElementById('countOpinions').textContent = `${precedents.filter(p => p.category === 'opinions').length} items`;
    document.getElementById('countTemplates').textContent = `${precedents.filter(p => p.category === 'templates').length} items`;
    document.getElementById('countResearch').textContent = `${precedents.filter(p => p.category === 'research').length} items`;
}

function filterByCategory(category) {
    currentCategory = category;

    // Update active category
    document.querySelectorAll('.category-card').forEach(card => {
        card.classList.remove('active');
    });
    event.target.closest('.category-card').classList.add('active');

    loadPrecedents();
}

function searchPrecedents() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');

    if (!query) {
        loadPrecedents();
        return;
    }

    const filtered = precedents.filter(p => {
        return p.title.toLowerCase().includes(query) ||
               p.description.toLowerCase().includes(query) ||
               p.notes?.toLowerCase().includes(query) ||
               p.tags?.some(tag => tag.toLowerCase().includes(query));
    });

    const container = document.getElementById('precedentsGrid');

    if (filtered.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🔍</div>
                <h3>No results found</h3>
                <p>Try adjusting your search query</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(precedent => `
        <div class="precedent-card" onclick="viewPrecedent('${precedent.id}')">
            <div class="precedent-header">
                <div class="precedent-type-icon">
                    ${getCategoryIcon(precedent.category)}
                </div>
                <div class="precedent-actions">
                    <button class="btn-icon-small" onclick="event.stopPropagation(); usePrecedent('${precedent.id}')" title="Use Template">📋</button>
                    <button class="btn-icon-small" onclick="event.stopPropagation(); downloadPrecedent('${precedent.id}')" title="Download">⬇️</button>
                </div>
            </div>
            <div class="precedent-title">${escapeHtml(precedent.title)}</div>
            <div class="precedent-description">${escapeHtml(precedent.description)}</div>
        </div>
    `).join('');
}

// ===== ADD/EDIT PRECEDENT =====

function openAddPrecedentModal() {
    document.getElementById('precedentModal').classList.add('active');
    document.getElementById('precedentForm').reset();
    currentTags = [];
    uploadedFile = null;
    updateTagsDisplay();
    document.getElementById('filePreview').innerHTML = '';
}

function closePrecedentModal() {
    document.getElementById('precedentModal').classList.remove('active');
}

function handleTagInput(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        const input = document.getElementById('tagInput');
        const tag = input.value.trim();

        if (tag && !currentTags.includes(tag)) {
            currentTags.push(tag);
            updateTagsDisplay();
            input.value = '';
        }
    }
}

function updateTagsDisplay() {
    const container = document.getElementById('tagsContainer');
    const input = document.getElementById('tagInput');

    const tagsHTML = currentTags.map((tag, index) => `
        <span class="tag-item">
            ${escapeHtml(tag)}
            <span class="tag-remove" onclick="removeTag(${index})">×</span>
        </span>
    `).join('');

    container.innerHTML = tagsHTML;
    container.appendChild(input);
}

function removeTag(index) {
    currentTags.splice(index, 1);
    updateTagsDisplay();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Validate file size (10MB max)
    if (file.size > 10 * 1024 * 1024) {
        alert('File is too large. Maximum size is 10MB.');
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedFile = {
            name: file.name,
            type: file.type,
            size: file.size,
            data: e.target.result
        };

        document.getElementById('filePreview').innerHTML = `
            <div style="padding: 10px; background: #f3f4f6; border-radius: 6px; display: flex; justify-content: space-between; align-items: center;">
                <div>
                    <div style="font-weight: 500;">📄 ${escapeHtml(file.name)}</div>
                    <div style="font-size: 12px; color: #9ca3af;">${formatFileSize(file.size)}</div>
                </div>
                <button type="button" onclick="clearFile()" style="background: none; border: none; cursor: pointer; font-size: 20px;">×</button>
            </div>
        `;
    };
    reader.readAsDataURL(file);
}

function clearFile() {
    uploadedFile = null;
    document.getElementById('precedentFile').value = '';
    document.getElementById('filePreview').innerHTML = '';
}

function savePrecedent(event) {
    event.preventDefault();

    const title = document.getElementById('precedentTitle').value;
    const category = document.getElementById('precedentCategory').value;
    const practiceArea = document.getElementById('precedentPracticeArea').value;
    const description = document.getElementById('precedentDescription').value;
    const notes = document.getElementById('precedentNotes').value;

    const precedent = {
        id: 'prec_' + Date.now(),
        title: title,
        category: category,
        practiceArea: practiceArea,
        description: description,
        notes: notes,
        tags: [...currentTags],
        file: uploadedFile,
        viewCount: 0,
        usageCount: 0,
        createdAt: new Date().toISOString(),
        createdBy: 'Current User'
    };

    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');
    precedents.unshift(precedent);
    localStorage.setItem('precedents', JSON.stringify(precedents));

    closePrecedentModal();
    loadPrecedents();
    updateCategoryCounts();

    alert('Precedent added successfully!');
}

// ===== VIEW PRECEDENT =====

function viewPrecedent(id) {
    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');
    const precedent = precedents.find(p => p.id === id);

    if (!precedent) return;

    // Increment view count
    precedent.viewCount = (precedent.viewCount || 0) + 1;
    localStorage.setItem('precedents', JSON.stringify(precedents));

    const content = document.getElementById('precedentDetailContent');
    content.innerHTML = `
        <div class="precedent-detail-view">
            <div class="detail-header">
                <div>
                    <div class="detail-title">${escapeHtml(precedent.title)}</div>
                    <div style="color: #6b7280; margin-top: 5px;">
                        ${getCategoryIcon(precedent.category)} ${formatCategory(precedent.category)}
                        ${precedent.practiceArea ? ` • ${formatPracticeArea(precedent.practiceArea)}` : ''}
                    </div>
                </div>
                <div style="display: flex; gap: 10px;">
                    <button class="btn-icon-small" onclick="usePrecedent('${precedent.id}')">📋 Use</button>
                    <button class="btn-icon-small" onclick="downloadPrecedent('${precedent.id}')">⬇️ Download</button>
                </div>
            </div>

            <div class="detail-section">
                <h3>Description</h3>
                <div class="detail-content">${escapeHtml(precedent.description)}</div>
            </div>

            ${precedent.notes ? `
                <div class="detail-section">
                    <h3>Key Points & Usage Notes</h3>
                    <div class="detail-content">${escapeHtml(precedent.notes)}</div>
                </div>
            ` : ''}

            ${precedent.tags && precedent.tags.length > 0 ? `
                <div class="detail-section">
                    <h3>Tags</h3>
                    <div class="precedent-tags">
                        ${precedent.tags.map(tag => `<span class="tag">${escapeHtml(tag)}</span>`).join('')}
                    </div>
                </div>
            ` : ''}

            ${precedent.file ? `
                <div class="detail-section">
                    <h3>Attached Document</h3>
                    <div style="padding: 15px; background: #f3f4f6; border-radius: 8px;">
                        <div style="font-weight: 500; margin-bottom: 5px;">📄 ${escapeHtml(precedent.file.name)}</div>
                        <div style="font-size: 13px; color: #6b7280;">${formatFileSize(precedent.file.size)}</div>
                    </div>
                </div>
            ` : ''}

            <div class="detail-section">
                <h3>Statistics</h3>
                <div style="display: flex; gap: 20px;">
                    <div class="stat-item">👁️ ${precedent.viewCount || 0} views</div>
                    <div class="stat-item">📋 ${precedent.usageCount || 0} uses</div>
                    <div class="stat-item">📅 Created ${formatDate(precedent.createdAt)}</div>
                </div>
            </div>
        </div>
    `;

    document.getElementById('viewPrecedentModal').classList.add('active');
}

function closeViewModal() {
    document.getElementById('viewPrecedentModal').classList.remove('active');
    loadPrecedents(); // Reload to update view counts
}

// ===== ACTIONS =====

function usePrecedent(id) {
    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');
    const precedent = precedents.find(p => p.id === id);

    if (!precedent) return;

    // Increment usage count
    precedent.usageCount = (precedent.usageCount || 0) + 1;
    localStorage.setItem('precedents', JSON.stringify(precedents));

    alert(`Using precedent: "${precedent.title}"\n\nThis would typically:\n• Create a new draft based on this template\n• Open in the drafting module\n• Allow customization for current case`);

    loadPrecedents();
}

function downloadPrecedent(id) {
    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');
    const precedent = precedents.find(p => p.id === id);

    if (!precedent || !precedent.file) {
        alert('No file attached to this precedent');
        return;
    }

    // Create download link
    const link = document.createElement('a');
    link.href = precedent.file.data;
    link.download = precedent.file.name;
    link.click();
}

function deletePrecedent(id) {
    if (!confirm('Delete this precedent?')) return;

    const precedents = JSON.parse(localStorage.getItem('precedents') || '[]');
    const filtered = precedents.filter(p => p.id !== id);
    localStorage.setItem('precedents', JSON.stringify(filtered));

    loadPrecedents();
    updateCategoryCounts();
}

// ===== UTILITY FUNCTIONS =====

function formatCategory(category) {
    const names = {
        'pleadings': 'Pleadings',
        'contracts': 'Contracts',
        'opinions': 'Legal Opinions',
        'templates': 'Templates',
        'research': 'Research Memos',
        'other': 'Other'
    };
    return names[category] || category;
}

function getCategoryIcon(category) {
    const icons = {
        'pleadings': '⚖️',
        'contracts': '📝',
        'opinions': '💡',
        'templates': '📋',
        'research': '🔍',
        'other': '📄'
    };
    return icons[category] || '📄';
}

function formatPracticeArea(area) {
    const names = {
        'corporate': 'Corporate Law',
        'litigation': 'Litigation',
        'criminal': 'Criminal Law',
        'family': 'Family Law',
        'property': 'Property Law',
        'tax': 'Tax Law'
    };
    return names[area] || area;
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatFileSize(bytes) {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

console.log('✅ Precedent Library module loaded');
