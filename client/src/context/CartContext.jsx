import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('lion_selling_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('lion_selling_cart', JSON.stringify(items));
    } catch (e) {
      console.warn('Failed to save selling cart:', e);
    }
  }, [items]);

  const addItem = async (itemConfig) => {
    try {
      setIsSyncing(true);
      // Validate on server
      const res = await api.calculateEstimate(itemConfig);
      if (res.estimate) {
        const newItem = {
          ...res.estimate,
          itemId: `cart-item-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
          customerNotes: itemConfig.customerNotes || ''
        };
        setItems(prev => [...prev, newItem]);
        setIsCartOpen(true);
        return newItem;
      }
    } catch (err) {
      console.error('Error adding item to selling cart:', err);
      // Fallback local add
      const fallbackItem = {
        itemId: `cart-item-${Date.now()}`,
        productName: itemConfig.productName || 'Artículo de Videojuego',
        calculatedEstimate: 500,
        condition: itemConfig.condition || 'good',
        conditionLabel: 'Buen Estado',
        category: itemConfig.category || 'consoles',
        accessories: itemConfig.accessories || {}
      };
      setItems(prev => [...prev, fallbackItem]);
      setIsCartOpen(true);
    } finally {
      setIsSyncing(false);
    }
  };

  const removeItem = (itemId) => {
    setItems(prev => prev.filter(item => item.itemId !== itemId));
  };

  const updateItemCondition = async (itemId, newCondition) => {
    const target = items.find(i => i.itemId === itemId);
    if (!target) return;

    try {
      setIsSyncing(true);
      const res = await api.calculateEstimate({
        productId: target.productId,
        condition: newCondition,
        accessories: target.accessories,
        customData: target.isCustom ? { suggestedPrice: target.calculatedEstimate, title: target.productName } : undefined
      });

      if (res.estimate) {
        setItems(prev => prev.map(item => {
          if (item.itemId === itemId) {
            return {
              ...item,
              ...res.estimate,
              condition: newCondition
            };
          }
          return item;
        }));
      }
    } catch (err) {
      console.error('Error updating item condition:', err);
    } finally {
      setIsSyncing(false);
    }
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalEstimate = items.reduce((sum, item) => sum + (item.calculatedEstimate || 0), 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateItemCondition,
        clearCart,
        totalEstimate,
        itemCount,
        isCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isSyncing
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
