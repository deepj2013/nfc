import mongoose from "mongoose";

export const getObjectId = (id) => {
    return new mongoose.Types.ObjectId(id);
}

export const isValidObjectId = (id) => {
    return mongoose.Types.ObjectId.isValid(id);
  }