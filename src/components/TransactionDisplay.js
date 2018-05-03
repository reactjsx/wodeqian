import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import UpdateTransactionForm from './UpdateTransactionForm';

const TransactionDisplay = (props) => {
  const color = props.type === 'Income' ? 'steelblue' : 'red';
  return (
    <Table.Row>
      <Table.Cell>{props.name}</Table.Cell>
      <Table.Cell>{props.category}</Table.Cell>
      <Table.Cell style={{'color': color}}>{`${props.currency} ${props.cost}`}</Table.Cell>
      <Table.Cell>{`${props.year}/${props.month}/${props.day}`}</Table.Cell>
      <Table.Cell>
        <Button
          basic
          icon='trash'
          color='red'
          onClick={props.onTrashClick}
        />
        <UpdateTransactionForm
          id={props.id}
          name={props.name}
          type={props.type}
          category={props.category}
          cost={props.cost}
          year={props.year}
          month={props.month}
          day={props.day}
          onUpdateTransactionClick={props.onUpdateTransactionClick}
        />
      </Table.Cell>
    </Table.Row>
  );
};

TransactionDisplay.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  year: PropTypes.number.isRequired,
  month: PropTypes.number.isRequired,
  day: PropTypes.number.isRequired,
  onTrashClick: PropTypes.func.isRequired,
  onUpdateTransactionClick: PropTypes.func.isRequired
}

export default TransactionDisplay;