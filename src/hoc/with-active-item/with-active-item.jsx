import React, {PureComponent} from 'react';

const withActiveItem = (Component) => {
  class WithActiveItem extends PureComponent {
    constructor(props) {
      super(props);

      this.state = {
        activeCard: null
      };

      this.cardMouseEnterHandler = this.cardMouseEnterHandler.bind(this);
      this.cardMouseLeaveHandler = this.cardMouseLeaveHandler.bind(this);
    }

    cardMouseEnterHandler(card) {
      this.setState({activeCard: card});
    }

    cardMouseLeaveHandler() {
      this.setState({activeCard: null});
    }

    render() {
      return (
        <Component
          {...this.props}
          cardMouseEnterHandler={this.cardMouseEnterHandler}
          cardMouseLeaveHandler={this.cardMouseLeaveHandler}
        />
      );
    }
  }

  return WithActiveItem;
};

export default withActiveItem;
