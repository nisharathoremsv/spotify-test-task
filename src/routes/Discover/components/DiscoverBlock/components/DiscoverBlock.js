import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import DiscoverItem from './DiscoverItem';
import '../styles/_discover-block.scss';
import Loader from '../../Loader';

export default function DiscoverBlock({
  loading, text, id, data, imagesKey = 'images', totalItems,
  fetchNewReleasesList, fetchFeaturedPlaylistsList, fetchCategoriesList
}) {
  const [offset, setOffset] = useState(5)

  console.log('fetchNewReleasesList', data)

  function scrollContainer(id, { isNegative } = {}) {
 
    return () => {
      const scrollableContainer = document.getElementById(id);
      const amount = isNegative ? -scrollableContainer.offsetWidth : scrollableContainer.offsetWidth;
      scrollableContainer.scrollLeft = scrollableContainer.scrollLeft + amount;
      if(!isNegative){
      setOffset(offset+5)
      getMoreData(id, fetchNewReleasesList, fetchFeaturedPlaylistsList, fetchCategoriesList)
    }
    };
  
  } 
  const getMoreData = (id, fetchNewReleasesList, fetchFeaturedPlaylistsList, fetchCategoriesList) => {
    const limit = { perPage: 5, offset: offset }
    if(id === 'released') { fetchNewReleasesList(limit)}
    else if (id === 'featured') { fetchFeaturedPlaylistsList (limit)}
    else if (id === 'browse') {fetchCategoriesList(limit)}
  } 

  return (
    <div className="discover-block">
      <div className="discover-block__header">
        <h2>{text}</h2>
        <span />
        {
          data?.length ? (
            <div className="animate__animated animate__fadeIn">
              <FontAwesomeIcon
                icon={faChevronLeft}
                onClick={scrollContainer(id, { isNegative: true })}
              />
              <FontAwesomeIcon
                icon={faChevronRight}
                onClick={scrollContainer(id)}
              />
            </div>
          ) : null
        }
      </div>
      {!loading ?
        <div className="discover-block__row" id={id}>
          {data?.map(({ [imagesKey]: images, name }) => (
            <DiscoverItem key={name} images={images} name={name} />
          ))}
        </div>
        :
        <Loader />
      }
    </div>
  );
}
