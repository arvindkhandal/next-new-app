export const fetchMenuData = async () => {
  try {
    const response = await fetch("http://localhost:3001/menu"); // This calls your API route
    const data = await (response.json());

    if (response.ok) {
      // setMenu(data);
      console.log(data, "data");
    return (data)
    } else {
      console.error("Failed to delete menu item");
    }
  } catch (error) {
    console.error("An error occurred while updating the menu item:", error);
  }
};

export const fetchMenuDataParentId = async (id) => {
  try {
    const response = await fetch(`http://localhost:3001/menu/${id}`); // This calls your API route
    const data = await (response.json());

    if (response.ok) {
    return (data)
    } else {
      console.error("Failed to delete menu item");
    }
  } catch (error) {
    console.error("An error occurred while updating the menu item:", error);
  }
};

export const createMenuItem = async (newMenuItem: {
  name: string;
  description?: string;
}) => {
  try {
    const response = await fetch("http://localhost:3001/menu", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Tell the server it's receiving JSON
      },
      body: JSON.stringify(newMenuItem), // Send the new menu item as JSON
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
  id: number,
  updatedMenuItem: { name: string;  }
) => {
  try {
    const response = await fetch(`http://localhost:3001/menu/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedMenuItem), // Send updated data as JSON
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

export const deleteMenuItem = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:3001/menu/${id}`, {
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
