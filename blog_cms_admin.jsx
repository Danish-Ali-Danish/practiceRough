import React, { useState } from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash, Search, Users, BarChart2, Settings, FileText } from "lucide-react";
import { motion } from "framer-motion";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

// Dummy Data
const trafficData = [
  { name: "Mon", views: 400 },
  { name: "Tue", views: 300 },
  { name: "Wed", views: 500 },
  { name: "Thu", views: 200 },
  { name: "Fri", views: 600 },
  { name: "Sat", views: 700 },
  { name: "Sun", views: 650 },
];

const categoryData = [
  { name: "Tech", value: 400 },
  { name: "Lifestyle", value: 300 },
  { name: "Travel", value: 200 },
  { name: "Food", value: 100 },
];

const COLORS = ["#6366f1", "#22c55e", "#facc15", "#ef4444"];

export default function AdminPanel() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 flex flex-col gap-6">
        <h1 className="text-2xl font-bold">Blog CMS</h1>
        <nav className="flex flex-col gap-3">
          <Button variant="ghost" className="justify-start" onClick={() => setActivePage("dashboard")}><BarChart2 size={18} /> Dashboard</Button>
          <Button variant="ghost" className="justify-start" onClick={() => setActivePage("posts")}><FileText size={18} /> Posts</Button>
          <Button variant="ghost" className="justify-start" onClick={() => setActivePage("categories")}><FileText size={18} /> Categories</Button>
          <Button variant="ghost" className="justify-start" onClick={() => setActivePage("users")}><Users size={18} /> Users</Button>
          <Button variant="ghost" className="justify-start" onClick={() => setActivePage("settings")}><Settings size={18} /> Settings</Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 space-y-8">
        {activePage === "dashboard" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold">Admin Dashboard</h2>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
                <p className="text-3xl font-bold">128</p>
              </Card>
              <Card className="rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Total Users</h3>
                <p className="text-3xl font-bold">56</p>
              </Card>
              <Card className="rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-2">Comments</h3>
                <p className="text-3xl font-bold">892</p>
              </Card>
            </div>

            {/* Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Website Traffic</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={trafficData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="views" stroke="#6366f1" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
              <Card className="rounded-2xl shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Posts by Category</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={categoryData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </Card>
            </div>
          </>
        )}

        {activePage === "posts" && (
          <>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-semibold">Manage Posts</h2>
              <Button className="flex items-center gap-2"><Plus size={18} /> New Post</Button>
            </div>
            <Card className="rounded-2xl shadow-md">
              <CardHeader className="font-semibold text-lg border-b p-4">All Posts</CardHeader>
              <CardContent className="p-4 overflow-x-auto">
                <div className="mb-4 relative w-full max-w-md">
                  <input type="text" placeholder="Search posts..." className="w-full rounded-xl border py-2 pl-10 pr-4" />
                  <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
                </div>
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-slate-200 text-left">
                      <th className="p-3">Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Author</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3].map((post) => (
                      <tr key={post} className="border-b hover:bg-slate-50">
                        <td className="p-3">Sample Blog Post {post}</td>
                        <td className="p-3">Tech</td>
                        <td className="p-3">Admin</td>
                        <td className="p-3">Aug 25, 2025</td>
                        <td className="p-3 text-right flex gap-2 justify-end">
                          <Button size="sm" variant="outline"><Edit size={16} /></Button>
                          <Button size="sm" variant="destructive"><Trash size={16} /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </>
        )}

        {activePage === "categories" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">Manage Categories</h2>
            <Card className="rounded-2xl shadow-md p-6">
              <p>Here you can add, edit, or delete categories for your blog.</p>
            </Card>
          </>
        )}

        {activePage === "users" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">User Management</h2>
            <Card className="rounded-2xl shadow-md p-6">
              <p>Here you can manage users, roles, and permissions.</p>
            </Card>
          </>
        )}

        {activePage === "settings" && (
          <>
            <h2 className="text-3xl font-semibold mb-6">Settings</h2>
            <Card className="rounded-2xl shadow-md p-6">
              <p>Here you can configure site-wide settings like logo, theme, and SEO.</p>
            </Card>
          </>
        )}
      </main>
    </div>
  );
}
