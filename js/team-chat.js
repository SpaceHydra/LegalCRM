// Team Chat & Messaging Module
// Handles real-time team collaboration, matter-specific threads, @mentions, and file sharing

let currentThread = null;
let currentUser = { id: 'user1', name: 'Prateek Mehta', initials: 'PM', role: 'Senior Advocate' };
let mentionAutocompleteActive = false;

// Initialize chat on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
    loadChatThreads();
    setupChatSearch();
    setupMentionAutocomplete();
});

function initializeChat() {
    // Initialize sample data if not exists
    if (!localStorage.getItem('chatThreads')) {
        const sampleThreads = [
            {
                id: 'thread1',
                name: 'Matter: LoanAgree_2024_001',
                type: 'matter',
                matterId: 'MTR-2024-001',
                participants: ['user1', 'user2', 'user3'],
                lastMessage: 'Updated the loan agreement draft',
                lastMessageTime: new Date().toISOString(),
                unreadCount: 2,
                createdAt: new Date().toISOString()
            },
            {
                id: 'thread2',
                name: 'Team Discussion',
                type: 'direct',
                participants: ['user1', 'user2'],
                lastMessage: 'Can we schedule a review meeting?',
                lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
                unreadCount: 0,
                createdAt: new Date(Date.now() - 86400000).toISOString()
            }
        ];
        localStorage.setItem('chatThreads', JSON.stringify(sampleThreads));
    }

    if (!localStorage.getItem('chatMessages')) {
        const sampleMessages = [
            {
                id: 'msg1',
                threadId: 'thread1',
                senderId: 'user2',
                senderName: 'Radhika Sen',
                senderInitials: 'RS',
                message: 'I have completed the first draft of the loan agreement. Please review.',
                timestamp: new Date(Date.now() - 7200000).toISOString(),
                attachments: [
                    { name: 'Loan_Agreement_Draft_v1.docx', size: '245 KB', type: 'docx' }
                ],
                mentions: []
            },
            {
                id: 'msg2',
                threadId: 'thread1',
                senderId: 'user1',
                senderName: 'Prateek Mehta',
                senderInitials: 'PM',
                message: 'Thanks @Radhika. I will review this today and provide feedback.',
                timestamp: new Date(Date.now() - 3600000).toISOString(),
                attachments: [],
                mentions: ['user2']
            },
            {
                id: 'msg3',
                threadId: 'thread1',
                senderId: 'user3',
                senderName: 'Amit Kumar',
                senderInitials: 'AK',
                message: '@Prateek @Radhika - Should we also include the indemnity clause we discussed?',
                timestamp: new Date(Date.now() - 1800000).toISOString(),
                attachments: [],
                mentions: ['user1', 'user2']
            }
        ];
        localStorage.setItem('chatMessages', JSON.stringify(sampleMessages));
    }

    // Load team members
    if (!localStorage.getItem('teamMembers')) {
        const teamMembers = [
            { id: 'user1', name: 'Prateek Mehta', initials: 'PM', role: 'Senior Advocate' },
            { id: 'user2', name: 'Radhika Sen', initials: 'RS', role: 'Advocate' },
            { id: 'user3', name: 'Amit Kumar', initials: 'AK', role: 'Associate' },
            { id: 'user4', name: 'Sneha Sharma', initials: 'SS', role: 'Junior Associate' },
            { id: 'user5', name: 'Vikram Desai', initials: 'VD', role: 'Advocate' }
        ];
        localStorage.setItem('teamMembers', JSON.stringify(teamMembers));
    }
}

