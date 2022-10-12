const getFolderPath = (data, pathId) => {
  if (String(data?.id) === String(pathId) || pathId === undefined) return [];

  if (data?.folders?.length === 0) return null;
  
  if (data?.folders.filter((e) => String(e?.id) === String(pathId))?.length !== 0) return data?.folders.filter((e) => String(e?.id) === String(pathId));
  
  return data?.folders?.reduce((acc, folder) => {
    const path = getFolderPath(folder, pathId);

    if (path !== null) {
      return [folder, ...path];
    }
    
    return acc;
  }, []);
};

export default getFolderPath;