import * as Services from "../services/index.js";

const getAllLanguages = async (req, res) => {
  try {
    const languages = await Services.distinctLanguages();

    const response = {
      statusCode: 200,
      languages,
    };

    return res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export { getAllLanguages };