function loadChatThreads(filter = 'all') {
    const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');
    const threadsList = document.getElementById('chatThreadsList');

    let filteredThreads = threads;
    if (filter === 'matters') {
        filteredThreads = threads.filter(t => t.type === 'matter');
    } else if (filter === 'direct') {
        filteredThreads = threads.filter(t => t.type === 'direct');
    }

    // Sort by last message time
    filteredThreads.sort((a, b) => new Date(b.lastMessageTime) - new Date(a.lastMessageTime));

    threadsList.innerHTML = filteredThreads.map(thread => `
        <div class="chat-thread-item ${currentThread?.id === thread.id ? 'active' : ''}"
             onclick="openThread('${thread.id}')">
            <div class="chat-thread-header">
                <span class="chat-thread-name">
                    ${thread.type === 'matter' ? '📁' : '👤'} ${thread.name}
                    ${thread.unreadCount > 0 ? `<span class="chat-thread-badge">${thread.unreadCount}</span>` : ''}
                </span>
                <span class="chat-thread-time">${formatTimeAgo(thread.lastMessageTime)}</span>
            </div>
            <div class="chat-thread-preview">${thread.lastMessage}</div>
        </div>
    `).join('');

    // If no thread is selected, select the first one
    if (!currentThread && filteredThreads.length > 0) {
        openThread(filteredThreads[0].id);
    }
}

function openThread(threadId) {
    const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');
    currentThread = threads.find(t => t.id === threadId);

    if (!currentThread) return;

    // Mark as read
    currentThread.unreadCount = 0;
    const threadIndex = threads.findIndex(t => t.id === threadId);
    threads[threadIndex] = currentThread;
    localStorage.setItem('chatThreads', JSON.stringify(threads));

    // Reload threads list to update UI
    loadChatThreads();

    // Load messages
    loadMessages(threadId);
}

function loadMessages(threadId) {
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    const threadMessages = messages.filter(m => m.threadId === threadId);
    const chatContent = document.getElementById('chatContent');

    // Get matter details if applicable
    let matterInfo = '';
    if (currentThread.type === 'matter' && currentThread.matterId) {
        const matter = window.dataManager?.getById('projects', currentThread.matterId);
        if (matter) {
            matterInfo = `<span class="chat-subtitle">📁 ${matter.title} | ${matter.clientName}</span>`;
        }
    }

    chatContent.innerHTML = `
        <div class="chat-header">
            <div class="chat-header-top">
                <div>
                    <h2 class="chat-title">${currentThread.name}</h2>
                    ${matterInfo}
                </div>
                <div class="chat-actions">
                    ${currentThread.type === 'matter' ? `
                        <button class="chat-action-btn" onclick="viewMatter('${currentThread.matterId}')">
                            📁 View Matter
                        </button>
                    ` : ''}
                    <button class="chat-action-btn" onclick="showThreadInfo()">
                        ℹ️ Info
                    </button>
                </div>
            </div>
        </div>

        <div class="chat-messages" id="chatMessagesArea">
            ${threadMessages.length > 0 ? threadMessages.map(msg => renderMessage(msg)).join('') : `
                <div class="chat-empty-state">
                    <div class="chat-empty-state-icon">💬</div>
                    <div class="chat-empty-state-title">No messages yet</div>
                    <p>Start the conversation by sending a message below</p>
                </div>
            `}
        </div>

        <div class="chat-input-container">
            <div class="chat-input-toolbar">
                <button class="chat-toolbar-btn" onclick="attachFile()">
                    📎 Attach File
                </button>
                <button class="chat-toolbar-btn" onclick="insertMention()">
                    @ Mention
                </button>
                <button class="chat-toolbar-btn" onclick="addEmoji()">
                    😊 Emoji
                </button>
            </div>
            <div style="position: relative;">
                <div class="mention-autocomplete" id="mentionAutocomplete"></div>
                <div class="chat-input-wrapper">
                    <textarea class="chat-input"
                              id="chatInput"
                              placeholder="Type your message... (Use @ to mention team members)"
                              rows="1"></textarea>
                    <button class="chat-send-btn" onclick="sendMessage()">Send</button>
                </div>
            </div>
        </div>
    `;

    // Scroll to bottom
    const messagesArea = document.getElementById('chatMessagesArea');
    if (messagesArea) {
        messagesArea.scrollTop = messagesArea.scrollHeight;
    }

    // Setup enter key to send
    const chatInput = document.getElementById('chatInput');
    chatInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
    });
}

