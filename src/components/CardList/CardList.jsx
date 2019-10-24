import React, {Component} from 'react';
import Card from '../Card/Card.jsx';
import PropTypes from 'prop-types';

export default class CardList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: {}
    };
  }

  render() {
    const {cards} = this.props;

    const onCardMouseEnter = (activeCard) => {
      this.setState({activeCard});
    };
    const onCardMouseLeave = () => {
      this.setState({activeCard: {}});
    };

    return (
      <>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            onCardMouseEnter={onCardMouseEnter}
            onCardMouseLeave={onCardMouseLeave}
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
  ).isRequired
};
