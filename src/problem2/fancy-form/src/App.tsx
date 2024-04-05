import React from 'react';
import {appRouter} from "./routes/AppRoute";
import {RouterProvider} from "react-router-dom";
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'

// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    <div className="main-app">
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={appRouter} />
      </QueryClientProvider>
    </div>
  );
}

export default App;
