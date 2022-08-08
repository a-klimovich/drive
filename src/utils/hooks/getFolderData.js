export const getFolderData = (data, folderId) => {
  const folder = data?.folders?.find(({ id }) => String(id) === folderId);
  
  if (!folderId) return data;

  if (folder) return folder;

  return null;
};
