const Room = require('../models/room');

const createRoom = async (req, res) => {
  try {
    const { name, description, capacity, price_per_night } = req.body;

    const newRoom = await Room.create({
      name,
      description,
      capacity,
      price_per_night,
    });

    res.status(201).json(newRoom);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.findAll();
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getRoomById = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateRoom = async (req, res) => {
  try {
    const { name, description, capacity, price_per_night } = req.body;
    const room = await Room.findByPk(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    room.name = name || room.name;
    room.description = description || room.description;
    room.capacity = capacity || room.capacity;
    room.price_per_night = price_per_night || room.price_per_night;

    await room.save();

    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteRoom = async (req, res) => {
  try {
    const room = await Room.findByPk(req.params.id);

    if (!room) {
      return res.status(404).json({ message: 'Room not found' });
    }

    await room.destroy();

    res.json({ message: 'Room deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
    createRoom,
    getAllRooms,
    getRoomById,
    updateRoom,
    deleteRoom
}
