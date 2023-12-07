import { TourType } from "Models";
import { AddTourType, DeleteTourTypeById, UpdateTourType } from "services";

export const changeTourType = async (tourType: TourType) => {
    try {
      const result = await UpdateTourType(tourType);
      if (result) return result;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const handleAddTourType = async (tourType: TourType) => {
    try {
      const result = await AddTourType(tourType);
      if (result) return result;
      else return null;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const clearTheTourType = async (tourTypeId: number) => {
    if (!tourTypeId) return null;

    try {
      const result = await DeleteTourTypeById(tourTypeId);
      if (result) return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

export const handleDelete = async (key: number, tourTypes: TourType[], setTourTypes: any) => {
    const result = await clearTheTourType(key);
    const newData = tourTypes.filter(
      (item: TourType) => item.TourTypeId !== key
    );
    setTourTypes(newData);
    return result;
  };

export const handleAdd = async (tourType: TourType, setTourTypes: any, tourTypes: TourType[]) => {
  debugger
    const result = await handleAddTourType(tourType);
    setTourTypes([
      { ...result.data },
      ...tourTypes,
    ]);
    return result;
  };
