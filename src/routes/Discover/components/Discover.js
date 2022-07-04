import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock';
import '../styles/_discover.scss';
import { connect } from 'react-redux';
import {
  fetchNewReleasesList,
  fetchFeaturedPlaylistsList,
  fetchCategoriesList
} from "../../../redux/reducers"

class Discover extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newReleases: [],
      playlists: [],
      categories: [],
      newReleaseLoading: "",
      featuredListLoading: "",
      categoryLoading: "",
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isTokenStored !== this.props.isTokenStored
      && this.props.isTokenStored) {
        const limit = { perPage: 5, offset: 0 }
        this.props.fetchNewReleasesList(limit);
        this.props.fetchFeaturedPlaylistsList(limit);
        this.props.fetchCategoriesList(limit);
    }
  }

  static getDerivedStateFromProps(props) {
    return {
      newReleaseLoading: props.newReleaseLoading,
      featuredListLoading: props.featuredListLoading,
      categoryLoading: props.categoryLoading,
      newReleases: props.newReleases,
      playlists: props.playlists,
      categories: props.categories
    };
  }

  render() {
    const {
      newReleases,
      playlists,
      categories,
      newReleaseLoading,
      featuredListLoading,
      categoryLoading
    } = this.state;

    return (
      <div className="discover">
        <DiscoverBlock text="RELEASED THIS WEEK" id="released" data={newReleases} loading={newReleaseLoading} fetchNewReleasesList={this.props.fetchNewReleasesList}/>
        <DiscoverBlock text="FEATURED PLAYLISTS" id="featured" data={playlists} loading={featuredListLoading} fetchFeaturedPlaylistsList={this.props.fetchFeaturedPlaylistsList}/>
        <DiscoverBlock text="BROWSE" id="browse" data={categories} imagesKey="icons" loading={categoryLoading} fetchCategoriesList={this.props.fetchCategoriesList}/>
      </div>
    );
  }
}

const mapStateToProps = ({ MusicLists }) => ({
  newReleaseLoading: MusicLists.newReleaseLoading,
  featuredListLoading: MusicLists.featuredListLoading,
  categoryLoading: MusicLists.categoryLoading,
  newReleases: MusicLists.newReleasesList,
  playlists: MusicLists.featuredPlaylistsList,
  categories: MusicLists.categoriesList,
  isTokenStored: MusicLists.isTokenStored
});

const mapDispatchToProps = {
  fetchNewReleasesList,
  fetchFeaturedPlaylistsList,
  fetchCategoriesList
};

export default connect(mapStateToProps, mapDispatchToProps)(Discover);