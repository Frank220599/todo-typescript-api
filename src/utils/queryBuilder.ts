const queryBuilder = (req) => {
    const {limit, page, ...restQueryParams} = req.query;
    // req._metadata = {
    //     currentPage: +page,
    //     pageCount: Math.ceil(count / limit),
    //     totalCount: count
    // };
    return {
        limit: +limit || 50,
        offset: +(limit * (page - 1)) || 0,
        where: {
            ...restQueryParams
        }
    }
};

export default queryBuilder;