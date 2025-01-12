import User from "../models/userModels";

export const getUsers = async (): Promise<any> => {
  return await User.find();
};

export const addUser = async (userData: any): Promise<any> => {
  const user = new User(userData);
  return await user.save();
};
