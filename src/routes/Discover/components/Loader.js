import React from 'react'
import { Bars } from 'react-loader-spinner';

import '../styles/_discover.scss'

const Loader = () => {
  return (
    <div className='loader discover-block__row'>
      <Bars color="#00BFFF" height={80} width={60} delay={3000} />
    </div>
  )
}

export default Loader;