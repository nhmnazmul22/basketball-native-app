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

  updateAnnouncement: async () => {
    // Update an existing announcement
  },
  deleteAnnouncement: async () => {
    // Delete an announcement
  },
};

export default announcementApi;
