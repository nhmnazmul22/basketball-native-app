import { BASE_URL } from "@/config";

const TeamApi = {
  createTeam: async (bodyData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/create-team`, {
        method: "POST",
        body: bodyData,
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create team",
        };
      }

      return {
        success: true,
        message: "Team created successfully",
      };
    } catch (err: any) {
      console.error("Error creating team:", err);
      return {
        success: false,
        message: err.message || "Failed to create team",
      };
    }
  },
  deleteTeam: async (teamId: string) => {
    try {
      const res = await fetch(`${BASE_URL}/delete-team/${teamId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        return {
          success: true,
          message: "Team deleted successfully",
        };
      } else {
        return {
          success: false,
          message: "Failed to delete team",
        };
      }
    } catch (err) {
      console.error("Error deleting team:", err);
      return {
        success: false,
        message: "Failed to delete team",
      };
    }
  },
  updateTeam: async (teamId: string, bodyData: any) => {
    try {
      const res = await fetch(`${BASE_URL}/update-team/${teamId}`, {
        method: "PUT",
        body: bodyData,
      });

      const data = await res.json();

      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to updated team",
        };
      }

      return {
        success: true,
        message: "Team updated successfully",
      };
    } catch (err: any) {
      console.error("Error updating team:", err);
      return {
        success: false,
        message: err.message || "Failed to update team",
      };
    }
  },
};

export default TeamApi;
