import React, {Component} from 'react';
import Card from '../Card/Card.jsx';
import PropTypes from 'prop-types';

export default class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {}
    };

    this.cardMouseEnterHandler = this.cardMouseEnterHandler.bind(this);
    this.cardMouseLeaveHandler = this.cardMouseLeaveHandler.bind(this);
  }

  cardMouseEnterHandler(activeCard) {
    this.setState({activeCard});
  }
  cardMouseLeaveHandler() {
    this.setState({activeCard: {}});
  }

  render() {
    const {cards, onCardHeaderClick} = this.props;
    return (
      <>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            cardMouseEnterHandler={this.cardMouseEnterHandler}
            cardMouseLeaveHandler={this.cardMouseLeaveHandler}
            onCardHeaderClick={onCardHeaderClick}
          />
        ))}
      </>
    );
  }
}

CardList.propTypes = {
  cards: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        src: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        rating: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        type: PropTypes.string.isRequired
      }).isRequired
  ).isRequired,
  onCardHeaderClick: PropTypes.func.isRequired
};
