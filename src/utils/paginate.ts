const paginate = req => {
    const {limit, page} = req.query;
    return {
        limit: +limit || 50,
        offset: +(limit * (page - 1)) || 0,
    }
};

module.exports = paginate;