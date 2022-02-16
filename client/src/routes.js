import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import {AuthPage} from './pages/AuthPage';
import {TablePage} from './pages/TablePage';
import {RegPage} from './pages/RegPage';

export const useRoutes = isAuthenticated => {
    
    if (isAuthenticated) {
        return (
            <Routes>
                <Route path="/table" caseSensitive={false} element={<TablePage/>} />
                <Route path="*" element={<Navigate to ="/table"/>} />
            </Routes>
        );
    }

    return (
        <Routes>
                <Route path="/auth" caseSensitive={false} element={<AuthPage/>} />
                <Route path="/register" caseSensitive={false} element={<RegPage/>} />
                <Route path="/login" caseSensitive={false} element={<AuthPage/>} />
                <Route path="*" element={<Navigate to ="/auth"/>} />
        </Routes>
    )
};