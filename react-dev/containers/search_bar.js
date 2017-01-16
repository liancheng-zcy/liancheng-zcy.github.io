import React, { Component } from 'react';

import { connect } from 'react-redux';

import IconButton from 'material-ui/IconButton';

import { fetchPosts } from '../actions';

class SearchBar extends Component {

  render() {
    return (
      <IconButton iconClassName="zmdi zmdi-search" tooltip="Search" tooltipPosition="top-center" />
    );
  }
}


function mapStateToProps(state) {
  return {
    posts: state.posts.all,
  };
}

export default connect(mapStateToProps, { fetchPosts })(SearchBar);