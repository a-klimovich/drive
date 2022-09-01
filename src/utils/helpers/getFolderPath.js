const getFolderPath = (data, pathId) => {
  console.log(data);
  if (Number(data?.id) === Number(pathId) || pathId === undefined) return [];

  if (data?.folders?.length === 0) return null;
  
  return data?.folders?.reduce((acc, folder) => {
    const path = getFolderPath(folder, pathId);

    if (path !== null) {
      return [folder, ...path];
    }
    
    return acc;
  }, []);
};

export default getFolderPath;