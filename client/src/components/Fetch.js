import React, { Component } from 'react';

class Fetch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: void 0,
      error: void 0,
    }
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
      const response = await fetch(this.props.url);
      const json = await response.json();
      this.setState({ data: json });
      this.setState({ loading: false });
    }
    catch (err) {
      this.setState({ error: err })
    }
  }

  render() {
    if(this.state.loading) return <div>Loading...</div>
    if(this.state.error) return this.props.error(this.state.error);
    if (this.props.render(this.state.data)) return null;
    else return null;
  }
}
