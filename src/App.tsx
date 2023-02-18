import React from 'react';
import CongressmanList from './screens/CongressmanListScreen';
import store from './redux/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <CongressmanList />
    </Provider>
  );
}
export default App;
