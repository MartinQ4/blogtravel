import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import axios from 'axios';

import './ManagePostsEditor.css'

import Navbar from '../../../components/navbar/Navbar';
import AsideEditor from '../../../components/aside/AsideEditor';


export default function ManagePostsEditor() {
  const { user } = useSelector(state => state.auth); 

  console.log('User ID:', user?.id);

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    content: {
      intro: '',
      sections: []
    },
    picture: '',
    date: '',
    authorId: '',
    likes: 0,
    comments: [],
    category: '',
    hashtags: [],
    rating: 0,
    tags: [],
    socialShares: {
      facebook: 0,
      twitter: 0,
      instagram: 0
    },
    location: '',
    cta: {
      text: '',
      url: ''
    },
    relatedPosts: [],
    readingTime: '',
    video: ''
  });
  const [editingPost, setEditingPost] = useState(null);

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
          console.log('Fetched posts:', myPosts);  
          setPosts(myPosts);
          setFilteredPosts(myPosts);
        })
        .catch(error => console.log('Error fetching posts', error));
    };

    fetchPosts();
  }, [user]); 

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    applyFilters(searchQuery);
  };

  const applyFilters = (search) => {
    let updatedPosts = posts;
  
    if (search) {
      updatedPosts = updatedPosts.filter(post =>
        (post.title ? post.title.toLowerCase() : '').includes(search) ||
        (post.description ? post.description.toLowerCase() : '').includes(search) ||
        (post.content.intro ? post.content.intro.toLowerCase() : '').includes(search)
      );
    }
  
    setFilteredPosts(updatedPosts);
  };

  const handleChange = e => {
    const { name, value } = e.target;
  

    if (name === 'hashtags') {
      value = value.split(',').map(tag => tag.trim());
    }
  
    if (name === 'intro') {

      setNewPost({
        ...newPost,
        content: {
          ...newPost.content,
          intro: value,  
        },
      });
    } else if (editingPost) {
      setEditingPost({
        ...editingPost,
        [name]: value,
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
    const updatedSections = [...editingPost.content.sections];
    updatedSections[sectionIndex] = {
      ...updatedSections[sectionIndex],
      [name]: value
    };

    setEditingPost({
      ...editingPost,
      content: {
        ...editingPost.content,
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

    if (!postToAdd.title || !postToAdd.description || !postToAdd.date) {
      console.log('Please fill in all required fields.');
      return;
    }

    axios
      .post('http://localhost:8000/posts', postToAdd)
      .then(response => {
        const updatedPosts = [...posts, response.data];
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
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

  const handleUpdatePost = e => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/posts/${editingPost.id}`, editingPost)
      .then(response => {
        const updatedPosts = posts.map(post =>
          post.id === editingPost.id ? response.data : post
        );
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setEditingPost(null);
      })
      .catch(error => console.error('Error updating post:', error));
  };

  const handleDeletePost = postId => {
    axios
      .delete(`http://localhost:8000/posts/${postId}`)
      .then(() => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
      })
      .catch(error => console.log('Error deleting post:', error));
  };






  return (
    <div className="editor-layout">
      <AsideEditor />
  
      <main>
        <div className="head">
          <h3>Upravit příspěvky</h3>
          <div className="search-container">
            <input
              type="text"
              placeholder="Např. název, datum, ..."
              value={searchTerm}
              onChange={handleSearch}
              className="posts-input"
            />
          </div>
        </div>
  
        <div className="post-list">
          {Array.isArray(filteredPosts) && filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <div key={post.id} className="editor-view-post">
                <img src={post.picture} alt={post.title} />
                <div className="content">
                  <h4>{post.title}</h4>
                  <p>{post.description}</p>
                  <div className="buttons">
                    <button
                      onClick={() => setEditingPost(post)}
                      className="btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target={`#staticBackdrop-${post.id}`}
                    >
                      Upravit
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="btn"
                    >
                      Smazat
                    </button>
                  </div>
                </div>
  
                <div
                  className="modal fade"
                  id={`staticBackdrop-${post.id}`}
                  data-bs-backdrop="static"
                  data-bs-keyboard="false"
                  tabIndex="-1"
                  aria-labelledby={`staticBackdropLabel-${post.id}`}
                  aria-hidden="true"
                >
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                      <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="modal"
                          aria-label="Close"
                        ></button>
                        <img src={post.picture} alt={post.title} />
                        
                        
                      </div>

                      <div className="modal-body">
                        {editingPost && editingPost.id === post.id && editingPost.content && editingPost.content.sections && (
                          <form onSubmit={handleUpdatePost} className='form-edit'>
                            <label>Název</label>
                            <input
                              type="text"
                              name="title"
                              value={editingPost.title}
                              onChange={handleChange}
                              required
                            />
                            <label>Úvod</label>
                            <textarea
                              name="description"
                              value={editingPost.description}
                              onChange={handleChange}
                              required
                            ></textarea>

                            <label>Obsah</label>
                            {editingPost.content.sections.map(
                              (section, index) => (
                                <div key={index} className='content-editing'>
                                  <input
                                    type="text"
                                    name="title"
                                    value={section.title}
                                    onChange={(e) =>
                                      handleContentChange(e, index)
                                    }
                                    placeholder="Section Title"
                                  />
                                  <textarea
                                    name="text"
                                    value={section.text}
                                    onChange={(e) => 
                                      handleContentChange(e, index)
                                    }
                                    placeholder="Section Text"
                                  ></textarea>
                                </div>
                              )
                            )}
                            <div className='buttons-modal'>
                              <button
                                type="submit"
                                className="btn"
                                data-bs-dismiss="modal"
                              >
                                Uložit
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingPost(null)}
                                className="btn"
                              >
                                Zrušit
                              </button>
                            </div>
                          </form>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>Žádné příspěvky k zobrazení.</p>
          )}
        </div>
      </main>
    </div>
  );
} 