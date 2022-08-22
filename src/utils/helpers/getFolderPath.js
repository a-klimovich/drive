const getFolderPath = (data, id) => {
  if (`${ data?.id }` === `${ id }`) return [];

  if (data?.folders?.length === 0) return null;

  return data?.folders.reduce((acc, folder) => {
    const path = getFolderPath(folder, id);

    if (path !== null) {
      return [folder, ...path];
    }

    return acc;
  }, []);
};

export default getFolderPath;