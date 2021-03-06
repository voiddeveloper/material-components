import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import Waves from './helpers/waves';

export default class Button extends Component {
  static displayName = 'Button';

  static contextTypes = {
    componentStyle: PropTypes.object
  };

  static propTypes = {
    children: PropTypes.node,
    className: PropTypes.string,
    flat: PropTypes.bool,
    onClick: PropTypes.func,
    primary: PropTypes.bool,
    style: PropTypes.object,
    type: PropTypes.string
  };

  static defaultProps = {
    className: '',
    flat: false,
    primary: false,
    style: {},
    type: 'button'
  };

  componentDidMount() {
    Waves.attach(ReactDOM.findDOMNode(this));
  }

  render() {
    const { secondaryColor, secondaryFontColor } = this.context.componentStyle;
    const { children, className, flat, onClick, primary, style: styleOverrides, type } = this.props;

    const disabled = !onClick && type !== 'submit';

    let style = {
      zIndex: 'inherit',
      fontSize: '16px',
      lineHeight: '36px',
      padding: `0 24px`,
      margin: `8px`,
      textAlign: 'center',
      minWidth: '64px',
      textTransform: 'uppercase',
      cursor: !disabled ? 'pointer' : 'inherit'
    };

    if (disabled) {
      if (flat) {
        style.color = 'rgba(0, 0, 0, 0.26)';
      } else {
        style.color = 'rgba(0, 0, 0, 0.26)';
        style.backgroundColor = 'rgba(0, 0, 0, 0.12)';
      }
    } else if (primary) {
      if (flat) {
        style.color = secondaryColor;
      } else {
        style.color = secondaryFontColor;
        style.backgroundColor = secondaryColor;
      }
    }

    return (
      <button
        type={type}
        onClick={onClick}
        style={Object.assign(style, styleOverrides)}
        className={classNames('waves-button', className, {
          'waves-float': !flat && onClick,
          'waves-light': primary && !flat
        })}
        disabled={disabled}>
        {children}
      </button>
    );
  }
}
