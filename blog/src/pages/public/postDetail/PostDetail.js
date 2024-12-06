import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import './PostDetail.css';
import Heart from '../../../assets/icons/heart-fill.svg';

import Navbar from '../../../components/navbar/Navbar';

export default function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [users, setUser] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/posts/${id}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/users`);
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching post", error);
      }
    };
    fetchUser();
  }, [id]);

  if (!post) {
    return <p>Loading...</p>;
  }

  const getAuthorName = (authorId) => {
    const user = users.find(user => user.id.toString() === authorId.toString());
    return user ? `${user.firstname} ${user.lastname}` : 'Unknown Author';
  };

  const handleLike = async () => {
    try {
      await axios.patch(`http://localhost:8000/posts/${id}`, {
        likes: post.likes + 1
      });
      setPost(prevPost => ({ ...prevPost, likes: prevPost.likes + 1 }));
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleAddComment = async () => {
    try {
     
      const comment = {
        id: Date.now(), 
        postId: parseInt(id),
        authorId: 1,
        content: newComment,
        date: new Date().toISOString(),
        approved: true
      };
  
      
      await axios.post('http://localhost:8000/comments', comment);
  
    
      await axios.patch(`http://localhost:8000/posts/${id}`, {
        comments: [...post.comments, comment.id]
      });
  
    
      setPost(prevPost => ({
        ...prevPost,
        comments: [...prevPost.comments, comment.id]
      }));
  
      setNewComment(''); 
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  

  return (
    <div>
        <Navbar/>

        <main>

          <section className='post-content'>
            <img src={post.picture} alt={post.title} className='post-detail-picture'/>
            

            <div className='post-content-text'>
            <h2>{post.title}</h2>
              <p className='gray'>{post.content.intro}</p>
              <br/>
              {post.content.sections.map((section, index) => (
                <div key={index}>
                  <strong><p>{section.title}</p></strong>
                  <p>{section.text}</p>
                  <br/>
                </div>
              ))}
              <p>{post.content.conclusion}</p> <br/>
              <em><p>Autor: {getAuthorName(post.authorId)}, vášnivý cestovatel a odborník na low-cost cestování.</p></em>
              <em><p className='gray'>{new Date(post.date).toLocaleDateString()}</p></em>
              </div>

              <div>
              <button onClick={handleLike} className='btn'><img src={Heart} className='rate-icon' alt='like'></img> ({post.likes})</button>
              </div> 
          </section>

            <section className='post-comments'>
              
                <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Napište svůj komentář..."
                /> <br/>
                <button onClick={handleAddComment} className='btn'>Přidat komentář</button>
              
            </section>

        </main>
    </div>
  );
}
