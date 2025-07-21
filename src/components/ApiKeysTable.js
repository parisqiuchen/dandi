export default function ApiKeysTable({ 
  apiKeys, 
  visibleKeys, 
  toggleKeyVisibility, 
  copyToClipboard, 
  handleEdit, 
  handleDelete, 
  setShowForm, 
  setEditingKey, 
  setFormData 
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl">
      <div className="px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">API Keys</h2>
            <p className="text-gray-600">The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.</p>
          </div>
          <button
            onClick={() => {
              setShowForm(true);
              setEditingKey(null);
              setFormData({ name: '', type: 'development', limitMonthlyUsage: false, monthlyLimit: 1000 });
            }}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-200 font-medium shadow-lg"
          >
            + Add New Key
          </button>
        </div>

        {/* API Keys Table Header */}
        <div className="grid grid-cols-5 gap-6 px-4 py-3 bg-gray-50 rounded-xl text-sm font-medium text-gray-600 uppercase tracking-wide mb-4">
          <div>NAME</div>
          <div>TYPE</div>
          <div>USAGE</div>
          <div className="col-span-1">KEY</div>
          <div>OPTIONS</div>
        </div>

        {/* API Keys List */}
        <div className="space-y-3">
          {apiKeys.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔑</span>
              </div>
              <div className="text-gray-500 text-lg">No API keys found</div>
              <div className="text-gray-400 text-sm mt-1">Create your first API key to get started</div>
            </div>
          ) : (
            apiKeys.map((key) => (
              <div key={key.id} className="grid grid-cols-5 gap-6 items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                <div className="font-medium text-gray-900">{key.name}</div>
                <div className="text-sm">
                  <span className="bg-green-100 text-green-800 px-2 py-1 rounded-lg text-xs font-medium">dev</span>
                </div>
                <div className="text-sm text-gray-600">0</div>
                <div className="font-mono text-sm">
                  <div className="bg-white px-3 py-2 rounded-lg border inline-block">
                    {visibleKeys.has(key.id) 
                      ? key.key 
                      : `${key.key.substring(0, 8)}***************************`
                    }
                  </div>
                </div>
                <div className="flex space-x-2 justify-end">
                  <button 
                    onClick={() => toggleKeyVisibility(key.id)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title={visibleKeys.has(key.id) ? 'Hide API key' : 'Show API key'}
                  >
                    {visibleKeys.has(key.id) ? '🙈' : '👁️'}
                  </button>
                  <button 
                    onClick={() => copyToClipboard(key.id, key.key)}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy API key"
                  >
                    📋
                  </button>
                  <button
                    onClick={() => handleEdit(key)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(key.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
} 