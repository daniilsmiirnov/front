import React, { useState, ChangeEvent } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';

interface CartItem {
  id: number;
  name: string;
  // Другие поля для объектов услуг
}

interface DraftData {
  name?: string;
  // Другие поля для данных заявки
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [draftData, setDraftData] = useState<DraftData>({});

  const removeItem = (itemId: number) => {
    setCartItems(cartItems.filter((item) => item.id !== itemId));
  };

  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDraftData({ ...draftData, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      // Отправка данных черновика на бэкенд
      await axios.post('URL_для_отправки_данных_на_бэкенд', draftData);
      // Успешная отправка - сброс данных черновика и очистка корзины
      setDraftData({});
      setCartItems([]);
    } catch (error) {
      console.error('Ошибка при отправке данных:', error);
    }
  };

  return (
    <Container>
      <h2>Корзина</h2>
      {cartItems.length === 0 ? (
        <p>Корзина пуста</p>
      ) : (
        <ul>
          {cartItems.map((item) => (
            <li key={item.id}>
              <span>{item.name}</span>
              <Button variant="danger" onClick={() => removeItem(item.id)}>
                Удалить
              </Button>
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit}>
        {/* Форма для заполнения данных заявки */}
        <input
          type="text"
          name="name"
          placeholder="Ваше имя"
          value={draftData.name || ''}
          onChange={handleFormChange}
        />
        {/* Добавьте другие поля формы для данных заявки */}

        <Button type="submit" variant="primary">
          Отправить заявку
        </Button>
      </form>
    </Container>
  );
};

export default Cart;
