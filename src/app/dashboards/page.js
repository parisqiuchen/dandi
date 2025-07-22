'use client';

import { useState, useEffect } from 'react';
import Sidebar from '../../components/Sidebar';
import Toast from '../../components/Toast';
import Header from '../../components/Header';
import PlanCard from '../../components/PlanCard';
import ApiKeyModal from '../../components/ApiKeyModal';
import ApiKeysTable from '../../components/ApiKeysTable';

export default function Dashboard() {
  const [mounted, setMounted] = useState(false);
  const [apiKeys, setApiKeys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingKey, setEditingKey] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: 'development',
    limitMonthlyUsage: false,
    monthlyLimit: 1000
  });
  const [visibleKeys, setVisibleKeys] = useState(new Set());
  const [toast, setToast] = useState({
    show: false,
    type: 'success',
    message: ''
  });

  // Fetch API keys
  const fetchApiKeys = async () => {
    try {
      const response = await fetch('/api/api-keys');
      const data = await response.json();
      setApiKeys(data);
    } catch (error) {
      console.error('Error fetching API keys:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setMounted(true);
    fetchApiKeys();
  }, []);

  // Create or update API key
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = editingKey ? 'PUT' : 'POST';
    const url = editingKey ? `/api/api-keys/${editingKey.id}` : '/api/api-keys';
    
    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        await fetchApiKeys();
        setShowForm(false);
        setEditingKey(null);
        setFormData({ name: '', type: 'development', limitMonthlyUsage: false, monthlyLimit: 1000 });
        showToast('success', editingKey ? 'API Key updated successfully' : 'API Key created successfully');
      }
    } catch (error) {
      console.error('Error saving API key:', error);
    }
  };

  // Delete API key
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this API key?')) return;
    
    try {
      const response = await fetch(`/api/api-keys/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        await fetchApiKeys();
        showToast('delete', 'API Key deleted successfully');
      }
    } catch (error) {
      console.error('Error deleting API key:', error);
    }
  };

  // Toggle API key visibility
  const toggleKeyVisibility = (keyId) => {
    const newVisibleKeys = new Set(visibleKeys);
    if (newVisibleKeys.has(keyId)) {
      newVisibleKeys.delete(keyId);
    } else {
      newVisibleKeys.add(keyId);
    }
    setVisibleKeys(newVisibleKeys);
  };

  // Show toast notification
  const showToast = (type, message) => {
    setToast({
      show: true,
      type,
      message
    });
    setTimeout(() => {
      setToast(prev => ({ ...prev, show: false }));
    }, 3000);
  };

  // Copy API key to clipboard
  const copyToClipboard = async (keyId, keyValue) => {
    try {
      await navigator.clipboard.writeText(keyValue);
      showToast('success', 'Copied API Key to clipboard');
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
      fallbackCopyTextToClipboard(keyValue);
    }
  };

  // Fallback copy method for older browsers
  const fallbackCopyTextToClipboard = (text) => {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.top = '0';
    textArea.style.left = '0';
    textArea.style.position = 'fixed';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      document.execCommand('copy');
      showToast('success', 'Copied API Key to clipboard');
    } catch (err) {
      console.error('Fallback: Could not copy text');
    }
    
    document.body.removeChild(textArea);
  };

  // Start editing
  const handleEdit = (key) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      type: key.type || 'development',
      limitMonthlyUsage: key.limitMonthlyUsage || false,
      monthlyLimit: key.monthlyLimit || 1000
    });
    setShowForm(true);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 flex items-center justify-center">
        <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-8 text-white">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <div className="text-lg font-medium">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Toast toast={toast} setToast={setToast} />

      {/* Main Layout */}
      <div className="min-h-screen flex bg-gray-50">
        <Sidebar />

        {/* Main Content */}
        <div className="flex-1 overflow-hidden lg:ml-0">
          <Header />

          {/* Content Area */}
          <div className="p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-purple-400 via-pink-400 to-blue-500 min-h-screen">
            <div className="max-w-7xl mx-auto">
              <PlanCard apiKeys={apiKeys} />
              <ApiKeysTable 
                apiKeys={apiKeys}
                visibleKeys={visibleKeys}
                toggleKeyVisibility={toggleKeyVisibility}
                copyToClipboard={copyToClipboard}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
                setShowForm={setShowForm}
                setEditingKey={setEditingKey}
                setFormData={setFormData}
              />
            </div>
          </div>
        </div>
      </div>

      <ApiKeyModal 
        showForm={showForm}
        setShowForm={setShowForm}
        editingKey={editingKey}
        setEditingKey={setEditingKey}
        formData={formData}
        setFormData={setFormData}
        handleSubmit={handleSubmit}
      />
    </>
  );
} 