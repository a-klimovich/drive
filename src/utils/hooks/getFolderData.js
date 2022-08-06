export const getFolderData = (data, folderId) => {
  if (!folderId) return data;

  const folder = data?.folders?.filter(
    ({ id }) => String(id) === folderId
  )?.[0];

  if (folder) return folder;

  if (!folder && data?.folders) return getFolderData(data.folders, folderId);

  return [];
};
