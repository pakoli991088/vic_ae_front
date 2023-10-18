import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {App} from './App';
import {BrowserRouter} from "react-router-dom";
import { StyledEngineProvider } from '@mui/material/styles';

const container = document.getElementById('root');
// const root = ReactDOM.createRoot(
//     document.getElementById('root') as HTMLElement
// );
const root = createRoot(container!)
root.render(
        <BrowserRouter>
            <StyledEngineProvider injectFirst>
            <App/>
            </StyledEngineProvider>
        </BrowserRouter>
);

