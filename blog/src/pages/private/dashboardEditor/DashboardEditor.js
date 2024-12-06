import React from 'react'
import { Link } from 'react-router-dom';
import AsideEditor from '../../../components/aside/AsideEditor';
import './Dashboard.css'

export default function DashboardEditor() {
  return (
    <div className='editor-layout'>
        <AsideEditor/>
        <main className='dashboard'>
          <div className='dashboard-left'>
            <div className='one'>
              <h1>num</h1>
            </div>
            <div className='two'>
              <div>
                <div>
                  <h2>Top témata</h2>
                </div>
              </div>
              <div><h1>2</h1></div>
            </div>
            <div className='three'>
              <h1>num</h1>
            </div>
            <div className='four'>
              <h1>num</h1>
            </div>
          </div>

          <div className='dashboard-right'>
            <div className='r-one'>
              <input
                type="text"
                placeholder="Vyhledávejte ... "
                //value={searchTerm}
                //onChange={handleSearch}
                className='posts-input'
              />
              <div className='notifications'>
                <p>wth</p>
              </div>
            </div>

            <div className='r-two'>
              <h1>cal</h1>
            </div>
            
          </div>
          
        </main>
    </div>
  )
}
