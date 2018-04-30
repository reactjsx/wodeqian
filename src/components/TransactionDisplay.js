import React from 'react';
import { Table, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';

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
        <Button
          basic
          icon='pencil'
          color='green'
          onClick={props.onUpdateClick}
        />
      </Table.Cell>
    </Table.Row>
  );
};

TransactionDisplay.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  currency: PropTypes.string.isRequired,
  cost: PropTypes.number.isRequired,
  year: PropTypes.string.isRequired,
  month: PropTypes.string.isRequired,
  day: PropTypes.string.isRequired,
  onTrashClick: PropTypes.func.isRequired,
  onUpdateClick: PropTypes.func.isRequired
}

export default TransactionDisplay;