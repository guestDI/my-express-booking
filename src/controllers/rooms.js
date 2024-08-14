const Room = require('../models/room');
const { Op } = require('sequelize');

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
    const { page = 1, limit = 10, minPrice, maxPrice, guests } = req.query;

    let where = {};

    if (minPrice || maxPrice) {
      where.price_per_night = {};
      if (minPrice) {
        where.price_per_night[Op.gte] = minPrice;
      }
      if (maxPrice) {
        where.price_per_night[Op.lte] = maxPrice;
      }
    }

    if (guests) {
      where.maxGuests = {
        [Op.gte]: guests,
      };
    }

    const options = {
      where,
      limit: parseInt(limit),
      offset: (page - 1) * limit,
    };

    const rooms = await Room.findAndCountAll(options);

    res.status(200).json({
      totalItems: rooms.count,
      totalPages: Math.ceil(rooms.count / limit),
      currentPage: parseInt(page),
      rooms: rooms.rows,
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve rooms' });
  }
};

const searchRooms = async (req, res) => {
  try {
    const { minPrice, maxPrice, guests, page = 1, limit = 10 } = req.query;

    let where = {};

    if (minPrice || maxPrice) {
      where.price_per_night = {};
      if (minPrice) {
        where.price_per_night[Op.gte] = minPrice;
      }
      if (maxPrice) {
        where.price_per_night[Op.lte] = maxPrice;
      }
    }

    if (guests) {
      where.maxGuests = {
        [Op.gte]: guests,
      };
    }

    const rooms = await Room.findAll({ where });

    res.status(200).json(rooms);
  } catch (err) {
    res.status(500).json({ error: 'Failed to search rooms' });
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
  deleteRoom,
  searchRooms,
};
