/**
 * Migration utility for handling data structure updates
 */

const MIGRATION_VERSION = 1;

export const migrateData = (data) => {
  const version = data.version || 0;

  if (version === MIGRATION_VERSION) {
    return data;
  }

  let migratedData = { ...data };

  // Example migration: Add version field if missing
  if (version < 1) {
    migratedData = {
      ...migratedData,
      version: 1,
      tasks: migratedData.tasks?.map((task) => ({
        ...task,
        tags: task.tags || [],
      })) || [],
    };
  }

  // Add more migrations here as needed
  // if (version < 2) { ... }

  return migratedData;
};

export const validateData = (data) => {
  if (!data) return false;

  const requiredFields = ['tasks', 'projects', 'tags'];
  return requiredFields.every((field) => Array.isArray(data[field]));
};

export const backupData = (data) => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backup = {
    ...data,
    backupTimestamp: timestamp,
  };

  try {
    localStorage.setItem(`taskify-backup-${timestamp}`, JSON.stringify(backup));
    return true;
  } catch (error) {
    console.error('Failed to create backup:', error);
    return false;
  }
};

export const restoreData = (backupKey) => {
  try {
    const backup = localStorage.getItem(backupKey);
    if (!backup) return null;

    const data = JSON.parse(backup);
    if (!validateData(data)) return null;

    return migrateData(data);
  } catch (error) {
    console.error('Failed to restore backup:', error);
    return null;
  }
}; 