import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getMenus = async () => {
  try {
    const response = await api.get("/v1/menus");
    const menus = response.data?.data;
    if (!Array.isArray(menus)) {
      throw new TypeError(
        "Respons API menu tidak berisi array pada properti data.",
      );
    }

    return menus.map((menu) => {
      const priceDigits = String(menu.price ?? "").replace(/\D/g, "");
      const price = Number(priceDigits);
      if (!priceDigits || !Number.isFinite(price)) {
        throw new TypeError(`Harga menu tidak valid untuk menu ID ${menu.id}.`);
      }

      return {
        ...menu,
        description: menu.description ?? "",
        desc: menu.description ?? "",
        price,
        image: menu.image === "null" ? "" : menu.image,
      };
    });
  } catch (error) {
    console.error("Error fetching menus:", error);
    throw error;
  }
};

export const createOrder = async (orderData, orderItems) => {
  try {
    const response = await api.post("api/v1/orders/create", {
      ...orderData,
      items: orderItems,
    });
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
};