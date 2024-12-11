export function setupSocketHandlers(io) {
  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });

    // Handle real-time inventory updates
    socket.on('inventory:update', (data) => {
      // Broadcast the update to all connected clients except sender
      socket.broadcast.emit('inventory:updated', data);
    });
  });

  return io;
}