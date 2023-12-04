// import React from 'react';
// import { useQuery, QueryClient, QueryClientProvider } from '@tanstack/react-query';
//
// interface Food {
//     id: number;
//     title: string;
// }
//
// // Create a query client instance
// const queryClient = new QueryClient();
//
// // Define a function to fetch data
// const fetchData = async () => {
//   // Simulated asynchronous operation (e.g., fetching data from an API)
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   const data: Food[] = [
//     { id: 1, title: 'tteokbokki' },
//     { id: 2, title: 'laksa' },
//   ];
//
//   // Store the data in the query client
//   queryClient.setQueryData(['food'], data);
// };
//
// const Food: React.FC = () => {
//   // useQuery hook to fetch and manage data
//   useQuery(['food'], fetchData, {
//     // Automatically refetch the data every 5 seconds
//     refetchInterval: 5000,
//   });
//
//   const food = queryClient.getQueryData(['food']) as Food[];
//   console.log('Food Data:', food);
//
//   return (
//     <div>
//       <h1>Food</h1>
//       <ul>
//         {food?.map((food) => (
//           <li key={food.id}>{food.title}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };
//
// const App: React.FC = () => {
//   return (
//     // Wrap the component tree with QueryClientProvider to provide the query client context
//     <QueryClientProvider client={queryClient}>
//       <Food />
//     </QueryClientProvider>
//   );
// };
//
// //export default App;
// // pages/api/react_query_test.js
//
// export default async function handler(req, res) {
//     try {
//       // Simulated asynchronous operation (e.g., fetching data from a database)
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       const data: Food[] = [
//         { id: 1, title: 'tteokbokki' },
//         { id: 2, title: 'laksa' },
//       ];
//
//       // Send a JSON response with the fetched data
//       res.status(200).json(data);
//     } catch (error) {
//       // Handle errors and send an appropriate error response
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   }
//