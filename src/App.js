import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';
import WalletList from './components/WalletList';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';

const App = () => (
  <div className='ui container'>
    <Header size='huge' textAlign='center' style={{marginTop: '30px'}}>
      <Icon name='money' />Wo De Qian
    </Header>
    <Route path='/signin' component={ SignIn } />
    <Route path='/signup' component={ SignUp } />
    <Route path='/wallets' component={ WalletList } />
    <Route exact path='/' render={() => (
      <Redirect
        to='/wallets'
      />
    )}
    />
  </div>
)

export default App;
