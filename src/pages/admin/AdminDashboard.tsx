import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { StatCard, Card, CardHeader, Badge, Button } from '../../components/admin';

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState({ 
    users: 0, 
    statuses: 0, 
    messages: 0,
    onlineUsers: 0,
    randomChats: 0,
    bannedUsers: 0
  });
  const [loading, setLoading] = useState(true);
  const [messagesPerDay, setMessagesPerDay] = useState<{ day: string; count: number }[]>([]);
  const [newUsersData, setNewUsersData] = useState<{ day: string; count: number }[]>([]);
  const [recentReports, setRecentReports] = useState<any[]>([]);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    const [u, s, m, o, rc, b, msgData, userData, reportsData] = await Promise.all([
      supabase.from('users').select('*', { count: 'exact', head: true }),
      supabase.from('statuses').select('*', { count: 'exact', head: true }),
      supabase.from('messages').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_online', true),
      supabase.from('random_chats').select('*', { count: 'exact', head: true }),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('is_banned', true),
      supabase
        .from('messages')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase
        .from('users')
        .select('created_at')
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()),
      supabase
        .from('reports')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
    ]);
    
    setStats({
      users: u.count || 0,
      statuses: s.count || 0,
      messages: m.count || 0,
      onlineUsers: o.count || 0,
      randomChats: rc.count || 0,
      bannedUsers: b.count || 0
    });
    
    // Process messages per day
    if (msgData.data) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const counts: number[] = [0, 0, 0, 0, 0, 0, 0];
      msgData.data.forEach((msg: any) => {
        const date = new Date(msg.created_at);
        counts[date.getDay()]++;
      });
      setMessagesPerDay(counts.map((count, i) => ({ day: days[i], count })));
    }
    
    // Process new users per day
    if (userData.data) {
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const counts: number[] = [0, 0, 0, 0, 0, 0, 0];
      userData.data.forEach((user: any) => {
        const date = new Date(user.created_at);
        counts[date.getDay()]++;
      });
      setNewUsersData(counts.map((count, i) => ({ day: days[i], count })));
    }
    
    // Set recent reports
    if (reportsData.data) {
      setRecentReports(reportsData.data);
    }
    
    setLoading(false);
  };

  const maxMessages = Math.max(...messagesPerDay.map(d => d.count), 1);
  const maxNewUsers = Math.max(...newUsersData.map(d => d.count), 1);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-violet-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 admin-page">
      {/* Header - Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-violet-600/30 to-cyan-500/20 border border-violet-500/20 rounded-2xl p-7 backdrop-blur-xl">
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '30px 30px'
        }} />
        
        <div className="relative z-10">
          <h1 className="text-2xl font-bold text-white">Welcome back, Admin 👋</h1>
          <p className="text-white/50 mt-1">Here's what's happening with your app today.</p>
          
          {/* Quick Action Buttons */}
          <div className="flex gap-3 mt-5">
            <Link
              to="/1234/admin/compose"
              className="px-4 py-2 bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-sm font-medium rounded-xl hover:shadow-lg hover:shadow-violet-500/25 transition-all"
            >
              Send Announcement
            </Link>
            <Link
              to="/1234/admin/reports"
              className="px-4 py-2 bg-white/10 border border-white/20 text-white text-sm font-medium rounded-xl hover:bg-white/20 transition-all"
            >
              View Reports
            </Link>
          </div>
        </div>
      </div>

      {/* Stats Cards - Glass Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          label="Total Users"
          value={stats.users}
          icon={<svg className="w-6 h-6 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
          color="#a78bfa"
          bgColor="rgba(124, 58, 237, 0.15)"
          trend={{ value: 12, isPositive: true }}
          gradientColor="from-violet-500 to-indigo-500"
        />
        <StatCard
          label="Online Users"
          value={stats.onlineUsers}
          icon={<svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>}
          color="#34d399"
          bgColor="rgba(16, 185, 129, 0.15)"
          trend={{ value: 8, isPositive: true }}
          gradientColor="from-emerald-500 to-teal-500"
        />
        <StatCard
          label="Total Messages"
          value={stats.messages}
          icon={<svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>}
          color="#22d3ee"
          bgColor="rgba(14, 165, 233, 0.15)"
          trend={{ value: 24, isPositive: true }}
          gradientColor="from-cyan-500 to-blue-500"
        />
        <StatCard
          label="Active Statuses"
          value={stats.statuses}
          icon={<svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>}
          color="#f472b6"
          bgColor="rgba(236, 72, 153, 0.15)"
          gradientColor="from-pink-500 to-rose-500"
        />
        <StatCard
          label="Random Chats"
          value={stats.randomChats}
          icon={<svg className="w-6 h-6 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" /></svg>}
          color="#fb923c"
          bgColor="rgba(249, 115, 22, 0.15)"
          trend={{ value: 5, isPositive: true }}
          gradientColor="from-orange-500 to-amber-500"
        />
        <StatCard
          label="Banned Users"
          value={stats.bannedUsers}
          icon={<svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" /></svg>}
          color="#f87171"
          bgColor="rgba(239, 68, 68, 0.15)"
          gradientColor="from-red-500 to-pink-500"
        />
      </div>

      {/* Charts Row - Glass Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Per Day Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader 
            title="Messages Per Day" 
            subtitle="Last 7 days"
          />
          <div className="flex items-end justify-between h-48 gap-2">
            {messagesPerDay.length > 0 && messagesPerDay.some(d => d.count > 0) ? (
              messagesPerDay.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-gradient-to-t from-violet-600 to-violet-400 rounded-t-lg transition-all duration-500 hover:from-violet-500 hover:to-violet-300"
                    style={{ height: `${(item.count / maxMessages) * 100}%` }}
                  />
                  <span className="text-xs text-white/40 font-medium">{item.day}</span>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/40">
                <p>No message data available</p>
              </div>
            )}
          </div>
        </Card>

        {/* New Users Chart */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader 
            title="New Users" 
            subtitle="Last 7 days"
          />
          <div className="flex items-end justify-between h-48 gap-2">
            {newUsersData.length > 0 && newUsersData.some(d => d.count > 0) ? (
              newUsersData.map((item, index) => (
                <div key={index} className="flex-1 flex flex-col items-center gap-2 group">
                  <div 
                    className="w-full bg-gradient-to-t from-cyan-500 to-cyan-400 rounded-t-lg transition-all duration-500 hover:from-cyan-400 hover:to-cyan-300"
                    style={{ height: `${(item.count / maxNewUsers) * 100}%` }}
                  />
                  <span className="text-xs text-white/40 font-medium">{item.day}</span>
                </div>
              ))
            ) : (
              <div className="flex-1 flex items-center justify-center text-white/40">
                <p>No user data available</p>
              </div>
            )}
          </div>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Reports */}
        <Card className="lg:col-span-2 hover:shadow-lg transition-shadow duration-300">
          <CardHeader 
            title="Recent Reports" 
            subtitle="Latest moderation requests"
            action={
              <Link 
                to="/1234/admin/reports" 
                className="text-sm text-violet-400 hover:text-violet-300 font-medium transition-colors"
              >
                View All
              </Link>
            }
          />
          <div className="space-y-3">
            {recentReports.length > 0 ? (
              recentReports.map((report: any) => (
                <div 
                  key={report.id}
                  className="flex items-center justify-between p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition-colors border border-white/[0.05]"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center">
                      <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-white">{report.type || 'Report'}</p>
                      <p className="text-sm text-white/40">
                        {report.reporter_id ? 'Reported by user' : 'Unknown reporter'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={report.status === 'pending' ? 'glass-warning' : 'glass-success'}>
                      {report.status || 'Pending'}
                    </Badge>
                    <span className="text-sm text-white/40">
                      {report.created_at ? new Date(report.created_at).toLocaleDateString() : 'N/A'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-white/40">
                <p>No reports yet</p>
              </div>
            )}
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="hover:shadow-lg transition-shadow duration-300">
          <CardHeader title="Quick Actions" />
          <div className="space-y-3">
            <Link
              to="/1234/admin/users"
              className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition-all group border border-white/[0.05] hover:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-violet-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Manage Users</p>
                <p className="text-sm text-white/40">View & edit users</p>
              </div>
            </Link>

            <Link
              to="/1234/admin/statuses"
              className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition-all group border border-white/[0.05] hover:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Manage Statuses</p>
                <p className="text-sm text-white/40">View & delete statuses</p>
              </div>
            </Link>

            <Link
              to="/1234/admin/reports"
              className="flex items-center gap-3 p-4 bg-white/[0.03] rounded-xl hover:bg-white/[0.06] transition-all group border border-white/[0.05] hover:border-white/10"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-white">Moderation</p>
                <p className="text-sm text-white/40">Review reports</p>
              </div>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
};
