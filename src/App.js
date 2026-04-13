import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'
import Auth from './components/Auth.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import StudentList from './pages/StudentList.jsx';
import StudentDetail from './pages/StudentDetail.jsx';

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
      <Auth>
        <Layout>
          <QueryClientProvider client={queryClient}>
            <Routes>
              <Route path="/" element={<div className='p-2'>Welcome!</div>}/>
              <Route path="/students" element={<StudentList />} />
              <Route path="/students/:id" element={<StudentDetail />} />
            </Routes>
          </QueryClientProvider>
        </Layout>
      </Auth>
    </BrowserRouter>
  );
}

export default App;