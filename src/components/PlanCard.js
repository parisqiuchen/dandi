export default function PlanCard({ apiKeys }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-8">
      <div className="px-8 py-8">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-sm font-medium text-white/80 uppercase tracking-wide mb-2">CURRENT PLAN</div>
            <h1 className="text-4xl font-bold text-white mb-4">Researcher</h1>
            
            {/* API Usage Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-white/90 font-medium">API Usage</span>
                <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                  <span className="text-xs text-white">?</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-white/80">Plan</span>
                  <span className="text-white font-medium">{apiKeys.length}/1,000 Credits</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2">
                  <div 
                    className="bg-white rounded-full h-2 transition-all duration-300" 
                    style={{ width: `${Math.min((apiKeys.length / 1000) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 pt-2">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                  <span className="text-white/90 font-medium">Pay as you go</span>
                </div>
                <div className="w-4 h-4 rounded-full bg-white/30 flex items-center justify-center">
                  <span className="text-xs text-white">?</span>
                </div>
              </div>
            </div>
          </div>
          
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/30 transition-all duration-200 font-medium">
            📊 Manage Plan
          </button>
        </div>
      </div>
    </div>
  );
} 