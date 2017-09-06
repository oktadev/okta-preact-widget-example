import { Component } from 'preact';

export default class Redirect extends Component {
  componentWillMount() {
    location = this.props.to.pathname;
  }

  render() {
    return null;
  }
}