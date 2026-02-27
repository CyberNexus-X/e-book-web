// =============================================================
// Test Chat Admin Panel — Vanilla JS
// =============================================================
const SUPABASE_URL = 'https://apwrewwcwknmkxidvedb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwd3Jld3djd2tubWt4aWR2ZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzYwODUsImV4cCI6MjA4NzQxMjA4NX0.dZpAb8oX91iHUWi-qt0FJ1wcuFDRdY1WMKNbm71AXX8';
const API = `${SUPABASE_URL}/rest/v1`;
const HEADERS = {
  'apikey': SUPABASE_ANON_KEY,
  'Content-Type': 'application/json',
  'Prefer': 'return=representation',
};

let currentPage = 1;
const PAGE_SIZE = 20;

// ========== HELPERS ==========
async function query(endpoint, opts = {}) {
  const res = await fetch(`${API}${endpoint}`, { headers: HEADERS, ...opts });
  if (opts.method === 'DELETE' || res.status === 204) return null;
  return res.json();
}

async function queryCount(endpoint) {
  const res = await fetch(`${API}${endpoint}`, {
    headers: { ...HEADERS, 'Prefer': 'count=exact', 'Range-Unit': 'items', 'Range': '0-0' }
  });
  const count = res.headers.get('content-range');
  return count ? parseInt(count.split('/')[1]) || 0 : 0;
}

function el(id) { return document.getElementById(id); }
function formatDate(d) { return d ? new Date(d).toLocaleDateString() : '-'; }

// ========== AUTH / SETUP ==========
async function checkAdminSetup() {
  const data = await query('/admin?select=id&limit=1');
  if (data.length === 0) {
    el('setup-form').style.display = 'block';
    el('setup-text').textContent = 'Create your admin account';
    el('admin-confirm').style.display = 'block';
    el('admin-submit-btn').textContent = 'Create Admin';
    return false;
  }
  return true;
}

async function hashPassword(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

el('admin-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = el('admin-email').value;
  const password = el('admin-password').value;
  const confirm = el('admin-confirm').value;
  el('admin-error').textContent = '';

  const exists = await checkAdminSetup();

  if (!exists) {
    // Creating admin
    if (password !== confirm) { el('admin-error').textContent = 'Passwords do not match'; return; }
    if (password.length < 8) { el('admin-error').textContent = 'Min 8 characters'; return; }
    const hash = await hashPassword(password);
    await query('/admin', { method: 'POST', body: JSON.stringify({ email, password_hash: hash }) });
    sessionStorage.setItem('admin_session', JSON.stringify({ email, time: Date.now() }));
    showDashboard();
    return;
  }

  // Logging in
  const hash = await hashPassword(password);
  const admins = await query(`/admin?email=eq.${encodeURIComponent(email)}&password_hash=eq.${hash}&select=id`);
  if (admins.length === 0) { el('admin-error').textContent = 'Invalid credentials'; return; }
  sessionStorage.setItem('admin_session', JSON.stringify({ email, time: Date.now() }));
  showDashboard();
});

function adminLogout() {
  sessionStorage.removeItem('admin_session');
  el('login-page').classList.add('active');
  el('dashboard-page').classList.remove('active');
}

// ========== DASHBOARD ==========
function showDashboard() {
  el('login-page').classList.remove('active');
  el('dashboard-page').classList.add('active');
  loadDashboard();
  loadUsers();
  loadStatuses();
}

async function loadDashboard() {
  const [totalUsers, totalMessages, totalStatuses, onlineCount, activeRandom] = await Promise.all([
    queryCount('/users?select=id'),
    queryCount('/messages?select=id'),
    queryCount('/statuses?select=id&expires_at=gt.' + new Date().toISOString()),
    queryCount('/users?select=id&is_online=eq.true'),
    queryCount('/random_chat_sessions?select=id&status=eq.connected'),
  ]);

  // New users today
  const today = new Date(); today.setHours(0, 0, 0, 0);
  const newToday = await queryCount('/users?select=id&created_at=gte.' + today.toISOString());

  el('total-users').textContent = totalUsers;
  el('new-today').textContent = newToday;
  el('total-messages').textContent = totalMessages;
  el('total-statuses').textContent = totalStatuses;
  el('online-users').textContent = onlineCount;
  el('active-random').textContent = activeRandom;

  // Charts
  loadUsersChart();
  loadMessagesChart();
}

