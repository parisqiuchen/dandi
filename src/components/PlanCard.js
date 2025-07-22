export default function PlanCard({ apiKeys }) {
  return (
    <div className="bg-white/20 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 mb-6 sm:mb-8">
      <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 sm:gap-0">
          <div className="flex-1">
            <div className="text-xs sm:text-sm font-medium text-white/80 uppercase tracking-wide mb-2">CURRENT PLAN</div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">Researcher</h1>
            
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
          
          <button className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl hover:bg-white/30 transition-all duration-200 font-medium text-sm sm:text-base w-full sm:w-auto">
            📊 Manage Plan
          </button>
        </div>
      </div>
    </div>
  );
} 