import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import './ItemDetail.css';
import { SB_BASE_URL } from '../fetch.js'; // 수정된 부분

const ItemDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();
  const [item, setItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [productName, setProductName] = useState('');
  const [price, setPrice] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    fetchItem();
  }, [id]);

  const fetchItem = () => {
    fetch(`${SB_BASE_URL}/${id}`)
      .then(response => response.json())
      .then(data => {
        setItem(data);
        setProductName(data.productName);
        setPrice(data.price);
        setUrl(data.url);
      })
      .catch(error => console.error('아이템을 불러오는 중 에러 발생:', error));
  };

  const handleUpdateItem = () => {
    const updatedItem = { ...item, productName, price, url };

    fetch(`${SB_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(updatedItem)
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();  // JSON이 아닐 경우 텍스트로 받음
      })
      .then(text => {
        try {
          const json = JSON.parse(text); // JSON 파싱 시도
          setItem(json);
        } catch (error) {
          console.warn('Response is not JSON:', text);
        }
        setIsEditing(false);
        navigate('/sharing'); // 수정 완료 후 공유의 방 화면으로 전환
      })
      .catch(error => console.error('아이템을 수정하는 중 에러 발생:', error));
  };

  const handleDeleteItem = () => {
    if (window.confirm('게시물을 삭제하시겠습니까?')) {
      fetch(`${SB_BASE_URL}/${id}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.text();
        })
        .then(() => {
          navigate('/sharing'); // 삭제 완료 후 공유의 방 화면으로 전환
        })
        .catch(error => console.error('아이템을 삭제하는 중 에러 발생:', error));
    }
  };

  const handleBackClick = () => {
    navigate('/sharing');
  };

  const handleLinkClick = (e) => {
    e.preventDefault();
    if (url) {
      window.open(url.startsWith('http') ? url : `http://${url}`, '_blank');
    }
  };

  if (!item) return <div>Loading...</div>;

  return (
    <div className="item-detail-container">
      <button className="back-button" onClick={handleBackClick}>←</button>
      <h2 className="item-title">{item.productName}</h2>
      <p>{item.price}원</p>
      <p>
        <a href={url && (url.startsWith('http') ? url : `http://${url}`)} onClick={handleLinkClick} style={{ color: '#4787e7' }}>
          {url}
        </a>
      </p>
      <div className="item-footer">
        <span className="item-nickname">{item.nickname}</span>
        <span className="item-date">{item.date}</span>
      </div>
      {user && item.nickname === user.nickname && (
        <>
          {!isEditing && (
            <div className="edit-delete-buttons">
              <button className="edit-button" onClick={() => setIsEditing(true)}>수정</button>
              <button className="delete-button" onClick={handleDeleteItem}>삭제</button>
            </div>
          )}
          {isEditing && (
            <>
              <div className="form-group">
                <label>상품명</label>
                <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
              </div>
              <div className="form-group">
                <label>가격</label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  step="1000"
                />
              </div>
              <div className="form-group">
                <label>링크</label>
                <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
              </div>
              <button className="modal-update-button" onClick={handleUpdateItem}>수정 완료</button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default ItemDetail;
