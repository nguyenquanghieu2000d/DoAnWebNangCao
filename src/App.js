import React from 'react';
import Main from "./components/Main";
import {useRoutes} from "react-router-dom";
import routes from './routes';
function App() {
    const routing = useRoutes(routes);
    return (
        <div>
            {routing}
        </div>

    );
}

export default App;
