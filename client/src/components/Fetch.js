import React, { Component } from 'react';

/* eslint-disable no-unused-vars */
class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: void 0, // eslint-disable-line no-void
      error: void 0, // eslint-disable-line no-void
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.url && this.props.url !== prevProps.url) {
      this.fetchData(this.props.url);
    }
  }

  async fetchData() {
    try {
      this.setState({ loading: true });
      const response = await this.props.action;
      const json = await response.json();
      this.setState({ data: json });
      this.setState({ loading: false });
    } catch (err) {
      this.setState({ error: err });
    }
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    if (this.state.error) return this.props.error(this.state.error);
    if (this.props.render(this.state.data)) return null;
    return null;
  }
}
