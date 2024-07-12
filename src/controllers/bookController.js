import * as Services from "../services/index.js";

const getAllBooks = async (req, res) => {
  try {
    const page = parseInt(req.query.page) - 1 || 0;
    const limit = parseInt(req.query.limit) || 5;
    let sort = req.query.sort || "author";
    let titles = req.query.titles || "";
    let authors = req.query.authors || "";
    let languages = req.query.languages || "es";

    req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

    const languagesOptions = await Services.distinctLanguages();

    let sortBy = {};

    if (sort[1]) {
      sortBy[sort[0]] = sort[1];
    } else {
      sortBy[sort[0]] = "asc";
    }

    let filters = {};

    if (languages) {
      languages === "all"
        ? (languages = [...languagesOptions])
        : (languages = languages.split(","));
      filters.languages = { $in: languages };
    }

    if (titles) {
      const titlePatterns = titles
        .split(",")
        .map((title) => new RegExp(title, "i"));
      filters.$or = filters.$or || [];
      filters.$or.push(
        ...titlePatterns.map((pattern) => ({
          title: { $regex: pattern },
        }))
      );
    }

    if (authors) {
      const authorPatterns = authors
        .split(",")
        .map((author) => new RegExp(author, "i"));
      filters.$or = authorPatterns.map((pattern) => ({
        authors: { $elemMatch: { name: { $regex: pattern } } },
      }));
    }

    const books = await Services.findBooks(filters, sortBy, page, limit);
    const total = await Services.countBooks(filters);

    const response = {
      statusCode: books.length > 0 ? 200 : 404,
      total,
      page: page + 1,
      limit,
      languages,
      books,
    };

    return res.status(books.length > 0 ? 200 : 404).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      statusCode: 500,
      message: "Internal Server Error",
    });
  }
};

export { getAllBooks };
