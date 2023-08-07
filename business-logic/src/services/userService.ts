import User from '../models/User';

export interface pagination {
    page?: number;
    limit?: number;
}

export interface UserInterface {
    email: string;
    password: string;
}

const PAGE_DEFAULT = 1;
const LIMIT_DEFAULT = 10;

const create = (user: UserInterface) => User.create(user);

const findPagedUsers = async (email?: string, pagination?: pagination) => {
    const page = Number(pagination?.page || PAGE_DEFAULT);
    const limit = Number(pagination?.limit || LIMIT_DEFAULT);

    const filter = {
        ...email && { email: { $regex: new RegExp(email, 'i') } }
    };

    const startIndex = (page - 1) * limit;

    const total = await User.countDocuments(filter).exec();
    const totalPages = Math.ceil(total / limit);

    const results = await User.find(filter).skip(startIndex).limit(limit).exec();

    return {
        currentPage: page,
        totalPages,
        totalItems: total,
        itemsPerPage: limit,
        results,
      };
};

const userService = { findPagedUsers, create };

export default userService;
