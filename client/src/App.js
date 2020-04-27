import React from 'react';

import AppWithRouter from './AppWithRouter';
import { Provider } from "react-redux";
import store from "./store";
const App = () =><Provider store={store}><AppWithRouter/> </Provider> ;

export default App;