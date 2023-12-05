import { Hotel } from "Models";
import { AddHotel, DeleteHotelById, UpdateHotel } from "services";

export const changeHotel = async (hotel: Hotel) => {
    try {
        const result = await UpdateHotel(hotel);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleAddHotel = async (hotel: Hotel) => {
    try {
        const result = await AddHotel(hotel);
        if (result) return result;
        else return null;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const clearTheHotel = async (hotelId: number) => {
    if (!hotelId) return null;

    try {
        const result = await DeleteHotelById(hotelId);
        if (result) return result;
    } catch (e) {
        console.log(e);
        return null;
    }
};

export const handleDelete = async (key: number, hotels: Hotel[], setHotels: any) => {
    const result = await clearTheHotel(key);
    const newData = hotels.filter(
        (item: Hotel) => item.HotelId !== key
    );
    setHotels(newData);
    return result;
};

export const handleAdd = async (hotel: Hotel, setHotels: any, hotels: Hotel[]) => {
    const result = await handleAddHotel(hotel);
    if (result.data && result.status == 200)
        setHotels([
            { ...result.data },
            ...hotels,
        ]);
    return result;
};
