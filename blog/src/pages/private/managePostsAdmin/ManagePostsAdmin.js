import React, { useEffect, useState } from 'react';
import axios from 'axios';

import Navbar from '../../../components/navbar/Navbar';
import AsideA from '../../../components/aside/AsideAdmin';

export default function ManagePostsAdmin() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthorId, setFilterAuthorId] = useState('');
  const [newPost, setNewPost] = useState({
    title: '',
    description: '',
    content: {
      intro: '',
      sections: []
    },
    date: '',
    authorId: '',
    likes: '',
    comments: [],
  });
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    axios
      .get('http://localhost:8000/posts')
      .then(response => {
        setPosts(response.data);
        setFilteredPosts(response.data);
      })
      .catch(error => console.log('Error fetching posts', error));
  };

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setSearchTerm(searchQuery);
    applyFilters(searchQuery, filterAuthorId);
  };

  const handleFilterByAuthor = (e) => {
    const authorId = e.target.value;
    setFilterAuthorId(authorId);
    applyFilters(searchTerm, authorId);
  };

  const applyFilters = (search, authorId) => {
    let updatedPosts = posts;

    if (search) {
      updatedPosts = updatedPosts.filter(post =>
        post.title.toLowerCase().includes(search) ||
        post.content.toLowerCase().includes(search)
      );
    }

    if (authorId) {
      updatedPosts = updatedPosts.filter(post => post.authorId.toString() === authorId);
    }

    setFilteredPosts(updatedPosts);
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleEditChange = e => {
    const { name, value } = e.target;
    setEditingPost({
      ...editingPost,
      [name]: value,
    });
  };

  const handleAddPost = e => {
    e.preventDefault();
    axios
      .post('http://localhost:8000/posts', newPost)
      .then(response => {
        const updatedPosts = [...posts, response.data];
        setPosts(updatedPosts);
        setFilteredPosts(updatedPosts);
        setNewPost({
          title: '',
          content: '',
          date: '',
          authorId: '',
          likes: '',
          comments: [],
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
    <div className='editor-layout'>
      <AsideA/>
      <main>

        <div className='head'>
        <h3>Spravovat příspěvky</h3>

        <div className="posts-two-filters">
          <select value={filterAuthorId} onChange={handleFilterByAuthor} className='posts-select'>
            <option value="">Autor</option>
            {[...new Set(posts.map(post => post.authorId))].map(authorId => (
              <option key={authorId} value={authorId}>
                {`Author ID: ${authorId}`}
              </option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Vyhledávat příspěvky podle názvu nebo obsahu..."
            value={searchTerm}
            onChange={handleSearch}
            className='posts-input'
          />
        </div>
        </div>

        <div className="post-list">
          {filteredPosts.map(post => (
            <div key={post.id} className="editor-view-post">
            <img src={post.picture} alt={post.title} />
            <div className="content">
              <h4>{post.title}</h4>
              <p>{post.description}</p>
              <div className="buttons">
                <button
                  onClick={() => setEditingPost(post)}
                  className="btn purple"
                  type="button"
                  data-bs-toggle="modal"
                  data-bs-target={`#staticBackdrop-${post.id}`}
                >
                  Upravit
                </button>
                <button
                  onClick={() => handleDeletePost(post.id)}
                  className="btn red"
                >
                  Smazat
                </button>
              </div>
            </div>
            </div>
          ))}
        </div>
        
      </main>
     
      
    </div>
  );
}
