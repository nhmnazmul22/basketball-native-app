import { BASE_URL } from "@/config";

const UserApi = {
  deleteUser: async (userId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/delete-user/${userId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        return {
          success: true,
          message: "User deleted successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to delete user",
        };
      }
    } catch (err) {
      console.error("Error deleting user:", err);
      return {
        success: false,
        message: "Failed to delete user",
      };
    }
  },
  updateUser: async (userId: string, bodyData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/update-user/${userId}`, {
        method: "PUT",
        body: bodyData,
      });

      const data = await res.json();
      console.log(data);
      if (res.ok) {
        return {
          success: true,
          message: "User updated successfully",
        };
      }
    } catch (err: any) {
      console.error("Error updating user:", err);
      return {
        success: false,
        message: err.message || "Failed to update user",
      };
    }
  },
  createUser: async (bodyData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/create-user`, {
        method: "POST",
        body: bodyData,
      });

      const data = await res.json();
      if (res.ok) {
        return {
          success: true,
          message: "User created successfully",
        };
      }
    } catch (err: any) {
      console.error("Error creating user:", err);
      return {
        success: false,
        message: err.message || "Failed to create user",
      };
    }
  },
};

export default UserApi;
