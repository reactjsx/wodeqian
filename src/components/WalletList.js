import React, { Component } from 'react';
import { Route, NavLink, Redirect } from 'react-router-dom';
import { Button, Segment, Header, Loader } from 'semantic-ui-react';
import { getTransactions, createTransaction, updateTransaction, createWallet, isSignedIn, getCurrentDate, deleteTransaction } from '../utils/helper';
import AddTransactionPanel from './AddTransactionPanel';
import Wallet from './Wallet';
import AddWalletForm from './AddWalletForm';
import currencies from '../common/currencies';

class WalletList extends Component {
  state = {
    redirectSignIn: false,
    wallets: [],
    nickname: ''
  }
  
  componentWillMount() {
    if (!localStorage.getItem('wodeqian-token')) {
      this.setState({ redirectSignIn: true });
    }
  }
  
  componentDidMount() {
    isSignedIn().then(res => {
      if (res.error) {
        localStorage.removeItem('wodeqian-token');
        if (!this.state.redirectSignIn) {
          this.setState({ redirectSignIn: true });
        }
        throw new Error('Token is not valid');
      } else {
        this.setState({ nickname: res.nickname });
      }
    }).then(() => getTransactions(wallets => {
      this.setState({ wallets });
    }))
      .catch(e => console.error(e));
  }
  
  handleAddWalletClick = (wallet) => {
    createWallet(wallet)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ redirectSignIn: true });
          throw new Error('Response Error');
        }
      })
      .then(() => getTransactions(wallets => {
        this.setState({ wallets });
      }))
      .then(() => this.forceUpdate())
      .catch((e) => console.error(e));
  }

  handleAddTransactionClick = (transaction) => {
    createTransaction(transaction)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ redirectSignIn: true });
          throw new Error('Response Error');
        }
      })
      .then(() => getTransactions(wallets => {
        this.setState({ wallets });
      }))
      .then(() => this.forceUpdate())
      .catch((e) => console.error(e));
  }

  handleUpdateTransactionClick = (transaction) => {
    updateTransaction(transaction)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ redirectSignIn: true });
          throw new Error('Response Error');
        }
      })
      .then(() => getTransactions(wallets => {
        this.setState({ wallets });
      }))
      .then(() => this.forceUpdate())
      .catch((e) => console.error(e));
  }
  
  handleTrashClick = (transaction) => {
    deleteTransaction(transaction)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          this.setState({ redirectSignIn: true });
          throw new Error('Response Error');
        }
      })
      .then(() => getTransactions(wallets => {
        this.setState({ wallets });
      }))
      .then(() => this.forceUpdate());
  }
  
  handleSignOutClick = () => {
    localStorage.removeItem('wodeqian-token');
    if (!this.state.redirectSignIn) {
      this.setState({ redirectSignIn: true });
    }
    this.forceUpdate();
  }
  
  render() {
    if (this.state.redirectSignIn) {
      return (
        <Redirect
          to='/signin'
        />
      );
    }
    const currentDate = getCurrentDate();
    if (this.state.wallets.length > 0) {
      const walletBar = this.state.wallets.map(wallet => (
        <NavLink
          className='item'
          key={wallet._id}
          to={`/wallets/${wallet._id}`}
        >
          <i className={`${wallet.currency} flag`} />{wallet.name}
        </NavLink>
      ));
      return (
        <div>
          <div className='ui tabular top attached menu'>
            <div className='header item'>
              {this.state.nickname}
            </div>
            {walletBar}
            <div className='item'>
              <AddWalletForm
                onAddWalletClick={this.handleAddWalletClick}
              />
            </div>
            <div className='item'>
              <Button
                circular
                color='red'
                onClick={this.handleSignOutClick}
              >
                SignOut
              </Button>
            </div>
          </div>
          
          <Route
            path='/wallets/:walletId/:month'
            render={({ match }) => {
              const wallet = this.state.wallets.find(w => (
                w._id === match.params.walletId
              ));
              const costs = wallet.transactions.map(transaction => {
                if (transaction.type === 'Income') {
                  return 0 - transaction.cost;
                }
                return transaction.cost;
              });
              const totalConsumption = costs.reduce((a, b) => a + b, 0);
              const walletNames = this.state.wallets.map(w => (
                {
                  text: w.name,
                  value: w.name
                }
              ))
              return (
              <Segment raised>
                <AddTransactionPanel
                  walletNames={walletNames}
                  walletId={wallet._id}
                  walletName={wallet.name}
                  onAddTransactionClick={this.handleAddTransactionClick}
                  currentDate={currentDate}
                />
                <Header textAlign='center' color='green' >
                  Current Balance: {wallet.initBalance - totalConsumption}
                </Header>
                <Wallet
                  transactions={wallet.transactions.filter(transaction => (
                    transaction.month === Number(match.params.month)
                  ))}
                  currency={currencies.filter(c => c.value === wallet.currency)[0].code}
                  walletName={wallet.name}
                  walletNames={walletNames}
                  walletId={wallet._id}
                  onTrashClick={this.handleTrashClick}
                  onUpdateTransactionClick={this.handleUpdateTransactionClick}
                />
                </Segment>
              );
            }}
          />
          <Route exact
            path='/wallets/:walletId/'
            render={({ match }) => (
              <Redirect
                to={`/wallets/${match.params.walletId}/${currentDate.month}`}
              />
            )}
          />
        </div>
      );
    }
    return (
      <div>
        <div className='ui tabular top attached menu'>
          <div className='item'>
            <AddWalletForm
              onAddWalletClick={this.handleAddWalletClick}
            />
          </div>
          <div className='item'>
            <Button
              circular
              color='red'
              onClick={this.handleSignOutClick}
            >
              SignOut
            </Button>
          </div>
        </div>
        <Loader active />
      </div>
    );
  }
}

export default WalletList;