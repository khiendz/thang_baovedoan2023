import { Tour } from "Models";
import { AddTour, DeleteTourById, UpdateTour } from "services";

export const changeTour = async (tour: Tour) => {
    try {
      const result = await UpdateTour(tour);
      if (result) return result;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const handleAddTour = async (tour: Tour) => {
    try {
      const result = await AddTour(tour);
      if (result) return result;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const clearTheTour = async (tourId: number) => {
    if (!tourId) return null;

    try {
      const result = await DeleteTourById(tourId);
      if (result) return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const handleDelete = async (key: number, tours: Tour[], setTour: any) => {
    const result = await clearTheTour(key);
    const newData = tours.filter(
      (item: Tour) => item.TourID !== key
    );
    setTour(newData);
    return result;
  };

export const handleAdd = async (tour: Tour, setTour: any, tours: Tour[]) => {
    const result = await handleAddTour(tour);
    setTour([
      { ...Tour, TourId: tours.length + 1 },
      ...tours,
    ]);
    return result;
  };
