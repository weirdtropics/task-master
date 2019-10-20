import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Draggable} from 'react-beautiful-dnd';

const Container = styled.div`
  background-color: white;
`;

class ItemCard extends React.Component {
  constructor(props) { super(props); }

  onDeleteItemClicked = () => { this.props.deleteItem(this.props.item.id); }
  onMarkItemClicked = () => { this.props.markItemAsTodoDone(this.props.item.id); }
  onEditItemClicked = () => { this.props.editItem(this.props.item); }

  render() {
    const { title, description, priority, deadline, isDone } = this.props.item;

    return (
      <Draggable draggableId={this.props.item.id} index={this.props.index}>
      {(provided) => (
      <Container className="item"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        <p className={`title ${isDone ? `line-through` : ``}`}>{title}</p>
        <p className={`text ${isDone ? `line-through` : ``}`}>{description ? description : `-`}</p>
        <p className={`text ${isDone ? `line-through` : ``}`}>
          Priority:
          <span className={`priority-${priority}`}>{` ${priority}`}</span>
        </p>
        <p className={`text ${isDone ? `line-through` : ``}`}>{deadline ? deadline : `-`}</p>
        <section className="buttons">
          <input type="button" className="input negative" value="Delete"
                 onClick={this.onDeleteItemClicked} />
          <input type="button" className="input positive" value="Edit"
                 onClick={this.onEditItemClicked} />
          <input type="button" className="input positive" value={isDone ? `Mark as ToDo` : `Mark as Done`}
                 onClick={this.onMarkItemClicked} />
        </section>
      </Container>
      )}
      </Draggable>
    );
  }
}

ItemCard.propTypes = {
  deleteItem: PropTypes.func,
  editItem: PropTypes.func,
  markAsTodoDone: PropTypes.func,
  item: PropTypes.object,
};

ItemCard.defaultProps = {

};

export default ItemCard;
