const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const fetchMenuData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/menu`);
    const data = await response.json();

    if (response.ok) {
      console.log(data, "data");
      return data;
    } else {
      console.error("Failed to fetch menu data");
    }
  } catch (error) {
    console.error("An error occurred while fetching the menu data:", error);
  }
};

export const fetchMenuDataParentId = async (id: number | string) => {
  try {
    const response = await fetch(`${BASE_URL}/menu/${id}`);
    const data = await response.json();

    if (response.ok) {
      return data;
    } else {
      console.error("Failed to fetch menu data by parent ID");
    }
  } catch (error) {
    console.error("An error occurred while fetching the menu data by parent ID:", error);
  }
};

export const createMenuItem = async (newMenuItem: {
  name: string;
  description?: string;
}) => {
  try {
    const response = await fetch(`${BASE_URL}/menu`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMenuItem),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("New menu item created:", data);
    } else {
      console.error("Failed to create menu item");
    }
  } catch (error) {
    console.error("An error occurred while creating the menu item:", error);
  }
};

export const updateMenuItem = async (
  id: number | string,
  updatedMenuItem: { name: string }
) => {
  try {
    const response = await fetch(`${BASE_URL}/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMenuItem),
    });

    if (response.ok) {
      const data = await response.json();
      console.log("Menu item updated:", data);
    } else {
      console.error("Failed to update menu item");
    }
  } catch (error) {
    console.error("An error occurred while updating the menu item:", error);
  }
};

export const deleteMenuItem = async (id: number | string) => {
  try {
    const response = await fetch(`${BASE_URL}/menu/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log(`Menu item with ID ${id} deleted successfully.`);
    } else {
      console.error("Failed to delete menu item");
    }
  } catch (error) {
    console.error("An error occurred while deleting the menu item:", error);
  }
};


