'use strict';

var React = require('react');
var { render } = require('react-dom');
var clickDrag = require('../../lib/clickdrag').default;

class ExampleComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      lastPositionX: 0,
      lastPositionY: 0,
      currentX: 0,
      currentY: 0,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.dataDrag.isMoving) {
      console.log(nextProps.dataDrag.moveDeltaX);
      this.setState({
        currentX: Math.min(
          Math.max(this.state.lastPositionX + nextProps.dataDrag.moveDeltaX, 0),
          100
        ),
        currentY: 0,
      });
    } else {
      this.setState({
        lastPositionX: this.state.currentX,
        lastPositionY: this.state.currentY,
      });
    }
  }

  render() {
    var translation = 'translate(' + this.state.currentX + 'px, ' + this.state.currentY + 'px)';

    return React.createElement(
      'div',
      {
        style: {
          width: '100px',
          height: '100px',
          backgroundColor: '#ddd',
        },
      },
      React.createElement('div', {
        style: { width: '10px', height: '100px', backgroundColor: 'red', transform: translation },
      })
    );
  }
}

var ClickDragExample = clickDrag(ExampleComponent, { touch: true });

render(React.createElement(ClickDragExample), document.getElementById('App'));
