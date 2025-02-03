import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const AdminPage = () => {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          <h1 className="text-xl font-bold">Admin Panel</h1>
        </div>
        <ul>
          <li className="p-4 hover:bg-gray-700">
            <a href="#dashboard">Dashboard</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="#users">Users</a>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6 bg-gray-100">
        <Card>
          <CardHeader>Dashboard</CardHeader>
          <CardContent>
            <p>Welcome to the admin panel. Use the navigation to manage your application.</p>
            <Button className="mt-4">Get Started</Button>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default AdminPage;