function renderMessage(msg) {
    const messageText = msg.message.replace(/@(\w+\s?\w+)/g, '<span class="mention">@$1</span>');

    return `
        <div class="chat-message">
            <div class="chat-message-avatar">${msg.senderInitials}</div>
            <div class="chat-message-content">
                <div class="chat-message-header">
                    <span class="chat-message-author">${msg.senderName}</span>
                    <span class="chat-message-time">${formatMessageTime(msg.timestamp)}</span>
                </div>
                <div class="chat-message-text">${messageText}</div>
                ${msg.attachments && msg.attachments.length > 0 ? `
                    <div class="chat-message-attachments">
                        ${msg.attachments.map(att => `
                            <div class="chat-attachment" onclick="downloadAttachment('${att.name}')">
                                <span class="chat-attachment-icon">${getFileIcon(att.type)}</span>
                                <div>
                                    <div style="font-weight: 500;">${att.name}</div>
                                    <div style="font-size: 11px; color: #95a5a6;">${att.size}</div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
            </div>
        </div>
    `;
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();

    if (!message || !currentThread) return;

    // Extract mentions
    const mentionRegex = /@(\w+\s?\w+)/g;
    const mentions = [];
    let match;
    while ((match = mentionRegex.exec(message)) !== null) {
        mentions.push(match[1]);
    }

    // Create message object
    const newMessage = {
        id: 'msg_' + Date.now(),
        threadId: currentThread.id,
        senderId: currentUser.id,
        senderName: currentUser.name,
        senderInitials: currentUser.initials,
        message: message,
        timestamp: new Date().toISOString(),
        attachments: [],
        mentions: mentions
    };

    // Save message
    const messages = JSON.parse(localStorage.getItem('chatMessages') || '[]');
    messages.push(newMessage);
    localStorage.setItem('chatMessages', JSON.stringify(messages));

    // Update thread
    const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');
    const threadIndex = threads.findIndex(t => t.id === currentThread.id);
    if (threadIndex !== -1) {
        threads[threadIndex].lastMessage = message.substring(0, 50);
        threads[threadIndex].lastMessageTime = new Date().toISOString();
        localStorage.setItem('chatThreads', JSON.stringify(threads));
    }

    // Clear input
    input.value = '';
    input.style.height = 'auto';

    // Reload messages
    loadMessages(currentThread.id);

    // Show notification for mentions
    if (mentions.length > 0) {
        showNotification(`You mentioned ${mentions.length} team member(s)`, 'success');
    }
}

function setupChatSearch() {
    const searchInput = document.getElementById('chatSearch');
    if (!searchInput) return;

    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase();
        const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');

        const filtered = threads.filter(thread =>
            thread.name.toLowerCase().includes(searchTerm) ||
            thread.lastMessage.toLowerCase().includes(searchTerm)
        );

        const threadsList = document.getElementById('chatThreadsList');
        threadsList.innerHTML = filtered.map(thread => `
            <div class="chat-thread-item ${currentThread?.id === thread.id ? 'active' : ''}"
                 onclick="openThread('${thread.id}')">
                <div class="chat-thread-header">
                    <span class="chat-thread-name">
                        ${thread.type === 'matter' ? '📁' : '👤'} ${thread.name}
                        ${thread.unreadCount > 0 ? `<span class="chat-thread-badge">${thread.unreadCount}</span>` : ''}
                    </span>
                    <span class="chat-thread-time">${formatTimeAgo(thread.lastMessageTime)}</span>
                </div>
                <div class="chat-thread-preview">${thread.lastMessage}</div>
            </div>
        `).join('');
    });
}

