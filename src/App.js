import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout.jsx'

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <div>
          goodbye
        </div>
      </Layout>
    </BrowserRouter>
  );
}

export default App;