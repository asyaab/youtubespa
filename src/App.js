import React from 'react';
import { LoginForm } from './LoginForm/LoginForm';
import { RegisterForm } from './RegisterForm/RegisterForm';
import { SearchPage } from './SearchPage/SearchPage';
import { LikesPage } from './LikesPage/LikesPage';
import { LayoutPage } from './LayoutPage/LayoutPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { RequireAuth } from './hoc/RequireAuth';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LayoutPage />}>
          <Route
            index
            element={
              <RequireAuth>
                <SearchPage />
              </RequireAuth>
            }
          />
          <Route
            path="likes"
            element={
              <RequireAuth>
                <LikesPage />
              </RequireAuth>
            }
          />
        </Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<RegisterForm />} />
      </Routes>
    </div>
  );
}

export default App;
