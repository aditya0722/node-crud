const {
  findAll,
  findById,
  findShowTimesById,
  create,
  update,
  remove,
} = require("./shows.model");
//getting all shows with pagination and filters
const getAllShows = async (req, res) => {
  try {
    const { city, genre,language, page = 1, limit = 10,category } = req.query;

    const shows = await findAll({ city, genre, page, limit,category,language });

    res.status(200).json({
      success: true,
      data: {
        shows,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total: shows.length,
          totalPages: Math.ceil(shows.length / limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
//getting show details by id
const getShowDetails = async (req, res) => {
  const show = await findById(req.params.id);
  res.status(200).json({ 
    data:{
        success: true,
        show
    }
   });
};
const getShowTimes = async (req, res) => {
  const showTimes = await findShowTimesById(req.params.id);
  res.status(200).json({ 
    data: {
      success: true,
      showTimes
    }
  });
};

const createShow = async (req, res) => {
    
    
  const show = await create(req.body);
  if (!show) {
    res.status(400).json({ data: { success: false, message: "Failed to create show" } });
    return;
  }
  res.status(201).json({ 
    data: {
      success: true,
      show
    }
  });
};

const updateShow = async (req, res) => {
  const show = await update(req.params.id, req.body);
  res.status(200).json({
    data: {
      success: true,
      show
    }
  });
};
const deleteShow = async (req, res) => {
  const show = await remove(req.params.id);
  res.status(200).json({
    data: {
      success: true,
      show
    }
  });
};
module.exports = {
  getAllShows,
  getShowDetails,
  getShowTimes,
  createShow,
  updateShow,
  deleteShow,
};
