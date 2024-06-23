import React from 'react'
import Sidebar from '../Cpform/Sidebar'
import MainQuestion from './MainQuestion'
import './index.css';
import { useParams } from 'react-router-dom';


function Index() {

  const {id} = useParams();
  //console.log("id", id);

  return (
    <div className='cp-index'>
      <div className='cp-index-content' style={{marginLeft:-16}}>
        <Sidebar />
        <MainQuestion id={id}/>
      </div>
    </div>
  )
}

export default Index