async function loadUsersChart() {
  const days = 30;
  const labels = []; const values = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
    const next = new Date(d); next.setDate(next.getDate() + 1);
    labels.push(d.toLocaleDateString('en', { month: 'short', day: 'numeric' }));
    const c = await queryCount(`/users?select=id&created_at=gte.${d.toISOString()}&created_at=lt.${next.toISOString()}`);
    values.push(c);
  }
  const ctx = el('users-chart').getContext('2d');
  new Chart(ctx, {
    type: 'line', data: {
      labels, datasets: [{ label: 'New Users', data: values, borderColor: '#0ea5e9', backgroundColor: 'rgba(14,165,233,0.1)', fill: true, tension: 0.3 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#94a3b8', maxTicksLimit: 7 } }, y: { ticks: { color: '#94a3b8' }, beginAtZero: true } } }
  });
}

async function loadMessagesChart() {
  const days = 7;
  const labels = []; const values = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(); d.setDate(d.getDate() - i); d.setHours(0, 0, 0, 0);
    const next = new Date(d); next.setDate(next.getDate() + 1);
    labels.push(d.toLocaleDateString('en', { weekday: 'short' }));
    const c = await queryCount(`/messages?select=id&created_at=gte.${d.toISOString()}&created_at=lt.${next.toISOString()}`);
    values.push(c);
  }
  const ctx = el('messages-chart').getContext('2d');
  new Chart(ctx, {
    type: 'bar', data: {
      labels, datasets: [{ label: 'Messages', data: values, backgroundColor: '#0ea5e9', borderRadius: 6 }]
    },
    options: { responsive: true, plugins: { legend: { display: false } }, scales: { x: { ticks: { color: '#94a3b8' } }, y: { ticks: { color: '#94a3b8' }, beginAtZero: true } } }
  });
}

// ========== USERS ==========
async function loadUsers(search = '', filter = 'all', page = 1) {
  currentPage = page;
  let endpoint = `/users?select=*&order=created_at.desc&limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`;
  if (search) endpoint += `&or=(username.ilike.*${search}*,email.ilike.*${search}*)`;
  if (filter === 'online') endpoint += '&is_online=eq.true';
  else if (filter === 'offline') endpoint += '&is_online=eq.false';

  const users = await query(endpoint);
  const tbody = el('users-tbody');
  tbody.innerHTML = users.map(u => `
    <tr>
      <td>${u.full_name}</td>
      <td>@${u.username}</td>
      <td>${u.email}</td>
      <td>${u.gender || '-'}</td>
      <td>${formatDate(u.created_at)}</td>
      <td style="color:${u.is_online ? '#22c55e' : '#94a3b8'}">${u.is_online ? '🟢 Online' : '⚫ Offline'}</td>
      <td>
        <button class="btn-sm btn-edit" onclick="editUser('${u.id}')">Edit</button>
        <button class="btn-sm btn-delete" onclick="deleteUser('${u.id}','${u.username}')">Delete</button>
      </td>
    </tr>
  `).join('');
}

el('user-search').addEventListener('input', (e) => loadUsers(e.target.value, el('user-filter').value));
el('user-filter').addEventListener('change', (e) => loadUsers(el('user-search').value, e.target.value));

async function editUser(id) {
  const users = await query(`/users?id=eq.${id}&select=*`);
  if (!users.length) return;
  const u = users[0];
  el('edit-user-id').value = u.id;
  el('edit-name').value = u.full_name;
  el('edit-username').value = u.username;
  el('edit-email').value = u.email;
  el('edit-public').value = String(u.profile_public);
  el('edit-modal').style.display = 'flex';
}

function closeEditModal() { el('edit-modal').style.display = 'none'; }

el('edit-user-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  const id = el('edit-user-id').value;
  await query(`/users?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({
      full_name: el('edit-name').value,
      username: el('edit-username').value,
      email: el('edit-email').value,
      profile_public: el('edit-public').value === 'true',
    }),
  });
  closeEditModal();
  loadUsers();
});

async function deleteUser(id, username) {
  if (!confirm(`Delete user @${username}? All their data will be permanently removed.`)) return;
  await query(`/users?id=eq.${id}`, { method: 'DELETE' });
  loadUsers();
}

// ========== STATUSES ==========
async function loadStatuses(search = '', filter = 'all') {
  let endpoint = '/statuses?select=*,user:users(username)&order=created_at.desc&limit=50';
  if (filter === 'active') endpoint += '&expires_at=gt.' + new Date().toISOString();
  else if (filter === 'expired') endpoint += '&expires_at=lte.' + new Date().toISOString();

  const statuses = await query(endpoint);
  const tbody = el('statuses-tbody');
  tbody.innerHTML = statuses.map(s => {
    const username = s.user?.username || '-';
    if (search && !username.includes(search)) return '';
    const expired = new Date(s.expires_at) < new Date();
    return `
      <tr>
        <td>@${username}</td>
        <td style="max-width:200px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${s.content}</td>
        <td>${s.visibility === 'anyone' ? '🌐 Everyone' : '👥 Contacts'}</td>
        <td>${formatDate(s.created_at)}</td>
        <td style="color:${expired ? '#ef4444' : '#22c55e'}">${formatDate(s.expires_at)} ${expired ? '(expired)' : ''}</td>
        <td><button class="btn-sm btn-delete" onclick="deleteStatus('${s.id}')">Delete</button></td>
      </tr>
    `;
  }).join('');
}

el('status-search').addEventListener('input', (e) => loadStatuses(e.target.value, el('status-filter').value));
el('status-filter').addEventListener('change', (e) => loadStatuses(el('status-search').value, e.target.value));

async function deleteStatus(id) {
  if (!confirm('Delete this status?')) return;
  await query(`/statuses?id=eq.${id}`, { method: 'DELETE' });
  loadStatuses();
}

// ========== NAV ==========
document.querySelectorAll('[data-page]').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
    link.classList.add('active');
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    el(link.dataset.page === 'dashboard' ? 'dash-section' : link.dataset.page + '-section').classList.add('active');
  });
});

// ========== INIT ==========
(async function init() {
  const session = JSON.parse(sessionStorage.getItem('admin_session') || 'null');
  if (session && (Date.now() - session.time) < 86400000) {
    showDashboard();
  } else {
    await checkAdminSetup();
  }
})();
