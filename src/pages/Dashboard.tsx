import { useEffect, useState } from "react";

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState(false);


  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="mt-1 text-gray-600 dark:text-gray-400">Overview of your leads and activities</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-md shadow p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Recent Activities</h2>
        </div>
        
          <div className="text-center py-8">
            <p className="text-gray-500 dark:text-gray-400">No activities found.</p>
          </div>
      </div>
    </div>
  );
};






//   return (
//     <div className="max-w-7xl mx-auto">
//       <div className="pb-5 border-b border-gray-200 dark:border-gray-700 sm:flex sm:items-center sm:justify-between">
//         <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
//         <div className="mt-3 sm:mt-0 sm:ml-4">
//           <Link
//             to="/leads/new"
//             className="inline-flex items-center px-4 py-2 rounded-sm shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
//           >
//             Add Lead
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

export default Dashboard;
