const required = (key: string): string => {
  const val = process.env[key];
  if (!val || val.trim().length === 0) {
    throw new Error(
      `[Thinkbox] Missing required environment variable: ${key}. ` +
        `Please check your .env.local file and ensure the variable is set.`,
    );
  }
  return val.trim().replace(/^"|"$/g, "");
};

export const appwriteConfig = {
  endpointUrl: required("NEXT_PUBLIC_APPWRITE_ENDPOINT"),
  projectId: required("NEXT_PUBLIC_APPWRITE_PROJECT"),
  databaseId: required("NEXT_PUBLIC_APPWRITE_DATABASE"),
  usersCollectionId: required("NEXT_PUBLIC_APPWRITE_USERS_COLLECTION"),
  filesCollectionId: required("NEXT_PUBLIC_APPWRITE_FILES_COLLECTION"),
  bucketId: required("NEXT_PUBLIC_APPWRITE_BUCKET"),
  secretKey: required("NEXT_APPWRITE_KEY"),
};
