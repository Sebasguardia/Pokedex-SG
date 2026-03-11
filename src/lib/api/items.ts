import { apiClient } from "./client";
import { Item } from "@/types/api/item.types";
import { NamedAPIResourceList } from "@/types/api/common.types";

export async function getItemList(limit = 20, offset = 0) {
    const { data } = await apiClient.get<NamedAPIResourceList>("/item", { params: { limit, offset } });
    return data;
}

export async function getItemByIdOrName(idOrName: string | number) {
    let query = idOrName;
    if (typeof query === "string") {
        // Handle special characters returned by PokéAPI lists (e.g., b&w-grass-tablecloth, kofu’s-wallet)
        // PokéAPI's detail endpoint expects dashes instead of these characters.
        query = query
            .replace(/%26/g, "-")
            .replace(/&/g, "-")
            .replace(/’/g, "-")
            .replace(/'/g, "-")
            .toLowerCase();
    }
    const { data } = await apiClient.get<Item>(`/item/${query}`);
    return data;
}

export async function getItemPockets() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/item-pocket");
    return data;
}

export async function getItemCategories() {
    const { data } = await apiClient.get<NamedAPIResourceList>("/item-category");
    return data;
}

export async function getItemPocketByName(name: string) {
    const { data } = await apiClient.get<any>(`/item-pocket/${name}`);
    return data;
}

export async function getItemCategoryByName(name: string) {
    const { data } = await apiClient.get<any>(`/item-category/${name}`);
    return data;
}
