import { io, Socket } from 'socket.io-client';
import { Product } from '../types';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';

class SocketService {
  private socket: Socket;
  private static instance: SocketService;

  private constructor() {
    this.socket = io(SOCKET_URL);
    this.setupListeners();
  }

  public static getInstance(): SocketService {
    if (!SocketService.instance) {
      SocketService.instance = new SocketService();
    }
    return SocketService.instance;
  }

  private setupListeners() {
    this.socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from WebSocket');
    });
  }

  public subscribeToProducts(callback: (product: Product) => void) {
    this.socket.on('product:created', callback);
    this.socket.on('product:updated', callback);
    this.socket.on('product:deleted', callback);
    return () => {
      this.socket.off('product:created', callback);
      this.socket.off('product:updated', callback);
      this.socket.off('product:deleted', callback);
    };
  }

  public emitInventoryUpdate(data: any) {
    this.socket.emit('inventory:update', data);
  }
}

export const socketService = SocketService.getInstance();