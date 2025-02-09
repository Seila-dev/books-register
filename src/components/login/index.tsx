// Exemplo de formulário para adicionar produtos
import React, { useState } from 'react';
import api from '../../services/api';

export const Login = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formData = new FormData();
      formData.append('title', title);
      if (image) formData.append('file', image);

      const response = await api.post('/products', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Importante para upload de arquivos
        },
      });

      alert('Produto adicionado com sucesso!');
    } catch (err) {
      console.log('Erro ao adicionar produto', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Título do Produto" 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="file" 
        onChange={handleImageChange} 
      />
      <button type="submit">Adicionar Produto</button>
    </form>
  );
};