const getFolderPath = (data, pathId) => {
  if (String(data?.id) === String(pathId) || pathId === undefined) return [];

  if (data?.folders?.length === 0) return null;

  const fitredFolder = data?.folders?.filter((e) => String(e?.id) === String(pathId));
  if (fitredFolder?.length !== 0) return fitredFolder;

  return data?.folders?.reduce((acc, folder) => {
    const path = getFolderPath(folder, pathId);

    if (path !== null && path?.length) {
      return [folder, ...path];
    }

    return acc;
  }, []);
};

export default getFolderPath;
