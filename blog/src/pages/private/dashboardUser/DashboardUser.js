import React from 'react'

import { Link } from 'react-router-dom';
import '../dashboardEditor/Dashboard.css'
import Winter from '../../../assets/pictures/winter.jpg'
import Jakub from '../../../assets/pictures/profileJakub.jpg'
import Tereza from '../../../assets/pictures/profileTereza.jpg'
import Marek from '../../../assets/pictures/profileMarek.jpg'
import Calendar from '../../../assets/icons/calendar-lighter.svg'
import AsideUser from '../../../components/aside/AsideUser';

export default function DashboardUser() {
  return (
    <div className='editor-layout'>
        <AsideUser/>
        <main className='dashboard'>
          <div className='dashboard-left'>
            <div className='one'>
              <h2>Vítejte zpět!</h2>
            </div>
            <div className='two'>
            <div>
                <h4>Top témata</h4>
                <p>#1 - RoadTrip</p>
                <p>#2 - Evropa</p>
                <p>#3 - Rodina</p>
              </div>              
              
              <div> 
                <h4>Nejoblíbenější posty</h4>
                <p>#1 - Jak na levný roadtrip po Evropě</p>
                <p>#2 - Rodinná dovolená v rakouských Alpách</p>
                <p>#3 - Gastronomická prohlídka Barcelony</p></div>
            </div>
            <div className='three'>
            <h4>Odebíraní editoři</h4>
              <div className='div-people'>
                <div className='div-person'>
                  <img src={Jakub} alt='img'></img>
                  <p>Jakub Novák</p>
                </div>
                <div>
                  <img src={Tereza} alt='img'></img>
                  <p>Tereza Hlaváčová</p>
                </div>
                <div>
                  <img src={Marek} alt='img'></img>
                  <p>Marek Krásek</p>
                </div>
                
              </div>
            </div>
            <div className='four'>
              <h4>Nové články</h4>
              <p> 01/12/24 - Jak naplánovat rodinný výlet po Balkánu</p>
            </div>
          </div>

          <div className='dashboard-right'>
            <div className='r-one'>
              <input
                type="text"
                placeholder="Vyhledávejte ... "
                className='posts-input'
              />
              <div className='notifications'>
                <h4>Notifikace</h4>
                <div className='notifications-list'>
                  <div className='noti'>
                    <img src={Jakub}></img>
                    <p>Zpráva: Je to opravené.</p>
                  </div>
                  <div className='noti'>
                    <img src={Tereza}></img>
                    <p>Zpráva: Zkontroluji to.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className=''>

            </div>
            
          </div>
          
        </main>
    </div>
  )
}