function setupMentionAutocomplete() {
    // This will be called when @ is typed
    document.addEventListener('input', function(e) {
        if (e.target.id === 'chatInput') {
            const input = e.target;
            const text = input.value;
            const cursorPos = input.selectionStart;

            // Check if @ was typed
            const beforeCursor = text.substring(0, cursorPos);
            const lastAtIndex = beforeCursor.lastIndexOf('@');

            if (lastAtIndex !== -1 && lastAtIndex === cursorPos - 1) {
                showMentionAutocomplete();
            } else if (lastAtIndex !== -1) {
                const searchTerm = beforeCursor.substring(lastAtIndex + 1);
                if (searchTerm.length > 0 && !searchTerm.includes(' ')) {
                    filterMentionAutocomplete(searchTerm);
                } else {
                    hideMentionAutocomplete();
                }
            } else {
                hideMentionAutocomplete();
            }
        }
    });
}

function showMentionAutocomplete() {
    const autocomplete = document.getElementById('mentionAutocomplete');
    if (!autocomplete) return;

    const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const filteredMembers = teamMembers.filter(m => m.id !== currentUser.id);

    autocomplete.innerHTML = filteredMembers.map((member, index) => `
        <div class="mention-item ${index === 0 ? 'selected' : ''}"
             onclick="insertMentionName('${member.name}')">
            <div class="chat-message-avatar" style="width: 30px; height: 30px; font-size: 12px;">
                ${member.initials}
            </div>
            <div>
                <div style="font-weight: 500; font-size: 13px;">${member.name}</div>
                <div style="font-size: 11px; color: #95a5a6;">${member.role}</div>
            </div>
        </div>
    `).join('');

    autocomplete.classList.add('active');
}

