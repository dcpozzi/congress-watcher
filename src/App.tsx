import React from 'react';
import MembersListView from './screens/MembersListScreen';
import store from './redux/store';
import {Provider} from 'react-redux';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <MembersListView />
    </Provider>
  );
}
export default App;
