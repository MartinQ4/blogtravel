import React from 'react'
import { Link } from 'react-router-dom'

import './Home.css'

import Navbar from '../../../components/navbar/Navbar'

export default function Home() {
  return (
    <div>
        <Navbar/>

        <main>

            <section className='home-one'>

                <div className='home-one-texts'>
                    <h1>Objevujte svět s námi!</h1>
                    <h2>Inspirujte se příběhy z celého světa, praktyckými typy a našimi dobrodružstvími.</h2>
                    <button className='btn dark big'>
                        <Link to="/posts">Prozkoumat články</Link>
                    </button>
                </div>

            </section>

            
           
        </main>
        
    </div>
  )
}
