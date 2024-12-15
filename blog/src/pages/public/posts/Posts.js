
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import { usePosts } from '../../../hooks/usePosts';
import './Posts.css';
import Arrow from '../../../assets/icons/arrow-big.svg';
import Heart from '../../../assets/icons/heart-fill.svg';
import Bouble from '../../../assets/icons/bouble.svg';

export default function Posts() {
  const {
    filteredPosts,
    users,
    searchTerm,
    filterAuthorId,
    getAuthorName,
    getAuthorPic,
    getAuthorNick,
    handleSearch,
    handleFilterByAuthor,
  } = usePosts();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const navigate = useNavigate();

  const handleReadMore = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPosts.length / postsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <Navbar />

      <main>
        <section className='posts-one'>
          <div className='posts-one-text'>
            <img src={Arrow} className='left-rotate' alt='img'></img>
            <h1>Vyhledávejte, čtěte, plánujte: Vše o cestování</h1>
            <img src={Arrow} alt='img'></img>
          </div>
        </section>

        <section className='posts-two'>
          <h1>Knihovna článků</h1>

          <div className='posts-two-filters'>
            <select value={filterAuthorId} onChange={handleFilterByAuthor} className='posts-select'>
              <option value="">Autor</option>
              {users
                .filter(user => user.role === 'editor')
                .map(user => (
                  <option key={user.id} value={user.id}>
                    {`${user.firstname} ${user.lastname}`}
                  </option>
                ))}
            </select>
            <input
              type="text"
              placeholder="Např. město, autor, ..."
              value={searchTerm}
              onChange={handleSearch}
              className='posts-input'
            />
          </div>

          <div>
            <div className="posts-container">
              {currentPosts.map(post => (
                <div className="card" key={post.id}>
                  <img src={post.picture} alt={post.title} className='post-picture' />

                  <div className='card-bottom'>
                    <div className='card-gray'>
                      <p className='uppercase-text'>{post.category}</p>
                      <p>Přidáno: {new Date(post.date).toLocaleDateString()}</p>
                    </div>

                    <div className='card-texts'>
                      <h4>{post.title}</h4>
                      <p>{post.description}</p>
                    </div>

                    <div className='author-info'>
                      <img src={getAuthorPic(post.authorId)} className='profile-pic' alt='profile-pic' />
                      <div>
                        <p>{getAuthorName(post.authorId)}</p>
                        <p className='gray'>{getAuthorNick(post.authorId)}</p>
                      </div>
                    </div>

                    <div className='card-btn'>
                      <p>
                        <img src={Heart} className='rate-icon' alt='like' /> {post.likes}
                      </p>
                      <p>
                        <img src={Bouble} className='rate-icon' alt='comment' /> {post.comments.length}
                      </p>
                      <button className='btn' onClick={() => handleReadMore(post.id)}>
                        Číst
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button onClick={handlePrevPage} disabled={currentPage === 1}>
                Předchozí
              </button>
              <span>
                Stránka {currentPage} z {Math.ceil(filteredPosts.length / postsPerPage)}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === Math.ceil(filteredPosts.length / postsPerPage)}
              >
                Další
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
