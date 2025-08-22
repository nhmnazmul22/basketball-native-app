import { BASE_URL } from "@/config";
import { Announcement } from "@/types";

const announcementApi = {
  createAnnouncement: async (bodyData: Announcement) => {
    try {
      const res = await fetch(`${BASE_URL}/create-announcement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      });

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to create announcement",
        };
      }

      return {
        success: true,
        message: "Announcement created successfully",
      };
    } catch (err: any) {
      console.error(err);
      return {
        success: false,
        message: err.message || "Something went wrong",
      };
    }
  },

  updateAnnouncement: async (
    announcementId: string,
    bodyData: Announcement
  ) => {
    try {
      const res = await fetch(
        `${BASE_URL}/update-announcement/${announcementId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to update announcement",
        };
      }

      return {
        success: true,
        message: "Announcement updated successfully",
      };
    } catch (err: any) {
      console.error(err);
      return {
        success: false,
        message: err.message || "Something went wrong",
      };
    }
  },

  deleteAnnouncement: async (announcementId: string) => {
    try {
      const res = await fetch(
        `${BASE_URL}/delete-announcement/${announcementId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await res.json();
      if (!res.ok) {
        return {
          success: false,
          message: data.message || "Failed to deleted announcement",
        };
      }

      return {
        success: true,
        message: "Announcement deleted successfully",
      };
    } catch (err: any) {
      console.error(err);
      return {
        success: false,
        message: err.message || "Something went wrong",
      };
    }
  },
};

export default announcementApi;
