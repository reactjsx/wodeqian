import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import TransactionDisplay from './TransactionDisplay';

class Wallet extends Component {
  handleTrashClick = (id) => {
    const transaction = {
      walletId: this.props.walletId,
      wallet: this.props.walletName,
      id
    };
    this.props.onTrashClick(transaction);
  }
  render() {
    const transactions = this.props.transactions.sort((a, b) => (a.day - b.day)).map(transaction => (
      <TransactionDisplay
        key={transaction._id}
        name={transaction.name}
        type={transaction.type}
        category={transaction.category}
        year={transaction.year}
        month={transaction.month}
        day={transaction.day}
        cost={transaction.cost}
        currency={this.props.currency}
        onTrashClick={() => this.handleTrashClick(transaction._id)}
      />
    ));
  
    return (
      <Table striped>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Category</Table.HeaderCell>
            <Table.HeaderCell>Cost</Table.HeaderCell>
            <Table.HeaderCell>Date</Table.HeaderCell>
            <Table.HeaderCell />
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {transactions}
        </Table.Body>
      </Table>
    );
  }
}

Wallet.propTypes = {
  walletId: PropTypes.string.isRequired,
  walletName: PropTypes.string.isRequired,
  onTrashClick: PropTypes.func.isRequired,
  transactions: PropTypes.object.isRequired,
  currency: PropTypes.string.isRequired
}

export default Wallet;