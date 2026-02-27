const SUPABASE_URL = 'https://apwrewwcwknmkxidvedb.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwd3Jld3djd2tubWt4aWR2ZWRiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4MzYwODUsImV4cCI6MjA4NzQxMjA4NX0.dZpAb8oX91iHUWi-qt0FJ1wcuFDRdY1WMKNbm71AXX8';

const headers = {
  'apikey': SUPABASE_ANON_KEY,
  'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  'Content-Type': 'application/json'
};

async function checkAdminSetup() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/admin?select=id&limit=1`, { headers });
  const data = await res.json();
  return data.length > 0;
}

async function hashStr(str) {
  const encoder = new TextEncoder();
  const data = encoder.encode(str);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function loginAdmin(email, pass) {
  const hash = await hashStr(pass);
  const res = await fetch(`${SUPABASE_URL}/rest/v1/admin?email=eq.${email}&password_hash=eq.${hash}&select=*`, { headers });
  const data = await res.json();
  if (data.length > 0) {
    sessionStorage.setItem('admin_session', JSON.stringify({ email, id: data[0].id }));
    return true;
  }
  return false;
}

async function createAdmin(email, pass) {
  const hash = await hashStr(pass);
  await fetch(`${SUPABASE_URL}/rest/v1/admin`, {
    method: 'POST',
    headers: { ...headers, 'Prefer': 'return=representation' },
    body: JSON.stringify({ email, password_hash: hash })
  });
  sessionStorage.setItem('admin_session', JSON.stringify({ email }));
}

function adminLogout() {
  sessionStorage.removeItem('admin_session');
  window.location.href = 'index.html';
}

// Stats for dashboard
async function loadDashboardStats() {
  const [users, statuses, msgs] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/users?select=count`, { headers: { ...headers, 'Prefer': 'count=exact' } }),
    fetch(`${SUPABASE_URL}/rest/v1/statuses?select=count`, { headers: { ...headers, 'Prefer': 'count=exact' } }),
    fetch(`${SUPABASE_URL}/rest/v1/messages?select=count`, { headers: { ...headers, 'Prefer': 'count=exact' } })
  ]);
  
  document.getElementById('stat-users').innerText = users.headers.get('content-range').split('/')[1];
  document.getElementById('stat-statuses').innerText = statuses.headers.get('content-range').split('/')[1];
  const msgCount = msgs.headers.get('content-range').split('/')[1];
  document.getElementById('stat-msgs').innerText = (msgCount / (users.headers.get('content-range').split('/')[1] || 1)).toFixed(1);

  // New users chart - last 7 days mockup
  const ctx = document.getElementById('usersChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      datasets: [{ label: 'New Registrations', data: [12, 19, 3, 5, 2, 3, 7], borderColor: '#0ea5e9', tension: 0.1 }]
    }
  });
}

async function loadUsersTable() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/users?select=*&order=created_at.desc`, { headers });
  const users = await res.json();
  const body = document.getElementById('user-table-body');
  body.innerHTML = users.map(u => `
    <tr>
      <td>${u.full_name}</td>
      <td>@${u.username}</td>
      <td>${u.email}</td>
      <td>${new Date(u.created_at).toLocaleDateString()}</td>
      <td><button class="btn-delete" onclick="deleteUser('${u.id}')">Delete</button></td>
    </tr>
  `).join('');
}

async function deleteUser(id) {
  if (!confirm('Delete user?')) return;
  await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${id}`, { method: 'DELETE', headers });
  loadUsersTable();
}

async function loadAdminStatuses() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/statuses?select=*,user:users(username)&order=created_at.desc`, { headers });
  const statuses = await res.json();
  const grid = document.getElementById('status-grid');
  grid.innerHTML = statuses.map(s => `
    <div class="status-card">
      <div class="author">@${s.user.username}</div>
      <div class="content">${s.content}</div>
      <button class="btn-delete" onclick="deleteStatus('${s.id}')">Delete</button>
    </div>
  `).join('');
}

async function deleteStatus(id) {
  if (!confirm('Delete status?')) return;
  await fetch(`${SUPABASE_URL}/rest/v1/statuses?id=eq.${id}`, { method: 'DELETE', headers });
  loadAdminStatuses();
}
