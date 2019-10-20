import React from 'react';
import PropTypes from 'prop-types';

import { deadlineValidation } from '../utils/helper.js';

class Dialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputTitle: this.props.item ? this.props.item.title : "",
      inputDescription: this.props.item ? this.props.item.description : "",
      inputPriority: this.props.item ? this.props.item.priority : "",
      inputDeadline: this.props.item ? this.props.item.deadline : "",
    };
  }

  onTitleChange = (event) => { this.setState({ inputTitle: event.target.value, }); }
  onDescriptionChange = (event) => { this.setState({ inputDescription: event.target.value, }); }
  onPriorityChange = (event) => { this.setState({ inputPriority: event.target.value, }); }
  onDeadlineChange = (event) => { this.setState({ inputDeadline: event.target.value, }); }

  onSubmit = (event) => {
    event.preventDefault();
    let resultingItem = {
      id: this.props.item ? this.props.item.id : -1,
      title: this.state.inputTitle,
      description: this.state.inputDescription,
      priority: this.state.inputPriority,
      deadline: deadlineValidation(this.state.inputDeadline),
      isDone: false,
    }
    this.props.parent(resultingItem);
  }

  render() {
    const { item, close, parent } = this.props;
    const { inputTitle, inputDescription, inputPriority, inputDeadline } = this.state;

    return (
      <section className="modal-window">
        <div className="modal-window-item">
          <section className="header">
            <div className="modal-title">{item ? `Edit item ${item.id}` : `Add new item`}</div>
            <div className="modal-close-icon" onClick={close}>
              <div className="modal-close-icon-inner"></div>
            </div>
          </section>

          <section className="content">
            <form onSubmit={this.onSubmit}>
              <section className="form-elements-block">
                <input onChange={this.onTitleChange} required type="text" name="title"
                       placeholder="Title *" value={inputTitle}
                       pattern="(?=.*[a-z])(?=.*[A-Z]).{2,20}" className="input" />
                <input onChange={this.onDescriptionChange} type="text" name="description"
                       placeholder="Description" value={inputDescription} className="input" />

                <select onChange={this.onPriorityChange} required name="priority"
                        value={inputPriority} className="select" >
                  <option className="option" value="">Priority *</option>
                  <option className="option" value="low" className="low">low</option>
                  <option className="option" value="middle" className="middle">middle</option>
                  <option className="option" value="high" className="high">high</option>
                </select>

                <input onChange={this.onDeadlineChange} type="date" name="deadline"
                       placeholder=" " value={inputDeadline} className="input" />

                <input type="file" name="picture" placeholder=" " value="" className="" />
              </section>

              <section className="buttons">
                <div className="buttons-item">
                  <input className="input negative" type="button"
                         value="Cancel" onClick={close} />
                  <input className="input positive" type="submit"
                         value={item ? `Edit item` : `Add item`} />
                </div>
              </section>
            </form>
          </section>
        </div>
      </section>
    );
  }
}

Dialog.propTypes = {
  close: PropTypes.func,
  parent: PropTypes.func,
  item: PropTypes.object,
};

Dialog.defaultProps = {

};

export default Dialog;
