export default function ApiKeyModal({ 
  showForm, 
  setShowForm, 
  editingKey, 
  setEditingKey, 
  formData, 
  setFormData, 
  handleSubmit 
}) {
  if (!showForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {editingKey ? 'Edit API key' : 'Create a new API key'}
        </h2>
        <p className="text-gray-600 mb-8">
          {editingKey ? 'Update the name and settings for this API key.' : 'Enter a name and limit for the new API key.'}
        </p>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Key Name */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Key Name — <span className="text-gray-500 font-normal">A unique name to identify this key</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
              placeholder="Key Name"
              required
            />
          </div>

          {/* Key Type */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-4">
              Key Type — <span className="text-gray-500 font-normal">Choose the environment for this key</span>
            </label>
            
            <div className="space-y-3">
              {/* Development Option */}
              <div 
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.type === 'development' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({ ...formData, type: 'development' })}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.type === 'development' 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.type === 'development' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">⚡</span>
                    <div>
                      <div className="font-semibold text-gray-900">Development</div>
                      <div className="text-sm text-gray-500">Rate limited to 100 requests/minute</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Production Option */}
              <div 
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all ${
                  formData.type === 'production' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setFormData({ ...formData, type: 'production' })}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    formData.type === 'production' 
                      ? 'border-blue-500 bg-blue-500' 
                      : 'border-gray-300'
                  }`}>
                    {formData.type === 'production' && (
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">🚀</span>
                    <div>
                      <div className="font-semibold text-gray-900">Production</div>
                      <div className="text-sm text-gray-500">Rate limited to 1,000 requests/minute</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Monthly Limit */}
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <input
                type="checkbox"
                id="limitUsage"
                checked={formData.limitMonthlyUsage}
                onChange={(e) => setFormData({ ...formData, limitMonthlyUsage: e.target.checked })}
                className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="limitUsage" className="text-sm font-medium text-gray-900">
                Limit monthly usage*
              </label>
            </div>
            
            {formData.limitMonthlyUsage && (
              <input
                type="number"
                value={formData.monthlyLimit}
                onChange={(e) => setFormData({ ...formData, monthlyLimit: parseInt(e.target.value) || 1000 })}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50"
                placeholder="1000"
              />
            )}
            
            <p className="text-xs text-gray-500 mt-2">
              * If the combined usage of all your keys exceeds your plan&apos;s limit, all requests will be rejected.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <button
              type="submit"
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700 transition-all duration-200 font-medium"
            >
              {editingKey ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingKey(null);
                setFormData({ name: '', type: 'development', limitMonthlyUsage: false, monthlyLimit: 1000 });
              }}
              className="flex-1 bg-gray-100 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-200 transition-all duration-200 font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 