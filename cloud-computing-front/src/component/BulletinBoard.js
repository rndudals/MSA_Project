import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './BulletinBoard.css';

const BulletinBoard = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [writer, setWriter] = useState('');
  const [content, setContent] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = () => {
    fetch('http://localhost:8082/board/list')
      .then(response => response.json())
      .then(data => setPosts(data.content))
      .catch(error => console.error('Error fetching posts:', error));
  };

  const handleBackClick = () => {
    navigate('/doors');
  };

  const handleCreatePost = () => {
    const newPost = { title, writer, content };

    fetch('http://localhost:8082/board/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
    .then(response => response.text())  // 응답을 텍스트로 처리
    .then(() => {
      setShowModal(false); // 먼저 모달을 닫고
      setTitle('');
      setWriter('');
      setContent('');
      fetchPosts(); // 그 후에 게시글을 다시 불러옵니다.
    })
    .catch(error => console.error('Error creating post:', error));
  };

  return (
    <div className="board-container">
      <button className="back-button" onClick={handleBackClick}>←</button>
      <h1 className="board-title">자유의 방</h1>
      <button className="create-button" onClick={() => setShowModal(true)}>글 작성</button>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td>{index + 1}</td>
              <td className="title-cell" onClick={() => navigate(`/bulletin/${post.id}`)}>{post.title}</td>
              <td>{post.nickname}</td>
              <td>{new Date(post.createdTime).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="door-navigation">
        <div className="door" onClick={() => navigate('/bulletin')}>
          <div className="door-image bulletin"></div>
          <div className="door-name">자유</div>
        </div>
        <div className="door" onClick={() => navigate('/sharing')}>
          <div className="door-image sharing"></div>
          <div className="door-name">공유</div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <button className="modal-back-button" onClick={() => setShowModal(false)}>←</button>
            <h2 className="modal-title">글 작성</h2>
            <div className="form-group">
              <label>제목</label>
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            </div>
            <div className="form-group">
              <label>작성자</label>
              <input type="text" value={writer} onChange={(e) => setWriter(e.target.value)} />
            </div>
            <div className="form-group">
              <label>내용</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
            </div>
            <button className="modal-create-button" onClick={handleCreatePost}>작성</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BulletinBoard;
