const uploadsConfigurations = {
    compress: true,
    saveTo: (defaultPath) => {
        // the path returned here should be relative to the storage directory.
        // i.e don't use `storagePath()` function, just pass the relative path to the storage directory.
        return defaultPath;
    },
};
export default uploadsConfigurations;
