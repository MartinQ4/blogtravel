import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../../../components/navbar/Navbar';
import Heart from '../../../assets/icons/heart-fill.svg';
import { usePosts } from '../../../hooks/usePosts';
import './PostDetail.css';

export default function PostDetail() {
  const { id } = useParams();
  const {
    postDetail,
    users,
    newComment,
    getAuthorName,
    fetchPostDetail,
    handleLike,
    handleAddComment,
    setNewComment,
  } = usePosts();

  useEffect(() => {
    fetchPostDetail(id);
  }, [id, fetchPostDetail]);

  if (!postDetail) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />

      <main>
        <section className="post-content">
          <img src={postDetail.picture} alt={postDetail.title} className="post-detail-picture" />

          <div className="post-content-text">
            <h2>{postDetail.title}</h2>
            <p className="gray">{postDetail.content.intro}</p>
            <br />
            {postDetail.content.sections.map((section, index) => (
              <div key={index}>
                <strong>
                  <p>{section.title}</p>
                </strong>
                <p>{section.text}</p>
                <br />
              </div>
            ))}
            <p>{postDetail.content.conclusion}</p> <br />
            <em>
              <p>
                Autor: {getAuthorName(postDetail.authorId)}, vášnivý cestovatel a odborník na low-cost
                cestování.
              </p>
            </em>
            <em>
              <p className="gray">{new Date(postDetail.date).toLocaleDateString()}</p>
            </em>
          </div>

          <div>
            <button onClick={() => handleLike(id)} className="btn">
              <img src={Heart} className="rate-icon" alt="like" /> ({postDetail.likes})
            </button>
          </div>
        </section>

        <section className="post-comments">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Napište svůj komentář..."
          />
          <br />
          <button onClick={() => handleAddComment(id)} className="btn">
            Přidat komentář
          </button>
        </section>
      </main>
    </div>
  );
}
