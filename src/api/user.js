import axios from "axios";
import { API_URL, EXPIRY_IN_MINUTES } from "../constants";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import { addMinutes } from "date-fns";

const axiosInstance = axios.create({
  baseURL: API_URL + "users",
});

export default class User {
  setItemsOnStorage({ id, name }) {
    let expiry = addMinutes(new Date(Date.now()), EXPIRY_IN_MINUTES);
    localStorage.setItem(
      "auth",
      JSON.stringify({
        id,
        name,
        expiry,
      })
    );
  }

  async checkIsUserExist(data) {
    const isUserExist = await axiosInstance.get("", {
      params: {
        name: data.name,
      },
    });

    if (isUserExist.data.length > 0)
      return { status: true, msg: "User name already exist" };

    const isEmailExist = await axiosInstance.get("", {
      params: {
        email: data.email,
      },
    });

    if (isEmailExist.data.length > 0)
      return { status: true, msg: "User email already exist" };

    return false;
  }

  async registerUser(data) {
    const isUserExist = await this.checkIsUserExist(data);
    if (isUserExist.status)
      return { status: false, msg: isUserExist.msg + ". Try login" };

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    data.password = hashedPassword;
    data.id = uuidv4();

    const res = await axiosInstance.post("", data);

    this.setItemsOnStorage({
      id: res.data.id,
      name: res.data.name,
    });

    return { status: true, msg: "User added successfully" };
  }

  async loginUser(data) {
    const res = await axiosInstance.get("", {
      params: {
        email: data.email,
      },
    });

    if (res.data.length < 1) {
      return { status: false, msg: "User not found", noUser: true };
    }

    const validPD = await bcrypt.compare(data.password, res.data[0].password);
    if (validPD) {
      this.setItemsOnStorage({
        id: res.data[0].id,
        name: res.data[0].name,
      });
    }
    return { status: true, msg: "User logged in" };
  }
}
