import { useState, useEffect } from 'react';
import axios from 'axios';

export function usePosts() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAuthorId, setFilterAuthorId] = useState('');
  const [postDetail, setPostDetail] = useState(null);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await axios.get('http://localhost:8000/posts');
        const usersResponse = await axios.get('http://localhost:8000/users');
        setPosts(postsResponse.data);
        setFilteredPosts(postsResponse.data);
        setUsers(usersResponse.data);
      } catch (error) {
        console.error("Error fetching data", error);
      }
    };
    fetchData();
  }, []);

  const fetchPostDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:8000/posts/${id}`);
      setPostDetail(response.data);
    } catch (error) {
      console.error("Error fetching post", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const handleLike = async (id) => {
    try {
      if (!postDetail) return;
      await axios.patch(`http://localhost:8000/posts/${id}`, {
        likes: postDetail.likes + 1,
      });
      setPostDetail((prevPost) => ({ ...prevPost, likes: prevPost.likes + 1 }));
    } catch (error) {
      console.error("Error liking post", error);
    }
  };

  const handleAddComment = async (postId) => {
    try {
      if (!postDetail) return;
      const comment = {
        id: Date.now(),
        postId: parseInt(postId),
        authorId: 1, 
        content: newComment,
        date: new Date().toISOString(),
        approved: true,
      };

      await axios.post('http://localhost:8000/comments', comment);
      await axios.patch(`http://localhost:8000/posts/${postId}`, {
        comments: [...postDetail.comments, comment.id],
      });

      setPostDetail((prevPost) => ({
        ...prevPost,
        comments: [...prevPost.comments, comment.id],
      }));

      setNewComment('');
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  const getAuthorName = (authorId) => {
    const user = users.find(user => user.id.toString() === authorId.toString());
    return user ? `${user.firstname} ${user.lastname}` : 'Unknown Author';
  };

  const getAuthorPic = (authorId) => {
    const user = users.find(user => user.id.toString() === authorId.toString());
    return user ? `${user.profilepic}` : 'Unknown Author';
  };

  const getAuthorNick = (authorId) => {
    const user = users.find(user => user.id.toString() === authorId.toString());
    return user ? `${user.username}` : 'Unknown Author';
  };

  const handleSearch = (e) => {
    const lowercasedSearch = e.target.value.toLowerCase();
    setSearchTerm(e.target.value);
    setFilteredPosts(
      posts.filter(
        post =>
          post.title.toLowerCase().includes(lowercasedSearch) ||
          post.description.toLowerCase().includes(lowercasedSearch) ||
          post.category.toLowerCase().includes(lowercasedSearch)
      )
    );
  };

  const handleFilterByAuthor = (e) => {
    const authorId = e.target.value;
    setFilterAuthorId(authorId);
    if (authorId === '') {
      setFilteredPosts(posts);
    } else {
      setFilteredPosts(posts.filter(post => post.authorId.toString() === authorId));
    }
  };

  return {
    posts,
    filteredPosts,
    users,
    postDetail,
    newComment,
    searchTerm,
    filterAuthorId,
    getAuthorName,
    getAuthorPic,
    getAuthorNick,
    handleSearch,
    handleFilterByAuthor,
    fetchPostDetail,
    fetchUsers,
    handleLike,
    handleAddComment,
    setNewComment,
  };
}
