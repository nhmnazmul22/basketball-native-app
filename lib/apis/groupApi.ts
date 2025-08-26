import { BASE_URL } from "@/config";

const GroupApi = {
  createGroup: async (bodyData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/create-group`, {
        method: "POST",
        body: bodyData,
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create Group",
        };
      }

      return {
        success: true,
        message: "Group created successfully",
      };
    } catch (err: any) {
      console.error("Error creating group:", err);
      return {
        success: false,
        message: err.message || "Failed to create group",
      };
    }
  },
  deleteGroup: async (groupId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/delete-group/${groupId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        return {
          success: true,
          message: "Group deleted successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to delete group",
        };
      }
    } catch (err) {
      console.error("Error deleting group:", err);
      return {
        success: false,
        message: "Failed to delete group",
      };
    }
  },
  updateGroup: async (groupId: string, bodyData: any) => {
    console.log(bodyData)
    try {
      const res = await fetch(`${BASE_URL}/update-group/${groupId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to updated gruop",
        };
      }
      return {
        success: true,
        message: "Group updated successfully",
      };
    } catch (err: any) {
      console.error("Error updating group:", err);
      return {
        success: false,
        message: err.message || "Failed to update group",
      };
    }
  },
};

export default GroupApi;
