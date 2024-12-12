import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import './Profile.css';
import AsideEditor from '../../../components/aside/AsideEditor';
import useUsers from '../../../hooks/useUsers';
import Graph from '../../../assets/icons/completeProfile.png'
import Check from '../../../assets/icons/check.svg'
import Cross from '../../../assets/icons/cross.svg'

export default function ProfileEditor() {
    const { currentUser, fetchUserById } = useUsers();
    const loggedInUser = useSelector((state) => state.auth.user);

    useEffect(() => {
        if (loggedInUser?.id) {
            fetchUserById(loggedInUser.id);
        }
    }, [loggedInUser]);

    if (!loggedInUser?.id) {
        return <div>User is not logged in.</div>;
    }

    if (!currentUser) {
        return <div>Loading user profile...</div>;
    }

    return (
        <div className="editor-layout">
            <AsideEditor />
            <main>
                <div className="head">
                    <h3>Profil</h3>
                    <div className="search-container">
                        <input
                            type="text"
                            placeholder="Např. název, datum, ..."
                            className="posts-input"
                        />
                    </div>
                </div>
                <div className='profile'>
                    <section className='profile-left'>
                        <div>
                            <img src={currentUser.profilepic}></img>
                            <btn className='btn'>Nahrát novou fotku</btn>
                        </div>

                        <hr/>

                        <div>
                            <h4>Osobní informace</h4>
                            <p>Jméno: {currentUser.firstname} {currentUser.lastname}</p>
                            <p>Uživatelské jméno: {currentUser.username}</p>
                            <h4>Kontakty</h4>
                            <p>Telefon: {currentUser.phone}</p>
                            <p>Email: {currentUser.email}</p>
                            <p>Instagram: {currentUser.socials.instagram}</p>
                        </div>

                        <hr/>
                        
                        <div>
                            <h4>Motto</h4>
                            <p>{currentUser.motto}</p>
                        </div>
                        <div>
                            <h4>Bio</h4>
                            <p>{currentUser.bio}</p>
                        </div>

                        <hr/>

                        <div>
                            <h4>O mě</h4>
                            <p>Oblíbené místo: {currentUser.favoritePlace}</p>
                            <p>Vět, bez které nejedu: {currentUser.mustHaveItem}</p>
                            <p>Cestovní preference:</p>
                                <ul>
                                {currentUser.travelPreferences.map((preference, index) => (
                                    <li key={index} className='preferenc'>{preference}</li>
                                ))}
                                </ul>
                        </div>
                        
                    </section>
                    <section className='profile-right'>
                        <h4>Dokončit profil</h4>
                        <img src={Graph} alt='graph'></img>
                        <div className='profile-evaluation'>
                            <div className='profile-line'>
                                <img src={Check} alt='img'></img>
                                <p>Fotka</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Check} alt='img'></img>
                                <p>Info</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Check} alt='img'></img>
                                <p>Kontakty</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Check} alt='img'></img>
                                <p>Motto</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Check} alt='img'></img>
                                <p>Bio</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Check} alt='img'></img>
                                <p>O mě</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Cross} alt='img'></img>
                                <p>Specializace</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Cross} alt='img'></img>
                                <p>Ocenění</p>
                            </div>
                            <div className='profile-line'>
                                <img src={Cross} alt='img'></img>
                                <p>Dovednosti</p>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}
