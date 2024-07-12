function extractExtensionFromFileName(fileName) {
    const splited = fileName.split('.');
    if (splited.length > 1)
        return splited.pop();
    else
        return '';
}

module.exports = {
    extractExtensionFromFileName,
}

