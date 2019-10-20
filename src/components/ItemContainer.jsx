import React from 'react';
import PropTypes from 'prop-types';

import { Droppable } from 'react-beautiful-dnd';

import ItemCard from './ItemCard.jsx';

class ItemContainer extends React.PureComponent {
  constructor(props) { super(props); }

  render() {
    let data = null;
    if (this.props.items === undefined) {
      data = <p>The list is undefined</p>;
    } else if (this.props.items === null || this.props.items.length === 0) {
      data = <p>The list is empty</p>;
    } else {
      data = this.props.items.map((item, index) =>
        <ItemCard key={item.id.toString()} item={item} deleteItem={this.props.deleteItem}
          editItem={this.props.editItem} markItemAsTodoDone={this.props.markItemAsTodoDone} index={index} style={{margin: '10px'}} />
      );
    }

    return (
        <section  className="to-do-items-container">
          <Droppable droppableId="search-results" isDropDisabled>
            {provided => (
              <section className="grid"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {data}
                {provided.placeholder}
              </section>
            )}
          </Droppable>
        </section>
    );
  }
}

export default ItemContainer;