function filterMentionAutocomplete(searchTerm) {
    const autocomplete = document.getElementById('mentionAutocomplete');
    if (!autocomplete) return;

    const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const filtered = teamMembers.filter(m =>
        m.id !== currentUser.id &&
        m.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (filtered.length > 0) {
        autocomplete.innerHTML = filtered.map((member, index) => `
            <div class="mention-item ${index === 0 ? 'selected' : ''}"
                 onclick="insertMentionName('${member.name}')">
                <div class="chat-message-avatar" style="width: 30px; height: 30px; font-size: 12px;">
                    ${member.initials}
                </div>
                <div>
                    <div style="font-weight: 500; font-size: 13px;">${member.name}</div>
                    <div style="font-size: 11px; color: #95a5a6;">${member.role}</div>
                </div>
            </div>
        `).join('');
        autocomplete.classList.add('active');
    } else {
        hideMentionAutocomplete();
    }
}

function hideMentionAutocomplete() {
    const autocomplete = document.getElementById('mentionAutocomplete');
    if (autocomplete) {
        autocomplete.classList.remove('active');
    }
}

function insertMentionName(name) {
    const input = document.getElementById('chatInput');
    const text = input.value;
    const cursorPos = input.selectionStart;
    const beforeCursor = text.substring(0, cursorPos);
    const afterCursor = text.substring(cursorPos);
    const lastAtIndex = beforeCursor.lastIndexOf('@');

    const newText = text.substring(0, lastAtIndex) + '@' + name + ' ' + afterCursor;
    input.value = newText;

    hideMentionAutocomplete();
    input.focus();
}

function switchTab(tab) {
    // Update active tab
    document.querySelectorAll('.chat-tab').forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');

    // Load filtered threads
    loadChatThreads(tab);
}

function startNewChat() {
    const teamMembers = JSON.parse(localStorage.getItem('teamMembers') || '[]');
    const otherMembers = teamMembers.filter(m => m.id !== currentUser.id);

    const participantName = prompt('Enter team member name or select:\n' +
        otherMembers.map((m, i) => `${i + 1}. ${m.name}`).join('\n'));

    if (!participantName) return;

    const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');
    const newThread = {
        id: 'thread_' + Date.now(),
        name: participantName,
        type: 'direct',
        participants: [currentUser.id],
        lastMessage: 'New conversation',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        createdAt: new Date().toISOString()
    };

    threads.push(newThread);
    localStorage.setItem('chatThreads', JSON.stringify(threads));

    loadChatThreads();
    openThread(newThread.id);
    showNotification('New chat created', 'success');
}

function createMatterThread() {
    // Get all matters
    const matters = window.dataManager?.get('projects') || [];

    if (matters.length === 0) {
        showNotification('No matters found. Create a matter first.', 'warning');
        return;
    }

    const matterList = matters.map((m, i) => `${i + 1}. ${m.serialNumber} - ${m.title}`).join('\n');
    const selection = prompt('Select a matter:\n' + matterList);

    if (!selection) return;

    const index = parseInt(selection) - 1;
    if (index < 0 || index >= matters.length) {
        showNotification('Invalid selection', 'error');
        return;
    }

    const matter = matters[index];
    const threads = JSON.parse(localStorage.getItem('chatThreads') || '[]');

    // Check if thread already exists
    const existingThread = threads.find(t => t.matterId === matter.id);
    if (existingThread) {
        openThread(existingThread.id);
        showNotification('Matter thread already exists', 'info');
        return;
    }

    const newThread = {
        id: 'thread_' + Date.now(),
        name: `Matter: ${matter.serialNumber}`,
        type: 'matter',
        matterId: matter.id,
        participants: [currentUser.id],
        lastMessage: 'Matter discussion started',
        lastMessageTime: new Date().toISOString(),
        unreadCount: 0,
        createdAt: new Date().toISOString()
    };

    threads.push(newThread);
    localStorage.setItem('chatThreads', JSON.stringify(threads));

    loadChatThreads();
    openThread(newThread.id);
    showNotification('Matter thread created', 'success');
}

function attachFile() {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.onchange = function(e) {
        const files = Array.from(e.target.files);
        if (files.length > 0) {
            showNotification(`${files.length} file(s) attached (simulated)`, 'success');
            // In a real app, this would upload files
        }
    };
    input.click();
}

function insertMention() {
    const input = document.getElementById('chatInput');
    input.value += '@';
    input.focus();
    showMentionAutocomplete();
}

function addEmoji() {
    const emojis = ['👍', '👎', '😊', '😂', '❤️', '🎉', '👏', '🔥', '✅', '❌'];
    const emoji = emojis[Math.floor(Math.random() * emojis.length)];
    const input = document.getElementById('chatInput');
    input.value += emoji;
    input.focus();
}

function viewMatter(matterId) {
    window.location.href = `matter-details.html?id=${matterId}`;
}

function showThreadInfo() {
    if (!currentThread) return;

    const participants = JSON.parse(localStorage.getItem('teamMembers') || '[]')
        .filter(m => currentThread.participants.includes(m.id))
        .map(m => m.name)
        .join(', ');

    alert(`Thread Information:\n\nName: ${currentThread.name}\nType: ${currentThread.type}\nParticipants: ${participants}\nCreated: ${formatDate(currentThread.createdAt)}`);
}

function downloadAttachment(filename) {
    showNotification(`Downloading ${filename}...`, 'info');
    // In real app, this would download the file
}

function getFileIcon(type) {
    const icons = {
        'pdf': '📄',
        'docx': '📝',
        'doc': '📝',
        'xlsx': '📊',
        'xls': '📊',
        'png': '🖼️',
        'jpg': '🖼️',
        'jpeg': '🖼️',
        'zip': '📦'
    };
    return icons[type] || '📎';
}

function formatTimeAgo(timestamp) {
    const now = new Date();
    const time = new Date(timestamp);
    const diff = now - time;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return formatDate(timestamp);
}

function formatMessageTime(timestamp) {
    const date = new Date(timestamp);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    } else {
        return date.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }) + ' at ' +
               date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
    }
}

function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Use existing notification system
    if (window.showNotification) {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}
