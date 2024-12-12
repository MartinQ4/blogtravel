import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import axios from 'axios';
import './WriteNewPost.css'

import AsideEditor from '../../../components/aside/AsideEditor';

export default function WriteNewPost() {
  const { user } = useSelector(state => state.auth); 
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    content: { intro: '', sections: [] },
    picture: '',
    date: '',
    authorId: '',
    likes: 0,
    comments: [],
    category: '',
    hashtags: [],
    rating: 0,
    tags: [],
    socialShares: { facebook: 0, twitter: 0, instagram: 0 },
    location: '',
    cta: { text: '', url: '' },
    relatedPosts: [],
    readingTime: '',
    video: ''
  });

  useEffect(() => {
    if (!user || !user.id) {
      console.log('User not logged in or user ID missing');
      return;
    }

    const fetchPosts = () => {
      axios
        .get('http://localhost:8000/posts')
        .then(response => {
          const myPosts = response.data.filter(post => post.authorId === user.id); 
          setPosts(myPosts);
        })
        .catch(error => console.log('Error fetching posts', error));
    };

    fetchPosts();
  }, [user]);

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === 'hashtags') {
      // Ujistíme se, že hashtags jsou rozděleny čárkami a ořezány
      const hashtags = value.split(',').map(tag => tag.trim());
      setNewPost({
        ...newPost,
        [name]: hashtags, // Nastavíme hashtags jako array
      });
    } else {
      setNewPost({
        ...newPost,
        [name]: value,
      });
    }
  };

  const handleContentChange = (e, sectionIndex) => {
    const { name, value } = e.target;
    const updatedSections = [...newPost.content.sections];
    updatedSections[sectionIndex] = { ...updatedSections[sectionIndex], [name]: value };
    
    setNewPost({
      ...newPost,
      content: {
        ...newPost.content,
        sections: updatedSections,
      },
    });
  };

  const handleAddSection = () => {
    setNewPost({
      ...newPost,
      content: {
        ...newPost.content,
        sections: [...newPost.content.sections, { title: '', text: '' }],
      },
    });
  };

  const handleAddPost = e => {
    e.preventDefault();
    
    const postToAdd = { ...newPost, authorId: user.id };
  
    // Ověření, zda jsou povinné údaje vyplněné
    if (!postToAdd.title || !postToAdd.description) {
      console.log('Please fill in all required fields.');
      return;
    }
    
    // Pokud chybí datum, nastavíme aktuální
    if (!postToAdd.date) {
      postToAdd.date = new Date().toISOString(); // Přidání aktuálního data
    }
  
    axios
      .post('http://localhost:8000/posts', postToAdd)
      .then(response => {
        setPosts([...posts, response.data]); // Přidáme nový příspěvek
        setNewPost({
          title: '',
          description: '',
          content: { intro: '', sections: [] },
          picture: '',
          date: '',
          authorId: '',
          likes: 0,
          comments: [],
          category: '',
          hashtags: [],
          rating: 0,
          tags: [],
          socialShares: { facebook: 0, twitter: 0, instagram: 0 },
          location: '',
          cta: { text: '', url: '' },
          relatedPosts: [],
          readingTime: '',
          video: ''
        });
      })
      .catch(error => console.log('Error adding post', error));
  };

  const handleDeletePost = postId => {
    axios
      .delete(`http://localhost:8000/posts/${postId}`)
      .then(() => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
      })
      .catch(error => console.log('Error deleting post:', error));
  };

  return (
    <div className="editor-layout">
      <AsideEditor />

      <main>
        <div className="head">
          <h3>Nový příspěvek</h3>
        </div>

        <div className="form-section">
          <form onSubmit={handleAddPost} className='form-add'>
            <label>Obrázek</label>
            <input type="file" id="fileInput" accept="image/*" style={{ display: 'none' }}  />
            <button type="button" id="customButton" className='btn purple'>Vyberte soubor</button>
            
            <label>Název</label>
            <input
              type="text"
              name="title"
              value={newPost.title}
              onChange={handleChange}
              required
            />
            <label>Úvod</label>
            <textarea
              name="description"
              value={newPost.description}
              onChange={handleChange}
              required
            ></textarea>

            <label>Obsah</label>
            {newPost.content.sections.map((section, index) => (
              <div key={index} className="content-editing">
                <input
                  type="text"
                  name="title"
                  value={section.title}
                  onChange={(e) => handleContentChange(e, index)}
                  placeholder="Název sekce"
                />
                <textarea
                  name="text"
                  value={section.text}
                  onChange={(e) => handleContentChange(e, index)}
                  placeholder="Text sekce"
                ></textarea>
              </div>
            ))}
            <button type="button" onClick={handleAddSection} className='btn purple'>
              Přidat sekci
            </button>

            <div className="buttons-modal">
              <button type="submit" className="btn green">
                Přidat příspěvek
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
